/*quickmenu*/
$.fn.quickMenu = function(opt){
   // var visual_height = $(".navi_wrapIn").height();
   // console.log(visual_height)
   var ts = $(this); //퀵랩
   $(window).on("scroll",function(){
     var myThis = $(this); //window
     var scT = myThis.scrollTop() ; //상단에서부터의 거리
     var scH = $('body').prop("scrollHeight")-$("#footerwrap").height()-$(".col_quick").height();

     //console.log(myThis.scrollTop());
     if(myThis.scrollTop() >= scH) {
        ts.stop();
        return false;
     }
     ts.stop().animate({top:scT+40+"px"},opt.speed);
   });
};

$(function(){
	 $(".col_quick").quickMenu({speed:900});
	$(".fancybox-effects-a").on("click",function(e){e.preventDefault();})
	$(".mobile .fancybox-effects-a").fancybox({
							helpers: {
								title : {
									type : 'outside'
								},
								overlay : {
									speedOut : 0
								}
							}
						});
})







