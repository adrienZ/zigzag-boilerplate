const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const env = require('./env')
const urls = require('./urls')

const cssOutputPath = path.resolve(urls.prod.assets, 'css/')
const relativeCssOutput = path.relative(urls.prod.base, cssOutputPath) + '/'
const configPath = path.relative(urls.BASE_URL, urls.CONFIG) + '/'

const extractSass = new ExtractTextPlugin({
  filename: env.devMode ? relativeCssOutput + '[name].css' : relativeCssOutput + '[name].[contenthash].css',
  disable: env.devMode,
  allChunks: true,
})

const cssLoaders = [
  { loader: 'css-loader', options: { importLoaders: 1, url: true } },
  {
    loader: 'postcss-loader',
    options: {
      plugins: loader => [require('autoprefixer')], // eslint-disable-line
      config: {
        path: configPath + 'postcss.config.js',
      },
    },
  },
]

let setFileFolder = file => {
  const dir = path.relative(urls.dev.base, path.parse(file).dir + '/')

  const filename = env.devMode ? '[name].[ext]' : '[name].[hash].[ext]'

  return dir + (dir ? '/' : '') + filename
}

module.exports = {
  eslint: {
    // ES6
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ['eslint-loader'],
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
        },
      },
    ],
  },
  css: {
    test: /\.css$/,
    exclude: /node_modules/,
    use: extractSass.extract({
      fallback: 'style-loader',
      use: [...cssLoaders],
    }),
  },
  sass: {
    test: /\.scss$/,
    include: urls.aliases['@sass'],
    exclude: /node_modules/,
    use: extractSass.extract({
      use: [...cssLoaders, 'sass-loader'],
      fallback: 'style-loader',
    }),
  },
  files: {
    test: /\.(mp4|avi|ogg|webm|json|woff|woff2|eot|ttf|svg)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: file => setFileFolder(file),
        },
      },
    ],
  },
  imgs: {
    test: /\.(jpg|png|jpeg|gif|tiff|cr2)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: file => setFileFolder(file),
        },
      },
      {
        loader: 'img-loader',
        options: {
          enabled: !env.devMode,
        },
      },
    ],
  },
  extractSass,
}
