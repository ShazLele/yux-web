/**
 * Created by Stone on 2016/4/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
    targetid: String,//璇勮瀵硅薄鐨刬d  鏂囩珷id鎴栬�� 鐢ㄦ埛id
    rebackid: String, //鍥炲鐨勮瘎璁篿d
    rebackname: String,//鍥炲鐨勮瘎璁虹殑鐢ㄦ埛鍚�
    userid: String,//璇勮鐨勭敤鎴穒d
    nickname: String,
    content: String,
    addtime: String, //璇勮娣诲姞鏃ユ湡
    infotype: Number,//1鏂囩珷璇勮 2鐢ㄦ埛璇勮
    status: Number
});

module.exports = Comment;