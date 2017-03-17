/**
 * Created by Stone on 2017/1/22.
 */
"use strict";
const mysql = require('mysql');

const DB = 'yux';
const table = 'user';

let client = mysql.createConnection({
    user: 'yux',
    password: 'wzlei19890803'
});
client.connect();
client.query("use " + DB);
// client.query("select * from user", (err, result, fields) => {
//     if (err)
//         throw err;
//     if (result) {
//         console.log(result);
//     }
//     client.end();
// });
client.query('');
