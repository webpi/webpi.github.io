// common
var headerElm = $("#header");

// 모바일 셀렉터
var btnMobile = $(".js-btnMobile");
var headerMobile = $(".js-headerMobile");
var btnHeaderMobileClse = $(".header-mobile .btn-header-mobile-clse");

// 모바일 메뉴 열기
btnMobile.on("click", function (e) {
  e.stopPropagation();

  if (!headerMobile.hasClass("is-active")) {
    headerMobile.show(100)
    headerMobile.addClass("is-active");
  }
});

// 모바일 메뉴 닫기
function headerMobileClse() {
  headerMobile.removeClass("is-active");
  headerMobile.hide(300);
}
btnHeaderMobileClse.on("click", function () {
  if (headerMobile.hasClass("is-active")) {
    headerMobileClse();
  }
});
$(document).on("click", function(e) {
  if (!headerMobile.has(e.target).hasClass("is-active")) {
    headerMobileClse();
  }
});

// 메인 셀렉터
var scrollContainer = $(".scroll-container");

// 메인 slick
scrollContainer.slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  dots: false
});

// 마우스 휠 slick 이전, 다음 적용
scrollContainer.on("wheel", (function(e) {
  e.preventDefault();
  if (e.originalEvent.deltaY < 0) {
    $(this).slick("slickPrev");
  } else {
    $(this).slick("slickNext");
  }
}));

// 메인 페이징
function mainPaging() {
  var scrollPagingCurrent = scrollContainer.slick("getSlick").currentSlide + 1;
  $(".scroll-paging .scroll-paging-current .cnt").text(numberPad(scrollPagingCurrent));
  var scrollPagingTotal = scrollContainer.slick("getSlick").slideCount;
  $(".scroll-paging .scroll-paging-total .cnt").text(numberPad(scrollPagingTotal));

  scrollContainer.on('afterChange', function (event, slick, currentSlide) {
    var scrollPagingCurrent = scrollContainer.slick("getSlick").currentSlide + 1;
    $(".scroll-paging .scroll-paging-current .cnt").text(numberPad(scrollPagingCurrent));
  });
} mainPaging();

// 메인 숫자 ani
function countUp(obj, start, end, duration) {
  var  startTimestamp = null;

  var step = function(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    var progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString("ko");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
function countUpLearner() {
  countUp(eLearning, 0, 267450, 1000);
  countUp(specialLecture, 0, 743014, 1000);
  countUp(onlineLecture, 0, 44751, 1000);
}
function countUpSystem() {
  countUp(customer, 0, 30, 1000);
  countUp(newMake, 0, 51, 1000);
  countUp(ownContents, 0, 25, 1000);
}
// 시작값
if ($(".scroll-container .js-CountUp").length) {
  countUpLearner();
  countUpSystem()
}

// 현재 메인 숫자 애니
scrollContainer.on('beforeChange', function(event, slick, currentSlide) {
  var currentSlideCount = scrollContainer.slick("getSlick").currentSlide + 1;
  $(".scroll-paging .scroll-paging-current .cnt").text(numberPad(currentSlideCount));
  if ($(".section2").hasClass("slick-current")) {
    countUpLearner();
  } else if ($(".section3").hasClass("slick-current")) {
    countUpSystem();
  }
});

// 메인 기술섹션 슬라이드
function technologSlider() {
  var sectionSlider = $(".technolog-slider .slider");

  sectionSlider.slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
  }).on("afterChange", function(event, slick) {
    $(".scroll-container").slick("slickSetOption", "swipe", true, false);
  });

  var sliderPause = $(".technolog-slider .btn-technolog-slider-pause");
  var sliderPlay = $(".technolog-slider .btn-technolog-slider-play");
  var sliderPrev = $(".technolog-slider .btn-technolog-slider-prev");
  var sliderNext = $(".technolog-slider .btn-technolog-slider-next");

  sliderPrev.on("click", function () {
    sectionSlider.slick('slickPrev');
  });

  sliderNext.on("click", function () {
    sectionSlider.slick('slickNext');
  });

  sliderPause.on("click", function() {
    sectionSlider.slick("slickPause");
    $(this).hide();
    sliderPlay.show();
  });

  sliderPlay.on("click", function() {
    sectionSlider.slick("slickPlay");
    $(this).hide();
    sliderPause.show();
  });

  sectionSlider.on("mousedown click tab touchstart touchend", function () {
    $(".scroll-container").slick("slickSetOption", "swipe", false, false);
  });
} technologSlider();

// 상단으로 가기
function btnTop() {
  $(".js-btnTop").on("click", function (e) {
    if ("" !== this.hash) {
      e.preventDefault();

      var h = this.hash;
      $("html, body").animate({
        scrollTop: $(h).offset().top
      }, 400);
    }
  });
} btnTop();

// 회사소개서 다운로드
function downFile(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
  link.remove();
}
$(".js-btnDownload").on("click", function () {
  downFile("/assets/etc/윌비소프트_회사소개서.pdf", "윌비소프트_회사소개서.pdf");
});

// header fixed
function headerFixed() {
  var windowWidth = $(window).width();
  var scrollTop = $(window).scrollTop();

  if (windowWidth > 1367) {
    if (scrollTop > 1) {
      headerElm.addClass("is-fixed");
    } else {
      headerElm.removeClass("is-fixed");
    }
  } else {
    headerElm.removeClass("is-fixed");
  }
} headerFixed();

// 한자리 숫자 0 붙이기
function numberPad(n) {
  return n > 9 ? "" + n: "0" + n;
}

// resize
window.addEventListener("resize", function(){
  // header fixed
  headerFixed()
  
  // 모바일 메뉴 닫기
  var windowWidth = $(window).width();
  if (windowWidth > 1367) {
    if (headerMobile.hasClass("is-active")) {
      headerMobileClse();
    }
  }
});

// scroll
window.addEventListener("scroll", function(){
  // header fixed
  headerFixed()
});
