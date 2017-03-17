/**
 * Created by Stone on 2016/4/21.
 */
"use strict";
var moment = require('moment'),
    CommentDal = require('../dal/comment');

exports.add = function (info) {

    info.addtime = moment().format('YYYY-MM-DD hh:mm:ss');
    info.status = 1;
    return CommentDal.create(info)

};

exports.find = function (info) {

    info.status = 1;
    var field = null;
    var sort = {sort: {'addtime': 1}};
    return CommentDal.find(info, field, sort);

};

exports.count = function (info) {
    return CommentDal.count(info);
}