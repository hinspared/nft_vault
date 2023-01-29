// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
};
module.exports = createJestConfig(customJestConfig);
