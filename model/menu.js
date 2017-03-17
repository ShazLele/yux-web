/**
 * Created by Stone on 2016/11/10.
 */
"use strict";
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    index: Number,//sort
    title: String,
    url: String,
    position: Number,  // 1 left  2 right 3 center
    role: Number, //1 all 2 user 3 admin 4 superAdmin
    show: Number,  // 0 unlogin 1 login 2 all
    attr: String,
    addtime: Date,
    updatetime: Date,
    status: Number
});