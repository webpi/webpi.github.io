$(function(){
	popupS();
	/*menuS();*/
	winPop();
	Accordion();
	customSelect();
	$(".headerInclude").load("includes/header.html");
	//$(".footerInclude").load("include/footer.html");
	$(".lnbInclude").load("includes/lnb.html");
	tab();
	datepicker();
});


$(document).on("click",function(){

});

$(window).resize(function(){

	winPop();

});


$(window).load(function(){

});

$(window).scroll(function(){

});

function tab(){
	$('.tab_arrow').scrollingTabs();
};

function cropS(){
	$(".cropImg").each(function () {
		cropH =  $(this).parent().height();
		imgLink = 'url(' + $(this).attr('src') + ')',
		cropBox = $('<div class="cropBox"></div>');

		$(this).hide();
		$(this).parent().prepend(cropBox);

		cropBox.css({
		  'height'                : cropH,
		  'background-image'      : 'url(' + $(this).attr('src') + ')',
		  'background-size'       : 'cover',
		  'background-repeat'     : 'no-repeat',
		  'background-position'   : '50% 50%',
		  'filter'                : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" +  $(this).attr('src') + ",sizingMethod='scale')",
		  '-ms-filter'            : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +  $(this).attr('src') + "',sizingMethod='scale')",
		});
	});

	$(window).resize(function(){
		$(".cropImg").each(function(){
			cropH =  $(this).parent().height();
			$(this).siblings(".cropBox").css({
			  'height'                : cropH,
			});
		});
	});
}


function datepicker(){

	var datepicker_year = new Date();

	/* datepicker 한국어 세팅 */
	$.datepicker.setDefaults({
		dateFormat: "yy-mm-dd",
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '',
		changeMonth: true,
		changeYear: true,
		buttonImageOnly : false,
		yearRange: (datepicker_year.getFullYear()-90) + ':' + (datepicker_year.getFullYear())
	});

	$(".datepicker").datepicker();

	$(".date_select select").change(function(){
		var changeTxt = $(this).find("option:selected").text();
		$(this).siblings("label").find("span").text(changeTxt);
	});
}

/* selectBox 디자인 커스터마이징 */
function customSelect(){

	$(".selectBox select").change(function(){
		var changeTxt = $(this).find("option:selected").text();
		$(this).siblings("label").find("span").text(changeTxt);
	});

	$(".selectBox select").focus(function(){
		$(this).parent().addClass("focus");
	});

	$(".selectBox select").blur(function(){
		$(this).parent().removeClass("focus");
	});

};

var popupH, popupF;
function popupS(n,m,w,h,o){
	var filter = "win16|win32|win64|macintel|mac|"; // PC 버전 구분

	if(m == "close"){
		$(n).fadeOut(300);

		if ($(n).find(".popupCBoxInS").length) {
			$(n).find(".popupCBoxInS").contents().unwrap();
		}
		if ($("body").hasClass("popup")) {
			$("body").removeClass("popup");
		}
		$(n).hide();

		if( navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				body.style.position = 'static';
				$(document).scrollTop(scrollH);
			}
		}
	}else{
		$(n).show(0,function(){

			popupW = $(n).find(".popup_BoxIn").width();
			popupH = $(n).find(".popup_BoxIn").outerHeight();
			winH = $(window).outerHeight();
			winW = $(window).innerWidth();
			$(n).find(".popupCBoxIn").wrapInner("<div class='popupCBoxInS'></div>");

			if(h == "auto"){
				popH = (winH-100) - $(n).find(".popupH").outerHeight() - $(n).find(".popupF").outerHeight()-30 ;

				if(winH < popupH-100){
					$(n).find(".popup_BoxIn").css({"width" :w, "top" : "5%"});
				}

				$(n).find(".popupCBoxInS").css({"max-height" : popH });
			}

			if(w < winW-100){

				$(n).find(".popup_Box").css({"width":w});

				if(o == "scroll-x"){

					popupW = $(w).selector;
					popupPd = parseInt($(n).find(".popupCBox").css("padding")) * 2;
					scrollW = popupW - popupPd;

					$(n).find(".popupCBoxInS").addClass("scroll-x");
					$(n).find(".popupCBoxInS").css({"width":scrollW});

				}

			}else{

				$(n).find(".popup_Box").css({"width":"95%"});

				if(o == "scroll-x"){

					popupPd = parseInt($(n).find(".popupCBox").css("padding")) * 2;
					scrollW = winW - popupPd;

					$(n).find(".popupCBoxInS").addClass("scroll-x");
					$(n).find(".popupCBoxInS").css({"width":scrollW});

				}
			}

			$("body").addClass("popup");
			if( navigator.platform){
				if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
					$("body").css("position","fixed");
				}
			}
		});
	}

	$(window).resize(function(){
		popupW = $(n).find(".popup_BoxIn").width();
		popupH = $(n).find(".popup_BoxIn").outerHeight();
		winH = $(window).outerHeight();
		winW = $(window).outerWidth();

		if(h == "auto"){
			popH = (winH-100) - $(n).find(".popupH").outerHeight() - $(n).find(".popupF").outerHeight()-30 ;

			if(winH < popupH-100){
				$(n).find(".popup_BoxIn").css({"width" :w, "top" : "5%"});
			}

			$(n).find(".popupCBoxInS").css({"max-height" : popH });
		}

		if(w < winW-100){

			$(n).find(".popup_Box").css({"width":w});

			if(o == "scroll-x"){

				popupW = $(w).selector;
				popupPd = parseInt($(n).find(".popupCBox").css("padding")) * 2;
				scrollW = popupW - popupPd;

				$(n).find(".popupCBoxInS").addClass("scroll-x");
				$(n).find(".popupCBoxInS").css({"width":scrollW});

			}

		}else{

			$(n).find(".popup_Box").css({"width":"95%"});

			if(o == "scroll-x"){

				popupPd = parseInt($(n).find(".popupCBox").css("padding")) * 2;
				scrollW = (winW * 0.95) - popupPd;

				$(n).find(".popupCBoxInS").addClass("scroll-x");
				$(n).find(".popupCBoxInS").css({"width":scrollW});
			}
		}
	});
}

function winPop(){
	popH = $(window).outerHeight() - parseInt($(".windowPopH").outerHeight()) - parseInt($(".windowPopBtn").outerHeight());
	$(".windowPopBox").css("height",popH-80 + "px");
	$(".windowPopBox").closest("html").css({
		"overflow"		:	"hidden",
		"background"	:	"#fff",
	});
}

function tab(){
	$('.tab_arrow').scrollingTabs();
};

function tabsClick(targetClass, targetId, obj , option){

	$(obj).parent("li").siblings("li").removeClass("active");
	$(obj).parent("li").addClass("active");
	$("." + targetClass).removeClass("active");
	$(targetId).addClass("active");

}

function Accordion() {

	$(document).on('click', ".Accordion .titBox > a", function () {
		if ($(this).closest(".AccordionIn").hasClass("active")) {

			$(this).closest(".AccordionIn").removeClass("active");
			$(this).parent(".titBox").siblings(".contentsBox").slideUp(450);

		} else {

			$(this).closest(".AccordionIn").addClass("active");
			$(this).parent(".titBox").siblings(".contentsBox").slideDown(450);

		}
	});
}
