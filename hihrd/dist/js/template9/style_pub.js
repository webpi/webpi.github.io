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
        if($(window).width() < 1199 && !headerSearch.hasClass("active")) {
            headerMobileBtn.show();
        } else {
            headerMobileBtn.hide();
        }
    });
} headerSearch();

// header 교육 분류 버튼
function headerEduBtn() {
    var btnEduCategory = $(".header-v2 .js-btn-edu-category");

    btnEduCategory.on("click", function() {
        var eduCategory = $(".header-v2 .js-edu-category");
        
        if (btnEduCategory.hasClass("is-active")) {
            $(this).removeClass("is-active").find(".ir").text("분류보기");
            eduCategory.slideUp("fast");
        } else {
            $(this).addClass("is-active").find(".ir").text("분류닫기");
            eduCategory.slideDown("fast");
        }
    });
} headerEduBtn();


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
        } 
    });
} isMobile();

// 수강중인 영상
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
    slidesToShow: 5,
    slidesToScroll: 5,
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
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

// 최신 영상
$(".trend-list .slider").slick({
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    variableWidth: true,
    prevArrow: $('.btn-trend-prev'),
    nextArrow: $('.btn-trend-next'),
    dots: true,
    customDots: true,
    dotsClass: 'custom-dots',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                variableWidth: false,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                rows: 2,
            }
        },
        {
            breakpoint: 640,
            settings: {
                variableWidth: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                rows: 2,
            }
        }
    ]
});

// hot 영상
$(".hot-list .slider").slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    // variableWidth: true,
    prevArrow: $('.btn-hot-prev'),
    nextArrow: $('.btn-hot-next'),
    dots: true,
    customDots: true,
    infinite: true,
    dotsClass: 'custom-dots',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                centerMode: true,
                centerPadding: '150px',
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
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
                    breakpoint: 1000,
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
    var learningTab = $(".popup-learning .js-learning-tab");
    var recmBtn = $(".popup-learning .js-btn-recm");
    var learningRecm = $(".popup-learning .js-learning-recm");
    var learningBody = $(".popup-learning .js-learning-body");
    var learningSpd = $(".popup-learning .js-btn-speed");
    var learningSpdList = $(".popup-learning .js-speed-list");

    slideBtn.on("click", function() {
        learningSlide.removeClass("active");
        $(this).closest(learningSlide).addClass("active");
    });

    learningTab.on("click", function(e) {
        e.preventDefault();

        var learningTabItem = $(this).attr("data-tab");
        var learningContentsItem = $(".popup-learning .js-learning-item");
        
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            learningContentsItem.removeClass("active");
            learningBody.addClass("blind");           
        } else {
            $(this).addClass("active").siblings().removeClass("active");
            learningContentsItem.filter("[data-contents=" + learningTabItem + "]").addClass("active").siblings().removeClass("active");
            learningRecm.removeClass("active");
            learningBody.removeClass("blind");
        }
    });

    recmBtn.on("click", function(e) {
        e.preventDefault();

        $(this).toggleClass("active").siblings().removeClass("active");
        
        if ($(this).hasClass("active")) {
            learningRecm.addClass("active");
            learningBody.addClass("blind");
        } else {
            learningRecm.removeClass("active");
        }
    });

    learningSpd.on("click", function() {
        $(this).toggleClass("on");
        learningSpdList.slideToggle("fast");
    });

    learningSpdList.find("li").on("click", function() {
        $(this).addClass("select").siblings().removeClass("select");
    });

    $(window).on("resize", function() {
        if($(window).width() < 1200 && learningRecm.length) {
            var btnTabInfo = $(".popup-learning .js-btn-info");

            if (learningTab.hasClass("active") === false) {
                btnTabInfo.trigger("click");
            }
        }
    });
} popupLearning()