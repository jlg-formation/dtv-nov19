const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "none",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      }
    ]
  }
};
