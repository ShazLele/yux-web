/**
 * Created by Stone on 2016/4/18.
 */
var db = require('../model'),
    CommonModel = require('../model/common');
var resmodel = new CommonModel.ResultModel();

exports.create = function(article, callback) {
    db.Article.create(article, function(err) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.init();
        }
        callback(resmodel.toJson());
    });
};
exports.delete = function(article, callback) {
    db.Article.remove(article, function(err) {
        resmodel.init();
        if (err) {
            resmodel.setError(err);
        }
        callback(resmodel.toJson());
    });
};
exports.findPage = function(article, fields, sort, pageIndex, pageSize, callback) {
    db.Article.find(article, fields, sort, function(err, docs) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.setList(docs);
        }
        callback(resmodel.toJson());
    }).skip((pageIndex - 1) * pageSize).limit(pageSize);
};
exports.find = function(article, fields, sort, callback) {
    db.Article.find(article, fields, sort, function(err, docs) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.setList(docs);
        }
        callback(resmodel.toJson());
    });
};
exports.findById = function(id, callback) {
    db.Article.findById(id, function(err, doc) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.setObj(doc);
        }
        callback && callback(resmodel.toJson());
    });
};
exports.update = function(article, updatecol, callback) {
    updatecol = { $set: updatecol };
    db.Article.update(article, updatecol, function(err) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.init();
        }
        callback && callback(resmodel.toJson());
    });
};


