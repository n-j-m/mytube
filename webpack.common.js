"use strict";

const path = require("path");
const webpack = require("webpack");

const BuildConstants = require("./build-constants");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: BuildConstants.APP_PATH,
  output: {
    path: BuildConstants.BUILD_PATH,
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", include: BuildConstants.APP_PATH },
      { test: /\.css$/, loaders: ["style", "css"], include: [
        BuildConstants.APP_PATH,
        path.resolve(__dirname, "node_modules", "bootstrap"),
        path.resolve(__dirname, "node_modules", "font-awesome")
      ] },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: require("./package.json").name,
      template: "./index-template.html"
    }),
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery"
    })
  ]
};
