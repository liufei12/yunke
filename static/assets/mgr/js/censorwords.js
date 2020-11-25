$(function(){

    //编辑敏感词备注信息
    $("#window-user-update1 .btn-primary").click(function(event){
		var el = $("#window-user-update1");		
		var wordId = $(el).find("input[name=wordId1]").val();
		var desc = $(el).find("textarea[name=editdesc]").val();
		
		$.ajax({
                type:'post',
                url:"/black/censorwords/UpdateDescById",
                data: {
                    wordId:wordId,
                    desc:desc
                },
                success:function(data){                    
                    location.reload();
                }
            });
		
	});
	
    $("#table-user .action-edit").click(function(event){        
		var wordId = $(this).parent().siblings("input[name=wordId]").val();
		var desc = $(this).parent().siblings("input[name=desc]").val();		
		var el = $("#window-user-update1");
		$(el).find("textarea[name=editdesc]").val(desc);
		$(el).find("input[name=wordId1]").val(wordId);
		$(el).modal('show');		
	});

	
	//添加敏感词
	$("#window-user-create1 .btn-primary").click(function(event){			
		var word = $("#word").val();
		var desc = $("#desc").val();		
		$.ajax({
                type:'post',
                url:"/black/censorwords/AddCensorword",
                data: {
                    word:word,
                    desc:desc
                },
                success:function(data){                    
                    location.reload();
                }
            });
		
	});

	$("#btn-user-add").click(function(event){		
		var el = $("#window-user-create1");		
		$(el).modal('show');		
	});		

});
