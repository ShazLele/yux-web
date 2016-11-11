/**
 * Created by Stone on 2016/11/10.
 */
var db = require('../model'),
    CommonModel = require('../model/common');
var resmodel = new CommonModel.ResultModel();

exports.create = function(info, callback) {
    db.Menu.create(info, function(err) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.init();
        }
        callback(resmodel.toJson());
    });
};
exports.delete = function(info, callback) {
    db.Menu.remove(info, function(err) {
        resmodel.init();
        if (err) {
            resmodel.setError(err);
        }
        callback(resmodel.toJson());
    });
};
exports.find = function(info, fields, sort, callback) {
    db.Menu.find(info, fields, sort, function(err, docs) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.setList(docs);
        }
        callback(resmodel.toJson());
    });
};
exports.findById = function(id, callback) {
    db.Menu.findById(id, function(err, doc) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.setObj(doc);
        }
        callback(resmodel.toJson());
    });
};
exports.update = function(info, updatecol, callback) {
    updatecol = { $set: updatecol };
    db.Menu.update(info, updatecol, function(err) {
        if (err) {
            resmodel.setError(err);
        } else {
            resmodel.init();
        }
        callback(resmodel.toJson());
    });
};
