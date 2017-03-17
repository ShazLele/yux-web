/**
 * Created by Stone on 2016/11/10.
 */
"use strict";
var db = require('../model');

exports.create = function (info) {
    return db.Menu.create(info);
};
exports.delete = function (info) {
    return db.Menu.remove(info);
};
exports.find = function (info, fields, sort) {
    return db.Menu.find(info, fields, sort);
};
exports.findById = function (id) {
    return db.Menu.findById(id);
};
exports.update = function (info, updatecol) {
    updatecol = {$set: updatecol};
    return db.Menu.update(info, updatecol);
};
