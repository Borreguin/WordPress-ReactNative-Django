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

const currentDate = new Date();
let template = `
// Generated on: ${currentDate}
// This file is generated automatically by: node config-generator.js
// The variables are taking from '${env_file_path}'

const configEnv = {
  HOST_IP: '${HOST_IP}',
  APP_PROTOCOL: '${APP_PROTOCOL}',
  WP_JWT_LOGIN: '${WP_JWT_LOGIN}'
}

export default configEnv;
`;

configFilePath = "./src/constants/config.js";
fs.writeFile(configFilePath, template, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log(
    `Configuration file has been generated automatically on ${currentDate}`
  );
  console.log("\t" + configFilePath);
  console.log("\t" + env_file_path);
  console.log("\n");
});
