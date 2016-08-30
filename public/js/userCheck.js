// $(function(){
// 	//通过审核
// 	$("#signupModal input").blur(function(e) {
// 		var that = $(this)
// 		var input = that.attr("name")
// 		var inputVal = that.val()
// 		if (input == "username") {
// 			if (inputVal) {
// 				$.ajax({
// 					url: '/user/audit?id=' + id,
// 					type: 'GET'
// 				})
// 				.done(function() {
// 					console.log("success");
// 				})
// 				console.log("has")
// 			} else {
// 				console.log("用户名不能为空")
// 			}
// 		} else if(input == "password") {

// 			if (!inputVal) {
// 				console.log("密码不能为空")
// 			}
// 		}
		
// 	})
// })