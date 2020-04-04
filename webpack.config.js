const HtmlWebpackPlugin = require("html-webpack-plugin"); //通过 npm 安装
const webpack = require("webpack"); //访问内置的插件
const path = require("path");

module.exports = {
  entry: __dirname + "/app/index.jsx",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: "./public", // 页面加载目录，加载页面默认为index.html
  },

  module: {
    rules: [
      { test: /\.(jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.ts$/, use: "ts-loader" },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.less$/, loader: "style!css!postcss!less" },
      { test: /\.(png|gif|jpg|jpeg|bmp)$/i, loader: "url-loader?limit=5000" }, // 限制大小5kb
      {
        test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
        loader: "url-loader?limit=5000",
      }, // 限制大小小于5k
      {
        test: /(\.css|\.less)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true, // 指定启用css modules
              localIdentName: "[name]__[local]--[hash:base64:5]", // 指定css的类名格式
            },
          },
          {
            loader: "less-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
        exclude: /node_modules/, //那些文件不需要用上述loader
      },
      {
        test: /(\.css|\.less)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
        exclude: /src/, //那些文件不需要用上述loader
      },
    ],
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin(),
  //   new HtmlWebpackPlugin({template: './src/index.html'})
  // ]
};
