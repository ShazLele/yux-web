import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers.jsx";
"use strict";
let store = createStore(reducer, applyMiddleware(thunk));



store.keys = {
    userInfo: 'userInfo',
    articleList: 'articleList',
    commentList: 'commentList'
}

export default store;