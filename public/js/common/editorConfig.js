/**
 * Created by Stone on 2016/11/18.
 */

"use strict";
//配置菜单项
wangEditor.prototype.yux_menus = function () {

    this.config.menus = $.map(wangEditor.config.menus, function (item) {
        if (item === 'video') {
            return null;
        }
        return item;
    });
    //配置吸顶
    this.config.menuFixed = false;
    // 插入代码时的默认语言
    this.config.codeDefaultLang = 'javascript';
};


// 上传图片（举例）
wangEditor.prototype.yux_imageupload = function (onloadhandle) {

    this.config.uploadImgUrl = '/api/article/upload/conetentimg';
    //统一上传文件名称
    this.config.uploadImgFileName = 'contentImg';

    // 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
    //this.config.hideLinkImg = true;
    if (onloadhandle)
        this.config.uploadImgFns.onload = onloadhandle;
};

let initEditor = function (eleID, options) {
    let editor = new wangEditor(eleID || 'divContent');
    editor.yux_menus();
    editor.yux_imageupload(options && options.onload);
    editor.create();
    return editor;
};
