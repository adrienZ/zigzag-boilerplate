const ExtractTextPlugin = require("extract-text-webpack-plugin");
const env = require('./env');

const extractSass = new ExtractTextPlugin({
  filename: "src/css/[name].css",
  // disable:   env.fullJsApp || env.devMode ,
  allChunks: true,
});

const cssLoaders = [
  { loader: "css-loader", options: { importLoaders: 2 } },
  {
    loader: "postcss-loader",
    options: {
      plugins: loader => [require("autoprefixer")],
    },
  },
];

module.exports = {
  eslint: {
        // ES6
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["eslint-loader"],
  },
  js: {
    // ES6
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ["babel-loader"],
  },
  css: {
    test: /\.css$/,
    use: extractSass.extract({
      fallback: "style-loader",
      use: [...cssLoaders],
    })
  },
  sass: {
    test: /\.scss$/,
    use: extractSass.extract({
      use: [...cssLoaders, "sass-loader"],
      fallback: "style-loader",
    })
  },
  files: {
    test: /\.(woff|woff2|eot|ttf|svg|jpg|png|jpeg|gif|tiff|cr2)$/,
    loader: "url-loader?limit=100",
  },
  extractSass: extractSass,
};
