/**
 * Created by Stone on 2016/11/16.
 */
"use strict";
var fs = require('fs'),
    path = require('path'),
    child_process = require('child_process'),
    q = require('q');

exports.pathList = {
    article: {
        file: path.join(global.__basepath, 'resource', 'images', 'article'),
        web: '/images/article'
    },
    tempArticle: {
        file: path.join(global.__basepath, 'resource', 'temp', 'images', 'article'),
        web: '/temp/images/article'
    }
};

let pathList = exports.pathList;
exports.writeFile = function (type, id, source, filename) {
    var defer = q.defer();
    if (!fs.existsSync(source) || !pathList.hasOwnProperty(type)) {
        defer.resolve(false);
    }
    //no dir then create it
    let dirPath = path.join(pathList[type].file, id.toString());


    if (!fs.existsSync(dirPath)) {
        var err = fs.mkdirSync(dirPath);
        if (err) {
            defer.resolve(false);
        }
    }
    let toPath = path.join(dirPath, filename);
    // has file then delete it
    fs.existsSync(toPath) && fs.unlinkSync(toPath);

    fs.writeFile(toPath, fs.readFileSync(source), function (err) {
        if (err)
            defer.resolve(false);
        else
            defer.resolve(`${pathList[type].web}/${id}/${filename}`);
    });
    return defer.promise;
};

exports.writeFileSync = function (type, id, source, filename) {

    if (!fs.existsSync(source) || !pathList.hasOwnProperty(type)) {
        return false;
    }
    //no dir then create it
    let dirPath = path.join(pathList[type].file, id.toString());


    if (!fs.existsSync(dirPath)) {
        var err = fs.mkdirSync(dirPath);
        if (err) {
            return err;
        }
    }

    let toPath = path.join(dirPath, filename);
    // has file then delete it
    fs.existsSync(toPath) && fs.unlinkSync(toPath);

    let writeErr = fs.writeFileSync(toPath, fs.readFileSync(source));
    if (writeErr) {
        return false;
    } else {
        return `${pathList[type].web}/${id}/${filename}`;
    }
};

exports.renameDir = function (source, target) {


}

exports.mergeDirectory = function (from, to) {
    if (!fs.existsSync(from)) {
        return false;
    }
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to);
    }
    let files = fs.readdirSync(from);

    for (var index in files) {
        fs.rename(path.join(from, files[index]), path.join(to, files[index]));
    }
}

exports.removeDir = function (source) {

    if (!fs.existsSync(source)) {
        return;
    }

    let exec = child_process.exec;
    exec('rm -rf ' + source, function (err) {
        err && console.log(err);
    })
}

