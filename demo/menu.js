/**
 * Created by Stone on 2016/11/10.
 */
var bll = require('../bll');

var menuList = [
    { index: 1, show: 2, attr: 'index', url: '/index', title: '首页', position: 1, permission: 1 },
    { index: 2, show: 2, attr: 'article-list', url: '/article/list', title: '文章列表', position: 1, permission: 1 },
    { index: 3, show: 1, attr: 'article-add', url: '/article/add', title: '写文章', position: 1, permission: 2 },
    { index: 4, show: 0, attr: 'login', url: '/login', title: '登录', position: 2, permission: 1 },
    { index: 5, show: 1, attr: 'logout', url: '/login', title: '注销', position: 2, permission: 1 },
    { index: 6, show: 0, attr: 'register', url: '/register', title: '注册', position: 2, permission: 1 }
];

for (var i in menuList) {
    bll.Menu.addMenu(menuList[i], function(data) {
        console.log(data);
    })
}

//bll.Menu.getList({}, function(data) {
//    console.log(data);
//});
