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
			var $visibleDiv = $(this.myObj+">div:visible");
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
		//console.log($("div[data-type=tabmenu]"));
		var arrTab = []; // 매번객체생성을할수가없으니 배열로지정해주기
		var tabText = "div[data-type=tabmenu]";
		var tabMenuWrap = $(tabText);
		$.each(tabMenuWrap,function(i,o){
			arrTab[i] = new TabmenuFnc(tabText,i);
		});
		/*select*/
		     /*
        1.생성함수
        2.속성,메서드 생성
        3.객체 생성 (앞글자는 대문자로)
     */
     function InitSelect(objName,idx){ //객체 생성함수
        this.sel_c = objName;
        this.idx = idx;
        this.myWrap = "div[data-select="+this.sel_c+"]:eq("+this.idx+")";
        this.allSelectWrap = $("div[data-select]");
        this.bindEvent();
     }
     InitSelect.prototype.bindEvent = function(){ //메모리 절약으로function InitSelect() 이곳 안에 쓰면 여러개가 만들어지므로 밖으로 빼서 프로토 타입으로 만들어준다. 이벤트 등록 메서드
        //$("div[data-select=sel_1] button")
        $(document).on("click",this.myWrap + " button",$.proxy(this.selectHanddler_1, this)); //이벤트 등록 대상
     		$(document).on("click",this.myWrap + " a",$.proxy(this.selectClickHanddler_1, this));
     }

    InitSelect.prototype.selectClickHanddler_1 = function(e){
      e.preventDefault();
      var myObj = $(e.target);
      var myTagName = myObj.prop("tagName").toLowerCase(); // myobj 는 제일하위요소 img 인데 여기서 태그네임을 가져와서 소문자로 만들어랏

      if(myTagName == "img") {
      	var myButton = $("button",this.myWrap);
      	var btnImg = $("img",myButton);
      	btnImg.attr("src",myObj.attr("src"));
	      $(this.myWrap+" ul").hide();      	
      } else {
	      var myObjText = myObj.text();
	      $(this.myWrap+" button").text(myObjText);
	      $(this.myWrap+" ul").hide();
	      var url = myObj.attr("href");
			}
      $(this.myWrap+" input[type=hidden]").val(url);
      //window.open("http://"+url);
    }
     InitSelect.prototype.selectHanddler_1 = function(e){
     		e.preventDefault();
        var $myThis = $(e.target); //이벤트 요소의 가장 하위요소(텍스트는 제외, 돔객체- 문서객체만 선택이 된다.)
        var $mySelWrap = $(this.myWrap);
        var $myUl = $("ul",$mySelWrap);
        var activeColor = null;
      if($myUl.is(":hidden")){
         $("ul:visible",this.allSelectWrap).hide();
            $myUl.show();
      }else{
            $myUl.hide();
      };

			// if(activeColor){ //null이 아니라면
			// 				activeColor.css({"backgroundColor":"#fff"});
			// 	}else{
			// 		var ts = $(this.myWrap+" button");
			// 			ts.css({"backgroundColor":"#282828"});
			// 			activeColor =+ 1;
			// 	}
			}		
			
     $.fn.colorCh = function(){
     						var myThis = $(this);
			        	var activeColor = false;
			        	var myBtn = $(" button",myThis);
				       	var ch = function(){

				       			if(activeColor){
				       				myBtn.removeClass('on')
				       				activeColor=false;
				       			}else{
				       				var ts = $(this);
				       				myBtn.addClass('on');
				       				activeColor = true;
				       			}
									}
			        myBtn.on({"click":ch});

			      }
		      $(".lang_wrap").colorCh();   //부모



    
     $(function(){
        var sel = [];

        /*sel[0] = new InitSelect("sel_1");  // var sel_1 => 인스턴트 네임
        sel[1] = new InitSelect("sel_2");
        sel[2] = new InitSelect("sel_3");*/
        $.each($("div[data-select=sel]"),function(i,e){
           sel[i] = new InitSelect("sel",i);
        });
     })

		     /*select종료*/

})
$(function(){

	 		     /*달력시작*/
		     $.datepicker.regional['ko'] = {
		        closeText: '닫기',
		        prevText: '이전달',
		        nextText: '다음달',
		        currentText: '오늘',
		        monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		        '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		        monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		        '7월','8월','9월','10월','11월','12월'],
		        dayNames: ['일','월','화','수','목','금','토'],
		        dayNamesShort: ['일','월','화','수','목','금','토'],
		        dayNamesMin: ['일','월','화','수','목','금','토'],
		        weekHeader: 'Wk',
		        dateFormat: 'yy-mm-dd',
		        firstDay: 0,
		        isRTL: false,
		        showMonthAfterYear: true,
		        yearSuffix: '',
		        showOn: 'both',
		        buttonText: "달력",
		        changeMonth: true,
		        changeYear: true,
		        showButtonPanel: true,
		        yearRange: 'c-99:c+99' //범위지정
   			 };
		     $.datepicker.setDefaults($.datepicker.regional['ko']);
			     var datepicker_default = {
			        showOn: 'both',
			        buttonText: "달력",
			        currentText: "이번달",
			        changeMonth: true,
			        changeYear: true,
			        showButtonPanel: true,
			        yearRange: 'c-1:c+1',
			        showOtherMonths: true,
			        selectOtherMonths: true
			    }
		     $("#calendar").datepicker(datepicker_default);
})

		     /*달력종료*/			
