const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = env => {
  return {
    mode: "production",
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
      }),
      new CopyPlugin({
        patterns: ["public/manifest.json", { from: "public/favicon", to: "favicon" }],
      }),
      new webpack.DefinePlugin({ "process.env": JSON.stringify(env) }),
    ],
    output: {
      filename: "bundle.js?v=[contenthash:6]",
      path: path.resolve(__dirname, "build"),
    },
  };
};
