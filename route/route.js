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
	router.get("/user/modify", User.modify)
	router.post("/user/modifyinfo", body, User.modifyInfo)
	router.get("/user/list", User.list)
	router.get("/user/audit", User.audit)
	router.get("/user/del", User.del)

	//Survey
	router.get("/survey/list", Survey.list)
	router.get("/survey/new", Survey.new)
	router.post("/survey/save", body, Survey.save)

}