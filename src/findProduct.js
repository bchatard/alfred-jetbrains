import alfy from "alfy";
import fs from "fs";
import path from "path";
import which from "which";

import knownProducts from "./products.js";

const getDirectories = (srcPath) =>
  fs
    .readdirSync(srcPath)
    .filter((file) => fs.lstatSync(path.join(srcPath, file)).isDirectory());

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

const applyCustomisation = (product) => {
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
            ...additionalProducts[product.key],
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

const getPreferencePath = (product) => {
  // see: https://intellij-support.jetbrains.com/hc/en-us/articles/206544519-Directories-used-by-the-IDE-to-store-settings-caches-plugins-and-logs
  const preferencesPaths = [
    `${process.env.HOME}/Library/Application Support/Google`, // >= Android Studio 4.1
    `${process.env.HOME}/Library/Application Support/JetBrains`, // >= 2020.*
    `${process.env.HOME}/Library/Preferences`, // < 2020.*
  ];
  const nbPreferencesPaths = preferencesPaths.length;
  const prefDirName =
    process.env[`jb_preferences_${product.key.toLowerCase()}`] ||
    product.preferences;
  // year and dot release or AndroidStudio version (eg: 3.5)
  const pattern = new RegExp(`${prefDirName}(([\\d]{1}|[\\d]{4})\\.[\\d]{1})`);

  let configDir = undefined;
  for (let i = 0; i < nbPreferencesPaths; i++) {
    const preferencesPath = path.resolve(preferencesPaths[i]);
    let paths = [];
    try {
      paths = getDirectories(preferencesPath).filter((prefPath) =>
        pattern.test(prefPath)
      );
    } catch (e) {
      // error in getDirectories du to missing preferencesPath, die silently
      continue;
    }

    if (paths.length === 1) {
      configDir = path.join(preferencesPath, paths[0]);
      break;
    }
    if (paths.length > 1) {
      // sort paths in "chronological" order
      // so last element means current product version
      // maybe is not a good assertion
      paths.sort();

      configDir = path.join(preferencesPath, paths.pop());
      break;
    }
  }

  if (configDir) {
    return configDir;
  }

  throw new Error(`Can't find preference path for ${prefDirName}`);
};

const getApplicationPath = (product) => {
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
  const pattern = new RegExp(
    'open\\s-(n)?a\\s"(.*)"(?:\\s\\$wait)?(\\s--args)\\s"\\$(?:{ideargs\\[)?@(?:]})?"'
  );
  const match = pattern.exec(binContent);
  const matchLength = match ? match.length : 0;

  if (match && [2, 4].includes(matchLength)) {
    let appPath = match[matchLength === 2 ? 1 : 2];
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

  throw new Error(`Can't find application path for ${product.key}.`);
};

const findProduct = () => {
  let product = getProduct();
  const cacheKey = `product.${product.key}`;
  const cachedProduct = alfy.cache.get(cacheKey);
  if (!cachedProduct) {
    product = applyCustomisation(product);
    product.preferencePath = getPreferencePath(product);
    product.applicationPath = getApplicationPath(product);
    alfy.cache.set(cacheKey, product, {
      maxAge: +process.env.jb_product_cache_lifetime * 1000,
    });

    return product;
  }

  return cachedProduct;
};

export default findProduct;
