/**
 * Created by Stone on 2016/11/10.
 */
// show
"use strict";
exports.menuList = [
    {index: 1, show: 2, role: 1, attr: 'index', url: '/index', title: '首页', position: 1},
    {index: 2, show: 2, role: 1, attr: 'article-list', url: '/article/list/1/0', title: '技术专栏', position: 1},
    {index: 3, show: 2, role: 1, attr: 'ui-list', url: '/article/list/2/0', title: 'UI专栏', position: 1},
    {index: 4, show: 1, role: 2, attr: 'article-add', url: '/article/add', title: '写文章', position: 1},
    {index: 5, show: 1, role: 3, attr: 'category-list', url: '/category/index', title: '分类管理', position: 1},
    {index: 5, show: 0, role: 1, attr: 'login', url: '/login', title: '登录', position: 2},
    {index: 6, show: 1, role: 2, attr: 'logout', url: '', title: '注销', position: 2},
    {index: 7, show: 0, role: 1, attr: 'register', url: '/register', title: '注册', position: 2},
    {index: 8, show: -1, role: 1, attr: 'error', url: '/error', title: '错误', position: 0}
];

exports.getMenu = function (current) {
    var menuList = exports.menuList;
    menuList.map((item)=> {
        item.current = item.attr == current;
        return item;
    });
    return menuList;
};