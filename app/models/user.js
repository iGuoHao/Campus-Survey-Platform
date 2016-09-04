var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema
var SALT_WORK_FACTOR = 10

var UserSchema = new Schema({
	username: {
		unique: true,
		type: String
	},
	password: String,
	email: String,
	tel: String,

	// 0: nomal user
	// 1: admin user
	role: {
		type: Number,
		default: 0
	},
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
	// 0: not audited
	// 1: audited
	state: {
		type: Number,
		default: 0
	}
})

UserSchema.pre('save', function(next){
	var user = this
	if(this.isNew){
		this.meta.creatAt = this.meta.updateAt = Date.now()		//新建时将creatAt & updateAt更新为当前时间
	} else {
		this.meta.updateAt = Date.now()		//不是新建时将updateAt更新为当前时间
	}

	//加密密码
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err)

			user.password = hash
			next()
		})
	})

})

UserSchema.methods = {
	//比较密码
	comparePassword: function(_password){
		return bcrypt.compareSync(_password, this.password)
	}
}

var User = mongoose.model('User', UserSchema)
module.exports = User