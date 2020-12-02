const fs = require("fs");
const fxp = require("fast-xml-parser/src/parser");

const fxpOptions = {
  ignoreAttributes: false,
};

const getContent = (xmlFile) => {
  if (!fs.existsSync(xmlFile)) {
    return false;
  }
  const xmlContent = fs.readFileSync(xmlFile);

  return fxp.parse(xmlContent.toString(), fxpOptions);
};

const getProjectPaths = (productPath) => {
  const cases = {
    recentProjectDirectories: () => {
      // //component[@name='RecentDirectoryProjectsManager']/option[@name='recentPaths']/list/option/@value
      const content = getContent(
        `${productPath}/options/recentProjectDirectories.xml`
      );
      if (content) {
        const application = content.application;
        const options =
          application.component &&
          application.component["@_name"] === "RecentDirectoryProjectsManager"
            ? application.component.option
            : [];
        const recentPathOptions = options.find((option) => {
          return option["@_name"] === "recentPaths";
        });

        return recentPathOptions ? recentPathOptions.list.option : [];
      }
      return false;
    },
    recentProjects: () => {
      // //component[@name='RecentProjectsManager']/option[@name='recentPaths']/list/option/@value
      const content = getContent(`${productPath}/options/recentProjects.xml`);
      if (content) {
        const application = content.application;
        let options =
          application.component &&
          application.component["@_name"] === "RecentProjectsManager"
            ? application.component.option
            : [];
        // 2020.3+
        if (typeof options === "object") {
          // there is only one entry in 2020.3+, so we change it into array
          options = [options];
        }
        const recentPathOptions = options.find((option) => {
          return option["@_name"] === "recentPaths";
        });
        if (recentPathOptions) {
          return recentPathOptions.list.option;
        }
        // 2020.3+
        const entries = options.find((option) => {
          return option["@_name"] === "additionalInfo";
        });
        if (entries) {
          return entries.map.entry;
        }
        return [];
      }
      return false;
    },
    recentSolutions: () => {
      // //component[@name='RiderRecentProjectsManager']/option[@name='recentPaths']/list/option/@value
      const content = getContent(`${productPath}/options/recentSolutions.xml`);
      if (content) {
        const application = content.application;
        const options =
          application.component &&
          application.component["@_name"] === "RecentDirectoryProjectsManager"
            ? application.component.option
            : [];
        const recentPathOptions = options.find((option) => {
          return option["@_name"] === "recentPaths";
        });

        return recentPathOptions ? recentPathOptions.list.option : [];
      }
      return false;
    },
  };

  for (const caseKey in cases) {
    if (cases.hasOwnProperty(caseKey)) {
      let rawProjectPaths = cases[caseKey]();
      if (rawProjectPaths) {
        const projectPaths = [];

        rawProjectPaths =
          Object.prototype.toString.call(rawProjectPaths).indexOf("Object") !==
          -1
            ? [rawProjectPaths] // one project case
            : rawProjectPaths;

        rawProjectPaths.forEach((project) => {
          if (project["@_value"]) {
            projectPaths.push(
              project["@_value"].replace("$USER_HOME$", process.env.HOME)
            );
          }
          // 2020.3+
          if (project["@_key"]) {
            projectPaths.push(
              project["@_key"].replace("$USER_HOME$", process.env.HOME)
            );
          }
        });

        return projectPaths;
      }
    }
  }

  throw new Error(`Can't find 'options' XML in ${productPath}`);
};

exports.get = getProjectPaths;
