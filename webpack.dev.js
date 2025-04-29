import { fileURLToPath } from "url";
import path from "path";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import { getLocalIdent } from "./src/utils/getLocalIdent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  devServer: {
    port: "3000",
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false,
                exportLocalsConvention: "as-is",
                getLocalIdent,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /src/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
