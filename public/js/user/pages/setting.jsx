/**
 * Created by Stone on 2016/12/12.
 */
import React from "react";
import store from "../store.jsx";
import fetch from "isomorphic-fetch";

"use strict";
class SettingPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPwd: '',
            oldValidate: true,
            newPwd: '',
            newValidate: true,
            confirmPwd: '',
            confirmValidate: true

        }
        this.getOldPwd = this.getOldPwd.bind(this);
        this.getNewPwd = this.getNewPwd.bind(this);
        this.getConfirmPwd = this.getConfirmPwd.bind(this);
        this.handleResetPwd = this.handleResetPwd.bind(this);
    }

    getOldPwd(ev) {
        this.setState({oldPwd: ev.target.value, oldValidate: true});
    }

    getNewPwd(ev) {
        this.setState({newPwd: ev.target.value, newValidate: true});
    }

    getConfirmPwd(ev) {
        this.setState({confirmPwd: ev.target.value, confirmValidate: true});
    }

    handleResetPwd() {

        if (this.state.oldPwd.length <= 0) {

            this.setState({oldValidate: false});
            Materialize.toast('请输入旧密码', 3000);
            return;
        }

        if (this.state.newPwd.length <= 0) {
            this.setState({newValidate: false});
            Materialize.toast('请输入新密码', 3000);
            return;
        }

        if (this.state.confirmPwd.length <= 0 || this.state.confirmPwd !== this.state.newPwd) {

            this.setState({confirmValidate: false});
            Materialize.toast('两次密码输入不一致', 3000);
            return;
        }
        let myHeaders = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        fetch('/api/user/pwd/reset', {
            method: 'POST',
            credentials: 'include',
            headers: myHeaders,
            body: `oldPwd=${this.state.oldPwd}&newPwd=${this.state.newPwd}`
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((res) => {

                res.isSuccess
                    ? Materialize.toast('更新成功,请重新登录', 3000, null, () => {
                    window.location.hash = '#';
                })
                    : Materialize.toast(`更新失败：${res.msg}`, 3000);
            })
    }

    render() {
        return (
            <div className="setting-section card">
                <div className="input-field">

                    <i className="grey-text">请输入旧密码</i>
                    <input className={!this.state.oldValidate && 'invalid'} type="password" onChange={this.getOldPwd}
                           value={this.state.oldPwd}/>
                </div>
                <div className="input-field">

                    <i className="grey-text">请输入新密码</i>
                    <input className={!this.state.newValidate && 'invalid'} type="password" onChange={this.getNewPwd}
                           value={this.state.newPwd}/>
                </div>
                <div className="input-field">
                    <i className="grey-text">请确认新密码</i>
                    <input className={!this.state.confirmValidate && 'invalid'} type="password"
                           onChange={this.getConfirmPwd} value={this.state.confirmPwd}/>
                </div>
                <div className="input-field">
                    <span className="waves-effect waves-light btn" onClick={this.handleResetPwd}>保存</span>
                </div>
            </div>
        )
    }

}

class SettingNickName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldNickname: '',
            user: {}
        }
        this.handleChangeNickName = this.handleChangeNickName.bind(this);
        this.handleResetNickName = this.handleResetNickName.bind(this);
    }

    componentDidMount() {
        const user = store.getState()[store.keys.userInfo];
        this.setState({user, oldNickname: user.nickname});

        this.unSubscribe = store.subscribe(() => {
            const user = store.getState()[store.keys.userInfo];
            this.setState({user, oldNickname: user.nickname});
        })
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    handleChangeNickName(ev) {
        const value = ev.target.value;

        this.setState((prevState, props) => ({
            user: Object.assign({}, prevState.user, {nickname: value})
        }));
    }

    handleResetNickName() {
        if (this.state.user.nickname == this.state.oldNickname)
            return;
        if (this.state.user.nickname.length < 1 && this.state.user.nickname.length > 10) {
            Materialize.toast('请输入1-10位昵称', 3000);
            return;
        }

        fetch('/api/user/update/nickname', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',

            },
            'credentials': 'include',
            body: `_id=${this.state.user._id}&nickname=${this.state.user.nickname}`
        }).then(data => {
            if (data.ok) {
                data.json().then(res => {
                    if (res.isSuccess) {
                        Materialize.toast('用户昵称修改成功', 3000, null, () => {
                            window.location.hash = '#';
                        });
                        store.dispatch({type: 'RENAME_USER', nickname: this.state.user.nickname})
                    } else {
                        Materialize.toast(res.msg, 3000);
                    }
                })
            } else {
                Materialize.toast('用户昵称修改失败', 3000);
            }
        })
    }

    render() {
        return (
            <div className="setting-section card">

                <div className="input-field">
                    <i className="grey-text">修改昵称</i>
                    <input id="nickname" type="text" value={this.state.user.nickname || '获取中'}
                           onChange={this.handleChangeNickName}/>
                </div>
                <div className="input-field">
                    <span className="waves-effect waves-light btn" onClick={this.handleResetNickName}>保存</span>
                </div>
            </div>
        )
    }
}

class MainContent extends React.Component {
    render() {
        return (
            <div className="page-setting">

                <SettingNickName/>
                <SettingPwd/>

            </div>
        )
    }

}

class PageSetting extends React.Component {
    render() {
        return (
            <MainContent/>
        )
    }
}

export  default PageSetting;