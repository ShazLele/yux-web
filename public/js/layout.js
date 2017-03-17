/**
 * Created by Stone on 2016/11/10.
 */
"use strict";
$(document).on('click', 'a[target!=_blank]', function () {

    var href = $(this).attr('href');
    if (href && href.indexOf('#') !== 0) {
        $("#viewSwitch").addClass("active");
    }
});
$(document).on('click', '.header-nav [data-id="logout"]', function () {
    $.ajax({
        url: '/api/user/logout',
        type: 'post',
        success: function (data) {
            if (data.isSuccess) {
                window.location.reload();
            }
        },
        error: function (err) {
            Materialize.toast(err);
        }
    })
});
$(document).on('click', '#switchCancel', function () {
    $("#viewSwitch").addClass("hide");
    window.location.reload();
});
$(document).on('click', '#btnSearch', function () {
    let keyword = $("#search").val();
    $("#viewSwitch").addClass("active");
    window.location.href = `/article/list/1/0/${keyword}`;
});

$(document).on('keydown', '#search', function (e) {

    if (e.keyCode == 13)
        $('#btnSearch').click();
});
