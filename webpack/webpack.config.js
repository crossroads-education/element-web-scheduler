const webpack = require('webpack');
const path = require('path')
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

const root = path.resolve(__dirname, '..')
module.exports = {
    mode:'production',
    entry: {
        Scheduler: [root + "/src/index.js"],
    },
    output: {
        path: root + "/lib/",
        filename: '[name].js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.es6'],
        modules: ['node_modules']
    },
    externals: {
        'react': 'React',
        'moment': 'moment',
        'react-dom': 'ReactDOM'
    },
    module: {
        rules: [
            { test: /\.jsx$|\.es6$|\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$|\.css$/, loader: 'style-loader!style-loader!css-loader!sass-loader' },
            { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
            { test: /\.json/, exclude: /node_modules/, loader: 'raw-loader' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /^\.\/(zh-cn)$/
        ),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    
};
