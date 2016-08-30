var User = require('../models/user.js')

//注册
exports.signup = function* (){
	var _user = this.request.body
	var username = _user.username
	var password = _user.password
	var result = yield User.findOne({username: username})

	if (!username || !password) {	//用户名或密码为空
		//重定向至首页
		this.redirect('/')

	} else {
		if (result) {
			//已存在该用户
			this.redirect('/')

		} else {
			//注册新用户
			var user = new User(_user)
			yield user.save()
			this.redirect('/')

		}
	}
}

//登录
exports.signin = function* (){
	var _user = this.request.body
	var username = _user.username
	var password = _user.password

	var result = yield User.findOne({username: username})
	if (!result) {
		//该用户不存在
		this.redirect('/')

	} else {
		//对比密码
		var isMatch = result.comparePassword(password)
		if (isMatch) {
			//登陆成功
			this.session.user = result
			if (result.role > 0) {	//管理员
				this.redirect('/user/list')

			} else {	//普通用户
				this.redirect('/survey/list')

			}
		}
		else {
			//登陆失败
			this.redirect('/')
		}
	}
}

//注销
exports.logout = function* (){
	delete this.session.user
	this.redirect('/')

}

// 修改个人信息
exports.modify = function* (){
	yield this.render('modifyuserinfo',{title: "修改个人信息"})
}

exports.modifyInfo = function* (){
	var _user = this.request.body
	var result = yield User.findOne({_id: _user.id})

	//修改用户信息
	result.password = _user.password
	result.email = _user.email
	result.tel = _user.tel
	yield result.save()

	//注销，重新登录
	delete this.session.user
	this.redirect('/')

}

//用户列表
exports.list = function* (){
	var userlist = yield User.find({})
	yield this.render('userlist',{title: "用户列表", userlist: userlist})

}

//审核注册
exports.audit = function* (){
	var id = this.query.id

	if (id) {
		yield User.update({_id: id}, {state: 1})
		this.redirect('/user/list')

	}

}

//删除用户
exports.del = function* (){
	var id = this.query.id

	if (id) {
		yield User.remove({_id: id})
		this.redirect('/user/list')
	}

}