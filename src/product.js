const alfy = require("alfy");
const fs = require("fs");
const path = require("path");
const which = require("which");

const knownProducts = require("./products.json");

const getDirectories = srcPath =>
  fs
    .readdirSync(srcPath)
    .filter(file => fs.lstatSync(path.join(srcPath, file)).isDirectory());

const getProduct = () => {
  // remove the first three entries
  //  1. node bin path
  //  2. path to this script
  //  3. "query" == alfy.input
  let key = process.argv.slice(3);
  if (key.length === 1 && knownProducts[key[0]]) {
    // keep "key" in object, used in applyCustomisation
    knownProducts[key[0]].key = key[0];

    return knownProducts[key[0]];
  }

  throw new Error("Can't find product, missing key");
};

const applyCustomisation = product => {
  if (process.env.jb_product_customisation_file) {
    const customisationFilePath = path.join(
      process.env.HOME,
      process.env.jb_product_customisation_file
    );
    try {
      if (fs.existsSync(customisationFilePath)) {
        const additionalProducts = JSON.parse(
          fs.readFileSync(customisationFilePath).toString()
        );
        if (additionalProducts[product.key]) {
          product = {
            ...product,
            ...additionalProducts[product.key]
          };
        }
      }
    } catch (e) {
      // die silently
      if (alfy.debug) {
        console.error(e);
      }
    }
  }

  return product;
};

const getPreferencePath = product => {
  const preferencesPath = `${process.env.HOME}/Library/Preferences`;
  const prefDirName = product.preferences;
  const pattern = new RegExp(`${prefDirName}([\\d]{4}\\.[\\d]{1})`); // year and dot release
  const paths = getDirectories(preferencesPath).filter(path =>
    pattern.test(path)
  );

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

const getApplicationPath = product => {
  let bins = product.bin;
  if (!Array.isArray(bins)) {
    bins = [bins];
  }
  let binPath = null;
  for (const bin of bins) {
    binPath = which.sync(bin, { nothrow: true });
    // is not null and path length is greater than bin length (weird case)
    if (binPath !== null && binPath.length > bin.length) {
      break;
    }
  }

  if (!binPath) {
    throw new Error(
      `Unable to find bin for ${product.key}. Search for bin named: ${bins.join(
        ", "
      )}`
    );
  }

  product.binPath = binPath;

  const binContent = fs.readFileSync(product.binPath, { encoding: "UTF-8" });

  // Toolbox case
  const pattern = new RegExp('open -a "(.*)" "\\$@"');
  const match = pattern.exec(binContent);
  if (match && match.length === 2) {
    let appPath = match[1];
    appPath = appPath.split("/");
    appPath = appPath.slice(0, -3); // remove last three entries ('Contents', 'MacOS', ${bin})
    appPath = appPath.join("/");

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
  let product = getProduct();
  const cacheKey = `product.${product.key}`;
  const cachedProduct = alfy.cache.get(cacheKey);
  if (!cachedProduct) {
    product = applyCustomisation(product);
    product.preferencePath = getPreferencePath(product);
    product.applicationPath = getApplicationPath(product);
    alfy.cache.set(cacheKey, product, {
      maxAge: +process.env.jb_product_cache_lifetime * 1000
    });

    return product;
  }

  return cachedProduct;
};

exports.get = get;
