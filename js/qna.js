
$(function(){
		$(".col_2 ul li a").on("click",function(e){
			var myReply = $(this).next();
			if(myReply.is(":hidden")){     //숨겨져있을때 실행하라
					$(".col_2 ul li a.on").removeClass("on");
					$(this).addClass("on");
					$(".col_2 ul li div:visible").slideUp("fast");
					myReply.slideDown('fast');
			}else{
				$(".col_2 ul li div:visible").slideUp("fast");
				$(".col_2 ul li a.on").removeClass("on");
			}
		});
		$(".mobile_menu p a").on("click",function(e){
			e.preventDefault()
			$(".mobile .col_2").hide();
			$(".mobile .col_1").show();
			$(".mobile .h3_wrap").show();
		})



})
 