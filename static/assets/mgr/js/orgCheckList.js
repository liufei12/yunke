$(function(){

	$("#btn-role-add").click(function(event){
		var el = $("#window-role-create");
		$(el).find(":text").each(function(){
			$(this).val('');
		})
		$(el).find(":password").each(function(){
			$(this).val('');
		})
		$(el).find("select").each(function(){
			$(this).val(0);
		})
		$(el).modal('show');
	})

	$("#window-role-create .btn-primary").click(function(event){
		var el = $("#window-role-create");
		var params = {
			'title' : $(el).find("input[name=title]").val(),
			'url' : $(el).find("#aurl").val(),
			'link' : $(el).find("input[name=link]").val(),
			'status' : $(el).find("select[name=status]").val(),
			'order_no' : $(el).find("input[name=order_no]").val(),
		};
		if (!params.url) {
			layer.msg('请上传图片');
			return;
		}
		$.post('/platform.banner.addBanner', params).done(function(data){
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
	})

	$("#table-role .role-edit").click(function(event){
		var bid = $(this).parent().siblings("input[name=bid]").val();


		$.post('/platform.org.getOrgCheckList', {bid: bid}).done(function(data){
			data = jQuery.parseJSON(data);
			var el = $("#window-role-update");
			if (data && data.data) {
				data = data.data;
				$(el).find("#input[name=fk_org]").val(data.fk_org)
				$(el).find("#label-2").html(data.subname)
				if(data.pic_url == ''){
					$(el).find("#eb_img").attr('src','/assets/img/yunke_neworg_logo.png')
				}else{
					$(el).find("#eb_img").attr('src',data.pic_url)
				}

				if(data.thumb_ico==''){
					$(el).find("#thumb_ico").attr('src','/assets/img/yunke.ico')
				}else{
					$(el).find("#thumb_ico").attr('src',data.ico_url)
				}
				$(el).find("#eurl").val(data.qualify_pic)
				$(el).find("#sb_img").attr('src',data.spic_url)
				$(el).find("#surl").val(data.idcard_pic)
				$(el).find("#label-3").html(data.company)
				$(el).find("#label-4").html(data.scopes)
				$(el).find("#label-5").html(data.pro_name)
				$(el).find("#label-6").html(data.address)
				$(el).find("#label-7").html(data.hotline)
				$(el).find("#label-8").html(data.email)
				$(el).find("#label-9").html(data.name)
				$(el).find("#label-14").html(data.desc)

				$(el).find("input[name=bid]").val(data.fk_user_owner)
				$(el).find("input[name=fk_org]").val(data.fk_org)
				if(data.org_type ==1){
					$(el).find("#label-15").html("品牌机构");
				}else if(data.org_type ==2){
					$(el).find("#label-15").html("教师工作室");
				}else if(data.org_type ==3){
					$(el).find("#label-15").html("公立学校");
				} 
				if(data.tmp_status==1){
				$(el).find("#label-11").attr("checked","checked")
				}else if(data.tmp_status==0){
			}else if(data.tmp_status==-1){
				$(el).find("#label-12").attr("checked","checked")

				}
				$(el).modal('show');
			} else {
				layer.msg('获取失败!');
			}
		})

	});


	$("#table-role .role-show").click(function(event){
		var bid = $(this).parent().siblings("input[name=bid]").val();
		$.post('/platform.org.getOrgShowInfo', {bid: bid}).done(function(data){
			data = jQuery.parseJSON(data);
			var el = $("#window-role-show");
			if (data && data.data) {
				data = data.data;

				$(el).find("#label-1").val(data.subname)
				$(el).find("#label-2").val(data.company)
				$(el).find("#label-3").html(data.name)
				$(el).find("#label-4").val(data.email)
				$(el).find("#label-5").val(data.areacode)
				$(el).find("#label-9").val(data.hotline)
				$(el).find("#label-7").val(data.address)
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
				$(el).find("input[name=bid]").val(data.fk_org)
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


	//修改提交机构详细信息
	$("#window-role-show .btn-primary").click(function(event){
		var el = $("#window-role-show");
		var params = {
			'bid': $(el).find("input[name=bid]").val(),
			'subname' : $(el).find("#label-1").val(),
			'company_name' : $(el).find("#label-2").val(),
			'u_name' : $(el).find("#label-3").val(),
			'email':	$(el).find("#label-4").val(),
			'areacode' : $(el).find("#label-5").val(),
			'hotline' : $(el).find("#label-9").val(),
			'address' : $(el).find("#label-7").val(),
		};
		$.post('/platform.org.updateSubInfo', params).done(function(data){
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


	$("#window-role-update .btn-primary").click(function(event){
		var el = $("#window-role-update");
		var params = {
			'bid': $(el).find("input[name=bid]").val(),
			'fk_org': $(el).find("input[name=fk_org]").val(),
			'desc':	$(el).find("input[name=desc]").val(),
			'status' : $(el).find("input[name=status]:checked").val(),
		};
		$.post('/platform.org.updateOrgCheck', params).done(function(data){
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
		$.post('/platform.banner.delBanner', {bid: bid}).done(function(data){
			data =jQuery.parseJSON(data);
			if (data && data.code == 0) {
				window.location.reload();
			} else {
				layer.msg('删除失败');
			}
		});

	});


	var t_banner = new plupload.Uploader({
				browse_button: 'banner',
				url: '/platform.org.uploadOrg',
				filters: {
	    			mime_types : [
		    				{ title : "Image files", extensions : "jpg,gif,png" }
			    		],
				    	max_file_size:"1000kb"
				},multi_selection:false
			});
	t_banner.init();
	t_banner.bind('FilesAdded', function(up, files) {
		t_banner.start();
	});

	t_banner.bind('UploadProgress', function(up, file) {
		$("#banner").val("上传中："+ file.percent +"%");
	});

	t_banner.bind('FileUploaded', function(up, file,info) {
		$("#banner").val("上传完成");

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
//上传
var banner = new plupload.Uploader({
				browse_button: 'sbanner',
				url: '/platform.org.uploadOrg',
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
		$("#sbanner").val("上传中："+ file.percent +"%");
	});

	banner.bind('FileUploaded', function(up, file,info) {
		$("#sbanner").val("上传完成");

		if(info.response){
	    	var r = jQuery.parseJSON(info.response);
			if(r.error){
				layer.msg(r.error);
			}else{
				$('#sb_img').attr('src',r.src+"?"+Math.random());
				$('#surl').val(r.pic);
			}
		}

	});



	var ebanner = new plupload.Uploader({
	                  browse_button: 'ebanner',
	                  url: '/platform.banner.uploadBanner',
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
		$("#ebanner").val("上传完成");
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





});
