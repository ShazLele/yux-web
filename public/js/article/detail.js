/**
 * Created by Stone on 2016/11/9.
 */
"use strict";
const urlArr = window.location.href.split(/[\/#]/);

let id = urlArr[urlArr.length - 1];
if (window.location.href.indexOf('#') > -1) {
    id = urlArr[urlArr.length - 2];
}

let loadComments = function () {
    $.ajax({
        url: '/article/part/comments/' + id,
        type: 'get',
        success: function (data) {
            $("#commentsList").html(data);
        }
    });
};

let refreshCommentsCount = function () {
    $.ajax({
        url: `/api/comment/count/${id}`,
        type: 'get',
        cache: true,
        success: function (data) {
            if (data && data.isSuccess) {
                $(".js-ccount").each(function () {
                    $(this).html($(this).html().replace(/\d/, data.list[0].count));
                })
            }
        }
    })
};

$(function () {
    loadComments();

    let clipboard = new Clipboard("#copyBtn");
    clipboard.on('success', function () {
        Materialize.toast('复制成功', 3000);
    })
    clipboard.on('error', function () {
        Materialize.toast('复制失败', 3000);
    })
})


$(document).on('click', '#addComments', function () {
    let content = $("#input-comments").val();
    $.ajax({
        url: '/api/comment/add',
        type: 'put',
        data: {
            targetid: id,
            content: content,
        },
        success: function (data) {
            if (data && data.isSuccess) {
                $("#input-comments").val('');
                loadComments();
                refreshCommentsCount();
            }
            else
                Materialize.toast('评论失败', 2000);
        },
        error: function (err) {
            Materialize.toast(err.err, 2000);
        }
    })
})


