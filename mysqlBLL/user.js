/**
 * Created by Stone on 2016/4/17.
 */
"use strict";
var moment = require('moment'),
    q = require('q'),
    CommonModel = require('../common'),
    UserDal = require('../dal/user');

var resmodel = new CommonModel.res.ResultModel();

exports.addUser = function (user) {
    var defer = q.defer();
    !user.nickname && (user.nickname = '佚名');
    user.role = 2;
    //先查询
    UserDal.findOne({$or: [{email: user.email}, {nickname: user.nickname}]}, null, function (res) {
        if (res.obj) {
            defer.resolve(resmodel.setError('用户已存在').toJson());
        }
        else {
            UserDal.create(user, function (res) {
                defer.resolve(res);
            });
        }
    });
    return defer.promise;
};

exports.addWXUser = function (user) {
    var defer = q.defer();
    !user.nickName ? (user.nickname = '佚名') : user.nickname = user.nickName;
    user.role = 2;
    //先查询
    UserDal.findOne({third: user.third, account: user.account}, null, function (res) {
        if (res.obj) {
            defer.resolve(resmodel.setError('用户已存在').toJson());
        }
        else {
            UserDal.create(user, function (res) {
                defer.resolve(res);
            });
        }
    });
    return defer.promise;
};

exports.find = function (user) {

    var fields = null;//查询所有的列
    var sort = {sort: {'updatetime': -1}};
    return UserDal.find(user, fields, sort)
        .then(data => {
            return resmodel.setList(data).toJson();
        });
};

exports.getUserForLogin = function (user) {
    let defer = q.defer();
    const fields = '_id email nickname desc addtime updatetime lastlogintime status role account avatarUrl';
    UserDal.findOne(user, fields, function (res) {

        if (res && res.isSuccess && res.obj) {

            if (res.obj.status < 1) {
                res.isSuccess = false;
                res.err = '该用户尚未认证';
                res.obj = {
                    status: res.obj.status
                }

            } else {
                var updatecols = {};
                res.obj.lastlogintime = updatecols.lastlogintime = new Date();
                UserDal.update(res.obj, updatecols);
            }

        }
        defer.resolve(res);
    });
    return defer.promise;
};

exports.findUserID = function (user, callback) {
    UserDal.findOne(user, null, function (res) {
        callback(res);
    });
};

exports.deleteByID = function (id) {
    return new Promise((resolve, reject) =>
        UserDal.delete(id).then((err) => {
            if (err) {
                reject(resmodel.setError(err));
            }
            else {
                resolve(resmodel.init());
            }
        }))
}

exports.updateUserInfo = function (userId, updateCol) {
    return new Promise((resolve) => {
        var user = {_id: userId};
        UserDal.update(user, updateCol, function (data) {
            resolve(data);
        });
    })
};





