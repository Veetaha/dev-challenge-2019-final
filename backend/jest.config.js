const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
    moduleFileExtensions: [ "ts" ],
    rootDir:   "src",
    testRegex: ".spec.ts$",
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    moduleNameMapper
};