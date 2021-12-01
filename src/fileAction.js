import alfy from "alfy";
import {buildItem} from "./project.js";

// check node version// check node version
import checkVersion from "./checkVersion.js";
import findProduct from "./findProduct.js";

if (!checkVersion()) {
  return;
}

const product = findProduct();
const query = alfy.input;
const projectName = query.split("/").pop();

const item = buildItem(product, projectName, query);

// output
console.log(item);
