const alfy = require("alfy");

const action = alfy.input;

switch (action) {
  case "cache:clean":
    alfy.cache.clear();
    console.log("Cache cleaned");
    break;
  default:
    throw new Error(`Unknown action ${action}`);
}
