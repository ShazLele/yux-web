var express = require('express')
    , bll = require('../bll')
    , common = require('../model/common');
var router = express.Router();


var indexHandle = function(req, res) {
    var user = req.cookies['userInfo'];
    bll.Article.getPageList({}, 1, 10, function(resmodel) {
        var articleList = resmodel.list;
        bll.Menu.getMenu('index').then((list)=> {
            res.render('index', { title: '首页', articleList: articleList, menus: list, user: user });
        })
    })
};

/* GET home page. */
router.get('/', indexHandle);
router.get('/index', indexHandle);
router.get('/login', function(req, res) {
    res.clearCookie('userInfo');
    bll.Menu.getMenu('login').then((list)=> {
        res.render('login', { title: '登录', menus: list, user: null });
    })

});
module.exports = router;
