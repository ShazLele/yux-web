/**
 * Created by Stone on 2016/4/18.
 */
"use strict";
var moment = require('moment'),
    db = require('../model');

exports.find = function (user, fields, sort) {
    return db.User.find(user, fields, sort);
};
exports.findOne = function (user, fields) {
    return db.User.findOne(user, fields);
};

exports.create = function (user) {
    var createtime = moment().format('YYYY-MM-DD hh:mm:ss');
    user.addtime = createtime;
    user.updatetime = createtime;
    return db.User.create(user);
};
exports.update = function (user, updatecol) {
    updatecol.updatetime = moment().format('YYYY-MM-DD hh:mm:ss');
    updatecol = {$set: updatecol};
    return db.User.update(user, updatecol);
};
exports.delete = function (id) {
    return db.User.remove({_id: id});
}