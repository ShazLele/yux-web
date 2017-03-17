/**
 * Created by akon on 2016/11/22.
 */
var http = require('http');
http.createServer(function (req,res) {
    console.log(req);
    res.send('a');
}).listen(3000,function(){

});



// setTimeout(function(){})


