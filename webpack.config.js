module.exports = {

  entry: __dirname + "/public/index.jsx",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public" // 页面加载目录，加载页面默认为index.html
  },
 module: {
    rules: [
         { test: /\.(jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
     ]    
  }
};
