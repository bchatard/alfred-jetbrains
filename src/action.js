import alfy from "alfy";

const action = alfy.input;

if (action === "cache:clean") {
  alfy.cache.clear();
  console.log("Cache cleaned");
} else {
  throw new Error(`Unknown action ${action}`);
}
