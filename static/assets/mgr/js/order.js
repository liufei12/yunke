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
	$(".editCheck").click(function(event){
		var withdrawid = $(this).attr("withdraw_id");
		var withdraw = $(this).attr("withdraw");
		var coursetitle = $(this).attr("coursetitle");
		var oid = $(this).attr("oid");
		var user = $(this).attr("user_create");
		var el = $("#window-check-update");
		$("#check-update-courseid").val(withdrawid);
		$("#check-update-withdraw").val(withdraw);
		$("#check-update-oid").val(oid);
		$("#check-update-user").val(user);
		$(el).modal('show');
		
	});


	$(".editDel").click(function(event){
		var el = $("#window-del-update");

		var withdrawid = $(this).attr("withdraw_id");
		var withdraw = $(this).attr("withdraw");
		var coursetitle = $(this).attr("coursetitle");
		var oid = $(this).attr("oid");

		$("#check-del-courseid").val(withdrawid);
		$("#check-del-withdraw").val(withdraw);
		$("#check-del-oid").val(oid);

		$(el).modal('show');
		
	});

	$("#check-update-btn").click(function(event){
		var el = $("#window-course-update");
		var status = $("#check-update-select").val();
		var wid = $("#check-update-courseid").val();
		var oid = $("#check-update-oid").val();
		var user = $("#check-update-user").val();
		var params = {
			'wid': wid,
			'status': status,
			'user_create':user,
			'oid':oid,
		};
		$.post('/course/order/setATMStatusAjax', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				layer.msg(data.error);
			}
		})	
	});
	

});
