$(function(){
	$('#search-form input[name=date]').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        forceParse: false,
		minView: "month",
        pickerPosition: 'bottom-right',
        format: 'yyyy-mm-dd'
    });
	
});
