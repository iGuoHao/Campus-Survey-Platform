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
		quetype: String,	//题型：单选、多选、问答、单行文本
		options: [],	//选项
		answers: []		//回答
	}],
	// false: 保存，未发布 || 发布后收回
	// true: 已发布
	state: {
		type: Boolean,
		default: false
	},
	browse:{	//浏览量
		type: Number,
		default: 0
	},
	recovery: {		//回收量
		type: Number,
		default: 0
	}
})

SurveySchema.pre('save', function(next){

	if(this.isNew){
		this.meta.creatAt = this.meta.updateAt = Date.now()		//新建时将creatAt & updateAt更新为当前时间
	} else {
		this.meta.updateAt = Date.now()		//不是新建时将updateAt更新为当前时间
	}

	next()
})

var Survey = mongoose.model('Survey', SurveySchema)
module.exports = Survey