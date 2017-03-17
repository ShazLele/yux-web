var express = require('express'),
    https = require('https'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    _global = require('./global'),
    webpackServer = require('./webpack.server'),
    common = require('./common'),
    bll = require('./bll'),
    viewRoute = require('./routes/views'),
    mobileRoute = require('./routes/mobile'),
    apiRouter = require('./routes/api');

var app = express();
// !(global.__evn == 'prod') && webpackServer.use(app);
webpackServer.use(app);
app.set('view engine', 'jade');
app.set('views', 'views');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//app.use(filter.permission);
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("X-Powered-By", ' 3.2.1');
    next();
})
app.use('/', viewRoute.main);
app.use('/article', viewRoute.article);
app.use('/user', viewRoute.user);
app.use('/category', viewRoute.category);
app.use('/api/article', apiRouter.article);
app.use('/api/user', apiRouter.user);
app.use('/api/category', apiRouter.category);
app.use('/api/comment', apiRouter.comment);
app.use('/mobile/article', mobileRoute.article);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resource')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(function (req, res) {
    res.render('error', {
        title: '404',
        errorTitle: '404 Not Found',
        errorContent: '访问的页面暂时不存在，至于以后，以后再说,呵呵哒'
    });
});
app.listen(80, () => {
    console.log('my server is start,at port %d', 80);
});
const privateKey = fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt'), 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};
https.createServer(credentials, app).listen(443, () => {
    console.log('443 server start');
});

module.exports = app;