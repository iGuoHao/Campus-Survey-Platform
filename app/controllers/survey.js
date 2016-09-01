var Survey = require('../models/survey.js')

//问卷列表
exports.list = function* (){
	var id =this.session.user._id
	var surveylist = yield Survey.find({user: id})
	yield this.render('surveylist',{title: "我的问卷", surveylist: surveylist})
}

//新建问卷
exports.new = function* (){
	yield this.render('newsurvey',{title: "创建问卷"})

}

exports.save = function* (){
	var _survey = this.request.body
	var _questions = _survey.questions
	var id = _survey.id
	var survey

	//每题选项处理
	for (var i = 0, l = _questions.length; i < l; i++) {
		if (_questions[i].options) {
			_survey.questions[i].options = _questions[i].options.split('-')
		} else {
			_survey.questions[i].options = []
		}
	}

	if (id) {		//修改问卷
		survey = yield Survey.findOne({_id: id})

		survey.title = _survey.title
		survey.summary = _survey.summary
		survey.questions = _survey.questions

	} else{			//新增问卷

		_survey.user = this.session.user._id
		survey = new Survey(_survey)

	}

	yield survey.save()
	this.redirect('/survey/list')
}

//修改问卷
exports.modify = function* (){
	var id = this.query.id
	var survey = yield Survey.findOne({_id: id})
	
	yield this.render('modifysurvey',{title: "编辑问卷", survey: survey})
}