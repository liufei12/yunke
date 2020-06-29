$(function(){
	$("#btn-member-add").click(function(event){
		var el = $("#window-member-create");
		$(el).find(":text").each(function(){
			$(this).val('');
		})
		$(el).find(":password").each(function(){
			$(this).val('');
		})
		$(el).find("select").each(function(){
			$(this).val('');
		})
		$(el).modal('show');
		$('.last').hide();
	});
	$("#window-member-create .btn-primary").click(function(event){
		var el = $("#window-member-create");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'real_name' : $(el).find("input[name=real_name]").val(),
			'mobile' : $(el).find("input[name=mobile]").val(),
			'qudao_id' : $(el).find("input[name=qudao_id]").val(),
			'password' : $(el).find("input[name=password]").val(),
			'role_id' : $(el).find("select[name=role_id]").val(),
			'status' : $(el).find("input[name=status]").val(),
		};
		if (!params.name ) {
			layer.msg('请输入登录名');
			return;
		}
		if ( !params.password ) {
			layer.msg('请输入密码');
			return;
		}
		if ( !params.qudao_id ) {
			layer.msg('请选择渠道');
			return;
		}
		if ( !params.role_id) {
			layer.msg('请选择角色');
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
		if( params.mobile.length >0  ){
			var reg = /^1[34578][0-9]{9}$/;
			if(!reg.test(params.mobile) ){
				layer.msg('请输入正确的手机号');
				return;
			}
		}
		$.post('/qudao/main/addQudaoUser', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				layer.msg(data.msg);
			}
		})	
	});
	$("#table-member .member-edit").click(function(event){
		$('.last').hide();
		var userId = $(this).parent().siblings("input[name=userId]").val();
		$.get('/qudao/main/getQudaoUserById', {userId: userId}).done(function(data){
			data =jQuery.parseJSON(data); 
			var el = $("#window-member-update");
			if (data && data.result) {
				data = data.result;
				$(el).find("input[name=name]").val(data.name)
				$(el).find("input[name=mobile]").val(data.mobile)
				$(el).find("input[name=real_name]").val(data.real_name)
				$(el).find("input[name=qudao]").val(data.qudao_name)
				$(el).find("input[name=qudao_id]").val(data.qudao_id)
				$(el).find("input[name=password]").val('')
				$(el).find("select[name=role_id]").val(data.role_id)
				$(el).find("select[name=status]").val(data.status)
				$(el).find("input[name=userId]").val(data.user_id)
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})
	});
	$("#window-member-update .btn-primary").click(function(event){
		var el = $("#window-member-update");
		var params = {
			'userId': $(el).find("input[name=userId]").val(),
			'name' : $(el).find("input[name=name]").val(),
			'real_name' : $(el).find("input[name=real_name]").val(),
			'mobile' : $(el).find("input[name=mobile]").val(),
			'qudao_id' : $(el).find("input[name=qudao_id]").val(),
			'password' : $(el).find("input[name=password]").val(),
			'role_id' : $(el).find("select[name=role_id]").val(),
			'status' : $(el).find("select[name=status]").val(),
		};
		if (!params.name ) {
			layer.msg('请输入登录名');
			return;
		}
		if ( !params.qudao_id ) {
			layer.msg('请选择渠道');
			return;
		}
		if ( !params.role_id ) {
			layer.msg('请选择角色');
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
		if( params.mobile.length >0  ){
			var reg = /^1[34578][0-9]{9}$/;
			if(!reg.test(params.mobile) ){
				layer.msg('请输入正确的手机号');
				return;
			}
		}
		$.post('/qudao/main/updateQudaoUser', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				layer.msg(data.msg);
			}
		})	
	});
	$("#table-member .member-del").click(function(event){
		var userId = $(this).parent().siblings("input[name=userId]").val();
		if(confirm('确认删除吗')){
			$.post('/qudao/main/delQudaoUser', {userId: userId}).done(function(data){
				data =jQuery.parseJSON(data); 
				if (data && data.code == 0) {
					layer.msg('删除成功！');
					window.location.reload();	
				} else {
					layer.msg(data.msg);	
				}
			});
		}
		
	});


	//渠道列表	
	$("#btn-member-add-qudao").click(function(event){
		var el = $("#window-member-create-qudao");
		var pId = $('#province-add option:selected') .val();
        var cityId = $('#cityIdll-add').val();       
        if(pId>=1){
          getArea('city-add',pId,2,cityId);
        }else{        
        var html2 = '<option value="">--请选择--</option>';
        $('#city-add').html(html2);    
        }
        $('#province-add').bind("change",function(){
        if($(this).val()>=1) {
          getArea('city-add', $(this).val(), 2, cityId);
        }else{
          var html2 = '<option value="">--请选择--</option>';
          $('#city-add').show().html(html2);      
        }
        });
		$(el).modal('show');  		
	});

	$("#window-member-create-qudao .btn-primary").click(function(event){		
		var el = $("#window-member-create-qudao");
		var params = {
			'qudaoName' : $(el).find("input[name=qudaoName]").val(),
			'province' : $(el).find("select[name=province]").val(),
			'city' : $(el).find("select[name=city]").val(),			
		};
		if (!params.qudaoName || !params.province || !params.city) {
			layer.msg('信息不能为空');
			return;
		}		

		$.post('/qudao/main/addQudao', params).done(function(data){
			data =jQuery.parseJSON(data);			
			if (data && data.code == 0) {				
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('创建失败!');
				$(el).find('.alert p').html('code:'+data.code+' msg:' + data.errMsg);
				$(el).find('.alert').show();
			}
		})	
	});


	$("#table-member-qudao .member-edit").click(function(event){		
		var qudaoId = $(this).parent().siblings("input[name=qudaoId]").val();		
		$.get('/qudao/main/getQudaoById', {qudaoId: qudaoId}).done(function(data){			
			data =jQuery.parseJSON(data);			
			var el = $("#window-member-update-qudao");
			if (data && data.result['items']) {				
				data = data.result['items'];				
				$(el).find("input[name=qudaoName]").val(data['0'].name)
				$(el).find("select[name=province]").val(data['0'].province)
				$(el).find("input[id=cityIdll-edit]").val(data['0'].city)
				$(el).find("input[name=qudaoId]").val(data['0'].pk_qudao)
				var pId = $('#province-edit option:selected') .val();
		      	var cityId = $('#cityIdll-edit').val();       
		        if(pId>=1){
		           getArea('city-edit',pId,2,cityId);
		        }else{        
		        var html2 = '<option value="">--请选择--</option>';
		        $('#city-edit').html(html2);    
		        }
		        $('#province-edit').bind("change",function(){
		        if($(this).val()>=1) {
		          getArea('city-edit', $(this).val(), 2, cityId);
		        }else{
		        var html2 = '<option value="">--请选择--</option>';
		        $('#city-edit').show().html(html2);      
		        }
		        });					
				$(el).modal('show');
			}else{				
				layer.msg('获取失败!');
			}
		})		
	});
	$("#window-member-update-qudao .btn-primary").click(function(event){
		var el = $("#window-member-update-qudao");
		var params = {
			'qudaoId': $(el).find("input[name=qudaoId]").val(),
			'qudaoName': $(el).find("input[name=qudaoName]").val(),
			'province' : $(el).find("select[name=province]").val(),
			'city' : $(el).find("select[name=city]").val(),			
		};
		if (!params.qudaoName || !params.province || !params.city) {
			layer.msg('信息不能为空');
			return;
		}

		$.post('/qudao/main/updateQudao', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.code+' msg:' + data.errMsg);
				$(el).find('.alert').show();
			}
		})	
	});


	$("#table-member-qudao .member-del").click(function(event){
		if(confirm('确认删除吗')){
			var qudaoId = $(this).parent().siblings("input[name=qudaoId]").val();		
			$.post('/qudao/main/deleteQudao', {qudaoId: qudaoId}).done(function(data){
				data =jQuery.parseJSON(data); 
				if (data && data.code == 0) {
					window.location.reload();	
				} else {
					layer.msg('删除失败');	
				}
			});
		}else{
			return false;
		}
		
	});
});
