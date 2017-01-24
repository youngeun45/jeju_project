/*quickmenu*/
$.fn.quickMenu = function(opt){
   var ts = $(this); 
   $(window).on("scroll",function(){
     var myThis = $(this); 
     var scT = myThis.scrollTop();
     var scH = $('body').prop("scrollHeight")-$("#footerwrap").height()-$(".col_quick").height()-1000;
     if(myThis.scrollTop() >= scH) {
        // ts.stop();
        return false;
     }
     ts.stop().animate({top:scT+40+"px"},opt.speed);
   });
};

$(function(){
	 $(".col_quick").quickMenu({speed:500});
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
	 var closeSummary = function(){
	 			$(this).parent().slideUp("fast")

	 		}
	 	$(".mobile_close_ha").on("click",closeSummary)
	 $(".summary").on("click",function(e){
	 		e.preventDefault();

	 		if($(".context_wrap_t_m").is(":visible")){
	 			if($("body").attr("class") == "tablet"){
	 				$(".context_wrap_t_m").hide();
	 				$(this).text("요약")
	 			}else if($("body").attr("class") == "mobile"){
	 			 $(document).on("click",".mobile_close_ha",closeSummary)
	 				$(this).text("요약")
	 			}
	 		}else{
	 			if($("body").attr("class") == "tablet"){
	 				$(".context_wrap_t_m").show();
	 				$(this).text("닫기")
	 			}else if($("body").attr("class") == "mobile"){
	 				$(".context_wrap_t_m").slideDown('10000');

	 			}
	 		}
	 })

})







