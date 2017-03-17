/**
 * Created by Stone on 2016/11/10.
 */
"use strict";
var express = require('express'),
    https = require('https'),
    bll = require('../../bll'),
    common = require('../../common');

var router = express.Router();

// add new article
router.post('/login', function (req, res) {
    bll.User.getUserForLogin(req.body)
        .then((obj) => {
            var data = {isSuccess: true, obj};
            if (obj)
                res.cookie('userInfo', obj, {expires: new Date(Date.now() + 9000000)});
            else {
                data.err = '用户名或密码错误';
                data.isSuccess = false;
            }
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(200).json({isSuccess: false, err});
        })

});

router.post('/logout', function (req, res) {
    res.clearCookie('userInfo');
    return res.status(200).json({isSuccess: true});
});

router.put('/register', function (req, res) {
    bll.User.addUser(req.body)
        .then((obj) => {
            let certifUrl = `${global.__doman}/api/user/certification/do/${obj._id}`;

            common.email.send(obj, 'register', certifUrl)
                .then(
                    (info) => {
                        return res.status(200).json({
                            isSuccess: true,
                            obj: info.response
                        });
                    },
                    () => {
                        //delete this user
                        bll.User.deleteByID(obj._id);
                        res.status(200).json(
                            {
                                isSuccess: false,
                                msg: '认证邮件发送失败'
                            })
                    })
        })
        .catch(err => {
            res.status(200).json({isSuccess: false, err});
        })
});

router.post('/pwd/reset', function (req, res) {
    const user = req.cookies['userInfo'];
    const oldPwd = req.body.oldPwd;
    const newPwd = req.body.newPwd;

    let condition = {};
    condition._id = user._id;
    condition.password = oldPwd;
    bll.User.find(condition)
        .then(
            (data) => {
                if (data.length > 0) {
                    bll.User.updateUserInfo(condition._id, {password: newPwd})
                        .then(
                            obj => res.status(200).json({isSuccess: true, obj})
                        )
                } else {
                    return res.status(200).json({isSuccess: false, msg: '旧密码输入错误'});
                }
            }
        )
        .catch(() => {
            res.status(200).json({isSuccess: false, msg: '未知错误'});
        })


    // bll.User.updateUserInfo(user._id, {})
});

router.post('/pwd/certification/send', function (req, res) {
    const email = req.body.email;
    bll.User.getUserForLogin({email})
        .then(data => {
            if (data) {
                const randomCode = parseInt(Math.random() * 1000) * 1989 + 803;
                let Url = `${randomCode}`;
                common.email.send(data, 'forgetpwd', Url)
                    .then(info => {
                        res.status(200).json({
                            isSuccess: true,
                            obj: info.response
                        });
                        bll.User.updateUserInfo(data._id, {code: randomCode}).then(
                            data => {
                                console.log(data);
                            }
                        );
                    })
            }
        })
});

router.post('/update/nickname', function (req, res) {
    const _id = req.body._id,
        nickname = req.body.nickname;

    bll.User.find({nickname})
        .then((data) => {

            if (data && data.length > 0) {
                return res.status(200).json({isSuccess: false, msg: '用户昵称已被占用'})
            }

            bll.User.updateUserInfo(_id, {nickname})
                .then(obj => {
                        let user = Object.assign({}, req.cookies['userInfo'], {nickname});
                        res.cookie('userInfo', user, {expires: new Date(Date.now() + 9000000)});
                        res.status(200).json({isSuccess: true});
                    }
                )
        })
})
router.post('/pwd/back', function (req, res) {
    let email = req.body.email,
        password = req.body.password,
        code = req.body.code,
        condition = {email, code};

    if (!code || parseInt(code) <= 1) {
        return res.status(200).json({isSuccess: false, msg: '验证码输入错误'});
    }

    bll.User.find(condition)
        .then(data => {
            if (data && data.length > 0) {
                let _id = data[0]._id;
                bll.User.updateUserInfo(_id, {password, code: 0})
                    .then(
                        () => res.status(200).json({isSuccess: true})
                    )
            } else {
                return res.status(200).json({isSuccess: false, msg: '验证码输入错误'});
            }
        })
        .catch(() => {
            res.status(200).json({isSuccess: false, msg: '未知错误'});
        })

});

router.post('/certification/send', function (req, res) {
    let user = req.body;
    bll.User.getUserForLogin(user)
        .then((obj) => {
            if (obj) {
                let certifUrl = `${global.__doman}/api/user/certification/do/${obj._id}`;

                common.email.send(obj, 'register', certifUrl)
                    .then((resModel) => {
                        res.status(200).json(resModel);
                    })
            } else {
                res.status(200).json({isSuccess: false});
            }
        })
});

router.get('/certification/do/:id', function (req, res) {
    if (!req.params.id) {
        res.render('user/certification', {success: false});
    }
    bll.User.updateUserInfo(req.params.id, {status: 1})
        .then(() => {
            res.render('user/certification', {success: true});
        })
        .catch(() => {
            res.render('user/certification', {success: false});
        })
});

router.get('/current', function (req, res) {

});

router.post('/wx/login', (req, res) => {

    let {code, user}=req.body;

    common.wxOAuth.getOpenID(code)
        .then((data) => {
            data = JSON.parse(data.toString());
            if (!data['openid']) {
                return res.status(200).json({isSuccess: false, err: '认证错误'});
            }
            const condition = {
                third: 'wx',
                account: data['openid']
            };
            //login or register
            bll.User.getUserForLogin(condition)
                .then((obj) => {
                    if (obj) {
                        res.cookie('userInfo', obj, {expires: new Date(Date.now() + 9000000)});
                        res.status(200).json({isSuccess: true, obj});
                    }
                    else {
                        user.third = condition.third;
                        user.account = condition.account;
                        user.status = 1;

                        bll.User.addWXUser(user)
                            .then((obj) => {
                                res.cookie('userInfo', obj, {expires: new Date(Date.now() + 9000000)});
                                res.status(200).json({isSuccess: true, obj});
                            })
                    }
                })
        })
        .catch((err) => {
            return res.status(200).json({isSuccess: false, err: err});
        });
});
module.exports = router;