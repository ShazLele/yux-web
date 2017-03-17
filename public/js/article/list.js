/**
 * Created by Stone on 2016/11/15.
 */
"use strict";
const pageSize = 10;
let pageIndex = 2;

let urlArr = window.location.href.split('/');
const categoryID = urlArr[urlArr.length - 1];
const column = urlArr[urlArr.length - 2];

$(document).on('click', '#showMore', function () {
    $.ajax({
        url: `/article/part/list/page/${column}/${categoryID}/${pageIndex}/${pageSize}`,
        type: 'get',
        success: function (data) {
            if (data) {
                pageIndex++;
                $("#articleList").append($(data));
            } else {
                $("#showMore").addClass("hide");
                $("#hasEnd").removeClass("hide");
            }
        }
    })
})