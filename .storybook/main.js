const { resolve } = require("path");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-knobs/register"],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            configFile: resolve(__dirname, "../config/tsconfig.client.json")
          }
        }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  }
};
