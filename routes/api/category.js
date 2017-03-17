/**
 * Created by Stone on 2016/11/13.
 */
"use strict";
var express = require('express'),
    bll = require('../../bll'),
    common = require('../../common');

var router = express.Router();

// add new article
router.put('/add', function (req, res) {

    var category = req.body;
    var user = req.cookies['userInfo'];
    if (!user) {
        return res.status(403).json({isSuccess: false, err: '用户信息异常，请重新登录'});
    }
    category.userid = user._id;
    if (category.parentid == "0") {
        delete category.parentid;
    }
    bll.Category.addInfo(category)
        .then((obj)=> {
            res.status(200).json({isSuccess: true, obj});
        })
        .catch(err=> {
            res.status(200).json({isSuccess: false, err});
        })
});

module.exports = router;