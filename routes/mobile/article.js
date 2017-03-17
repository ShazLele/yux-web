/**
 * Created by Stone on 2016/12/20.
 */
"use strict";
var express = require('express')
    , bll = require('../../bll')
    , common = require('../../common');
var router = express.Router();

router.get('/detail/:id', function (req, res) {
    let id = req.params.id;
    bll.Article.updateReading(id);

    bll.Article.findById(req.params.id)
        .then((resModel) => {
            res.render('mobile/article/detail', {article: resModel.obj, title: resModel.obj.title});
        });
});

module.exports = router;