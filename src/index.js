import alfy from "alfy";
import checkVersion from "./checkVersion.js";

// check node version
if (!checkVersion()) {
  alfy.error('return;')
}

import fuseEngine from "fuse.js";
import {addTimeItem} from "./debug.js";
import {getItems} from "./project.js";
import findProduct from "./findProduct.js";
import searchOptions from "./searchOptions.js";

const startTime = new Date();
const product = findProduct();
const productTime = new Date();

const query = alfy.input;

const items = getItems(product);
const projectsTime = new Date();

addTimeItem(items, `Retrieve Product: ${productTime - startTime}ms`);
addTimeItem(items, `Retrieve Projects: ${projectsTime - productTime}ms`);

if (items.length) {
  if (query) {
    let matchItems = [];
    let matchTime;
    if (process.env.jb_enhanced_search) {
      const fuse = new fuseEngine(items, searchOptions());
      matchItems = fuse.search(query);
      matchTime = new Date();
    } else {
      const pattern = new RegExp(query, "i");
      const search = item =>
        pattern.test(item.title) ||
        pattern.test(item.variables.jb_search_basename);
      matchItems = alfy.matches(query, items, search);
      matchTime = new Date();
    }

    addTimeItem(
      matchItems,
      `Match Projects: ${matchTime - projectsTime}ms`
    );

    if (matchItems.length) {
      alfy.output(matchItems);
    } else {
      alfy.error(`No matching project for ${query}`);
    }
  } else {
    alfy.output(items);
  }
} else {
  alfy.error("No project found");
}
