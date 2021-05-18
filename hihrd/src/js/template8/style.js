jQuery(document).ready( function() {
	
	//FAQ 스크립트
	jQuery(".faq a").click(function() {
	    jQuery(this).next().slideToggle("fast").parent().siblings().removeClass('active').children("div").hide();
	    jQuery(this).parent('li').toggleClass('active');
	    return false;
	});

	gnbMenu(); 
	
	
	var btn_top = jQuery(".toolBar");
	
	jQuery(btn_top).css({bottom:jQuery("#footer").height() - 50});
	
});

function gnbMenu() {
    
	var gnb = ".gnb";
	var gnbOne = jQuery(".gnb").find(".twoDepth").parent("li").children("a");
	var chktwo = jQuery(".gnb").find(".threeDepth").children("li");
	
	var gnbTwo =  jQuery(chktwo).parent("ul").parent("li").children("a");
    
    jQuery(gnbOne).parent("li").addClass('oneDepth');
    jQuery(gnbTwo).addClass('two');
	
	
    jQuery(gnbOne).parent("li").addClass('oneDepth');
    
    jQuery(gnbOne).click(function() { 
    	jQuery(this).next('.twoDepth').slideToggle("fast");
        jQuery(this).parent("li").toggleClass('close');
    });
    
    jQuery(gnbTwo).click(function() { 
    	jQuery(this).next('.threeDepth').slideToggle("fast");
        jQuery(this).parent("li").toggleClass('close');
    });
	
}



function menuMobile(){
	 var btn = '.allMenu';
	 var gnb = '.gnbWrap';
	 
	 	
	 	if(jQuery(gnb).height() <= jQuery('body').height()){
	 		jQuery(gnb).height(jQuery(window).height());
		}
	 	jQuery('#wrap').css('overflow','inherit');
		jQuery(gnb).addClass('active');
		jQuery('<div class="dim" onClick="menuMobile2();"> </div>').appendTo('#wrap').find(".dim").fadeIn();
}
function menuMobile2(){

	 var gnb = '.gnbWrap';
	 	
	 	jQuery('#wrap').css('overflow','hidden');
	 	jQuery('.dim').remove();
		jQuery(gnb).removeClass('active');
	
}




//tab
function tabList(num){	
    var f = jQuery('.tab').find('li');
    for ( var i = 0; i < f.length; i++ ) {			
        if ( i == num) {			
            f.eq(i).addClass('active');	
            jQuery('.tabLayer' + i ).show();
        } else {
            f.eq(i).removeClass('active');					
            jQuery('.tabLayer' + i ).hide();
        }
    }
};



//tab 슬라이드
function fnSlideTab(flow){
	var tabCount = jQuery(".userTab").find("li").size();
	var iconView = tabCount-6;
	var icoImgOffSet = jQuery(".userTab").offset();
	var imgLeft = jQuery(".userTab").position().left;
	if(flow == "N"){
		icoImgOffSet.left -=171;
		if(imgLeft <= -171*iconView){
			return;
		}
		jQuery(".userTab").animate({
			left: '-=171'
		},300);
		jQuery(".userTab").offset(icoImgOffSet);
	}else{
		icoImgOffSet.left +=171;
		if(imgLeft >= 0){
			var temp = imgLeft+171;
			jQuery(".userTab").animate({
				left: '+='-temp
			},300);				
			return;
		}
		jQuery(".userTab").animate({
			left: '+=171'
		},300);		
		jQuery(".userTab").offset(icoImgOffSet);
	}
};

// 201102 추가 모바일 메인 배너
function mainSlider() {
    var mainBan = $(".js-main-banner .slider");
    var mainRecomConts = $(".js-main-recom-items .slider");

    // 상단배너
    if (mainBan.length) {
        mainBan.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true
        });
    }

    // 추천과정
    if (mainRecomConts.length) {
        mainRecomConts.slick({
            slidesToShow: 6,
            slidesToScroll: 2,
            // variableWidth: true,
            // arrows: false,
            dots: true,
            prevArrow: $(".js-main-recom-items").find(".btn-prev"),
            nextArrow: $(".js-main-recom-items").find(".btn-next"),
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    }
}

// 201102 추가 모바일 수강신청 상세검색 열기/닫기
function enrolmentSearch() {
    $(".js-btn-enrolment-folding").on("click", function() {
        var enrolmentFolding = $(".js-enrolment-folding");

        $(this).toggleClass("active");
        enrolmentFolding.toggleClass("on");

        if (enrolmentFolding.hasClass("on")) {
            $(this).text("닫기");
        } else {
            $(this).text("열기");
        }
    });
}