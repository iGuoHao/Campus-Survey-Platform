var app = require('koa')()
var mongoose = require('mongoose')
var routes = require('koa-router')()
var route = require('./route/route.js')
var render = require('koa-ejs')
var staticServer = require('koa-static');
var path = require('path');
var session = require('koa-session')

//数据库连接
var dbUrl = 'mongodb://localhost/campusSurvey'
mongoose.connect(dbUrl)

var port = 3000

//路由
route(routes)

//配置ejs模板引擎
render(app, {
	root: path.join(__dirname, 'app/views/'),
	layout: '',
	viewExt: 'html',
	cache: false,
	debug: true
})

//session
app.keys = ['some secret hurr']
app.use(session(app))
app.use(function* (next) {
    this.state.user = this.session.user;  
    yield next;

})

app.use(routes.routes())
app.use(staticServer(path.join(__dirname,'public')))

app.listen(port)
console.log('started on port ' + port)