module.exports = {
  presets: [
    ["module:@babel/preset-env", { targets: { node: "current" } }],
    ["module:@babel/preset-react", { targets: { node: "current" } }],
  ],
};
