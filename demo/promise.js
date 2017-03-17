/**
 * Created by Stone on 2016/12/6.
 */
var mongoose = require('mongoose'),
    db = require('../model');


function getPage() {
    return db.Article.find({}, null)
        .populate('category', '_id name')
        .populate('comments', '_id')
        .populate('user', '_id nickname')
        .skip(10)
        .limit(10)
}

getPage()
    .then(()=> {
       return console.log(1);
    })
    .then(()=>{
        console.log('3');
    })
    .catch(err=> {
        console.log(err);
    })

