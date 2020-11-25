$(function(){

    //添加学生弹框
    $("#btn-user-add").on('click',function(event){

        var el = $("#window-user-create1");
        $(el).find(":text").each(function(){
            $(this).val('');
        })
    })

    $("#window-user-create1 .btn-primary").click(function(event){
        var el = $("#window-user-create1");
        var params = {
            'title' : $(el).find("input[name=title]").val(),
            'decription' : $(el).find("textarea[name=decription]").val(),
        };

        if (!params.title ||
            !params.decription) {
            layer.msg('信息不能为空');
            return;
        }
        $.post('/tc/create', params).done(function(data){
            if ( data.code == 0) {
                $(el).modal('hide');
                window.location.reload();
            } else {
                $(el).find('.alert h4').html('创建失败!');
                $(el).find('.error').html(data.msg);
            }
        })
    })


    //修改文章分类信息
    $("#window-user-update1 .btn-primary").click(function(event){
        var el = $("#window-user-update1");
        var params = {
            'id' : $(el).find("input[name=id]").val(),
            'title' : $(el).find("input[name=title]").val(),
            'decription' : $(el).find("textarea[name=decription]").val(),
        };
        if (!params.title ||
            !params.decription) {
            layer.msg('信息不能为空');
            return;
        }
        $.post('/tc/update', params).done(function(data){

            if ( data.code == 0) {
                $(el).modal('hide');
                window.location.reload();
            } else {
                $(el).find('.col-sm-5 .error').html('更新失败!');
            }
        })
    });

    $("#table-user .action-edit").click(function(event){

        var id = $(this).attr("id");
        $.get('/tc/info', {id: id}).done(function(data){

            var el = $("#window-user-update1");
            if (data.code == 0 && data.data) {
                data = data.data;
                $(el).find("input[name=id]").val(data.id)
                $(el).find("input[name=title]").val(data.title)
                $(el).find("textarea[name=decription]").text(data.decription)
                $(el).find(".id_div").html(data.id)
                $(el).modal('show');
            } else {
                layer.msg('获取失败!');
            }
        })
    });

});
