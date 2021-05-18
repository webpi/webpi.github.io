
	var win = this;
	var findAPITries = 20;
	
	// page load시 반드시 실행 
	function doInitialize(){
		findAPITries = 0;
		while((win.CMS_API == undefined || win.CMS_API == null))
		{
		   findAPITries++;

		   if ( findAPITries > 10 )
		   {
			  //alert( "Unable to locate the LMS's API Implementation");
			  break;
		   }
		   win = win.parent;
		}
	}
	
	//현재 차시 페이지를 DB에 북마크로 등록해 준다.
	//차시 내 페이지에대한 위치값은 doSetValue(cmi.location)으로 저장한다.
	function setBookmark(){
		 if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.\nsetBookmark was not successful.");
		  return;
	   }
	   else
	   {
	    var locPath = location.pathname;
	    win.CMS_API.setBookmark(locPath);
	   }
	}

	// 디바이스별 진도를 저장한다. 
	function setDeviceProgress(val){
	  if(findAPITries > 10)  {
		//  alert("Unable to locate the LMS's API Implementation.");
		  return;
	   }  else  {
		win.CMS_API.setDeviceProgress(val);
	   }
	}


	//트랙킹 정보를 DB에 업데이트 해준다.	
    function doCommit(){
		 if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.\ndoCommit was not successful.");
		  return;
	   }
	   else
	   {
	    win.CMS_API.setCommit();
	   }
    }
    

	 function doNextPage(){
		 if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.\ndoCommit was not successful.");
		  return;
	   }
	   else
	   {
	    win.CMS_API.nextPage();
	   }
    }
	

	function doPrePage(){
		 if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.\ndoCommit was not successful.");
		  return;
	   }
	   else
	   {
	    win.CMS_API.prePage();
	   }
    }

	function doGetValue(name){
	   if(findAPITries > 10)
	   {
		  //alert("Unable to locate the LMS's API Implementation.\nGetValue was not successful.");
		  return "";
	   }
	   else
	   {
		  var value = win.CMS_API.GetValue(name);
			 //alert("doGetValue : "+value);
			 return value;
	   }
	}

	
	function doSetValue(name, value){

	   if(findAPITries > 10)
	   {
		  //alert("Unable to locate the LMS's API Implementation.\nSetValue was not successful.");
		  return;
	   }
	   else
	   {
		  var result = win.CMS_API.SetValue(name, value);
	   }

	   return result;
	}

	function doTerminate(){
		if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.");
		  return;
	   }
	   else
		{
		win.CMS_API.doTerminate();
	   }
	}
	
	// 동영상 진도율 처리 함수
	function saveProgress(param) {

	    if(findAPITries > 10) {

	    //  alert("Unable to locate the LMS's API Implementation.");

	    return;

	     } else {

	      win.CMS_API.setSaveProgress(param);

	     }

	}
	
	// 학습시간 기준 페이지 학습완료 처리 함수
	// va1 :  페이지 총학습시간, val2 :  진행중인 학습페이지의 학습시간
	function progressPcPageAndVideoTime(val1, val2) {

	    if(findAPITries > 10) {

	    //  alert("Unable to locate the LMS's API Implementation.");

	    return;

	     } else {

	      win.CMS_API.setprogressPcPageAndVideoTime(val1, val2);

	     }

	  }

//	///////////////////////////////////////////////////////////////
//
//	// 학습시간 기준 페이지 학습완료 처리 함수
//	// va1 :  페이지 총학습시간, val2 :  진행중인 학습페이지의 학습시간, val3 : 진행중인 학습페이지
//	function progressPageAndTime(val1, val2, val3) {
//
//	    if(findAPITries > 10) {
//
//	    //  alert("Unable to locate the LMS's API Implementation.");
//
//	    return;
//
//	     } else {
//
//	      win.CMS_API.setProgressPageAndTime(val1, val2, val3);
//
//	     }
//
//	  }

//	//  progressPageAndTime 함수를 통해 처리된 페이지를 기준으로 학처리 함수
//	// va1 : 총학습페이지 , val2 : 진행중인 학습페이지의 학습시간 , val3 : 진행중인 학습페이지
//	function progressTerminate(val1, val2, val3) {
//
//	  if(findAPITries > 10) {
//
//	    // alert("Unable to locate the LMS's API Implementation.");
//
//	    return;
//
//	  } else {
//
//	    win.CMS_API.setProgressTerminate(val1, val2, val3);
//
//	  }
//
//	}

	// 콘텐츠 내에서 의견을 등록하는 함수
    // no : 페이지 번호 , content : 의견내용
	function writeOpinion(no, content) {
		if(findAPITries > 10)
	   {
		  //alert("Unable to locate the LMS's API Implementation.");
		  return;
	   }
	   else
	   {
        win.CMS_API.writeOpinion(no, content);
	   }
	}
	
	// 의견을 볼수있는 팝업 페이지 호출 (다른사람 의견 포함)
    // no : 페이지 번호 
	function viewOpinion(no) {
		if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.");
		  return;
	   }
	   else
	   {
		win.CMS_API.viewOpinion(no);
	   }
	}
	
	// 콘텐츠 내에서 QnA(질문)을 등록하는 함수
    // title : 제목 , content : 질문내용
	function writeQuestion(title, content) {
		if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.");
		  return;
	   }
	   else
	   {
		   win.CMS_API.writeQuestion(title, content);
	   }
	}
	
	// QnA를 볼수있는 팝업 페이지 호출 (다른사람 QnA 포함)
	function viewQuestion() {
		if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.");
		  return;
	   }
	   else
	   {
		win.CMS_API.viewQuestion();
	   }
	}
//	
//	// 진도/성적 팝업을 띄워준다.
//	function goScore(){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goScore();
//	   }
//	}
//	
//	// 과제제출을 띄워준다.
//	function goReport (){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goReport ();
//	   }
//	}
//	
//	// 설문
//	function goSulmun(){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goSulmun();
//	   }
//	} 
//	
//	// 평가응시
//	function goTest(){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//	   win.CMS_API.goTest();
//	   }
//	}
//	
//	// 공지사항 팝업을 띄워준다.
//	function goNotice(){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goNotice();
//	   }
//	}
//	
//	// 질문방 팝업을 띄워준다.
//	function goQuestion (){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goQuestion ();
//	   }
//	}
//	
//	// 자료실 팝업을 띄워준다.
//	function goData(){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goData();
//	   }
//	}
//	
//	// 게시판 팝업을 띄워준다.
//	function goBoard (){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goBoard ();
//	   }
//	}
//	
//	// 수강생현황
//	function goLearner(){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goLearner();
//	   }
//	}
//	
//	// 강사소개
//	function goTutor(){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goTutor();
//	   }
//	}
//	
//	// 토론방 팝업을 띄워준다.
//	function goForum (){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goForum ();
//	   }
//	}
//	
//	// 용어사전 팝업을 띄워준다.
//	function goDictionary (){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goDictionary ();
//	   }
//	}
//	
//	// 관련사이트 팝업을 띄워준다.
//	function goSite (){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goSite ();
//	   }
//	}
//	
//	// 학습도우미 팝업을 띄워준다.
//	function goHelper (){
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.goHelper ();
//	   }
//	}
	
	//에러로그 출력(OBC 오류 확인용)
	function doShowErrorLog(page,tpage) {
		if(findAPITries > 10)
	   {
		//  alert("Unable to locate the LMS's API Implementation.");
		  return;
	   }
	   else
	   {
		win.CMS_API.showErrorLog (page,tpage);
	   }
	}

//	//콘텐츠 내 메일 발송
//	function doSendMail(title,content,sendmailurl,receivemailurl) {
//		if(findAPITries > 10)
//	   {
//		//  alert("Unable to locate the LMS's API Implementation.");
//		  return;
//	   }
//	   else
//	   {
//		win.CMS_API.sendMail (title,content,sendmailurl,receivemailurl);
//	   }
//	}
	
	//학습창의 타이머 초기화
	function doSessionRefresh() {
		if(findAPITries > 10)
		{
			//  alert("Unable to locate the LMS's API Implementation.");
			 return;
		}
		else
		{
			win.CMS_API.sessionRefresh ();
		}
	}
	
	//OBC 과정 오류(이전 차시의 마지막페이지를 저장하는 문제)를 해결하기위해 차시,절(SCO)로 목차ID를 가져온다.
	function doCheckItemid(chasi,sco) {
		if(findAPITries > 10)
		{
			//  alert("Unable to locate the LMS's API Implementation.");
			 return;
		}
		else
		{
			win.CMS_API.checkItemid(chasi,sco);
		}
	}