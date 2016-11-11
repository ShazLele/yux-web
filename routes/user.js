/**
 * Created by Stone on 2016/11/10.
 */
var express = require('express'),
    bll = require('../bll');
var router = express.Router();

router.get('/index', function(req, res) {
    bll.Menu.getMenu('usercenter').then((list)=> {
        res.render('user/index', { title: '用户中心', menus: list, user: req.cookies['userInfo'],usercenter:true })
    })
});

module.exports = router;