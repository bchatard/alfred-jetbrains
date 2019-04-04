const alfy = require('alfy');

const addTimeItem = (items, title) => {
  if (alfy.debug) {
    items.push({ title, icon: { path: alfy.icon.get('Clock') } });
  }
};

exports.addTimeItem = addTimeItem;
