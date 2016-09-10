// $(function(){
// 	var hasPassword = false
// 	var correctUsername = false

// 	$('#username').blur(function(event) {
// 		var username = $(this).val()
// 		var signinPrompt = $('.signinPrompt')
		
// 		if (username) {
// 			$.ajax({
// 				url: '/user/signin',
// 				type: 'POST',
// 				dataType: 'json',
// 				data: {username: username},
// 			})
// 			.done(function(data) {

// 				if (data.message == 'nouser') {
// 					correctUsername = false
// 					signinPrompt.show().html(username + " 用户不存在,请输入正确的用户名！")
// 				} else {
// 					correctUsername = true
// 					signinPrompt.hide()
// 				}
// 			})
// 		} else {
// 			correctUsername = false
// 			signinPrompt.show().html("用户名不能为空！")
// 		}
// 	})

// 	$('#password').blur(function(event) {
// 		var password = $(this).val()
// 		var signinPrompt = $('.signinPrompt')

// 		if (password) {
// 			hasPassword = true
// 			signinPrompt.hide()
// 		} else {
// 			hasPassword = false
// 			signinPrompt.show().html("密码不能为空！")
// 		}
// 	});
// })