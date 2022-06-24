/**
 * This file creates a config.js using environmental variables for the whole project.
 * Generate ./src/constants/config.js
 */

const fs = require("fs");

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
  console.log("\n");
});
