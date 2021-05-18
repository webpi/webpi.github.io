// 인기 검색어 통합검색 Api 호출
var popwordTotal = 0;
function jsSearchPopword() {
	displayWorkProgress();
	jQuery.ajax({
		url : '/usrs/unifiedSearch/search/searchPopwordApi.do',
		cache : false,
		type:'POST',
		dataType : 'json',
		data : {
			target : 'popword'
			, collection : 'TOTAL_SEARCH'
			, range : 'M'
			, datatype : 'json'
		},
		async:false,
		success : function(result){
			var data = result.Data;
			var tag = "";


			var countVal = 0;
			var divVal = 4; // pc: 4 모바일 :2
			if(navigator.userAgent.indexOf("APP_Running")>-1){
				divVal = 2;
			}
			jQuery.each(data.Query ,function(key,obj){
				if(key%divVal == 0) {
					tag += '<div class="search-tag-list srchKewordDiv_'+countVal+'">';
				}

				tag += '<a href="javascript:void(0);" onclick="jsApiKewordSearch(this);" class="btn-search-tag"><span>#'+obj.content+'</span></a>';

				if(key%divVal == (divVal-1) || key == (data.Query.length-1)) {

					tag += '</div>';

					tag += '<div class="search-tag-control control_'+countVal+'">';
					tag += '<button type="button" class="btn-search-tag-prev" onclick="jsSrchPrev('+countVal+');"><span class="ir">이전</span></button>';
					tag += '<button type="button" class="btn-search-tag-next" onclick="jsSrchNext('+countVal+');"><span class="ir">다음</span></button>';
					tag += '</div>';

					if (key%divVal == (divVal-1)) {
						countVal++;
						popwordTotal++;
					}
				}
			});

			jQuery(".search-tag").html(tag);

			jQuery("div[class^='search-tag-list']").each(function (key, obj) {
				if(key != 0) {
					jQuery(obj).hide();
				}
			});

			jQuery("div[class^='search-tag-control']").each(function (key, obj) {
				if(key != 0) {
					jQuery(obj).hide();
				}
			});

			closeWorkProgress();
		}
	});
}

// 검색 인기검색어 이전
function jsSrchPrev(key) {
	if ( key == 0) {
		return;
	} else {
		jQuery(".srchKewordDiv_"+ (parseInt(key)-1)).show();
		jQuery(".control_"+ (parseInt(key)-1)).show();

		jQuery(".srchKewordDiv_"+ key).hide();
		jQuery(".control_"+key).hide();
	}
}

// 검색 인기검색어 다음
function jsSrchNext(key) {
	if (isNull2(jQuery(".srchKewordDiv_"+ (parseInt(key)+1)).html())) {
		return;
	} else {
		jQuery(".srchKewordDiv_"+ (parseInt(key)+1)).show();
		jQuery(".control_"+ (parseInt(key)+1)).show();

		jQuery(".srchKewordDiv_"+ key).hide();
		jQuery(".control_"+key).hide();
	}
}

function jsApiKewordSearch(obj) {
	var kewordText = jQuery(obj).children().text().replace("#","");
	jQuery("#p_unified_srch_text").val(kewordText);
	doUnifiedSerach();
}
// 키워드 검색

// 자동완성 기능 API 호출
function jsSearchArk(srchNm) {
	if(isNull2(srchNm)) {
		jQuery(".search-list-word").html("");
	}

	displayWorkProgress();
	jQuery.ajax({
		url : '/usrs/unifiedSearch/search/searchArkApi.do',
		cache : false,
		type:'POST',
		dataType : 'json',
		data : {
			query : srchNm
			, target : 'ptllms_crcl'
			, convert : 'fw'
			, charset : 'UTF-8'
			, range : 'M'
			, datatype : 'json'
		},
		async:false,
		success : function(result){
			// 성공 0 실패 -1
			var tag = "";
			if (result.responsestatus == 0) {
				var data = result.result;
				jQuery.each(data ,function(key,obj){
					if (obj.totalcount > 0) {
						jQuery.each(obj.items, function(key2,obj2){

							if (key2 == 0) {
								tag += '<li id="ac-list-selected" role="option" aria-selected="true" tabindex="0" class="search-list-item"><a href="javascript:void(0);" onclick="jsApiKewordSearch(this);"><span>'+obj2.hkeyword+'</span></a></li>';
							} else {
								tag += '<li role="option" aria-selected="false" tabindex="0" class="search-list-item" id=""><a href="javascript:void(0);" onclick="jsApiKewordSearch(this);"><span>'+obj2.hkeyword+'</span></a></li>';
							}

						});
					}
				});
			}

			jQuery(".search-list-word").html(tag);
			searchForm();
			closeWorkProgress();
		}
	});




}