/**
 * Created by Stone on 2017/1/22.
 */

const db = require('./index');
const tableName = 'demo';


exports.update = (info, where) => {
    return db.update(tableName, info, where);
};

exports.update({name: '22', age: 40}, '1=1')
    .then(data => {
        // console.log(data);
    }, err => {
        // console.log(err);
    });