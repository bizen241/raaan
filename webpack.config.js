// @ts-check

/// <reference path="src/typings/webpack.d.ts" />

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { join } = require("path");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const WorkboxPlugin = require("workbox-webpack-plugin");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const isDevelopment = mode === "development";

/**
 * @type Array<webpack.Plugin>
 */
const plugins = [
  new HtmlPlugin({
    inject: false,
    template: join(__dirname, "assets/index.ejs")
  }),
  new CopyPlugin([
    {
      from: "assets",
      ignore: ["*.ejs", "*.svg", "locales/**/*"]
    }
  ])
];

if (!isDevelopment) {
  plugins.push(
    new WorkboxPlugin.GenerateSW({
      swDest: "sw.js",
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.png$/, /\.txt$/],
      navigateFallback: "/",
      navigateFallbackBlacklist: [/^\/api/, /^\/auth/, /^\/logout/]
    })
  );
}

/**
 * @type webpackDevServer.Configuration | undefined
 */
const webpackDevServerConfiguration = isDevelopment
  ? {
      historyApiFallback: true,
      proxy: [
        {
          context: ["/api", "/auth", "/logout"],
          target: "http://localhost:3000"
        }
      ],
      host: "localhost",
      port: 8080
    }
  : undefined;

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
            loader: "babel-loader"
          },
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
  plugins,
  devServer: webpackDevServerConfiguration
};

module.exports = webpackConfiguration;
