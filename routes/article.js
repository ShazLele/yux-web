/**
 * Created by Stone on 2016/11/8.
 */
var express = require('express')
    , bll = require('../bll')
    , common = require('../model/common');

var router = express.Router();
var currentArticle = {};
router.get('/detail/:id', function(req, res) {
    var id = req.params.id;
    bll.Article.updateReading(id);
    var user = req.cookies['userInfo'];
    if (currentArticle != null && currentArticle._id == id) {
        bll.Menu.getMenu('article-detail').then((list)=> {
            res.render('article/detail', { title: '文章详情', article: currentArticle, menus: list, user: user });
        })

    }
    else {
        bll.Article.findById(req.params.id, function(resModel) {
            currentArticle = resModel.obj;
            bll.Menu.getMenu('article-list').then((list)=> {
                res.render('article/detail', { title: '文章详情', article: currentArticle, menus: list, user: user });
            })
        })
    }
});

router.get('/list', function(req, res) {
    var user = req.cookies['userInfo'];
    bll.Article.getList({}, function(resmodel) {
        var articleList = resmodel.list;
        bll.Menu.getMenu('article-list').then((list)=> {
            res.render('article/list', { title: '文章列表', articleList: articleList, menus: list, user: user });
        })
    })
});

router.get('/add', function(req, res) {
    var user = req.cookies['userInfo'];
    if (user)
        bll.Menu.getMenu('article-add').then((list)=> {
            res.render('article/add', { title: '添加文章', menus: list, user: user });
        });
    else {
        res.redirect('/login');
    }

});


module.exports = router;