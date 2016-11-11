/**
 * Created by ��ĩ���� on 2016/4/21.
 */
var db = require('../model');

var resmodel = new db.Common.ResultModel();
exports.create = function(comment, callback) {

    db.Comment.create(comment, function(err) {
        if (err) {
            resmodel.setError(err);
        }
        else {
            resmodel.init();
        }
        callback(resmodel.toJson());
    });
};

exports.find = function(comment, field, sort, callback) {
    db.Comment.find(comment, field, sort, function(err, docs) {
        if (err) {
            resmodel.setError(err);
        }
        else {
            resmodel.setList(docs);
        }
        callback(resmodel.toJson());
    });
};

exports.delete = function(comment, callback) {
    db.Comment.remove(comment, function(err) {
        resmodel.init();
        if (err) {
            resmodel.setError(err);
        }
        callback(resmodel.toJson());
    });
};