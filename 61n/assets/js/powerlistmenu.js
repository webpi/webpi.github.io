/*Power List Menu By Dynamic Drive
* Created: March 3rd', 2015 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
* Updated Sept 20th, 16' to fix major "lazy-load" option bug causing menus to be rebuilt multiple times
*/

jQuery.extend(jQuery.easing, {  //see http://gsgd.co.uk/sandbox/jquery/easing/
	easeOutBack:function(x, t, b, c, d, s){
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	}
})


;(function(w, $){

	var defaults = {
		selectedul: 0,
		loadingdiv: '<div class="loadingscreen"><div>Fetching content...</div></div>', // HTML for loading screen while fetching Ajax content
		rightarrow: '<span class="right fa fa-angle-right"></span>', // HTML for right arrow markup. Defaults to using font-awesome icon font
		backarrow: '<span class="left fa fa-angle-left"></span>', // HTML for back/left arrow markup. Defaults to using font-awesome icon font
		slideduration: 500,
		easing: 'easeInOutCirc' // slide easing function
	}

	var menuzindex = 1000
	
	function flattenuls($mainul, cloneulBol, callback, finalcall){
		var callback = callback || function(){}
		var finalcall = finalcall || function(){}
		var $headers = $mainul.find('ul').parent()
		var $mainulcopy = cloneulBol? $mainul.clone() : $mainul
		var $flattened = jQuery(document.createDocumentFragment())
		var $headers = $mainulcopy.find('ul').parent()
		for (var i=$headers.length-1; i>=0; i--){ // loop through headers backwards, so we end up with topmost UL last
			var $header = $headers.eq(i)
			var $subul = $header.find('>ul').prependTo($flattened)
			callback(i, $header, $subul)
		}
		$mainulcopy.prependTo($flattened) // Add top most UL to collection
		finalcall($mainulcopy)
		return $flattened
	}

	w.Powerlistmenu = function(options){ // main constructor function
		var s = $.extend({}, defaults, options)
		var $nav = $('#'+s.menuid)
		var menuinstance = this
		this.s = s
		this.$nav = $nav
		this.buildcount = 0 // incrementing int added to CSS class of each header and corresponding sub UL to uniquely identify each pair
		this.$loadingscreen = $(s.loadingdiv).appendTo($nav)
		this.loadmenu(null, s.menucontent)
	}

	w.Powerlistmenu.prototype = {
		constructor: Powerlistmenu,

		loadmenu: function($target, menucontent){ // $target can be null, LI or UL containing data-lazyload attribute for lazy loading of sub menu or parent menu, respectively
			var menuinstance = this
			var $anchor = null
			var $reverseanchor = null

			function preparebuildmenu($anchor, $rootul, cloneulBol, $reverseanchor){
					menuinstance.buildmenu($anchor, $rootul, cloneulBol, $reverseanchor)
					if ($anchor){
							$anchor.trigger('click.showsubmenu')
					}
					else if ($reverseanchor){
							$reverseanchor.trigger('click')
					}
					else{
						menuinstance.selectMenu(menuinstance.s.selectedul)
					}
			}

			if (menucontent && (!$target || !$target.data('fetchstate') || $target.data('fetchstate') == 'error')){
				if ($target){ // if $target defined, meaning lazy load of Ajax content assoc with it
					$target.data('fetchstate', 'starting') // indicate Ajax content is being fetched, to prevent multiple fetches
				}
				$.ajax({
					url: menucontent,
					dataType: 'html',
					error:function(ajaxrequest){
						menuinstance.$loadingscreen.css({visibility: 'hidden'})
						if ($target){
							$target.data('fetchstate', 'error') // indicate Ajax content assoc with this target not loaded due to error
						}
						alert('Error fetching content.<br />Server Response: '+ajaxrequest.responseText)
					},
					success:function(content){
						var $rootul = $(content)
						if ($target){ // if $target param is not null, meaning content fetched via lazy loading
							$target.off('click.lazyload') // remove lazy load/fetch menu click action, as content is already fetched now
							$target.data('fetchstate', 'finished') // indicate Ajax content assoc with this target has loaded
							if ($target.prop('tagName') == 'LI')
								$anchor = $target
							else // tagName assumed to be breadcrumb DIV to fetch reverse parent menu
								$reverseanchor = $target
						}
						preparebuildmenu($anchor, $rootul, false, $reverseanchor)
					}
				})
			}
			else{
				var $rootul = this.$nav.find('>ul')
				preparebuildmenu($anchor, $rootul, true, $reverseanchor)
			}
		},

		buildmenu: function($anchor, $ul, cloneulBol, $reverseanchor){
			var $headers = $()
			var $reversebreadcrumb = null
			var menuinstance = this
			var cloneulBol = (typeof cloneulBol == 'undefined')? false: cloneulBol // clone the UL and manipulate new UL instead?
			var $flattened = flattenuls($ul, cloneulBol,
				function(i, $header, $subul){ // loop through header LIs and sub ULs
					$headers = $headers.add($header) // remember each $header to easily manipulate further later
					$header.addClass('header header' + menuinstance.buildcount).find('a:eq(0)').append(menuinstance.s.rightarrow) // add CSS class and arrow to each header
					var $submenu = $subul.wrap('<div class="drawer"/>').parent().addClass('submenu submenu' + menuinstance.buildcount) // reference outermost <div> container of sub UL and add CSS class
					$header.data('$dest', $submenu) // set up relationship between header and sub menu DIV
					$submenu.data('$parent', $header)
					if ($subul.data('selected') == 1){
						menuinstance.s.selectedul = $subul
					}
					menuinstance.buildcount++ // increment unique buildcount var to uniquely label each header/sub menu pair
					$('<div class="breadcrumb">' + $header.text() + '</div>').prepend(menuinstance.s.backarrow).prependTo($submenu) // add breadcrumb div to top of each sub menu DIV
				},
				function($mainul){ // top level root UL (after being flattened with no branches)
					$mainul.wrap('<div class="drawer"/>')
					if ($anchor != null){ //if $anchor param defined, meaning $mainul is a sub UL of an anchor element (ie: due to lazy loading of a sub UL), treat $mainul like another sub menu
						var $header = $anchor // set $header to $anchor param
						$headers = $headers.add($header)
						var headerbuildnum = $header.prop('className').match(/header(\d+)/i)[1] // find xx number inside class="header header xx"
						var $submenu = $mainul.parent() // reference outermost <div> container of sub UL
						$submenu.addClass('submenu submenu' + headerbuildnum)
						$header.data('$dest', $submenu) // set up relationship between header and sub menu DIV
						$submenu.data('$parent', $header)
						$('<div class="breadcrumb">' + $header.text() + '</div>').prepend(menuinstance.s.backarrow).prependTo($submenu) // add breadcrumb div to top of main sub UL DIV
					}
					else{
						if ($mainul.data('lazyload')){ // if "data-lazyload" and data-reverseheader="#reverseheaderid, header title" defined inside top most UL
							var headerinfo = $mainul.data('reverseheader').split(/,\s*/)
							$reversebreadcrumb = $('<div class="breadcrumb">' + headerinfo[1] + '</div>').prepend(menuinstance.s.backarrow).prependTo($mainul) // add reverse breadcrumb to main UL
							$reversebreadcrumb.data('lazyload', $mainul.data('lazyload')) // inside reverse breadcrumb store info about parent menu to fetch when clicked on
							$reversebreadcrumb.data('headerid', headerinfo[0].substr(1))
						}
					}
					if ($mainul.data('selected') == 1){
						menuinstance.s.selectedul = $mainul
					}
				}
			) // end flattenuls()
			if ($anchor == null && cloneulBol){ // if $flattened is a clone of original UL
				$ul.before($flattened) // insert $flattened before original UL
				$ul.remove() // then remove original UL
			}
			else{ // else, just add flattened UL to $nav
				this.$nav.append($flattened)
			}

			if ($reverseanchor){ // if $reverseanchor defined, meaning a breadcrumb when clicked on should fetch parent menu
				menuinstance.buildcount++
				var $dynamicheader = $('#' + $reverseanchor.data('headerid')) // target to-be-fetched header
				if ($dynamicheader.length == 1){
					$dynamicheader.addClass('header header' + menuinstance.buildcount).find('a:eq(0)').append(menuinstance.s.rightarrow) 
					var $submenu =  $reverseanchor.parent().parent('div.drawer').addClass('submenu submenu' + menuinstance.buildcount) // sub menu target header is assoc with
					$dynamicheader.data('$dest', $submenu) // set up relationship between header and sub menu DIV
					$submenu.data('$parent', $dynamicheader)
					$headers = $headers.add($dynamicheader)
				}
			}


			$headers.each(function(i){ // loop through each $header LI (one that carries a sub UL) again
				var $header = $(this)
				var $headermenu = $header.parents('div.drawer:eq(0)') // reference outer DIV.drawer that contains the header LI
				var $submenu = $header.data('$dest')
				var $breadcrumb = $submenu.find('div.breadcrumb')
				$header.on('click.showsubmenu', function(e){ // when user clicks on header
					$headermenu.css({zIndex: menuzindex++}).animate({left: '-100%'}, menuinstance.s.slideduration, menuinstance.s.easing)
					$submenu.css({zIndex: menuzindex++ , left: '100%'}).animate({left: 0}, menuinstance.s.slideduration, menuinstance.s.easing)
					e.preventDefault()
				})
				$breadcrumb.on('click', function(e){ // when user clicks on brumcrumb div at the top of each sub UL DIV
					$headermenu.css({zIndex: menuzindex++, left: '-100%'}).animate({left: 0}, menuinstance.s.slideduration, menuinstance.s.easing)
					$submenu.animate({left: '100%'}, menuinstance.s.slideduration, menuinstance.s.easing)
				})
			})

			var $lazyheaders= this.$nav.find('li[data-lazyload]')
console.log($lazyheaders.length)
			$lazyheaders.each(function(){
				var $header = $(this)
				$header.addClass('header header' + menuinstance.buildcount++) // find LIs with attribute "data-lazyload"
				$header.data('lazyload', $header.data('lazyload'))
				$header.removeAttr('data-lazyload') // remove "data-lazyload" attr from header while still retaining data('lazyload') value			
			})
			$lazyheaders.find('a:eq(0)').append(menuinstance.s.rightarrow) // add right arrow to them
			if ($reversebreadcrumb){
				$lazyheaders = $lazyheaders.add($reversebreadcrumb)
			}

			$lazyheaders.on('click.lazyload', function(e){ // when user clicks on a LI with "data-lazyload"
				menuinstance.$loadingscreen.css({visibility: 'visible'})
				var $header = $(this)
				menuinstance.loadmenu($header, $header.data('lazyload')) // Ajax fetch file specified inside "data-lazyload"
				$header.removeAttr('data-lazyload') // remove "data-lazyload" attr from header while still retaining data('lazyload') value
				e.preventDefault()
			})

			this.$loadingscreen.css({visibility: 'hidden'})

		},
		selectMenu: function(selector){
			var $targetmenu
			if (typeof selector == "number"){
				$targetmenu = this.$nav.find('div.drawer').eq(selector)
			}
			else{ // if string or jquery object
				$targetmenu = $(selector).parent('div.drawer')
			}
			if ($targetmenu.length == 0){
				$targetmenu = this.$nav.find('div.drawer').eq(0)
			}
			$targetmenu.css({left:0, zIndex: menuzindex++})
		}
	}

})(window, jQuery)