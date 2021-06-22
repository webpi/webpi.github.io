// layer
function layerPop() {
    $(document).on("click", ".js-btn-layer", function (e) {
        e.preventDefault();

        var dataLayer = $(this).attr("data-layer");

        $("body").addClass("no-scroll");
        $("#" + dataLayer).show();
        $("#" + dataLayer).attr("aria-hidden", "false");
    });
    
    $(document).on("click", ".js-btn-layer-pop-clse", function () {
        var layerPop = $(this).closest(".layer-pop");

        layerPop.attr("aria-hidden", "true").hide();
        $("body").removeClass("no-scroll");
        
    });
} layerPop();

// 약도
function companyMap() {
    // 다음맵 api
    function daumMapApi() {
        // 판교오피스
        new daum.roughmap.Lander({
            "timestamp": "1562923922949",
            "key": "ucf2",
            "mapWidth": "100%",
            "mapHeight": "100%"
        }).render();
    }

    // 레이어 호출
    $(".js-btn-layer-contact").click(function() {
        var layerContact = "/comm/layer_contactus.html";
        
        $("body").append("<div id='layerContact' />");

        $("#layerContact").load(layerContact, function () {
            daumMapApi();
        });
    });

    // 닫기
    $(document).on("click", ".js-btn-layer-pop-clse", function () {
        $("#layerContact").remove();
    });
} // companyMap();

// tab
function tabContents() {
    $(document).on("click", ".js-btn-tab", function () {
        var tabItem = $(this).attr("data-tab");
        var contentsItem = $(".js-contents-item");
        
        $(this).addClass("active").attr("aria-selected", "true").attr("tabindex", "0").siblings().removeClass("active").attr("aria-selected", "false").attr("tabindex", "-1");
        contentsItem.filter("[data-contents=" + tabItem + "]").addClass("active").attr("tabindex", "0").siblings().removeClass("active").attr("tabindex", "-1");
    });
} tabContents();

// 헤더 스크롤 fixed
function headerFixed() {
    var header = $("#header");
    var scrollTop = $(window).scrollTop();

    if(scrollTop > 78) {
        header.addClass("fixed");
    } else {
        header.removeClass("fixed");
    }
} headerFixed();

// 부드러운 스크롤
function smoothScroll() {
    $(document).on("click", ".js-btn-scroll", function(e) {
        if ("" !== this.hash) {
            e.preventDefault();
            var h = this.hash;
            $("html, body").stop().animate({
                scrollTop: $(h).offset().top
            }, 400);
        }
    });
} smoothScroll();

// 상단으로
function goTop() {
    var btnGoTop = $(".js-btn-go-top");
    var scrollTop = $(window).scrollTop();

    if(scrollTop > 0) {
        btnGoTop.addClass("active");
    } else {
        btnGoTop.removeClass("active");
    }

    btnGoTop.click(function () {
        $("html, body").stop().animate({
            scrollTop: "0"
        }, 500);
    });
}

// 모바일 gnb
function btnGnbMobile() {
    $(document).on("click", ".js-btn-gnb-mobile", function () {
        $(".js-gnb").slideToggle("fast");
    });
} btnGnbMobile();
// gnb 초기화
function gnbReset() {
    var objGnb = $(".js-gnb");

    objGnb.removeAttr("style");
}

// 구글 로그분석
$.getScript("https://www.googletagmanager.com/gtag/js?id=UA-131253257-1", function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-131253257-1');  
});

// alert
$(".js-alert").click(function(e) {
    e.preventDefault();

    alert("준비중입니다.");
});

// ci 스크롤 에니메이션
function isScrolledAni(elem, sp) {
    var wsTop = $(window).scrollTop();
    var eTop = elem.offset().top - sp;
    var eBottom = elem.offset().top + elem.outerHeight(true);

    return (wsTop <= eBottom && wsTop >= eTop);
}

// ci ani
function ciAni() {
    thisSt = $(window).scrollTop();

    if ($(".js-ci-ani").length) {
        ciOffTop = $(".js-ci-ani").offset().top;
        
        if (thisSt > ciOffTop) {
            $(".js-ci-img").addClass("ani");
        }
    }
} ciAni();

// 스크롤 이벤트
$(window).on("scroll", function() {
    // 헤더 fixed
    headerFixed();

    // 상단으로
    goTop();

    // about ci 애니메이션
    if ($(".js-ci-ani").length) {
        if (isScrolledAni($(".js-ci-ani"), 0)) {
            $(".js-ci-img").addClass("ani");
        } 
    }
});

// window resize
$(window).resize(function () {
    // var windowWidth = $(window).width();
    gnbReset();
});