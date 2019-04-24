$(document).ready(function () {
	placeholder();
	tipLayer();
	tipLayer2();
	init_tabs();
	clseLayer();
	billLayer();

	/* gnb */
	$("#gnb .nav > li").mouseover(function(){
		$("#gnb .nav li").removeClass("on");
    	$(this).addClass("on");
    	$(this).find(".sub").addClass("active");
	}).mouseout(function() {
	    $("#gnb .nav li").removeClass("on");
	    $("#gnb .nav li").find(".sub").removeClass("active");
	});

	if ($(".bxslider").length > 0) {
		/* 메인 슬라이드 배너 */
	   	$(".section-index .adv-main .bxslider").bxSlider({
	        pagerCustom: ".carousel",
	        nextSelector: '#slider-next',
	  		prevSelector: '#slider-prev'
	    });

	   	var i = 0;
	   	$("#js-bxslider li").each(function (){
	   		if(!$(this).hasClass("bx-clone")){
	   			$("#js-carousel").append(
		   			$("<a></a>").attr("data-slide-index",i).prop({"title":"slide-"+i, "href":"#"}).append(
		   				$("<span></span>").prop("class", "ir").text(i+1)
		   			)
		   		);
		   		i++;
	   		}   		
	    });

	    $("#js-carousel a:first").addClass("active");

	    /* 메인 슬라이드 배너2 */
	   	$(".section-index .adv-sub .adv-lft .bxslider").bxSlider({
	   		nextSelector: '#slider-adv-rgt-prev',
	  		prevSelector: '#slider-adv-rgt-next'
	    });

	    /* 메인 제휴사 배너 */
	   	$(".section-index .affiliated-company .bxslider").bxSlider({
	   		auto : true,
	   		autoStart : true,
	   		minSlides: 1,
	  		maxSlides: 7,
	  		slideWidth: 142,
	  		moveSlides : 1,
	  		autoHover : true,
	  		autoControls : true,
	  		speed : 1000
	    });

	    /* snb 추천 알뜰폰 */
	   	$("#snb .recom .bxslider").bxSlider({
	        nextSelector: '#slider-next',
	  		prevSelector: '#slider-prev',
	  		autoHover : true,
	  		pager : false
	    });
	}

    /* 상품 이미지 갤러리 */
    $(".product .photo .thumb-list li").on("click", ".thumb img", function() {
		img_url = $(this).attr("src");
		$(".product .photo .photo-view img").attr("src",img_url);
	});
});

/* label 인터렉션 */
function placeholder() {
	var o = $(".placeholder");
	o.find("input").attr("autocomplete","off");

    o.focusin(function() {
    	$(this).find("label").hide();
    	$(this).addClass("active");
	});

	o.focusout(function() {
		if ($(this).find("input").val().length != 0) {
			$(this).find("label").hide();
			$(this).addClass("active");
		} else {
			$(this).find("label").show();
			$(this).removeClass("active");
		}
	});
}

/* 가입모델확인 레이어 */
function tipLayer() {
	var layer = $("#contents-area .box-join .condition .model-search");
	layer.find(".tip").click(function(e){
		e.stopPropagation();
		layer.find(".layer-tip").css({
	    	"visibility": layer.find(".layer-tip").css("visibility") == "visible" ? "hidden" : "visible"
		});
	});

	layer.find(".layer-tip").click(function(e){
		e.stopPropagation();
	});

	$(document).click(function(){
		layer.find(".layer-tip").css("visibility", "hidden");
	}); 
}

/* 일련번호 확인 레이어 */
function tipLayer2() {
	var layer = $("#section-applition .info-box");
	layer.find(".btn-hp-code").click(function(e){
		e.stopPropagation();
		layer.find(".layer-serial-number").css({
	    	"visibility": layer.find(".layer-serial-number").css("visibility") == "visible" ? "hidden" : "visible"
		});
	});

	layer.find(".layer-serial-number").click(function(e){
		e.stopPropagation();
	});

	$(document).click(function(){
		layer.find(".layer-serial-number").css("visibility", "hidden");
	}); 
}

/* 레이어 닫기 */
function clseLayer() {
	var pop = $(".layer");
	var bc = $(".button-group .btn-layer-clse");
	pop.find(bc).click(function() {
		$("body").find(".modal").remove();
		$(this).closest(".layer").hide();
	});
}

/* 청구방법 변경 레이어 */
function billLayer() {
	var layer = $(".service-my-info .bill-type");
	layer.find(".edit").click(function(e){
		e.stopPropagation();
		layer.find(".layer-bill").css({
	    	"visibility": layer.find(".layer-bill").css("visibility") == "visible" ? "hidden" : "visible"
		});
	});
}

/* 탭메뉴 */
function init_tabs() {
	$(".tab-area .optional-conts").css("display","none");
	$(".tab-area .optional-app").css("display","none");

	if (!$(".tab-area .tab").length) { return; }
	$(".tab-area .tab-box").each(function() {
		$(this).find(".optional-conts:first").show();
	});

	$(".tab-area .tab a").click(function() {
		$(".optional-services .optional-app").hide();
		if (!$(this).parent("li").hasClass("on")) {
			$(this).parent("li").addClass("on").siblings("li").removeClass("on");
			$($(this).attr("href")).show().siblings(".optional-conts").hide();
		}
		this.blur();
		return false;
	});

	$(".optional-services .btn-optional-app,.optional-services .btn-service-app").click(function() {
		$(".optional-services .tab li").removeClass("on");
		$(".optional-services .optional-conts").hide();
		$(".optional-services .optional-app").show();
		this.blur();
		return false;
	});
}