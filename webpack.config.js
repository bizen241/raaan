// @ts-check

/// <reference path="src/typings/webpack.d.ts" />

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { join } = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
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
      from: join(__dirname, "assets"),
      ignore: ["*.ejs", "*.svg", "locales/**/*"]
    },
    {
      from: join(__dirname, "node_modules/@blueprintjs/icons/resources/icons"),
      to: join(__dirname, "dist/resources/icons")
    },
    {
      from: join(__dirname, "node_modules/kuromoji/dict"),
      to: join(__dirname, "dist/dict")
    }
  ])
];

if (!isDevelopment) {
  plugins.push(new BundleAnalyzerPlugin());
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
      host: "0.0.0.0",
      port: 8080
    }
  : undefined;

/**
 * @type webpack.Configuration
 */
const webpackConfiguration = {
  mode,
  devtool: isDevelopment ? "source-map" : undefined,
  entry: join(__dirname, "src/client/index.ts"),
  output: {
    filename: "[name].js",
    path: join(__dirname, "dist"),
    publicPath: "/"
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
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(ttf|woff|eot)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins,
  devServer: webpackDevServerConfiguration
};

module.exports = webpackConfiguration;
