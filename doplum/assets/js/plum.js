// common
function commonUi() {
    // 숫자, , - 만 입력
    $("input[numberOnly]").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9-,]/g,""));
    });

    // 글자수 제한
    function wordLimit(e, wl) {
        var thisEle = $(e.target);
        var content = thisEle.val();

        function wordLimitValue(wl) {
            if(content.length > wl) {
                thisEle.val(content.substring(0, wl));
            }
        }
        wordLimitValue(wl);
    }
    // 글자수 대상 200, 500
    $(".js-wordlimit-200").keyup(function(e) {
        wordLimit(e, 200);
    });
    $(".js-wordlimit-500").keyup(function(e) {
        wordLimit(e, 500);
        
        // 글자수 표시
        var wordlimitCounter = $(".js-wordlimit-counter");
        if (wordlimitCounter.length) {
            wordlimitCounter.html($(this).val().length + " / 500");
        }
    });

    // mobile gnb 열기
    $(document).on("click", ".js-btn-mobile", function () {
        $("body").addClass("no-scroll");
        $("#header .is-mobile").toggleClass("on");
    });
    // mobile gnb 닫기
    $(document).on("click", ".js-btn-mobile-clse", function () {
        $("body").removeClass("no-scroll");
        $("#header .is-mobile").removeClass("on");
    });

    // 마이페이지 모바일 lnb
    $(document).on("click", ".js-btn-mypage-lnb-mobile", function () {
        $(this).children("i").toggleClass("xi-angle-down xi-angle-up");
        $(".js-mypage-lnb-mobile").toggleClass("on");
    });
} commonUi();

// 암호화폐 대여상품 보기 조건 필터
function leaseSearch() {
	$(document).on("click", ".js-btn-lease-search", function() {
        var icn = $(this).find("i");

        if(icn.hasClass("xi-angle-up")) {
            $(this).contents()[0].textContent = "조건 필터 열기 ";
        } else {
            $(this).contents()[0].textContent = "조건 필터 닫기 ";
        }
        
        icn.toggleClass("xi-angle-up xi-angle-down");
        $(".js-search-top").toggleClass("clse");
        $(".js-search-detail").slideToggle("fast");
	});
} leaseSearch();

// faq
function faqSlide() {
    $(document).on("click", ".js-btn-faq", function () {
        var faqItem = $(".js-faq-item");
        var faqContent = $(".js-faq-content");

        if ($(this).closest(faqItem).hasClass("on")) {
            $(this).closest(faqItem).removeClass("on")
            $(this).children("i").removeClass("xi-angle-up").addClass("xi-angle-down");
            $(this).next(faqContent).slideUp(300).attr("aria-hidden", "true");
        } else {
            $(this).closest(faqItem).addClass("on").siblings().removeClass("on");
            $(this).children("i").removeClass("xi-angle-down").addClass("xi-angle-up");
            $(this).closest(faqItem).siblings().find("i").removeClass("xi-angle-up").addClass("xi-angle-down");
            $(this).next(faqContent).slideDown(300).attr("aria-hidden", "false");
            $(this).closest(faqItem).siblings().find(faqContent).attr("aria-hidden", "true");
            $(this).closest(faqItem).siblings().find(faqContent).slideUp(300);
        }
    });
} faqSlide();

// 약도
function companyMap() {
    function daumMapApi() {
        // 판교오피스
        new daum.roughmap.Lander({
            "timestamp": "1562923922949",
            "key": "ucf2",
            "mapWidth": "100%",
            "mapHeight": "100%"
        }).render();

        // 서울 오피스
        new daum.roughmap.Lander({
            "timestamp": "1562924123073",
            "key": "ucf3",
            "mapWidth": "100%",
            "mapHeight": "100%"
        }).render();
    }

	if ($(".js-address-map").length) {
        roughmap = false;
        
		$(".js-btn-tab[data-tab='tab-address']").click(function() {
			if (roughmap == false) {
				daumMapApi();
			}
			
			roughmap = true;
		});
	}
} companyMap();

// components
// layer
function layerPop() {
    $(document).on("click", ".js-btn-layer", function () {
        var dataLayer = $(this).attr("data-layer");

        $("html").addClass("no-scroll");
        $("#" + dataLayer).show();
        $("#" + dataLayer).attr("aria-hidden", "false");
    });
    
    $(document).on("click", ".js-btn-layer-pop-clse", function () {
        var layerPop = $(this).closest(".layer-pop");

        layerPop.attr("aria-hidden", "true").hide();
        $("html").removeClass("no-scroll");
        
    });
} layerPop();

// 하단 myinfo
function floatMyinfo () {
    if ($(".js-float-myinfo").length) {
        $(document).on("click", ".js-btn-float-myinfo", function() {
            var floatMyinfo = $(".js-float-myinfo");

            $(this).children().toggleClass("xi-caret-up-min xi-caret-down-min");
            
            floatMyinfo.slideToggle(function() {
                if (floatMyinfo.is(":visible")) {
                    floatMyinfo.attr("aria-hidden","false");
                } else {
                    floatMyinfo.attr("aria-hidden","true");
                }
            });
        });
    }
} floatMyinfo();

// tip
function tip() {
    if (!$(".js-tip").length) {
        return;
    }
    
    var el = $(".js-layer-tip");

    // 열기
    $(".js-btn-ico-tip").click(function () {
        var windowSize = $(window).width();
        var tgt = $(this).parent().next(el);
        var pagex = $(this).position().left;
        var pagey = $(this).position().top;

        el.removeClass("on").attr("area-hidden", "true");
        tgt.addClass("on").attr("area-hidden", "false");
        
        if (windowSize > 768) {
            tgt.css("left", pagex + 45);
            tgt.css("top", pagey - 26);
        } else {
            tgt.css("left", 0);
            tgt.css("top", pagey + 26);
            tgt.css("width", windowSize - 40);
        }
    });  
    
    // 닫기
    $(document).on("click", ".js-btn-layer-tip-clse", function () {
        $(this).closest(el).removeClass("on").attr("area-hidden", "true");
    });
} tip();

// 팁 레이어 닫기
function TipClse() {
    var layerTip = $(".js-layer-tip");

    layerTip.removeClass("on").attr("area-hidden", "true");
}

// tab
function tabContents() {
    $(document).on("click", ".js-btn-tab", function () {
        var tabItem = $(this).attr("data-tab");
        var contentsItem = $(".js-contents-item");
        
        $(this).addClass("active").siblings().removeClass("active");
        contentsItem.filter("[data-contents=" + tabItem + "]").addClass("active").siblings().removeClass("active");
    });
} tabContents();

// 자산 대여 운용 신청 버튼 fixed
function rentaloAppBtn(st) {
    var rentaloBtn = $(".js-lease-rentalo-button");

    if (rentaloBtn.length) {
        var targetTop = $(".js-lease-rentalo-target").offset().top;

        if (st > targetTop) {
            rentaloBtn.removeClass("fixed");
        } else {
            rentaloBtn.addClass("fixed");
        }
    }
}

// window resize
$(window).resize(function () {
    var windowSize = $(window).width();
    var elmBody = $("body");
    var isMobile = $(".is-mobile");

    // mobile gnb close
    if (windowSize > 1185) {
        if (isMobile.hasClass("on")) {
            elmBody.removeClass("no-scroll");
            isMobile.removeClass("on");
        }
    }

    // tip layer close
    TipClse();
});

// windows scroll
$(window).scroll(function () {
    var st = $(window).scrollTop();

    // 자산 대여 운용 신청 버튼 fixed
    rentaloAppBtn(st);
});