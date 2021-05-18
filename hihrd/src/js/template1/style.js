
jQuery(function(){
	//시험 해설보기
	jQuery(".explain .btnView").click(function() {
	    jQuery(this).next().slideToggle("fast").parent().siblings().removeClass('active').children("div").hide();
	    jQuery(this).parent('.explain').toggleClass('active');
	    return false;
	});
});
