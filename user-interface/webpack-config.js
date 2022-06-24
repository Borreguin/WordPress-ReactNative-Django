// Require path.
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackEnv = process.env.NODE_ENV || "development";

const appDirectory = __dirname;
const node_modules = path.join(__dirname, "node_modules");
// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, "index.web.js"),
    path.resolve(appDirectory, "src"),
    path.resolve(appDirectory, "node_modules/react-native-uncompiled"),
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ["module:metro-react-native-babel-preset"],
      // Re-write paths to import only the modules needed by the app
      plugins: ["react-native-web"],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
      esModule: false,
    },
  },
};

// Configuration object.
const config = {
  mode: webpackEnv,
  context: __dirname,
  // Create the entry points.
  // One for frontend and one for the admin area.
  entry: {
    // frontend and admin will replace the [name] portion of the output config below.
    frontend: "./src/webpack-entry-points/frontend-index.tsx",
    // admin: "./src/webpack-entry-points/admin-index.tsx",
    //app: "./src/webpack-entry-points/index.web.ts",
  },

  // Create the output files.
  // One for each of our entry points.
  output: {
    // [name] allows for the entry object keys to be used as file names.
    filename: "js/[name].js",
    // Specify the path to the JS files.
    path: path.resolve(__dirname, "assets"),
    libraryTarget: "commonjs",
  },

  devtool: "source-map",

  // to manage react native components
  // externals: { "react-native": true, "native-base": true },

  // Set up a loader to transpile down the latest and great JavaScript so older browsers
  // can understand it.
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      {
        // font and images files
        test: /\.(woff2?|eot|ttf|otf|png)$/,
        loader: "file-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.ttf$/,
        loader: "file-loader",
        include: path.resolve(__dirname, "./static/media/[name].[ext]"),
      },
      {
        // normal js files
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        // typescript files
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        use: "ts-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  // read files in following order
  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      "react-native$": "react-native-web",
    },
    extensions: [
      ".web.tsx",
      ".web.ts",
      ".tsx",
      ".ts",
      ".web.jsx",
      ".web.js",
      ".jsx",
      ".js",
    ],
  },
};

//Webpack is not configured to handle react-native-web, the following fixes
// js files with types inside
// config.resolve.extensions.unshift(".web.js");

// We need to make sure that only one version is loaded for peerDependencies
// So we alias them to the versions in example's node_modules
Object.assign(config.resolve.alias, {
  "react-native-web": path.join(node_modules, "react-native-web"),
});

// Export the config object.
module.exports = config;
