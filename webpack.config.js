const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: 'development',
   entry: {
       index: ['@babel/polyfill' ,'./scripts/index.js']
   },
   output: {
       filename: '[name].js',
       path: path.resolve(__dirname, 'dist'),

   },
   optimization: {
       splitChunks: {
           chunks: 'all'
       },
       minimizer: [
           new TerserWebpackPlugin(),
           new CssMinimizerPlugin(),
       ]
   },
   devServer: {
       port: 4200
   },
   plugins: [
       new HTMLWebpackPlugin({
           filename: 'index.html',
           template: './index.html',
           chunks: ['index'],
           minify: {
               collapseWhitespace: true
           }
       }),
       new CleanWebpackPlugin(),
       new MiniCssExtractPlugin({
           filename: 'styles/[name].css',
       })
   ],
   module: {
       rules: [
           {
               test: /\.html$/,
               use: 'html-loader'
           },
           {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader'],
            },
           {
               test: /\.(png|svg|jpg|jpeg|gif)$/i,
               type: 'asset/resource',
               generator: {
                filename: 'images/[name][ext]'
              }
           },
           {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            type: 'asset/resource',
            generator: {
             filename: 'fonts/[name][ext]'
           }
            },
           {
               test: /\.m?js$/,
               exclude: /node_modules/,
               use: {
                 loader: 'babel-loader',
                 options: {
                   presets: ['@babel/preset-env']
                 }
               }
             }
       ]
   }

}