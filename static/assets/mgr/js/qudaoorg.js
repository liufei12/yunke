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

	$("#table-role .role-show").click(function(event){
		var bid = $(this).parent().siblings("input[name=bid]").val();
		$.post('/qudao.org.getOrgShowInfo', {bid: bid}).done(function(data){
			data = jQuery.parseJSON(data);
			var el = $("#window-role-show");
			if (data && data.data) {
				data = data.data;
				
				$(el).find("#label-1").val(data.subname)
				$(el).find("#label-2").val(data.company)
				$(el).find("#label-3").html(data.user_name)
				$(el).find("#label-4").val(data.email)
				$(el).find("#label-5").val(data.areacode)
				$(el).find("#label-9").val(data.hotline)
				$(el).find("#label-7").val(data.address)
				$(el).find("#label-8").val(data.statistic)
				$(el).find("#label-10").val(data.fk_qudao)
				$(el).find("#label-11").val(data.fk_qudao_user)
				$(el).find("#label-12").val(data.constract_num)
				$(el).find("#label-13").val(data.tax_rate)
				$(el).find("#label-14").val(data.separate_rate)
				$(el).find("#label-15").val(data.qudaoUserName)
				$(el).find("#qudao_area").html(data.qudaoUserFrom)
				$(el).find('input[name=income_show]').each(function(){
					if($(this).val() == data.income_show){
						$(this).attr('checked',true);
					}
				});
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
				$(el).find("input[name=bid]").val(data.pk_org)
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
		
		//业务员keyup
		$("input[name='sales_man']").keyup(function(){
			var sname=$.trim($(this).val());
			var qudaoId = $('input[name=fk_qudao]').val();
				$.get("/qudao/org/getQudaoUserByUserName?userName="+sname+"&qudaoId="+qudaoId,{  },function(r){
					if(r.result){
						var html='';
						$(r.result).each(function(i,item){
							html+='<li cid="'+item.fk_qudao+'" fkid="'+item.fk_mgr_user+'" cname="'+item.name+'">'+item.real_name+'</li>';
						});
						$('.last').show().html(html);
					}  
				},"json");
		});
		$('.last').on('click','li',function(){
				var cid = $(this).attr('cid');
				var fkid= $(this).attr('fkid');
				var area_name = $(this).attr('cname');
				$("input[name='sales_man']").val($(this).html());
				$("#qudao_area").html(area_name);
				$('.sales').find('input[name=fk_qudao]').val(cid);
				$('.sales').find('input[name=fk_qudao_user]').val(fkid);
				$('.last').hide();
			});
		
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
			'statistic' : $(el).find("#label-8").val(),
			'fk_qudao' : $(el).find("#label-10").val(),
			'fk_qudao_user' : $(el).find("#label-11").val(),
			'constract_num' : $(el).find("#label-12").val(),
			'tax_rate' : $(el).find("#label-13").val(),
			'separate_rate' : $(el).find("#label-14").val(),
			'income_show' : $(el).find("input[name='income_show']:checked").val(),
		};
		$.post('/qudao.org.updateSubInfo', params).done(function(data){
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
				//$('#eb_img').attr('src',r.src+"?"+Math.random());
				$('#span_eb_img').html("<img style='width:100px;hight:100px;' id='eb_img' src='"+r.src+"'>");
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
				$('#span_sb_img').html("<img style='width:100px;hight:100px;' id='sb_img' src='"+r.src+"'>");;
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
