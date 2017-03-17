/**
 * Created by Stone on 2016/11/16.
 */
"use strict";
var nodemailer = require('nodemailer'),
    res = require('./res');

exports.send = function (user, type, rurl) {

    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com", // host
        secureConnection: true, // use SSL
        port: 587, // SMTP port
        auth: {
            user: "2161109872@qq.com", // account
            pass: "qxxnlbfhpcxkdjih" // password auth code: qqemail=>setting=>account
        }
    });
    let mailOption = {
        from: '语巷 <2161109872@qq.com>',
        to: user.email
    };

    if (type == 'register') {
        mailOption.subject = '语巷注册邮箱认证';
        mailOption.html = `<div>
                <p>${user.nickname},请点击下面的链接完成新注册用户的认证</p>
                <a href="${rurl}">${rurl}</a>
                </div>`
    }
    if (type == 'forgetpwd') {
        mailOption.subject = '语巷密码找回';
        mailOption.html = `<div>
                <p>${user.nickname},你正在进行密码找回操作，验证码为：
                <a>${rurl}</a>
                </p>
                </div>`
    }
    return transporter.sendMail(mailOption, null);
    // transporter.close();
};