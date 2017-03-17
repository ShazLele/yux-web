/**
 * Created by Stone on 2016/11/10.
 */
"use strict";
$(document).ready(function() {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal({
        dismissible: false
    });
});
$(document).on('click', '#loginBtn', function() {
    let $sendBtn = $(this);
    let email = $("#email").val();
    let password = $("#password").val();

    if (!email || !password) {
        Materialize.toast('请检查输入', 3000);
        return false;
    }
    $.ajax({
        url: '/api/user/login',
        type: 'post',
        data: {
            email: email,
            password: password
        },
        beforeSend: function() {
            $sendBtn.html('提交中').prop('disabled', true);
        },
        complete: function() {
            $sendBtn.html('登录').prop('disabled', false);
        },
        success: function(data) {

            if (data.isSuccess && data.obj) {
                $("#viewSwitch").addClass("active");
                window.location.href = '/';
            } else {
                if (data.obj && data.obj.status == 0) {
                    var emailArr = email.split('@');
                    $("#certifyEmail").html(emailArr[0].substr(0, 4) + "***@" + emailArr[1]);
                    $("#modalSendEmail").modal("open");
                } else {
                    Materialize.toast(data.err, 3000);
                }

            }
        },
        error: function(err) {
            Materialize.toast(err, 3000);
        }
    })
});

$(document).on('click', '#btnSend', function() {
    let $sendBtn = $(this);
    let email = $("#email").val();
    var password = $("#password").val();
    if (!email || !password) {
        Materialize.toast('邮箱和密码信息不完整', 3000);
        return false;
    }
    $.ajax({
        url: '/api/user/certification/send',
        type: 'post',
        data: {
            email: email,
            password: password
        },
        beforeSend: function() {
            $sendBtn.html('发送中').prop('disabled', true);
        },
        complete: function() {
            $("#modalSendEmail").modal("close");
            $sendBtn.html('发送激活链接').prop('disabled', false);
        },
        success: function(data) {

            if (data.isSuccess) {
                Materialize.toast('激活邮件发送成功，请查收', 5000);
            } else {
                Materialize.toast('激活邮件发送失败，' + data.err, 3000);
            }
        },
        error: function(err) {

            Materialize.toast(err, 3000);
        }
    })

});