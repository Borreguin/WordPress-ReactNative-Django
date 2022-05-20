const path = require("path");

// This allows to use icons in this application:
module.exports = function override(config) {
  config.module.rules.push({
    test: /\.ttf$/,
    loader: "file-loader",
    include: path.resolve(__dirname, "./static/media/[name].[ext]"),
  });

  return config;
};
