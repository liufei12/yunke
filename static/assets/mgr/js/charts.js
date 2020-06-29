$(function(){
	$('#search-form input[name=min_date]').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        forceParse: false,
		minView: "month",
        pickerPosition: 'bottom-right',
        format: 'yyyy-mm-dd'
    });
	$('#search-form input[name=max_date]').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        forceParse: false,
		minView: "month",
        pickerPosition: 'bottom-right',
        format: 'yyyy-mm-dd'
    });
	
});
