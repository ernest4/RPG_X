const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { app: "./src/index.ts" },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader", exclude: /node_modules/ },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     { loader: "css-loader", options: { importLoaders: 1 } },
      //     "postcss-loader",
      //   ],
      // },
      { test: /\.ts(x)?$/, loader: "ts-loader", exclude: /node_modules/ },
      // { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: "Pulse Client",
    // }),
    new CopyWebpackPlugin([{ from: "public" }]),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].[contenthash].css",
    //   chunkFilename: "css/[id].[contenthash].chunk.css",
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
