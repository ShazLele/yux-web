/**
 * Created by Stone on 2016/4/21.
 */
"use strict";
var db = require('../model');

exports.create = function (comment) {
    return db.Comment.create(comment)
        .then(doc => {
            return db.Article.update({_id: doc.targetid}, {$push: {comments: doc._id}})
        })
};

exports.find = function (comment, field, sort) {
    return db.Comment.find(comment, field, sort);
};

exports.delete = function (comment) {

    return db.Comment.remove(comment)
        .then(doc => {
            return db.Article.update({_id: doc.targetid}, {$pull: {comments: doc._id}})
        })
};

exports.count = function (comment) {

    return db.Comment.aggregate(
        [
            {$match: comment},
            {$group: {_id: '$targetid', count: {$sum: 1}}}
        ]);


}