/**
 * Created by Stone on 2016/11/10.
 */
"use strict";
var menuDal = require('../dal/menu');

var MenuBLL = new Object();
//add menu
MenuBLL.addMenu = function (info) {
    info.status = 1;
    info.addtime = new Date();
    info.updatetime = new Date();
    return menuDal.create(info);
};
//ɾ
MenuBLL.deleteMenu = function (info) {
    return menuDal.delete(info);
};
//
MenuBLL.getList = function (info) {
    var fields = null;
    var sort = {sort: {'index': 1}};
    return menuDal.find(info, fields, sort);
};
//
MenuBLL.update = function (info, updatecol) {
    return menuDal.update(info, updatecol);
};


MenuBLL.getMenu = function (current) {

    return MenuBLL.getList({})
        .then(list=> {
            list.map((item)=> {
                if (item.attr == current) {
                    item.current = true;
                }
                return item;
            });
            return list;
        });

};

module.exports = MenuBLL;



