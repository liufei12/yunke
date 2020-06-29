$(function(){
	$('#window-user-update input[name=birthday]').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        forceParse: false,
		minView: "month",
        pickerPosition: 'top-right',
        format: 'yyyy-mm-dd'
    });
	

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
			'role_name' : $(el).find("input[name=role_name]").val(),
			'role_remark' : $(el).find("textarea[name=role_remark]").val(),
			'role_sort' : $(el).find("input[name=role_sort]").val(),
		};
		if (!params.role_name) {
			layer.msg('角色名称不能为空');
			return;
		}
		$.post('/rbac/main/addRole', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('创建失败!');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').show();
			}
		})	
	})

	$("#table-role .role-edit").click(function(event){
		var rid = $(this).parent().siblings("input[name=rid]").val();
		$.get('/rbac/main/getRole', {rid: rid}).done(function(data){
			data =jQuery.parseJSON(data); 
			var el = $("#window-role-update");
			if (data && data.data) {
				data = data.data;
				$(el).find("input[name=role_name]").val(data.role_name)
				$(el).find("textarea[name=role_remark]").val(data.role_remark)
				$(el).find("input[name=role_sort]").val(data.role_sort)
				$(el).find("input[name=rid]").val(data.pk_role_id)
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
		
	});

	$("#window-role-update .btn-primary").click(function(event){
		var el = $("#window-role-update");
		var params = {
			'rid': $(el).find("input[name=rid]").val(),
			'role_name' : $(el).find("input[name=role_name]").val(),
			'role_remark' : $(el).find("textarea[name=role_remark]").val(),
			'role_sort' : $(el).find("input[name=role_sort]").val(),
		};
		$.post('/rbac/main/updateRole', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').show();
			}
		})	
	});

	$("#table-role .role-del").click(function(event){
		var rid = $(this).parent().siblings("input[name=rid]").val();
		if(confirm('确认删除吗')){
			$.post('/rbac/main/delRole', {rid: rid}).done(function(data){
				data =jQuery.parseJSON(data); 
				if (data && data.result && data.result.code == 0) {
					window.location.reload();	
				} else {
					layer.msg('删除失败');	
				}
			});
		}
		
	});
	
	
	$("#btn-member-add").click(function(event){
		var el = $("#window-member-create");
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
	});
	$("#window-member-create .btn-primary").click(function(event){
		var el = $("#window-member-create");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'password' : $(el).find("input[name=password]").val(),
			'role_id' : $(el).find("select[name=role_id]").val(),
			'status' : $(el).find("input[name=status]").val(),
			'real_name' : $(el).find("input[name=real_name]").val(),
			'mobile' : $(el).find("input[name=mobile]").val()
		};

		if (!params.name || !params.password || !params.role_id || !params.real_name || !params.mobile) {
			layer.msg('信息不能为空');
			return;
		}
		if(params.password.length < 8 || params.password.length >20){
			layer.msg('密码长度为8-20位');
			return;
		}
		var reg = /^[A-Za-z0-9]+$/;
		if(!reg.test(params.password) ){
			layer.msg('密码只能含有数字和字母');
			return;
		}

		$.post('/rbac/main/addMember', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('创建失败!');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').show();
			}
		})	
	});
	$("#table-member .member-edit").click(function(event){
		var mid = $(this).parent().siblings("input[name=mid]").val();
		$.get('/rbac/main/getMember', {mid: mid}).done(function(data){
			data =jQuery.parseJSON(data); 
			var el = $("#window-member-update");
			if (data && data.data) {
				data = data.data;
				$(el).find("input[name=name]").val(data.name)
				$(el).find("input[name=password]").val('')
				$(el).find("select[name=role_id]").val(data.fk_role_id)
				$(el).find("select[name=status]").val(data.status)
				$(el).find("input[name=mid]").val(data.pk_mgr_user)
				$(el).find("input[name=real_name]").val(data.real_name)
				$(el).find("input[name=mobile]").val(data.mobile)
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
		
	});
	$("#window-member-update .btn-primary").click(function(event){
		var el = $("#window-member-update");
		var params = {
			'mid': $(el).find("input[name=mid]").val(),
			'name' : $(el).find("input[name=name]").val(),
			'password' : $(el).find("input[name=password]").val(),
			'role_id' : $(el).find("select[name=role_id]").val(),
			'status' : $(el).find("select[name=status]").val(),
			'real_name' : $(el).find("input[name=real_name]").val(),
			'mobile' : $(el).find("input[name=mobile]").val()
		};

		if (!params.name || !params.role_id || !params.real_name || !params.mobile) {
			layer.msg('信息不能为空');
			return;
		}

		if(params.password){
			if(params.password.length < 8 || params.password.length >20){
				layer.msg('密码长度为8-20位');
				return;
			}
			var reg = /^[A-Za-z0-9]+$/;
			if(!reg.test(params.password) ){
				layer.msg('密码只能含有数字和字母');
				return;
			}
		}
		$.post('/rbac/main/updateMember', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').show();
			}
		})	
	});
	$("#table-member .member-del").click(function(event){
		var mid = $(this).parent().siblings("input[name=mid]").val();
		if(confirm('确认删除吗')){
			$.post('/rbac/main/delMember', {mid: mid}).done(function(data){
				data =jQuery.parseJSON(data); 
				if (data && data.result && data.result.code == 0) {
					window.location.reload();	
				} else {
					layer.msg('删除失败');	
				}
			});
		}
		
	});

	
	$("#btn-node-add").click(function(event){
		var el = $("#window-node-create");
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
	$("#window-node-create .btn-primary").click(function(event){
		var el = $("#window-node-create");
		var params = {
			'node_pid' : $(el).find("input[name=node_pid]").val(),
			'node_level' : $(el).find("select[name=node_level]").val(),
			'node_desc' : $(el).find("select[name=node_desc]").val(),
			'node_title' : $(el).find("input[name=node_title]").val(),
			'node_url' : $(el).find("input[name=node_url]").val(),
			'node_icon' : $(el).find("input[name=node_icon]").val(),
			'node_sort' : $(el).find("input[name=node_sort]").val(),
		};
		if (!params.node_title) {
			layer.msg('标题名称不能为空');
			return;
		}
		$.post('/rbac/main/addNode', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('创建失败!');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').show();
			}
		})	
	});
	$(".navigat_box .node-edit").click(function(event){
		var nid = $(this).parents('.navigat_box').find("input[name=nid]").val();
		$.get('/rbac/main/getNode', {nid: nid}).done(function(data){
			data =jQuery.parseJSON(data); 
			var el = $("#window-node-update");
			if (data && data.data) {
				data = data.data;
				$(el).find("input[name=node_pid]").val(data.node_pid)
				$(el).find("select[name=node_level]").val(data.node_level)
				$(el).find("select[name=node_desc]").val(data.node_desc)
				$(el).find("input[name=node_title]").val(data.node_title)
				$(el).find("input[name=node_url]").val(data.node_url)
				$(el).find("input[name=node_sort]").val(data.node_sort)
				$(el).find("input[name=node_icon]").val(data.node_icon)
				$(el).find("input[name=nid]").val(data.pk_node_id)
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
		
	});
	$("#window-node-update .btn-primary").click(function(event){
		var el = $("#window-node-update");
		var params = {
			'nid': $(el).find("input[name=nid]").val(),
			'node_pid' : $(el).find("input[name=node_pid]").val(),
			'node_level' : $(el).find("select[name=node_level]").val(),
			'node_desc' : $(el).find("select[name=node_desc]").val(),
			'node_title' : $(el).find("input[name=node_title]").val(),
			'node_url' : $(el).find("input[name=node_url]").val(),
			'node_icon' : $(el).find("input[name=node_icon]").val(),
			'node_sort' : $(el).find("input[name=node_sort]").val(),
		};
		$.post('/rbac/main/updateNode', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').show();
			}
		})	
	});
	$(".navigat_box .node-open").click(function(event){
		var nid = $(this).parents('.navigat_box').find("input[name=nid]").val();
		$.post('/rbac/main/nodeOpen', {nid: nid}).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result && data.result.code == 0) {
				layer.msg('启用成功！');
				window.location.reload();	
			} else {
				layer.msg('启用失败');	
			}
		});
		
	});
	$(".navigat_box .node-off").click(function(event){
		var nid = $(this).parents('.navigat_box').find("input[name=nid]").val();
		$.post('/rbac/main/nodeOff', {nid: nid}).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result && data.result.code == 0) {
				layer.msg('禁用成功！');
				window.location.reload();	
			} else {
				layer.msg('禁用失败');	
			}
		});
		
	});
});
