const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 3003,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "BASKET",
      filename: "remoteEntry.js",
      remotes: {
        SHELL: "SHELL@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./App": "./src/App",
      },
      shared: [
        {
          ...deps,
          react: { requiredVersion: deps.react, singleton: true },
          "react-dom": {
            requiredVersion: deps["react-dom"],
            singleton: true,
          },
          "@mui/material": {
            requiredVersion: deps["@mui/material"],
            singleton: true,
          },
          "@emotion/react": {
            requiredVersion: deps["@emotion/react"],
            singleton: true,
          },
          "@emotion/styled": {
            requiredVersion: deps["@emotion/styled"],
            singleton: true,
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
