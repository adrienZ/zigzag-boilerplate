const ExtractTextPlugin = require("extract-text-webpack-plugin");
const env = require("./env");
const urls = require("./urls");

const extractSass = new ExtractTextPlugin({
  filename: env.devMode
    ? "src/css/[name].css"
    : "src/css/[name].[contenthash].css",
  disable: env.devMode,
  allChunks: true
});

const cssLoaders = [
  { loader: "css-loader", options: { importLoaders: 1, url: false } },
  {
    loader: "postcss-loader",
    options: {
      plugins: loader => [require("autoprefixer")],
      config: {
        path: 'config/postcss.config.js'
      }
    }
  }
];

module.exports = {
  eslint: {
    // ES6
    enforce: "pre",
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ["eslint-loader"]
  },
  js: {
    // ES6
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ["babel-loader"]
  },
  css: {
    test: /\.css$/,
    exclude: /node_modules/,
    use: extractSass.extract({
      fallback: "style-loader",
      use: [...cssLoaders]
    })
  },
  sass: {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: extractSass.extract({
      use: [...cssLoaders, "sass-loader"],
      fallback: "style-loader"
    })
  },
  files: {
    test: /\.(jpe?g|png|gif|svg|mp4|avi|ogg|webm|json|woff|woff2|eot|ttf|svg|jpg|png|jpeg|gif|tiff|cr2)$/i,
    exclude: /node_modules/,
    use: [
    'url-loader',
    {
      loader: 'file-loader',
      options: {
        limit: 1024,
        name: (file) => setFolder(file) + '[name].[ext]'
      }
    }]
  },
  extractSass,
};


const setFolder = file => {
  const filename = file.replace(/^.*[\\\/]/, '')

  return file
      .replace(urls.APP_ASSETS_URL + "media/", "")
      .replace(filename, "")
}
