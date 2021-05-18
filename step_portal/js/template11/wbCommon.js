$(document).ready(function() {
	/* 퍼블을 위한 임시 스크립트 */
	$(".headerInclude").load("include/header.html");
	$(".footerInclude").load("include/footer.html");
	$(".lnbInclude").load("include/lnb.html");
	/* 퍼블을 위한 임시 스크립트 */
	
	// 페이지 상단으로
	$(document).on("click", ".js-btn-page-top", function (e) {
		if ("" !== this.hash) {
			e.preventDefault();

			var pageTopHash = this.hash;

			$("html, body").animate({
				scrollTop: $(pageTopHash).offset().top
			}, 500);
		}
	});
	
	headerFixed();
	bannerTop();
	gnbFocus();
	mobLnb();
	searchForm();
	headerMobile();
	sliderControl();
	scoreS();
	popupS();	
	buttonS();
	cropS();
	tab();
	customSelect();
	Accordion();
	datepicker();
	btnPageTop();
});

// 상단 배너
function bannerTop() {
	var bannerTop = $(".banner-top");
	var bannerTopSlider = $(".banner-top .banner-slider");

	if (bannerTop.length) {
		if(getCookie("topBanner") != 'done') { // 쿠키가 없을때
			bannerTop.show();
		} else {
			bannerTop.hide();
		}
	}

	bannerTopSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		customDots: true,
		speed: 1000,
		autoplaySpeed: 5000,
		fade: true,
		prevArrow: '.banner-top .btn-banner-top-prev',
		nextArrow: '.banner-top .btn-banner-top-next',
		dots: true,
		dotsClass: 'control_paging',
		customPaging: function (slider, i) {
			return  '<span class="now_num">' + (i + 1) + '</span>' + '/' + '<span class="all_num">' + slider.slideCount + '</span>';
		},
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					customDots: true,
					arrows: false,
					prevArrow: null,
					nextArrow: null,
					customPaging: function (slider, i) {
						var i = i + 1;
						return $('<button type="button" class="btn-banner-top-dot"><span class="ir">' + i + '</span></button>');
					}
				}
			},
		]
	});

	// 배너 컨트롤
	$(document).on("click", ".banner-top .btn_control", function () {
		if ($(this).hasClass("btn_pause")){
			$(this).closest(".pagination").siblings(".slick-slider").slick('slickPause');
			$(this).removeClass("btn_pause").addClass("btn_play");
			$(this).text("시작");
		} else {
			$(this).closest(".pagination").siblings(".slick-slider").slick("slickPlay");
			$(this).removeClass("btn_play").addClass("btn_pause");
			$(this).text("정지");
		}
	});

	$(document).on("click", ".banner-top .btn-banner-clse", function () {
		var todayBannerClse = $(".banner-top .banner-clse .icheck-input");

		bannerTopSlider.find(".slick-slider").slick('slickPause');
		// console.log(todayBannerClse.is(":checked"));
		if (todayBannerClse.is(":checked")) {
			setCookie("topBanner", 'done', 1);
			bannerTop.hide();
		} else {
			bannerTop.hide();
		}
	});
}

// 슬라이더 컨트롤
function sliderControl() {
	$(".social-main .social-people-slider").each(function() {
		var _this = $(this);
		if (_this.children().length === 1) {
			_this.parent().find(".btn-social-step-control").hide();
		}
	});

	$(document).on("click", ".btn-slider-pause", function() {
		$(this).parent().find(".slick-slider").slick("slickPause");
		$(this).toggleClass("btn-slider-play btn-slider-pause");
		$(this).children().text("시작");
	});

	$(document).on("click", ".btn-slider-play", function() {
		$(this).parent().find(".slick-slider").slick("slickPlay");
		$(this).toggleClass("btn-slider-pause btn-slider-play");
		$(this).children().text("정지");
	});
}

// gnb focus
function gnbFocus() {
	var btnGnb = $(".gnb .btn-gnb");

	btnGnb.on("focus", function () {
		$(this).addClass("is-focus").siblings().removeClass("is-focus");
	});

	btnGnb.on("mouseout", function () {
		btnGnb.removeClass("is-focus");
	});
}

function mobLnb(){

	$(document).on("click", ".lnb ul li.active", function() {

		var lnb_list = $(this).parent("ul");

		if (lnb_list.hasClass("active")) {

			lnb_list.removeClass("active");

		} else {

			lnb_list.addClass("active");

		}

	})
}

// 통합검색
function searchForm() {
	var searchInput = $(".js-search-input");
	var searchInputIstyle = $(".js-search-input-istyle");
	var searchInputFocus  = $(".js-search-input-focus");
	var searchListItem = searchInputFocus.find(".search-list-item");
	var btnSearchClose = $(".js-btn-search-clse");

	searchInputIstyle.on("click", function() {
		searchInput.addClass("is-on");
		searchInputFocus.fadeIn();
	});


	// 자동검색 닫기
	function searchClose() {
		index = 0;
		searchInputIstyle.attr("aria-expanded", "false");
		searchInputIstyle.blur();
		searchInputFocus.fadeOut();
		searchInput.removeClass("is-on");
		selectItem();
	}

	searchInput.on("mouseleave", function() {
		searchClose();
	});

	btnSearchClose.on("click", function() {
		searchClose();
	});

	function selectItem() {
		searchListItem.attr("id", "");
		searchListItem.attr("aria-selected", "false");
		searchListItem.eq(index).attr("id", "ac-list-selected");
		searchListItem.eq(index).attr("aria-selected", "true").focus();
		var searchNm = searchListItem.eq(index).text();
		jQuery(".js-search-input").find('input').val(searchNm);
	}

	function lastItem(){
		index = 0;

		selectItem();
		return false;
	}

	// 키보드 접근
	var index = 0;
	function searchInputKeyboard() {
		searchInput.on("keydown", function (e) {
			var key = e.keyCode || e.which;
			var searchListSum = searchInputFocus.find(".search-list-item").length;

			if (searchListSum >= 0) {
				searchInputIstyle.attr("aria-expanded", "true");

				// 다운
				if (key === 40 || key === 9) {
					e.preventDefault();
					index++;

					if (index >= searchListSum) {
						lastItem();
					} else {
						selectItem();
					}
				} else if (key === 38) {
					e.preventDefault();
					// 업
					index--;
					if (index < 0) {
						searchClose();
					} else {
						selectItem();
					}
				} else if (key === 27) {
					// esc
					searchClose();
				} else if (key === 13) {
					doUnifiedSerach();
				}
			}
		});

		searchListItem.on("focus mouseover", function() {
			searchListItem.attr("id", "");
			searchListItem.attr("aria-selected", "false");
			$(this).attr("id", "ac-list-selected");
			$(this).attr("aria-selected", "true");
		});
	} searchInputKeyboard();
}

// 헤더 스크롤
function headerFixed() {
	var bannerTop = $(".banner-top");
	var headerElm = $(".header");
	var headerIn = $(".header .header-in");
	var containerElm = $(".container");
	var subVisual = $(".sub_visual");
	var scrollT = $(window).scrollTop();

	if(document.currentScript === undefined){
		var headerHeight = $(".header").height();

		// IE
		if (bannerTop.is(":visible")) {
			var bannerTopHeight = bannerTop.height();

			if (scrollT > bannerTopHeight){
				headerElm.addClass("ie-header-fixed");
				containerElm.css("margin-top", headerHeight);
				subVisual.css("margin-top", headerHeight);
			} else {
				headerElm.removeClass("ie-header-fixed");
				containerElm.css("margin-top", 0);
				subVisual.css("margin-top", 0);
			}
		} else {
			if (scrollT > 0) {
				headerElm.addClass("ie-header-fixed");
				containerElm.css("margin-top", headerHeight);
				subVisual.css("margin-top", headerHeight);
			} else {
				headerElm.removeClass("ie-header-fixed");
				containerElm.css("margin-top", 0);
				subVisual.css("margin-top", 0);
			}
		}
	} else {
		// IE 아닐때
		if (bannerTop.is(":visible")) {
			var bannerTopHeight = bannerTop.height();

			if (scrollT > bannerTopHeight){
				headerIn.addClass("header-fixed");
			} else {
				headerIn.removeClass("header-fixed");
			}
		} else {
			if (scrollT > 0) {
				headerIn.addClass("header-fixed");
			} else {
				headerIn.removeClass("header-fixed");
			}
		}
	}
}

// 모바일 메뉴
function headerMobile() {
	var headerMobile = $(".header-mobile");
	var headerMobileWrap = $(".header-mobile-wrap");
	var headerMobileBtn = $(".header-mobile-tit");
	var headerMobileItem = $(".header-mobile-item");
	var headerMobileMenu = $(".header-mobile-menu");

headerMobileBtn.on("click focus focusin", function() {
		$(this).closest(headerMobileItem).siblings().removeClass("is-active").find(headerMobileMenu).slideUp("fast");

		$(this).closest(headerMobileItem).addClass("is-active").find(headerMobileMenu).slideDown("fast");
	});

	// 열기
	$(".header .btn-user-menu").on("click", function (e) {
		e.stopPropagation();
		$("html").addClass("is-scroll");
		headerMobile.attr("tabindex", "0");
		headerMobile.attr("aria-modal","true");
		headerMobile.attr("aria-hidden","false");
		headerMobile.show(100, function () {
			headerMobile.addClass("is-on");
		});

		setTimeout(function(){
			headerMobile.find("a, button, input, select").first().focus();
		}, 300);
	});
	
	// 이벤트 버블링 방지
	headerMobileWrap.on("click", function (e) {
		e.stopPropagation();
	});

	// 모바일 gnb 탭 루프
	headerMobile.find("a, button, input, select").first().on("keydown", function(e) {
		if (e.shiftKey && (e.keyCode || e.which) === 9) {
			e.preventDefault();
			headerMobile.find("a, button, input, select").last().focus();
		}
	});
	headerMobile.find("a, button, input, select").last().on("keydown", function(e) {
		if ((e.keyCode || e.which) === 9) {
			e.preventDefault();
			headerMobile.find("a, button, input, select").first().focus();
		}
	});

	// 닫기
	$(".btn-header-mobile-clse").on("click", function () {
		headerMobile.removeClass("is-on").hide("slow");
		headerMobile.attr("aria-modal", "false");
		headerMobile.attr("aria-hidden","true");
		$("html").removeClass("is-scroll");
		$(".header .btn-user-menu").focus();
	});
	$(document).on("click", function() {
		if (headerMobile.hasClass("is-on")) {
			headerMobile.removeClass("is-on").hide("slow");
			headerMobile.attr("aria-modal", "false");
			headerMobile.attr("aria-hidden","true");
			$("html").removeClass("is-scroll");
			$(".header .btn-user-menu").focus();
		}
	});
}

// 페이지 상단으로
function btnPageTop() {
	var docScrollTop = $(document).scrollTop();

	if ($(window).width() < 1200 && docScrollTop > 70) {
		$(".js-btn-page-top").fadeIn();
	} else {
		$(".js-btn-page-top").fadeOut();
	}
}

// 한자리 숫자 0 붙이기
function numberPad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

$(window).on("resize", function(){
	/* 새창 팝업 리사이즈 */
	winPop();

	// 페이지 상단으로
	btnPageTop();
	
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

$(window).on("scroll", function(){
	// 헤더 스크롤
	headerFixed();

	// 페이지 상단으로
	btnPageTop();
});

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

		$(this).remove();
	});

	$(window).resize(function(){
		$(".cropBox").each(function(){
			cropH =  $(this).parent().height();
			$(this).height(cropH);
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
function popupS(n,m,w,h,o){
	var filter = "win16|win32|win64|macintel|mac|"; // PC 버전 구분

	if(m == "close"){
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





