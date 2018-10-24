var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode:'development',
  entry: "./example/app.js",
  output: {
    path: path.join(__dirname,'output'),
    filename: "bundle.js",
    publicPath: '/',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },
  devServer: {
    contentBase: path.join('example'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.es6'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      { test: /\.jsx$|\.es6$|\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.scss$|\.css$/, loader: 'style-loader!style-loader!css-loader!sass-loader'},
      { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true'},
      { test: /\.json/, loader: 'json-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: "cheap-source-map"
};
