$(document).ready(function() {
    resizeContent();

    $(window).resize(function() {
        resizeContent();
    });

    $(window).on("scroll", function() {
        $("#footer").css('display' ,  'none').delay(300).fadeIn('fast');
    });

    /* 포스트보기 최근수정일 */
    $(".section-post .view .lately-edit").find("span").click(function() {
        var lately = $(".section-post .view .lately-edit");
        $(lately).find("ul").toggleClass("blind");
    });

    // lnb 슬라이드 애니메이션
    $(".btn-lnb-view").click(function() {
        var m = $(".section-manage2 #main");

        $("#lnb").stop().animate({
            "left": $("#lnb").css("left") == "-201px" ? "0" : "-201px"
        }, 300);

        if($("#lnb").css("display") == "none"){
            $("#lnb").show();
        } else {
            $("#lnb").fadeOut();
        }

        $(m).find(".manage-area").stop().animate({
            "margin-left": $(m).find(".manage-area").css("margin-left") == "211px" ? "0" : "211px"
        }, 300);

        $(m).find(".trading-area").stop().animate({
            "padding-left": $(m).find(".trading-area").css("padding-left") == "211px" ? "0" : "211px"
        }, 300);

        $(".btn-lnb-view").animate({
            "left": $(this).css("left") == "199px" ? "-2px" : "199px"
        }, 300);

        // lnb 슬라이드 버튼 변경
        var src = ($(this).find("img").attr("src") === "/img/btn_lnb_open.png") ? "/img/btn_lnb_clse.png" : "/img/btn_lnb_open.png";
        $(this).find("img").attr("src", src);
    });

    // bxslider
    if ($(".bxslider").length > 0) {
        $(".section-intro .bxslider").bxSlider({
            controls: false,
            pagerCustom: ".carousel"
        });

        $(".section-intro .bxslider").mousewheel(function(event, delta, deltaX, deltaY) {
            if (delta > 0) {
                if ($(".carousel a[class=active]").prev().length > 0) {
                    $(".carousel a[class=active]").prev().trigger("click");
                } else {
                    $(".carousel a:last").trigger("click");
                }
            }
            if (deltaY < 0) {
                if ($(".carousel a[class=active]").next().length == 0) {
                    $(".carousel a:first").trigger("click");
                } else {
                    $(".carousel a[class=active]").next().trigger("click");
                }
            }

            event.stopPropagation();
            event.preventDefault();
        });
    }

    // 글 추천 애니메이션
    $(".section-post").find(".btn-rec").click(function() {
        $(this).append("<em class='ani-recm'><img src='/img/img_recm.png' alt='추천'></em>");
        $(this).find(".ani-recm").animate({
            bottom: "70px",
            opacity: 0
        }, {
            duration: 400,
            queue: false,
            complete: function() {
                $(".ani-recm").remove();
            }
        });
    });
    // 글 비추천 애니메이션
    $(".section-post").find(".btn-non").click(function() {
        $(this).append("<em class='ani-non'><img src='/img/img_recm2.png' alt='비추천'></em>");
        $(this).find(".ani-non").animate({
            bottom: "20px",
            opacity: 0
        }, {
            duration: 400,
            queue: false,
            complete: function() {
                $(".ani-non").remove();
            }
        });
    });

    // 인트로2 아이콘 로테이트
    $.fn.rotate = function(angle) {
        $(this).css('-webkit-transform', 'rotate(' + angle + 'deg)');
        $(this).css('-moz-transform', 'rotate(' + angle + 'deg)');
        $(this).css('transform', 'rotate(' + angle + 'deg)');

        if (angle >= 0) {
            var rotation = Math.PI * angle / 180;
        } else {
            var rotation = Math.PI * (360 + angle) / 180;
        }
        var c = Math.cos(rotation),
            s = Math.sin(rotation);
        $(this).get(0).style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + c + ",M12=" + (-s) + ",M21=" + s + ",M22=" + c + ",SizingMethod='auto expand')";
    }

    function rotateAnimation() {
        $(".section-intro").find(".rnd").animate({
            borderSpacing: "+=120"
        }, {
            step: function(now, fx) {
                $(this).rotate(now);
            },
            duration: 'slow',
            complete: function() {
                if ($(this).css("borderSpacing") == "360px 360px") {
                    $(this).css("borderSpacing", 0)
                        .rotate(0);
                }
            }
        }, 'easeOutCubic');
    }

    // 인트로2 아이콘 로테이트 반대 todo:소스합치기?
    $.fn.rotate2 = function(angle) {
        $(this).css('-webkit-transform', 'rotate(-' + angle + 'deg)');
        $(this).css('-moz-transform', 'rotate(-' + angle + 'deg)');
        $(this).css('transform', 'rotate(-' + angle + 'deg)');

        if (angle >= 0) {
            var rotation = Math.PI * angle / 180;
        } else {
            var rotation = Math.PI * (360 + angle) / 180;
        }
        var c = Math.cos(rotation),
            s = Math.sin(rotation);
        $(this).get(0).style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + c + ",M12=" + (-s) + ",M21=" + s + ",M22=" + c + ",SizingMethod='auto expand')";
    }

    function rotateAnimation2() {
        $(".section-intro").find(".ico1, .ico2, .ico3").animate({
            borderSpacing: "+=120"
        }, {
            step: function(now, fx) {
                $(this).rotate2(now);
            },
            duration: 'slow',
            complete: function() {
                if ($(this).css("borderSpacing") == "360px 360px") {
                    $(this).css("borderSpacing", 0)
                        .rotate2(0);
                }
            }
        }, 'easeOutCubic');
    }

    setInterval(function() {
        rotateAnimation();
        rotateAnimation2();
    }, 5000);

    // 인트로1 상자
    var cntNum = 1;
    function imgChg() {
        if (cntNum == 3)
        {
            cntNum = 1;
        }
        $(".section-intro .intro1").find(".img img").attr("src", "../img/img_intro1_box"+cntNum+".png");
        cntNum+=1;
    }

    setInterval(function() {
        imgChg();
    }, 1000);
});

// lnb 스크롤 function
function resizeContent() {
    $height = $(window).height() - 68;
    // $height2 = $(window).height() -118;
    // $height3 = $(window).height() - 184;
    $slideHeight = $(window).height();

    // $("#lnb").css("min-height", $height2);
    // $(".section-manage2 #main").find(".category-box").height($height2);
    // $(".section-manage2 #lnb").height($height3);

    // 인트로 높이
    $("#intro-wrap .box").height($slideHeight);

    // 도넛만들기 풀사이즈
    $(".section-join .join1").height($height);
}
