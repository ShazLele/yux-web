/**
 * Created by Stone on 2016/4/17.
 */
"use strict";
exports.ResultModel = function() {

    this.init = function() {
        this.err = null;
        this.isSuccess = true;
        this.list = null;
        this.obj = null;
        return this;
    };
    this.toJson = function() {
        return {
            err: this.err,
            isSuccess: this.isSuccess,
            list: this.list,
            obj: this.obj
        }
    };
    this.setError = function(err) {
        this.init();
        this.err = err;
        this.isSuccess = false;
        return this;
    };
    this.setList = function(list) {
        this.init();
        this.list = list;
        return this;
    };
    this.setObj = function(obj) {
        this.init();
        this.obj = obj;
        return this;
    };

};
