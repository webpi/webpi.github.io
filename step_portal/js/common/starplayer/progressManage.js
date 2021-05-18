var updateLcmsStdyCntUrl = "/kedi/mngs/lcms/updateLcmsStdyCnt.do";
var updateLcmsProgressUrl = "/kedi/mngs/lcms/updateLcmsProgress.do";

/**
 * 진도율 script
 */
jQuery(document).ready(function(){
    progressManage.init();
});

var progressManage = {
		init : function(){
			var me = this;
		},
		
		/**
		 * 학습횟수 증가
		 * @param data
		 */
		doStdyCntIncrement : function(data) {
		    var param = "";
		    param += "p_crscd=" + data.crscd;
            param += "&p_year=" + data.year;
            param += "&p_crsseq=" + data.crsseq;
            param += "&p_cntnts_id=" + data.cntnts_id;
            param += "&p_item_id=" + data.item_id;
            param += "&mkey=" + data.mkey;
		    
		    jQuery.ajax({
		        url : updateLcmsStdyCntUrl,
                cache : false,
                dataType: "json",
                type: "POST",
                data : param,
                success : function(data){
                }
		    });
		},
		
		
		/**
		 * 진도율 등록 및 수정
		 * @param data
		 */
		doSave : function(data){
			var asyncYn = data.asyncYn;
			var param = "";
			param += "p_crscd=" + data.crscd;
			param += "&p_year=" + data.year;
			param += "&p_crsseq=" + data.crsseq;
			param += "&p_cntnts_id=" + data.cntnts_id;
			param += "&p_item_id=" + data.item_id;
			param += "&currentStudyTime=" + data.currentStudyTime;               //북마크
			param += "&currentContentsTime=" + data.currentContentsTime;         //학습한 시간
			param += "&total_time=" + data.total_time;
			param += "&mkey=" + data.mkey;
			
			progressManage.saveProgress(param, asyncYn, progressController.saveProgressOk);
		},
		
		/**
		 * 진도율을 저장한다.
		 * @param onsuccess
		 * @param onerror
		 */
		saveProgress : function(param, asyncYn, onsuccess, onerror){
		    jQuery.ajax({
		        url : updateLcmsProgressUrl,
		        async    : asyncYn,
		        cache : false,
		        dataType: "json",
		        type: "POST",
		        data : param,
		        success : onsuccess
		    });
		}
};

////////////////Controller//////////////////
window.progressController = {
		/**
		 * 진도율 저장후 처리
		 * @param resData
		 * @param statusText
		 */
		saveProgressOk : function(resData, statusText){
			if(statusText == "success"){
				//alert('진도율 저장 성공!');
			}else{
				alert("진도율 저장 에러!");
			}
		},
		
		notifyError : function(){
			alert("에러!!");
		}
};
