/**
 * Created by Stone on 2016/4/21.
 */
"use strict";
var moment = require('moment'),
    q = require('q'),
    CommonModel = require('../common'),
    CommentDal = require('../dal/comment');

var resmodel = new CommonModel.res.ResultModel();

exports.add = function (info) {
    let defer = q.defer();
    info.addtime = moment().format('YYYY-MM-DD hh:mm:ss');
    info.status = 1;

    CommentDal.create(info)
        .then((res) => {
            defer.resolve(res);
        });
    return defer.promise;
};

exports.find = function (info) {
    var defer = q.defer();
    info.status = 1;
    var field = null;
    var sort = {sort: {'addtime': 1}};
    CommentDal.find(info, field, sort, function (res) {
        defer.resolve(res);
    });
    return defer.promise;
};

exports.count = function (info) {
    return CommentDal.count(info);
}