jQuery(function () {
    handle_side_menu();
    if (!IsPC()){
        $("#mobile-sidebar").show().click(function(){
            $("#sidebar").toggle('display');
            $(this).text(($(this).text()=='展开')?'隐藏':'展开');
        })
        $("#sidebar-collapse").trigger('click');

    }
});
function IsPC()
{
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

function handle_side_menu() {
    var click_event = $.fn.tap ? "tap" : "click"
    $("#menu-toggler").on(click_event, function () {
        $("#sidebar").toggleClass("display");
        $(this).toggleClass("display");
        return false
    });
    var b = $("#sidebar").hasClass("menu-min");
    $("#sidebar-collapse").on(click_event, function () {
        $("#sidebar").toggleClass("menu-min");
        //$(this).find('[class*="icon-"]:eq(0)').toggleClass("icon-double-angle-right");
        b = $("#sidebar").hasClass("menu-min");
        if (b) {
			$(this).find('[class*="icon-"]:eq(0)').removeClass().addClass("icon-double-angle-right");
            $(".open > .submenu").removeClass("open")
			$.cookie('ci_sidebar_flag', 'close', { expires: 365, path: '/' });
        } else {
			$(this).find('[class*="icon-"]:eq(0)').removeClass().addClass("icon-double-angle-left");
			$.cookie('ci_sidebar_flag', 'open', { expires: 365, path: '/' });
		}
    });
    var a = "ontouchend" in document;
    $(".nav-list").on(click_event, function (g) {
        var f = $(g.target).closest("a");
        if (!f || f.length == 0) {
            return
        }
        if (!f.hasClass("dropdown-toggle")) {
            if (b && click_event == "tap" && f.get(0).parentNode.parentNode == this) {
                var h = f.find(".menu-text").get(0);
                if (g.target != h && !$.contains(h, g.target)) {
                    return false
                }
            }
            return
        }
        var d = f.next().get(0);
        if (!$(d).is(":visible")) {
            var c = $(d.parentNode).closest("ul");
            if (b && c.hasClass("nav-list")) {
                return
            }
            c.find("> .open > .submenu").each(function () {
                if (this != d && !$(this.parentNode).hasClass("active")) {
                    $(this).slideUp(200).parent().removeClass("open")
                }
            })
        } else {} if (b && $(d.parentNode.parentNode).hasClass("nav-list")) {
            return false
        }
        $(d).slideToggle(200).parent().toggleClass("open");
        return false
    })
}

