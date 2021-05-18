
jQuery(document).on("keypress", function(event) {
	var isSearch = false;
	if(event.keyCode == 13){
		if(jQuery(event.target).attr("onkeydown") != undefined){
			return false;
		}
		if(jQuery(event.target).parents("div").attr("id") == "searchDiv"){
			event.preventDefault();
			jQuery(".btnSearch").eq(0).trigger('click');
			isSearch = true;
		}else if(event.target.nodeName == 'INPUT' || event.target.type == 'textarea' || event.target.type == 'selectbox'){
			isSearch = true;
		}
			
		if(!isSearch){
			event.preventDefault();
			jQuery(".btnSearch").eq(0).trigger('click');
		}
	}
});
/**
 * 공통검색영역에서 쓰일 함수 
 */
function jsOrgnNmSearch(){
	selectbox_deletelist('p_srch_orgn_id');
	jQuery.ajax({
		url : '/common/search/getOrgnNmList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			p_srch_orgn_nm: jQuery('#p_srch_orgn_nm').val(),
			p_srch_eduseq_id: jQuery('#p_srch_eduseq_id').val()
			
		},
		success : function (data){
			selectbox_insertlist('p_srch_orgn_id',data.orgnNmList);
			orgn_id = jQuery("#srch_orgn_id").val();
			if(orgn_id){
				jQuery('#p_srch_orgn_id').val(orgn_id);
			}
		}
	});
};

//과정검색
function jsCrsNmSearch(){

	if(jQuery("#SEARCH_TAG_TYPE").val() == "crsseq" && jQuery("#p_srch_eduseq_id").val() == ""){selectbox_deletelist('p_srch_crsseq_id');selectbox_deletelist('p_srch_crscd');}
	if(jQuery("#SEARCH_TAG_TYPE").val() == "crs" && jQuery('#p_srch_crsnm').val().length < 2){selectbox_deletelist('p_srch_crscd');}
	selectbox_deletelist('p_srch_crscd');
	if(jQuery("#p_srch_crsseq_id").length > 0){
		selectbox_deletelist('p_srch_crsseq_id');
	}
	
	jQuery.ajax({
		url : '/common/search/getCrsNmList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			SEARCH_TAG_TYPE : jQuery('#SEARCH_TAG_TYPE').val(),    // 검색태그타입
			p_srch_edugrp_id: jQuery('#p_srch_edugrp_id').val(),   // 교육그룹 
			p_srch_opn_year: jQuery('#p_srch_opn_year').val(),     // 개설년도(과정)
			p_srch_edu_year: jQuery('#p_srch_edu_year').val(),     // 교육년도(교육차수)
			p_srch_eduseq_id: jQuery('#p_srch_eduseq_id').val(),   // 교육차수
			p_srch_orgn_id: jQuery('#p_srch_orgn_id').val(),       // 기관
			p_srch_hmpgcd: jQuery('#p_srch_hmpgcd').val(),         // 홈페이지
			p_srch_crs_frm_cd: jQuery('#p_srch_crs_frm_cd').val(), // 과정유형
			p_srch_crsnm: jQuery('#p_srch_crsnm').val(),           // 과정명
			p_srch_subjseq_useyn : jQuery('#p_srch_subjseq_useyn').val() // 과목사용여부
		},
		success : function (data){
			selectbox_insertlist('p_srch_crscd',data.crsNmList);
			crscd = jQuery("#srch_crscd").val();
			if(crscd){
				jQuery('#p_srch_crscd').val(crscd);
				jsCrsSeqNmSearch();
			}		
		}
	});
}

//과정에 연결된 CP검색
function jsCrsCpSearch(){
	selectbox_deletelist('p_srch_cpcomp_id');
	
	jQuery.ajax({
		url : '/common/search/getCrsCpList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			SEARCH_TAG_TYPE : jQuery('#SEARCH_TAG_TYPE').val(),    // 검색태그타입
			p_srch_edugrp_id: jQuery('#p_srch_edugrp_id').val(),   // 교육그룹 
			p_srch_opn_year: jQuery('#p_srch_opn_year').val(),     // 개설년도(과정)
			p_srch_edu_year: jQuery('#p_srch_edu_year').val(),     // 교육년도(교육차수)
			p_srch_eduseq_id: jQuery('#p_srch_eduseq_id').val(),   // 교육차수
			p_srch_orgn_id: jQuery('#p_srch_orgn_id').val(),       // 기관
			p_srch_hmpgcd: jQuery('#p_srch_hmpgcd').val(),         // 홈페이지
			p_srch_crs_frm_cd: jQuery('#p_srch_crs_frm_cd').val(), // 과정유형
			p_srch_crsnm: jQuery('#p_srch_crsnm').val(),           // 과정명
			p_srch_crscd: jQuery('#p_srch_crscd').val()            // 과정코드
		},
		success : function (data){
			selectbox_insertlist('p_srch_cpcomp_id',data.crsCpList);
		}
	});
}

//차수검색
function jsCrsSeqNmSearch(){
	selectbox_deletelist('p_srch_crsseq_id');
	//if(jQuery("#p_srch_subjseq_id").length > 0){
	//	selectbox_deletelist('p_srch_subjseq_id');
	//}
	//jQuery('#p_srch_subjseq_id').parent().hide();
	//jQuery('#p_srch_subjseq_viewyn').val('N');
	if(jQuery('#p_srch_crscd').val() == ''){return;}
	jQuery.ajax({
		url : '/common/search/getCrsSeqNmList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			p_srch_edugrp_id: jQuery('#p_srch_edugrp_id').val(),   // 교육그룹 
			p_srch_opn_year: jQuery('#p_srch_opn_year').val(),     // 개설년도(과정)
			p_srch_edu_year: jQuery('#p_srch_edu_year').val(),     // 교육년도(교육차수)
			p_srch_eduseq_id: jQuery('#p_srch_eduseq_id').val(),   // 교육차수
			p_srch_orgn_id: jQuery('#p_srch_orgn_id').val(),       // 기관
			p_srch_hmpgcd: jQuery('#p_srch_hmpgcd').val(),         // 홈페이지
			p_srch_crs_frm_cd: jQuery('#p_srch_crs_frm_cd').val(), // 과정유형
			p_srch_crsnm: jQuery('#p_srch_crsnm').val(),           // 과정명
			p_srch_crscd: jQuery('#p_srch_crscd').val()            // 과정코드
		},
		success : function (data){
			selectbox_insertlist3('p_srch_crsseq_id',data.crsSeqList);
			crsseq_id = jQuery("#srch_crsseq_id").val();
			if(crsseq_id){
				jQuery('#p_srch_crsseq_id').val(crsseq_id);
				//jsSubjSeqList();
			}
		}
	});
}
//교육년도 검색
function jsEduYearList(year,curyear){

	selectbox_deletelist('p_srch_edu_year');
	
	if(jQuery("#p_srch_subjseq_id").length > 0){
		selectbox_deletelist('p_srch_eduseq_id');
	}
	
	jQuery.ajax({
		url : '/common/search/getEduYearList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			p_srch_edugrp_id: jQuery('#p_srch_edugrp_id').val() 
		},
		success : function (data){
			if(data.eduYearList.length > 0){
				selectbox_insertlist('p_srch_edu_year',data.eduYearList);

				if(year){
					jQuery('#p_srch_edu_year').val(year);
					
					if(jQuery("#p_srch_eduseq_id").length > 0){
						jsEduSeqList();
					}
				}
			}
		}
	});
}
//교육차수 검색
function jsEduSeqList(){
	selectbox_deletelist('p_srch_eduseq_id');
	jQuery.ajax({
		url : '/common/search/getEduSeqList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			p_srch_edu_year: jQuery('#p_srch_edu_year').val(), 
			p_srch_edugrp_id: jQuery('#p_srch_edugrp_id').val()		
		},
		success : function (data){
			if(data.eduSeqList.length > 0){
				selectbox_insertlist('p_srch_eduseq_id',data.eduSeqList);
				eduseq_id = jQuery("#srch_eduseq_id").val();
				if(eduseq_id){
					jQuery('#p_srch_eduseq_id').val(eduseq_id);
					
					if ( jQuery("#p_srch_orgn_id").length > 0 ) {  jsOrgnNmSearch(); }
					if ( jQuery("#p_srch_crscd").length > 0 ) {  jsCrsNmSearch(); }
				}				
				//jQuery('#edu_seq').show();
			}/*else {
				jQuery('#edu_seq').hide();
			}*/
		}
	});
}
//교육차수 검색(열린강의)
function jsOpnCrsEduSeqList(){
	selectbox_deletelist('p_srch_eduseq_id');
	jQuery.ajax({
		url : '/common/search/getOpnCrsEduSeqList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			p_srch_year: jQuery('#p_srch_year').val(), 
			p_srch_orgn_nm: jQuery('#p_srch_orgn_nm').val(),
			p_srch_orgn_id: jQuery('#p_srch_orgn_id').val()	
		},
		success : function (data){
			if(data.eduSeqList.length > 0){
				selectbox_insertlist('p_srch_eduseq_id',data.eduSeqList);
			}
		}
	});
}
//관련 과목 리스트
function jsSubjList(){
	if(jQuery('#p_srch_crscd').val() == ''){
		
		selectbox_deletelist('p_srch_subjcd');
		jQuery("#p_srch_subjcd").parent().hide();
		return;
	}
	jQuery.ajax({
		url : '/common/search/getSubjCrsList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			p_srch_crscd: jQuery('#p_srch_crscd').val()
		},
		success : function (data){
			if(data.subjList.length > 0){
				selectbox_insertlist('p_srch_subjcd',data.subjList);
				jQuery('#p_srch_subjcd').parent().show();
			}else {
				selectbox_deletelist('p_srch_subjcd');
				jQuery('#p_srch_subjcd').parent().hide();
			}
		}
	});
}

//관련 차수과목 리스트
function jsSubjSeqList(){
	if(jQuery('#p_srch_crsseq_id').val() == ''){
		selectbox_deletelist('p_srch_subjseq_id');
		jQuery("#p_srch_subjseq_id").parent().hide();
		return;
	}
	jQuery.ajax({
		url : '/common/search/getSubjSeqList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			p_srch_crsseq_id: jQuery('#p_srch_crsseq_id').val()
		},
		success : function (data){
			if(data.subjSeqList.length > 0){
				selectbox_insertlist('p_srch_subjseq_id',data.subjSeqList);
				jQuery('#p_srch_subjseq_id').parent().show();
				jQuery('#p_srch_subjseq_viewyn').val('Y');
				subjseq_id = jQuery("#srch_subjseq_id").val();
				if(subjseq_id){
					jQuery('#p_srch_subjseq_id').val(subjseq_id);
				}
			}else {
				selectbox_deletelist('p_srch_subjseq_id');
				jQuery('#p_srch_subjseq_id').parent().hide();
				jQuery('#p_srch_subjseq_viewyn').val('N');
			}
		}
	});
}

function jsWorkPlcSearch(){
	selectbox_deletelist('p_srch_workplc_id');
	if(jQuery('#p_srch_orgn_id').val() == ''){return;}
	jQuery.ajax({
		url : '/common/search/getWorkPlcList.do',
		cache : false,
		async: false,
		dataType: 'json',
		data: {
			p_srch_orgn_id: jQuery('#p_srch_orgn_id').val() 
		},
		success : function (data){
			selectbox_insertlist('p_srch_workplc_id',data.workPlcList);
			workplc_id = jQuery("#srch_workplc_id").val();
			if(workplc_id){
				jQuery('#p_srch_workplc_id').val(workplc_id);
			}
		}
	});
}
