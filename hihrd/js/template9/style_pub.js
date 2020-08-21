// header
// 검색
function headerSearch() {
    var headerSearch = $(".header .aside-search");
    var searchInput = $(".header .aside-search .js-isearch");
    var searchResetBtn = $(".header .aside-search .js-btn-reset");
    var searchBtn = $(".header .aside-search .js-btn-search");
    var headerMobileBtn = $(".header .js-btn-mobile");

    // 검색 열기
    searchBtn.on("click", function() {
        headerMobileBtn.hide();
        headerSearch.toggleClass("active");
        searchInput.val(null);
    });

    // 검색값 리셋
    searchResetBtn.on("click", function() {
        searchInput.val(null);
    });

    // 검색 닫기
    // 1
    $(document).on("click", function(e) {
        if (!headerSearch.has(e.target).hasClass("active")) {
            searchInput.val(null);
            headerSearch.removeClass("active");

            if ($(window).width() < 1199 ) {
                headerMobileBtn.show();
            }
        }
    });
    //2
    $(document).on("click", ".js-btn-search-box-clse", function() {
        searchInput.val(null);
        headerMobileBtn.show();
        headerSearch.removeClass("active");
    });

    $(window).on("resize", function() {
        headerSearch.removeClass("active");
    });
} headerSearch();

// 모바일
function isMobile() {
    var mobileMenuBtn = $(".header .js-btn-mobile");
    var mobileMenu = $(".header-mobile");
    var mobileMenuBtnClse = $(".header-mobile .js-btn-mobile-menu-clse");

    // 메뉴 보기
    mobileMenuBtn.on("click", function() {
        mobileMenu.toggleClass("on");
    });

    // 메뉴 닫기
    mobileMenuBtnClse.on("click", function() {
        mobileMenu.removeClass("on");
    });

    $(window).on("resize", function() {
        if ($(window).width() > 1199) {
            mobileMenu.removeClass("on");
            mobileMenuBtn.hide();
        } else {
            mobileMenuBtn.show();
        }
    });
} isMobile();

// 최고의 인기영상
$(".course-list .slider").slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    // variableWidth: true,
    prevArrow: $('.btn-course-prev'),
    nextArrow: $('.btn-course-next'),
    responsive: [
        {
            breakpoint: 640, 
            settings: {
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

// 최고의 인기영상
$(".popular-list .slider").slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    prevArrow: $('.btn-popular-prev'),
    nextArrow: $('.btn-popular-next'),
    dots: true,
    customDots: true,
    dotsClass: 'custom-dots',
    responsive: [
        {
            breakpoint: 1199, 
            settings: {
                infinite: true,
                // variableWidth: true,
            }
        },
        {
            breakpoint: 640, 
            settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
});

// 최신 영상
$(".trend-list .slider").slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: $('.btn-trend-prev'),
    nextArrow: $('.btn-trend-next'),
    dots: true,
    customDots: true,
    dotsClass: 'custom-dots',
    responsive: [
        {
            breakpoint: 640,
            settings: {
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                rows: 2,
            }
        }
    ]
});

// hot 영상
$(".hot-list .slider").slick({
    // infinite: false,
    centerMode: true,
    slidesToShow: 1,
    variableWidth: true,
    centerPadding: '0',
    prevArrow: $('.btn-hot-prev'),
    nextArrow: $('.btn-hot-next'),
    dots: true,
    customDots: true,
    dotsClass: 'custom-dots',
    responsive: [
        {
            breakpoint: 640,
            settings: {
                infinite: true,
                variableWidth: false,
                centerMode: false,
                slidesToScroll: 1,
            }
        }
    ]
});

// 링크복사 닫기
function linkCopyMsg() {
    $(document).on("click", ".js-btn-link-clse", function () {
        $(this).closest(".link-msg").fadeOut();
    });
} linkCopyMsg();

// 과정상세 더보기
function viewMore() {
    var viewContentsDsc = $(".view-contents-dsc");
    var viewContentsDscHeight =  $(".js-view-contents-dsc").height();
    var viewContentsBot = $(".js-view-contents-bot");
    var btnMore = viewContentsBot.find(".js-btn-more-view");

    if (viewContentsDscHeight > 144) {
        viewContentsBot.show();

        btnMore.on("click", function() {
            viewContentsDsc.toggleClass("on");

            $(this).toggleClass("btn-more-clse");

            if($(this).hasClass("btn-more-clse")) {
                $(this).contents()[0].textContent = "close";
            } else {
                $(this).contents()[0].textContent = "more";
            }
        });
    }
} viewMore();
// 과정상세 하단 메뉴
function tabContents() {
    $(document).on("click", ".js-btn-tab", function (e) {
        e.preventDefault();
        var tabItem = $(this).attr("data-tab");
        var contentsItem = $(".js-contents-item");
        
        $(this).addClass("active").siblings().removeClass("active");
        contentsItem.filter("[data-contents=" + tabItem + "]").addClass("active").siblings().removeClass("active");
    });
} tabContents();

// my
// 활동현황
$(".my-dashboard-graph .slider").slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    // variableWidth: true,
    prevArrow: $(".my-dashboard-graph .btn-graph-prev"),
    nextArrow: $(".my-dashboard-graph .btn-graph-next"),
    responsive: [
        {
            breakpoint: 1000, 
            settings: {
                variableWidth: true,
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 640, 
            settings: {
                variableWidth: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                slidesToShow: 1.075,
            }
        }
    ]
});
// 강의 리스트
function myDashboardSlider() {
    var dashBoardSliders = $(document).find(".section-my .media-item .slider");

    dashBoardSliders.each(function() {
        $(this).slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            variableWidth: true,
            prevArrow: $(this).parents(".media-item").find(".btn-media-prev"),
            nextArrow: $(this).parents(".media-item").find(".btn-media-next"),
            dots: true,
            customDots: true,
            dotsClass: 'custom-dots',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        dots: false,
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: false,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                    }
                }
            ]
        });
    });
} myDashboardSlider();

// accordion
function listAccordion() {
    var accordionItem = $(".js-accordion-item");
    var accordionBtn = $(".js-btn-accordion");
    var accordionBox = $(".js-accordion-box");

    // 처음 리스트 열기
    if (accordionItem.hasClass("on")) {
        accordionItem.parent().find(".on").removeClass("on").addClass("active").find(accordionBox).slideDown("fast");
    }
    
    accordionBtn.on("click", function() {
        $(this).closest(accordionItem).siblings().removeClass("active").find(accordionBox).slideUp("fast");

        $(this).closest(accordionItem).addClass("active").find(accordionBox).slideDown("fast");
    });
} listAccordion();

// 과정 슬라이더
function courseSlider() {
    var courseItemsSlider = $(document).find(".course-items .media-item .slider");

    courseItemsSlider.each(function() {
        $(this).slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            variableWidth: true,
            prevArrow: $(this).parents(".media-item").find(".btn-media-prev"),
            nextArrow: $(this).parents(".media-item").find(".btn-media-next"),
            dots: true,
            customDots: true,
            dotsClass: 'custom-dots',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        dots: false,
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: false,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                    }
                }
            ]
        });
    });
} courseSlider();

// 학습창
function popupLearning() {
    var learningSlide  = $(".popup-learning .js-learning-slide");
    var slideBtn = $(".popup-learning .js-btn-learning-slide");
    var learningInfo = $(".popup-learning .js-learning-info");
    var btnTab = $(".popup-learning .js-btn-tab");
    var recmBtn = $(".popup-learning .js-btn-recm");
    var learningRecm = $(".popup-learning .js-learning-recm");
    var learningMedia = $(".popup-learning .js-learning-media");

    slideBtn.on("click", function() {
        learningSlide.removeClass("active");
        $(this).closest(learningSlide).addClass("active");
        // $(".learning-info-box").hide();
    });

    btnTab.on("click", function() {
        recmBtn.removeClass("active");

        if (learningRecm.hasClass("blind") === false) {
            learningRecm.addClass("blind");
            learningMedia.removeClass("wide");
        }
        
        learningInfo.removeClass("blind");
    });

    recmBtn.on("click", function() {
        $(this).addClass("active").siblings().removeClass("active");
        
        if (learningRecm.hasClass("blind")) {
            learningRecm.removeClass("blind");
            learningMedia.addClass("wide");
            learningInfo.addClass("blind");
        }
    });

    $(window).on("resize", function() {
        if($(window).width() < 1200 && learningRecm.length) {
            var btnTabInfo = $(".popup-learning .js-btn-info");

            btnTabInfo.trigger("click");
        }
    });
} popupLearning()