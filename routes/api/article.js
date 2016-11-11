/**
 * Created by Stone on 2016/11/10.
 */
var express = require('express'),
    bll = require('../../bll'),
    common = require('../../model/common');


var router = express.Router();

// add new article
router.put('/add', function(req, res) {
    var user = req.cookies['userInfo'];
    var article = req.body;
    article.nickname = user.nickname;
    article.userid = user._id;
    article.email = user.email;
    bll.Article.addArticle(article, function(data) {
        res.status(200).json(data);
    })
});

module.exports = router;