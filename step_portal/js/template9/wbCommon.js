$(document).ready(function() {
	
	/* 퍼블을 위한 임시 스크립트 */
	$(".headerInclude").load("include/header.html");
	$(".footerInclude").load("include/footer.html");

	/* 퍼블을 위한 임시 스크립트 */

	scoreS();
	popupS();	
	menuS();
	buttonS();
	cropS();
	tab();
	customSelect();
	Accordion();
	datepicker();
	menu_fixed();

});

$(window).resize(function(){

	/* 새창 팝업 리사이즈 */
	winPop();
	
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

	if(pageW > 1199){

		$("html").removeClass("active");
		$("body").removeClass("mob").removeClass("active").addClass("pc");
		$(".header").removeClass("active");
		$(".headerLayout .trans_bg").hide();
		$(".header .gnb .twoDepth").show();
		
	}else{
		$("body").removeClass("pc").addClass("mob");
	}

});


$(window).scroll(function(){

	menu_fixed();

});


// 상단 배너 스크립트
function indexBanner(){

	if(getCookie("topBanner") != 'done') { // 쿠키가 없을때

		$(".top_banner").show();
		$(".service_membership").find(".banner_cnt").addClass("active");
		$(".main_Pop_wrap").addClass("top");
	}

	$('.top_banner_slider').slick({

		slidesToShow: 2,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		customDots: true,
		speed: 1000,
		prevArrow: '#top_banner_paging .prevBtn',
		nextArrow: '#top_banner_paging .nextBtn',
		focusOnSelect: true,
		dots: true,
		dotsClass: 'control_paging',
		customPaging: function (slider, i) {
			return $('<button type="button" />').text(i + 1);
		},
		responsive: [
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
		]
	});

	var topBnL = $('.top_banner_slider .slick-slide').length;

	if("2" >= topBnL){

		$(".top_bannerIn").addClass("alone");

	}

	menu_resize();

	$(window).resize(function () {
		menu_resize();
	});


	/* 배너 컨트롤러 스크립트 */
	$(document).on('click', ".btn_control", function () {

		if($(this).hasClass("btn_pause")){

			$(this).closest('.pagination').siblings('.slick-slider').slick('slickPause');
			$(this).removeClass("btn_pause").addClass("btn_play");
			$(this).text("시작");

		}else {

			$(this).closest('.pagination').siblings('.slick-slider').slick('slickPlay');
			$(this).removeClass("btn_play").addClass("btn_pause");
			$(this).text("정지");

		}
	});

	$(document).on('click', ".tob_banner_btnBox .btn_close", function () {

		TopBnClose();

	});

	$(document).on('click', ".tob_banner_btnBox .btn_today", function () {

		setCookie("topBanner", 'done', 1);
		TopBnClose();

	});

	$('.mainBanner').slick({

		infinite: true,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		customDots: true,
		arrows: true,
		prevArrow: '<div class="slick-prev">이전</div>',
		nextArrow: '<div class="slick-next">다음</div>',
		dots: true,
		dotsClass: 'main_paging',
		customPaging: function (slider, i) {
			return  '<span class="now_num">' + (i + 1) + '</span>' + '/' + '<span class="all_num">' + slider.slideCount + '</span>';
		}

	});
}


function topBn(){

	if($(".top_banner").length > 0) { // top_banner 객체 여부 판단

		var display = $(".top_banner").css('display'); // 탑 배너 display 여부 파악

		if (display == "none"){

			if(getCookie("topBanner") != 'done') {

				TopBnOpen();

			}else{

				TopBnOpen();

				var bannerH = $(".top_banner").innerHeight();
				$(".headerLayout").css('top',bannerH);
				$('.top_banner_slider').slick('refresh');

			}

		} else {

			TopBnClose();

		}

	}
}

function TopBnOpen(){

	$(".top_banner").find('.slick-slider').slick('slickPlay'); // 슬라이더 정지
	$(".top_banner").show();
	$(".headerLayout").removeClass("top");
	$(".main_Pop_wrap").addClass("top");
	$(".service_membership").find(".banner_cnt").addClass("active");

}

function TopBnClose(){

	$(".top_banner").find('.slick-slider').slick('slickPause'); // 슬라이더 정지
	$(".top_banner").hide();
	$(".headerLayout").addClass("top");
	$(".main_Pop_wrap").removeClass("top");
	$(".service_membership").find(".banner_cnt").removeClass("active");

}

function menu_resize(){

	var display = $(".top_banner").css('display'); // 탑 배너 display 여부 파악

	if (display == "block") {

		var bannerH = $(".top_banner").innerHeight();

		$(".headerLayout").css('top',bannerH);

	}
}


function menu_fixed(){

	var scrollT = $(document).scrollTop();

	if($(".top_banner").css("display") == "none") {

		var headerH = $(".headerLayout").height();

		if(scrollT > headerH){

			$(".headerLayout").addClass("fixed");

		}else{

			$(".headerLayout").removeClass("fixed");

		}

	}else{

		var bannerH = $(".top_banner").height();

		if(scrollT > bannerH){

			$(".headerLayout").addClass("fixed");

		}else{

			$(".headerLayout").removeClass("fixed");

		}
	}
}


function getCookie(name) {
	var nameOfCookie=name+"=";
	var a=0;
	while(a<=document.cookie.length) {
		var b=(a+nameOfCookie.length);
		if(document.cookie.substring(a,b)==nameOfCookie) {
			if((endOfCookie=document.cookie.indexOf(";",b))==-1)
				endOfCookie=document.cookie.length;
			return unescape(document.cookie.substring(b,endOfCookie));
		}
		a=document.cookie.indexOf(" ",a) +1;
		if(a==0)
			break;
	}
	return "";
}


function setCookie(name, value, expiredays){
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}


function menuS(){	
	
	pageW = $("body").innerWidth();
	windowH = $(window).height();
	pageH = $("body").height();


	if(pageH > windowH){
		pageW = pageW+17;
	}else{
		pageW = pageW;
	}
	
	if(pageW > 1199){
		$("body").addClass("pc");
		
	}else{
		$("body").addClass("mob");
	}
	
	$(document).on('mouseenter focus',"body.pc .header .nav .gnb li",function(e){

		$(".nav").addClass("active");
		
	});

	$(document).on('mouseenter focus',"body.pc .header .nav .gnb .twoDepth li",function(e){

		$(".nav").addClass("active");
		
	});


	$(document).on('mouseleave',".header",function(e){
		
		$(".nav").removeClass("active");
		
	});


	$(document).on('focus',".main_contentLayout",function(e){

		$(".nav").removeClass("active");

	});

	$(document).on('focus',".sub_visual",function(e){
		
		$(".nav").removeClass("active");
		
	});
		
	$(document).on('click',"body.mob .nav .gnb > li > a",function(e){
		
		var on = $(this).closest("li");
		var twoDep = $(this).siblings(".twoDepth");
		
		if(on.hasClass("active")){
			
			on.removeClass("active");
			twoDep.slideUp();
						
		}else{
			
			on.addClass("active");
			twoDep.slideDown();
			
		}
		
	});
	
	
	$(document).on('click',"body.mob .mob_menu",function(e){
		
		if($(".mobMenuAll").hasClass("active")){
			
			$("html").removeClass("active");
			$(".headerLayout .header").removeClass("active");
			$(".headerLayout .trans_bg").hide();
			
		}else{
			
			$("html").addClass("active");
			$(".headerLayout .header").addClass("active");
			$(".headerLayout .trans_bg").show();
		}
		
	});
	
	
	$(document).on('click',"body.mob .trans_bg , body.mob .mob_menu_close",function(e){
	
		$("html").removeClass("active");
		$(".header").removeClass("active");
		$(".headerLayout  .trans_bg").hide();
		
	});
	
	$(document).on('focus',".sub_contentLayout",function(e){
		
		$("html").removeClass("active");
		$(".header").removeClass("active");
		$(".header .trans_bg").hide();
		
	});
}


function scoreS(){

	$(".star_score").each(function(){

		var score = Math.round($(this).find(".num").text()) * 20 + "%";

		$(this).find(".point").css("width",score);

	});
}


function cropS(){
	$(".cropImg").each(function () {

		cropW =  $(this).parent().width();
		cropH =  $(this).parent().height();
		imgW = $(this).width();
		imgH = $(this).height();


		imgLink = 'url(' + jQuery(this).attr('src') + ')',
		cropBox = jQuery('<div class="cropBox"></div>');

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


var popupH, popupF;
function popupS(n,m,w,h){
	var filter = "win16|win32|win64|macintel|mac|"; // PC 버전 구분
	if(m == "close"){
		$(n).fadeOut(300);
		$("body").removeClass("popup");
		if( navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				$("body").css("position","static");
				$(document).scrollTop(scrollH);
			}
		}
	}else{
		$(n).show(0,function(){
			popupW = $(n).find(".popup_BoxIn").width();
			popupH = $(n).find(".popup_BoxIn").outerHeight();
			winH = $(window).outerHeight();
			winW = $(window).outerWidth();
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
			}else{
				$(n).find(".popup_Box").css({"width":"95%"});
			}

			scrollH = $(document).scrollTop();
			
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
		}else{
			$(n).find(".popup_Box").css({"width":"95%"});
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

	if(options.markUse == "none"){
		tN.find(".mark").html("");
	}

	function tnSet(){
		pageW = jQuery(window).width();

		if(pageW > 640){
			barHeight = options.barHeight;
			margin = options.margin;
		}else{
			barHeight = options.barHeight/2;
			margin = options.margin/2;
		}
		tN.css("margin", margin +"px");

		if(options.type == "horizontal"){
			tN.find(".progress li").each(function(index){
				listData = jQuery(this).find(".data").text();
				thisW = jQuery(this).closest(".chart").outerWidth();
				listN = 100/ (tN.find(".mark").children("li").length-1);
				jQuery(this).find(".bar").css("width",(thisW * ((listData*listN)/options.markInterval))/100 - 4 + "px");
			});
		}else{
			tN.find(".bar").css("width", barHeight + "px");
			if(options.type=="vertical"){
				tN.find(".progress li").each(function(index){
					proNum = jQuery(this).find(".progressBox").length;
					jQuery(this).find(".progressBox").css("margin","0 0 0 " + "-" + (proNum*(barHeight) / 2) + "px");
					jQuery(this).find(".progressWrap").css("width",(proNum*barHeight) + (proNum-1)*10 + "px");
				});


			}

		}
	}

	tnSet();
}





