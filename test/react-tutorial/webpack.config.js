const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "src/app.tsx"), // エントリーポイント修正
  },
  output: {
    path: path.resolve(__dirname, ""),
    filename: "[name].js",
  },
  resolve: {
    modules: [path.resolve(__dirname, "../../node_modules")],
    extensions: [".js", ".ts", ".tsx"], // ts, tsx 追加
  },
  module: {
    rules: [{
      test: [/\.ts$/, /\.tsx$/],
      use: [{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
            plugins: ["babel-plugin-styled-components"]
          },
        },
        'ts-loader',
      ],
    }, ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
  devtool: "source-map"
};