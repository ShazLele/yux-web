/**
 * Created by Stone on 2016/11/14.
 */
"use strict";
var common = require('../common'),
    bll = require('../bll');

exports.initLayOut = function (req, current, paramObj) {

    let user = req.cookies['userInfo'];
    paramObj.menus = common.menu.getMenu(current);
    paramObj.user = user;

    return bll.Category.getList({})
        .then((category) => {
            paramObj.categoryList = category;
            return bll.Article.getPageList({}, 1, 5);
        })
        .then((list) => {
            paramObj.recentArticles = list;
            return paramObj;
        });
}
exports.initLayOutSimple = (req, current, paramObj) => {
    let user = req.cookies['userInfo'];
    paramObj.menus = common.menu.getMenu(current);
    paramObj.user = user;
    return new Promise((resolve) => {
        resolve(paramObj);
    })

}
exports.permission = function (req, role) {
    let user = req.cookies['userInfo'];
    return (user && role <= user.role);
}