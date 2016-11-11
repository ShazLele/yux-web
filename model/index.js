/**
 * Created by Stone on 2016/4/17.
 */
var mongoose = require('mongoose'); //123.57.136.97:27017
// mongoose.connect('mongodb://127.0.0.1:27017/newspage', function(err) {
mongoose.connect('mongodb://123.57.136.97:27010/yux', function(err) {
    if (err) {
        console.log('conncet err:' + err);
    }
});

exports.User = mongoose.model('user', require('./user'));
exports.Article = mongoose.model('article', require('./article'));
exports.Comment = mongoose.model('comment', require('./comment'));
exports.Menu = mongoose.model('menu', require('./menu'));

exports.Common = require('./common');