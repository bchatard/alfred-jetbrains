const alfy = require('alfy');
const fs = require('fs');
const path = require('path');
const execa = require('execa');

const knownProducts = require('./products.json');

// @todo: allow override "knownProducts"

const getDirectories = srcPath => fs.readdirSync(srcPath)
  .filter(file => fs.lstatSync(path.join(srcPath, file)).isDirectory());

const getProduct = () => {
  // remove the first three entries
  //  1. node bin path
  //  2. path to this script
  //  3. "query" == alfy.input
  let key = process.argv.slice(3);
  if (key.length === 1 && knownProducts[key[0]]) {
    return knownProducts[key[0]];
  }

  throw new Error('Can\'t find product, missing key');
};

const getPreferencePath = (product) => {
  const preferencesPath = `${process.env.HOME}/Library/Preferences`;
  const prefDirName = product.preferences;
  const pattern = new RegExp(`${prefDirName}([\\d]{4}\\.[\\d]{1})`); // year and dot release
  const paths = getDirectories(preferencesPath).filter(path => pattern.test(path));

  if (paths.length === 1) {
    return path.join(preferencesPath, paths[0]);
  }
  if (paths.length > 1) {
    // sort paths in "chronological" order
    // so last element means current product version
    // maybe is not a good assertion
    paths.sort();

    return path.join(preferencesPath, paths.pop());
  }
  throw new Error(`Can't find preference path for ${prefDirName}`);
};

const getApplicationPath = (product) => {
  const bin = product.bin;
  const result = execa.shellSync(`which ${bin}`);
  if (result.failed) {
    throw new Error(result.stderr);
  }
  product.binPath = result.stdout;
  const binContent = fs.readFileSync(product.binPath, { encoding: 'UTF-8' });

  // Toolbox case
  const pattern = new RegExp('open -a "(.*)" "\\$@"');
  const match = pattern.exec(binContent);
  if (match && match.length === 2) {
    let appPath = match[1];
    appPath = appPath.split('/');
    appPath = appPath.slice(0, -3); // remove last three entries ('Contents', 'MacOS', ${bin})
    appPath = appPath.join('/');

    return appPath;
  }

  // non Toolbox case
  const oldPattern = new RegExp("RUN_PATH = u'(.*)'");
  const oldMatch = oldPattern.exec(binContent);
  if (oldMatch && oldMatch.length === 2) {
    return oldMatch[1];
  }

  throw new Error(`Can't find application path for ${bin}`);
};

const get = () => {
  const product = getProduct();
  const cacheKey = `product.${product.bin}`;
  const cachedProduct = alfy.cache.get(cacheKey);
  if (!cachedProduct) {
    product.preferencePath = getPreferencePath(product);
    product.applicationPath = getApplicationPath(product);
    alfy.cache.set(cacheKey, product, { maxAge: +process.env.jb_product_cache_lifetime * 1000 });

    return product;
  }

  return cachedProduct;
};

exports.get = get;
