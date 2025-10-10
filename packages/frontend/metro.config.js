const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add your shared package for transpilation
config.resolver.nodeModulesPaths = [
  "../shared",
  "./node_modules"
];

config.transformer = {
  ...config.transformer,
};

config.watchFolders = [
  "../shared"
];

module.exports = config;