/**
 * Created by Stone on 2016/4/17.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Article = new Schema({
    userid: String,
    email: String,
    nickname: String,
    wallpic: String,
    title: String,
    desc: String,
    content: String,
    reading: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'  //model name
    }],
    column: Number,
    level: Number,
    status: Number,
    addtime: Date,
    updatetime: Date
});

module.exports = Article;