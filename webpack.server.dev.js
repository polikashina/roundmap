import { merge } from "webpack-merge";
import common from "./webpack.server.common.js";

const serverConfig = {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
};

export default merge(common, serverConfig);
