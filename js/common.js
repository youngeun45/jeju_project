$(function(){

/*bxSlider*/
var mSl = ".main_prdt_Slide";
			$(mSl).bxSlider({
		        auto:true,//auto:true 기본값은 false : 자동슬라이더 
		        autoControls: false, // 정지재생버튼
		        controls:true,
		        pager:true
			}); 
			var myGnbLiA = $(".gnb_wrapIn ul>li>a");
/*sns 호버*/
  var actImg = $(".sns_wrap li a");
	actImg.hover(function(){
	var myImg = $("img", this);
	var imgSrc = myImg.attr("src");
	var newSrc = imgSrc.replace(".png","_ov.png");
	myImg.attr("src",newSrc);
	},function(){
		var myImg = $("img", this);
		var imgSrc = myImg.attr("src");
		var newSrc = imgSrc.replace("_ov.png",".png");
		myImg.attr("src",newSrc);					
	})
/*Search*/
	var search = $(".search button");
	var searchWrap = $(".sch_wrap");
	search.on("click",function(){
				searchWrap.stop().slideToggle("fast");
	})
	$.fn.removeLabel = function(){
		var myTs = $(this);
		var myLb =$(this).find("label");
		var myInput = "."+$(this).attr("class") + " input[type=text]";
		var myXbtn = "."+$(this).attr("class") + " input[type=button]";

		var m = true;
		$(document).on("focus",myInput,function(){
			if(m) {
				myLb.hide();
			}		
		});
		$(document).on("blur",myInput,function(){
			console.log(Boolean($(this).val()));
			if($(this).val()) {
				m = false;
			} else {
				myLb.show();				
				m = true;				
			}
		});
				$(document).on("blur",myInput,function(){
			if($(this).val()) {
				m = false;
			} else {
				myLb.show();				
				m = true;				
			}
		});
		$(document).on("click",myXbtn,function(){
			$(myInput).val("");
			myTs.stop().slideUp("fast");
			myLb.show();
			m = true;
		})
	}
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
  if(myObj.find("img").size()>=1) {
  	myObj = myObj.find("img");
  }
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
}		
		
 $.fn.colorCh = function(){
				var myThis = $(this);
      	var myBtn = $("button",myThis);
      	var myUl = $("ul",myThis);
      	var myAtag = $("a",myUl);
       	var ch = function(){
       			if(myUl.is(":hidden") && !myBtn.hasClass("on")) {
       				myBtn.addClass('on');
       			} else {
       				myBtn.removeClass('on');
       			}
				}

				var ch_2 = function(e){
					e.preventDefault();
       		myBtn.removeClass('on');
				}
      	myBtn.on({"click":ch});
      	myAtag.on({"click":ch_2});
    }
$(function(){
	$(".lang_wrap").colorCh();   //부모
})
	     
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
/*사이즈감지*/
 var k = true;
 $(window).on("resize",function(){
      // console.log($(window).width());
      var b = $("body") // 이벤트가발생하고실행되는거라 전역으로 해주면안됨
      var w = $(window).width();
      if(w >= 1024){
      	// $("#gnb").attr({"style":""});
      	// $(".dim_gnb").attr({"style":""});
        b.attr("class","");
        b.addClass("pc");
        }else if(w>=480 && w < 1024){
        b.attr("class","");
        b.addClass("tablet");
      }else{
        b.attr("class","");
        b.addClass("mobile");
      }

 /*로고이미지바꾸기*/
 if($(window).width() <= 800 && k){
 				k = !k;
      	var myImg = $("h1 img")
      	var mySrc = myImg.attr("src");
      	var newSrc = mySrc.replace(".png","_wh.png");
      	myImg .attr("src",newSrc);
      }else if($(window).width() > 800 && !k){
      	k = !k;
      	var myImg = $("h1 img")
      	var mySrc = myImg.attr("src");
      	var newSrc = mySrc.replace("_wh.png",".png");
      	myImg .attr("src",newSrc);
      }
})


/*레이어팝업*/
$.fn.layerPopup = function(){

	var ts = $(this);
	var openLayer = function(e){
		e.preventDefault();
		var url= $(this).attr("href");
		$.get(url,function(data){
			//console.log(data);
			var el_1 = $("<div/>",{"class":"pop_dim"});
			var el_2 = $("<div/>",{"class":"pop_inner_wrap"}).appendTo(el_1);
			var el_3 = $("<div/>",{"class":"pop_inner"}).appendTo(el_2);
			console.log(data);
			el_3.prepend(data);   //데이타 '전'에다가 버튼넣기 appendTo : 후에다가 버튼넣기
			//el_3.append(data);
			$(".pop_dim").remove();
			$(".header_wrapIn").append(el_1)
		});
		$(document).on("click",".btnCloseLayer",function(){
			// alert(1234)
			$(".pop_dim").remove();
		})
	}
	$(document).on("click","a[data-type=layerPopup]",openLayer);
}


$("#gnb").rsGnb({mode:"pc mobile"});
$(window).resize();
$("a[data-type=layerPopup]").layerPopup();

});
/*반응형gnb*/

$.fn.rsGnb = function(opt){
	var mode = opt.mode;
	var ts = $(this);
	var selector = "."+ts.attr("class")+">ul>li>a";
			$(document).on("mouseover focus",selector,function(){
			var myThis = $(this);
			$(this).closest("ul").find(">li>div").filter(":visible").hide(); //비지블 :보여지고있는 유엘 
			$(this).closest("div").find("a.on").removeClass("on");//엔드를한번쓰면 뒤에 비지블 유엘이 없어진 유엘에 접근 두번쓰면 디스에 접근(마지막꺼 제거)
			myThis.next().show();
			$(this).addClass("on");
		});
		var selector2 = "."+ts.attr("class");
		$(document).on("mouseleave",selector2,function(){
			//$(">ul",this).find("div:visible").hide() //비지블 :보여지고있는 유엘 
			$(">ul>li>div",this).filter(":visible").hide()
			$(selector2).find("a.on").removeClass("on");
		});



	$(document).on("click",".open_menu_mobile",function(){
		$(".gnb_wrap").animate({left:0},100)
		$(".dim_gnbwrap").fadeIn("fast");
	})
	$(document).on("click",".mobile_close",function(){
		$(".gnb_wrap").animate({left:"-500px"},100);
		$(".dim_gnbwrap").fadeOut("fast");

	})
}
$(function(){
var whtsBtn = $(".slideToggleBtn");
var whtsWrap = $(".whtsOn_row_wrap1");
	whtsBtn.on("click",function(){
		whtsWrap.stop().slideToggle("fast");
	})
});

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
			        changeMonth: false,
			        changeYear: false,
			        showButtonPanel: false,
			        yearRange: 'c-1:c+1',
			        showOtherMonths: false,
			        selectOtherMonths: false
			    }
		     $("#from,#to,#from_2,#to_2").datepicker();
		     $(".gnb_wrapIn").rsGnb({mode:"pc tablet"});
		     $(".sch_wrap").removeLabel();


})

		     /*달력종료*/			
