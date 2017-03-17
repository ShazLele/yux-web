/**
 * Created by Stone on 2017/1/5.
 */
"use strict";
exports.columns = [
    {
        _id: 1,
        name: 'article-list',
        title: '技术专栏'
    },
    {
        _id: 2,
        name: 'ui-list',
        title: 'UI专栏'
    }];


class Columns {
    constructor() {
        this.list = [
            {_id: 1, name: 'article-list', title: '技术专栏'},
            {_id: 2, name: 'ui-list', title: 'UI专栏'}
        ];
    }

    getByID(_id) {
        return this.list.find(item => {
            return item._id == _id;
        })
    }

    getByName(name) {
        return this.list.find(item => {
            return item.name == name;
        })
    }

    getAll() {
        return this.list;
    }
}

module.exports = new Columns();