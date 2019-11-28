const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/main",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    devtool: isProd ? "none" : "inline-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new CopyWebpackPlugin([
        { from: "src/assets", to: "assets" },
        { from: "data/group.csv", to: "data/group.csv" }
      ])
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: ["style-loader", "css-loader"]
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    }
  };
};
