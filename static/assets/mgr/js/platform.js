$(function () {

    //新增弹窗
    $("#btn-user-add").click(function(){
        $("#label-1").val('');
        $("#device_type").val(0);
        $("#setting_json").val('');
        $("#setting_json").attr('placeholder', "信息格式:[\n" +
            "{\"name\":\"双狮\",\"img\":\"/one2on2.png\",\"url\":\"http://gn100.com/tw.main.shuangshi\",\"appurl\":\"1to1_introduce\"},\n" +
            "{\"name\":\"面授\",\"img\":\"/one2on3.png\",\"url\":\"http://gn100.com/tw.main.mianshou\",\"appurl\":\"2to1_introduce\"}]");
        $("#window-user-create").modal("show");
    });

    //新增
    $("#add_setting").click(function(){

        var el = $("#window-user-create");

        var params = {
            'name' : $(el).find("input[name=name]").val(),
            'device_type' : $(el).find("option:selected").val(),
            'descript' : $(el).find("textarea[name=descript]").val(),
            'device_subject_type' : $(el).find("input[name=device_subject_type]").val(),
        }

        if (!params.name) {
            layer.msg('名称不能为空');
            return;
        }

        if (params.device_type == 0) {
            layer.msg('请选择类型');
            return;
        }

        if(params.device_subject_type == ''){
            layer.msg('类型标识不能为空');
            return;
        }

        if(params.descript == ''){
            layer.msg('信息内容不能为空');
            return;
        }

        $.post('/platform/appsetting/AddAppSetting', params).done(function(data){
            data =jQuery.parseJSON(data);
            if (data && data.code == 0) {
                $(el).modal('hide');
                window.location.reload();
            } else {
                // $(el).find('.alert h4').html('创建失败!');
                $(el).find('.alert p').html('code:'+data.code+' msg:' + data.msg);
                $(el).find('.alert').show();
            }
        })
    })

    //禁用
    $(".dataTable .node-off").click(function () {
        var app_setting_id = $(this).siblings("span.app_setting_id").html();

        var params = {
            'app_setting_id' : app_setting_id,
            'status' : -1
        }

        $.post('/platform/appsetting/appSettingOff', params).done(function(data){
            data =jQuery.parseJSON(data);
            if (data.code == 0) {
                layer.msg('禁用成功！');
                window.location.reload();
            } else {
                layer.msg('禁用失败');
            }
        })
    })

    //启用
    $(".dataTable .node-open").click(function () {
        var app_setting_id = $(this).siblings("span.app_setting_id").html();

        var params = {
            'app_setting_id' : app_setting_id,
            'status' : 1
        }

        $.post('/platform/appsetting/appSettingOpen', params).done(function(data){
            data =jQuery.parseJSON(data);
            if (data.code == 0) {
                layer.msg('启用成功！');
                window.location.reload();
            } else {
                layer.msg('启用失败');
            }
        })
    });

    //修改弹窗 node-edit
    $(".dataTable .node-edit").click(function () {

        $(".alert-error").css('display', 'none')
        var app_setting_id = $(this).siblings("span.app_setting_id").html();
        var app_setting_name = $(this).siblings("span.app_setting_name").html();
        var app_setting_descript = $(this).siblings("span.app_setting_descript").html();
        var app_device_type = $(this).siblings("span.app_device_type").html();
        var app_device_subject_type = $(this).siblings("span.app_device_subject_type").html();

        $("#label-id").val(app_setting_id);
        $("#label-update-1").val(app_setting_name);
        $("#device_update_type").val(app_device_type);
        $("#setting_update_json").val(app_setting_descript);
        $("#device_subject_update_type").val(app_device_subject_type);
        $("#window-user-update").modal("show");
    });

    //更新
    $("#window-user-update .btn-primary").click(function(event){
        var el = $("#window-user-update");
        var params = {
            'pk_setting': $(el).find("input[name=pk_setting]").val(),
            'name' : $(el).find("input[name=name]").val(),
            'device_type' : $(el).find("option:selected").val(),
            'descript' : $(el).find("textarea[name=descript]").val(),
            'device_subject_type': $(el).find("input[name=device_subject_type]").val(),
        };

        $.post('/platform/appsetting/UpdateAppSetting', params).done(function(data){
            data =jQuery.parseJSON(data);
            if (data.code == 0) {
                $(el).modal('hide');
                window.location.reload();
            } else {
                $(el).find('.alert p').html('code:'+data.code+' msg:' + data.msg);
                $(el).find('.alert').show();
            }
        })
    });

})