var webpack = require('webpack');
var config = require('./webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(config);

exports.use = (app) => {
    app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath}))
    app.use(webpackHotMiddleware(compiler));
}




