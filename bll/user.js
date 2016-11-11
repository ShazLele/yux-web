/**
 * Created by Stone on 2016/4/17.
 */
var moment = require('moment'),
    CommonModel = require('../model/common'),
    UserDal = require('../dal/user');

var resmodel = new CommonModel.ResultModel();

exports.addUser = function(user, callback) {
    !user.nickname && (user.nickname = '佚名');
    //先查询
    UserDal.findOne({ email: user.email }, function(res) {
        if (res.obj) {
            callback(resmodel.setError('用户已存在').toJson());
        }
        else {
            UserDal.create(user, function(res) {
                callback(res);
            });
        }
    });

};

exports.find = function(user, callback) {
    var fields = null;//查询所有的列
    var sort = { sort: { 'updatetime': -1 } };
    UserDal.find(user, fields, sort, function(res) {
        callback(res.err, res.docs);
    });
};

exports.getUserForLogin = function(user, callback) {

    UserDal.findOne(user, function(res) {
        if (res && res.isSuccess && res.obj) {
            res.obj.password = '';
            var updatecols = {};
            if (res.obj.addtime) {
                res.obj.addtime = updatecols.addtime = new Date();
            }
            res.obj.lastlogintime = updatecols.lastlogintime = new Date();
            UserDal.update(res.obj, updatecols);
        }
        callback(res);
    });
};

exports.findUserID = function(user, callback) {
    UserDal.findOne(user, function(res) {
        callback(res);
    });
};

exports.updateUserInfo = function(userid, updatecol, callback) {
    var user = { _id: userid };
    UserDal.update(user, updatecol, function(res) {
        callback(res);
    });
};





