/**
 * Created by Stone on 2017/1/17.
 */

"use strict";

class wxOAuth {
    constructor() {

    }

    getOpenID(code) {
        let https = require('https');
        let urlInfo = {
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            appid: 'wx96ff8b8b1a6dddac',
            secret: '0055cedda4edda379683cd6635d77b4e',
            code: code
        }
        let url = `${urlInfo.url}?appid=${urlInfo.appid}&secret=${urlInfo.secret}&js_code=${urlInfo.code}&grant_type=authorization_code`;

        let promise = new Promise((resolve, reject) => {
            https.get(url, (myRes) => {
                myRes.on('data', (data) => {
                    resolve(data);
                });
                myRes.on('error', (err) => {
                    reject(err);
                })
            });
        })

        return promise;
    }
}

module.exports = new wxOAuth();
