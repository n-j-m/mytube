"use strict";

require("dotenv").load();
const webpack = require("webpack");
const merge = require("webpack-merge");

const mergeCommon = merge.bind(null, require("./webpack.common"));

const app = require("./server/app");

app.listen(process.env.PORT, () => {
  console.log("backend listening on port", process.env.PORT);
});

module.exports = mergeCommon({
  devtool: "eval-source-map",

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    host: process.env.HOST,
    port: process.env.DEV_PORT,

    proxy: {
      "/api/*": "http://" + process.env.HOST + ":" + process.env.PORT
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
