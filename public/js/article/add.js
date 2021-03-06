/**
 * Created by Stone on 2016/11/9.
 */
"use strict";
let current = {
    contentImages: []
};

const toastTime = 3000;
let editor = null;
let uploadImg = function (fileEle) {
    var file = fileEle.files[0];
    //读文件
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        $("#walldemo").attr("src", this.result);
    }

    reader.onerror = function () {
        Materialize.toast('上传失败', toastTime);
    }
};


$(function () {
    editor = initEditor();
    $('select').material_select();
    $(".modal").modal({
        dismissible: false
    });

});
$(document).on('click', '#submitBtn', function () {
    let title = $("#title").val();
    let desc = $("#desc").val();
    let content = editor.$txt.html();
    let column = $("#selectColumn").data("id");
    let category = $("#selectCategory").data("id");
    if (!title) {
        Materialize.toast("请输入标题", toastTime);
        window.location.href = '#title';
        return false;
    }
    if (!desc) {
        Materialize.toast("请输入描述", toastTime);
        window.location.href = '#desc';
        return false;
    }
    if (!content || content == '<p><br></p>') {
        Materialize.toast("请输入文章内容", toastTime);
        window.location.href = '#divContent';
        return false;
    }
    if (!current.wallpic) {
        Materialize.toast("请上传一张封面图片", toastTime);
        window.location.href = '#wallPicForm';
        return false;
    }
    if (!column) {
        Materialize.toast('请选择文章栏目', toastTime);
        window.location.href = '#selectColumn';
        return false;
    }
    if (!category) {
        Materialize.toast("请选择文章分类", toastTime);
        window.location.href = '#selectCategory';
        return false;
    }

    $.ajax({
        url: '/api/article/add',
        type: 'put',
        data: {
            title: title,
            desc: desc,
            content: content,
            wallpic: current.wallpic,
            wallpicname: current.wallpicname,
            column: column,
            category: category
        },
        success: function (data) {

            if (data.isSuccess) {
                Materialize.toast('发布成功', toastTime, '', function () {
                    window.location.href = column == 2 ? '/article/list/2/0' : '/article/list/1/0';
                });

            } else {
                Materialize.toast('发布失败，请重试', toastTime);
            }
        }
    })
});
$(document).on('change', '#wallPic', function () {
    if (this.files && this.files.length > 0) {
        $("#wallPicForm").ajaxSubmit({
            url: '/api/article/upload/wallimg',
            type: 'post',
            success: function (data) {
                current.wallpic = data.url;
                current.wallpicname = data.name;
            }
        });
        uploadImg(this);
    }
});

$(document).on('click', '#selectCategory', function () {
    $("#modalCategory").modal("open");
});
$(document).on('focus', '#selectCategory', function () {
    $("#modalCategory").modal("open");
});
$(document).on('click', '#saveCategory', function () {
    let $selectCategory = $("input[name='category']:checked");
    let categoryName = $selectCategory.siblings("label").html();
    let categoryID = $selectCategory.attr("id");
    $("#selectCategory").html(categoryName).data("id", categoryID);
    $("#modalCategory").modal("close");
});

$(document).on('click', '#selectColumn', function () {
    $("#modalColumn").modal("open");
});
$(document).on('focus', '#selectColumn', function () {
    $("#modalColumn").modal("open");
});
$(document).on('click', '#saveColumn', function () {
    let $selectColumn = $("input[name='column']:checked");
    let columnName = $selectColumn.siblings("label").html();
    let columnID = $selectColumn.attr('id');
    $("#selectColumn").html(columnName).data("id", columnID);
    $("#modalColumn").modal("close");

});



