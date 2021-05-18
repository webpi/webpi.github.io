var useragent;
var mobileKeyWords;

mobileKeyWords = new Array('iPhone', 'iPod','iPad', 'BlackBerry', 'Android', 'SymbianOS','PC');

for (var word in mobileKeyWords) {
	if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
		useragent = navigator.userAgent.match(mobileKeyWords[word]);
		break;
	}
}

function setIMEI(value) {
	document.getElementById("IMEI").value = value;
}

function getUUID(value) {
	if(useragent == 'iPhone' || useragent == 'iPod' || useragent == 'iPad'){
		window.location = "appcall?cmd=call&param="+value;
	}
}

function startClientSupport(value) {
	if(useragent == 'Android'){
		window.teruten.startClientSupport(value);
	} else if(useragent == 'iPhone' || useragent == 'iPod' || useragent == 'iPad'){
		window.location = "appcall?cmd=call&param="+value;
	} else {
		alert("[PC:Message]\n"+value);
	}
}

function sendClientSupport(value){
	if(useragent == 'Android'){
		window.teruten.sendClientSupport(value);
	} else if(useragent == 'iPhone' || useragent == 'iPod' || useragent == 'iPad'){
		window.location = "appcall?cmd=call&param="+value;
	} else {
		alert("[PC:Message]\n"+value);
	}
}

function onClickDownload(param) {
	if(useragent == 'Android'){
		window.teruten.startDownload(param);	
	} else if(useragent == 'iPhone' || useragent == 'iPod' || useragent == 'iPad'){
		window.location = "alpaco://download?url=cmd=call&param="+param;
	} else {
		window.location = "alpaco://download?url=cmd=call&param="+param;;
	}
}

function onClickPlay(param) {
	if(useragent == 'Android'){
		window.teruten.startPlay(param);	
	} else if(useragent == 'iPhone' || useragent == 'iPod' || useragent == 'iPad'){
		window.location = "appcall?cmd=call&param="+param;
	} else {
		window.location = "appcall?cmd=call&param="+param;
	}
}

function showMessage(msg) {
	if(useragent == 'Android'){
		window.teruten.showMessage(msg);	
	} else if(useragent == 'iPhone' || useragent == 'iPod' || useragent == 'iPad'){
		alert("[iOS:Message]\n"+msg);
	} else {
		alert("[PC:Message]\n"+msg);
	}
}

function replaceParam(value) { // url 파라미터로 사용할 수 없는 문자를 Hex 문자로 대체 ( Ex : "+" -> "%2b" )  - 정규식 이용
	var ret = value.replace(/\+/gi,"%2b");
	return ret;
}

function ajax(options) {  
	// 사용자가 값을 지정하지 않았으면 기본값으로 옵션 객체를 읽는다.
	options = {
			// ajax 호출 대상 기능
			func : options.func || "download", // download 인지 play 인지 확인

			// HTTP 요청의 타입
			type : options.type || "POST",
 
			// 얼마나 오래 대기한 후에 요청을 타임아웃으로 처리할지 지정한다.
			timeout : options.timeout || 5000,
 
			// 요청이 성공, 실패, 완료(실패 혹은 성공) 할 때 호출할 함수들
			onSuccess : options.onSuccess || function(func,param){resSuccess(func,param);},
			onError : options.onError || function(){resError();},
			onComplete: options.onComplete || function(){resComplete();},
 
			// 서버에서 반환할 데이터의 타입.
			// 특별히 지정된 타입이 없을 경우네는 어떤 데이터가 반환되었는지 
			// 판단하여 적절히 작동하게 한다.
			data : options.data || "",

			// 사용자 정보
			uid : options.uid || "",

			// 요청을 전달할 PARAM
			param : options.param || "",

			// 요청을 전달할 URL
			url : options.url || "gateway.jsp?uid="+options.uid+"&param="+replaceParam(options.param)+"&status="+options.func
	};
	
	// 브라우저에서 사용할 수 있는 인스턴스를 생성한다.
	var xml = new XMLHttpRequest();
	// 비동기 요청을 생성한다.
	xml.open(options.type, options.url, true);
 
	// 5초간 대기한 후에 요청을 타임아웃으로 처리한다.
	var timeoutLength = options.timeout;
 
	// 언제 요청이 성공적으로 끝났는지 기록한다.
	var requestDone = false;
 
	// 현재 시각부터 5초 후에 실행되는 콜백을 초기화한다.
	// 이 콜백은 요청을 취소한다(아직 수행 중이라면).
	setTimeout(function(){
		requestDone = true;
	}, timeoutLength);
 
	// 문서의 상태가 언제 갱신되는지 감시한다.
	// 서버로 보낸 요청(request)에 대한 응답을 받았을때 어떤 동작을 할 것인지에 대한 사항을 정함
	xml.onreadystatechange = function(){
		// 데이터가 전부 로딩될 때까지 기다린다.
		// 그리고 요청이 이미 타임아웃되지 않았는지 검사한다.
		if(xml.readyState == 4 && !requestDone){
			// readyState
			// 0.uninitialized  = 개체가 데이터로 초기화되지 않았다.
			// 1.loading = 개체에 데이터가 로딩되고 있다.
			// 2.loaded = 개체에 데이터 로딩이 완료되었다.
			// 3.interactive = 개체에 데이터가 완전히 로딩되지 않았어도 사용자가 개체에 적용할 수 있다.
			// 4.complete = 개체의 초기화가 완료되었다.
 
			// 요청이 성공했는지 검사한다.
			if(httpSuccess(xml)){
				// 서버에서 반환한 데이터와 함께
				// 성공 콜백을 실행한다.
				options.onSuccess(options.func, httpData(xml, options.type));
				
			}
			// 이 외에는 에러가 발생한 것이므로
			// 에러 콜백을 실행한다.
			else{
				options.onError();
			}
			
			// 완료 콜백을 실행한다.
			options.onComplete();
			
			// 메모리 누수 현상 방지를 위해 작업 후 메모리를 해제한다.
			xml = null;
		}
	};
 
	// 서버에 접속한다.
	xml.send();
 
	function httpSuccess(r){
		try{
			// 만약 로컬 파일을 요청했을 때 서버 상태가 반환되지 않았다면
			// 이를 성공으로 분류한다.
			return !r.status && locaation.protocol == "file:" ||
			
				// 상태 코드의 값이 200번 대라면 성공으로 분류한다.
				(r.status >= 200 && r.status < 300) ||
				
				// 문서가 변경되지 않았으면 성공으로 분류한다.
				r.status == 304 ||
				
				// 사파리는 파일이 변경되지 않았을 때 빈 상태 코드를 반환한다.
				navigator.userAgent.indexOf("Safari") >= 0
					&& typeof r.status == "undefined";
 
		}catch (e) {
 
		}
 
		// 만약 상태 검사가 실패하면 요청도 실패했다고 가정한다.
		return false;
	};
 
	// HTTP 응답에서 올바른 데이터를 추출한다.
	function httpData(r,type){
		// content-type 헤더를 받아온다.
		var ct = r.getResponseHeader("content-type");
		
		// 기본 타입이 명시되지 않았다면
		// 서버에서 받은 데이터가 어떤 XML 형태인지 검사한다.
		var data = !type && ct && ct.indexOf("xml") >= 0;
		
		// 서버에서 XML을 받았다면 XML Document 객체를 받아온다.
		// 이 외에는 서버에서 받은 텍스트를 반환한다.
		data = type == "xml" || data ? r.responseXML : r.responseText;
		
		// 지정되 타입이 "script" 이면 반환된 응답 데이터를
		// 자바스크립트처럼 실행한다.
		if (type == "script")
			eval.call(window, data);
		
		// 응답 데이터를 (XML Document 객체든 텍스트 문자열이든 간에) 공백을 제거 한 후 반환한다.
		data = data.trim();
		return data;
	};

}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function resSuccess(func , param){
	if(func == 'download'){
		if(param == "false"){
			showMessage("다운로드 권한이 없습니다.");
			return;
		}else{
			onClickDownload(param);
		}
	}
	else if(func == 'play'){
		if(param == "false"){
			showMessage("재생 권한이 없습니다.");
			return;
		}else{
			onClickPlay(param);
		}
	}
}

function resError(){
	//alert("Error");
}

function resComplete(){
	//alert("Complete");
}