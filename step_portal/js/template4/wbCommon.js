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
	searchForm();
	headerMobile();
	btnPageTop();
	popupS();	
	cropS();
	tab();
	customSelect();
	Accordion();
	datepicker();
	winPop();
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
		focusOnSelect: true,
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

// 통합검색
function searchForm() {
	var searchInput = $(".js-search-input");
	var searchInputIstyle = $(".js-search-input-istyle");
	var searchInputFocus  = $(".js-search-input-focus");
	var btnSearchClose = $(".js-btn-search-clse");

	searchInputIstyle.on("click", function() {
		searchInput.addClass("is-on");
		searchInputFocus.fadeIn();
	});

	// 자동검색 닫기
	function searchClose() {
		searchInputIstyle.blur();
		searchInputFocus.fadeOut();
		searchInput.removeClass("is-on");
	}

	searchInput.on("mouseleave", function() {
		searchClose();
	});

	btnSearchClose.on("click", function() {
		searchClose();
	});
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

	headerMobileBtn.on("click", function() {
		$(this).closest(headerMobileItem).siblings().removeClass("is-active").find(headerMobileMenu).slideUp("fast");

		$(this).closest(headerMobileItem).addClass("is-active").find(headerMobileMenu).slideDown("fast");
	});

	// 열기
	$(".header .btn-user-menu").on("click", function (e) {
		e.stopPropagation();
		$("html").addClass("is-scroll");
		headerMobile.addClass("is-on");
	});

	// 이벤트 버블링 방지
	headerMobileWrap.on("click", function (e) {
		e.stopPropagation();
	});

	// 닫기
	$(".btn-header-mobile-clse").on("click", function () {
		headerMobile.removeClass("is-on");
		$("html").removeClass("is-scroll");
	});
	$(document).on("click", function() {
		if (headerMobile.hasClass("is-on")) {
			headerMobile.removeClass("is-on");
			$("html").removeClass("is-scroll");
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
	// 페이지 상단으로
	btnPageTop();

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
		$(".headerLayout .trans_bg").hide();
		$(".header .gnb .twoDepth").show();
		
	}else{
		$("body").removeClass("pc").addClass("mob");
	}

});

$(window).on("scroll", function(){
	// 헤더 스크롤
	headerFixed();

	// 페이지 상단으로
	btnPageTop();
});

function write(){
	
	$(".table_hori.write tbody tr td.mobF").attr("colspan","2");	
	
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
		$(".cropBox").each(function(){
			cropH =  $(this).parent().height();
			$(this).height(cropH);
		});
	});
}

/* 공통 datepicker  */
function datepicker(){

	var datepicker_year = new Date();

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

/* selectBox 디자인 커스터마이징 */
function customSelect(){

	$(".selectBox select").change(function(){
		var changeTxt = $(this).find("option:selected").text();
		$(this).siblings("label").find("span").text(changeTxt);
	});

	$(".selectBox").each(function () {

		if ($(this).hasClass("disabled")) {

			$(this).find("select").attr('disabled', 'true');

		}

	});
};
