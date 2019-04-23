$(document).ready(function () {
	cmntTextareaAction();
	init_tabs();

	$(window).on("scroll", function() {
		headerScroll();
    });

	// 헤더 유저 메뉴
	$("#user-box .side-pannel .btn-user-menu").click(function() {
        $("#user-box .side-pannel").toggleClass("on");
    });

	// 모바일 gnb 
	$(".gnb .btn-mobile-gnb").click(function() {
        $(".gnb ul").toggleClass("slide");
    });

	// 상단으로
    $(".btn-top-move").click(function() {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 300);
    });

    // 모바일 lnb
    $(".btn-lnb-view").click(function() {
    	var newModal = $("<div class='modal' />")
		$(".lnb").toggleClass("slide");

		if ($(".modal").length <= 0) {
			$("body").append(newModal);
			$(this).html("<i class='fa fa-times'></i>");
		} else {
    		$(".modal").remove();
    		$(this).html("<i class='fa fa-plus'></i>");
    	}
	});
});

// header fade
function headerScroll() {
    currentScrollTop = $(window).scrollTop();
    var elm = $("header");

    if (currentScrollTop > 0) {
        elm.addClass("fade");
    } else {
    	elm.removeClass("fade");
    }
}

// 댓글 form 액션
function cmntTextareaAction() {
	var cmntTextarea = $(".icmnt");
	var cmntTextarea2 = $(".reply-icmnt");

	cmntTextarea.click(function(event) {
		event.stopPropagation();
		$(".icmnt").addClass("on");
		$(".icmnt .icmnt-footer .btn-cmnt-reg").css("visibility", "visible");
	});

	$(document).click(function(){
		if ($(".icmnt").hasClass("on")) {
			$(".icmnt").removeClass("on");
			$(".icmnt .icmnt-footer .btn-cmnt-reg").css("visibility", "hidden");
		};
	});
}

/* 약관 탭메뉴 */
function init_tabs() {
	$(".ppt-area .tab-body .box").css("display","none");

	if (!$(".ppt-area .tab-area").length) { return; }
	$(".ppt-area .tab-body").each(function() {
		$(this).find(".box:first").show();
	});

	$(".tab-area ul a").click(function() {
		if (!$(this).parent("li").hasClass("on")) {
			$(this).parent("li").addClass("on").siblings("li").removeClass("on");
			$($(this).attr("href")).show().siblings(".box").hide();
		}
		this.blur();
		return false;
	});
}