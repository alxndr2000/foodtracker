/* eslint-disable @typescript-eslint/no-require-imports */
// disabled due to __dirname usage
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");
const sharedPath = path.resolve(monorepoRoot, "packages/shared");

const config = getDefaultConfig(projectRoot);

// Tell Metro to resolve @myorg/shared to the shared package
config.resolver.extraNodeModules = {
  "@myorg/shared": sharedPath,
};

// Make sure TypeScript files are picked up
config.resolver.sourceExts = [...config.resolver.sourceExts, "ts", "tsx"];

// Watch the shared folder for changes
config.watchFolders = [sharedPath];

module.exports = config;