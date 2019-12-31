// @ts-check

/**
 * @type jest.InitialOptions
 */
const initialOptions = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "config/tsconfig.test.json"
    }
  },
  testEnvironment: "node",
  testMatch: ["**/__tests__/**.test.{ts, tsx}"],
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: ["src/server/routes/api/**/*.ts", "!**/__tests__/**"]
};

module.exports = initialOptions;
