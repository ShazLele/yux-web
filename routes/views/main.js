"use strict";
var express = require('express'),
    bll = require('../../bll'),
    common = require('../../common');

var router = express.Router();


var indexHandle = function (req, res) {
    let viewObj = {};
    common.render.initLayOut(req, 'index', {title: ''})
        .then((obj) => {
                viewObj = obj;
                return bll.Article.getPageList({}, 1, 10)
            }
        )
        .then((articleList) => {
            viewObj.articleList = articleList;
            res.render('index', viewObj);
        })

};


/* GET home page. */
router.get('/', indexHandle);
router.get('/index', indexHandle);
router.get('/login', function (req, res) {
    res.clearCookie('userInfo');
    common.render.initLayOut(req, 'login', {title: '登录'})
        .then((viewObj) => {
            res.render('login', viewObj);
        });
});
router.get('/register', function (req, res) {
    common.render.initLayOut(req, 'register', {title: '注册'})
        .then((viewObj) => {
                res.render('register', viewObj);
            }
        )

});
router.get('/pwd/forget', function (req, res) {
    const code = req.params.code ? parseInt(req.params.code) : 0;

    res.render('pwd/forget', {code: code});
})

router.get('/pwd/reset/:email', function (req, res) {
    let email = req.params.email;

    res.render('pwd/reset', {email});
})
module.exports = router;
