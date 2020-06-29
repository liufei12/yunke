$(function(){


	$("#table-role .role-show").click(function(event){
		var sid = $(this).parent().siblings("input[name=sid]").val();
		$.post('/utility.school.GetSchoolInfo', {sid: sid}).done(function(data){
			data = jQuery.parseJSON(data);
			var el = $("#window-role-show");
			if (data && data.data) {
				data = data.data;
				
				$(el).find("#label-1").val(data.school_name);
				$(el).find("#label-2").val(data.addr);
				$(el).find("#label-3").val(data.phone);
				$(el).find("#label-4").val(sid);
				if (data.province.pk_region){
					$(el).find("#school-province-edit").val(data.province.pk_region);
					addGetArea('school-city-edit', data.province.pk_region, 2, data.city.pk_region);
					addGetArea('school-region-edit', data.city.pk_region, 2, data.fk_region);
				}else{
					$(el).find("#school-province-edit").val(data.city.pk_region);					
					addGetArea('school-city-edit', data.city.pk_region, 2,data.fk_region);

				}				

				$(el).find("#school_type").val(data.school_type);
				
				var tr;var d;
				/*$.each(data.site,function(k,v){
					var p= $(this).val();
					if(data.province==p){
					d="selected";
					}
					tr +="<option value='"+v.region_id+"'>"+v.name+"</option>";
				});
				$(el).find("#label-10").html(tr)
				*/
				$(el).find("input[name=sid]").val(data.pk_school);
				if(data.status==1){
				$(el).find("#label-4").attr("checked","checked")
				}else{
				$(el).find("#label-5").attr("checked","checked")
				}
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
		
	});


	//修改提交学校详细信息
	$("#window-role-show .btn-primary").click(function(event){
		var el = $("#window-role-show");
		var params = {
			'sid': $(el).find("input[name=sid]").val(),
			'schoolname' : $(el).find("#label-1").val(),
			'addr' : $(el).find("#label-2").val(),
			'phone' : $(el).find("#label-3").val(),
			'province' : $(el).find("#school-province-edit").val(),
			'city' : $(el).find("#school-city-edit").val(),
			'region' : $(el).find("#school-region-edit").val(),
			'school_type' : $(el).find("#school_type").val()
		};
		$.post('/utility.school.updateschoolInfo', params).done(function(data){
			data =jQuery.parseJSON(data);
			if (data && data.result.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				$(el).find('.alert h4').html('更新失败');
				$(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
				$(el).find('.alert').show();
			}
		})	
	});
	
	$("#btn-school-add").on('click',function(event){
		var el = $("#window-school-create");
		$(el).find(":text").each(function(){
			$(this).val('');
		})
		$("#wimdow-add-school input").each(function(){
			$(this).val('');
		})
		$("#wimdow-add-school select").each(function(){
			$(this).val('');
		})
		$('#window-school-create').modal('show');
	});
	
	$("#window-school-create .btn-primary").click(function(event){
		var el = $("#window-school-create");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'phone' : $(el).find("input[name=phone]").val(),
			'address' : $(el).find("input[name=address]").val(),
            'province' : $(el).find("select[name=province]").val(),
			'city' : $(el).find("select[name=city]").val(),
			'region' : $(el).find("select[name=region]").val(),
			'school_type' : $(el).find("select[name=school_type]").val(),
		};
        if (!params.province) {
			layer.msg('请选择省份！');
			return;
		}
		if (!params.city) {
			layer.msg('请选择城市');
			return;
		}
		if (!params.school_type) {
			layer.msg('请选择阶段');
			return;
		}
		if (!params.name){
			layer.msg('学校名称不能为空！');
			return;
		}
		$.post('/utility/school/addSchool', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				layer.msg(data.msg);
			}
		})	
	})

});
