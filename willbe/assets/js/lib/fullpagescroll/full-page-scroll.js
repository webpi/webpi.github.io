/**
 * Full page
 */
(function () {
	'use strict';
	
	/**
	 * Full scroll main function
	 */
	var fullScroll = function (params) {
		/**
		 * Main div
		 * @type {Object}
		 */
		var main = document.getElementById(params.mainElement);
		
		/**
		 * Sections divclass
		 * @type {Array}
		 */
		var sections = main.getElementsByTagName('section');
		
		/**
		 * Full page scroll configurations
		 * @type {Object}
		 */
		var defaults = {
			container : main,
			sections : sections,
			animateTime : params.animateTime || 0.7,
			animateFunction : params.animateFunction || 'ease',
			maxPosition: sections.length - 1,
			currentPosition: 0,
			displayDots: typeof params.displayDots != 'undefined' ? params.displayDots : true,
			dotsPosition: params.dotsPosition || 'left'
		};

		this.defaults = defaults;
		/**
		 * Init build
		 */
		this.init();
	};

	/**
	 * Init plugin
	 */
	fullScroll.prototype.init = function () {
		this.buildPublicFunctions()
			.buildSections()
			.buildDots()
			.addEvents();

		var anchor = location.hash.replace('#', '').split('/')[0];
		location.hash = 0;
		this.changeCurrentPosition(anchor);
		this.registerIeTags();
	};

	/**
	 * Build sections
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.buildSections = function () {
		var sections = this.defaults.sections;
		for (var i = 0; i < sections.length; i++) {
			sections[i].setAttribute('data-index', i);
		}
		return this;
	};

	/**
	 * Build dots navigation
	 * @return {Object} this (fullScroll)
	 */
	fullScroll.prototype.buildDots = function () {		
		this.ul = document.createElement('ul');
		
		this.ul.className = this.updateClass(1, 'dots ', this.ul.className);
		this.ul.className = this.updateClass(1, this.defaults.dotsPosition == 'right' ? 'dots-right' : 'dots-left', this.ul.className);

		var _self = this;
		var sections = this.defaults.sections;		

		for (var i = 0; i < sections.length; i++) {
			var li = document.createElement('li');
			var a = document.createElement('a');
		
			a.setAttribute('href', '#' + i);			
			li.appendChild(a);
			_self.ul.appendChild(li);
		}

		this.ul.childNodes[0].firstChild.className = this.updateClass(1, 'is-active', this.ul.childNodes[0].firstChild.className);

		if (this.defaults.displayDots) {
			document.body.appendChild(this.ul);
		}

		return this;
	};

	/**
	 * Add Events
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.addEvents = function () {
		
		if (document.addEventListener) {
			document.addEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.addEventListener('wheel', this.mouseWheelAndKey, false);
			document.addEventListener('keyup', this.mouseWheelAndKey, false);
			document.addEventListener('touchstart', this.touchStart, false);
			document.addEventListener('touchend', this.touchEnd, false);
			window.addEventListener("hashchange", this.hashChange, false);

			/**
			 * Enable scroll if decive don't have touch support
			 */
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if(!('ontouchstart' in window)){
					document.body.style = "overflow: scroll;";
					document.documentElement.style = "overflow: scroll;";
				}
			}			

		} else {
			document.attachEvent('onmousewheel', this.mouseWheelAndKey, false);
			document.attachEvent('onkeyup', this.mouseWheelAndKey, false);
		}
		
		return this;
	};

	/**
	 * Build public functions
	 * @return {[type]} [description]
	 */
	fullScroll.prototype.buildPublicFunctions = function () {
		var mTouchStart = 0;
		var mTouchEnd = 0;
		var _self = this;

		this.mouseWheelAndKey = function (event) {
			if (event.deltaY > 0 || event.keyCode == 40) {	
				_self.defaults.currentPosition ++;
				_self.changeCurrentPosition(_self.defaults.currentPosition);
			} else if (event.deltaY < 0 || event.keyCode == 38) {
				_self.defaults.currentPosition --;
				_self.changeCurrentPosition(_self.defaults.currentPosition);	
			}
			_self.removeEvents();
		};

		this.touchStart = function (event) {
			mTouchStart = parseInt(event.changedTouches[0].clientX);
			mTouchEnd = 0;
		};

		this.touchEnd = function (event) {
			mTouchEnd = parseInt(event.changedTouches[0].clientX);
			if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
				if (mTouchEnd > mTouchStart) {
					_self.defaults.currentPosition --;
				} else {
					_self.defaults.currentPosition ++;					
				}
				_self.changeCurrentPosition(_self.defaults.currentPosition);
			}			
		};

		this.hashChange = function (event) {
			if (location) {
				var anchor = location.hash.replace('#', '').split('/')[0];
				
				// 루프 아닐때
				// if (anchor !== "") {
				// 	if (anchor < 0) {
				// 		_self.changeCurrentPosition(0);
				// 	} else if (anchor > _self.defaults.maxPosition) {
				// 		_self.changeCurrentPosition(_self.defaults.maxPosition);
				// 	} else {
				// 		_self.defaults.currentPosition = anchor;
				// 		_self.animateScroll();
				// 	}
				// }
				
				// 루프일때
				if (anchor !== "") {
					if (anchor < 0) {
						_self.changeCurrentPosition(_self.defaults.maxPosition);
					} else if (anchor > _self.defaults.maxPosition) {
						_self.changeCurrentPosition(0);
					} else {
						_self.defaults.currentPosition = anchor;
						_self.animateScroll();
					}
				}

				// 현재 섹션 클래스 활성화 todo 정리필요
				var sect = document.querySelectorAll(".section");
				Array.prototype.forEach.call(sect, function(item) {
					var sectIndex = item.getAttribute("data-index");

					if (anchor == sectIndex) {
						item.classList.add("is-active");
					} if (location.hash == "#" + sectIndex) {
						item.classList.add("is-active");
					} else {
						item.classList.remove("is-active");
					}

					// 카운터 애니메이션
					if (anchor === 2) {
						countUpLearner();
					} else if (anchor === 3) {
						countUpSystem();
					}
				});
				
				// 페이징 넘버 todo 정리필요
				var numberAnchor = Number(anchor);
				var currentCntInt = numberPad(numberAnchor + 1);

				currentCnt.text(currentCntInt);
			}
		};

		this.removeEvents = function () {
			if (document.addEventListener) {
			document.removeEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.removeEventListener('wheel', this.mouseWheelAndKey, false);
			document.removeEventListener('keyup', this.mouseWheelAndKey, false);
			document.removeEventListener('touchstart', this.touchStart, false);
			document.removeEventListener('touchend', this.touchEnd, false);

			} else {
				document.detachEvent('onmousewheel', this.mouseWheelAndKey, false);
				document.detachEvent('onkeyup', this.mouseWheelAndKey, false);
			}

			setTimeout(function(){
				_self.addEvents();
			}, 600);
		};

		this.animateScroll = function () {
			var animateTime = this.defaults.animateTime;
			var animateFunction = this.defaults.animateFunction;
			var position = this.defaults.currentPosition * 100;

			this.defaults.container.style.webkitTransform = 'translateX(-' + position + '%)';
			this.defaults.container.style.mozTransform = 'translateX(-' + position + '%)';
			this.defaults.container.style.msTransform = 'translateX(-' + position + '%)';
			this.defaults.container.style.transform = 'translateX(-' + position + '%)';
			this.defaults.container.style.webkitTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.mozTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.msTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.transition = 'all ' + animateTime + 's ' + animateFunction;

			for (var i = 0; i < this.ul.childNodes.length; i++) {
					this.ul.childNodes[i].firstChild.className = this.updateClass(2, 'is-active', this.ul.childNodes[i].firstChild.className);
					if (i == this.defaults.currentPosition) {
					this.ul.childNodes[i].firstChild.className = this.updateClass(1, 'is-active', this.ul.childNodes[i].firstChild.className);
				}
			}
		};

		this.changeCurrentPosition = function (position) {
			if (position !== "") {
				_self.defaults.currentPosition = position;
				location.hash = _self.defaults.currentPosition;

				// 현재 섹션 클래스 활성화 todo 정리필요
				var sect = document.querySelectorAll(".section");
				Array.prototype.forEach.call(sect, function(item) {
					var sectIndex = item.getAttribute("data-index");

					if (position == sectIndex) {
						item.classList.add("is-active");
					} else {
						item.classList.remove("is-active");
					}
					
					// 카운터 애니메이션
					if (position === 2) {
						countUpLearner();
					} else if (position === 3) {
						countUpSystem();
					}
				});

				// 페이징 넘버 todo 정리필요
				var currentCntInt = parseInt(_self.defaults.currentPosition + 1);
				currentCnt.text(numberPad(currentCntInt));
			}
		};

		this.registerIeTags = function () {
			document.createElement('section'); 
		};

		this.updateClass = function (type, newClass, currentClass) {
			if (type == 1) {
				return currentClass += newClass;
			} else if (type == 2) {
				return currentClass.replace(newClass, '');
			}
		};

		// 페이징 넘버 todo 정리필요
		var currentCnt = $(".scroll-paging .scroll-paging-current .cnt");
		var totalCnt = $(".scroll-paging .scroll-paging-total .cnt");
		var currentCntInt = parseInt(_self.defaults.currentPosition + 1);
		var totalCntInt = parseInt(_self.defaults.maxPosition + 1);

		currentCnt.text(numberPad(currentCntInt));
		totalCnt.text(numberPad(totalCntInt));

		// 자동 스크롤
		var autoPlay;
		function autoScroll() {
			autoPlay = setInterval(function(){
				if (_self.defaults.currentPosition < _self.defaults.maxPosition) {
					_self.defaults.currentPosition ++;
					_self.changeCurrentPosition(_self.defaults.currentPosition);
				} else {
					_self.changeCurrentPosition(0);
				}
			}, 7000);
		} autoScroll();
		
		// 멈춤
		$(".scroll-container").on("mouseover click tab touchstart touchend mousewheel wheel keyup", function () {
			clearInterval(autoPlay);
		});
		// 재시작
		$(".scroll-container").on("mouseout", function () {
			clearInterval(autoPlay);
			autoScroll();
		});

		return this;
	};
	window.fullScroll = fullScroll;
})();