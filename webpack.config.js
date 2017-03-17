"use strict";
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const APP_PATH = path.join(__dirname, 'public');
const BUILD_PATH = path.join(__dirname, 'build');
module.exports = {

    entry: [
        'webpack-hot-middleware/client',
        path.join(APP_PATH, 'js', 'user', 'index.jsx')
    ],
    output: {
        path: path.join(BUILD_PATH, 'js', 'user'),
        filename: 'bundle.js',
        publicPath: '/user/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel'],
                include: APP_PATH,

            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", 'css!sass')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.HotModuleReplacementPlugin()
    ]
};