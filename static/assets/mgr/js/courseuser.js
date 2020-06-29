$(function(){
	$('#two-form #search-type').on('change',function(){
        var self = $(this);
        var cId = self.val();
        if(cId==2){
            $('#yonghuid').show();
            $('#shoujihao').hide();
            $('#shoujihao').val('');
        }
        if(cId==0){
            $('#yonghuid').hide();
            $('#shoujihao').hide();

        }
        if(cId==1){
            $('#yonghuid').hide();
            $('#shoujihao').show();
            $('#yonghuid').val('');
        }
    })

	$('#two-form .sure').click(function(){
 		var cl = $('#two-form');
        var params = {
            'course_id': $(cl).find('input[name=course_id]').val(),
            'class_id' : $(cl).find('select[name=class_id]').val(),
            'mobiles'  : $(cl).find('textarea[name=mobiles]').val(),
            'userids'  : $(cl).find('textarea[name=userids]').val(),
  			'oper'     : $(cl).find('input[name=oper]:checked').val(),
  			'type'     : $(cl).find('select[name=search_type]').val(),
		}

		if( !params.course_id ){
        	layer.msg('请填写课程ID！');
            return;
        }
        if( !params.class_id ){
            layer.msg('请选择班级！');
            return;
        }
        if(params.type == 0){
            layer.msg('请选择方式！');
            return;
        }
        if( !params.mobiles && params.search_type==1){
        	layer.msg('请填写学生手机号！');
           	return;
        }
        if( !params.mobiles && params.search_type==2){
        	layer.msg('请填写用户ID！');
           	return;
        }
		if( !params.oper ){
            layer.msg('请选择操作！');
            return;
		}
		$.ajax({
			type: 'post',
		    url:"/course/courseuser/modify",
		    data: params,
		    dataType: 'json',
		    success:function(data){
		    	if(data.result.code == 0){
		        	layer.msg( data.result.msg );
					setTimeout(function () {
						window.location.reload();
					}, 2000);
		        }else{
		 			layer.msg( data.result.msg )
		 		}
            }
         });
     });
});
