const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const env = require("./env");
const urls = require("./urls");

const cssOutputPath = path.resolve(urls.prod.assets, "css/")
const relativeCssOutput = path.relative(urls.prod.base, cssOutputPath) + "/";
const configPath = path.relative(urls.BASE_URL, urls.CONFIG) + "/"


const extractSass = new ExtractTextPlugin({
  filename: env.devMode
    ? relativeCssOutput + "[name].css"
    : relativeCssOutput + "[name].[contenthash].css",
  disable: env.devMode,
  allChunks: true
});

const cssLoaders = [
  { loader: "css-loader", options: { importLoaders: 1, url: true } },
  {
    loader: "postcss-loader",
    options: {
      plugins: loader => [require("autoprefixer")],
      config: {
        path: configPath + 'postcss.config.js'
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
      // 'url-loader',
      {
        loader: 'file-loader',
        options: {
          limit: 1024,
          name: (file) => path.relative(
            urls.dev.base,
            path.parse(file).dir
          ) + '/[name].[hash].[ext]'
        }
      }]
  },
  extractSass,
};
