import {combineReducers} from "redux";
"use strict";
function userInfo(state = {}, action) {
    switch (action.type) {
        case "SET_USER":
            return action['userInfo'] || {};
        case "RENAME_USER":
            return Object.assign({}, state, {
                nickname: action.nickname
            });
        default:
            return state
    }
}

function articleList(state = null, action) {
    switch (action.type) {
        case "SET_ARTICLES":
            return action['articleList'];
        default:
            return state;
    }
}

function loadingStatus(state = null, action) {
    switch (action.type) {
        case "PRELOAD":
            return "正在请求";
        case "LOADDING":
            return "正在加载";
        case "LOADED":
            return null;
        default:
            return state;
    }
}

function commentList(state = null, action) {
    switch (action.type) {
        case "SET_COMMENT":
            return action['commentList'];
        default:
            return state;
    }
}

export default  combineReducers({userInfo, articleList, commentList});