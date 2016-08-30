var Survey = require('../models/survey.js')

//问卷列表
exports.list = function* (){
	var id =this.session.user._id
	console.log(id)
	//var surveylist = yield Survey.find({})
	yield this.render('surveylist',{title: "我的问卷"})
}

//新建问卷
exports.new = function* (){

	yield this.render('newsurvey',{title: "创建问卷"})
}
exports.save = function* (){
	var survey = this.request.body
	console.log(survey)
}