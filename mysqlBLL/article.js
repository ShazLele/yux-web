/**
 * Created by Stone on 2016/4/18.
 */
"use strict";
var q = require('q'),
    moment = require('moment'),
    ArticleDal = require('../dal/article'),
    CommentDal = require('../dal/comment');

var ArticleBLL = new Object();
//增
ArticleBLL.addArticle = function (info) {
    var defer = q.defer();
    info.status = 1;
    info.addtime = moment().format('YYYY-MM-DD hh:mm:ss');
    info.updatetime = moment().format('YYYY-MM-DD hh:mm:ss');
    ArticleDal.create(info, function (res) {
        defer.resolve(res);
    });
    return defer.promise;
};
//删
ArticleBLL.deleteArticle = function (info) {
    return new Promise((resolve) => {
        ArticleDal.delete(info, function (data) {
            var comment = {
                targetid: info._id
            };
            CommentDal.delete(comment);
            resolve(data);
        });
    })

};
//查
ArticleBLL.getList = function (info) {
    let defer = q.defer();
    let fields = `_id title category addtime reading  wallpic
                    comments  desc level  status updatetime user `;//查询所有的列
    let sort = {sort: {'level': -1, 'addtime': -1}};
    ArticleDal.find(info, fields, sort, function (res) {
        defer.resolve(res);
    });
    return defer.promise;
};
ArticleBLL.getPageList = function (info, pageIndex, pageSize) {
    var defer = q.defer();
    var fields = null;//查询所有的列
    var sort = {sort: {'level': -1, 'addtime': -1}};
    ArticleDal.findPage(info, fields, sort, parseInt(pageIndex), parseInt(pageSize), function (res) {
        defer.resolve(res);
    });
    return defer.promise;
};
ArticleBLL.findById = function (id) {
    let defer = q.defer();
    ArticleDal.findById(id, function (res) {
        defer.resolve(res);
    });
    return defer.promise;
};
//改
ArticleBLL.update = function (info, updatecol) {
    var defer = q.defer();
    updatecol.updatetime = moment().format('YYYY-MM-DD hh:mm:ss');
    ArticleDal.update(info, updatecol, function (res) {
        defer.resolve(res);
    });
    return defer.promise;
};

ArticleBLL.updateReading = function (id) {
    ArticleDal.findById(id, function (data) {
        if (data.isSuccess && data.obj) {
            var reading = data.obj.reading ? data.obj.reading + 1 : 1;
            ArticleDal.update({_id: id}, {reading: reading});
        }
    })
};

module.exports = ArticleBLL;



