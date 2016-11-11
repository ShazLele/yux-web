/**
 * Created by Stone on 2016/4/18.
 */
var ArticleDal = require('../dal/article'),
    CommentDal = require('../dal/comment');

var ArticleBLL = new Object();
//增
ArticleBLL.addArticle = function(article, callback) {
    article.status = 1;
    article.addtime = new Date();
    article.updatetime = new Date();
    ArticleDal.create(article, function(res) {
        callback(res);
    });
};
//删
ArticleBLL.deleteArticle = function(article, callback) {
    ArticleDal.delete(article, function(res) {
        var comment = {
            targetid: article._id,
            infotype: 1
        };
        CommentDal.delete(comment, function(err) {

        });
        callback(res);
    });
};
//查
ArticleBLL.getList = function(article, callback) {
    var fields = null;//查询所有的列
    var sort = { sort: { 'updatetime': -1 } };
    ArticleDal.find(article, fields, sort, function(res) {
        callback(res);
    });
};
ArticleBLL.getPageList = function(article, pageIndex, pageSize, callback) {
    var fields = null;//查询所有的列
    var sort = { sort: { 'updatetime': -1 } };
    ArticleDal.findPage(article, fields, sort, pageIndex, pageSize, function(res) {
        callback(res);
    });
};
ArticleBLL.findById = function(id, callback) {
    ArticleDal.findById(id, function(res) {
        callback(res);
    });
};
//改
ArticleBLL.update = function(article, updatecol, callback) {
    ArticleDal.update(article, updatecol, function(res) {
        callback(res);
    });
};

ArticleBLL.updateReading = function(id) {
    ArticleDal.findById(id, function(data) {
        if (data.isSuccess && data.obj) {
            var reading = data.obj.reading ? data.obj.reading + 1 : 1;
            ArticleDal.update({ _id: id }, { reading: reading });
        }
    })
};

module.exports = ArticleBLL;



