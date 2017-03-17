/**
 * Created by Stone on 2016/4/18.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Status = new Schema({
    type: Number,//1 ���� -1 ɾ�� 2 �����
    name: String,
    desc: String
});

module.exports = Status;