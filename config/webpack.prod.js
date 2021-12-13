/* 
webpack的配置文件
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // 入口文件 简化写法
  entry: ['./src/js/index.js', './src/index.html'],
  /* // 入口文件正常写法
  entry: {
    main: './src/js/index.js';
  } */

  // 输出文件
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/index.js',
    publicPath: '/'
  },

  // 配置文件模式
  mode: 'production',

  /* 
  loader
  所有loader的配置都要在module对象中的rules属性中
  rules是一个数组 数组中的每一个对象就是一个loader
  1. 安装
  2. 声明使用
   */
  module: {
    rules: [
      // less-loader 解析less
      {
        test: /\.less$/i, //匹配.less文件
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // 将less文件编译成的css文件编译为commonJS一个模块

          // 配置css兼容性
          /* {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                require('postcss-normalize')(),
              ],
              sourceMap: true,
            },
          }, */

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },

          'less-loader' //将less文件编译成css文件在内存中
        ],
      },

      // eslint-loader js语法检查
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
        }
      },

      // babel-loader 语法转化 ES6转化ES5
      {
        test: /\.js$/,
        exclude: /node_modules|/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  // caller.target 等于 webpack 配置的 target 选项
                  corejs: { version: 3 },
                  targets: {
                    "chrome": "58",
                    "ie": "9"
                  }
                }
              ]
            ],
            cacheDirectory: true
          }
        }
      },

      // 使用url-loader处理图片
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '/images/',
              outputPath: 'images',
              name: '[path:5].[ext]',
            },
          },
        ],
      },

      // 处理html中使用到src的标签
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },

      // file-loader 处理其它资源
      {
        test: /\.(eot|ttf|svg|woff)$/,
        type: 'asset/resource'
      }

    ]
  },

  /* 
  设置插件
  1. 安装
  2. 引入
  3. 实例化
   */
  plugins: [
    // 打包html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),

    // 清空打包文件目录
    new CleanWebpackPlugin(),

    // 独立打包CSS文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),

    // 压缩Css
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      cssProcessorOptions: { // 解决没有source map问题
        map: {
          inline: false,
          annotation: true,
        }
      }
    })

  ],

  /* 
  查找错误源码
   */
  devtool: "cheap-module-source-map"
};
