/**
 * studyLimitTimeCheck.js    
 *                                                                    
 * Description : 수강시간 제한 이벤트                               
 * Author : 류정희                                       
 * Since : 2019.03.05                                 
 * Modification information                           
 * 수정일 		    수정자		 	수정내용     
 * ------------ 	------------ 	------------       
 * 2019.03.05	  	류정희		    최초생성
 * 
 */
var classRmPopupList = [];
var studyLimitTime = null;
var studyLimitMoveTime = 30;
var studyLimitLoopTime = 1;
var studyLimitLoopCnt = 0;
var studyLimitDataObj = null;

jQuery(document).ready(function(){

	studyLimitTimeCheck();

});

function studyLimitTimeData(){
	var resultFlag = true;
	
	jQuery.ajax({
        type: 'POST',
        url: "/common/selectAgrmntCheck.do",
        async: false,
        dataType: "json",
        data: {
             p_crsseq_id : jQuery("#form_menu input[name=p_crsseq_id]").val()
			,p_crscd : jQuery("#form_menu input[name=p_crscd]").val()
        },
        success: function (result) {
        	if(result.stdyTimeLmtList != null){
        		if(result.stdyTimeLmtList.length > 0){
        			studyLimitDataObj = result;
        			studyLimitLoopCnt = 0;
        			resultFlag = studyLimitTimeValidation();
        		}
        	}
        }
    });
	
	return resultFlag;
}

function studyLimitTimeValidation(){
	var resultFlag = true;
	var result = studyLimitDataObj;
	
	if(result.stdyTimeLmtList != null){
		if(result.stdyTimeLmtList.length > 0){
			var weekCode = new Array('07','01','02','03','04','05', '06');
			var nowDate = new Date(result.serverDate);
			
			nowDate.setMinutes(nowDate.getMinutes() + Number(studyLimitLoopTime * studyLimitLoopCnt))
			
			var nowTime = toTimeString(nowDate);
			var nowWeek = weekCode[nowDate.getDay()];
			var weekLimitCode = null;
			
			for(var i = 0; i < result.stdyTimeLmtList.length; i++){
				if(resultFlag){
		    		if(Number(result.stdyTimeLmtList[i].STDY_TIME_LMT_STAT_DT_VIEW.substring(0, 8)) <= Number(nowTime.substring(0, 8))
    						&& Number(result.stdyTimeLmtList[i].STDY_TIME_LMT_END_DT_VIEW.substring(0, 8)) >= Number(nowTime.substring(0, 8))){
		    			
		    			if(Number(result.stdyTimeLmtList[i].STDY_TIME_LMT_STAT_DT_VIEW.substring(8, 12)) <= Number(nowTime.substring(8, 12))
        						&& Number(result.stdyTimeLmtList[i].STDY_TIME_LMT_END_DT_VIEW.substring(8, 12)) >= Number(nowTime.substring(8, 12))){
		    				weekLimitCode = new Array();
        					
        					if(Number(result.stdyTimeLmtList[i].STRT_DAY_CD) > Number(result.stdyTimeLmtList[i].END_DAY_CD)){
        						for(var j = Number(result.stdyTimeLmtList[i].STRT_DAY_CD); j <= 7; j++){
        							weekLimitCode.push("0"+ j);
        						}
        						
        						for(var j = 1; j <= Number(result.stdyTimeLmtList[i].END_DAY_CD); j++){
        							weekLimitCode.push("0"+ j);
        						}
        					}else if(Number(result.stdyTimeLmtList[i].STRT_DAY_CD) < Number(result.stdyTimeLmtList[i].END_DAY_CD)){
        						for(var j = Number(result.stdyTimeLmtList[i].STRT_DAY_CD); j <= Number(result.stdyTimeLmtList[i].END_DAY_CD); j++){
        							weekLimitCode.push("0"+ j);
        						}
        					}else{
        						weekLimitCode.push(result.stdyTimeLmtList[i].STRT_DAY_CD);
        					}
        					
        					for(var j = 0; j <= weekLimitCode.length; j++){
        						if(weekLimitCode[j] == nowWeek){
        							resultFlag = false;
        							break;
        						}
        					}
		    			}
		    		}
				}
			}
		}
	}
	
	studyLimitLoopCnt ++;
	
	return resultFlag;
}

function studyLimitTimeCheck(){
	var resultFlag = true;

	var s_application_connect = jQuery("#form_menu input[name=s_application_connect]").val();
	var p_mobile_play_yn = jQuery("#form_menu input[name=p_mobile_play_yn]").val();
	
	// 8분 동기화
	if(studyLimitDataObj != null){
		if(studyLimitLoopCnt >= 8){
			resultFlag = studyLimitTimeData();
		}else{
			resultFlag = studyLimitTimeValidation();
		}
	}else{
		resultFlag = studyLimitTimeData();
	}
		
	if(!resultFlag){
		var isPopupClose = false;
		
		for(var i = 0; i <= classRmPopupList.length; i++){
			try {
				if(classRmPopupList[i] && !classRmPopupList[i].closed){
			    	classRmPopupList[i].close();
			    	isPopupClose = true;
			    }
			} catch (e) {
			}
		}
		
		if(s_application_connect == "Y"){
			if(p_mobile_play_yn == "Y"){
				if(jsGetMobileOs() == "IOS"){
					location.href = "wbviewer://studyClose?type=4&p_msg=현재 학습을 진행할 수 없습니다. 학습 가능한 시간을 확인해 주세요.";
				}else if(jsGetMobileOs() == "AND"){
					location.href = "wbviewer://studyClose";
				}
				
				setTimeout(function() {
					studyLimitTimeStop();
					
					jQuery("#study_time_limit_alert").show();
					
					studyLimitTimeCount();
				}, 1.5 * 1000);
			}else{
				studyLimitTimeStop();
				
				jQuery("#study_time_limit_alert").show();
				
				studyLimitTimeCount();
			}
		}else{
			if(isPopupClose){
				setTimeout(function() {
					studyLimitTimeStop();
					
					jQuery("#study_time_limit_alert").show();
					
					studyLimitTimeCount();
				}, 1.5 * 1000);
			}else{
				studyLimitTimeStop();
				
				jQuery("#study_time_limit_alert").show();
				
				studyLimitTimeCount();
			}
		}
	}else{
		studyLimitTime = window.setTimeout("studyLimitTimeCheck()", studyLimitLoopTime * 60000);
	}
}

function studyLimitTimeStop(){
	if(studyLimitTime != null){
		clearTimeout(studyLimitTime);
	}
}

function studyLimitTimeCount(){
	jQuery("#study_time_limit_sec").text(studyLimitMoveTime);
	
	studyLimitMoveTime--;
	
	if(studyLimitMoveTime <= 0){
		location.href = "/usrs/mypage/myCrsing.do";
	}else{
		window.setTimeout("studyLimitTimeCount()", 1 * 1000);
	}
}
