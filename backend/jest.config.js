const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
    moduleFileExtensions: [ "js", "jsx", "json", "node" ],
    rootDir:   "dist/src",
    testRegex: ".spec.js$",
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    moduleNameMapper
};