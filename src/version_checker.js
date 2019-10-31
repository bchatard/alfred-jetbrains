const alfy = require("alfy");

// check node version
const version = process.version.replace("v", "").split(".");
const majorVersion = Number(version[0]);
const minorVersion = Number(version[1]);

exports.check = () => {
  if (
    majorVersion < 8 || // at least v8
    (majorVersion === 8 && minorVersion < 12) || // at least 8.12
    (majorVersion === 9 && minorVersion < 7) // at least 9.7
  ) {
    alfy.error(
      `Wrong Node version. We need v8.12+, 9.7+ or newer, you have ${process.version}`
    );
    return false;
  }

  return true;
};
