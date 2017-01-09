
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
})
