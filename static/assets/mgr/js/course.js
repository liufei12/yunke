$(function(){
	$('#window-course-update input[name=birthday]').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        forceParse: false,
		minView: "month",
        pickerPosition: 'top-right',
        format: 'yyyy-mm-dd'
    });
	
	$("#search-form select[name=field]").change(function (event) {
		if ($(this).val() == "grade") {
			$("#search-form input[name=value]").hide();
			$("#search-form select[name=grade]").show();
		} else {
			$("#search-form input[name=value]").show();
			$("#search-form select[name=grade]").hide();
		}
	});

	$("#btn-course-add").click(function(event){
		var el = $("#window-course-create");
		$(el).find(":text").each(function(){
			$(this).val('');
		})
		$("#window-course :password").each(function(){
			$(this).val('');
		})
		$("#window-course select").each(function(){
			$(this).val(0);
		})
		$('#window-course-create').modal('show');
	})

	$("#window-course-create .btn-primary").click(function(event){
		var el = $("#window-course-create");
		var params = {
			'name' : $(el).find("input[name=name]").val(),
			'email' : $(el).find("input[name=email]").val(),
			'mobile' : $(el).find("input[name=mobile]").val(),
			'password' : $(el).find("input[name=password]").val(),
		};
		if (!params.name || !params.email ||
			 !params.mobile || !params.password) {
			layer.msg('信息不能为空');
			return;
		}
		$.post('/course/main/create', params).done(function(data){
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


	$("#window-course-update .btn-primary").click(function(event){
		var el = $("#window-course-update");
		var params = {
			'course_id': $(el).find("input[name=course_id]").val(),
			'sort': $(el).find("input[name=sort]").val(),
		//	'email' : $(el).find("input[name=email]").val(),
		//	'mobile' : $(el).find("input[name=mobile]").val(),
		//	'gender' : $(el).find("select[name=gender]").val(),
		//	'status' : $(el).find("select[name=status]").val(),
		//	'birthday' : $(el).find("input[name=birthday]").val(),
		//	'student': 0,
		//	'teacher': 0,
		//	'organization': 0,
		};
		$.post('/course/main/setcoursesort', params).done(function(data){
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
	
	$("#table-course .action-edit").click(function(event){
		var course_id = $(this).parent().siblings("input[name=course_id]").val();
		$.get('/course/main/get', {course_id: course_id}).done(function(data){
			data =jQuery.parseJSON(data); 
			var el = $("#window-course-update");
			if (data && data.data) {
				data = data.data;
				$(el).find("input[name=sort]").val(data.sort)
				$(el).find("input[name=course_id]").val(data.course_id)
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})	
		
	});
	
	$("#table-course .action-delete").click(function(event){
		var course_id = $(this).parent().siblings("input[name=course_id]").val();
		$.post('/course/main/delete', {course_id: course_id}).done(function(data){
			if (data == 1) {
				window.location.reload();	
			} else {
				layer.msg('删除失败');	
			}
		});
		
	});

	$(".editCheck .editDel").click(function(){
		return false;
	})
	$(".editAdminStatus").click(function(event){
		var courseid = $(this).attr("courseid");
		var adminstatus = $(this).attr("adminstatus");
		var coursetitle = $(this).attr("coursetitle");
		var el = $("#window-course-adminstatus");
		$("#check-adminstatus-select").val(adminstatus) 
		$("#check-adminstatus-courseid").val(courseid);
		$("#check-course-title").text(coursetitle);
		$(el).modal('show');
		
	});
	$("#check-adminstatus-btn").click(function(event){
		var el = $("#window-course-adminstatus");
		var checkstatus = $("#check-adminstatus-select").val();
		var courseid = $("#check-adminstatus-courseid").val();
		var remark = $("#course-remark").val();
		var params = {
			'courseid': courseid,
			'checkstatus': checkstatus,
			'courseremark': remark
		};

		$.post('/course/main/SetCourseAdminStatus', params).done(function(data){
			data =jQuery.parseJSON(data);
            if (data && data.code == 1) {
                $(el).modal('hide');
                window.location.reload();
            } else {
				layer.msg(data.msg);
            }
		})	
	});
	$(".editCheck").click(function(event){
		var courseid = $(this).attr("courseid");
		var checkstatus = $(this).attr("check_status");
		var coursetitle = $(this).attr("coursetitle");
		console.log("courseid is"+courseid);
		console.log("courseid is"+coursetitle);
		var el = $("#window-check-update");
		$("#check-update-select").val(checkstatus) 
		$("#check-update-courseid").val(courseid);
		$("#check-update-coursetitle").text(coursetitle);
		$(el).modal('show');
		
	});
	$(".editDel").click(function(event){
		var courseid = $(this).attr("courseid");
		var deleted = $(this).attr("deleted");
		var coursetitle = $(this).attr("coursetitle");
		console.log("courseid is"+courseid);
		console.log("deleted is"+deleted);
		console.log("courseid is"+coursetitle);
		var el = $("#window-del-update");
		$("#check-del-select").val(deleted) 
		$("#check-del-courseid").val(courseid);
		$("#check-del-coursetitle").text(coursetitle);
		$(el).modal('show');
		
	});
	$("#check-update-btn").click(function(event){
		var el = $("#window-course-update");
		var checkstatus = $("#check-update-select").val();
		var courseid = $("#check-update-courseid").val();
		console.log("courseid is"+courseid);
		console.log("courseid is"+checkstatus);
		var params = {
			'courseid': courseid,
			'checkstatus': checkstatus,
		};
		$.post('/course/main/setcheckstatusajax', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
			}
		})	
	});
	
	$("#check-del-btn").click(function(event){
		var el = $("#window-del-update");
		var deleted = $("#check-del-select").val();
		var courseid = $("#check-del-courseid").val();
		console.log("courseid is"+courseid);
		console.log("courseid is"+deleted);
		var params = {
			'courseid': courseid,
			'deleted': deleted,
		};
		$.post('/course/main/setdeletedajax', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {

			}
		})	
	});
	

});
