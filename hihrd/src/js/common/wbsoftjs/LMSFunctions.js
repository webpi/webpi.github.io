/*******************************************************************************
**
** @ Filename : LMSFunctions.js
**
*******************************************************************************/

// js 파일 완전 로딩

/* 학습창을 onLoad할 때 호출 */
function initPage() {	
	doInitialize();
}

/* 학습창을 onUnload할 때나 sco의 마지막 페이지까지 모두 보았을때 호출 */
function quitPage() {

	doCommit();
	var result;
	result = doTerminate();

}

/* 다음 차시 및 스코 이동 */
function NextSco(nextChapNum, nextScoNum){
	doNextPage();
}

/* 이전 차시 및 스코 이동 */
function PrevSco(prevChapNum, prevScoNum){
	doPrePage();
}

/* 페이지별 진도 처리 */
//page = 현재 페이지 넘버(ex:1), tpage = 전체페이지 넘버(ex:20)
function progress(page, tpage){ 
	if(page == "" || page == null || page == "undefined" || isNaN(page) || tpage == "" || tpage == null || tpage == "undefined" || isNaN(tpage)){
		doGetValue("cmi.error");
	} else {

		setBookmark(); // 차시 북마크등록
		doSetValue("cmi.location", page); // 페이지 북마크 등록
		var totalPage = parseInt(tpage, 10);
		var beforeProgress = doGetValue("cmi.progress_measure"); // 이전학습때 완료한 진도율
		var completion_status = doGetValue("cmi.completion_status"); // 학습 완료 상태
		var totalTime = doGetValue("cmi.total_time");		
		var progrsChkMthdzCd = doGetValue("cmi.progrs_chk_mthdz_cd"); //진도체크방식
		var lssnCmpltnBaseUseyn = doGetValue("cmi.lssn_cmpltn_base_useyn"); //차시완료기준사용여부
		var lssnCmpltnBaseCd = doGetValue("cmi.lssn_cmpltn_base_cd"); //차시완료기준코드
		var maxTimeAllowed = doGetValue("cmi.max_time_allowed"); //기준시간or기준백분율
		
		var presentProgress;
		if(progrsChkMthdzCd != "T")
		{
			if(beforeProgress == "" || beforeProgress == null || beforeProgress == "undefined") {
				beforeProgress = "0.0";
			}
			if(completion_status != "completed"){
				var pageSuccess = "cmi.objectives."+page+".success_status";
				doSetValue(pageSuccess, "passed" );

				var page_passCnt = doGetValue("cmi.objectives._count");
				var presentProgress = (Math.round((page_passCnt/totalPage)*100))/100;
				doSetValue("cmi.progress_measure",presentProgress);
				var dvcProg = (Math.round((presentProgress - beforeProgress)*100))/100 ;
				setDeviceProgress(dvcProg);
				
				if(lssnCmpltnBaseUseyn == "N"){
					if(presentProgress >= 1) {
						doSetValue("cmi.progress_measure","1.0");
						doSetValue("cmi.completion_status","completed");
					} else {
						doSetValue("cmi.completion_status","incompleted");
					}
				}else if(lssnCmpltnBaseUseyn == "Y"){
					if(lssnCmpltnBaseCd == "P"){
						if(presentProgress >= (maxTimeAllowed / 100)) {
							if(presentProgress >= 1) {
								doSetValue("cmi.progress_measure","1.0");
							}else{
								doSetValue("cmi.progress_measure",presentProgress);
							}
							doSetValue("cmi.completion_status","completed");
						
						} else {
							doSetValue("cmi.completion_status","incompleted");
						
						}
					}
				}
				
				doCommit();
				
			} else {
				//completed 일 경우 최근 진도율 안 따지고 1.0으로 초기화 해버리는 로직 삭제.
				if(lssnCmpltnBaseUseyn == "Y"){
					if(lssnCmpltnBaseCd == "P"){
						var pageSuccess = "cmi.objectives."+page+".success_status";
						doSetValue(pageSuccess, "passed" );
						
						var page_passCnt = doGetValue("cmi.objectives._count");
						var presentProgress = (Math.round((page_passCnt/totalPage)*100))/100;
						doSetValue("cmi.progress_measure",presentProgress);
					}else{
						doSetValue("cmi.progress_measure","1.0");
					}
				}else{
					doSetValue("cmi.progress_measure","1.0");
				}
			}
		}else
		{
			doCommit();
		}
	}

}

/* 진도체크와 상관 없이 플래시기반 및 동영상 이어서 보기만 할때 사용*/
/* set_Data 형식 = 시간이 저장되는 Page_저장될 시간 ex : 01_127 */
function doSetTime(set_Data){
	doSetValue("cmi.location_pagetime", set_Data);
	doCommit();
}

///* 동영상 시간별 진도체크 */
function movieTimeChk(totalTime, playTime, tpage, page){ // totalTime = 동영상 총 시간, playTime = 진행중인 시간, tpage = 전체페이지 넘버, page = 현재 페이지 넘버
	progressPageAndTime(totalTime, playTime, page, "P"); // 학습시간 기준 페이지 학습완료 처리
	progressPageAndTime(tpage, playTime, page, "A"); // progressPageAndTime 함수를 통해 처리된 페이지를 기준으로 학처리 함수
}

/* 세션타임 연장하기 */
function sessionTimeReset(){
	doSessionRefresh();
}

/* 컨트롤바 및 넥스트 버튼 제어시 별도 북마크 사용 */
function set_LocationPage(page){
	doSetValue("cmi.location", page); // 페이지 북마크 등록
	doCommit();
}

/* 콘텐츠내 컨트롤바 및 넥스트 버튼 제어 */
function getLearnFlag(page) { // page = 현재 페이지 넘버(ex:1)
	var jindoPage = parseInt(doGetValue("cmi.suspend_data"), 10);
	var completion_status = doGetValue("cmi.completion_status");

	if(completion_status == "completed") {
		return true;
	}

	if(jindoPage >= page) {
		return true;
	} else if(jindoPage < page) {
		return false;
	}
}

/* Suspend_Data내 page Set  */
function setSuspend_Data(page) {	
	var completion_status = doGetValue("cmi.completion_status"); // 학습 완료 상태
	
	if(completion_status != "completed"){
		doSetValue("cmi.suspend_data" , page);
	}	
}

/* 콘텐츠내 메뉴의 순차학습 제어 */
function getLearnJumpFlag(page){ // page = 이동할 페이지 넘버(ex:1)

	var jindoPage = parseInt(doGetValue("cmi.suspend_data"),10);
	var completion_status = doGetValue("cmi.completion_status");

	if(completion_status == "completed") {
		return true;
	}

	if(jindoPage+1 >= page) {
		return true;
	} else {
		return false;
	}
}

//############################################ 진도 처리를 위한 참조 함수 ##################################

function getCurTime()
{
    var date  = new Date();
    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
    var day   = date.getDate();
    var hour  = date.getHours();
    var min   = date.getMinutes();
    var sec   = date.getSeconds();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
    if (("" + hour).length  == 1) { hour  = "0" + hour;  }
    if (("" + min).length   == 1) { min   = "0" + min;   }
    if (("" + sec).length   == 1) { sec   = "0" + sec;   }

    return ("" + year + month + day + hour + min + sec);
}

//############################################ 진도 처리를 위한 참조 함수 끝 ##################################

/* 의견저장하기 */
function opinion_write(no, content){ // no = 의견저장하기의 순서 넘버, content = 의견 입력한 내용
	writeOpinion(no, content);	
}

/* 다른사람의견보기 */
function opinion_view(no) { // no = 의견저장하기의 순서 넘버
	viewOpinion(no);
}

/*Url로 부터 무브컨트롤 정보를 조회*/
function getMoveControlYn()
{
	var strURL = location.search;
    var tmpParam = strURL.substring(1).split("&");
    if(strURL.substring(1).length > 0){
        var Params = new Array;
        for(var i=0;i<tmpParam.length;i++){
            Params = tmpParam[i].split("=");
            if("move_control_yn" == Params[0]){
    		    if(Params[1] == "Y")
    		    {
    		        return "Y";
    		    }else
    		    {
    		    	return "N";
    		    }	
            }
        }
     }
     return "N";
}

/*북마크 조회*/
function getBookmark()
{
	var bookmark = doGetValue("cmi.location");
	return bookmark;
}

/*학습 완료 상태 조회*/
function getCompletion_status()
{
	var completion_status = doGetValue("cmi.completion_status")
	return completion_status;
}

function getCompletion_status()
{
	var completion_status = doGetValue("cmi.completion_status")
	return completion_status;
}

//state = 학습 완료 상태  // incompleted = 학습중, completed=학습완료 
function setCompletion_status(state)
{	
	doSetValue("cmi.completion_status", state);
}

/*Url로 부터 순차 정보를 조회 //S = 순차, R = 랜덤*/
function getStdy_prgrs_mthd_cd()
{
	var strURL = location.search;
    var tmpParam = strURL.substring(1).split("&");
    if(strURL.substring(1).length > 0){
        var Params = new Array;
        for(var i=0;i<tmpParam.length;i++){
            Params = tmpParam[i].split("=");
            if("stdy_prgrs_mthd_cd" == Params[0]){
    		    if(Params[1] == "S")
    		    {
    		        return "S";
    		    }else
    		    {
    		    	return "R";
    		    }	
            }
        }
     }
     return "R";
}