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
		survey.browse = 0
		survey.recovery = 0

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

//预览问卷
exports.view = function* (){
	var id = this.query.id
	var survey = yield Survey.findOne({_id: id})

	if (!this.session.user && survey.state) {
		var browse = survey.browse + 1
		yield Survey.update({_id: id}, {browse: browse})

	}

	yield this.render('viewsurvey',{title: "预览问卷", survey: survey})
}
//提交问卷
exports.submit = function* (){
	var _surveyAns = this.request.body
	var id = _surveyAns.id
	var questions = _surveyAns.questions
	var survey = yield Survey.findOne({_id: id})

	if (questions) {
		var quesLen = questions.length

		if (quesLen == survey.questions.length) {
			for (var i = 0; i < quesLen; i++) {

				survey.questions[i].answers.push(questions[i].answers)
				// survey.questions[i].answers = []
			}

			survey.recovery++
			survey.save()
			this.redirect('/')	//返回首页

		} else{
			console.log("题目未做完")
			this.redirect('/')	//返回首页
		}

	} else {
		console.log("一题未做")
		this.redirect('/')	//返回首页
	}
}

//发布/回收问卷
exports.operate = function* (){
	var id = this.query.id
	var survey = yield Survey.findOne({_id: id})
	var state = !survey.state

	yield Survey.update({_id: id}, {state: state})
	this.redirect('/survey/list')
}

//统计分析
exports.analyse = function* (){
	var id = this.query.id
	var survey = yield Survey.findOne({_id: id})

	yield this.render('analysesurvey',{title: "统计分析", survey: survey})

}

//删除问卷
exports.del = function* (){
	var id = this.query.id

	if (id) {
		yield Survey.remove({_id: id})
		this.redirect('/survey/list')
	}
}