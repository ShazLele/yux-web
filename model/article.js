/**
 * Created by Stone on 2016/4/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Article = new Schema({
    userid: String,
    email: String,
    nickname: String,
    title: String,
    desc: String,
    content: String,
    reading: {
        type: Number,
        default: 0
    },
    status: Number,
    addtime: Date,
    updatetime: Date
});

module.exports = Article;