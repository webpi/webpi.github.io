// comm
var lnbItem = $(".lnb .lnb-item");

lnbItem.on("focus focusin mouseover", function() {
  $(this).find(".lnb-sub").stop().slideDown(200);
});

lnbItem.on("focusout mouseleave", function() {
  $(this).find(".lnb-sub").stop().slideUp(200);
});

// resize
var lastWindowWidth = $(window).width();
window.addEventListener("resize", function() {
  var windowWidth = $(window).width();

  
});

// scroll
window.addEventListener("scroll", function() {

});