const fs = require('fs');
const path = require('path');

const getFiles = srcPath => fs.readdirSync(srcPath)
  .filter(file => fs.lstatSync(path.join(srcPath, file)).isFile());

const ideaDirExists = (projectPath) => {
  const ideaPath = `${projectPath}/.idea`;
  return fs.existsSync(ideaPath) && fs.lstatSync(ideaPath).isDirectory();
};

const getProductName = (projectPath) => {
  let isIdeaDirExists = false;

  const cases = {
    viaName: () => {
      const viaPath = `${projectPath}/.idea/name`;
      return isIdeaDirExists && fs.existsSync(viaPath) ? fs.readFileSync(viaPath).toString() : false;
    },
    viaDotName: () => {
      const viaPath = `${projectPath}/.idea/.name`;
      return isIdeaDirExists && fs.existsSync(viaPath) ? fs.readFileSync(viaPath).toString() : false;
    },
    viaIml: () => {
      if (!isIdeaDirExists) {
        return false;
      }
      const viaPath = `${projectPath}/.idea`;
      const imlFiles = getFiles(viaPath).filter(file => path.extname(file) === '.iml');
      return (imlFiles.length === 1) ? path.basename(imlFiles[0], '.iml') : false;
    },
    viaDirectoryName: () => {
      if (!isIdeaDirExists) {
        return false;
      }
      return path.basename(path.dirname(projectPath));
    }
  };

  if (fs.existsSync(projectPath)) {
    isIdeaDirExists = ideaDirExists(projectPath);
    for (const caseKey in cases) {
      if (cases.hasOwnProperty(caseKey)) {
        const projectName = cases[caseKey]();
        if (projectName) {
          return projectName;
        }
      }
    }
  }

  // console.error(`Can't find project name in ${projectPath}`);
  return false;
};

exports.get = getProductName;
