/**
 * Created by Stone on 2016/11/9.
 */
var editor = new wangEditor('div1');
//配置菜单项
editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
    if (item === 'source') {
        return null;
    }
    if (item === 'fullscreen') {
        return null;
    }
    if (item === 'table') {
        return null;
    }
    if (item === 'video') {
        return null;
    }
    if (item === 'location') {
        return null;
    }
    if (item === 'undo' || item === 'redo') {
        return null;
    }
    return item;
});
//配置吸顶
editor.config.menuFixed = false;

// 修改菜单栏fixed的上边距（单位 px）
// editor.config.menuFixed = 64;

// 插入代码时的默认语言
editor.config.codeDefaultLang = 'javascript';
editor.create();

$(document).on('click', '#submitBtn', function() {
    var title = $("#title").val();
    var desc = $("#desc").val();
    var content = editor.$txt.html();
    $.ajax({
        url: '/api/article/add',
        type: 'put',
        data: {
            title: title,
            desc: desc,
            content: content
        },
        success: function(data) {
            if (data.isSuccess) {
                Materialize.toast('发布成功', 4000);
                window.location.href = '/article/list';
            } else {
                Materialize.toast('发布失败，请重试', 4000);
            }
        }
    })
});
