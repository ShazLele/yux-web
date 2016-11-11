/**
 * Created by Stone on 2016/4/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Status = new Schema({
    type: Number,//1 Õý³£ -1 É¾³ý 2 ÉóºËÖÐ
    name: String,
    desc: String
});

module.exports = Status;