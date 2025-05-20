import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import path from "path";
import { renderLayout } from "./src/utils/renderLayout.js";
import CopyPlugin from "copy-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Default language for webpack build
const DEFAULT_LANG = "en";

export default {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "~assets": path.resolve(__dirname, "assets"),
      "~src": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: false,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "assets/favicon", to: "favicon" },
        { from: "robots.txt" },
        { from: "sitemap.xml" },
      ],
    }),
  ],
};
