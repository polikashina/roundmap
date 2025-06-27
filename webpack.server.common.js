import { fileURLToPath } from "url";
import path from "path";
import nodeExternals from "webpack-node-externals";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  target: "node",
  entry: "./server/index.ts",
  optimization: {
    moduleIds: "named",
  },
  output: {
    filename: "index.cjs",
    path: path.resolve(__dirname, "dist-server"),
    clean: true,
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "~assets": path.resolve(__dirname, "assets"),
      "~src": path.resolve(__dirname, "src"),
    },
  },
  externals: [nodeExternals()], // Exclude node_modules from bundling
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

export default config;
