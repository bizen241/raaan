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
  testMatch: ["**/__tests__/**.test.{ts, tsx}"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/client/index.ts",
    "!src/server/index.ts",
    "!src/typings/**",
    "!**/__tests__/**"
  ]
};

module.exports = initialOptions;
