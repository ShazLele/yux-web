/**
 * Created by Stone on 2016/11/14.
 */
"use strict";
var express = require('express'),
    bll = require('../../bll'),
    common = require('../../common');


var router = express.Router();

// add new article comment
router.put('/add', function (req, res) {
    var user = req.cookies['userInfo'];
    if (!user) {
        return res.status(200).json({isSuccess: false, err: '请先去登录'});
    }
    var comment = req.body;
    comment.nickname = user.nickname;
    comment.userid = user._id;
    bll.Article.findById(comment.targetid)
        .then((obj) => {
            let objArticle = obj;
            comment.targetname = objArticle.title;
            comment.targetuid = objArticle.userid;
            comment.targetuname = objArticle.nickname;
            return bll.Comment.add(comment)
        })
        .then(() => {
            return res.status(200).json({isSuccess: true});
        })
        .catch(err=> {
            return res.status(200).json({isSuccess: false, err});
        })


});

router.get('/count/:id', function (req, res) {

    bll.Comment.count({targetid: req.params.id})
        .then((list) => {
            res.status(200).json({isSuccess: true, list});
        })
        .catch(err=> {
            res.status(200).json({isSuccess: false, err});
        });
})

router.get('/list/current', function (req, res) {
    var user = req.cookies['userInfo'];
    if (!user) {
        return res.status(200).json({isSuccess: false, err: '请先去登录'});
    }
    bll.Comment.find({targetuid: user._id})
        .then(list => {
            res.status(200).json({isSuccess: true, list});
        })
        .catch(err => {
            res.status(200).json({isSuccess: false, err: err});
        })
})

module.exports = router;