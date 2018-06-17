const path = require('path');
const webpack = require('webpack');

module.exports = env => {

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'app.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          BACKEND_HOST: `'http://localhost:8080'`,
          DEBUG: true
        }
      })
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
  }
};
