const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (_, { mode = "development" }) => {
  const isProduction = mode === "production";

  return {
    mode,
    target: "web",
    entry: path.join(__dirname, "src", "index.tsx"),
    resolve: { extensions: [".tsx", ".ts", ".jsx", ".js", ".json"] },
    devServer: {
      hot: true,
      port: 5002,
      historyApiFallback: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[id].[contenthash].js",
      publicPath: isProduction ? "/" : "http://localhost:5002/",
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-typescript"],
              plugins: [!isProduction && require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      !isProduction && new ReactRefreshWebpackPlugin(),
      new ModuleFederationPlugin({
        name: "RemoteApp",
        filename: "remote-app-entry.js",
        shared: {
          react: { singleton: true, eager: true, requiredVersion: "^18.2.0" },
          "react-dom": { singleton: true, eager: true, requiredVersion: "^18.2.0" },
          "react-router": { singleton: true, eager: true },
          zustand: { singleton: true },
        },
        exposes: {
          "./App": "./src/App",
        },
        remotes: {
          UIApp: "UIApp@http://localhost:5003/assets/ui-app-entry.js",
          HostApp: "HostApp@http://localhost:5001/assets/host-app-entry.js",
          StoreApp: "StoreApp@http://localhost:5004/assets/store-app-entry.js",
        },
      }),
    ].filter(Boolean),
  };
};
