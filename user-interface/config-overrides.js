const path = require("path");
const entryPointPath = path.resolve(__dirname, "./src/webpack-entry-points/");
const configEnv = require("./src/constants/config-module");

// This allows to use icons in this application:
module.exports = function override(config) {
  config.module.rules.push({
    test: /\.ttf$/,
    loader: "file-loader",
    include: path.resolve(__dirname, "./static/media/[name].[ext]"),
  });

  if (configEnv.NODE_ENV === "prod") {
    config.entry = {
      // main: path.resolve(__dirname, "./src/index.tsx"),
      main: path.resolve(entryPointPath, "admin-index.tsx"),
      // frontend: path.resolve(entryPointPath, "frontend-index.tsx"),
      frontend: path.resolve(__dirname, "./src/index.tsx"),
      admin: path.resolve(entryPointPath, "admin-index.tsx"),
    };

    config.output = {
      ...config.output,
      filename: "static/js/[name].js",
      chunkFilename: "static/js/chunk/[name].[contenthash:8].chunk.js",
      publicPath: `/wp-content/plugins/${configEnv.WP_REST_API_PLUGIN}/build/`,
    };
    console.log(`Compile with the following configuration:`);
    console.log(config);
    console.log(configEnv);
  }

  return config;
};
