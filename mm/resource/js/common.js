// ie polyfill
(function iePolyfill() {
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
		// forEach
		if (window.NodeList && !NodeList.prototype.forEach) {
			NodeList.prototype.forEach = Array.prototype.forEach;
		}

		// closest
		if (window.Element && !Element.prototype.closest) {
			Element.prototype.closest = function(s) {
			  var matches = (this.document || this.ownerDocument).querySelectorAll(s), i, el = this;
			  do {
				i = matches.length;
				while (--i >= 0 && matches.item(i) !== el) {};
			  } while ((i < 0) && (el = el.parentElement));
			  return el;
			};
		}
	}
}());

let popup_click_history = '';
let $layerTarget;
const key = '@fs00i0b0a0TAadqEga#fCdlsKiqL1235';
const repeatStr = "*";
const lmIpList = [' 124.57.47.233', '58.143.39.176', '58.123.154.157', '222.121.98.245', '14.138.208.8'];
let widthCheck = {
	mobileWidth : 767,
	tabletWidth : 1024,
	currentWidth : function(){
		return window.innerWidth >= $(document).width() ? window.innerWidth : $(document).width();
	},
	isMobile : function(){
		return this.currentWidth() <= this.mobileWidth;
	},
	isTablet : function(){
		return this.currentWidth() <= this.tabletWidth;
	},
	isWeb : function(){
		return this.currentWidth() > this.tabletWidth;
	}
};

$(function(){
	gnbMenuEvent();

	//메인 스크롤 애니메이션 이벤트
	// if($(".main-wrap").length > 0) skrollr.init({ forceHeight: false });

	if($(".main-wrap").length > 0 && !$(".main-wrap").hasClass("new")){
		function getDurationVal(){
			return $(window).height();
		}
		let controller = new ScrollMagic.Controller();
		let revealElements = document.getElementsByClassName("section");
		for (let i=0; i<revealElements.length; i++) { // create a scene for each element
			new ScrollMagic.Scene({
				triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
				offset: 50,												 // start a little later
				triggerHook: 0.7,
				duration:getDurationVal
			})
				.setClassToggle(revealElements[i], "visible") // add class toggle
				// .addIndicators({name: "digit " + (i+1) }) // add indicators (requires plugin)
				.addTo(controller);
		}

		skrollr.init({
			// mobileCheck: function() {
			//   return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
			// }
		});
	};

	if($(".main-wrap").hasClass("new") && $(".main-invest").length > 0){
		$(window).scroll(mainScroll);
		mainScroll()
		function mainScroll(){
			if(!$(this).scrollTop()) $(".section.s-1").addClass("on");
			else $(".section.s-1").removeClass("on");

			let _step2 = $(".section.s-1").offset().top + $(".section.s-1").outerHeight() - Number($(".section.s-2 .visual-area").css("top").replace("px","")) + Number($(".section.s-2").css("padding-top").replace("px",""));
			if($(this).scrollTop() >= _step2){
				$(".section.s-2 .visual-area").addClass("on");
				$(".section.s-2").addClass("visible");
			}else $(".section.s-2 .visual-area").removeClass("on");

			let _step3 = $(".section.s-2").offset().top + $(".section.s-2").outerHeight() - $(this).height();
			if($(this).scrollTop() >= _step3){
				$(".section.s-3").addClass("visible");
			}

			let _step3_1 = _step3 + Number($(".section.s-3").css("padding-top").replace("px","")) + $(this).height()*0.55;
			let _step3_2 = _step3_1 + $(".section.s-3 .group").eq(1).position().top

			if($(this).scrollTop() > _step3_1 && $(this).scrollTop() < _step3_2) $(".section.s-3 .group").eq(0).addClass("on");
			else $(".section.s-3 .group").eq(0).removeClass("on");
			if($(this).scrollTop() > _step3_2){
				$(".section.s-3 .group").eq(1).addClass("on");
				$(".section.s-3 .group").eq(0).removeClass("on");
			}else{
				$(".section.s-3 .group").eq(1).removeClass("on");
				$(".section.s-3 .group").eq(0).addClass("on");
			}

			let _step4 = $(".section.s-3").offset().top + $(".section.s-3").outerHeight() - $(this).height() + Number($(".section.s-4").css("padding-top").replace("px","")) + $(this).height()*0.3;
			if($(this).scrollTop() >= _step4){
				$(".section.s-4").addClass("visible");
			}

			let _step5 = $(".section.s-4").offset().top + $(".section.s-4").outerHeight() - $(this).height() + Number($(".section.s-5").css("padding-top").replace("px","")) + $(this).height()*0.3;
			if($(this).scrollTop() >= _step5){
				$(".section.s-5").addClass("visible");
			}

		}
	}

	// 대출
	if($(".main-loan").length > 0){
		if($(".main-wrap").hasClass("new")){
			$(window).scroll(mainScroll);
			mainScroll()
			function mainScroll(){
				if(!$(this).scrollTop()) $(".section.s-1").addClass("on");
				else $(".section.s-1").removeClass("on");

				let _step2 = $(".section.s-1").offset().top + $(".section.s-1").outerHeight() - Number($(".section.s-2 .visual-area").css("top").replace("px","")) + Number($(".section.s-2").css("padding-top").replace("px",""));
				if($(this).scrollTop() >= _step2){
					$(".section.s-2 .visual-area").addClass("on");
					$(".section.s-2").addClass("visible");
				}else $(".section.s-2 .visual-area").removeClass("on");

				let _step3 = $(".section.s-2").offset().top + $(".section.s-2").outerHeight() - $(this).height() + Number($(".section.s-3").css("padding-top").replace("px","")) + $(this).height()*0.3;
				if($(this).scrollTop() >= _step3){
					$(".section.s-3").addClass("visible");
				}

				let _step4 = $(".section.s-3").offset().top + $(".section.s-3").outerHeight() - $(this).height() + Number($(".section.s-4").css("padding-top").replace("px","")) + $(this).height()*0.3;
				if($(this).scrollTop() >= _step4){
					$(".section.s-4").addClass("visible");
				}

				let _step5 = $(".section.s-4").offset().top + $(".section.s-4").outerHeight() - $(this).height() + Number($(".section.s-5").css("padding-top").replace("px","")) + $(this).height()*0.3;
				if($(this).scrollTop() >= _step5){
					$(".section.s-5").addClass("visible");
				}

				let ps = $(".main-loan .main-wrap .section.s-3").offset().top + $(".main-loan .main-wrap .section.s-3").outerHeight() - $(window).height();
				let pe = $(".main-loan .main-wrap .section.s-5").offset().top + $(".main-loan .main-wrap .section.s-5").outerHeight() - $(window).height();
				//페이지 중간부터 나오던 영역을 전체 다 고정되고 최하단만 고정 제거
				//if($(this).scrollTop() > ps && $(this).scrollTop() < pe){
				// if($(this).scrollTop() < pe){
				// 	$(".main-loan .main-wrap .section-btn").addClass("fixed")
				// }else{
				// 	$(".main-loan .main-wrap .section-btn").removeClass("fixed")
				// }
			}
		}else{
			$(window).scroll(loanScroll)
			loanScroll()
			function loanScroll(){
				let ps = $(".main-loan .main-wrap .section.s-3").offset().top + $(".main-loan .main-wrap .section.s-3").outerHeight() - $(window).height();
				let pe = $(".main-loan .main-wrap .section.s-5").offset().top + $(".main-loan .main-wrap .section.s-5").outerHeight() - $(window).height();
				//if($(this).scrollTop() > ps && $(this).scrollTop() < pe){
				if($(this).scrollTop() < pe){
					$(".main-loan .main-wrap .section-btn").addClass("fixed")
				}else{
					$(".main-loan .main-wrap .section-btn").removeClass("fixed")
				}
			}
			$(window).resize(loanResize)
			loanResize()
			function loanResize(){
				$(".main-loan .main-wrap .section-btn").height()
			}
		}
	}

	// 스타트업 상세 페이지 탭
	if($('.tab-list').length > 0) {
		let $tab_item = $('.tab-item');
		let $tab_cont = $('.detail-tab-cont');
		if(!$tab_item.hasClass('on')){
			$tab_item.first().addClass('on').attr('aria-selected','true');;
			$tab_cont.first().addClass('on');
		}else{
			let $idx = $('.tab-item.on').index()
			$tab_item.eq($idx).attr('aria-selected','true');;
			$tab_cont.eq($idx).addClass('on');
		}
		$tab_item.click(function(){
			let $this = $(this);
			let $idx = $(this).index()
			let $this_target = $('#' + $this.attr('aria-controls'));
			$tab_item.removeClass('on').attr('aria-selected','false');
			$this.addClass('on').attr('aria-selected','true');
			$tab_cont.hide();
			$this_target.show();
			if($this.parents('.startup-detail-info').length){
				if($idx === 1) {
					investInfoSwiper.update();
					irnfoSwiper.update();
				}else if ($idx === 2){
					newsSwiper.update();
					otherbusinessSwiper.update();
				};
			};
		});
	};

	//datepicker
	$( ".datepicker > input" ).datepicker({
		showOn: "button",
		buttonImage: "../resource//images/common/ico_calendar.png",
		buttonImageOnly: true,
		showButtonPanel: true,
		dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
		dateFormat: 'yy.mm.dd',
		showOtherMonths: true,
		onSelect: function (dateText) {
			$(this).siblings('.datepicker-input').val(dateText);
			$(this).parent().removeClass('show')
			$(this).parents('.filter-date').removeClass('calendar-open')
		},
		onChangeMonthYear: function() {
			setTimeout(function () {
				$('.ui-datepicker').focus();
				$('.ui-datepicker-prev, .ui-datepicker-next').attr('tabindex', '0')
			}, 0);
		}
	});
	$( ".datepicker.disabled > input").datepicker('disable');

	let dateFormat = "mm/dd/yy",
		from = $( ".rangepicker.from > input" )
			.datepicker({
				defaultDate: "+1w",
				numberOfMonths: 1,
				showOn: "button",
				buttonImage: "../images/common/ico_calendar.png",
				dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
				monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			})
			.on( "change", function() {
				to.datepicker( "option", "minDate", getDate( this ) );
			}),
		to = $( ".rangepicker.to > input" ).datepicker({
			defaultDate: "+1w",
			numberOfMonths: 1,
			showOn: "button",
			buttonImage: "../images/common/ico_calendar.png",
			dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
		})
			.on( "change", function() {
				from.datepicker( "option", "maxDate", getDate( this ) );
			});

	function getDate( element ) {
		let date;
		try {
			date = $.datepicker.parseDate( dateFormat, element.value );
		} catch( error ) {
			date = null;
		}

		return date;
	}

	// let dateFormat = "yy.mm.dd",
	// 	from = $( ".rangepicker.form > input" )
	// 		.datepicker({
	// 			defaultDate: "+1w",
	// 			changeMonth: true,
	// 			numberOfMonths: 3
	// 		})
	// 		.on( "change", function() {
	// 			to.datepicker( "option", "minDate", getDate( this ) );
	// 		}),
	// 	to = $( ".rangepicker.to > input" ).datepicker({
	// 		defaultDate: "+1w",
	// 		changeMonth: true,
	// 		numberOfMonths: 3
	// 	})
	// 	.on( "change", function() {
	// 		from.datepicker( "option", "maxDate", getDate( this ) );
	// 	});

	// function getDate( element ) {
	// 	let date;
	// 	try {
	// 		date = $.datepicker.parseDate( dateFormat, element.value );
	// 	} catch( error ) {
	// 		date = null;
	// 	}

	// 	return date;
	// }


	//인풋 셀렉트
	if($( ".inputDropbox" ).length > 0) {
		$(".inputDropbox .dropbox-list button").click(function(){
			let _this = $(this);
		//	_this.parent().parent().parent().parent().find("> input").val($(this).val());
			_this.parent().parent().parent().css("display","none");
			setTimeout(function(){
				_this.parent().parent().parent().attr("style","")
			},50)
			//
		});
	};

	//버튼 셀렉트
	// if($( ".btnDropbox" ).length > 0) {
	// 	$(".btnDropbox .dropbox-list button").click(function(){
	// 		let _this = $(this);
	// 		//_this.parent().parent().parent().parent().find("> input").val($(this).val());
	// 		//btnDropboxCallback($(this).val());
	// 		_this.parent().parent().parent().css("display","none");
	// 		setTimeout(function(){
	// 			_this.parent().parent().parent().attr("style","")
	// 		},50)
	// 		//
	// 	});
	// };

	//labelBox 셀렉트 선택시
	$(".labelBox > select").change(function(){
		$(this).addClass("selected");
	})

	$(".labelBox > select").each(function(i){
		let idx = $(this).find("option").index($(this).find("option:selected"));
		if(idx) $(this).addClass("selected");
	})

	//
	if($( ".table-response, .table-type1" ).length > 0){
		$("#content > .con-inner").addClass("bg-gray");
	}

	//리사이즈 217로 인한 주석처리
	// if($(".detail-tab-cont > .table-scroll").length > 0){
	// 	$(window).resize(tableResize);
	// 	tableResize();

	// 	function tableResize(){
	// 		if($(".header .btn-m-menu").width() !=0){
	// 			$(".detail-tab-cont > .table-scroll").width($(window).width()-77);
	// 		}else{
	// 			$(".detail-tab-cont > .table-scroll").css("width","");
	// 		}
	// 	}
	// }

	//대출관리 상단 박스
	if($(".loan-box").length > 0){
		$(".loan-box-head").click(function(){
			$(".loan-box").toggleClass("on");
		});
	}

// 	let idx = $(".labelBox option").index( $("#SelectBoxId option:selected") );

// console.log("선택한 index : " + idx);

	// 레이어 팝업
	popup = {
		open: function(target) {
			let $this = $(target);
			popup_click_history = $this;
			$layerTarget = $('#' + $this.attr('data-target'));
			$layerTarget.addClass("on").attr('tabindex','0').focus();
			if($layerTarget.hasClass("side")){
				$layerTarget.addClass("on");
			};
			$('body').addClass('layer-open')
		},
		close: function() {
			let $targetId = popup_click_history.attr('data-target');
			let $target = $('#' + $targetId);
			let _t = 0;
			if($layerTarget.hasClass("side")){
				$layerTarget.removeClass("on");
				_t = 300;
			}
			setTimeout(function(){
				$target.removeClass("on")
			},_t);
			popup_click_history.focus();
			$('body').removeClass('layer-open')
				try {
					closePopupCallback();
				} catch(e) {
				}
			$('body').removeClass('layer-open')
		}
	};

	$('.open-layer').each(function(){
		let attr = $(this).attr('data-target');
		$(this).attr('aria-controls', attr);
		$(this).on('click', function(){
			popup.open(this);
			return false;
		})
		$(this).keydown(function(key){
			if(key.keyCode == 13) {
				popup.open(this);
				return false;
			};
		});
	});

	$('.layer-popup').each(function(){
		$(this).attr('aria-modal','true').attr('role','dialog');
		$(this).find('.ly-close').on('click', function(){
			popup.close(this);
			return false;
		});
	});

	// 외부 영역 클릭 시 layer 닫히기
	$('html').on('mousedown', function(e){
		let $target = $(e.target);
		if(!$('.layer-popup').has(e.target).length && $('body').hasClass('layer-open') && !$target.hasClass('btn-delete') && !$target.hasClass('popup-trigger')){
			$('body').removeClass('layer-open');
			// $('.layer-popup').hide();
			let _t = 0;
			if($layerTarget.hasClass("side")){
				$layerTarget.removeClass("on");
				_t = 300;
			};
			setTimeout(function(){
				// $('.layer-popup').css('display','none');
				$('.layer-popup').removeClass("on");
			},_t);
			try {
				closePopupCallback();
			} catch(e) {
			}
		}
	});

	//테이블 소트 기능
	if($('.table-list.sort').length > 0) {
		$(".table-list.sort th").click(function(){
			if($(this).attr("class") == "up"){
				$(this).attr("class", "");
				$(this).addClass("down");
			}else if($(this).attr("class") == "down"){
				$(this).attr("class", "");
				$(this).addClass("up");
			}else{
				$(this).attr("class", "");
				$(this).addClass("down");
			};
		});
	};
	//테이블 아코디언 기능
	if($('.table-list.accordian').length > 0) {
		$(".table-list.accordian > table > tbody > tr:nth-child(odd)").click(function(){
			if($(this).hasClass("on")){
				$(".table-list.accordian tr").removeClass("on");
			}else{
				$(".table-list.accordian tr").removeClass("on");
				$(this).addClass("on");
				if($(this).parent().find(".chart").length){
					setTimeout(chartRefresh,1)
				}
				$(this).next().find(".tab-item").removeClass("on").eq(0).addClass("on");
				$(this).next().find(".detail-tab-cont").hide().eq(0).show();
			}
		});
	}

	//라벨박스 포커스
	$(".labelBox > input").focusin(function(){
		if(!$(this).attr("readonly")) $(this).parent().addClass("focus");
	})
	$(".labelBox > input").focusout(function(){
		if(!$(this).attr("readonly")) $(this).parent().removeClass("focus");
	})

	//
	if($("#content > .con-inner > div > .alert").length){
		$("#content > .con-inner > div").addClass("top-alert")
	}

	// table-list
	$(".table-list td .custom-checkbox").change(function(){
		if($(this).is(":checked")){
			//alert("체크박스 체크했음!");
			$(this).closest("tr").addClass("checked");
		}else{
			//alert("체크박스 체크 해제!");
			$(this).closest("tr").removeClass("checked");
		}
	})

	//
	if($(".layer-popup.full .table-list.table-scroll > table").length){
		let _t = 0
		$(".layer-popup.full .table-list.table-scroll > table colgroup col").each(function(idx, obj){
			_t += Number(obj.style.width.replace("px",""));
		})
		$(".layer-popup.full .table-list.table-scroll > table").width(_t);
	}
});

// header 영역 이벤트
let gnbMenuEvent = function() {
	let $header = $('.header')

	let $gnb = $('#gnb')
	let $mobileMenuBtn = $gnb.find('.btn-m-menu')
	let $mobileMenuClsBtn = $gnb.find('.btn-close')
	let $myinfoBtn =  $header.find('.log .btn-myinfo a[role="button"]')
	let $myBtn =  $header.find('.my .btn-myinfo a[role="button"]')
	$myinfoBtn.attr('tabindex','0')

	$mobileMenuBtn.on('click', function(){
		$('body').addClass('menu-open')
		return false;
	})
	$mobileMenuClsBtn.on('click', function(){
		$('body').removeClass('menu-open')
		return false;
	})


	$myinfoBtn.on('click', function(){
		$myBtn.parent().removeClass('show')
		$(this).parent().toggleClass('show')
		return false;
	})
	$myinfoBtn.keydown(function(key){
		if(key.keyCode == 13) {
			$(this).parent().toggleClass('show')
			return false;
		}
	})

	$myBtn.on('click', function(){
		$myinfoBtn.parent().removeClass('show')
		$(this).parent().toggleClass('show')
		return false;
	})
	$myBtn.keydown(function(key){
		if(key.keyCode == 13) {
			$(this).parent().toggleClass('show')
			return false;
		}
	})

	// $gnb.find('.has-sub').children('a').on('focusin', function(){
	// 	$(this).parent().addClass('focus')
	// 	return false;
	// })

	// $('html').on('focusin', function(e){
	// 	if(!$('#gnb .has-sub').has(e.target).length && $('#gnb .has-sub').hasClass('focus')){
	// 		$('#gnb .has-sub').removeClass('focus')
	// 	}
	// })
	$('html').on('click focusin', function(e){
		if(!$('.header-myinfo').has(e.target).length && $('.btn-myinfo').addClass('show')){
			$('.btn-myinfo').removeClass('show');
		} else if (!$gnb.has(e.target).length && $('body').hasClass('menu-open')){
			$('body').removeClass('menu-open');
		}
	})

	if($(".header .header-myinfo.my").length > 0){
		if($(".header .header-myinfo.my .link-menu > li").length == 3) $("#gnb").addClass("log-after1");
		else $("#gnb").addClass("log-after")
	}

	// 하단정보
	if ($(".total-bottom-area").length > 0) {
		$("#content").addClass("fixed");
		// $(document).scroll(totalScroll);
		// totalScroll();
		// function totalScroll(event){
		// 	let _c = $("html").height() + $(window).scrollTop();
		// 	let _goal = $(document).height() - $(".footer").outerHeight();

		// 	console.log(_c, _goal);
		// 	if (_goal < _c) {
		// 		$("#content").removeClass("fixed");
		// 	} else {
		// 		$("#content").addClass("fixed");
		// 	}
		// }
	}

	// 아코디언
	if($(".accor-area").length > 0){
		$(".accor-area > ul > li .head").click(function(e){
			e.preventDefault();

			if($(this).parent().hasClass("on")){
				$(".accor-area > ul > li").removeClass("on");
			}else{
				$(".accor-area > ul > li").removeClass("on");
				$(this).parent().addClass("on");
			}
		})
	}
}

// Focus Toggle class
function toggleFocus(e){
	if(e.type == 'focusin'){
		$(this).parent().addClass('focus')
	}else {
		$(this).parent().removeClass('focus')
	}
	return false;
}

// onclick open popup event
function openPopup (target) {
	let $this = $(target)
	popup_click_history = $this;
	$layerTarget = $('#' + $this.attr('data-target'));
	// $layerTarget.css('display','flex').attr('tabindex','0').focus();
	$layerTarget.addClass("on").attr('tabindex','0').focus();
	if($layerTarget.hasClass("side")){
		$layerTarget.addClass("on");
	};
	$('body').addClass('layer-open')
}
// onclick close popup event
function closePopup (target) {
	let $this = $(target)
	$layerTarget = $this.parents('.layer-popup')
	$layerTarget.removeClass("on").attr('tabindex','-1')
	let _t = 0;
	if($layerTarget.hasClass("side")){
		$layerTarget.removeClass("on");
		_t = 300;
	}
	setTimeout(function(){
		$this.removeClass("on");
	},_t);
	$('body').removeClass('layer-open')
}

//라인차트 기본옵션
let optionsLine = {
		title: {text: ''},
		subtitle: {text: ''},
		plotOptions: {
			series: {
				color: '#00A2E9'
			}
		},

		xAxis:{
			title: {text: ''},
			minPadding:0,
			maxPadding:0,
			// labels:{
			// 	enabled:false
			// },
			gridLineWidth:1
		},
		yAxis: {
			title: {text: ''},
			tickInterval:100,
			min:0,
			max:1000,
			gridLineWidth:0

		},
		tooltip: {
			borderWidth: 0,
			shadow: false,
			useHTML: true,
			backgroundColor:"#666f6f",
			borderRadius:10,
			style:{
				color:"#fff"
			},
			formatter: function() {
				return '<div class="wide-tooltip"><div class="clearer">'+this.key+'</div><div class="clearer">신용평점 : '+this.y+'</div></div>';
			}
		},
		legend: {
			enabled:false
		},
		credits: {
			enabled: false
		},
		series: [{
			marker: {
				enabled: false
			}
		}]

}

let optionsCircle = {
		title: {text: ''},
		subtitle: {text: ''},
		legend: {
			enabled:false
		},
		credits: {
			enabled: false
		},
		chart: {
			type: 'solidgauge',
			height: 80,
			width: 80,
			events: {
				//render: renderIcons
			},
			marginTop:0,
			marginLeft: 0,
			marginRight: 0,
			marginBottom: 0,
			spacingLeft: 0,
			spacingRight: 0,
			spacingBottom: 0
		},
		tooltip: {
			enabled: false
		},
		yAxis: {
			min: 0,
			max: 100,
			lineWidth: 0,
			tickPositions: []
		},
		plotOptions: {
			solidgauge: {
				dataLabels: {
					enabled: false
				},
				linecap: 'round',
				stickyTracking: false,
				rounded: true
			}
		},
		pane: {
			startAngle: 0,
			endAngle: 360,
			background: [{ // Track for Move
				outerRadius: '117.5%',
				innerRadius: '104%',
				backgroundColor: "#eee",
				borderWidth: 0
			}]
		},
		series: [{
			name: 'Move',
			data: [{
				radius: '117.5%',
				innerRadius: '104%',
				color:"#009DE9"
			}],
			dataLabels: [{
				align: 'center',
				enabled: true,
				borderWidth:0,
				y:-10,
				style:{
					fontWeight:"normal",
					color:"#999",
					fontSize:"10px"
				}
			}]
		}]
}

// 로딩
function loadProgress(_tar){
	$("body").addClass("loading-open");
	_tar.addClass("on")
	_tar.circleProgress({
		startAngle: -Math.PI / 4 * 2,
		lineCap: 'round',
		size:300,
		thickness:15,
		fill: {color: '#009DE9'},
		emptyFill: "#C7C7C7"
	}).on('circle-animation-progress', function(event, progress, stepValue) {
		// if(stepValue == 1) loadProgressComplete();
	});
}

function bindInputDropbox() {
	if($( ".inputDropbox" ).length > 0) {
		$(".inputDropbox .dropbox-list button").unbind("click").on("click", function(event) {
			event.stopPropagation();
			let _this = $(this);
			_this.parent().parent().parent().parent().find("> input").val($(this).val()).trigger("change");
			_this.parent().parent().parent().css("display","none");
			setTimeout(function() {
				_this.parent().parent().parent().attr("style","")
			},50)
		});
	};
}

function bindLayerPopupXBtn() {
	$('.layer-popup').each(function() {
		$(this).attr('aria-modal','true').attr('role','dialog');
		$(this).find('.ly-close').unbind('click').bind('click', function() {
			popup.close(this);
			return false;
		});
	});
}

function initChart(target, chartData, categories) {
	let c1 = Highcharts.chart(target, optionsLine);
	let series = {
		data: chartData,
		categories : categories,
	};
	c1.series[0].update({data:series.data});
	c1.xAxis[0].setCategories(series.categories);

	c1.reflowNow = function() {
		this.containerHeight = this.options.chart.height || window.window.HighchartsAdapter.adapterRun(this.renderTo, "height");
		this.containerWidth = this.options.chart.width || window.window.HighchartsAdapter.adapterRun(this.renderTo, "width");
		this.setSize(this.containerWidth, this.containerHeight, false);
		this.hasUserSize = null;
	}
}

function bindTabEvent() {
	if($(".tab-list").length > 0) {
		let $tab_item = $(".tab-item");
		let $tab_cont = $(".detail-tab-cont");
		if(!$tab_item.hasClass("on")) {
			$tab_item.first().addClass("on").attr("aria-selected", true);;
			$tab_cont.first().addClass("on");
		} else {
			let $idx = $(".tab-item.on").index()
			$tab_item.eq($idx).attr("aria-selected", true);
			$tab_cont.eq($idx).addClass("on");
		}
		$tab_item.click(function() {
			let $this = $(this);
			let $idx = $(this).index()
			let $this_target = $("#" + $this.attr("aria-controls"));
			$tab_item.removeClass("on").attr("aria-selected", false);
			$this.addClass("on").attr("aria-selected", true);
			$tab_cont.hide();
			$this_target.show();
			if($this.parents(".startup-detail-info").length) {
				if($idx === 1) {
					investInfoSwiper.update();
					irnfoSwiper.update();
				} else if($idx === 2) {
					newsSwiper.update();
					otherbusinessSwiper.update();
				};
			};
		});
	};
}

function bindTableChecked(callback, param) {
	$(".table-list td .custom-checkbox").unbind("change").on("change", function() {
		if($(this).is(":checked")) {
			$(this).closest("tr").addClass("checked");
		} else {
			$(this).closest("tr").removeClass("checked");
		}
		if(callback) {
			if(param) {
				callback(param);
			} else {
				callback();
			}
		}
	})
}

function createComma(value) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeComma(value) {
	return value.replace(/,/g, "");
}

/**
 * 원단위 절사를 위한 매소드
 * @param {*} value
 */
function removeOneFloor(value) {
	if(isNaN(value)) {
		return 0;
	}
	return Math.floor(value * 0.1) * 10;
}

/**
 * 반올림
 * @param {*} value
 * @returns
 */
function removeFixedRound(value) {
	if(isNaN(value)) {
		return 0;
	}
	return Math.round(value * 100) /100;
}

function alertPopup(targetId, title, contents) {
	$("#alert-title").html(title);
	$("#alert-contents").html(contents);
	//확인 버튼이나 X를 누를 경우 display:none이 세팅이 되므로 페이지내에서 재사용하면 나오지 않으므로 해당 style을 제거
	$("#" + targetId).attr('style', '');
	openPopup("#" + targetId);
}

function alertPopupClose() {
	$("#alert-title").html("");
	$("#alert-contents").html("");
}

function pageStartLoading() {
	startLoading($("body"));
}

function pageCloseLoading() {
	closeLoading($("body"));
}

function closeLoading(targetElement) {
	targetElement.waitMe("hide");
}

function startLoading(targetElement) {
	targetElement.waitMe({
		effect : "bounce",
		text : "",
		bg : "rgba(255,255,255,0.7)",
		color : "#00A2E9",
		maxSize : "",
		waitTime : -1,
		textPos : "horizontal",
		fontSize : "",
		source : "",
		onClose : function() {}
	});
}

function bindInvestMenu() {
	$(".nav-link").click(function() {
		let id = $(this).attr("id");
		location.href = "/invest/my-page/main?type=" + id.replace("-", "_");
		/*
		if(id) {
			$("#content").load("/invest/my-page/main?type=" + id.replace("-", "_"), function() {
				history.pushState({data: id}, null, "main#@" + id + "?type=" + id.replace("-", "_"));
				pageCloseLoading();
			});
		}
		*/
	});
}

function initDatepicker(callback) {
	$( ".datepicker > input" ).datepicker({
		showOn: "button",
		buttonImage: "../images/common/ico_calendar.png",
		buttonImageOnly: true,
		showButtonPanel: true,
		dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
		dateFormat: 'yy.mm.dd',
		showOtherMonths: true,
		onSelect: function(dateText) {
			$(this).siblings('.datepicker-input').val(dateText).trigger("change");
			$(this).parent().removeClass('show')
			$(this).parents('.filter-date').removeClass('calendar-open')
			callback();
		},
		onChangeMonthYear: function() {
			setTimeout(function() {
				$('.ui-datepicker').focus();
				$('.ui-datepicker-prev, .ui-datepicker-next').attr('tabindex', '0')
			}, 0);
		}
	});
}

function initFullTableCss() {
	if($(".layer-popup.full .table-list.table-scroll > table").length){
		let _t = 0
		$(".layer-popup.full .table-list.table-scroll > table colgroup col").each(function(idx, obj){
			_t += Number(obj.style.width.replace("px",""));
		})
		$(".layer-popup.full .table-list.table-scroll > table").width(_t);
	}
}

function downloadExcelSchedule(noteNumber){
	let url = '/invest/my-page/schedule/download/' + noteNumber;
	console.log("url : " + url);
	location.href = url;
}

function cipherInitialize(id, keyName, callback) {
    $("#" + id).on('focusout', function() {
            let pw = $(this).val();
            if(pw.length > 0 && $(this).hasClass("password-off")) {
				$(this).val(repeatStr.repeat(pw.length));
                localStorage.setItem(keyName, encrypt(pw));
                $(this).removeClass("password-off")
                $(this).addClass("password-on")
				if(callback) {
					callback(encrypt(pw));
				}
            }
    });

	// $("#" + id).on('input', function() {
	// 	let pw = $(this).val();
	// 	if(pw.length > 0 && $(this).hasClass("password-off")) {
	// 		// $(this).val(repeatStr.repeat(pw.length));
	// 		// localStorage.setItem(keyName, encrypt(pw));
	// 		// $(this).removeClass("password-off")
	// 		// $(this).addClass("password-on")
	// 		if(callback) {
	// 			callback(pw);
	// 		}
	// 	}
	// });


    $("#" + id).on('focusin', function() {
            let pw = $(this).val();
            if(pw.length > 0 && $(this).hasClass("password-on")) {
                let real = localStorage.getItem(keyName);
                $(this).val(decrypt(real));
                $(this).removeClass("password-on")
                $(this).addClass("password-off")
            }
    });
}

function encrypt(value) {
    return CryptoJS.AES.encrypt(value, key).toString()
}

function decrypt(value) {
    let bytes  = CryptoJS.AES.decrypt(value, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function beforeCheck(id, keyName) {
    let enc = localStorage.getItem(keyName);
    let dec = decrypt(enc);
    $("#"+id).val(dec);
    return dec.length;
}

function createAndAppendEncField(form, newFieldName, storageKey){
	$(form).append($('<input/>', {type: 'hidden', name: newFieldName, value: localStorage.getItem(storageKey)}));
}

// dom load 이후 실행 (추가 요소들)
document.addEventListener("DOMContentLoaded", function() {
	var headerElm = document.querySelector(".header")
	var footerElm = document.querySelector(".footer");

	// 비밀번호 보이기
	function passwordView() {
		var btnPwType = document.querySelector(".btn-pw-type");

		if (btnPwType !=null) {
			document.querySelector(".btn-pw-type").addEventListener("click", function() {
				var inputPw = document.querySelector(".input-box .input-pw");

				this.classList.toggle("is-on");
				this.closest(".input-box").classList.toggle("is-view");

				if (inputPw.type === "password") {
					inputPw.type = "text";
				} else {
					inputPw.type = "password";
				}
			});
		}
	}
	passwordView();

	// 대출 메인 하단 버튼
	var loanMain = document.querySelector(".main-loan");
	var mainWrapsNew = document.querySelector(".main-wrap.new");

	function loanMainBottom() {
		var loanFixedMenu = $(".main-loan .main-wrap .section-btn");

		if ($(document).scrollTop() > $(".main-loan .main-wrap .section.s-3").offset().top - 400) {
			loanFixedMenu.addClass('fixed')
		} else {
			loanFixedMenu.removeClass('fixed');
		}

		if (loanFixedMenu.offset().top + loanFixedMenu.height() >= $(".footer").offset().top - 10) {
			loanFixedMenu.removeClass("fixed");
		}
	}

	if (loanMain != null && mainWrapsNew != null) {
		loanMainBottom();

		document.addEventListener("scroll", function() {
			loanMainBottom();
		});
	}

	// #content 최소높이 설정으로 footer 하단 고정
	function minContentHeight() {
		var windowHeight = window.innerHeight;
		var headerHeight = headerElm.offsetHeight;

		if (footerElm != null ||  footerElm != null && footerElm.style.display == "block") {
			var footerHeight = footerElm.offsetHeight;

			document.querySelector("#content").style.minHeight  = windowHeight - footerHeight + "px";
		} else {
			document.querySelector("#content").style.minHeight  = windowHeight + "px";

			var totalBottomArea = document.querySelector(".total-bottom-area");

			if (totalBottomArea != null) {
				document.querySelector("#content").style.minHeight  = windowHeight + "px";
				// document.querySelector("#content").style.marginBottom = 0;
				document.querySelector("#content.fixed .con-inner").style.minHeight = windowHeight - headerHeight + "px";

				if (totalBottomArea.classList.contains("is-active")) {
					// document.querySelector("#content.fixed .con-inner").style.minHeight = windowHeight - headerHeight - totalBottomArea.offsetHeight + "px";
					document.querySelector("#content.fixed .con-inner").style.paddingBottom = totalBottomArea.offsetHeight + "px";
				}
			}
		}
	}

	var resizeTimer;
	if (document.querySelector("#content") != null) {
		minContentHeight();

		window.addEventListener("resize", function() {
			// 리사이즈후 한번만 실행
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				minContentHeight();
			}, 250);
		});
	}

	// 모바일 gnb 메뉴 위치 수정
	function mobileGnb() {
		var headerMyinfoMy = document.querySelector(".header-myinfo.my");
		var gnbLogafterMenulist = document.querySelector("#gnb.log-after .menu-list");

		if (gnbLogafterMenulist != null) {
			gnbLogafterMenulist.style.marginTop = headerMyinfoMy.offsetHeight + 96 + "px";
		}
	}

	// 모바일 햄버거 버튼 클릭
	if (document.querySelector(".btn-m-menu")) {
		document.querySelector(".btn-m-menu").addEventListener("click", function() {
			mobileGnb();
		});
	}

	// 드롭박스 small 리스트 ui 변경
	(function inputDropboxOption() {
		var inputDropboxBtn = document.querySelectorAll(".inputDropbox.small > span");
		var inputAmounts = document.querySelectorAll(".inputDropbox.small > input[type=text]");
		var inputDropboxListBtn = document.querySelectorAll(".inputDropbox.small > .dropbox-list button");

		// 닫기
		function inputDropboxClse() {
			[].forEach.call(document.querySelectorAll(".inputDropbox.small"), function(el) {
				el.classList.remove("is-active");
			});
		}

		inputDropboxBtn.forEach(function(item) {
			item.addEventListener("click", function() {
				if (this.closest(".inputDropbox.small").classList.contains("is-active")) {
					this.closest(".inputDropbox.small").classList.remove("is-active");
				} else {
					inputDropboxClse();

					this.closest(".inputDropbox.small").classList.add("is-active");
				}
			});
		});

		document.querySelectorAll(".inputDropbox.small").forEach(function(item) {
			item.addEventListener("mouseleave", inputDropboxClse, false);
		});

		inputAmounts.forEach(function(item) {
			item.addEventListener("focus", inputDropboxClse, false);
		});

		inputDropboxListBtn.forEach(function(item) {
			item.addEventListener("click", function() {
				var inputAmount = this.closest(".inputDropbox").querySelector("input[type=text]");
				var amountValue = this.value;

				inputAmount.value = amountValue;
				this.closest(".inputDropbox").classList.remove("is-active");
			});
		});
	}());

	// 버튼드롭박스 ui 변경
	(function btnDropboxOption() {
		var btnDropboxBtn = document.querySelectorAll(".btnDropbox > .btn-basic");
		var btnDropboxList = document.querySelectorAll(".btnDropbox .dropbox-list");
		var btnDropboxListBtn = document.querySelectorAll(".btnDropbox .dropbox-list ul li button");

		btnDropboxBtn.forEach(function(item) {
			item.addEventListener("click", function() {
				this.closest(".btnDropbox").classList.toggle("is-active");
			});
		});

		btnDropboxList.forEach(function(item) {
			item.addEventListener("mouseleave", function() {
				this.closest(".btnDropbox").classList.remove("is-active");
			});
		});

		btnDropboxListBtn.forEach(function(item) {
			item.addEventListener("click", function() {
				this.closest(".btnDropbox").classList.remove("is-active");
			});
		});
	}());

	// 마이페이지 대출관리
	(function loanItemSlide() {
		var  loanItem = document.querySelectorAll(".mypage-loanmanage .loan-item:not(.is-not) .loan-summary");

		loanItem.forEach(function(item) {
			item.addEventListener("click", function() {
				var thisLoanItem = this.closest(".loan-item");
				var loanMoreinfo = this.closest(".loan-item").querySelector(".loan-moreinfo");
				var loanMoreinfoHeight = loanMoreinfo.querySelector(".loan-moreinfo-box").offsetHeight;

				if (thisLoanItem.classList.contains("is-active") == false) {
					loanMoreinfo.style.height = loanMoreinfoHeight + "px";
					this.closest(".loan-item").classList.add("is-active");
				} else {
					loanMoreinfo.style.height = 0 + "px";
					this.closest(".loan-item").classList.remove("is-active");

					setTimeout(function() {
						loanMoreinfo.removeAttribute("style");
					}, 500);
				}
			}, false);
		});
	}());

	// 모바일 스크롤 헤더 슬라이드
	function headerSlide() {
		var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

		if (headerElm !== null) {
			var headerHeight = headerElm.offsetHeight;

			if (currentScroll > lastScroll){
				headerElm.classList.remove("header-down");
				headerElm.classList.add("header-up");
			} else {
				headerElm.classList.remove("header-up");
				headerElm.classList.add("header-down");

				if (currentScroll <= headerHeight) {
					headerElm.classList.remove("header-down");
				}
			}

			lastScroll = currentScroll <= 0 ? 0 : currentScroll;
		}
	}

	// fade up down 애니메이션
	(function fadeUpani() {
		// 대상
		// var fadeItem = $(".js-fadeUpItem");
		var fadeUpItem = document.querySelectorAll(".js-fadeUpItem");

		// 대상 위치 확인 후 실행
		function checkItem() {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			var windowHeight = window.innerHeight;
			var windowBottomPosition = (scrollTop + windowHeight);

			fadeUpItem.forEach(function(item, idx) {
				var elementHeight = item.offsetHeight;
				var elementTopPosition = item.offsetTop;
				// var elementBottomPosition = (elementTopPosition + elementHeight);

				if ((elementTopPosition <= windowBottomPosition - elementHeight)) {
					item.classList.add("fade-up");
				}
			});
		}

		// init
		window.addEventListener("scroll", checkItem, false);
	}());

	// 리스트 요소 비활성
	(function boardListDisabled() {
		var boardNotItem = document.querySelectorAll(".board .not input, .board .not select");

		boardNotItem.forEach(function(item) {
			item.disabled = true;
		});
	}());

	// 투자하기 하단정보
	(function totalBottomFade() {
		var totalBottomArea = document.querySelector(".total-bottom-area");

		if (totalBottomArea != null) {
			var formCheck = document.querySelectorAll(".table-list .mobile-checkall .form-check .custom-checkbox, .table-list .board .data-check .form-check .custom-checkbox, .table-list .board thead th:first-child .form-check .custom-checkbox");

			formCheck.forEach(function(item) {
				item.addEventListener("click", function() {
					var checkBoxChecked = document.querySelectorAll(".table-list .mobile-checkall .form-check .custom-checkbox:checked, .table-list .board .form-check .custom-checkbox:checked");
					var checkBoxCnt = checkBoxChecked.length;

					if (checkBoxCnt > 0) {
						document.querySelector("#content.fixed .con-inner").style.paddingBottom = totalBottomArea.offsetHeight + "px";

						totalBottomArea.classList.add("is-active");
					} else {
						document.querySelector("#content.fixed .con-inner").style.paddingBottom = 0;

						totalBottomArea.classList.remove("is-active");
					}
				});
			});
		}
	}());

	// 라디오 탭 메뉴
	var tabBtn = document.querySelectorAll(".js-tabBtn");
	var tabBox = document.querySelectorAll(".js-tabBox");

	tabBtn.forEach(function(item) {
		item.addEventListener("click", tabHandler);
	});

	function tabHandler(item) {
		var tabTarget = item.currentTarget;
		var target = tabTarget.dataset.tab;

		tabBox.forEach((target) => {
			target.classList.remove("is-active");
		});

		document.querySelector(`[data-box="${target}"]`).classList.add("is-active");
	}

	// 윈도우 리사이즈
	var resizeTimer2;
	window.addEventListener("resize", function() {
		clearTimeout(resizeTimer2);
		if (window.matchMedia("(max-width: 1024px)").matches) {
			// 리사이즈후 한번만 실행
			resizeTimer2 = setTimeout(function() {
				mobileGnb();
			}, 250);
		} else {
			var gnbMenuList = document.querySelector("#gnb.log-after .menu-list");

			document.querySelector("body").classList.remove("menu-open");

			if (gnbMenuList != null) {
				gnbMenuList.removeAttribute("style");
			}
		}
	});

	// 스크롤
	var didScroll;
	var lastScroll = 0;
	var timer = null;
	window.addEventListener("scroll", function() {
		// mobile check
		// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		// 	didScroll = true;

		// 	setInterval(function() {
		// 		if (didScroll) {
		// 			headerSlide();
		// 			didScroll = false;
		// 		}
		// 	}, 250);
		// }

		if (headerElm !== null) {
			didScroll = true;
			setInterval(function() {
				if (didScroll) {
					headerSlide();
					didScroll = false;
				}
			}, 250);

			// 스크롤 멈췄을때
			if(timer !== null) {
				clearTimeout(timer);
			}

			timer = setTimeout(function() {
				headerElm.classList.add("header-down");
			}, 800);
		}
	}, false);
});