// @ts-check

const { join } = require("path");
const webpack = require("webpack");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

/**
 * @type webpack.Configuration
 */
const webpackConfiguration = {
  mode,
  entry: join(__dirname, "src/client/index.ts"),
  output: {
    filename: "[name].js",
    path: join(__dirname, "dist")
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: join(__dirname, "config/tsconfig.client.json")
            }
          }
        ]
      }
    ]
  }
};

module.exports = webpackConfiguration;
