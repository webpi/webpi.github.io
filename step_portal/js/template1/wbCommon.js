$(document).ready(function() {
	popupS();
});

$(window).resize(function(){
	
	pageW = $("body").innerWidth();
	windowH = $(window).height();
	pageH = $("body").height();

	if(pageH > windowH){
		if($("body").hasClass("active")){
			pageW = pageW;
		}else{
			pageW = pageW+17;
		}
	}else{
		pageW = pageW;
	}

	if (pageW > 1199){
		$("html").removeClass("active");
		$("body").removeClass("mob").removeClass("active").addClass("pc");
		$(".header-mobile").removeClass("is-on");
		$("html").removeClass("is-scroll");

	} else {
		$("body").removeClass("pc").addClass("mob");


	}
});

/* 공통 popup  */
var popupH, popupF;
function popupS(n,m,w,h,o){
	var filter = "win16|win32|win64|macintel|mac|"; // PC 버전 구분

	if(m == "close"){
		$(n).fadeOut(300);

		var body = document.querySelector('body');

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
		//popupRe();
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
	$(".windowPopBox").closest("html").css("overflow","hidden");
}

function tabsClick(targetClass, targetId, obj , option){

	$(obj).parent("li").siblings("li").removeClass("active");
	$(obj).parent("li").addClass("active");
	$("." + targetClass).removeClass("active");
	$(targetId).addClass("active");

	// 전체 보기
	if (targetId === "#tabAll") {
		$("." + targetClass).removeClass("active").addClass("active");
	}

}

function tab(){
	$('.tab_arrow').scrollingTabs();
};

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

function buttonS(){

	$(".btn_like").click(function(){

		if($(this).hasClass("active")){

			$(this).removeClass("active");

		}else{

			$(this).addClass("active");

		}
	});
}

jQuery.fn.chart = function(options){
	var defaults = {
		type : 'horizontal', // horizontal, vertical
		margin : 40,
		speed :    3000, // bar animation speed
		speedTurm : 1000, // bar animation turm speed
		height :    200, // chart height
		barHeight : 20,  // bar height, 짝수만
		// 기준점
		markStart : 0, // 기준점 시작
		markEnd : 500, // 기준점 마지막
		markInterval : 100, // 기준점 간격
	}

	if (options.markEnd > 30){

		options.markEnd = 50;
		options.markInterval = 5;

	}else if(30 >= options.markEnd && options.markEnd >= 21){

		options.markEnd = 30;
		options.markInterval = 3;

	}else if(20 >= options.markEnd && options.markEnd >= 11){

		options.markEnd = 20;
		options.markInterval = 2;

	}else{

		options.markEnd = 10;
		options.markInterval = 1;

	}

	var options = jQuery.extend(defaults, options);
	var tN = jQuery(this);


	var dataH = tN.find(".data").css("font-size");
	dataH = dataH.replace(/[^0-9]/g,"");
	tN.find(".chartIn").prepend("<ul class='mark'>");
	var markNum = (options.markEnd/options.markInterval)+1;

	if(options.type == "horizontal"){
		tN.addClass("horizontal");
		for(var i = 0; i < markNum; i++) {
			markValue = options.markInterval*i ;
			if(i==0) {
				tN.find(".mark").append("<li><span>" + options.markStart + "</span></li>");
			}else {
				tN.find(".mark").append("<li><span>" + markValue + "</span></li>");
			}
		}
		listN = 100/ (tN.find(".mark").children("li").length-1);
		tN.find(".mark li").each(function(index){
			markW = jQuery(this).find("span").outerWidth();
			jQuery(this).find("span").css({
				"margin"    :     "0 -" + markW/2 + "px 0 0"
			});
		});

		tN.find(".progress li").each(function(index){
			speedTurm = (options.speed+(options.speedTurm * index))/1000;
			jQuery(this).find(".bar").css("transition","width " + speedTurm +"s ease");
		});
		tN.find(".bar").css("height",options.barHeight + "px");
		tN.find(".data span").css("line-height", options.barHeight + "px");
		tN.find(".chartIn").append("</ul>");
		tN.append("</div>");
		tN.find(".mark li:last-child").addClass("last");
		tN.css({
			"height"   :   options.height+"px",
		});

	}else {

		tN.addClass("vertical");
		tN.find(".progress").wrap("<div class='lineBox'></div>");
		tN.find(".progress").wrap("<div class='lineBoxIn'></div>");
		tN.find(".lineBox").append("<ul class='line'>");

		for(var i = 0; i < markNum; i++) {
			markValue = options.markInterval*i ;
			if(i==0) {
				tN.find(".mark").prepend("<li><span>" + options.markStart + "</span></li>");
			}else {
				tN.find(".mark").prepend("<li><span>" + markValue + "</span></li>");
			}
			tN.find(".line").prepend("<li></li>");
			tN.find(".line li:last-child").addClass("last");
		}
		tN.find(".chartIn").append("</div></div></ul>");
		listN = (tN.find(".mark").children("li").length-1);
		tN.find(".mark li, .line li").css("height", 100/listN + "%");

		markH = tN.find(".mark li span").css("font-size");
		markH = markH.replace(/[^0-9]/g,"");
		// tN.find(".mark li span").css("top", "-" + markH/2 + "px");

		if(options.type == "vertical"){
			jQuery(document).ready(function(){
				tN.find(".progress li .progressBox").each(function(index){
					proNum = jQuery(this).index() + 1;
					speedTurm = (options.speed+(options.speedTurm * index))/1000;
					jQuery(this).find(".bar").css("transition", "height " + speedTurm +"s ease");
					listData = jQuery(this).find(".data").text();
					thisH = (options.height/listN)/options.markInterval;
					jQuery(this).find(".bar").css({
						"height" : (thisH * listData) + "px",
						"max-height" : options.height + "px"
				    });
				});
			});

			// tN.find(".bar").append("<span class='triangle'></span>");

		}else{
			tN.addClass("multiBar");

			var newArr = [];

			tN.find(".progress li .progressBox").each(function(index){
				listData = jQuery(this).find(".data").text();
				thisH = (options.height/listN)/options.markInterval;
				sumH = thisH*listData;
				indexN = jQuery(this).index();

				newArr.push(sumH);
				var newArrV = newArr.reduce((function(pre, value, idx, arr){
					return pre + value;
				}));

				if(jQuery(this).find(".data").text() == "0"){
					jQuery(this).css({
						"position"		:	"absolute",
						"text-indent"	:	"-9999px",
					});
				}

				if(indexN == 0){

				}else{
					jQuery(this).css("bottom", newArrV-newArr[indexN] + "px");
					if(jQuery(this).parent().find(".progressBox").length == indexN+1){
						newArr = [];
					}
				}

				jQuery(this).find(".bar").css({
					"height"			:	sumH + "px",
				});

				dataH = jQuery(this).find(".data").outerHeight()/2;
				jQuery(this).find(".data span").css({
					"margin"		:		"0 0 0 " + (options.barHeight+8) + "px",
					"position"		:		"relative",
					"z-index"		:		"1",
					"top"			:		(sumH/2) + (dataH/2) + 2 + "px",
				});


				if(listData < "3"){
					jQuery(this).find(".data span").css("top", (sumH/2) + (dataH/2)-2 + "px");
				}

			});

			tN.find(".progressBox").css("overflow","inherit");

			jQuery(document).ready(function(){
				tN.find(".progress li").each(function(index){
					speed = options.speed/1000;
					speedTurm = options.speedTurm/1000;
					jQuery(this).find(".progressWrap").css({
						"height"		:		options.height + 30 + "px",
						"transition"	:		"height " + speed + "s ease " + speedTurm*(index+1) + "s",
						"width"			:		options.barHeight*3 + "px",
						"margin"		:		"0 0 0 " + -(options.barHeight/2) + "px",
					});
				});
			});

		}
		dataH = parseInt(tN.find(".data").css("font-size"));
	}

	tN.find(".chartIn").append("</ul>");
	tN.append("</div>");
	tN.find(".mark li:last-child").addClass("last");
	tN.css({
		"height"   :   options.height+"px",
	});

}
