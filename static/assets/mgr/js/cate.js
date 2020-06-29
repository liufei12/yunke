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
			'parent_id' : $(el).find("select[name=parent_id]").val(),
			'before_id' : $(el).find("select[name=before_id]").val(),
			'name' : $(el).find("input[name=name]").val(),
			'name_display' : $(el).find("input[name=name_display]").val(),
			'descript' : $(el).find("input[name=descript]").val(),
			'status' : $(el).find("select[name=status]").val(),
		};
		if (!params.name) {
			layer.msg('请填写名称');
			return;
		}
		if (!params.name_display) {
			layer.msg('请填写展示名称');
			return;
		}
		$.post('/course.cate.addCate', params).done(function(data){
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
	
	$("select[name=parent_id]").change(function(event){
		var cateId = $(this).val();
		var cateName = $('option:selected').html();
		if(cateId == 0){
			$.post('/course.cate.getCateByLevel',{ level:1 }).done(function(data){
				data =jQuery.parseJSON(data); 
				var content = '<option value="0">顶级</option>';
				if (data && data.code == 0) {
					var nodeData = data.data;
					if( nodeData ){
						for(i in nodeData){
							content += '<option value="'+nodeData[i].pk_cate+'">&nbsp;&nbsp;&nbsp;'+nodeData[i].name+'</option>';			
						}	
					}
					$('select[name=before_id]').html(content);		
				}else{
					$('select[name=before_id]').html(content);
				}
			})
		}else{
			$.post('/course.cate.getNodeCate',{ cateId:cateId }).done(function(data){
				data =jQuery.parseJSON(data); 
				var content = '<option value="'+cateId+'">'+cateName+'</option>';
				if (data && data.code == 0) {
					var nodeData = data.data;
					if( nodeData ){
						for(i in nodeData){
							var kong = '';
							if(nodeData[i].level == 2 ){
								kong = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
							}else if(nodeData[i].level == 3){
								kong = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
							}
							content += '<option value="'+nodeData[i].pk_cate+'">'+kong+nodeData[i].name+'</option>';			
						}	
					}
					$('select[name=before_id]').html(content);		
				}else{
					$('select[name=before_id]').html(content);
				}
			})	
		}
	});

	$(".role-edit").click(function(event){
		var cateId = $(this).attr('data-cateid');
		var level = $(this).attr('data-level');
		$.post('/course.cate.getCate', { cateId: cateId,level:level }).done(function(data){
			data = jQuery.parseJSON(data);
			var el = $("#window-role-update");
			if (data && data.data) {
				data = data.data;
				$(el).find("input[name=name]").val(data.name)
				$(el).find("input[name=name_display]").val(data.name_display)
				$(el).find("input[name=descript]").val(data.descript)
				$(el).find("select[name=status]").val(data.status)
				$(el).find("input[name=cateId]").val(data.pk_cate)
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
			'name_display' : $(el).find("input[name=name_display]").val(),
			'descript' : $(el).find("input[name=descript]").val(),
			'status' : $(el).find("select[name=status]").val(),
			'cateId': $(el).find("input[name=cateId]").val(),
		};
		if (!params.name) {
			layer.msg('请填写名称');
			return;
		}
		if (!params.name_display) {
			layer.msg('请填写展示名称');
			return;
		}
		$.post('/course.cate.updateCate', params).done(function(data){
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

	$(".role-del").click(function(event){
		var cateId = $(this).attr('data-cateid');
		if(confirm('确认删除吗')){
			$.post('/course.cate.delCate', { cateId: cateId }).done(function(data){
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
