/**
 * Created by Stone on 2016/4/18.
 */
var moment = require('moment'),
    db = require('../model'),
    CommonModel = require('../model/common');
var resmodel = new CommonModel.ResultModel();

exports.find = function(user,fields, sort, callback) {
    db.User.find(user, fields, sort, function(err, docs) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.setList(docs);
        }
        callback(resmodel.toJson());
    });
};
exports.findOne = function(user, callback) {
    db.User.findOne(user, function(err, doc) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.setObj(doc);
        }
        callback(resmodel.toJson());
    });
};
exports.create = function(user, callback) {
    var createtime = moment().format('YYYY-MM-DD hh:mm:ss');
    user.addtime = createtime;
    user.updatetime = createtime;
    db.User.create(user, function(err) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.init();
        }
        callback(resmodel.toJson());
    });
};
exports.update = function(user, updatecol, callback) {
    updatecol.updatetime = moment().format('YYYY-MM-DD hh:mm:ss');
    updatecol = { $set: updatecol };
    db.User.update(user, updatecol, function(err) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.init();
        }
        callback && callback(resmodel.toJson());
    });
};