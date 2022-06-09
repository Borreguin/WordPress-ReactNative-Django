// Require path.
const path = require("path");

// Configuration object.
const config = {
  // Create the entry points.
  // One for frontend and one for the admin area.
  entry: {
    // frontend and admin will replace the [name] portion of the output config below.
    frontend: "./src/webpack-entry-points/index-frontend.tsx",
    // admin: "./src/index.tsx",
  },

  // Create the output files.
  // One for each of our entry points.
  output: {
    // [name] allows for the entry object keys to be used as file names.
    filename: "js/[name].js",
    // Specify the path to the JS files.
    path: path.resolve(__dirname, "assets"),
  },

  // to manage react native components
  externals: { "react-native": true },

  // Set up a loader to transpile down the latest and great JavaScript so older browsers
  // can understand it.
  module: {
    rules: [
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
        // normal js files
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        // typescript files
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

//Webpack is not configured to handle react-native-web, the following fixes
// js files with types inside
config.resolve.extensions.unshift(".web.js");

// Export the config object.
module.exports = config;
