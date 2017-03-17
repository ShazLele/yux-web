/**
 * Created by Stone on 2017/1/22.
 */
"use strict";
const db = require('./index');
const tableName = 'user';

//add user
exports.create = (info) => {
    return db.add(tableName, info);
};

exports.find = (where, fields, sort) => {
    return db.find(tableName, where, fields, sort);
};

exports.update = (info, where) => {
    return db.update(tableName, info, where);
};







