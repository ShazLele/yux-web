/**
 * Created by ��ĩ���� on 2016/4/21.
 */
var moment = require('moment'),
    CommonModel = require('../model/common'),
    CommentDal = require('../dal/comment');

var resmodel = new CommonModel.ResultModel();

exports.create = function(commentinfo, callback) {
    commentinfo.addtime = moment().format('YYYY-MM-DD hh:mm');
    commentinfo.status = 1;
    CommentDal.create(commentinfo, function(res) {
        callback(res);
    });
};

exports.find = function(commentinfo, callback) {
    commentinfo.status = 1;
    var field = null;
    var sort = { sort: { 'addtime': 1 } };
    CommentDal.find(commentinfo, field, sort, function(res) {
        callback(res);
    });
};