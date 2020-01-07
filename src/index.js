const alfy = require("alfy");

// check node version
if (!require("./version_checker").check()) {
  return;
}

const debug = require("./debug");
const fuseEngine = require("fuse.js");

const startTime = new Date();

const product = require("./product").get();
const productTime = new Date();
const project = require("./project");

const query = alfy.input;

const items = project.getItems(product);
const projectsTime = new Date();

debug.addTimeItem(items, `Retrieve Product: ${productTime - startTime}ms`);
debug.addTimeItem(items, `Retrieve Projects: ${projectsTime - productTime}ms`);

if (items.length) {
  if (query) {
    let matchItems = [];
    let matchTime;
    if (process.env.jb_enhanced_search) {
      const searchOptions = require("./search");
      const fuse = new fuseEngine(items, searchOptions.get());
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

    debug.addTimeItem(
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
