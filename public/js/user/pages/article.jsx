/**
 * Created by Stone on 2016/11/26.
 */
import React from "react";
import fetch from "isomorphic-fetch";
import {PreLoader} from "../plugins/index.jsx";
import store from "../store.jsx";
import actions from "../actions.jsx";
"use strict";
class ArticleItem extends React.Component {
    constructor(props) {
        super(props);
        this.article = this.props.article;
        this.removeArticle = this.removeArticle.bind(this);

    }

    removeArticle() {
        let removeUrl = '/api/article/remove/' + this.article._id;
        if (confirm('是否要删除该文章')) {
            fetch(removeUrl, {credentials: 'include'})
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    else {
                        alert("删除错误");
                    }
                    if (res.status == 401) {
                        window.location.href = '/login';
                    }
                }).then(data => {
                if (data.isSuccess) {
                    store.dispatch(actions.getArticleList());
                }
                else {
                    alert("删除错误");
                }
            })
        }
    }

    render() {
        let article = this.props.article;
        let addTime = article.addtime.split(/[T.]/);
        let detailUrl = '/article/detail/' + article._id;
        let editUrl = '/article/edit/' + article._id;

        let urlCategory = '/article/list/' + article.category._id;

        return (
            <div className="item">
                <p><span className="item-date red-text lighten-2">{addTime[0] + ' ' + addTime[1]}</span></p>
                <p>
                    <span>你在</span>
                    <a href={urlCategory}>{article.category.name}</a>
                    <span> 中发表：<a href={detailUrl}>{article.title}</a>,</span>
                    <a href={editUrl} className="right">修改</a>
                </p>
                <p>
                    <span>已有</span>
                    <a>{article.reading}</a>
                    <span>人阅读，</span>
                    <a>{article.comments.length}</a>
                    <span>人评论</span>
                    <a onClick={this.removeArticle} className="right">删除</a>
                </p>
            </div>
        )
    }
}

class ArticleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 1,  //-1 error 1 ok 0 loading
            list: []
        };
    }

    componentDidMount() {
        this.unSubscribeList = store.subscribe(() => this.setState({
            list: store.getState()[store.keys.articleList]
        }));
        let articleList = store.getState()[store.keys.articleList];
        if (articleList) {
            this.setState({'list': articleList, status: 1});
        } else {
            //异步调用数据
            store.dispatch(actions.getArticleList());
        }
    }

    componentWillUnmount() {
        this.unSubscribeList();
    }

    render() {
        const ListItem = this.state.list.map((item, key) => (
            <ArticleItem key={key} article={item}/>
        ))
        return (
            <div className="content-list">
                {this.state.status == 0 && <PreLoader/>}
                {this.state.status == 1 && this.state.list.length > 0 && ListItem}
                {this.state.status == 1 && this.state.list.length <= 0 && <div><span>暂无数据</span></div>}
                {this.state.status == -1 && <div><span>加载错误</span></div>}
            </div>
        )
    }
}

class PageArticle extends React.Component {
    render() {
        return (
            <div className="page-article">
                <ArticleList />
            </div>
        )
    }
}

export default PageArticle;