/**
 * Created by Stone on 2016/11/12.
 */
"use strict";
var CategoryDal = require('../dal/category'),
    moment = require('moment');

var CategoryBLL = new Object();
//增
CategoryBLL.addInfo = function (info) {
    info.status = 1;
    info.addtime = moment().format('YYYY-MM-DD hh:mm:ss');
    info.updatetime = moment().format('YYYY-MM-DD hh:mm:ss');
    return CategoryDal.create(info);

};
//删
CategoryBLL.deleteInfo = function (info) {
    return CategoryDal.delete(info);
};
//查
CategoryBLL.getList = function (info) {
    var fields = null;//查询所有的列
    var sort = {sort: {'updatetime': -1}};
    return CategoryDal.find(info, fields, sort);
};

CategoryBLL.findById = function (id) {
    return CategoryDal.findById(id);
};
//改
CategoryBLL.update = function (info, updatecol) {
    return CategoryDal.update(info, updatecol);
};


module.exports = CategoryBLL;



