var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var SurveySchema = new Schema({
	user: {
		type: ObjectId,
		ref: 'User'
	},
	title: String,
	summary: String,	//问卷简介
	meta: {
		creatAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	},
	questions: [{
		quetitle: String,
		describe: String,	//问题描述
		type: String,	//题型：单选、多选、问答、单行文本
		options: [],	//选项
		answers: []		//回答
	}],
	// false: 保存，未发布 || 发布后收回
	// true: 已发布
	state: {
		type: Boolean,
		default: false
	},
	browse:Number,	//浏览量
	recovery: Number	//回收量
})

var Survey = mongoose.model('Survey', SurveySchema)
module.exports = Survey