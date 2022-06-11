/**
 * This file publishes the assets that were created by yarn build
 * Copy from ./assets to ../wp-container/plugins/wp-rs_hide_rest_api
 */

const fs = require("fs");

const assetsPath = "./assets";
const toCopyPath = "../wp-container/plugins/wp-rs_hide_rest_api";
const copyAssetsPath = `${toCopyPath}/assets`;

const publish_assets = () => {
  if (!fs.existsSync(assetsPath)) {
    console.log(`This path does not exist ${assetsPath}`);
    return;
  }
  if (!fs.existsSync(toCopyPath)) {
    console.log(`This path does not exist ${toCopyPath}`);
    return;
  }
  console.log(`Star copying from ${assetsPath} to ${toCopyPath}`);
  try {
    fs.rmSync(copyAssetsPath, { recursive: true, force: true });
    fs.cpSync(assetsPath, copyAssetsPath, { recursive: true, force: true });
    console.log(`Finish copying successfully`);
  } catch (e) {
    console.log(`Error when publishing assets: ${e}`);
  }
};

publish_assets();
