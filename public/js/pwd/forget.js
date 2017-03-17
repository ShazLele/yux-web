/**
 * Created by Stone on 2016/12/15.
 */
"use strict";
$(document).on("click", "#sendCodeBtn", function () {

    let $emailVal = $("#email").val();
    const testEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/;
    if (!testEmail.test($emailVal)) {
        Materialize.toast('请输入合法的邮箱', 3000);
        return;
    }
    $.ajax({
        url: '/api/user/pwd/certification/send',
        type: 'post',
        data: {
            email: $emailVal
        },
        success: function (data) {
            if (data.isSuccess) {
                window.location.href = `/pwd/reset/${$emailVal}?_v=${new Date().getTime()}`;
            }
        },
        error: function () {
            Materialize.toast('发送失败，请重试', 3000);
        }
    })
});

function toggleSendStatus(type) {
    let $sendContainer = $("#sendContainer").addClass('hide');
    let $resContainer = $("#resContainer").addClass('hide');
    type == 1 && $sendContainer.removeClass('hide');
    type == 2 && $resContainer.removeClass('hide');
}