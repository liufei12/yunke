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
	

	$(".editCheck .editDel").click(function(){
		return false;
	})
	$(".editCheck").click(function(event){
		var card_id = $(this).attr("card_id");
		var thisname = $(this).attr("thisname");
		var orgusername = $(this).attr("orgusername");
		var subname = $(this).attr("subname");
		var bank= $(this).attr("bank");
		var card_mobile = $(this).attr("card_mobile");
		var card_no = $(this).attr("card_no");
		var oid = $(this).attr("oid");
		var el = $("#window-check-update");
		$("#card_id").val(card_id);
		$("#thisname").html(thisname);
		$("#orgusername").html(orgusername); 
		$("#subname").html(subname); 
		$("#bank").html(bank); 
		$("#card_no").html(card_no); 
		$("#card_mobile").html(card_mobile); 
		$("#check-update-oid").val(oid);
		$(el).modal('show');
		
	});
	$("#check-update-btn").click(function(event){
		var el = $("#window-course-update");
		var status = $("#check-update-select").val();
		var card_id = $("#card_id").val();
		var oid = $("#check-update-oid").val();
		var params = {
			'card_id': card_id,
			'status': status,
			'oid': oid,
		};
		$.post('/course/order/setCardStatusAjax', params).done(function(data){
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
