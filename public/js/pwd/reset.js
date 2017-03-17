/**
 * Created by Stone on 2016/12/16.
 */

"use strict";
$(document).on('click', '#resetPwdBtn', function () {
    let email = $('#email').val(),
        code = $('#code').val(),
        password = $('#pwd').val(),
        confirmPwd = $('#confirmPwd').val();
    if (email == '') {
        Materialize.toast('获取邮箱失败，请刷新后重试');
        return;
    }
    if (code == '') {
        Materialize.toast('请输入验证码');
        return;
    }
    if (password == '') {
        Materialize.toast('请输入新密码');
        return;
    }

    if (confirmPwd !== password) {
        Materialize.toast('两次密码不一致');
        return;
    }

    $.ajax({
        url: '/api/user/pwd/back',
        type: 'post',
        data: {email, code, password},
        success: data => {
            if (data.isSuccess) {
                Materialize.toast('密码找回成功，请重新登录', 3000, null, () => {
                    window.location.href = '/login';
                });
            }
            else {
                Materialize.toast('密码找回失败:' + data.msg, 3000);
            }
        }

    })
});