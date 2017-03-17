/**
 * Created by Stone on 2016/4/17.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    email: {
        type: String
    },
    password: String,
    nickname: String,
    role: {
        type: Number,
        default: 2
    }, //1 all 2 user 3 admin 4 superAdmin
    avatarUrl: String,
    desc: String,
    status: {
        type: Number,
        default: 0
    },
    third: {
        type: String,
        default: 'wx'
    },
    account: String, //openid
    code: String, //back pwd
    addtime: Date,
    updatetime: Date,
    lastlogintime: Date,
});

module.exports = User;

