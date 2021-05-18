jQuery(function(){
	//FAQ 스크립트
	jQuery(".faq a").click(function() {
	    jQuery(this).next().slideToggle("fast").parent().siblings().removeClass('active').children("div").hide();
	    jQuery(this).parent('li').toggleClass('active');
	    return false;
	});
	 	
});

jQuery(document).ready( function() {
    
//	jQuery(window).resize(function() {
//		if(jQuery(window).width() < 1023){
//			gnbMenu();
//		  }
//	});
	
	if(jQuery(window).width() < 1023){
		gnbMenu(); 
	  }
});


function gnbMenu() {
	var gnb = ".gnb";
	var gnbOne = jQuery(".gnb").find("li > .twoDepth").parent("li").children("a");;
    
    jQuery(gnbOne).parent("li").addClass('oneDepth');
    
    jQuery(gnbOne).click(function() { 
    	jQuery(this).next('.twoDepth').slideToggle("fast");
        jQuery(this).parent("li").toggleClass('close');
    });
	
}




function menuMobile(){
	 var btn = '.allMenu';
	 var gnb = '.gnb';
		 jQuery(gnb).toggleClass('active');
		 
		 jQuery(gnb).height(jQuery('body').height());
		 
		 //jQuery('<div class="dim" onClick="menuMobile2();"> </div>').appendTo('#wrap').find(".dim").fadeIn();
}
//function menuMobile2(){
//
//	 var gnb = '.gnb';
//
//		 jQuery('.dim').remove();
//		 jQuery(gnb).removeClass('active');
//	
//}


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
