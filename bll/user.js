/**
 * Created by Stone on 2016/4/17.
 */
"use strict";
var UserDal = require('../dal/user');

exports.addUser = function (user) {
    !user.nickname && (user.nickname = '佚名');
    user.role = 2;
    //先查询
    return UserDal.findOne({$or: [{email: user.email}, {nickname: user.nickname}]}, null)
        .then(doc=> {
            if (doc) {
                return new Promise((resolve, reject)=> {
                    reject('用户已存在');
                })
            }
            else {
                return UserDal.create(user);
            }
        });
};

exports.addWXUser = function (user) {
    !user.nickName ? (user.nickname = '佚名') : user.nickname = user.nickName;
    user.role = 2;
    //先查询
    return UserDal.findOne({third: user.third, account: user.account}, null)
        .then(doc=> {
            if (doc) {
                return new Promise((resolve, reject)=> {
                    reject('用户已存在');
                })
            }
            else {
                return UserDal.create(user);
            }
        });
    ;
};

exports.find = function (user) {

    var sort = {sort: {'updatetime': -1}};
    return UserDal.find(user, null, sort);
};

exports.getUserForLogin = function (user) {
    const fields = '_id email nickname desc addtime updatetime lastlogintime status role account avatarUrl';
    return UserDal.findOne(user, fields)
        .then(obj=> {
            console.log(obj);
            if (obj && obj.status >= 1) {
                var updatecols = {};
                obj.lastlogintime = updatecols.lastlogintime = new Date();
                UserDal.update(obj, updatecols);
            }
            return obj;
        });
};

exports.findUserID = function (user) {
    return UserDal.findOne(user, null);
};

exports.deleteByID = function (id) {
    return UserDal.delete(id)
}

exports.updateUserInfo = function (userId, updateCol) {
    var user = {_id: userId};
    return UserDal.update(user, updateCol);
};





