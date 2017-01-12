
$(function(){
		$(".col_2 a").on("click",function(e){
			var myReply = $(this).next();
			if(myReply.is(":hidden")){     //숨겨져있을때 실행하라
					$(".col_2 a.on").removeClass("on");
					$(this).addClass("on");
					$(".col_2 div:visible").slideUp("fast");
					myReply.slideDown('fast');
			}else{
				$(".col_2 div:visible").slideUp("fast");
				$(".col_2 a.on").removeClass("on");
			}
		});



})
 