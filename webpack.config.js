const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let production = {
  entry: './src/index.tsx',
  path: path.join(__dirname, 'dist'),
  publicPath: '/dist/',
  output: {
    filename: 'bundle.js',
    library: 'react-sequence',
    libraryTarget: 'umd', // universal module definition
  },
  optimization: {
    minimize: true,
  },
};

const isDev = process.env.NODE_ENV === 'development'
const devWebpack = {
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
}

const commonWebpack = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html',
    }),
  ],
};

isDev ? Object.assign(commonWebpack, devWebpack) : Object.assign(commonWebpack, production)
module.exports = commonWebpack