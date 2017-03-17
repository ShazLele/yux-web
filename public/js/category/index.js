/**
 * Created by Stone on 2016/11/12.
 */
"use strict";
let addLevelHandle = function (level) {
    var name = $("#nameL" + level).val();
    var desc = $("#descL" + level).val();
    if (!name || !desc) {
        Materialize.toast('请检查输入', 2000);
        return false;
    }

    //var promise = new Promise();
    var parentID = 0;
    if (level == 2) {
        parentID = $("#L1Container ul li.active").data("id");
    }
    $.ajax({
        url: '/api/category/add',
        type: 'put',
        data: {
            name: name,
            desc: desc,
            level: level,
            parentid: parentID
        },
        success: function (data) {
            if (data && data.isSuccess) {
                Materialize.toast('保存成功', 2000);
                $.ajax({
                    url: `/category/part/list/refresh`,
                    type: 'get',
                    success: function (data) {
                        $(`#categoryView`).html(data);
                    },
                    error: function (err) {
                        Materialize.toast(err.err, 2000);
                    }
                })
            }
        },
        error: function (data) {
            Materialize.toast(data.err, 2000);
        }
    })
};



$(document).on('click', '.js-addlevel', function () {
    $(this).next('.level-add').toggleClass('shown');
});

$(document).on('click', '#btnSaveL1', ()=> {
    addLevelHandle(1)
});
$(document).on('click', '#btnSaveL2', ()=> {
    addLevelHandle(2)
});

$(document).on('click', '#L1Container ul li:gt(1)', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $.ajax({
        url: '/category/part/list/' + $(this).data("id") + '/2',
        type: 'get',
        success: function (html) {
            $("#L2Container").html(html);
        }
    })
});

$(document).on('click', '#L2Container ul li:gt(1)', function () {
    $(this).addClass('active').siblings().removeClass('active');
    //$.ajax({
    //    url: '/category/part/list/' + $(this).data("id"),
    //    type: 'get',
    //    success: function (html) {
    //        $("#L2Container").html(html);
    //    }
    //})
})


