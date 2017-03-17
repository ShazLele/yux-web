import {Router, Route, Link, hashHistory, IndexRoute} from  "react-router";
import React from "react";
"use strict";
class MyRouter extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={UserCenter}>
                    <IndexRoute component={PageInfo}/>

                    <Route name="info" path='info' component={PageInfo}/>
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

module.exports = MyRouter;