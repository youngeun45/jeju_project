
$(function(){
	var sliderNum =0;
	var sliderWidth = 110;
	var mySlider_1 = $('.slider').bxSlider({
		mode: 'fade',
	  pagerCustom: '#slider_pager',
	  onSlideAfter:function(){
	  	var c = mySlider_1.getCurrentSlide();
	  	console.log(c);
	  	if(c>=5) {
	  		sliderNum++;
	  	}else{
	  		sliderNum = 0;
	  	}
	  	$("#slider_pager").stop().animate({"margin-left":-sliderWidth*sliderNum+"px"},100);
	  }
	});
		$(".etc_wrap h3").on("click",function(e){
			var myReply = $(this).next();
			if(myReply.is(":hidden")){     //숨겨져있을때 실행하라
					$(".etc_wrap h3.on").removeClass("on");
					$(this).addClass("on");
					$(".etc_wrap div:visible").slideUp("fast");
					myReply.slideDown('fast');
			}else{
				$(".etc_wrap div:visible").slideUp("fast");
				$(".etc_wrap h3.on").removeClass("on");
			}
		});



})
