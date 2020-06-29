$(function(){
	$('#window-role-create select[name=type]').change(function(){
		var type = $(this).val();
		var type_con = ''
		if( type == 1 ){
			type_con = 'web';
			$('#img_size').text('请上传1920 x 360像素的图片');
		}else if(type == 2){
			type_con = 'mobile';
			$('#img_size').text('请上传640 x 194像素的图片');
		}else if(type == 3){
			type_con = 'pad';
			$('#img_size').text('请上传960 x 290像素的图片');
		}
		if(type != 0){
			$(this).parents('.img-type').hide();
			$('#add_type_span').text(type_con);
			$('#add_type_div').show();
			$('#add_img').show();
			var banner = new plupload.Uploader({
				browse_button: 'banner',
				url: '/platform.banner.uploadBanner/'+type,
				filters: {
	    			mime_types : [
		    				{ title : "Image files", extensions : "jpg,gif,png" }
			    		],
				    	max_file_size:"1000kb"
				},multi_selection:false
			});
			banner.init();
			banner.bind('FilesAdded', function(up, files) {
				banner.start();
			});

			banner.bind('UploadProgress', function(up, file) {
				$("#banner").val("上传中："+ file.percent +"%");
			});

			banner.bind('FileUploaded', function(up, file,info) {
				$("#banner").val("重新选择");

				if(info.response){
					var r = jQuery.parseJSON(info.response);
					if(r.error){
						layer.msg(r.error);
					}else{
						$('#b_img').attr('src',r.src+"?"+Math.random());
						$('#aurl').val(r.pic);
					}
				}
			});
		}else{
			$('#add_img').hide();
		}		
	});

	$("#btn-role-add").click(function(){
		var el = $("#window-role-create");
		$(el).modal('show');
		$(el).find('.img-type').show();
		$(el).find('#add_img').hide();
		$(el).find('#add_type_div').hide();
		$(el).find("select").each(function(){
			$(this).val(0);
		})
	})

	$("#window-role-create .btn-primary").click(function(event){
		var el = $("#window-role-create");
		var params = {
			'title' : $(el).find("input[name=title]").val(),
			'url' : $(el).find("#aurl").val(),
			'link' : $(el).find("input[name=link]").val(),
			'type' : $(el).find("select[name=type]").val(),
			'status' : $(el).find("select[name=status]").val(),
			'order_no' : $(el).find("input[name=order_no]").val(),
		};
		if (params.type == 0) {
			layer.msg('请选择展示类型');
			return;
		}
		if (!params.url) {
			layer.msg('请上传图片');
			return;
		}
		if(params.type == 1){
			
		}
		$.post('/platform.banner.addBanner', params).done(function(data){
			data =jQuery.parseJSON(data); 
			if (data && data.code == 0) {
				$(el).modal('hide');
				window.location.reload();
			} else {
				layer.msg(data.msg);
				return false;
				$(el).find('.alert h4').html('创建失败!');
				$(el).find('.alert p').html('code:'+data.code+' msg:' + data.msg);
				$(el).find('.alert').show();
			}
		})	
	})

	$("#table-role .role-edit").click(function(event){
		var bid = $(this).parent().siblings("input[name=bid]").val();
		$.post('/platform.banner.getBanner', {bid: bid}).done(function(data){
			data = jQuery.parseJSON(data);
			var el = $("#window-role-update");
			if (data && data.data) {
				data = data.data;
				$(el).find("input[name=title]").val(data.title)
				$(el).find("#eb_img").attr('src',data.pic)
				$(el).find("#eurl").val(data.url)
				$(el).find("input[name=link]").val(data.link)
				$(el).find("#edit_type_span").text(data.type)
				$(el).find("#edit_img_size").text(data.img_size)
				$(el).find("select[name=status]").val(data.status)
				$(el).find("input[name=order_no]").val(data.order_no)
				$(el).find("input[name=bid]").val(data.pk_banner)
				var type = '';
				if(data.type == 'web'){
					type = 1;
				}else if(data.type == 'mobile'){
					type = 2;
				}else if(data.type == 'pad'){
					type = 3;
				}
				var ebanner = new plupload.Uploader({
								  browse_button: 'ebanner',
								  url: '/platform.banner.uploadBanner/'+type,
								  filters: {
									  mime_types : [
											  { title : "Image files", extensions : "jpg,gif,png" }
										  ],
										  max_file_size:"1000kb"
								  },multi_selection:false
							  });
				ebanner.init();
				ebanner.bind('FilesAdded', function(up, files) {
					ebanner.start();
				});

				ebanner.bind('UploadProgress', function(up, file) {
					$("#ebanner").val("上传中："+ file.percent +"%");
				});
				
				ebanner.bind('FileUploaded', function(up, file,info) {
					$("#ebanner").val("重新选择");
					if(info.response){
						var r = jQuery.parseJSON(info.response);
						if(r.error){
							layer.msg(r.error);
						}else{
							$('#eb_img').attr('src',r.src+"?"+Math.random());
							$('#eurl').val(r.pic);
						}
					 }
				});
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})
	});

	$("#window-role-update .btn-primary").click(function(event){
		var el = $("#window-role-update");
		var params = {
			'bid': $(el).find("input[name=bid]").val(),
			'title' : $(el).find("input[name=title]").val(),
			'url' : $(el).find("#eurl").val(),
			'link':	$(el).find("input[name=link]").val(),
			'status' : $(el).find("select[name=status]").val(),
			'order_no':	$(el).find("input[name=order_no]").val(),
			'type':	$(el).find("#edit_type_span").text(),
		};
		$.post('/platform.banner.updateBanner', params).done(function(data){
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

	$("#table-role .role-del").click(function(event){
		var bid = $(this).parent().siblings("input[name=bid]").val();
		if(confirm('确认删除吗')){
			$.post('/platform.banner.delBanner', {bid: bid}).done(function(data){
				data =jQuery.parseJSON(data); 
				if (data && data.code == 0) {
					window.location.reload();	
				} else {
					layer.msg('删除失败');	
				}
			});
		}
	});








});
