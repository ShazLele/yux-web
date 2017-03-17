/**
 * Created by Stone on 2016/11/10.
 */
"use strict";
var express = require('express'),
    bll = require('../../bll'),
    common = require('../../common');

var router = express.Router();

router.get('/index', function (req, res) {
    var user = req.cookies['userInfo'];
    if (!user) {
        return res.redirect('/login');
    }
    common.render.initLayOut(req, 'usercenter', {title: '用户中心', usercenter: true})
        .then((viewObj)=> {
            res.render('user/index', viewObj);
        })
});

module.exports = router;