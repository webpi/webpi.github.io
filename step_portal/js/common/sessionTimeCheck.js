/**
 * sessionTimeCheck.js    
 *                                                                    
 * Description : 세션관리 이벤트                               
 * Author : 류정희                                       
 * Since : 2016.11.16                                 
 * Modification information                           
 * 수정일 		    수정자		 	수정내용     
 * ------------ 	------------ 	------------       
 * 2016.11.10	  	류정희		    최초생성
 * 
 */
var session_time = 0;
var reset_session_time = 0;
var timeout = null;

function initSessionTime(param_time){
	sessionTimeStop();
	session_time = param_time;
	reset_session_time = param_time;
	
	timeout = window.setTimeout("sessionTimeCount()", 1 * 60000);
}

function sessionTimeCount(){
	session_time--;
	
	if(session_time <= 1){
		sessionTimeStop();
		window.location.href = "/common/logout.do?p_request_type=TIMEOUT";
	}else{
		timeout = window.setTimeout("sessionTimeCount()", 1 * 60000);
	}
}

function sessionTimeStop(){
	if(timeout != null){
		clearTimeout(timeout);
	}
}

jQuery(document).ajaxStart(function(e, xhr, settings, exception) {
	if(reset_session_time != 0){
		initSessionTime(reset_session_time);
	}
});
