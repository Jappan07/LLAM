const path = require("path");
const cesiumSrc = "./node_modules/cesium/Build/CesiumUnminified";
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/cesium/Build/Cesium/Workers"),
            to: path.join(__dirname, 'Workers')
          },
          {
            from: path.join(__dirname, "node_modules/cesium/Build/Cesium/Assets"),
            to: path.join(__dirname, 'Assets')
          },
          {
            from: path.join("node_modules/cesium/Build/Cesium/Widgets"),
            to: path.join(__dirname, 'Widgets')
          }
        ]
      }));

    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("/")
      })
    );

    // Important: return the modified config
    return config
  },
}