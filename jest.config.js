module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "config/tsconfig.test.json"
    }
  },
  testMatch: ["**/__tests__/**.test.{ts, tsx}"],
  collectCoverageFrom: ["src/**.{ts,tsx}", "!src/client/index.ts", "!src/server/index.ts", "!**/__tests__/**"]
};
