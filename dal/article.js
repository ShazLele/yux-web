/**
 * Created by Stone on 2016/4/18.
 */
"use strict";
var db = require('../model');

exports.create = function (info) {
    return db.Article.create(info);
};
exports.delete = function (info) {
    return db.Article.remove(info);
};
exports.findPage = function (info, fields, sort, pageIndex, pageSize) {
    //先查询分类
    return db.Article
        .find(info, fields, sort)
        .populate('category', '_id name')
        .populate('comments', '_id')
        .populate('user', '_id nickname')
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize);

};
exports.find = function (info, fields, sort) {
    return db.Article
        .find(info, fields, sort)
        .populate('category', '_id name')
        .populate('comments', '_id')
        .populate('user', '_id nickname');
};
exports.findById = function (id) {
    return db.Article
        .findById(id)
        .populate('category', '_id name')   //字段名
        .populate('comments')
        .populate('user', '_id email nickname');

};
exports.update = function (info, updatecol) {
    updatecol = {$set: updatecol};

    return db.Article.update(info, updatecol);
};


