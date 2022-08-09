/**
 * This file creates a config.js using environmental variables for the whole project.
 * Generate:
 *      ./src/constants/config.js
 *      ./src/constants/config-module.js
 *      ./src/constants/config-module-entryPoints.js
 */
require = require("esm")(module);
const fs = require("fs");
const path = require("path");
const epList =
  require("./src/wb-entry-points/register-entry-points.js").default;

let env_file_path;
if (process.env.NODE_ENV === "prod") {
  env_file_path = "../wp-container/.env";
} else {
  env_file_path = "../wp-container/.dev.env";
}
require("dotenv").config({ path: env_file_path });

const HOST_IP = process.env.HOST_IP;
const APP_PROTOCOL = process.env.APP_PROTOCOL;
const WP_JWT_LOGIN = process.env.WP_JWT_LOGIN;
const WP_REST_API_PLUGIN = process.env.WP_REST_API_PLUGIN;

const currentDate = new Date();
let configEnv = `
{
  HOST_IP: '${HOST_IP}',
  COMP_TIME : '${currentDate}',
  NODE_ENV : '${process.env.NODE_ENV}',
  APP_PROTOCOL: '${APP_PROTOCOL}',
  WP_JWT_LOGIN: '${WP_JWT_LOGIN}',
  WP_REST_API_PLUGIN: '${WP_REST_API_PLUGIN}'
}
`;

// For Js file:
let templateJs = `
// Generated on: ${currentDate}
// This file is generated automatically by: node config-generator.js
// The variables are taking from '${env_file_path}'

const configEnv = ${configEnv}

export default configEnv;
`;

// For module file:
let templateModule = `
// Generated on: ${currentDate}
// This file is generated automatically by: node config-generator.js
// The variables are taking from '${env_file_path}'

module.exports = ${configEnv}
`;
// import * as path from "path";
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const entryPointsPath = path.resolve(__dirname, "./src/wb-entry-points");
let entryPointList = {};
for (let ep of epList) {
  entryPointList[ep.name] = path.resolve(entryPointsPath, ep.filename);
}

// For entry-points:
let entryPointTemplate = `
// Generated on: ${currentDate}
// This file is generated automatically by: node config-generator.js
// The variables are taking from ./src/webpack-entry-points/register-entry-points

module.exports = ${JSON.stringify(entryPointList, null, 4)}
`;

console.log(`Configuration files generated automatically on ${currentDate}`);
console.log("\t" + env_file_path);

const configJsFilePath = "./src/constants/config.js";
fs.writeFile(configJsFilePath, templateJs, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("\t" + configJsFilePath);
});

const configModuleFilePath = "./src/constants/config-module.js";
fs.writeFile(configModuleFilePath, templateModule, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("\t" + configModuleFilePath);
});

const entryPointsFilePath = "./src/constants/config-module-entryPoints.js";
fs.writeFile(entryPointsFilePath, entryPointTemplate, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("\t" + entryPointsFilePath);
});
