/**
 * Created by Stone on 2016/4/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    nickname: String,
    desc: String,
    addtime: Date,
    updatetime: Date,
    lastlogintime: Date,
    status: Number
});

module.exports = User;

