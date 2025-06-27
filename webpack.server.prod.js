import { merge } from "webpack-merge";
import common from "./webpack.server.common.js";

const serverProdConfig = {
  mode: "production",
  devtool: "source-map",
};

export default merge(common, serverProdConfig);
