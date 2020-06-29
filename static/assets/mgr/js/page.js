/*
* pageid    节点id
* path  路径
* num   每页个数 
* page  页号
* total 总页数
*/
function page(pageid,path,num,page,total){
	var dom = $("<ul class=\"pagination\"></ul>").appendTo($("#"+pageid));
	var dompre = $("#"+pageid);
	var _path = path;
	var _num = num;
	var _total= total;
	var _page = page;
	var pagebefore;
	var pageafter;
	var pagethis;
	var cla;
	var title;
	if(0 == _page){
		return;
	}
	if(_total<=10){
		if(_page == 1){
			if(_total!=1){
			}
		}
		if(_page-1 > 0){
			var prev = createDom("prev",_path,_page-1,_num,"上一页","上一页");
			dom.append(prev);
		}
		for(var i=9;i>0;i--){
			if(_page-i>0){
				pagebefore = createDom("",_path,_page-i,_num,"",_page-i);
				dom.append(pagebefore);
			}
		}
		if(_total != 1){
			var pagethis = $('<li class="active"><a href="">'+_page+'</a></li>');
			dom.append(pagethis);
		}
		for(var a=1;a<10;a++){
			if(_page+a <=_total){
				pageafter = createDom("",_path,_page+a,_num,"",_page+a);
				dom.append(pageafter);
			}
		}
		if(_page+1 <= _total){
			var prev = createDom("prev",_path,_page+1,_num,"下一页","下一页");
			dom.append(prev);
		}

		//最后一页
		if(_page == _total){
			if(_total != 1){
			}
		}
	}else{
		if(_page == 1){
		}
		if(_page-1 > 0){
			var prev = createDom("prev",_path,_page-1,_num,"上一页","上一页");
			dom.append(prev);
		}
		if(_page-2 > 1){
			var index = createDom("prev",_path,1,_num,"首页","1");
			dom.append(index);
			var start = createDom("next",_path,_total,_num,"",_total);
			dom.append(end);
			var dot = $('<li class="prev"><a href="">...</a></li>');
			dom.append(dot);
		}
		for(var i=2;i>0;i--){
			if(_page-i>0){
				pagebefore = createDom("",_path,_page-i,_num,"",_page-i);
				dom.append(pagebefore);
			}
		}
		var pagethis = $('<li class="active"><a href="">'+_page+'</a></li>');
		dom.append(pagethis);
		for(var a=1;a<3;a++){
			if(_page+a <=_total){
				pageafter = createDom("",_path,_page+a,_num,"",_page+a);
				dom.append(pageafter);
			}
		}
		if(_page+2 < _total){
			var dot = $('<li class="prev"><a href="">...</a></li>');
			dom.append(dot);
			var end = createDom("next",_path,_total,_num,"",_total);
			dom.append(end);
		}
		if(_page+1 <= _total){
			var prev = createDom("prev",_path,_page+1,_num,"下一页","下一页");
			dom.append(prev);
		}
		if(_page == total){
		}
	}

	function createDom(_cla,_path,_page,_num,_title,_text){
		if(_path.indexOf("?")==-1){
			return  $('<li class="'+_cla+'"><a href="'+_path+'?page='+_page+'&size='+_num+'"  title="'+_title+'">'+_text+'</a></li>')
		}else{
			return  $('<li class="'+_cla+'"><a href="'+_path+'&page='+_page+'&size='+_num+'"  title="'+_title+'">'+_text+'</a></li>')
		}
	}
}
