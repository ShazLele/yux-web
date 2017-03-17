import React from "react";
// import fetch from "isomorphic-fetch";
import {PreLoader} from "../plugins/index.jsx";
import store from "../store.jsx";
import actions from "../actions.jsx";
"use strict";
class CommentItem extends React.Component {
    render() {
        let comment = this.props.info;
        return (
            <div className="item">
                <p>
                    <span className="item-date red-text lighten-2">{comment.addtime}</span>
                </p>
                <p>
                    <a>{comment.nickname}</a>
                    <span>评论了你发表的文章</span>
                    <a href="#">{comment.targetname}</a>
                    <a href={`/article/detail/${comment.targetid}#comments`} className="right">查看</a>
                </p>
                <p>
                    <span>{comment.content}</span>
                </p>
            </div>
        )
    }
}

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0, //-1 error 1 ok 0 loading
            list: []
        };
    }

    componentDidMount() {
        this.unSubscribe = store.subscribe(() => {
            this.setState({
                status: 1,
                list: store.getState()[store.keys.commentList]
            });
        });
        let commentList = store.getState()[store.keys.commentList];
        if (commentList) {
            this.setState({list: commentList, status: 1});

        } else {
            //异步请求
            store.dispatch(actions.getCommentList());
        }


    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    render() {
        const listItem = this.state.list.map((item, key) => (
            <CommentItem key={key} info={item}/>
        ))
        return (
            <div className="content-list">
                {this.state.status == 0 && <PreLoader/>}
                {this.state.status == 1 && this.state.list.length > 0 && listItem}
                {this.state.status == 1 && this.state.list.length <= 0 && <div><span>暂无数据</span></div>}
                {this.state.status == -1 && <div><span>加载错误</span></div>}
            </div>
        )
    }
}

class PageComment extends React.Component {
    render() {
        return (
            <div className="page-comment">
                <CommentList/>
            </div>
        )
    }
}

export default PageComment;