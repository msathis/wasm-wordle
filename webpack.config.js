const HtmlWebpackPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", '.less'],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash].js",
  },
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
    static: "./dist",
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public/5-words.txt", to: "." },
        { from: "public/well-done.svg", to: "." },
      ],
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
      filename: "index.html",
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "./lib")
    }),
  ],
  mode: "development",
  devtool: "inline-source-map",
  experiments: {
    asyncWebAssembly: true
  }
};
