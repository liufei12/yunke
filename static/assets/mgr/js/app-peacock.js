$(function(){	

	var banner = new plupload.Uploader({
				browse_button: 'ebanner',
				url: '/platform.banner.UploadAppPeacock/'+1,
				filters: {
	    			mime_types : [
		    				{ title : "Image files", extensions : "jpg,gif,png" }
			    		],
				    	max_file_size:"5000kb"
				},multi_selection:false
			});
			banner.init();
			banner.bind('FilesAdded', function(up, files) {
				banner.start();
			});

			banner.bind('UploadProgress', function(up, file) {
				$("#ebanner").val("上传中："+ file.percent +"%");
			});

			banner.bind('FileUploaded', function(up, file,info) {
				$("#ebanner").val("重新选择");

				if(info.response){
					var r = jQuery.parseJSON(info.response);
					if(r.error){
						layer.msg(r.error);
					}else{
						$('#b_img').attr('src',r.src+"?"+Math.random());
						$('#mobile').val(r.pic);
					}
				}
			});


	var banner2 = new plupload.Uploader({
				browse_button: 'ebanner2',
				url: '/platform.banner.UploadAppPeacock/'+2,
				filters: {
	    			mime_types : [
		    				{ title : "Image files", extensions : "jpg,gif,png" }
			    		],
				    	max_file_size:"5000kb"
				},multi_selection:false
			});
			banner2.init();
			banner2.bind('FilesAdded', function(up, files) {
				banner2.start();
			});

			banner2.bind('UploadProgress', function(up, file) {
				$("#ebanner2").val("上传中："+ file.percent +"%");
			});

			banner2.bind('FileUploaded', function(up, file,info) {
				$("#ebanner2").val("重新选择");

				if(info.response){
					var r = jQuery.parseJSON(info.response);
					if(r.error){
						layer.msg(r.error);
					}else{
						$('#b_img2').attr('src',r.src+"?"+Math.random());
						$('#pad').val(r.pic);
					}
				}
			});
			
	
	

	$(".span12 #add").click(function(event){
		var myForm = document.forms.statusForm;		
		var i;
		var status2;
		for(i=0;i<myForm.status.length; i++) {
		  if(myForm.status[i].checked) {
		   status2 = myForm.status[i].value;
		  }
		}

		var el = $(".span12");
		var padImgId = $(el).find("#padImgId").val();
		var mobileImgId = $(el).find("#mobileImgId").val();

		if (!padImgId && !mobileImgId){//添加
			var params = {
			'orgId' : $(el).find("select[name=orglist]").val(),			
			'mobile_url' : $(el).find("#mobile").val(),
			'pad_url' : $(el).find("#pad").val(),
			'link' : $(el).find("input[name=link]").val(),			
			'status' : status2,			
			};		
			if (!params.mobile_url || !params.pad_url){
				layer.msg('请上传手机、pad两张图片');
			}	
		

			$.post('/platform.banner.AddAppPeacock', params).done(function(data){
				data =jQuery.parseJSON(data); 
				if (data && data.code == 0) {
					$(el).modal('hide');
					window.location.reload();
				} else {
					$(el).find('.alert h4').html('创建失败!');
					$(el).find('.alert p').html('code:'+data.code+' msg:' + data.msg);
					$(el).find('.alert').show();
				}
			})	
		}else if(padImgId && mobileImgId){//编辑
			var params = {
			'mobilePid' : $(el).find("input[id=mobileImgId]").val(),
			'padPid' : $(el).find("input[id=padImgId]").val(),
			'orgId' : $(el).find("select[name=orglist]").val(),			
			'mobile_url' : ($(el).find("#mobile").val() != '') ? $(el).find("#mobile").val() : $(el).find("#b_img").attr('data-id'),
			'pad_url' : ($(el).find("#pad").val() != '') ? $(el).find("#pad").val() : $(el).find("#b_img2").attr('data-id'),			
			'link' : $(el).find("input[name=link]").val(),			
			'status' : status2,			
			};				
			if (!params.mobile_url || !params.pad_url){
				layer.msg('请上传手机、pad两张图片');
				return ;
			}	
		

			$.post('/platform.banner.UpdateAppPeacock', params).done(function(data){
				data =jQuery.parseJSON(data); 
				if (data && data.code == 0) {
					$(el).modal('hide');
					window.location.reload();
				} else {
					$(el).find('.alert h4').html('编辑失败!');
					$(el).find('.alert p').html('code:'+data.code+' msg:' + data.msg);
					$(el).find('.alert').show();
				}
			})	
		}

		
	})
	
	

	




	
});
