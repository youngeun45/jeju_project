$(function(){
	var mSl = ".main_prdt_Slide";
	$(mSl).bxSlider({
        auto:true,//auto:true 기본값은 false : 자동슬라이더 
        autoControls: false, // 정지재생버튼
        controls:true,
        pager:true
	}); 
	var myGnbLiA = $(".gnb_wrapIn ul>li>a");

	$.fn.gnb = function(){
         //alert(1234);
         var myThis = $(this);  //이건쥐엔비
         var activeMenu = null;
	       	var mouseOver = function(){
							if(activeMenu){ //null이 아니라면
								activeMenu.next().hide();
							}
							var ts = $(this);
							ts.next().show();
							activeMenu = ts;
						}
         $("ul>li>div",myThis).hide();
         $(">ul>li>a",myThis).on({
            "mouseover focus": mouseOver
         });
         myThis.css({height:"100px;"}); //프로젝트할 때 빼기
         
         myThis.on({
            "mouseleave":function(){
               // console.log(3432);
               if(activeMenu){
               activeMenu.next().hide();
            }
            }
         });
      }
      

      $(function(){
      	/*gnb 실행*/
         $(".gnb_wrapIn").gnb();

       	/*sns 호버*/
	      var actImg = $(".sns_wrap li a");
    		actImg.hover(function(){
    			var myImg = $("img", this);
					var imgSrc = myImg.attr("src");
					var newSrc = imgSrc.replace(".png","_ov.png");
					myImg.attr("src",newSrc);
				 	 console.log($(this).attr("src"));
				},function(){
					var myImg = $("img", this);
					var imgSrc = myImg.attr("src");
					var newSrc = imgSrc.replace("_ov.png",".png");
					myImg.attr("src",newSrc);					
				})

      	/*Search*/
      	var search = $(".search a");
      	var searchWrap = $(".sch_wrap");
    		search.on("click",function(){
						searchWrap.stop().slideToggle("fast");
    		})

    		/*탭메뉴*/
    		/*
					1.객체 생성함수를 정의
					2. 객체 생성
					3. 속성, 메서드 등록 메서드 등록하는메서드 / 핸들러메서드 
				*/
				function TabmenuFnc(objName,idx){ //속성을 만들어주는것
					this.myObjName = objName;
					this.myIdx = idx;
					this.myObj = this.myObjName+":eq("+this.myIdx+")";
					this.actImg = $(this.myObj).find("h3:first img, h4:first img");
					this.bindEvent();
				};
				TabmenuFnc.prototype.bindEvent=function(){
					$(document).on("click",this.myObj+" h3 a, "+this.myObj+" h4 a",$.proxy(this.tabEvntHnd,this))

				}
				TabmenuFnc.prototype.tabEvntHnd=function(e){
					e.preventDefault();
					var $myImg = $(e.target);
					var $myThis = $(e.target).closest('a'); //제일 하위요소  this 대신 쓰기 지정하는것 !!!!!!
					var $myDiv= $myThis.parent().next();
					var $visibleDiv = $(this.myObj+" div:visible");
					//보이는 div 요소는 숨겨라 
					//클릭한 텝텝에 해당하는 div 는 보여라
					if($myDiv.is(":hidden")){
						$visibleDiv.hide();
						$myDiv.show();

					 	var src_1 = this.actImg.attr("src").replace("_ov.png",".png");
					 	this.actImg.attr("src",src_1);
					 	var src_2 = $myImg.attr("src").replace(".png","_ov.png");
					 	$myImg.attr("src",src_2);
						this.actImg = $myImg;	
					};
				};
				$(function(){
					//console.log($("div[data-type=tabmenu]"));
					var arrTab = []; // 매번객체생성을할수가없으니 배열로지정해주기
					var tabText = "div[data-type=tabmenu]";
					var tabMenuWrap = $(tabText);
					$.each(tabMenuWrap,function(i,o){
						arrTab[i] = new TabmenuFnc(tabText,i);
					});
				});



      });


})

