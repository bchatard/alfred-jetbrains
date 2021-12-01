import fs from "fs";
import path from "path";
import {execaCommandSync} from "execa";

const workspaceXpath = [
  "(//component[@name='ProjectView']/panes/pane[@id='ProjectPane']/subPane/PATH/PATH_ELEMENT/option/@value)[1]",
  "(//component[@name='ProjectView']/panes/pane[@id='ProjectPane']/subPane/expand/path/item[contains(@type, ':ProjectViewProjectNode')]/@name)[1]",
  "((/project/component[@name='ChangeListManager']/ignored[contains(@path, '.iws')]/@path)[1])"
];

const getFiles = srcPath =>
  fs
    .readdirSync(srcPath)
    .filter(file => fs.lstatSync(path.join(srcPath, file)).isFile());

const ideaDirExists = projectPath => {
  const ideaPath = `${projectPath}/.idea`;
  return fs.existsSync(ideaPath) && fs.lstatSync(ideaPath).isDirectory();
};

const getProjectName = projectPath => {
  let isIdeaDirExists = false;

  const cases = {
    viaName: () => {
      const viaPath = `${projectPath}/.idea/name`;
      return isIdeaDirExists && fs.existsSync(viaPath)
        ? fs.readFileSync(viaPath).toString()
        : false;
    },
    viaDotName: () => {
      const viaPath = `${projectPath}/.idea/.name`;
      return isIdeaDirExists && fs.existsSync(viaPath)
        ? fs.readFileSync(viaPath).toString()
        : false;
    },
    viaIml: () => {
      if (!isIdeaDirExists) {
        return false;
      }
      const viaPath = `${projectPath}/.idea`;
      const imlFiles = getFiles(viaPath).filter(
        file => path.extname(file) === ".iml"
      );
      return imlFiles.length === 1 ? path.basename(imlFiles[0], ".iml") : false;
    },
    viaWorkspaceXml: () => {
      if (!isIdeaDirExists) {
        return false;
      }
      const viaPath = `${projectPath}/.idea/workspace.xml`;
      if (!fs.existsSync(viaPath)) {
        return false;
      }

      for (const xpath of workspaceXpath) {
        const result = execaCommandSync(
          `xmllint --xpath "${xpath}" workspace.xml`,
          { reject: false }
        );
        if (!result.failed && result.stdout.length) {
          // stdout => ' name="kotlin-dsl-example"' or ' path="kotlin-dsl-example.iws"'
          let name = result.stdout.split("=");
          name = name.length === 2 ? name[1] : "";
          name = name.replace(/^"+|"+$/g, ""); // remove " at the beginning and ending
          name = name.replace(".iws", ""); // remove .iws
          if (name.length) {
            return name;
          }
        }
      }

      return false;
    },
    viaSolution: () => {
      let pathParts = projectPath.split('/');
      let solutionName = pathParts[pathParts.length-1];
      solutionName = solutionName.replace(".sln", "");
      return solutionName;
    },
    // fallback case, keep it in last position
    viaDirectoryName: () => {
      if (!isIdeaDirExists) {
        return false;
      }
      return path.basename(projectPath);
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

export default getProjectName;
