$(function() {
    // html include용
	function includeHTML() {
        var z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("include-html");
            if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
				xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4) {
						if (this.status == 200) {elmnt.innerHTML = this.responseText;}
						if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
						/* Remove the attribute, and call this function once more: */
						elmnt.removeAttribute("include-html");
						includeHTML();
                	}
           		}
				xhttp.open("GET", file, true);
				xhttp.send();
				/* Exit the function: */
				return;
            }
        }
    }

    // login input label animation
    function loginForm() {
		var iform = $("#login .iform");

	    iform.focusin(function() {
	    	$(this).find("label").addClass("active");
	    	$(this).removeClass("iblur");
		});

		iform.focusout(function() {
			if ($(this).find(".istyle").val().length != 0) {
				$(this).find("label").addClass("active");
				$(this).addClass("iblur");
			} else {
				$(this).find("label").removeClass("active");
			}
		});
	}

    // 헤더 프로필
    function headerProfile() {
        $(document).on("click mouseover", "#header .header-aside-user .btn-user", function() {
           $("#header .header-aside-user .header-aside-user-profile").toggleClass("on"); 
        });

        $(document).on("mouseleave", "#header .header-aside", function() {
           $("#header .header-aside-user .header-aside-user-profile").removeClass("on"); 
        });
    }

    // 리크루터 서브메뉴
    function subNav() {
        $(document).on("click", "#gnb .btn-recruiter", function(e) {
            e.preventDefault()
            $("#header .gnb-sub").toggleClass("on"); 
        });
    }

    //채용공고 검색
    function jobsSearch() {
        $(document).on("click", ".cpn-jobs-search .btn-open", function() {
           $(".cpn-jobs-search").removeClass("folding");
           $(".cpn-jobs-search .jobs-search-body").slideDown("fast");
        });
        $(document).on("click", ".cpn-jobs-search .btn-clse", function() {
           $(".cpn-jobs-search").addClass("folding");
           $(".cpn-jobs-search").find(".jobs-search-body").slideUp("fast");
        });
    }

    // 회원가입 약관
    function policyDetail() {
        var policy = $(".section-join .join-box-form-policy");
        var policybox = $(".section-join .join-box-form-policy .policybox");
        var icheckAll = policy.find(".policycheckall");
        var icheck = policy.find(".policycheck");

        policy.find(".btn-detail").click(function() {
            $(this).toggleClass("on").closest("li").find(policybox).slideToggle("fast");
        });

        icheckAll.click(function() {
            icheck.prop('checked', this.checked);
        });
        icheck.click(function() {
            if (icheck.prop('checked').length ==  icheck.length) {
                icheckAll.prop('checked', true);
            } else {
                icheckAll.prop('checked', false);
            }
        });
    }

    // 회원가입 성공 선택
    function initJoinSwiper() {
        if ($(".join-success-swiper").length) {
            var joinSwiper = new Swiper ('.join-success-swiper', {
                wrapperClass: 'join-success-wrap',
                slideClass: 'join-success-swiper-item',
                slidesPerView: 3,
                spaceBetween: 20,
                allowTouchMove: false,
                breakpoints: {  
    
                    // when window width is <= 320px     
                    480: {       
                        slidesPerView: 1,
                        loop: true,
                        spaceBetween: 0,
                        allowTouchMove: true,
                        speed: 400,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                    },     
                } 
            });
        }
    }

    // about us 상단
    function aboutUsTop() {
        if ($(".aboutus-top-swiper").length) {
            var joinSwiper = new Swiper ('.aboutus-top-swiper', {
                wrapperClass: 'aboutus-top-swiper-wrap',
                slideClass: 'aboutus-top-swiper-item',
                slidesPerView: 1,
                slidesPerView: 1,
                loop: true,
                speed: 400,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.btn-swiper-next',
                    prevEl: '.btn-swiper-prev',
                },
            });
        }
    }

    // 인맥 로컬메뉴 모바일 전체보기
    function networkingLnb() {
        $(document).on("click", ".section-networking .lnb-list-nav .lnb-all .btn-all", function() {

            $(this).toggleClass("active");
            $(".section-networking .lnb-list-nav .lnb-all .lnb-all-list").toggleClass("on");
        });
    }

    // 인맥 폴더 슬라이딩
    function networkingFolder() {
        $(document).on("click", ".section-networking .btn-networking-manage-folder", function() {

            $(this).toggleClass("on");
            $(".section-networking .networking-manage-folder").toggleClass("on");
        });
    }

    // 인맥 폴더 이동
    function networkingFolderMove() {
        $(document).on("click", ".section-networking .networking-manage-list-top-menu .btn-folder-move", function() {

            $(this).toggleClass("on");
            $(".section-networking .networking-manage-list-top-menu .folder-move-list").toggleClass("on");
        });
    }

    // 페이지 알림 닫기
    function wrapNotiClse() {
        $(document).on("click", ".wrap-noti .btn-clse", function() {
            $(this).closest(".wrap-noti").remove();
        });
    }

    // 리크루터 프로젝트 리스트
    function recruiterProjectList() {
        $(document).on("click", ".cpn-project-board .project-board .btn-project-more", function() {
            $(this).closest("tbody").find("tr").css("display", "block");
        });
    }

    // 리크루터 프로젝트 상세 jd
    function recruiterProjecViewJd() {
        $(document).on("click", ".recruiter-project .jd-list .btn-list-more", function() {
            $(this).closest(".list-wrap").find(".list li").show();
        });
    }

    // 리크루터 프로젝트 종료/빌링 더보기
    function recruiterProjecViewMore() {
        $(document).on("click", ".recruiter-project .btn-close-more, .recruiter-project .btn-billing-more", function() {
            $(this).find("i").toggleClass("icon-down-arrow");
            $(this).next(".info-lft-box").slideToggle("fast");
        });
    }

    // 리크루터 프로젝트 히스토리 댓글
    function recruiterProjecHistoryCmnt() {
        $(document).on("click", ".recruiter-project .history-main-item .btn-cmnt", function() {
            $(this).closest(".history-main-item").find(".main-item-cmnt").fadeToggle("fast");
        });
    }

    // 리크루터 명함철 메모
    function recruiterCardMemo() {
        $(document).on("click", ".cpn-client-card .btn-memo", function() {
            $(this).next(".info-memo-conts").toggle();
        });

        $(document).on("click", ".cpn-client-card .info-memo-conts .btn-clse", function() {
            $(this).closest(".info-memo-conts").hide();
        });
    }

    // 로컬서치 상세검색
    function cpnLocalSearch() {
        $(document).on("click", ".cpn-local-search .btn-detail", function() {
            $(this).closest(".cpn-local-search").find(".local-search-detail").fadeToggle("fast");
        });
    }    

    includeHTML();
	loginForm();
    policyDetail();
    subNav();
    jobsSearch();
    initJoinSwiper();
    headerProfile();
    networkingLnb();
    wrapNotiClse();
    networkingFolder();
    networkingFolderMove();
    aboutUsTop();
    recruiterProjectList();
    recruiterProjecViewJd();
    recruiterProjecViewMore();
    recruiterProjecHistoryCmnt();
    recruiterCardMemo();
    cpnLocalSearch();
});

$(window).on("load", function () {
    gnbActive();

	// gnb 임시 - 개발시 삭제
    function gnbActive() {
        var gnbTg = $("#gnb a");
		var path = window.location.pathname;

		gnbTg.removeClass("active");

		gnbTg.each(function(){
			if ($(this).attr("href") === path) {
				$(this).addClass("active");
			} else if (path.split('/').slice(0, -1).join('/') === "/recruiter") {
                $("#gnb .btn-recruiter").addClass("active");
                $("#header .gnb-sub").addClass("on");
            }
		});
    }
});

// header scroll event
var didScroll;
var lastScrollTop = 0;
var delta = 70;
var headerHeight = $('#header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > headerHeight){
        // Scroll Down
        var heightBody = $("#header .header-body").outerHeight();
        // console.log(heightBody);
        $('#header').addClass("fixed").addClass('up').height(heightBody);
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#header').removeClass('up');
        }

        // top일때
        if (st <= 5) {
            $("#header").removeClass("fixed").removeAttr("style");
        }
    }
    
    lastScrollTop = st;
}