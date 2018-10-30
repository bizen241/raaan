// @ts-check

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { join } = require("path");
const webpack = require("webpack");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

/**
 * @type Array<webpack.Plugin>
 */
const plugins = [
  new HtmlPlugin({
    inject: false,
    template: join(__dirname, "assets/index.ejs")
  }),
  new CopyPlugin([join(__dirname, "assets/favicon.ico")])
];

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
  },
  plugins
};

module.exports = webpackConfiguration;
