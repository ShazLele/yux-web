var express = require('express')
    , bodyParser = require('body-parser')
    , path = require('path')
    , cookieParser = require('cookie-parser')
    , index = require('./routes');

var app = express();

app.set('view engine', 'jade');
app.set('views', 'views');

app.use('/', index);
app.use('/index', index);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res) {
    res.render('index', {title: 'Not Found'});
});
app.listen(3000, function (err) {
    console.log('my server is start,at port %d', 3000);
})