/**
 * Created by yuanwei on 2015/9/18.
 */
$("#btn-channel-create").click(function(event){
    var el = $("#window-channel-create");
    $(el).find(":text").each(function(){
        $(this).val('');
    })
    $("#window-course :password").each(function(){
        $(this).val('');
    })
    $("#window-course select").each(function(){
        $(this).val(0);
    })
    $('#window-channel-create').modal('show');
})
$("#window-channel-create .btn-primary").click(function(event){
    var el = $("#window-channel-create");
    var params = {
        'name' : $(el).find("input[name=name]").val(),
        'status':$(el).find("select[name=status]").val()

    };
    if (!params.name) {
        layer.msg('渠道名称不能为空');
        return;
    }
    $.post('/promote/main/channeladd', params).done(function(data){
        data =jQuery.parseJSON(data);
        if (data && data.result.code == 0) {
            $(el).modal('hide');
            window.location.reload();
        } else {
            $(el).find('.alert h4').html('添加失败');
            $(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
            $(el).find('.alert').show();
        }
    })
})
$("#table-channel .channel-edit").click(function(event){
        var channel_id = $(this).parent().siblings("input[name=pk_channel]").val();
        $.get('/promote/main/channeledit', {channel_id: channel_id}).done(function(data){

            data =jQuery.parseJSON(data);

            var el = $("#window-channel-update");
            if (data && data.result.data) {
                data = data.result.data;
                $(el).find("input[name=name]").val(data.name)
                $(el).find("input[name=pk_channel]").val(data.pk_channel)
                $(el).find("select[name=status] option[value='"+data.status+"']").attr("selected","selected");
                $(el).modal('show');
            } else {
                layer.msg('数据错误!');
            }
        })  
        
    });
$("#window-channel-update .btn-primary").click(function(event){
        var el = $("#window-channel-update");
        var params = {
            'channel_id': $(el).find("input[name=pk_channel]").val(),
            'name': $(el).find("input[name=name]").val(),
            'status': $(el).find("select[name=status]").val(),
        };
        $.post('/promote/main/AjaxEdit', params).done(function(data){
            
            data =jQuery.parseJSON(data); 
            if (data && data.result && data.result.code == 1) {
                $(el).modal('hide');
                window.location.reload();
            } else {
                $(el).find('.alert h4').html('修改失败');
                $(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
                $(el).find('.alert').show();
            }
        })  
    });

$("#table-channel .channel-del").click(function(event){
        if(confirm('确认删除吗')){
            var channel_id = $(this).parent().siblings("input[name=pk_channel]").val();
            $.post('/promote/main/delChannel', {channel_id: channel_id}).done(function(data){
				data =jQuery.parseJSON(data);
                if (data && data.code == 0) {
                    window.location.reload();   
                }else{
                    layer.msg(data.msg);
                }
            })
        }
        
        
    });
//添加promote的时候选择机构下拉框
$("#window-promote-create #fk_user_owner").change(function(){

    var fk_user_owner = $(this).val();
    var subdomain = $(this).find("option:selected").attr('data-subdomain');
    
    $("#window-promote-create input[name=subdomain]").val(subdomain);
})
//添加promote的时候选择一级分类下拉框
$("#window-promote-create #fk_channel").change(function(){

    var fk_channel = $(this).val();
    $.get('/promote/main/AjaxSubChannelList', {cid: fk_channel}).done(function(data){

            data =jQuery.parseJSON(data);
            
            var el = $("#window-promote-create");
            if (data) {
                var str = '<option value="0">请选择</option>';
                for(var i=0;i<data.length;i++){
                    str +="<option value="+data[i]['pk_sub_channel']+">"+data[i]['name']+"</option>";
                    
                    
                }

                $('#window-promote-create select[name=fk_sub_channel]').html(str);
            } else {
                layer.msg('数据错误!');
            }
        })  
    
})
//添加promote的时候选择一级分类下拉框
$("#window-promote-update #fk_channel").change(function(){

    var fk_channel = $(this).val();
    $.get('/promote/main/AjaxSubChannelList', {cid: fk_channel}).done(function(data){

            data =jQuery.parseJSON(data);
            
            var el = $("#window-promote-update");
            if (data) {
                var str = '<option value="0">请选择</option>';
                for(var i=0;i<data.length;i++){
                    str +="<option value="+data[i]['pk_sub_channel']+">"+data[i]['name']+"</option>";
                    
                    
                }

                $('#window-promote-update select[name=fk_sub_channel]').html(str);
            } else {
                layer.msg('数据错误!');
            }
        })  
    
})
//添加推广
$("#window-promote-create .btn-primary").click(function(event){
    var el = $("#window-promote-create");
    var params = {
        'fk_user_owner' : $(el).find("input[name=fk_user_owner]").val(),
        'subdomain':$(el).find("input[name=subdomain]").val(),
        'fk_channel':$(el).find("select[name=fk_channel]").val(),
        'fk_sub_channel':$(el).find("select[name=fk_sub_channel]").val(),
        'status':$(el).find("select[name=status]").val()

    };
    if (!params.fk_user_owner) {
        layer.msg('机构名称不能为空');
        return;
    }
    if (!params.subdomain) {
        layer.msg('域名不能为空');
        return;
    }
    if (!params.fk_channel) {
        layer.msg('推广渠道不能为空');
        return;
    }
    if (!params.fk_sub_channel) {
        layer.msg('推广子渠道不能为空');
        return;
    }
    $.post('/promote/main/addpromote', params).done(function(data){
        data =jQuery.parseJSON(data);
        if (data && data.result.code == 0) {
            $(el).modal('hide');
            window.location.reload();
        } else {
            $(el).find('.alert h4').html('添加失败');
            if(data.result.code=='-4'){
                layer.msg("数据已经存在");
            }
            $(el).find('.alert').show();
        }
    })
    //打开添加推广对话框
   
})
 $("#btn-promote-create").click(function(event){
    var el = $("#window-promote-create");
    $(el).find(":text").each(function(){
        $(this).val('');
    })
    $("#window-course :password").each(function(){
        $(this).val('');
    })
    $("#window-course select").each(function(){
        $(this).val(0);
    })
    $('#window-promote-create').modal('show');
})
 $("#table-promote .promote-edit").click(function(event){
        var promote_id = $(this).parent().siblings("input[name=pk_promote]").val();
        var data;
        $.get('/promote/main/promoteedit', {promote_id: promote_id}).done(function(data){

            data =jQuery.parseJSON(data);
            
            
            var el = $("#window-promote-update");
            
            if (data) {
                getSubChannelList(data.fk_channel,data.pk_sub_channel);
                $(el).find("input[name=org_name]").val(data.org_subname);
				$(el).find("input[name=fk_user_owner]").val(data.fk_user_owner);
                $(el).find("input[name=subdomain]").val(data.subdomain);
                $(el).find("select[name=fk_channel] option[value='"+data.fk_channel+"']").attr("selected","selected");
                $(el).find("input[name=pk_promote]").val(data.pk_promote);
                $(el).find("select[name=status] option[value='"+data.status+"']").attr("selected","selected");
                $(el).modal('show');
            } else {
                layer.msg('数据错误!');
            }
        }) 
        
       
        
    });
function getSubChannelList(cid,sub_channel_id){
     $.get('/promote/main/AjaxSubChannelList?cid='+cid).done(function(data){

            data =jQuery.parseJSON(data);
             if (data) {
                var str = '<option value="0">请选择</option>';
                for(var i=0;i<data.length;i++){
                    str +="<option ";
                    if(sub_channel_id == data[i]['pk_sub_channel']){
                        str += "selected";
                    }
                    str +=" value="+data[i]['pk_sub_channel']+">"+data[i]['name']+"</option>";
                    
                    
                }

                $('#window-promote-update select[name=fk_sub_channel]').html(str);
            } else {
                layer.msg('数据错误!');
            }
            
        }) 
}
 //修改promote
 $("#window-promote-update .btn-primary").click(function(event){
        var el = $("#window-promote-update");
        var params = {
           'fk_user_owner' : $(el).find("input[name=fk_user_owner]").val(),
            'subdomain':$(el).find("input[name=subdomain]").val(),
            'fk_channel':$(el).find("select[name=fk_sub_channel]").val(),
            'pk_promote':$(el).find("input[name=pk_promote]").val(),
            'status':$(el).find("select[name=status]").val()
        };
        if (!params.fk_user_owner) {
        layer.msg('渠道名称不能为空');
        return;
        }
        if (!params.subdomain) {
            layer.msg('域名不能为空');
            return;
        }
        if (!params.fk_channel) {
            layer.msg('推广渠道不能为空');
            return;
        }
        $.post('/promote/main/AjaxEditPromote', params).done(function(data){
            
            data =jQuery.parseJSON(data); 
            if (data && data.result && data.result.code == 1) {
                $(el).modal('hide');
                window.location.reload();
            } else {
                $(el).find('.alert h4').html('修改失败');
                $(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
                $(el).find('.alert').show();
            }
        })  
    });
$("#table-promote .promote-del").click(function(event){
        if(confirm('确认禁用吗')){
            var pk_promote = $(this).parent().siblings("input[name=pk_promote]").val();
            $.post('/promote/main/delPromote', {pk_promote: pk_promote}).done(function(data){

                 data =jQuery.parseJSON(data); 
                if (data.result.code == 1) {
                    window.location.reload();   
                } else {
                    layer.msg(data.result.msg);
                }
            });
        }
        
        
    });
$("#table-promote .promote-view").click(function(event){
        
            var pk_promote = $(this).parent().siblings("input[name=pk_promote]").val();
            $.get('/promote/main/PromoteGet', {pk_promote: pk_promote}).done(function(data){

                 data =jQuery.parseJSON(data); 
                 var el = $("#window-promote-view");
                if (data) {
                    
					$(el).find("#promote_common_url").text(data.common_url);	
                     $(el).find("#promote_view_url").text(data.url);
                     $(el).find("#promote_view_code").text(data.promote_code);
                     $(el).find("#promote_qr_code img").attr("src",data.qr_code);
                    $('#window-promote-view').modal('show');
                } else {
                    layer.msg('数据错误!');
                }
            });
        
        
        
    });

//打开添加子分类页面
$("#btn-subchannel-create").click(function(event){
    var el = $("#window-subchannel-create");
   
    $('#window-subchannel-create').modal('show');
})
//添加子分类
$("#window-subchannel-create .btn-primary").click(function(event){
    var el = $("#window-subchannel-create");
    var params = {
        'name' : $(el).find("input[name=name]").val(),
        'status':$(el).find("select[name=status]").val(),
        'fk_channel':$(el).find("input[name=fk_channel]").val()

    };
    if (!params.name) {
        layer.msg('渠道名称不能为空');
        return;
    }
    $.post('/promote/main/subchanneladd', params).done(function(data){
        data =jQuery.parseJSON(data);
        if (data && data.result.code == 0) {
            $(el).modal('hide');
            window.location.reload();
        } else {
            $(el).find('.alert h4').html('添加失败');
            $(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
            $(el).find('.alert').show();
        }
    })
})

//打开修改子分类页面
$("#table-subchannel .channel-edit").click(function(event){
        var sub_channel_id = $(this).parent().siblings("input[name=pk_sub_channel]").val();
        $.get('/promote/main/subchanneledit', {channel_id: sub_channel_id}).done(function(data){

            data =jQuery.parseJSON(data);

            var el = $("#window-subchannel-update");
            if (data && data.result.data) {
                data = data.result.data;
                $(el).find("input[name=name]").val(data.name)
                $(el).find("input[name=pk_channel]").val(data.pk_sub_channel)
                $(el).find("select[name=status] option[value='"+data.status+"']").attr("selected","selected");
                $(el).modal('show');
            } else {
                layer.msg('数据错误!');
            }
        })  
        
    });
//修改子分类页面
$("#window-subchannel-update .btn-primary").click(function(event){
        var el = $("#window-subchannel-update");
        var params = {
            'channel_id': $(el).find("input[name=pk_channel]").val(),
            'name': $(el).find("input[name=name]").val(),
            'status': $(el).find("select[name=status]").val(),
        };
        $.post('/promote/main/AjaxEditSubChannel', params).done(function(data){
            
            data =jQuery.parseJSON(data); 
            if (data && data.result && data.result.code == 1) {
                $(el).modal('hide');
                window.location.reload();
            } else {
                $(el).find('.alert h4').html('修改失败');
                $(el).find('.alert p').html('code:'+data.result.code+' msg:' + data.result.msg);
                $(el).find('.alert').show();
            }
        })  
    });
//删除子分类
$("#table-subchannel .channel-del").click(function(event){
        if(confirm('确认删除吗')){
            var channel_id = $(this).parent().siblings("input[name=pk_sub_channel]").val();
            $.post('/promote/main/delSubChannel', {channel_id: channel_id}).done(function(data){
                data =jQuery.parseJSON(data); 
                if (data.result.code == 1) {
                    window.location.reload();   
                } else {
                    layer.msg(data.result.msg);
                }
            });
        }
        
        
    });
    
