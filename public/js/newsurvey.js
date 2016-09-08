$(function(){
	var quesList = $('.quesList')
	var quesNum = 0		//问题总数
	var optionInitNum = 2 	//初始选项个数

	/*--true：允许插入题目组件
	----false：禁止插入题目组件
	----禁止同时编辑多个问题*/
	var flag = true

	//插入题目编辑组件
	$('#controlBtn button').click(function(event) {
		if (flag) {
			var btn = this
			var type = $(this).data('type')
			var optionStr = ""
			//题目、题目描述、题型为公共部分
			var result = '<div class="oneQues"><div class="form-group"><label for="quetitle"class="col-sm-2 control-label">题目</label><div class="col-sm-10"><input type="text"class="form-control"name="quetitle"id="quetitle"data-id="-1"></div></div><div class="form-group"><label for="describe"class="col-sm-2 control-label">题目描述</label><div class="col-sm-10"><input type="text"class="form-control"name="describe"id="describe"></div></div><div class="form-group"><label for="type"class="col-sm-2 control-label">题型</label><div class="col-sm-10"><p class="form-control-static text-primary">'

			//判断题型，返回相应的组件
			switch(type){
				case 'radio':
					result += "单选题"
					for (var i = 0; i < optionInitNum; i++) {
						optionStr += '<div class="form-group"><label for="options' + i + '"class="col-sm-2 control-label"><span class="glyphicon glyphicon-unchecked"aria-hidden="true"></span></label><div class="col-sm-9"><input type="text"class="form-control"name="options' + i + '"id="options' + i + '"value="选项"></div><span class="col-sm-1 form-control-static glyphicon glyphicon-remove-circle delOpt"aria-hidden="true"></span></div>'
					}
					optionStr = '<div class="options">' + optionStr + '</div><div class="form-group"><label for="exampleInputFile"class="col-sm-2 control-label"></label><div class="col-sm-10"><a href="#"class="form-control-static text-primary newOpt">新建选项</a></div></div>'
					break;
				case 'checkbox':
					result += "多选题"
					for (var i = 0; i < optionInitNum; i++) {
						optionStr += '<div class="form-group"><label for="options' + i + '"class="col-sm-2 control-label"><span class="glyphicon glyphicon-unchecked"aria-hidden="true"></span></label><div class="col-sm-9"><input type="text"class="form-control"name="options' + i + '"id="options' + i + '"value="选项"></div><span class="col-sm-1 form-control-static glyphicon glyphicon-remove-circle delOpt"aria-hidden="true"></span></div>'
					}
					optionStr = '<div class="options">' + optionStr + '</div><div class="form-group"><label for="exampleInputFile"class="col-sm-2 control-label"></label><div class="col-sm-10"><a href="#"class="form-control-static text-primary newOpt">新建选项</a></div></div>'
					break;
				case 'sLine':
					result += "单行文本题"
					break;
				case 'mLine':
					result += "问答题"
					break;
				default:
					
			}

			result += '</p><input type="hidden"class="form-control"name="type"id="type"value="' + type + '"></div></div>' + optionStr + '<div class="form-group text-center"><a href="#"class="btn btn-primary save">保存</a><a href="#"class="btn btn-default cancel">取消</a></div>'
			quesList.append(result)
			flag = false
		}
	})

	//新建选项
	$('.quesList').on('click', '.newOpt', function(event) {
		var newOptQues = $(this).parent().parent().parent()
		var options = newOptQues.find('.options')

		var result = '<div class="form-group"><label for="options' + optionInitNum + '"class="col-sm-2 control-label"><span class="glyphicon glyphicon-unchecked"aria-hidden="true"></span></label><div class="col-sm-9"><input type="text"class="form-control"name="options' + optionInitNum + '"id="options' + optionInitNum + '"value="选项"></div><span class="col-sm-1 form-control-static glyphicon glyphicon-remove-circle delOpt"aria-hidden="true"></span></div>'
		optionInitNum++
		options.append(result)
		event.preventDefault();
	})

	//删除选项
	$('.quesList').on('click', '.delOpt', function(event) {
		var option = $(this).parent()
		optionInitNum--
		option.remove()
	})

	//保存题目
	$('.quesList').on('click', '.save', function(event) {
		var ques = $(this).parent().parent()
		quesNum = quesList.children('.eidtQues').length
		var input = ques.find('input')
		var title = $(input[0]).val()
		var num = $(input[0]).data('id')		//获取题号
		var number = (num<0) ? quesNum : num 	//判断该题是新增的还是已存在
		var describe = $(input[1]).val()
		var type = $(input[2]).val()
		var optionStr = ""
		var inputLen = input.length
		var result = '<h3>' + (number+1) + '、' + title + ' <i>*</i><input type="hidden" name="questions[' + number + '][quetitle]" data-id="' + number + '" value="' + title +'"></h3><h4>' + describe + '<input type="hidden" name="questions[' + number + '][describe]" value="' + describe +'"></h4><input type="hidden" name="questions[' + number + '][quetype]" value="'+ type + '">'
		
		switch(type){
			case 'radio':
				for (var i = 3; i < inputLen; i++) {
					var option = $(input[i]).val()
					result += '<p><span class="glyphicon glyphicon-record"aria-hidden="true"></span>' + option + '</p>'
					if (i < inputLen - 1) optionStr += option + "-"
						else optionStr += option
				}
				break;
			case 'checkbox':
				for (var i = 3; i < inputLen; i++) {
					var option = $(input[i]).val()
					result += '<p><span class="glyphicon glyphicon-unchecked"aria-hidden="true"></span>' + option + '</p>'
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

		result += '<input type="hidden" name="questions[' + number + '][options]" value="' + optionStr + '">'
		
		optionInitNum = 2

		ques.addClass("eidtQues").empty().append(result)
		event.preventDefault()

		flag = true 	//保存当前题目后允许插入下一个题
		
	})

	//修改题目
	$('.quesList').on('click', '.eidtQues', function(event) {
		if (flag) {
			var ques = $(this)
			var inputs = ques.find('input')
			var quetitle = $(inputs[0]).val()
			var num = $(inputs[0]).data('id')	//获取题号
			var describe = $(inputs[1]).val()
			var type = $(inputs[2]).val()
			var options = $(inputs[3]).val().split('-')
			var optionNum = options.length
			optionInitNum = optionNum
			var optionStr = ""

			var result = '<div class="form-group"><label for="quetitle"class="col-sm-2 control-label">题目</label><div class="col-sm-10"><input type="text"class="form-control"name="quetitle"id="quetitle"data-id="' + num + '"value="' + quetitle + '"></div></div><div class="form-group"><label for="describe"class="col-sm-2 control-label">题目描述</label><div class="col-sm-10"><input type="text"class="form-control"name="describe"id="describe"value="' + describe + '"></div></div><div class="form-group"><label for="type"class="col-sm-2 control-label">题型</label><div class="col-sm-10"><p class="form-control-static text-primary">'
			
			switch(type){
				case 'radio':
					result += "单选题"
					for (var i = 0; i < optionNum; i++) {
						optionStr += '<div class="form-group"><label for="options' + i + '"class="col-sm-2 control-label"><span class="glyphicon glyphicon-unchecked"aria-hidden="true"></span></label><div class="col-sm-9"><input type="text"class="form-control"name="options' + i + '"id="options' + i + '"value="' + options[i] + '"></div><span class="col-sm-1 form-control-static glyphicon glyphicon-remove-circle delOpt"aria-hidden="true"></span></div>'
					}
					optionStr = '<div class="options">' + optionStr + '</div><div class="form-group"><label for="exampleInputFile"class="col-sm-2 control-label"></label><div class="col-sm-10"><a href="#"class="form-control-static text-primary newOpt">新建选项</a></div></div>'
					break;
				case 'checkbox':
					result += "多选题"
					for (var i = 0; i < optionNum; i++) {
						optionStr += '<div class="form-group"><label for="options' + i + '"class="col-sm-2 control-label"><span class="glyphicon glyphicon-unchecked"aria-hidden="true"></span></label><div class="col-sm-9"><input type="text"class="form-control"name="options' + i + '"id="options' + i + '"value="' + options[i] + '"></div><span class="col-sm-1 form-control-static glyphicon glyphicon-remove-circle delOpt"aria-hidden="true"></span></div>'
					}
					optionStr = '<div class="options">' + optionStr + '</div><div class="form-group"><label for="exampleInputFile"class="col-sm-2 control-label"></label><div class="col-sm-10"><a href="#"class="form-control-static text-primary newOpt">新建选项</a></div></div>'
					break;
				case 'sLine':
					result += "单行文本题"
					break;
				case 'mLine':
					result += "问答题"
					break;
				default:
					
			}
			result += '</p><input type="hidden"class="form-control"name="type"id="type"value="' + type + '"></div></div>' + optionStr + '<div class="form-group text-center"><a href="#"class="btn btn-primary save">保存</a><a href="#"class="btn btn-default cancel">取消</a></div>'
			
			ques.removeClass("eidtQues").empty().append(result)

			flag = false
		}
	})

	//取消编辑题目
	$('.quesList').on('click', '.cancel', function(event) {

		var ques = $(this).parent().parent()
		var title = $(ques.find('input')[0]).val()

		if(title){
			//有题目就保存
			ques.find('.save').click()
		} else {
			//没有题目就删除
			ques.remove()
			quesNum--
			optionInitNum = 2
			flag = true
		}
		
		event.preventDefault()
	})

})