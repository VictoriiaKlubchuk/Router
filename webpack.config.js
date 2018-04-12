'use strict';
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: [
    './src/index.js',
    // './src/scss/style.scss'
  ],
  output: {
    filename: './bundle.js'
  },
  devtool: "source-map",
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },

  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src/js'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: 'env'
        }
      }
    },
    // {
    //   test: /\.(scss)$/,
    //   include: path.resolve(__dirname, 'src/scss'),
    //   use: ExtractTextPlugin.extract({
    //     use: [
    //     {
    //       loader: "css-loader",
    //       options: {
    //         sourceMap: true,
    //         minimize: true,
    //         url: false
    //       }
    //     },
        // {
        //   loader: "sass-loader",
        //   options: {
        //     sourceMap: true
        //   }
        // }
        // ]
      // })
    // },
    {
      test: /\.html$/,
      include: path.resolve(__dirname, './src'),
      use: [{
        loader: 'html-loader',
      }]
    }

    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new ExtractTextPlugin({
    //   filename: './css/style.bundle.css',
    // }),
    new CopyWebpackPlugin([{
        from: './src/index.html',
        to: './'
      },
      // {
      //   from: './src/img',
      //   to: './img'
      // }
    ]),
  ]
};