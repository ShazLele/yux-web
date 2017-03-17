/**
 * Created by Stone on 2016/11/12.
 */
"use strict";
let isSubmit = false;
$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal({
        dismissible: false
    });
});

$(document).on('click', '#registerBtn', function () {
    let $sendBtn = $(this);
    var email = $("#email").val();
    var nickname = $("#nickname").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();

    var emailRegx = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

    if (!emailRegx.test(email)) {
        Materialize.toast('邮箱输入不合法', 2000);
        return false;
    }
    if (!nickname || !password) {
        Materialize.toast('用户名或密码不可为空', 2000);
        return false;
    }
    if (password != password2) {
        Materialize.toast('两次输入密码不一致', 2000);
        return false;
    }
    $.ajax({
        url: '/api/user/register',
        type: 'put',
        data: {
            email: email,
            nickname: nickname,
            password: password
        },
        beforeSend: function () {
            $sendBtn.html('提交中').prop('disabled', true);
        },
        complete: function () {
            $sendBtn.html('注册').prop('disabled', false);
        },
        success: function (data) {
            if (data.isSuccess) {
                var emailArr = email.split('@');
                $("#certifyEmail").html(emailArr[0].substr(0, 4) + "***@" + emailArr[1]);
                $("#modalcertify").modal("open");
            } else {
                Materialize.toast(data.err, 3000);
            }
        },
        error: function (err) {
            Materialize.toast(err, 3000);
        }
    })
});