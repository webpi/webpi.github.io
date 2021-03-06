// comm
var $header = $("#header");
var $gnb = $("#header .gnb");
var btnGnbAll = $("#header .btn-menu-all");
var $notice = $(".notice");
var noticeBtn = $(".notice .btn-notice");
var btnNoticeMobile = $("#header .btn-menu-noti");

// header fixed
function headerFixed() {
    var scrollTop = $(window).scrollTop();
  
    if (scrollTop > 1) {
      $header.addClass("is-fixed");
    } else {
      $header.removeClass("is-fixed");
    }
  } headerFixed();

// 전체메뉴보기
btnGnbAll.on("click", function() {
  var windowWidth = $(window).width();

  $(this).toggleClass("is-on");

  if (windowWidth > 1024) {
    $gnb.toggleClass("is-normal is-all");
  } else {
    $gnb.slideToggle(300);
  }
});

// gnb
function gnbActive() {
    var gnbCol = $(".gnb.is-normal .gnb-col");

    gnbCol.on("focusin", function() {
        gnbCol.blur();
        if ($(this).hasClass("is-active") === false) {
            $(this).addClass("is-active");
        }
    });

    gnbCol.on("mouseout focusout", function() {
        $(this).removeClass("is-active");
    });
} gnbActive();

// gnb 닫기
function gnbClse() {
  if($gnb.hasClass("is-all")) {
    $gnb.removeClass("is-all").addClass("is-normal");
  } else if($gnb.hasClass("is-mobile")) {
    $gnb.hide();
  }

  $gnb.removeAttr("style");
  btnGnbAll.removeClass("is-on");
}

// gnb mobile 
function gnbMobile() {
  var windowWidth = $(window).width();

  if(windowWidth <= 1024) {
    $gnb.removeClass("is-normal");
    $gnb.addClass("is-mobile");
  } else {
    $gnb.removeClass("is-mobile");
    $gnb.addClass("is-normal");
  }

  $(document).on("click", ".gnb.is-mobile .gnb-tit", function() {
    var gnbColSub = $(".gnb.is-mobile .gnb-col .gnb-sub");
    // console.log($(this).parent());
    
    $(this).toggleClass("is-select");
    $(this).parent(".gnb-col").find(".gnb-sub").slideToggle(200);
  });
} gnbMobile();

// notice
noticeBtn.on("click", function() {
    $notice.toggleClass("is-active");
});
$(".notice .notice-items-box").on("focus", function() {
  $notice.addClass("is-active");
});
btnNoticeMobile.on("click", function() {
  var scrollTop = $(window).scrollTop();
  var notceTop = scrollTop + 80;

  $notice.toggleClass("is-zoom");
  $notice.css("top", notceTop);

  // gnb 닫기
  gnbClse();
});
$(document).on("click", ".notice.is-zoom .btn-notice-clse", function() {
  noticeClse();
});
function noticeClse() {
  $notice.removeClass("is-active");
  $notice.removeClass("is-zoom");
  $notice.removeAttr("style");
}
// $(document).on("click", function(e) {
//   var windowWidth = $(window).width();

//   if (windowWidth <= 414) {
//     if (!$notice.has(e.target).hasClass("is-zoom")) {
//       noticeClse();
//     }
//   }
// });

// resize

//

// 학습중인 과정 테이블
function myClassroom() {
  var btnBoardMore = $(document).find(".board .js-btnListView");

  btnBoardMore.on("click", function() {
    $(this).toggleClass("is-active");
    $(this).closest("tbody").find(".btn-list-view").toggleClass("is-on");
    $(this).closest("tbody").find(".tr-list-box").slideToggle(200);
  });
} myClassroom();

var lastWindowWidth = $(window).width();
window.addEventListener("resize", function() {
  var windowWidth = $(window).width();

  if(windowWidth <= 1024) {
    $gnb.removeClass("is-normal");
    $gnb.addClass("is-mobile");
  } else {
    $gnb.removeClass("is-mobile");
    $gnb.addClass("is-normal");
  }

  // gnb 닫기
  gnbClse();

  // 알림 닫기
  if (windowWidth != lastWindowWidth){
    noticeClse();
  }
});

// scroll
window.addEventListener("scroll", function() {
    // header fixed
    headerFixed();
});