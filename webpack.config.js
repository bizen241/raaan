// @ts-check

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { join } = require("path");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const LicensePlugin = require("license-webpack-plugin").LicenseWebpackPlugin;
const WorkboxPlugin = require("workbox-webpack-plugin");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const isDevelopment = mode === "development";

/**
 * @type Array<webpack.Plugin>
 */
const plugins = [
  new HtmlPlugin({
    template: join(__dirname, "assets/index.ejs"),
    filename: join(__dirname, isDevelopment ? "dist/index.html" : "src/server/views/index.hbs")
  }),
  new CopyPlugin([
    {
      from: join(__dirname, "assets"),
      ignore: ["*.ejs"]
    },
    {
      from: join(__dirname, "node_modules/kuromoji/dict"),
      to: join(__dirname, "dist/dict")
    }
  ]),
  new LicensePlugin({
    outputFilename: "licenses.json",
    renderLicenses: modules =>
      modules.length === 0
        ? ""
        : JSON.stringify(
            modules.map(({ packageJson, licenseId, licenseText }) => ({
              name: packageJson.name,
              version: packageJson.version,
              url: packageJson.homepage,
              licenseId,
              licenseText
            })),
            null,
            2
          )
  })
];

if (!isDevelopment) {
  plugins.push(
    new WorkboxPlugin.GenerateSW({
      swDest: "sw.js",
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.png$/, /\.txt$/, /\.gz$/, /\.hbs$/],
      templatedUrls: {
        "/index.html": "./src/server/views/index.hbs"
      },
      navigateFallback: "/index.html",
      navigateFallbackBlacklist: [/^\/api/, /^\/auth/, /^\/logout/]
    })
  );
}

/**
 * @type webpackDevServer.Configuration
 */
const webpackDevServerConfiguration = {
  historyApiFallback: true,
  proxy: [
    {
      context: ["/api", "/auth", "/logout"],
      target: "http://localhost:3000"
    }
  ],
  host: "0.0.0.0",
  port: 8080
};

/**
 * @type webpack.Configuration
 */
const webpackConfiguration = {
  mode,
  devtool: isDevelopment ? "source-map" : undefined,
  entry: {
    index: join(__dirname, "src/client/index.ts")
  },
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
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
