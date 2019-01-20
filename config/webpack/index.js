import path from 'path';
// creates an index.html file with proper reference to js and css files
import HtmlWebpackPlugin from 'html-webpack-plugin';
// build cleans everytime the dist folder.
import CleanWebpackPlugin from 'clean-webpack-plugin';

import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';

const {
  BundleAnalyzerPlugin,
} = WebpackBundleAnalyzer;

const outputDirectory = 'dist';

export default {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000',
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
      }],
    },
    ],
  },
  devServer: {
    port: 5000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // favicon: './public/favicon.ico'
    }),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
    }),
  ],
};