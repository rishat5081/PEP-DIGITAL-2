const path = require("path"),
  nodeExternals = require("webpack-node-externals"),
  EJSWebpackPlugin = require("ejs-webpack-plugin");
module.exports = {
  entry: {
    main: "./app.js"
  },
  output: {
    path: path.resolve(__dirname, "webpackDist"),
    filename: "app.js",
    publicPath: "/webpackDist"
  },
  target: "node", // Or "async-node",
  externals: [nodeExternals()],
  mode: "development" /* or "development", or "none" */,
  devServer: {
    contentBase: __dirname + "/public/",
    inline: true,
    host: "0.0.0.0",
    port: 7851
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "ejs-loader",
            options: { minimize: false }
          }
        ]
      }
    ]
  },
  plugins: [
    new EJSWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
