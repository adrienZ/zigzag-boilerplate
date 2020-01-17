const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const env = require('./env')
const urls = require('./urls')
const data = require('./dataInjection')

const cssLoaders = [
  env.serverMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      // dont check urls because relative aliases can't be resolved during compilation
      url: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        // postcss path is relative to the root
        path: path.relative(urls.BASE_URL, urls.CONFIG) + '/postcss.config.js',
      },
    },
  },
]

module.exports = {
  eslint: {
    // ES6
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    include: urls.aliases['@js'],
    loader: 'eslint-loader',
  },
  js: {
    // ES6
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    include: urls.aliases['@js'],
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [['env', { modules: false }]],
          plugins: ['syntax-dynamic-import', 'transform-object-rest-spread'],
        },
      },
    ],
  },
  css: {
    test: /\.css$/,
    // exclude: /node_modules/,
    use: [...cssLoaders],
  },
  sass: {
    test: /\.s?[ac]ss$/,
    // include: urls.aliases['@sass'],
    // exclude: /node_modules/,
    use: [
      ...cssLoaders,
      {
        loader: 'sass-loader',
        options: {
          data: data.sass,
        },
      },
    ],
  },
  shader: {
    test: /\.(glsl|frag|vert)$/,
    exclude: /node_modules/,
    use: ['raw-loader', 'glslify-loader'],
  },
}
