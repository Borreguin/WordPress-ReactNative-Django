const path = require("path");
const configEnv = require("./src/constants/config-module");
const entryPoints = require("./src/constants/config-module-entryPoints");
// This allows to use icons in this application:
module.exports = function override(config) {
  config.module.rules.push({
    test: /\.ttf$/,
    loader: "file-loader",
    include: path.resolve(__dirname, "./static/media/[name].[ext]"),
  });

  if (configEnv.NODE_ENV === "prod") {
    config.entry = {
      ...entryPoints,
      main: path.resolve(__dirname, "./src/index.tsx"),
    };

    config.output = {
      ...config.output,
      filename: "static/js/[name].js",
      chunkFilename: "static/js/chunk/[name].[contenthash:8].chunk.js",
      assetModuleFilename: "static/media/[name].[ext]",
      publicPath: `/wp-content/plugins/${configEnv.WP_REST_API_PLUGIN}/build/`,
    };
    console.log(`\n Compiled with the following configuration:`);
    console.log(config);
  } else {
    config.entry = {
      main: path.resolve(__dirname, "./src/App.tsx"),
    };
  }

  return config;
};
