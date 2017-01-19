
$(function(){
	var sliderNum =0;
	var sliderWidth = 110;
	var mySlider_1 = $('.slider').bxSlider({
		mode: 'fade',
	  pagerCustom: '#slider_pager',
	  onSlideAfter:function(){
	  	var c = mySlider_1.getCurrentSlide();
	  	//console.log(c);
	  	if(c>=5) {
	  		sliderNum++;
	  	}else{
	  		sliderNum = 0;
	  	}
	  	$("#slider_pager").stop().animate({"margin-left":-sliderWidth*sliderNum+"px"},100);
	  }
	});
	
	// var oldSize;
	// var m = 1;
	// var a = $(".img_wrap .frame a");
	// $(window).on("resize",function(){
	// 	var w = $(this).width()+17;
	// 	if(w<oldSize && w <= 800 && m) {
	// 		m =0;
	// 		console.log(1);
	// 		a.css({"background":"url(../images/main/mainImg_btn.png)0 0 no-repeat)"});
	// 		$(".img_wrap .frame a.active").css({"background":"'url(../images/main/mainImg_btn_ov.png)0 0 no-repeat'"});

	// 		mySlider_1.reloadSlider({
	// 	 	pagerCustom: null,
	// 		  onSlideAfter:function(){}
	// 		});
	// 		$(".cot_wrap .frame").hide();
	// 	} else if(w>oldSize && w > 800 && !m){

	// 		m=1;
	// 		console.log(2);
	// 		mySlider_1.reloadSlider({
	// 			mode: 'fade',
	// 		  pagerCustom: '#slider_pager',
	// 		  onSlideAfter:function(){
	// 		  	var c = mySlider_1.getCurrentSlide();
	// 		  	//console.log(c);
	// 		  	if(c>=5) {
	// 		  		sliderNum++;
	// 		  	}else{
	// 		  		sliderNum = 0;
	// 		  	}
	// 		  	$("#slider_pager").stop().animate({"margin-left":-sliderWidth*sliderNum+"px"},100);
	// 		  }
	// 		});
			
	// 	}
	// 	oldSize =  w;
	// });


		$(".btnWrap .btnNext").on("click",function(){
			$(".bx-controls-direction .bx-next").trigger("click");
		})
		$(".btnWrap .btnPrev").on("click",function(){
			$(".bx-controls-direction .bx-prev").trigger("click");
		})
})
