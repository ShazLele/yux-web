/**
 * Created by Stone on 2016/4/18.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
    targetid: String,//  target id  is articleid
    targetname: String,
    targetuid: String,
    targetuname: String,
    rebackid: String, // to  id
    rebackname: String,//  to  name
    userid: String,//  from id
    nickname: String, // from name
    content: String,
    addtime: String, //
    status: Number
});

module.exports = Comment;