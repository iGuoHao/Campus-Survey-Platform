var Index = require('../app/controllers/index.js')
var User = require('../app/controllers/user.js')
var Survey = require('../app/controllers/survey.js')
var body = require('koa-bodyparser')()
module.exports = function(router){

	//Index
	router.get("/", Index.index)

	//User
	router.post("/user/signup", body, User.signup)
	router.post("/user/signin", body, User.signin)
	router.get("/user/logout", User.logout)
	router.get("/user/modify", User.signinRequired, User.modify)
	router.post("/user/modifyinfo", body, User.signinRequired, User.modifyInfo)
	router.get("/user/list", User.signinRequired, User.adminRequired, User.list)
	router.get("/user/audit", User.signinRequired, User.adminRequired, User.audit)
	router.get("/user/del", User.signinRequired, User.adminRequired, User.del)

	//Survey
	router.get("/survey/list", User.signinRequired, Survey.list)
	router.get("/survey/new",  User.signinRequired, Survey.new)
	router.post("/survey/save", body, User.signinRequired, Survey.save)
	router.get("/survey/modify", User.signinRequired, Survey.modify)
	router.get("/survey/view", Survey.view)
	router.post("/survey/submit", body, Survey.submit)
	router.get("/survey/operate", User.signinRequired, Survey.operate)
	router.get("/survey/del", User.signinRequired, Survey.del)
	router.get("/survey/analyse", User.signinRequired, Survey.analyse)

}