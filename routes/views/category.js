/**
 * Created by Stone on 2016/11/12.
 */
"use strict";
let express = require('express'),
    bll = require('../../bll'),
    common = require('../../common');

let router = express.Router();
let indexListener = function (req, res) {
    let viewObj = {};
    if (!common.render.permission(req, 3)) {
        return res.render('error');
    }
    common.render.initLayOutSimple(req, 'category-list', {title: '分类管理'})
        .then((obj)=> {
            viewObj = obj;
            return bll.Category.getList({});
        })
        .then((category)=> {
            viewObj.categoryList = category;
            res.render('category/index', viewObj);
        })
        .catch(err=> {
            res.render('error', {errorContent: err});
        })

};
router.get('/', indexListener);
router.get('/index', indexListener);

router.get('/part/list/:pid/:level', (req, res)=> {
    const pid = req.params.pid;
    const level = parseInt(req.params.level);
    let condition = {
        level: level
    };
    if (pid !== '0') {
        condition = {parentid: pid};
    }
    bll.Category.getList(condition)
        .then((categoryList)=> {
            res.render(`_part/_category/_list_item`, {categoryList, level});
        })
        .catch(err=> {
            res.render('error', {errorContent: err});
        });

});
router.get('/part/list/refresh', (req, res)=> {
    bll.Category.getList({})
        .then((categoryList)=> {
            res.render(`_part/_category/_list`, {categoryList});
        })
        .catch(err=> {
            res.render('error', {errorContent: err});
        });
})
module.exports = router;