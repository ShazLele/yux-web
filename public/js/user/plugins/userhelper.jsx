"use strict";
export default class UserHelper {
    static getUser() {
        let name = 'userInfo';
        let info;
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            info = decodeURIComponent(arr[2]);
            info = JSON.parse(info.substr(2, info.length));
        }
        return info || {};
    }
}
