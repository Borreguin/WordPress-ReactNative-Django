/**
 * This file publishes the assets that were created by yarn build
 * Copy from ./build to ../wp-container/plugins/wp-rs_rest_api
 */

const fs = require("fs");
const configEnv = require("./src/constants/config-module");

const buildPath = "./build";
const toCopyPath = `../wp-container/plugins/${configEnv.WP_REST_API_PLUGIN}`;
const copyBuildPath = `${toCopyPath}/build`;

const publish_build = () => {
  if (!fs.existsSync(buildPath)) {
    console.log(`Error: This path does not exist ${buildPath}`);
    return;
  }
  if (!fs.existsSync(toCopyPath)) {
    console.log(`Error: This path does not exist ${toCopyPath}`);
    return;
  }
  console.log(`Start copying from ${buildPath} to ${toCopyPath}`);
  try {
    fs.rmSync(copyBuildPath, { recursive: true, force: true });
    fs.cpSync(buildPath, copyBuildPath, { recursive: true, force: true });
    console.log(`Finish copying successfully`);
  } catch (e) {
    console.log(`Error when publishing build: ${e}`);
  }
};

publish_build();
