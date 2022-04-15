const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {merge} = require('webpack-merge');

let production = {
  mode: "production",
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    library: 'react-pin-component',
    libraryTarget: "commonjs-module",
    },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /example/],
      },
    ],
  },
};

const isDev = process.env.NODE_ENV === 'development';

const devWebpack = {
  mode: "production",
  entry: './example/app.tsx',
    devServer: {
      // static: {
      //   directory: path.join(__dirname, 'dist/renderer.js')
      // },
      compress: true,
      port: 9000,
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './example/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
}

const commonWebpack = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts'],
  }
};

if (isDev) module.exports = merge(commonWebpack, devWebpack)
if (!isDev) module.exports = merge(commonWebpack, production)