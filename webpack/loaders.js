const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const env = require('./env')
const urls = require('./urls')

const parentConfigFolder = path.resolve(urls.CONFIG, '../')
const postCssConfigPath = path.relative(parentConfigFolder, urls.CONFIG)

const cssLoaders = [
  env.serverMode
    ? 'style-loader'
    : MiniCssExtractPlugin.loader,
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
        path: postCssConfigPath + '/postcss.config.js',
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
        },
      },
    ],
  },
  css: {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [...cssLoaders],
  },
  sass: {
    test: /\.s?[ac]ss$/,
    include: urls.aliases['@sass'],
    exclude: /node_modules/,
    use: [...cssLoaders, {
      loader: 'sass-loader',
      options: {
        data: urls.aliasesSASS
      }
    }],
  },
  shader: {
    test: /\.(glsl|frag|vert)$/,
    exclude: /node_modules/,
    use: ['raw-loader', 'glslify-loader'],
  },
  // .concat(
  //   !env.devMode
  //     ? [
  //       {
  //         loader: 'image-webpack-loader',
  //         options: {
  //           mozjpeg: {
  //             progressive: true,
  //             quality: 80,
  //           },
  //           optipng: {},
  //           pngquant: {
  //             quality: '70-85',
  //             speed: 6,
  //           },
  //           svgo: {
  //             addClassesToSVGElement: true,
  //           },
  //           gifsicle: {
  //             interlaced: true,
  //             color: 286,
  //           },
  //           // the webp option will enable WEBP
  //           webp: {
  //             quality: 80,
  //           },
  //         },
  //       },
  //     ]
  //     : []
  // ),
}
