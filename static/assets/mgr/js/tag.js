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
//添加tag
	$("#btn-user-add").on('click',function(event){
		var el = $("#window-user-create");
		$(el).find(":text").each(function(){
			$(this).val('');
		})
		$("#window-user :password").each(function(){
			$(this).val('');
		})
		$("#window-user select").each(function(){
			$(this).val(0);
		})
		$('#window-user-create').modal('show');
	})

	
    $("#window-user-create .btn-primary").click(function(event){
		var el = $("#window-user-create");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'desc' : $(el).find("textarea[name=desc]").val(),
		};
        
		if (!params.name) {
			layer.msg('信息不能为空');
			return;
		}
		
		$.post('/tag/tag/addTag', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('创建失败!');
				$(el).find('.alert p').html('code:'+data.code+' msg:' + data.errMsg);
				$(el).find('.alert').show();
			}
		})	
	})

	//添加group
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
		$('#window-user-create1').modal('show');
	})
	$("#window-user-create1 .btn-primary").click(function(event){
		var el = $("#window-user-create1");
		var params = {
			'name' : $(el).find("input[name=group_name]").val(),
			'desc' : $(el).find("textarea[name=desc]").val(),
			'tag_name' : $(el).find("textarea[name=tag_name]").val(),
		};
        
		if (!params.name) {
			layer.msg('名称不能为空');
			return;
		}
		
		$.post('/tag/tag/addGroup', params).done(function(data){
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
	})
	//删除group
	$("#table-user .group-del").on('click',function(event){
		var group_id = $(this).next().val();
       	if(confirm('确认删除吗')){
            $.post('/tag/tag/delGroupId', {group_id: group_id}).done(function(data){
				data =jQuery.parseJSON(data);
                if (data.code == 0) {
                    window.location.reload();   
                } else {
                    layer.msg(data.errMsg);    
                }
            });
        }
        
	});
    
	
	//修改获取group信息
    $("#table-user .action-edit").click(function(event){
		var group_id = $(this).next().next().val();
		$.get('/tag/tag/getgroupInfo', {group_id: group_id}).done(function(data){
			data =jQuery.parseJSON(data);
			var el = $("#window-user-update1");
			if (data && data.code == 0) {
				data = data.result;
				$(el).find("input[name=group_name]").val(data.name)
				$(el).find("textarea[name=desc]").val(data.desc)
                $(el).find("textarea[name=tag_name]").val(data.tag_name)
				$(el).find("input[name=uid]").val(data.pk_group)
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
	});
	//修改提交group信息
    $("#window-user-update1 .btn-primary").click(function(event){
		var el = $("#window-user-update1");
		var params = {
            'group_id' : $(el).find("input[name=uid]").val(),
			'group_name' : $(el).find("input[name=group_name]").val(),
			'desc' : $(el).find("textarea[name=desc]").val(),
			'tag_name' : $(el).find("textarea[name=tag_name]").val(),
		};
		$.post('/tag/tag/updategroupInfo', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.errMsg);
				$(el).find('.alert').show();
			}
		})	
	});
    
	
	

});
