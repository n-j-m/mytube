"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");

const mergeCommon = merge.bind(null, require("./webpack.common"));

module.exports = mergeCommon({
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});
