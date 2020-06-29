$(function(){

	$("#btn-role-add").click(function(event){
		var el = $("#window-role-create");
		$(el).find(":text").each(function(){
			$(this).val('');
		})
		$(el).find(":password").each(function(){
			$(this).val('');
		})
		$(el).find("select").each(function(){
			$(this).val(0);
		})
		$(el).modal('show');
	})

	$("#window-role-create .btn-primary").click(function(event){
		var el = $("#window-role-create");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'attr_id' : $(el).find("input[name=attr_id]").val(),
			'descript' : $(el).find("input[name=descript]").val(),
			'status' : $(el).find("select[name=status]").val(),
		};
		if (!params.name) {
			layer.msg('请填写名称');
			return;
		}
		if (!params.attr_id) {
			layer.msg('链接错误属性id为空');
			return;
		}
		$.post('/course.attr.addAttrValue', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('创建失败!');
				$(el).find('.alert p').html('code:'+data.code+' msg:' + data.msg);
				$(el).find('.alert').show();
			}
		})	
	})

	$("#table-role .role-edit").click(function(event){
		var avid = $(this).parent().siblings("input[name=avid]").val();
		$.post('/course.attr.getAttrValue', { avid: avid }).done(function(data){
			data = jQuery.parseJSON(data);
			var el = $("#window-role-update");
			if (data && data.data) {
				data = data.data;
				$(el).find("input[name=name]").val(data.name)
				$(el).find("input[name=descript]").val(data.descript)
				$(el).find("select[name=status]").val(data.status)
				$(el).find("input[name=avid]").val(data.pk_attr_value)
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
		
	});

	$("#window-role-update .btn-primary").click(function(event){
		var el = $("#window-role-update");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'descript' : $(el).find("input[name=descript]").val(),
			'status' : $(el).find("select[name=status]").val(),
			'avid': $(el).find("input[name=avid]").val(),
			'attr_id' : $(el).find("input[name=attr_id]").val(),
		};
		if (!params.name) {
			layer.msg('请填写名称');
			return;
		}
		if (!params.attr_id) {
			layer.msg('链接错误属性id为空');
			return;
		}
		$.post('/course.attr.updateAttrValue', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.code+' msg:' + data.msg);
				$(el).find('.alert').show();
			}
		})	
	});

	$("#table-role .role-del").click(function(event){
		var avid = $(this).parent().siblings("input[name=avid]").val();
		if(confirm('确认删除吗')){
			$.post('/course.attr.delAttrValue', { avid: avid }).done(function(data){
				data =jQuery.parseJSON(data); 
				if (data && data.code == 0) {
					window.location.reload();	
				} else {
					layer.msg(data.msg);	
				}
			});
		}
	});

	
});
