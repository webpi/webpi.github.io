
	function Initialize(param){ // 초기화
        //alert("CMS Initialize!!!!");
        var fileUrl = parent.HkmcMainFrame.location.href; 
        var sidx = fileUrl.indexOf(p_mediumFolderPath);
        var fileUrl = fileUrl.substring(sidx+p_mediumFolderPath.length,fileUrl.length);
        var qidx = fileUrl.indexOf("?");
        if(qidx > 0){ 
           fileUrl = fileUrl.substring(0,qidx);
        }
        
        setBookmark(fileUrl);
        
        return true;
    }
	
	
	function Terminate(param){ // 종료
        //alert("CMS Terminate!!!!");
		setCommit();
        return true;
    }

	function GetValue(param){ // 설정값을 가져온다.
        //alert("CMS GetValue!!!!");
        return "";
    }

	function SetValue(name, value){ // 설정값을 저장한다.
        //alert("CMS SetValue!!!!");
        
        return true;
    }

	function GetLastError(){ // 마지막 에러코드를 넘겨준다.
        //alert("CMS GetLastError!!!!");
           
        return 0;
    }

	function GetErrorString(errCode){ // 에러코드 메시지를 넘겨준다.
        //alert("CMS GetErrorString!!!!");
           
        return "";
    }

	function Commit(param){ // 커밋을 호출해준다.
		//alert("CMS Commit!!!!");
        setCommit();
   
        return true;
    }

	function GetDiagnostic(errorCode){ // 분석 메시지를 넘겨준다.  
        //alert("CMS GetDiagnostic!!!!");
           
        return "";
    }	