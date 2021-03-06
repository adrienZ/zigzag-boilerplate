const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const env = require('./env')
const urls = require('./urls')
const config = require('../zigzag.config')

const { getInlineDataScss } = require('./helpers')

const cssLoaders = [
  env.webpack_server ? 'style-loader' : MiniCssExtractPlugin.loader,
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
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader',
  },
  js: {
    // ES6
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
              {
                debug: env.production,
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
          ],
        },
      },
    ],
  },
  css: {
    test: /\.css$/,
    exclude: /(node_modules|bower_components)/,
    use: [...cssLoaders],
  },
  sass: {
    test: /\.s?[ac]ss$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      ...cssLoaders,
      {
        loader: 'sass-loader',
        options: {
          data: getInlineDataScss(config.globals),
        },
      },
    ],
  },
  shader: {
    test: /\.(glsl|frag|vert)$/,
    exclude: /(node_modules|bower_components)/,
    use: ['raw-loader', 'glslify-loader'],
  },
  vue: {
    test: /\.vue$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'vue-loader',
  },
}
