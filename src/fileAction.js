const alfy = require("alfy");
const buildItem = require("./project").buildItem;

// check node version// check node version
if (!require("./version_checker").check()) {
  return;
}

const product = require("./product").get();
const query = alfy.input;
const projectName = query.split("/").pop();

const item = buildItem(product, projectName, query);

// output
console.log(item);
