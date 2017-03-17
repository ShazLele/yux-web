import React from "react";
import store from "../store.jsx";
"use strict";
class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        let info = store.getState()[store.keys.userInfo] || {};
        this.setState({userInfo: info});
        this.unSubscribe = store.subscribe(() => {
            let info = store.getState()[store.keys.userInfo] || {};
            this.setState({userInfo: info});
        })
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    render() {
        let userInfo = this.state.userInfo;
        let addTimeArr = userInfo.addtime ? userInfo.addtime.split(/[T.]/) : ['-', '-'];
        let loginTimeArr = userInfo.lastlogintime ? userInfo.lastlogintime.split(/[T.]/) : ['-', '-'];
        return (
            <div className="page-info">
                <div className="info-img">
                    <img src="/images/user/headImg.png"/>
                </div>
                <div className="info-main">
                    <h5 className="info-title">{userInfo.nickname}</h5>
                    <div>
                        <div>
                            <p>邮箱：{userInfo.email}</p>
                            <p>密码：****** </p>
                        </div>
                        <div>
                            <p>入坑时间：{addTimeArr[0] + ' ' + addTimeArr[1]}</p>
                            <p>最后登录：{ loginTimeArr[0] + ' ' + loginTimeArr[1]}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class PageInfo extends React.Component {
    render() {
        return (
            <MainContent/>
        )
    }
}

export default PageInfo;