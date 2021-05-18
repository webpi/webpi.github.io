/**
 * studyLimitTimeCheckForPopup.js    
 *                                                                    
 * Description : 수강시간 제한 이벤트(학습 팝업)                              
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
var studyLimitIsMobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

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
             p_crsseq_id : jQuery("#frameForm input[name=p_crsseq_id]").val()
			,p_crscd : jQuery("#frameForm input[name=p_crscd]").val()
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
		//alert("법정필수 학습과정은 강의 수강 시 근로시간이 인정되어 근로시간 외 학습이 불가합니다.\n\n학습시간 : 평일 09:00~18:00\n(주말 및 공휴일 학습불가)");
		
		if(studyLimitIsMobile){
			doMobileClose();
		}else{
			window.close();
		}
	}else{
		studyLimitTime = window.setTimeout("studyLimitTimeCheck()", studyLimitLoopTime * 60000);
	}	
}

