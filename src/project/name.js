const fs = require('fs');
const path = require('path');

const getFiles = srcPath => fs.readdirSync(srcPath)
  .filter(file => fs.lstatSync(path.join(srcPath, file)).isFile());

const getProductName = (projectPath) => {

  const cases = {
    viaName: () => {
      const viaPath = `${projectPath}/.idea/name`;
      return fs.existsSync(viaPath) ? fs.readFileSync(viaPath).toString() : false;
    },
    viaDotName: () => {
      const viaPath = `${projectPath}/.idea/.name`;
      return fs.existsSync(viaPath) ? fs.readFileSync(viaPath).toString() : false;
    },
    viaIml: () => {
      const viaPath = `${projectPath}/.idea`;
      const imlFiles = getFiles(viaPath).filter(file => path.extname(file) === '.iml');
      return (imlFiles.length === 1) ? path.basename(imlFiles[0], '.iml') : false;
    }
  };

  for (const o in cases) {
    if (cases.hasOwnProperty(o)) {
      const projectName = cases[o]();
      if (projectName) {
        return projectName;
      }
    }
  }

  console.error(`Can't find project name in ${projectPath}`);
  return false;
};

exports.get = getProductName;
