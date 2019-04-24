$(document).ready(function(){
	$('.pic-slider').bxSlider({
		nextSelector: '#p-next',
		prevSelector: '#p-prev',
		nextText: '<img src="img/btn_pic_next.png" alt="����">',
		prevText: '<img src="img/btn_pic_prev.png" alt="����">',
		pagerCustom: '#pic-pager',
		auto: true,
		autoDelay: 300
	});
	
	$('.m-slider').bxSlider({
		nextSelector: '#m-next',
		prevSelector: '#m-prev',
		nextText: '<img src="img/btn_service_next.jpg" alt="����">',
		prevText: '<img src="img/btn_service_prev.jpg" alt="����">',
		pager : false,
		auto: true,
		autoDelay: 500
	});
	
	$('.client-slider').bxSlider({
		nextSelector: '#c-next',
		prevSelector: '#c-prev',
		nextText: '<img src="img/btn_client_next.jpg" alt="����">',
		prevText: '<img src="img/btn_client_prev.jpg" alt="����">',
		minSlides: 5,
		maxSlides: 6,
		slideWidth: 130,
		slideMargin: 10,
		pager : false,
		moveSlides: 1,
		auto: true
	});
});