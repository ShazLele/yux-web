/**
 * Created by Stone on 2016/4/17.
 */
"use strict";
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const mongoUrl = 'mongodb://qiumohanyu:wzlei19890803@139.129.213.117:27010/yux';
mongoose.connect(mongoUrl, function (err) {
    if (err) {
        console.log('conncet err:' + err);
    }
});

exports.User = mongoose.model('user', require('./user'));
exports.Article = mongoose.model('article', require('./article'));
exports.Comment = mongoose.model('comment', require('./comment'));
exports.Menu = mongoose.model('menu', require('./menu'));
exports.Category = mongoose.model('category', require('./category'), 'category');