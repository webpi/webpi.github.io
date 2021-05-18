jQuery(function(){
	subCon();
	//FAQ 스크립트
	jQuery(".faq a").click(function() {
	    jQuery(this).next().slideToggle("fast").parent().siblings().removeClass('active').children("div").hide();
	    jQuery(this).parent('li').toggleClass('active');
	    return false;
	});
	 	
});

function subCon(){
	var com = ".component1";
	var sub = ".contentsWrap";
	var comH = jQuery(".component1").height();
	var subH = jQuery("#sub").height();
	
	if( comH < subH ) {
		jQuery(com).height(jQuery(sub).height());
	}else{
		jQuery(sub).height(jQuery(com).height());
	}
}
function menuMobile(){
	 var btn = '.allMenu';
	 var gnb = '.gnbWrap';
		 jQuery(gnb).addClass('active');
		 jQuery('<div class="dim" onClick="menuMobile2();"> </div>').appendTo('#wrap').find(".dim").fadeIn();
}
function menuMobile2(){

	 var gnb = '.gnbWrap';

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
		icoImgOffSet.left -=170;
		if(imgLeft <= -170*iconView){
			return;
		}
		jQuery(".userTab").animate({
			left: '-=170'
		},300);
		jQuery(".userTab").offset(icoImgOffSet);
	}else{
		icoImgOffSet.left +=170;
		if(imgLeft >= 0){
			var temp = imgLeft+170;
			jQuery(".userTab").animate({
				left: '+='-temp
			},300);				
			return;
		}
		jQuery(".userTab").animate({
			left: '+=170'
		},300);		
		jQuery(".userTab").offset(icoImgOffSet);
	}
};

