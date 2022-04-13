const path = require('path');

let entry = './src/index.tsx';
let output = {
  path: path.join(__dirname, 'dist'),
  publicPath: '/dist/',
};

if (process.env.NODE_ENV === 'dev') {
  entry = './example/index.js';
  output = {
    path: path.join(__dirname, 'example'),
    publicPath: '/example/',
  };
}

module.exports = {
  entry,
  output: Object.assign(output, {
    filename: 'bundle.js',
    library: 'react-sequence',
    libraryTarget: 'umd', // universal module definition
  }),
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
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
};