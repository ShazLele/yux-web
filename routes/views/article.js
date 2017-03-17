/**
 * Created by Stone on 2016/11/8.
 */
"use strict";

var express = require('express')
    , bll = require('../../bll')
    , common = require('../../common');

var router = express.Router();

router.get('/detail/:id', function (req, res) {
    let id = req.params.id;
    bll.Article.updateReading(id);
    let viewObj = {};
    bll.Article.findById(req.params.id)
        .then((article) => {

            return common.render.initLayOut(req, 'article-detail', {title: '文章详情', article})
        })
        .then((obj) => {
                viewObj = obj;
                return bll.Category.getList({})
            }
        )
        .then((category) => {
            viewObj.categoryList = category;
            res.render('article/detail', viewObj);
        })
        .catch(err=> {
            res.render('error', {errorTitle: '访问错误', errorContent: err});
        });
});
router.get('/edit/:id', function (req, res) {
    let id = req.params.id;
    let user = req.cookies['userInfo'];
    if (!user) {
        return res.redirect('/login');
    }
    let viewObj = {};
    bll.Article.findById(id)
        .then((article) => {


            return common.render.initLayOut(req, 'article-edit', {title: '文章详情', article})


        })
        .then((obj) => {
            viewObj = obj;
            return bll.Category.getList({})
        })
        .then((category) => {
            viewObj.categoryList = category;
            viewObj.columns = common.columns.getAll();
            res.render('article/edit', viewObj);
        })
        .catch(err=> {
            res.render('error', {errorTitle: '访问错误', errorContent: err});
        })

});


router.get('/list/:column/(:category)(/:keyword)?', function (req, res) {
    let viewObj = {};
    let condition = {};
    const column = req.params.column;
    const pageName = common.columns.getByID(column).name;
    if (req.params.category !== '0') {
        condition['category'] = req.params.category;
    }

    if (req.params.keyword) {
        condition['title'] = {$regex: req.params.keyword};
    }
    condition.column = column;

    bll.Article.getPageList(condition, 1, 10).then((articleList) => {
        return common.render.initLayOut(req, pageName, {title: '文章列表', articleList})

    }).then((obj) => {
        viewObj = obj;
        return bll.Category.getList({});
    }).then(
        (category) => {
            viewObj.categoryList = category;
            viewObj.column = column;
            res.render('article/list', viewObj);
        }
    );
});
router.get('/add', function (req, res) {
    var user = req.cookies['userInfo'];
    if (!user) {
        return res.redirect('/login');
    }
    var viewObj = {};
    common.render.initLayOut(req, 'article-add', {title: '添加文章'})
        .then((obj) => {
            viewObj = obj;
            return bll.Category.getList({});
        })
        .then((category) => {
            viewObj.categoryList = category;
            viewObj.columns = common.columns.getAll();
            res.render('article/add', viewObj);
        })
});
router.get('/part/list/page/:column/:category/:index/:size', function (req, res) {
    var pageIndex = req.params.index;
    var pageSize = req.params.size;
    let condition = {};
    if (req.params.category !== '0') {
        condition['category'] = req.params.category;
    }
    bll.Article.getPageList(condition, pageIndex, pageSize)
        .then((articleList) => {
            res.render('_part/_article/_list', {articleList})
        })
        .catch(()=> {
            res.render('_part/_article/_list', {articleList: []})
        });
});
router.get('/part/comments/:id', function (req, res) {

    bll.Comment.find({targetid: req.params.id})
        .then((commentsList) => {
            res.render('_part/_article/_comments', {commentsList});
        })
        .catch(()=> {
            res.render('error', {commentsList: []});
        });

});

module.exports = router;