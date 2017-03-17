/**
 * Created by Stone on 2016/11/10.
 */
"use strict";
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    formidable = require('formidable'),
    bll = require('../../bll'),
    common = require('../../common');


var router = express.Router();

// add new article
router.put('/add', function (req, res) {
    var user = req.cookies['userInfo'];
    if (!user) {
        res.status(200).json({isSuccess: false, err: '请先去登录'});
    }
    var article = req.body;
    article.user = user._id;
    article.level = 1;


    bll.Article.addArticle(article)
        .then(obj => {
            writeWallAndContentPic('add', obj._id, req, article).then();
            res.status(200).json({isSuccess: true, obj});
        })
        .catch(err => {
            res.status(200).json({isSuccess: false, err});
        });
});
// edit article info
router.post('/edit/:id', function (req, res) {
    const user = req.cookies['userInfo'];
    const objID = req.params.id;
    if (!user) {
        res.redirect('/login');
    }
    let article = req.body;
    bll.Article.getList({_id: objID, user: user._id})
        .then(
            (data) => {
                if (!data || data.length <= 0) {
                    return res.status(200).json({isSuccess: false, err: '你无权限修改该文章'});
                }
                writeWallAndContentPic('edit', objID, req, article)
                    .then((obj) => res.status(200).json({isSuccess: true, obj}))
                    .catch((err) => res.status(200).json({isSuccess: false, err}));
            }
        )


});

router.post('/upload/wallimg', function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var filePath = files['wallpic'].path;
        var fileName = files['wallpic'].name;
        res.status(200).json({url: filePath, name: fileName});
    })
});

router.post('/upload/conetentimg', function (req, res) {

    let user = req.cookies['userInfo'];
    if (!user) {
        res.send('error|请先去登录');
    }
    let form = new formidable.IncomingForm();
    let picUrl = null;

    form.parse(req, function (err, fields, files) {

        if (files && files['contentImg']) {
            let fileInfo = files['contentImg'];
            let source = fileInfo["path"];
            let sourceName = fileInfo['name'];
            let toFilename = new Date().getTime() + path.extname(sourceName);
            let result = common.fshelper.writeFileSync('tempArticle', user._id, source, toFilename);
            if (result)
                picUrl = result;
        }

        if (picUrl)
            res.send(picUrl);
    })
});

router.get('/list/:hasLogin', function (req, res) {
    let condition = {};
    const user = req.cookies['userInfo'];
    if (req.params.hasLogin == '1') {
        if (!user) {
            return res.status(401).json({isSuccess: false, msg: '请登录'});
        }
        else {
            condition['user'] = user._id;
        }
    }
    bll.Article.getList(condition)
        .then(list => {
            res.status(200).json({isSuccess: true, list});
        })
        .catch(err => {
            res.status(200).json({isSuccess: false, err});
        });

});

router.get('/remove/:id', function (req, res) {
    const _id = req.params.id;
    const user = req.cookies['userInfo'];

    if (!user) {
        return res.status(401).json({isSuccess: false, msg: '请登录'});
    }
    bll.Article.deleteArticle({_id: _id, user: user._id})
        .then(() => {
            //delete files
            let dirPath = path.join(common.fshelper.pathList.article.file, _id);
            common.fshelper.removeDir(dirPath);
            res.status(200).json({isSuccess: true});
        })
        .catch(() => {
            res.status(200).json({isSuccess: false});
        })

});

router.get('/info/:id', function (req, res) {

    let id = req.params.id;
    bll.Article.updateReading(id);

    bll.Article.findById(req.params.id)
        .then((obj) => {
            res.status(200).json({isSuccess: true, obj});
        })
        .catch(err => {
            res.status(200).json({isSuccess: false, err});
        });
});

router.get('/page/:category/:index/:size', function (req, res) {
    var pageIndex = req.params.index;
    var pageSize = req.params.size;
    let condition = {};
    if (req.params.category !== '0') {
        condition['category'] = req.params.category;
    }
    bll.Article.getPageList(condition, pageIndex, pageSize).then((docs) => {
        res.status(200).json({isSuccess: true, list: docs});
    }).catch(err => {
        res.status(200).json({isSuccess: false, err: err});
    });
});

/*Common function*/

function writeWallAndContentPic(type, objID, req, article) {
    const user = req.cookies['userInfo'];
    let tempArticlePath = common.fshelper.pathList.tempArticle;
    let articlePath = common.fshelper.pathList.article;

    //将保存在temp中的content图片转移到正式目录下
    if (!fs.existsSync(articlePath.file)) {
        fs.mkdirSync(articlePath.file);
    }
    common.fshelper.mergeDirectory(
        path.join(tempArticlePath.file, user._id.toString()),
        path.join(articlePath.file, objID.toString())
    );

    //如果有墙纸，则保存写入
    if (article.wallpic) {
        let originPath = article.wallpic;
        let extName = path.extname(article.wallpicname);
        common.fshelper.writeFile('article', objID, originPath, 'wallpic' + extName);
        article.wallpic = `${articlePath.web}/${objID}/wallpic${extName}`;
    }
    //内容链接替换  把temp中的链接替换为正式链接
    let regX = new RegExp(tempArticlePath.web + '/' + user._id, 'g');
    article.content = article.content.replace(regX, articlePath.web + '/' + objID);

    let updateObj = article;
    if (type == 'add') {
        updateObj = {wallpic: article.wallpic, content: article.content};

    } else if (type == 'edit') {

    }
    return bll.Article.update({_id: objID}, updateObj);
}
module.exports = router;