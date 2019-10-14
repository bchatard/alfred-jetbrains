const alfy = require("alfy");

const projectPaths = require("./project/paths");
const projectName = require("./project/name");

const buildItem = (product, name, projectPath) => {
  return {
    uid: name,
    title: name,
    match: name,
    subtitle: projectPath,
    arg: projectPath,
    autocomplete: name,
    text: {
      copy: projectPath,
      largetype: name
    },
    icon: {
      path: product.applicationPath,
      type: "fileicon"
    },
    variables: {
      jb_project_name: name,
      jb_bin: product.binPath
    }
  };
};

const buildProductItem = (product, projectPath) => {
  const name = projectName.get(projectPath);
  if (name) {
    return buildItem(product, name, projectPath);
  }
  return false;
};

const getItems = product => {
  const cacheKey = `projects.${product.key}`;
  const cachedProjects = alfy.cache.get(cacheKey);
  if (!cachedProjects) {
    const projects = [];
    const paths = projectPaths.get(product.preferencePath);
    paths.forEach(path => {
      const item = buildProductItem(product, path);
      if (item) {
        projects.push(item);
      }
    });
    alfy.cache.set(cacheKey, projects, {
      maxAge: +process.env.jb_project_cache_lifetime * 1000
    });

    return projects;
  }
  return cachedProjects;
};

exports.getItems = getItems;
exports.buildItem = buildItem;
