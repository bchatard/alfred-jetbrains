const fs = require('fs');
const fxp = require('fast-xml-parser/src/parser');

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

const getProjectPaths = productPath => {

  const cases = {
    recentProjectDirectories: () => {
      // //component[@name='RecentDirectoryProjectsManager']/option[@name='recentPaths']/list/option/@value
      const content = getContent(`${productPath}/options/recentProjectDirectories.xml`);
      if (content) {
        const application = content.application;
        const options = application.component && application.component['@_name'] === 'RecentDirectoryProjectsManager' ? application.component.option : [];
        const recentPathOptions = options.find(option => {
          return option['@_name'] === 'recentPaths';
        });

        return (recentPathOptions ? recentPathOptions.list.option : []);
      }
      return false;
    },
    recentProjects: () => {
      // //component[@name='RecentProjectsManager']/option[@name='recentPaths']/list/option/@value
      const content = getContent(`${productPath}/options/recentProjects.xml`);
      if (content) {
        const application = content.application;
        const options = application.component && application.component['@_name'] === 'RecentProjectsManager' ? application.component.option : [];
        const recentPathOptions = options.find(option => {
          return option['@_name'] === 'recentPaths';
        });

        return (recentPathOptions ? recentPathOptions.list.option : []);
      }
      return false;
    },
    recentSolutions: () => {
      // //component[@name='RiderRecentProjectsManager']/option[@name='recentPaths']/list/option/@value
      const content = getContent(`${productPath}/options/recentSolutions.xml`);
      if (content) {
        const application = content.application;
        const options = application.component && application.component['@_name'] === 'RecentDirectoryProjectsManager' ? application.component.option : [];
        const recentPathOptions = options.find(option => {
          return option['@_name'] === 'recentPaths';
        });

        return (recentPathOptions ? recentPathOptions.list.option : []);
      }
      return false;
    },
  };

  for (const o in cases) {
    if (cases.hasOwnProperty(o)) {
      const rawProjectPaths = cases[o]();
      if (rawProjectPaths) {
        const projectPaths = [];

        rawProjectPaths.forEach(project => {
          projectPaths.push(project['@_value'].replace('$USER_HOME$', process.env.HOME));
        });

        return projectPaths;
      }
    }
  }

  throw new Error(`Can't find 'options' XML in ${productPath}`);
};

exports.get = getProjectPaths;
