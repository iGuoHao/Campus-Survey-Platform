var Survey = require('../models/survey.js')

//问卷列表
exports.list = function* (){
	var id =this.session.user._id
	// console.log(id)
	//var surveylist = yield Survey.find({})
	yield this.render('surveylist',{title: "我的问卷"})
}

//新建问卷
exports.new = function* (){

	yield this.render('newsurvey',{title: "创建问卷"})
}

exports.save = function* (){
	var _survey = this.request.body
	var questions = _survey.questions
	_survey.user = this.session.user._id

	for (var i = 0, l = questions.length; i < l; i++) {
		if (questions[i].options) {
			_survey.questions[i].options = questions[i].options.split('-')
		} else {
			_survey.questions[i].options = []
		}
	}

	var survey = new Survey(_survey)

	yield survey.save()
	this.redirect('/survey/list')
}