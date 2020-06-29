$(function(){
	$('input[name=starttime]').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        forceParse: false,
		minView: "month",
        pickerPosition: 'bottom-right',
        format: 'yyyy-mm-dd'
    });
	$('input[name=endtime]').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        forceParse: false,
		minView: "month",
        pickerPosition: 'bottom-right',
        format: 'yyyy-mm-dd'
    });

	//$('#datetimepicker').datetimepicker();
	
	$("#search-form select[name=field]").change(function (event) {
		if ($(this).val() == "grade") {
			$("#search-form input[name=value]").hide();
			$("#search-form select[name=grade]").show();
		} else {
			$("#search-form input[name=value]").show();
			$("#search-form select[name=grade]").hide();
		}
	});
//添加学生弹框
	$("#btn-user-add").on('click',function(event){

		var el = $("#window-user-create1");
		$(el).find(":text").each(function(){
			$(this).val('');
		})
		$("#window-user :password").each(function(){
			$(this).val('');
		})
		$("#window-user select").each(function(){
			$(this).val(0);
		})
	})

    $("#window-user-create1 .btn-primary").click(function(event){
		var el = $("#window-user-create1");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'mobile' : $(el).find("textarea[name=mobile]").val(),
			'password' : $(el).find("input[name=password]").val(),
            'gender' : $(el).find("select[name=gender]").val()
		};
        
		if (!params.name || 
			 !params.mobile) {
			layer.msg('信息不能为空');
			return;
		}
		$.post('/user/main/studentCreate', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (!data.error) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('创建失败!');
				$(el).find('.error').html(data.error);
			}
		})	
	})
//添加老师弹窗
    $("#btn-user-add2").on('click',function(event){
		
		var el = $("#window-user-create2");
		$(el).find(":text").each(function(){
			$(this).val('');
		})
		$("#window-user :password").each(function(){
			$(this).val('');
		})
		$("#window-user select").each(function(){
			$(this).val(0);
		})
	})
    //单个添加老师
	$("#window-user-create2 .btn-primary").click(function(event){
		var el = $("#window-user-create2");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'email' : $(el).find("input[name=email]").val(),
			'mobile' : $(el).find("textarea[name=mobile]").val(),
			//'role' : $(el).find("input[name=role]:checked").val(),
            'teachername' : $(el).find("input[name=teachername]").val(),
            'gender' : $(el).find("select[name=gender]").val(),
            'org_name' : $(el).find("input[name=org_id]").val(),
			'type' : $(el).find("input[name=teacherType]").val(),
		};
		if ($(el).find("input[name=teacherType]").val()=='2') {
			params.teacher = 1;
		}
		
		if (!params.name || 
			 !params.mobile) {
			layer.msg('信息不能为空');
			return;
		}
		
		$.post('/user/main/teacherCreate', params).done(function(data){
			data =jQuery.parseJSON(data);
			if (!data.error) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('添加失败!');
				$(el).find('.error').html(data.error);
				//$(el).find('.alert').show();
			}
		})	
	})
	
	
    //修改 教师弹窗
	$("#table-user2 .action-edit").click(function(event){
        
		var uid = $(this).parent().siblings("input[name=uid]").val();
		$.get('/user/main/getteacherInfo', {uid: uid}).done(function(data){
			data =jQuery.parseJSON(data); 
			var el = $("#window-user-update2");
            
			if (data.code == 0 && data.result) {
				data = data.result;
				$(el).find("input[name=name]").val(data.name)
				$(el).find("input[name=mobile]").val(data.mobile)
				var gender = '';
				var status = '';
				if(data.gender == 1){
					gender = 'male';
				}else{
					gender = 'female';
				}
				if(data.status == 1){
					status = 'normal'; 
				}else{
					status = 'disabled';
				}
				$(el).find("select[name=gender]").val(gender)
				$(el).find("select[name=status]").val(status)
				if(data.platform_status){
					$(el).find("select[name=show]").val(data.platform_status)
				}else{
					$(el).find("select[name=show]").val(1);
				}
				var tr='';var d;
				$.each(data.org_name,function(k,v){
					if(v.name !=''){
						tr +="<option value='"+v.pk_org+"'>"+v.name+"</option>";
					}else if( v.subname != null && v.subname != ''){
						tr +="<option value='"+v.pk_org+"'>"+v.subname+"</option>";
					}
				});
                var m='';//var n;
				$.each(data.org_myself,function(k,v){
					if(v.org_name != ''){
						m +="<option value='"+v.pk_org+"'>"+v.org_name+"</option>";
					}else if( v.org_subname != null && v.org_subname !='' ){
						m +="<option value='"+v.pk_org+"'>"+v.org_subname+"</option>";
					}	
				});
				$(el).find("select[name=selectL]").html(tr);
				$(el).find("select[name=selectR]").html(m);
                var leftSel = $("#selectL");
				var rightSel = $("#selectR");
				$("#toright").bind("click",function(){		
					leftSel.find("option:selected").each(function(){
						$(this).remove().appendTo(rightSel);
					});
				});
				$("#toleft").bind("click",function(){		
					rightSel.find("option:selected").each(function(){
						$(this).remove().appendTo(leftSel);
					});
				});
				leftSel.dblclick(function(){
					$(this).find("option:selected").each(function(){
						$(this).remove().appendTo(rightSel);
					});
				});
				rightSel.dblclick(function(){
					$(this).find("option:selected").each(function(){
						$(this).remove().appendTo(leftSel);
					});
				});
				$(el).find("input[name=uid]").val(data.pk_user)
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
	});
	
    //修改老师信息提交
	$("#window-user-update2 .btn-primary").click(function(event){
		var el = $("#window-user-update2");
		var params = {
			'uid': $(el).find("input[name=uid]").val(),
			'name' : $(el).find("input[name=name]").val(),
			'student_name' : $(el).find("input[name=student_name]").val(),
			'email' : $(el).find("input[name=email]").val(),
			'mobile' : $(el).find("input[name=mobile]").val(),
			'org_name' : $(el).find("select[name=selectR]").val(),
			'gender' : $(el).find("select[name=gender]").val(),
			'show' : $(el).find("select[name=show]").val(),
			'status' : $(el).find("select[name=status]").val(),
			'birthday' : $(el).find("input[name=birthday]").val(),
			
		};
		if (!params.name) {
			layer.msg('用户名不能为空');
			return;
		}
        if (!params.mobile) {
			layer.msg('手机号不能为空');
			return;
		}
		if ($(el).find("input[name=student]").val()==1) {
			params.student = 1;
		}
		if ($(el).find("input[name=teacher]").val()==1) {
			params.teacher = 1;
		}
		if ($(el).find("input[name=organization]").val()==1) {
			params.organization= 1;
		}
        var rightSel = $("#selectR");
        var selVal = [];
		rightSel.find("option").each(function(){
			selVal.push(this.value);
		});
		selVals = selVal.join(",");
        params.org_name=selVals;
        //alert(selVals)
		if(selVals==""){
			layer.msg("请选择机构！");
            return;
		}
        
		$.post('/user/main/updateteacherInfo', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').removeClass('hide');
			}
		})	
	});
    //修改学生信息
    $("#window-user-update1 .btn-primary").click(function(event){
		var el = $("#window-user-update1");
		var params = {
			'uid': $(el).find("input[name=uid]").val(),
		//	'name' : $(el).find("input[name=name]").val(),
			'real_name' : $(el).find("input[name=real_name]").val(),
			'mobile' : $(el).find("input[name=mobile]").val(),
			'gender' : $(el).find("select[name=gender]").val(),
			'status' : $(el).find("select[name=status]").val(),		
		};
		/*if (!params.name) {
			layer.msg('用户名不能为空');
			return;
		}*/
        if (!params.mobile) {
			layer.msg('手机号不能为空');
			return;
		}
		$.post('/user/main/updatestudentInfo', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.result && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').removeClass('hide');
			}
		})	
	});
	
    $("#table-user .action-edit").click(function(event){
        
		var uid = $(this).parents('td').find("input[name=uid]").val();
		$.get('/user/main/getstudentInfo', {uid: uid}).done(function(data){
			data =jQuery.parseJSON(data); 
			var el = $("#window-user-update1");
			if (data.code == 0 && data.result) {
				data = data.result;
				$(el).find("input[name=name]").val(data.name)
                $(el).find("input[name=real_name]").val(data.real_name)
				$(el).find("input[name=mobile]").val(data.mobile)
				var gender = '';
				var status = '';
				if(data.gender == 1){
					gender = 'male';
				}else{
					gender = 'female';
				}
				if(data.status == 1){
					status = 'normal'; 
				}else{
					status = 'disabled';
				}
				$(el).find("select[name=gender]").val(gender);
				$(el).find("select[name=status]").val(status);
				$(el).find("input[name=uid]").val(data.pk_user);
				$(el).find(".student_number").text(data.pk_user);
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
	});

});
