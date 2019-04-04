const alfy = require('alfy');
const debug = require('./debug');

const startTime = new Date();

const product = require('./product').get();
const productTime = new Date();
const project = require('./project');

const query = alfy.input;

const items = project.getItems(product);
const projectsTime = new Date();

debug.addTimeItem(items, `Retrieve Product: ${productTime - startTime}ms`);
debug.addTimeItem(items, `Retrieve Projects: ${projectsTime - productTime}ms`);

if (items.length) {
  if (query) {
    const pattern = new RegExp(query, 'i');
    const search = (item) => pattern.test(item.title) || pattern.test(item.subtitle);
    const matchItems = alfy.matches(query, items, search);
    const matchTime = new Date();

    debug.addTimeItem(matchItems, `Match Projects: ${matchTime - projectsTime}ms`);

    if (matchItems.length) {
      alfy.output(matchItems);
    } else {
      alfy.error(`No matching project for ${query}`);
    }
  } else {
    alfy.output(items);
  }
} else {
  alfy.error('No project found');
}
