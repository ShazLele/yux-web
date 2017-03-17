/**
 * Created by Stone on 2016/11/12.
 */
"use strict";
var mongoose = require('mongoose');


module.exports = new mongoose.Schema({
    name: String,
    desc: String,
    index: Number,
    level: Number,
    parentid: mongoose.Schema.Types.ObjectId,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    column: {
        type: Number,
        default: 1
    },
    addtime: Date,
    updatetime: Date
});