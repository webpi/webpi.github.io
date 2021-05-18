jQuery(function(){
	//FAQ 스크립트
	jQuery(".faq a").click(function() {
	    jQuery(this).next().slideToggle("fast").parent().siblings().removeClass('active').children("div").hide();
	    jQuery(this).parent('li').toggleClass('active');
	    return false;
	});
});

function menuMobile(){
	 var btn = ".allMenu";
	 var gnb = ".gnbWrap";

	 $(gnb).addClass('active');
	 $('<div class="dim" onClick="menuMobile2();"> </div>').appendTo('#wrap').find(".dim").fadeIn();

}
function menuMobile2(){
	 var btn = ".allMenu";
	 var gnb = ".gnbWrap";	 
	 
	 $(gnb).removeClass('active');
	 $('.dim').remove();	 
	 
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

//tab
function tabList2(num){	
    var f = jQuery('.learningTab').find('li');
    for ( var i = 0; i < f.length; i++ ) {			
        if ( i == num) {			
            f.eq(i).addClass('active');	
            jQuery('.learningContent' + i ).show();
        } else {
            f.eq(i).removeClass('active');					
            jQuery('.learningContent' + i ).hide();
        }
    }
};
//tab
function tabList3(num){	
    var f = jQuery('.memo').find('li');
    for ( var i = 0; i < f.length; i++ ) {			
        if ( i == num) {			
            f.eq(i).addClass('active');	
            jQuery('.memoContent' + i ).show();
        } else {
            f.eq(i).removeClass('active');					
            jQuery('.memoContent' + i ).hide();
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
		icoImgOffSet.left -=60;
		if(imgLeft <= -60*iconView){
			return;
		}
		jQuery(".userTab").animate({
			left: '-=60'
		},300);
		jQuery(".userTab").offset(icoImgOffSet);
	}else{
		icoImgOffSet.left +=60;
		if(imgLeft >= 0){
			var temp = imgLeft+60;
			jQuery(".userTab").animate({
				left: '+='-temp
			},300);				
			return;
		}
		jQuery(".userTab").animate({
			left: '+=60'
		},300);		
		jQuery(".userTab").offset(icoImgOffSet);
	}
};

jQuery(function(){
	//시험 해설보기
	jQuery(".explain .btnView").click(function() {
	    jQuery(this).next().slideToggle("fast").parent().siblings().removeClass('active').children("div").hide();
	    jQuery(this).parent('.explain').toggleClass('active');
	    return false;
	});
});
