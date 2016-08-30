$(function(){
	var quesList = $('.quesList')
	var quesTotle = 1

	//插入题目编辑组件
	$('#controlBtn button').click(function(event) {
		var btn = this
		var type = $(this).data('type')
		var result = null

		switch(type){
			case 'radio':
				result = "11111"
				break;
			case 'checkbox':
				result = "22222"
				break;
			case 'sLine':
				result = "33333"
				break;
			case 'mLine':
				result = "44444"
				break;
			default:
				
		}
		quesList.append(result)
		console.log(type)

	})

	//新建选项
	$('.newOpt').click(function(event) {
		// var newOpt = this
		// var type = $(this).data('type')
		var options = $('.options')
		var result = "null"
		options.append(result)
		event.preventDefault();
	})

	//删除选项
	$('.delOpt').click(function(event) {
		var option = $(this).parent()
		option.remove()
	})

	//保存题目
	$('.save').click(function(event) {
		var ques = $(this).parent().parent()
		var input = ques.find('input')
		var title = $(input[0]).val()
		var describe = $(input[1]).val()
		var type = $(input[2]).val()
		var optionStr = ""
		var inputLen = input.length
		var result = '<h3>' + quesTotle + '、' + title + ' <i>*</i><input type="hidden" name="questions[<%= i %>][quetitle]" value="' + title +'"></h3><h4>' + describe + '<input type="hidden" name="questions[<%= i %>][describe]" value="' + describe +'"></h4><input type="hidden" name="questions[<%= i %>][type]" value="'+ type + '">'
		
		switch(type){
			case 'radio':
				for (var i = 3; i < inputLen; i++) {
					var option = $(input[i]).val()
					result += '<p><span class="glyphicon glyphicon-search"aria-hidden="true"></span>' + option + '</p>'
					if (i < inputLen - 1) optionStr += option + "-"
						else optionStr += option
				}
				break;
			case 'checkbox':
				for (var i = 3; i < inputLen; i++) {
					optionStr = $(input[i]).val()
					result += '<p><span class="glyphicon glyphicon-search"aria-hidden="true"></span>' + option + '</p>'
					if (i < inputLen - 1) optionStr += option + "-"
						else optionStr += option
				}
				break;
			case 'sLine':
				result += '<input type="text" class="form-control" readonly>'
				break;
			case 'mLine':
				result += '<textarea type="text" class="form-control" readonly></textarea>'
				break;
			default:
				
		}

		result += '<input type="hidden" name="questions[<%= i %>][optiops]" value="' + optionStr + '">'
		ques.empty().append(result)
		event.preventDefault()
		
	})
})