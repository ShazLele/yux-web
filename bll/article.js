/**
 * Created by Stone on 2016/4/18.
 */
"use strict";
var moment = require('moment'),
    ArticleDal = require('../dal/article'),
    CommentDal = require('../dal/comment');

var ArticleBLL = new Object();
//增
ArticleBLL.addArticle = function (info) {

    info.status = 1;
    info.addtime = moment().format('YYYY-MM-DD hh:mm:ss');
    info.updatetime = moment().format('YYYY-MM-DD hh:mm:ss');
    return ArticleDal.create(info);

};
//删
ArticleBLL.deleteArticle = function (info) {

    return ArticleDal.delete(info)
        .then(() => {
            var comment = {
                targetid: info._id
            };
            CommentDal.delete(comment);
        });
};
//查
ArticleBLL.getList = function (info) {
    let fields = `_id title category addtime reading  wallpic
                    comments  desc level  status updatetime user `;//查询所有的列
    let sort = {sort: {'level': -1, 'addtime': -1}};
    return ArticleDal.find(info, fields, sort);
};
ArticleBLL.getPageList = function (info, pageIndex, pageSize) {
    var fields = null;//查询所有的列
    var sort = {sort: {'level': -1, 'addtime': -1}};
    return ArticleDal.findPage(info, fields, sort, parseInt(pageIndex), parseInt(pageSize));

};
ArticleBLL.findById = function (id) {

    return ArticleDal.findById(id);

};
//改
ArticleBLL.update = function (info, updatecol) {

    updatecol.updatetime = moment().format('YYYY-MM-DD hh:mm:ss');
    return ArticleDal.update(info, updatecol);
};

ArticleBLL.updateReading = function (id) {
    ArticleDal.findById(id)
        .then(obj => {
            var reading = obj.reading ? obj.reading + 1 : 1;
            ArticleDal.update({_id: id}, {reading: reading})
                .then();
        })
};

module.exports = ArticleBLL;



