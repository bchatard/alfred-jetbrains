const alfy = require("alfy");
const fs = require("fs");

const searchOptions = () => {
  let fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 80,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: [{ name: "title", weight: 1 }, { name: "subtitle", weight: 0.5 }]
  };

  if (process.env.jb_search_customisation_file) {
    const customisationFilePath = path.join(
      process.env.HOME,
      process.env.jb_search_customisation_file
    );
    try {
      if (fs.existsSync(customisationFilePath)) {
        const customSearchOptions = JSON.parse(
          fs.readFileSync(customisationFilePath).toString()
        );
        fuseOptions = {
          ...fuseOptions,
          ...customSearchOptions
        };
      }
    } catch (e) {
      // die silently
      if (alfy.debug) {
        console.error(e);
      }
    }
  }

  return fuseOptions;
};

export default searchOptions;
