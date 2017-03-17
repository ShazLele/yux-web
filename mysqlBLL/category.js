/**
 * Created by Stone on 2016/11/12.
 */
"use strict";
var CategoryDal = require('../dal/category'),
    q = require('q'),
    moment = require('moment');

var CategoryBLL = new Object();
//增
CategoryBLL.addInfo = function (info) {
    var defer = q.defer();
    info.status = 1;
    info.addtime = moment().format('YYYY-MM-DD hh:mm:ss');
    info.updatetime = moment().format('YYYY-MM-DD hh:mm:ss');
    CategoryDal.create(info, function (res) {
        //callback(res);
        defer.resolve(res);
    });
    return defer.promise;
};
//删
CategoryBLL.deleteInfo = function (info, callback) {
    CategoryDal.delete(info, function (res) {
        //删除二级菜单
        //。。。。。。。。
        callback(res);
    });
};
//查
CategoryBLL.getList = function (info) {
    var defer = q.defer();
    var fields = null;//查询所有的列
    var sort = {sort: {'updatetime': -1}};
    CategoryDal.find(info, fields, sort, function (res) {
        defer.resolve(res);
    });
    return defer.promise;
};

CategoryBLL.findById = function (id, callback) {
    CategoryDal.findById(id, function (res) {
        callback(res);
    });
};
//改
CategoryBLL.update = function (info, updatecol, callback) {
    CategoryDal.update(info, updatecol, function (res) {
        callback(res);
    });
};


module.exports = CategoryBLL;



