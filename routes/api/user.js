/**
 * Created by Stone on 2016/11/10.
 */
var express = require('express'),
    bll = require('../../bll'),
    common = require('../../model/common');

var router = express.Router();

// add new article
router.post('/login', function(req, res) {
    bll.User.getUserForLogin(req.body, function(data) {
        if (data.isSuccess) {
            if (data.obj)
                res.cookie('userInfo', data.obj, { expires: new Date(Date.now() + 900000) });
            else
                data.err = '用户名或密码错误';
        }
        res.status(200).json(data);
    })
});

module.exports = router;