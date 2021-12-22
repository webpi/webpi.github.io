// comm
var gnbWrap = $(".gnb .gnb-wrap");
var gnbBox = $(".gnb .gnb-box");
var btnGnb = $(".gnb .btn-gnb");
var btnGnbSub = $(".gnb .btn-gnb-sub");
var containerElm = $("#container");
var btnTabAchor = $(".js-tabAchor .btn-tab");

// gnb
btnGnb.on("focus focusin mouseover mouseenter", function() {
  gnbBox.removeClass("is-active");
  $(this).closest(".gnb-box").addClass("is-active");
});
gnbWrap.on("mouseleave", function() {
  gnbBox.removeClass("is-active");
});

// 폰트사이즈
function fontSize() {
  var zoomSize = 100;
  var btnFontUp = $("#header .btn-up");
  var btnFontDown = $("#header .btn-down");

  btnFontUp.on("click", function() {
    zoomSize = zoomSize + 10;
    // $("html, body").css("font-size", "+=1");
    $("body").css("zoom", zoomSize + "%");
  });

  btnFontDown.on("click", function() {
    zoomSize = zoomSize - 10;
    // $("html, body").css("font-size", "-=1");
    $("body").css("zoom", zoomSize + "%");
  });
} fontSize();

// gnb mobile
function gnbMobile() {
  var btnMenuMobile = $(".header .btn-menu-mobile");
  var headerMenuMobile = $(".header .header-menu-mobile");
  var btnGnbClse = $(".header .btn-gnb-clse");
  var gnbMobile = $(".gnb-mobile");
  var btnMobileGnb = $(".gnb-mobile .btn-gnb");
  var btnMobileGnbSub = $(".gnb-mobile .btn-gnb-sub");

  // 모바일 gnb 열기
  btnMenuMobile.on("click", function() {
    headerMenuMobile.hide();
    gnbMobile.slideDown(200);
    btnGnbClse.show();
  });

  // 모바일 gnb 닫기
  btnGnbClse.on("click", function() {
    gnbMobile.slideUp(200);
    headerMenuMobile.show();
    btnGnbClse.hide();
  });

  // 모바일 gnb 서브메뉴 열기
  btnMobileGnb.on("click", function() {  
    $(this).closest(".gnb-box").find(".gnb-sub").slideToggle(200);
  });

  // 모바일 gnb 서브메뉴2 열기
  btnMobileGnbSub.on("click", function() {  
    $(this).closest("li").find(".gnb-sub-sub").slideToggle(200);
  });

} gnbMobile();

// lnb
function lnb() {
  var btnLnbSub = $(".js-lnb .btn-lnb-sub");

  $(".lnb .lnb-sub .is-on .lnb-sub-sub").show();

  btnLnbSub.on("click", function() {
    $(this).closest("li").toggleClass("is-on").find(".lnb-sub-sub").slideToggle(200);
  });
} lnb();

// 자료제공 아코디언
function studyDataSlide() {
  btnStudyDataSlide = $(".section-study .learning-data .btn-slide");

  btnStudyDataSlide.on("click", function() {
    $(this).toggleClass("btn-slide-down btn-slide-up");
    $(this).closest("dd").find(".conts").toggleClass("is-on");
  });
} studyDataSlide();

// 학습맵 아코디언
function learningMap() {
  var btnListView = $(".js-learningMap .btn-list-view");
  var LearningMapItem = $(".js-learningMap .learning-map-item");
  var btnLearningMap = $(".js-learningMap .subject");
  var learningMapConts = $(".js-learningMap .conts");

  $(".js-learningMap .is-on").find(".conts").show();

  btnLearningMap.on("click", function() {
    $(this).closest(".learning-map-item").find(".conts").stop().slideToggle(200);
  });

  btnListView.on("click", function() {
    if (btnListView.hasClass("is-active")) {
      btnListView.removeClass("is-active");
      btnListView.find("span").text("전체 펼쳐보기");
      learningMapConts.stop().slideUp(200);
      LearningMapItem.removeClass("is-on");
    } else {
      btnListView.addClass("is-active");
      btnListView.find("span").text("전체 접어보기");
      $(".learning-map-item:not(.is-on) .conts").stop().slideDown(200);
    }
  });
} learningMap();

// tab anchor
function tabAchor() {
  btnTabAchor.on("click", function(e) {
    e.preventDefault();

    btnTabAchor.removeClass("is-active");
    $(this).addClass("is-active");

    if ("" !== this.hash) {
      var h = this.hash;

      $("html, body").animate({
          scrollTop: $(h).offset().top - 50
      }, 100);
    }

    return false;
  });
} tabAchor();

// resize
var lastWindowWidth = $(window).width();
window.addEventListener("resize", function() {
  var windowWidth = $(window).width();

  if (windowWidth > 1024) {
    $(".gnb-mobile").hide();
    $(".header .btn-gnb-clse").hide();
  } else {
    $(".header .header-menu-mobile").removeAttr("style");
  }
});

// scroll
window.addEventListener("scroll", function() {
  var winScrollTop = $(window).scrollTop();

  function tabScroll() {
    if (btnTabAchor.length) {
      for(var i = 0; i < $(".tab-box").length; i++) {
    
        // tab-box 각각의 높이
        var tabboxTop = $(".tab-box").eq(i).offset().top;

        // tabboxTop + tab-box 높이 = tabbox bottom
        var tabboxBottom = tabboxTop + $(".tab-box").eq(i).outerHeight();
        var winHeight = $(window).height();
        var scrollBottom = $("body").height() - winHeight;

        // scroll이 tab-box보다 크거나 작고, tabbox bottom보다 작으면 해당 article의 영역
        if(winScrollTop >= tabboxTop - 60 && winScrollTop < tabboxBottom) {
          btnTabAchor.removeClass("is-active");
          btnTabAchor.eq(i).addClass("is-active");
        } 
    
        if(winScrollTop >= scrollBottom) {
          btnTabAchor.removeClass("is-active");
          btnTabAchor.last().addClass("is-active");
        }
      }
    }
  } tabScroll();
});