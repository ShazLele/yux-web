import fetch from "isomorphic-fetch";
"use strict";
function getArticleList() {
    return (dispatch) => {

        fetch('/api/article/list/1',
            {
                method: 'get',
                credentials: 'include'
            })
            .then(
                (res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    if (res.status == 401) {
                        window.location.href = '/login';
                    }
                }
            )
            .then((data) => {
                dispatch({type: 'SET_ARTICLES', articleList: data.list});
            })

    }
}

function getCommentList() {
    return (dispatch) => {
        fetch('/api/comment/list/current', {
            method: 'get',
            credentials: 'include'
        })
            .then(
                (res) => {
                    if (res.ok) {
                        return res.json()
                    }
                    if (res.status == 401) {
                        window.location.href = '/login';
                    }
                }
            )
            .then(
                (res) => {
                    let commentList = res.list;
                    dispatch({type: 'SET_COMMENT', commentList});
                }
            )
    }
}
export default {getArticleList, getCommentList};