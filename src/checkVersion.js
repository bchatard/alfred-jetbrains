import alfy from "alfy";

// check node version
const version = process.version.replace("v", "").split(".");
const majorVersion = Number(version[0]);
const minorVersion = Number(version[1]);

const checkVersion = () => {
  if (
    majorVersion < 14 // at least v10
  ) {
    alfy.error(
      `Wrong Node version. We need v14+ or newer, you have ${process.version}`
    );
    return false;
  }

  return true;
};

export default checkVersion;
