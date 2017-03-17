/**
 * Created by Stone on 2016/11/12.
 */
"use strict";
var db = require('../model');
exports.create = function (info) {
    return db.Category.create(info);
};
exports.delete = function (info) {
    return db.Category.remove(info);
};

exports.find = function (info, fields, sort) {
    return db.Category.find(info, fields, sort);
};
exports.findById = function (id) {
    return db.Category.findById(id);
};
exports.update = function (info, updatecol) {
    updatecol = {$set: updatecol};
    return db.Category.update(info, updatecol);
};


