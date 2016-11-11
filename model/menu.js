/**
 * Created by Stone on 2016/11/10.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    index: Number,//sort
    title: String,
    url: String,
    position: Number,  // 1 left  2 right 3 center
    permission: Number, //1 all 2 account 3 admin
    show: Number,  // 0 unlogin 1 login 2 all
    attr: String,
    addtime: Date,
    updatetime: Date,
    status: Number
});