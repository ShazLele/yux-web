/**
 * Created by Stone on 2016/11/10.
 */
var menuDal = require('../dal/menu'),
    q = require('q');

var MenuBLL = new Object();
//增
MenuBLL.addMenu = function(info, callback) {
    info.status = 1;
    info.addtime = new Date();
    info.updatetime = new Date();
    menuDal.create(info, function(res) {
        callback(res);
    });
};
//删
MenuBLL.deleteMenu = function(info, callback) {
    menuDal.delete(info, function(res) {
        callback(res);
    });
};
//查
MenuBLL.getList = function(info, callback) {
    var fields = null;//查询所有的列
    var sort = { sort: { 'index': 1 } };
    menuDal.find(info, fields, sort, function(res) {
        callback(res);
    });
};
//改
MenuBLL.update = function(info, updatecol, callback) {
    menuDal.update(info, updatecol, function(res) {
        callback(res);
    });
};


MenuBLL.getMenu = function(current) {
    var menuList = [];
    var defer = q.defer();
    MenuBLL.getList({}, function(data) {
        if (data && data.isSuccess) {
            menuList = data.list;
            menuList.map(function(item) {
                if (item.attr == current) {
                    item.current = true;
                }
                return item;
            });
        }
        defer.resolve(menuList);
    });
    return defer.promise;
};

module.exports = MenuBLL;



