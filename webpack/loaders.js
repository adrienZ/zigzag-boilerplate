const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const env = require('./env')
const urls = require('./urls')

const parentConfigFolder = path.resolve(urls.CONFIG, '../')
const postCssConfigPath = path.relative(parentConfigFolder, urls.CONFIG)

const cssLoaders = [
  env.serverMode
    ? 'style-loader'
    : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // fix urls of fonts, img.. etc
          publicPath: urls.prod.root,
        },
      },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      url: true,
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

//  shorten manifest paths, to reduce manifest size
const relativePath = file => {
  const dir = path.relative(urls.dev.root, path.parse(file).dir + '/')
  const filename = env.devMode ? '[name].[ext]' : '[name].[hash].[ext]'
  return dir + (dir ? '/' : '') + filename
}

module.exports = {
  eslint: {
    // ES6
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    include: urls.aliases['@js'],
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
    use: [...cssLoaders],
  },
  sass: {
    test: /\.s?[ac]ss$/,
    include: urls.aliases['@sass'],
    exclude: /node_modules/,
    use: [...cssLoaders, 'sass-loader'],
  },
  shader: {
    test: /\.(glsl|frag|vert)$/,
    exclude: /node_modules/,
    use: ['raw-loader', 'glslify-loader'],
  },
  files: {
    test: /\.(jpg|png|jpeg|gif|tiff|cr2|svg|mp4|avi|ogg|webm|json|woff|woff2|eot|ttf|obj)$/i,
    // include: urls.aliases['@img'],
    exclude: /node_modules/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: relativePath,
        },
      },
    ],
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
  },
}
