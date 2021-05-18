jQuery(document).ready( function() {
	
	//FAQ 스크립트
	jQuery(".faq a").click(function() {
	    jQuery(this).next().slideToggle("fast").parent().siblings().removeClass('active').children("div").hide();
	    jQuery(this).parent('li').toggleClass('active');
	    return false;
	});
	 	
    var lnbOne = jQuery('.lnb').find('.twoDepth').prev('a');
    var lnbTwo = jQuery('.lnb').find('li > .twoDepth');
    
    jQuery(lnbOne).parent('li').addClass('oneDepth');
    
    jQuery(lnbOne).click(function() {
        jQuery(this).next('.twoDepth').slideToggle('fast');
        jQuery(this).parent('li').toggleClass('open'); 
        return false;
    });
    
    if(jQuery(window).width() < 1023){
		gnbMenu(); 
	}
    
    // top button
	jQuery(window).on("scroll resize", function(){
		var wt = jQuery(this).scrollTop();
		var btn_top = jQuery(".toolBar");

		if(wt > 200){
			if(jQuery("#footer").offset() != null || jQuery("#footer").offset() != undefined){
				if(jQuery("#footer").offset().top  - jQuery(window).height() < wt){
				   btn_top.stop().animate({opacity:1});
				   btn_top.css({position:"absolute",bottom:jQuery("#footer").height() + 10})
				}else {
					btn_top.css({position:"",bottom:"10px"})
					btn_top.stop().animate({opacity:1});
				}
			}
		}else{
			btn_top.stop().animate({opacity:0});
		}
	});
    
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

