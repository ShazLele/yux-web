/**
 * Created by Stone on 2017/1/22.
 */
"use strict";
const mysql = require('mysql'),
    moment = require('moment'),
    common = require('./common');

let connection = mysql
    .createConnection({
        host: 'localhost',
        user: 'yux',
        password: 'wzlei19890803',
        database: 'yux'
    });
//格式化查询字符串
connection.config.queryFormat = (query, values) => {
    return common.parseSelectString(query, values);
};

let db = {};
// add
db.add = (table, info) => {
    const _query = `insert into ${table} set ?`;
    return new Promise((resolve, reject) => {
        connection.query(_query, info, (err, result) => {
            err ? reject(err) : resolve(result);
        })
    })
};

db.find = (table, where, fields, sort) => {
    return new Promise((resolve, reject) => {
        let _query = `select [fields] from ${table} where [where] order by [sort]`;
        connection.query(_query, {where, fields, sort}, (err, results) => {
            return err ? reject(err) : resolve(results);
        })
    })
};

db.update = (table, info, where) => {
    return new Promise((resolve, reject) => {
        let _query = `update ${table} set [info] where [where]`;
        connection.query(_query, {info, where}, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

module.exports = db;




