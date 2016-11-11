var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bll = require('./bll'),
    main = require('./routes/main'),
    article = require('./routes/article'),
    user = require('./routes/user'),
    api = require('./routes/api');

var app = express();

app.set('view engine', 'jade');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', main);
app.use('/article', article);
app.use('/user', user);
app.use('/api/article', api.article);
app.use('/api/user', api.user);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res) {
    bll.Menu.getMenu('error', req.cookies['userInfo']).then(function(list) {
        res.render('error', { title: 'Not Found', menus: list });
    })

});
app.listen(3010, function(err) {
    console.log('my server is start,at port %d', 3010);
});