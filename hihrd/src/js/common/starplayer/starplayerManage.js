//스타플레이어 스크립트

var player;
var step_ = 15;
var pos = 100;
var startTime_ = 0;
var courseDataSeq_;
var finishYn_;
var beforeunloadYn_ = 'N';
var isComplete = false;
var studyPageStatus = "S";
var progressInfoData;

if(window.console == undefined) {
	console = {log:function(){}}
}

var realPlay = 0;

/**
 * 스타플레이어를 재생한다.
 * @param type
 */
function playContents(type){
    var userId = "";
    var contUrl = progressInfoData.cntnts_url;
    
    if(studyPageStatus != "P") {
        userId = progressInfoData.usrid;
    }
    if(userId == null || userId == "") {
        userId = "ANONYMOUS";
    }
    
    if(type == "LOW") {
        contUrl = contUrl.substring(0, contUrl.lastIndexOf("_") + 1) + "350k.mp4";
    } else if(type == "SD") {
        contUrl = contUrl.substring(0, contUrl.lastIndexOf("_") + 1) + "700k.mp4";
    } else if(type == "HD") {
        contUrl = contUrl.substring(0, contUrl.lastIndexOf("_") + 1) + "1m.mp4";
    }
    
    if(typeof player == 'undefined'){
        onLoad(userId, contUrl, startTime_, true);
        $('body').keydown(function(event){
            onKeyDown(event.keyCode);
        });
    }else{
        player.open_media(getMedia(contUrl, startTime_, true));
        player.setCurrentPosition(startTime_);
    }
}

/**
 * 진도율 저장
 */
function saveProgressData(currentStudyTime, currentContentsTime, asyncYn){
    //미리보기는 진도저장을 하지않는다.
	if(studyPageStatus != "P"){
	    var data = {};
	    
        data.crscd = progressInfoData.crscd;
        data.year = progressInfoData.year;
        data.crsseq = progressInfoData.crsseq;
        data.cntnts_id = progressInfoData.cntnts_id;
        data.item_id = progressInfoData.item_id;
        data.currentStudyTime = currentStudyTime;
        data.currentContentsTime = currentContentsTime;
        data.mkey = progressInfoData.mkey;
        data.total_time = progressInfoData.total_time;
        data.asyncYn = asyncYn;
        
	    progressManage.doSave(data);
	}
}

function getStep() {
	return step_;
}
		
function setStep(step) {
	step_ = step;
}

function onMouseDbclick(x, y) {
	player.setFullscreen(!player.getFullscreen());
}

function onKeyDown(keycode) {
	if (window.event) {
		var type = window.event.srcElement.type;
		if (type == 'text' || type == 'textarea')
			return true;
	}
	switch (keycode) {
		case 13: // ENTER
			player.setFullscreen(true);
			break;
		case 32: // SPACE
			if (player.getPlayState() == PlayState.PLAYING){
				player.pause();
			}else{
				player.play();
			} 
			break;
		case 38: // UP
			player.setVolume(player.getVolume() + 0.1);
			break;
		case 40: // DOWN
			player.setVolume(player.getVolume() - 0.1);
			break;
		case 37: // LEFT
			player.backward(getStep());
			break;
		case 39: // RIGHT
			player.forward(getStep());
			break;
		case 190: // >
			player.setRate(player.getRate() + 0.2);
			break;
		case 188: // <
			player.setRate((player.getRate() - 0.2) < 0.6 ? 0.6 : (player.getRate() - 0.2));
			break;
		case 77: // M
			player.setMute(!player.getMute());
			break;
		case 82: // R
			player.setRepeat(!player.getRepeat());
		default:
			return;
	}
	return false;
}

function onBookmarkSave() { 
	pos = player.getCurrentPosition(); 
}

function onBookmarkGo() { 
	player.setCurrentPosition(pos); 
}

function onOpenStateChange(state) {
	if (state == OpenState.OPENED) {
		player.setVolume(0.5);
	}
}


function onPlayStateChange(state) {
	switch (state) {
		case PlayState.PLAYING:						//재생중
			//동영상을 끝까지 수강했을 때, 처음부터 시작되도록 설정.
			if(isComplete) {
				//console.log("PLAYING");
				setTimeout(function(){player.setCurrentPosition(1);},1);
				isComplete = false;
			}
			player.setVisible(true);
			break;
		case PlayState.PAUSED: 					//일시중지
			//console.log("PAUSED");
			var playTime = player.getPlayTime();
			var currentPosition = player.getCurrentPosition();
			if(!isComplete){
				if(beforeunloadYn_ == 'N') {
					saveProgressData(currentPosition, playTime - realPlay, true);
				} else {
					saveProgressData(currentPosition, playTime - realPlay, false);	
				}
				realPlay = playTime;
			}
			else isComplete = false;
			break;
		case PlayState.STOPPED:						//재생 중지
			if(isComplete) {
				//console.log("STOPPED");
				saveProgressData(player.getCurrentPosition(), player.getPlayTime(), true);
			}
			player.setVisible(true);
			break;
		case PlayState.BUFFERING_STARTED:			//버퍼링 시작
			if(isComplete){
			    console.log("BUFFERING_STARTED");
			}
			break;

		case PlayState.BUFFERING_STOPPED:			//버퍼링 중단
			if(isComplete) {
				console.log("BUFFERING_STOPPED");
				setTimeout(function(){
					player.setCurrentPosition(1);
				},10);
			}
			break;
		case PlayState.COMPLETE:					//재생완료
			var playTime = player.getPlayTime();
			var currentPosition = player.getCurrentPosition();
			saveProgressData(currentPosition, playTime - realPlay, true);
			realPlay = playTime;
			isComplete = true;
			setTimeout(function(){alert('강의가 종료되었습니다.\n재수강을 원하시면 재생버튼을 누르시기 바랍니다.');}, 10);
			break;
	}
}
		
function getBlockMessenger() {
	return player.getBlockMessenger();
}

function onError(error_code) {
	player.setVisible(true);
	switch (error_code) {
		case StarPlayerError.MULTIPLE_CONNECTIONS:
			alert('아이디 동시 접속중 입니다!');
	   		break;
		case StarPlayerError.OPEN_FAILURE:
			alert('연결 오류입니다!');
			break;
		case StarPlayerError.INVALID_MEDIA_TYPE:
			alert('비 정상적인 미디어 파일입니다!');
			break;
	 };
}
function setResolution(value) {
	player.callFunction("default_resolution="+value);
}

function Custom_Event() {}
Custom_Event.SAVE = 100;
Custom_Event.RESOLUTION	= 101;
Custom_Event.STEP = 102;
Custom_Event.KEYDOWN = 103;


function onCustom(type, value) {

	switch (type) {
	case Custom_Event.SAVE:
		var saveString = "";
		
		if(studyPageStatus == "P") {
		    saveString = "미리보기는 진도저장을 지원하지않습니다.";
		} else {
		    saveString = "진도율이 저장되었습니다.";
		    //saveProgressData(player.getCurrentPosition(), player.getPlayTime(), true);
		}
		
		player.pause();
		setTimeout(function(){alert (saveString);}, 10);

	break;

	case Custom_Event.RESOLUTION:
		if (value == "low") {
			onLOW();
		} else if (value == "normal") {
			onSD();
		} else if (value == "high") {
			onHD();
		}
	break;

	case Custom_Event.STEP:
		setStep(parseInt(value,10));
	break;
	case Custom_Event.KEYDOWN:
		onKeyDown(parseInt(value,10));
	break;
	}
}

var LOW = 1;
var SD = 2;
var HD = 4;
var enable_resolution = LOW + SD + HD;

function onLOW() {
	player.pause();
	startTime_ = player.getCurrentPosition();
	saveProgressData(player.getCurrentPosition(), player.getPlayTime(), true);
	
	playContents("LOW");
	realPlay = 0;
	setResolution(LOW);
	
	return 1;
}

function onSD() {
	player.pause();
	startTime_ = player.getCurrentPosition();
	saveProgressData(player.getCurrentPosition(), player.getPlayTime(), true);
	
	playContents("SD");
	realPlay = 0;
	setResolution(SD);
	
	return 1;
}

function onHD() {
	player.pause();
	startTime_ = player.getCurrentPosition();
	saveProgressData(player.getCurrentPosition(), player.getPlayTime(), true);
	
	playContents("HD");
	realPlay = 0;
	setResolution(HD);
	
	return 1;
}

/** 배속 변경 */
function onRateChange(state) {
    var msg = "";
    if(studyPageStatus != "P") {
        if (state > 1) {
            setTimeout(function(){alert('동영상 재생속도 조절을 통해 빠른 배속으로 학습할 경우 \n학습완료 후에도 진도율이 100%로 표시되지 않습니다.');}, 10);
        }
    }
}

function init() {
	var params;
	params = "step="+ getStep();
	params += "&enable_resolution=" + enable_resolution;	
	params += "&default_resolution=" + LOW;
	params += "&subtitle=OFF"; 
	
	return params;
}

function getConfig(userId){
    if(userId == null || userId == "") {
        userId = "ANONYMOUS";
    }
	var config = {
		userId : userId,
		id : 'starplayer',
		videoContainer : 'video-container',
		controllerContainer : 'controller-container',
		controllerUrl: "/js/common/starplayer/kedi.bin",
		controllerParams : init(),
		visible : false
	};
	return config;
}

function getMedia(contUrl, startTime, autoPlay){
    var smiUrl = contUrl.substr(0, contUrl.lastIndexOf(".") + 1) + "smi";
    
	var media = {
		url : contUrl,
		//cc  : smiUrl,
		startTime : startTime,
		autoPlay : autoPlay,
		blockMessenger : false
	};
	return media;
}

function onLoad(userId, contUrl, startTime, autoPlay){
	/***************************************************************************************************************************
		config: 플레이어 관련 설정
		- id: 스타플레이어의 tag id
		- videoContainer: 비디오 출력 영역의 tag id
		- controllerContainer: 컨트롤 출력 영역의 tag id
		- visible: 플레이어 구동시 화면 보임 또는 숨김 설정 (true 또는 false)
		- controllerUrl: 컨틀롤 UI 파일 경로
		- userId: 사용자 아이디 (로그인 사용자는 아이디로 설정, 비로그인 사용자는 ANONYMOUS로 설정)
		- blockMessenger: 메신저 차단 기능 설정 (true 또는 false)
		- watermarkText: 워터마킹할 문자
		- watermarkTextColor: 워터마크 색상 (#aarrggbb, aa = alpha, rr = red, gg = green, bb = blue)
		- watermarkTextSize: 워터마트 크기 (n 또는 n%, 예: 20 = 20 pixel, 5% = 비디오 세로 크기의 5%에 해당하는 크기)
		- watermarkHorzAlign: 워터마크 가로 출력 위치 (WatermarkAlign 참조)
		- watermarkVertAlign: 워터마크 세로 출력 위치 (WatermarkAlign 참조)
		- watermarkInterval: 워터마크 출력 위치가 RANDOM일 경우 위치 변경되는 시간 값 (단위 초)		
		- watermarkShowInterval: 워터마크 출력 위치가 RANDOM일 경우에만 작동되며  워터마크를 보여 주는 시간 값 (단위 초)
	****************************************************************************************************************************/
	var config = getConfig(userId);
	
	/******************************************************************************
		media: 재생 관련 설정
		- url: 미디어 파일 경로
		- cc: 자막 파일 경로
		- intro: 인트로 파일 경로
		- outro: 아웃트로 파일 경로
		- startTime: 시작 재생 위치 (단위 초, 실수)
		- autoPlay: 시작시 자동 재생 설정 (true 또는 false, 기본 값: true)
	*********************************************************************************/
	
	var media = getMedia(contUrl, startTime, autoPlay);
	
	player = new StarPlayer(config, media);
	player.onKeyDown = onKeyDown;
	player.onMouseDbclick = onMouseDbclick;
	player.onOpenStateChange = onOpenStateChange;
	player.onPlayStateChange = onPlayStateChange;
	player.onError = onError;
	player.onCustom = onCustom;
	player.onRateChange = onRateChange;
}

/**
 * 최초 로딩 시 호출 - 학습 횟수 저장
 * @param userId
 * @param contUrl
 * @param startTime
 * @param autoPlay
 */
function onFirstLoad(userId, contUrl, startTime, autoPlay) {
    studyPageStatus = parent.studyPageStatus();
    progressInfoData = parent.progressInfoData();
    
    //학습 횟수 저장
    if(studyPageStatus != "P") {
        progressManage.doStdyCntIncrement(progressInfoData);
    }
    
    onLoad(userId, contUrl, startTime, autoPlay);
}
