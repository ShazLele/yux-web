"use strict";
import "../../sass/yux-ui.scss";
import "../../sass/user/index.scss";

// import $ from "jquery";
// import Materialize from "materialize-css/dist/js/materialize";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link, hashHistory, IndexRoute} from  "react-router";
import store from "./store.jsx";
import {UserHelper} from "./plugins/index.jsx";

import PageInfo from "./pages/info.jsx";
import PageArticle from "./pages/article.jsx";
import PageComment from "./pages/comment.jsx";
import PageSetting from "./pages/setting.jsx";

class ViewWall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        this.unSubscribeUserInfo = store.subscribe(() => {
            this.setState({userInfo: store.getState()[store.keys.userInfo]});
        });

        store.dispatch({
            type: 'SET_USER',
            userInfo: UserHelper.getUser()
        });

    }

    componentWillUnmount() {
        this.unSubscribeUserInfo();
    }


    render() {
        return (
            <div className={this.props.className}>
                <div className="wallpic-main">
                    <div className="wallpic-headpic">
                        <img src="/images/user/headImg.png"/>
                    </div>
                    <div className="wallpic-info">
                        <h5><i className="fa fa-user"></i>{this.state.userInfo ? this.state.userInfo.nickname : '- -'}
                        </h5>
                    </div>
                    <div className="wallpic-edit">
                        <button className="btn-flat">编辑头像</button>
                    </div>
                    <div className="wallpic-edit">
                        <a href="/" className="btn-flat">返回首页</a>
                    </div>
                </div>
            </div>)
    }

}

class ViewMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={this.props.className}>
                <ul>
                    <li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}><i className="fa fa-user"></i>信息</Link>
                    </li>
                    <li><Link to="article" activeClassName="active"><i className="fa fa-file"></i>文章</Link></li>
                    <li><Link to="comment" activeClassName="active"><i className="fa fa-pencil"></i>评论</Link></li>
                    <li><Link to="collect" activeClassName="active"><i className="fa fa-bookmark"></i>收藏</Link></li>
                    <li><Link to="love" activeClassName="active"><i className="fa fa-heart"></i>喜欢</Link></li>
                    <li><Link to="setting" activeClassName="active"><i className="fa fa-cog"></i>设置</Link></li>
                </ul>
            </div>
        )
    }
}

class ViewMain extends React.Component {
    render() {
        return (
            <div className={this.props.className}>

                {this.props.children}
            </div>
        )
    }
}


class PageCollect extends React.Component {
    render() {
        return (
            <div>
                <h1>维护中</h1>
                <p>功能暂未提供</p>
            </div>
        )
    }
}

class PageLove extends React.Component {
    render() {
        return (
            <div>
                <h1>维护中</h1>
                <p>功能暂未提供</p>
            </div>
        )
    }
}


class UserCenter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="yux-usercenter">
                <ViewWall className='teal lighten-1 view-wallpic wallpic'/>
                <ViewMenu className="teal lighten-3 view-menu"/>
                <ViewMain className="view-main">
                    {this.props.children}
                </ViewMain>
            </div>);
    }
}

class MyRouter extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={UserCenter}>
                    <IndexRoute component={PageInfo}/>
                    <Route name="article" path='article' component={PageArticle}/>
                    <Route name="comment" path='comment' component={PageComment}/>
                    <Route name="collect" path='collect' component={PageCollect}/>
                    <Route name="love" path='love' component={PageLove}/>
                    <Route name="setting" path='setting' component={PageSetting}/>
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(
    <MyRouter/>,
    document.querySelector("#userCenter")
);