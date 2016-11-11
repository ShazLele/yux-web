/**
 * Created by Stone on 2016/11/10.
 */

$(document).on('click', '#loginBtn', function() {
    var email = $("#email").val();
    var password = $("#password").val();
    $.ajax({
        url: '/api/user/login',
        type: 'post',
        data: {
            email: email,
            password: password
        },
        success: function(data) {
            if (data.isSuccess && data.obj) {
                window.location.href = '/';
            } else {
                alert(data.err);
            }
        }
    })
});