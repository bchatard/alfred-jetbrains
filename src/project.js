import alfy from "alfy";
import path from "path";

import getProjectPaths from "./project/paths.js";
import getProjectName from "./project/name.js";

const buildProductItem = (product, projectPath) => {
  const name = getProjectName(projectPath);
  if (name) {
    return buildItem(product, name, projectPath);
  }
  return false;
};

export function buildItem(product, name, projectPath) {
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
      jb_bin: product.binPath,
      jb_search_basename: path.basename(projectPath)
    }
  };
}

export function getItems(product) {
  const cacheKey = `projects.${product.key}`;
  const cachedProjects = alfy.cache.get(cacheKey);
  if (!cachedProjects) {
    const projects = [];
    const paths = getProjectPaths(product.preferencePath);
    paths.forEach(_path => {
      const item = buildProductItem(product, _path);
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
}
