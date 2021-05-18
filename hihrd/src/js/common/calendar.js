/*******************************************************************************
	날짜 입력을	위한 달력 스크립트
	
	사용법:
	1. 년/월을 지정하여	달력을 표시한다. (입력필드가 "년-월-일"로 된 경우)
		ex)	Calendar("form1", "year1,month1,date1",	"2000/1", "position=bottom,datetype=00,clear=no");
		-->	출력: "2000" , "01"	, "01"
		
	2. 년/월을 지정하지	않으면 현재의 년/월을 표시한다.	(입력필드가	"년-월-일"로 된	경우)
		ex)	Calendar("form1", "year1,month1,date1",	"",	"position=bottom,datetype=00,clear=no");
		-->	출력: "2000", "01",	"01"

	3. 년/월을 지정하여	달력을 표시한다. (입력필드가 "날짜"로 된 경우)
		ex)	Calendar("form1", "date1", "2000/01", "position=bottom,datetype=00,clear=no");
		-->	출력: "2000/01/01"
		
	4. 년/월을 지정하지	않으면 현재의 년/월을 표시한다.	(입력필드가	하나이고 구분자가 "/"인	경우))
		ex)	Calendar("form1", "date1", "/",	"position=bottom,datetype=00,clear=no");
		-->	출력: "2000/01/01"

	5. 년/월을 지정하지	않으면 현재의 년/월을 표시한다.	(입력필드가	하나이고 구분자가 "-"인	경우))
		ex)	Calendar("form1", "date1", "-",	"position=bottom,datetype=00,clear=no");
		-->	출력: "2000-01-01"
		
	6. "datetype=0"	으로 지정한	경우
		ex)	Calendar("form1", "date1", "-",	"position=bottom,datetype=0,clear=no");
		-->	출력: "2000-1-1"

	Author:	Kim	Kyoung shil
*******************************************************************************/

// Calendar	이미지 경로
var	calendarImgPath			= "/images/common/calendar/"; 

// Calendar	Box	HTML 경로
var	calendarBoxHtml			= "/js/common/calendar_box.jsp";

// Calendar 타이틀 배경색
//var calendarTitleBgColor	= "#1C538A";
var calendarTitleBgColor	= "#333";

// Calendar 타이틀 색상
var calendarTitleColor		= "white";

// Calendar 라인 색상
var calendarBorderColor		= "#737373";

// Calendar Head 배경색
var calendarHeadBgColor		= "#D0D0D0";

// Calendar 날짜 배경색
var calendarDateBgColor		= "#F0F0FF";

// Calendar 날짜 배경색(마우스 오버)
var calendarDateBgOverColor	= "#CCCCFF";

var calendarFontFamily		= "굴림"; //다국어 번역대상 아님

//요일 표시 설정
/*var calendarSun			= "일";
var calendarMon			= "월";
var calendarTue			= "화";
var calendarWed			= "수";
var calendarThu			= "목";
var calendarFri			= "금";
var calendarSat			= "토";*/

//다국어원본 : 일
var calendarSun			=MESSAGE["sunday"][jslang]; //다국어 phs
//다국어원본 : 월
var calendarMon		= MESSAGE["monday"][jslang]; //다국어 phs
//다국어원본 : 화
var calendarTue			= MESSAGE["tuesday"][jslang]; //다국어 phs
//다국어원본 : 수
var calendarWed		= MESSAGE["wednesday"][jslang]; //다국어 phs
//다국어원본 : 목
var calendarThu			= MESSAGE["thursday"][jslang]; //다국어 phs
//다국어원본 : 금
var calendarFri			= MESSAGE["friday"][jslang]; //다국어 phs
//다국어원본 : 토
var calendarSat			= MESSAGE["saturday"][jslang]; //다국어 phs

// Calendar	객체
var	calendarObject		= null;

// 마우스 위치
//var calendarMoveX		= 0;
//var calendarMoveY		= 0;

// 달력을 위한 마우스 이벤트 캡쳐 함수 호출
document.onmousedown = checkCalendarMouse;

// 달력 Box
document.write("<div id='calendarFrameBox'></div>");

/**
 * 달력	생성 함수
 * @param formName		날짜 입력폼	이름, 또는 폼의	하위 객체
 * @param formField		날짜 입력 필드 (날짜 필드가	분리된 경우: "year,month,date",
 *							날짜 필드가	하나인 경우: "date"	형식으로 지정)
 * @param curDate		달력에 표시할 년/월
 *							"2000/1", "2000/01", "2000-1", "2000-01" 형식 가능,
 *							년도와 월을	구분하는 구분자("/","-") 에	따라 출력 형식도 같은 형식으로 된다.
 *							지정할 년/월이 없는	경우 "/", 또는 "-"만 입력 
 *							구분자가 필요한	경우는 입력필드가 하나인 경우며, 미입력시 기본값은 "/"
 *							구분자 "/" --> "2000/01/01"
 *							구분자 "-" --> "2000-02-02"
 *							(단, 입력창에 기존값이 있으면 기존값의 형식이 우선.)
 * @param attribute		달력의 표시	형식을 지정한다.
 *							ex)	"position=bottom,datetype=00,clear=no"
 *							position=[]:달력의 표시 위치 (생략하면 기본값으로 'bottom'지정)
 *								bottom: 'formField'의 아래쪽에 표시
 *								right: 'formField'의 오른쪽에 표시
 *								over: 'formField'의 위에 덮어서 표시
 *								mouse: 마우스로 클릭한 위치
 *							datetype=[0|00]: "0" 월/일의 입력을	한자리로 입력한다.
 *									  "00" 월/일의 입력을 두자리도 입력한다. (1	-->	01)
 *							clear=[yes|no]:	입력 필드 삭제 버튼의 표시 여부
 * @param func 달력을 클릭후 값세팅후 실행될 함수 지정 
 */
function Calendar(title, formName, formField, curDate, attribute, formFieldInx, func) {
	// 객체	정의
	if (calendarObject == null)	{
		calendarObject	= new setCalendarObject();
	}
	
	// 폼객체를	넘겨받았을 경우
	if (formName.form) {
		calendarObject.formName	= formName.form.name;
	}
	// 폼이름을	넘겨받았을 경우
	else {
		calendarObject.formName	= formName;
	}

	if (nullToEmpty(title) == "") {
		//다국어원본 : 날짜선택
		title = MESSAGE["dateSelect"][jslang]; //다국어 phs
	}

	calendarObject.calTitle		= title;
	calendarObject.formField	= formField;
	calendarObject.curDate		= curDate;
	calendarObject.attribute	= attribute;	
	if(formFieldInx != undefined) calendarObject.formFieldInx	= formFieldInx;	
	else calendarObject.formFieldInx	=  null ;
	if(func != undefined && func != ""){
		calendarObject.func 		= func;
	}else {
		calendarObject.func 		= null;
	}	

	// 달력 데이터 설정 호출
	setCalendarData();

	// 달력	표시 프레임	정의
	var	 calendarFrame = calendarObject.calendarFrame;
	// 프레임 내용
	var frameContent = "<iframe	id='calendarIFrame' width=100% height=112% border=0	frameborder=0 "
					 + "marginwidth=0 marginheight=0 scrolling=no src='"+calendarBoxHtml+"'>";

	if (calendarFrame == null) {
		//calendarFrame =	document.createElement("div");
		calendarFrame = getObject("calendarFrameBox");
		calendarFrame.style.position	= "absolute";
		calendarFrame.style.width		= "172px";
		calendarFrame.style.height		= "180px";
		calendarFrame.style.top			= "0px";
		calendarFrame.style.left		= "0px";
		calendarFrame.style.zIndex = 10000;
		//document.body.appendChild(calendarFrame);

		calendarFrame.innerHTML	= frameContent;
		calendarObject.calendarFrame = calendarFrame;
	}
	else {
		// 기존의 열려있는 달력 닫기
		closeCalendar();
		/*
		var iFrame = null;
		if (browserType	== "IE") {
			iFrame = document.frames["calendarIFrame"];
			redisplayCalendar();	
		}
		else {
			calendarFrame.innerHTML = frameContent;
		}
		*/
		calendarFrame.innerHTML = frameContent;
	}
	
	// 위치
	var position = "";
	if (attribute != null) {
		position = getAttributeValue(attribute, "position");
	}

	var field 			= getDivideString(formField, 1, ",");
	var fieldObj = null ;
	if(formFieldInx != undefined) fieldObj = document.forms[formName].elements[field][formFieldInx];
	else fieldObj = document.forms[formName].elements[field];
	
	var pos 			= getPosition(fieldObj);
	var posY 			= pos.y;
	var posX 			= pos.x;
	var calendarHeight	= getHeight(calendarFrame);
	var calendarWidth	= getWidth(calendarFrame);
	var fieldHeight		= getHeight(fieldObj);
	var fieldWidth		= getWidth(fieldObj);
	var winHeight		= getWindowHeight();
	var winWidth		= getWindowWidth();
	
	// 달력을 입력창 오른쪽으로 이동
	if (position == "right") {
		if ((posX + fieldWidth + calendarWidth) > winWidth) {
			posX = winWidth - calendarWidth - 5;
		}
		else {
			posX = posX + fieldWidth;
		}

		/*
		if ((posY + calendarHeight) > winHeight) {
			posY = winHeight - calendarHeight - 5;
		}
		*/
		if (posX < 0) posX = 0;
		if (posY < 0) posY = 0;
		moveObject(calendarFrame, posY, posX);
	}
	// 달력을 입력창 위로 이동
	else if (position == "over") {
		if ((posX + calendarWidth) > winWidth) {
			posX = winWidth - calendarWidth - 5;
		}
		if ((posY + calendarHeight) > winHeight) {
			posY = winHeight - calendarHeight - 5;
		}
		if (posX < 0) posX = 0;
		if (posY < 0) posY = 0;
		moveObject(calendarFrame, posY, posX);
	}
	// 달력을 마우스 클릭 위치로 이동
	else if (position == "mouse") {
		posX = calendarMoveX-10;
		posY = calendarMoveY-5;
		if ((posX + calendarWidth) > winWidth) {
			posX = winWidth - calendarWidth - 5;
		}
		if ((posY + calendarHeight) > winHeight) {
			posY = winHeight - calendarHeight - 5;
		}
		if (posX < 0) posX = 0;
		if (posY < 0) posY = 0;
		moveObject(calendarFrame, posY, posX);
	}	
	// People Sream에서 쓰는 달력 위치 설정용
	else if (position == "front") {
		if ((posX + fieldWidth + calendarWidth) > winWidth) {
			posX = winWidth - calendarWidth - 5;
		}
		else {
			posX = posX + fieldWidth;
		}		
		posX = posX-120;
		posY = posY-130;		
		if (posX < 0) posX = 0;
		if (posY < 0) posY = 0;		
		
		moveObject(calendarFrame, posY, posX);
	}	
	//러닝스퀘어-스크랩북에서 쓰는 달력위치 설정
	else if(position == "scrap") {
		posX = 225;
		posY = 225;
		moveObject(calendarFrame, posY, posX);
	}
	//실시간 세미나에서 쓰는 달력위치 설정
	else if(position == "seminar") {
		var headerPos 			= getPosition(document.getElementById("header"));
		var headerX = headerPos.x;  
		
		posX = posX-headerX+fieldWidth;
		posY = posY-100;
		
		moveObject(calendarFrame, posY, posX);
	}
	
	else if(position == "scrapend") {
	posX = 476;
	posY = 225;
	moveObject(calendarFrame, posY, posX);
}
	//사용자의 이벤트 마우스 위치 기준으로 달력을 표시
	else if(position == "event") {
		posX = event.layerX+fieldWidth + calendarWidth;
		posY = event.layerY+fieldHeight + calendarHeight;
		if ((posX + calendarWidth) > winWidth) {
			posX = winWidth - calendarWidth - 5;
		}
		if ((posY + calendarHeight) > winHeight) {
			posY = winHeight - calendarHeight - 5;
		}
		if (posX < 0) posX = 0;
		if (posY < 0) posY = 0;
		moveObject(calendarFrame, posY, posX);
	}
	// 달력을 입력창 아래로 이동
	else {
		if ((posX + calendarWidth) > winWidth) {
			posX = winWidth - calendarWidth - 5;
		}
		if ((posY + fieldHeight + calendarHeight) > winHeight) {
			posY = winHeight - calendarHeight - 5;
		}
		else {
			posY = posY + fieldHeight;
		}
		if (posX < 0) posX = 0;
		if (posY < 0) posY = 0;
		moveObject(calendarFrame, posY, posX);
	}
}


/**
 * 달력	데이터 설정
 */
function setCalendarData() {
	var	doc				= document;
	var	formName		= calendarObject.formName;
	var formFieldInx    = calendarObject.formFieldInx;
	var	attribute		= calendarObject.attribute;	

	var	yearField		= getDivideString(calendarObject.formField,	1, ",");		// 년도	필드
	var	monthField		= getDivideString(calendarObject.formField,	2, ",");		// 월 필드
	var	dayField		= getDivideString(calendarObject.formField,	3, ",");		// 일 필드

	var	divideChar		= getDivideChar(calendarObject.curDate);					// 문자열 구분자
	var	curYear			= getDivideString(calendarObject.curDate, 1, divideChar);	// 주어진 년도
	var	curMonth		= getDivideString(calendarObject.curDate, 2, divideChar);	// 주어진 월
	
	var	dateType		= "00";
	var fieldType		= 1;
	var	clear			= "no";

	// 현재	날짜
	var	nowDate			= new Date();
	var	nowYear			= nowDate.getYear();
	var	nowMonth		= nowDate.getMonth() + 1;

	var	curInputYear	= "";
	var	curInputMonth	= "";

	// 1: 입력필드가 하나, 2: 입력필드가 년-월-일
	if (dayField !=	"")	{
		fieldType = 2;
	}
	// 기존에 입력된 값이 있는지 확인
	if (fieldType == 2)	{
		if(formFieldInx  == null ) { 
			
			curInputYear	= doc.forms[formName].elements[yearField].value;
			curInputMonth	= doc.forms[formName].elements[monthField].value;
		}else {
		
			curInputYear	= doc.forms[formName].elements[yearField][formFieldInx].value;
			curInputMonth	= doc.forms[formName].elements[monthField][formFieldInx].value;
		}
	}
	else {
		if(formFieldInx  == null ) {
			
			var	inputYear	= "" ; 
			if ( doc.forms[formName].elements[yearField].length == undefined) {
				inputYear = doc.forms[formName].elements[yearField].value ;
			}else {
				inputYear = doc.forms[formName].elements[yearField][0].value ;
			}
			var	inputYear	= doc.forms[formName].elements[yearField].value;
			if (inputYear != "") {
				divideChar		= getDivideChar(inputYear);
				curInputYear	= getDivideString(inputYear, 1,	divideChar);
				curInputMonth	= getDivideString(inputYear, 2,	divideChar);
			}
		}else {
			var	inputYear	= doc.forms[formName].elements[yearField][formFieldInx].value;
			if (inputYear != "") {
				divideChar		= getDivideChar(inputYear);
				curInputYear	= getDivideString(inputYear, 1,	divideChar);
				curInputMonth	= getDivideString(inputYear, 2,	divideChar);
			}		
		}
		
	}

	// 달력에 표시할 년/월 계산
	if (curInputYear ==	"" && curYear == "") {
		curYear		= nowYear;
	}
	else if	(curInputYear != "") {
		curYear		= parseInt(curInputYear);
	}
	else {
		curYear		= parseInt(curYear);
	}
	
	if (curYear	< 1900)	{
		curYear	+= 1900;
	}

	if (curInputMonth == ""	&& curMonth	== "") {
		curMonth	= nowMonth;
	}
	else if	(curInputMonth != "") {
		if (curInputMonth.indexOf("0") == 0) {
			curMonth	= parseInt(curInputMonth.substring(1));
		}
		else {
			curMonth	= parseInt(curInputMonth);
		}
	}
	else {
		curMonth	= parseInt(curMonth);
	}
	

	// Attribute 분석
	if (attribute != null) {
		dateType = getAttributeValue(attribute,	"datetype");
		if (dateType ==	"") {
			dateType = "00";
		}
		
		var	clear		= getAttributeValue(attribute, "clear");
		if (clear == "") {
			clear =	"no";
		}
		
		var position	= getAttributeValue(attribute, "position");
		if (position == "") {
			position = "bottom";
		}
	}
	
	// 데이터를	달력 객체에	저장
	calendarObject.curYear		= curYear;
	calendarObject.curMonth		= curMonth;
	calendarObject.yearField	= yearField;
	calendarObject.monthField	= monthField;
	calendarObject.dayField		= dayField;
	calendarObject.divideChar	= divideChar;
	calendarObject.dateType		= dateType;
	calendarObject.fieldType 	= fieldType;
	calendarObject.clear		= clear;
	calendarObject.position		= position;
}


/**
 * 달력	표시 객체 생성
 */
function createCalendar() {
	calendarObject		= parent.calendarObject;

	// 달력	표시 객체 정의
	var	calendarBodyObj	= document.createElement("div");
	calendarBodyObj.setAttribute("id", "CALENDAR");
	calendarBodyObj.style.width			= "170px";
	calendarBodyObj.style.border		= "1px #808080 solid";
	calendarBodyObj.style.cursor		= "default";
	document.body.appendChild(calendarBodyObj);
	
	// 년도	선택 박스 정의	
	var	yearBoxObj = document.createElement("div");
	yearBoxObj.style.position			= "absolute";
	yearBoxObj.style.display			= "none";
	yearBoxObj.style.border				= "1px #808080 solid";
	yearBoxObj.style.backgroundColor	= "#FFFFFF";
	yearBoxObj.style.cursor				= "default";
	yearBoxObj.style.top				= "25";
	yearBoxObj.style.left				= "45";
	document.body.appendChild(yearBoxObj);

	// 월 선택창 객체 정의
	var	monthBoxObj	= document.createElement("div");
	monthBoxObj.style.position			= "absolute";
	monthBoxObj.style.display			= "none";
	monthBoxObj.style.width				= "55px";
	monthBoxObj.style.height			= "150px";
	monthBoxObj.style.cursor			= "default";
	monthBoxObj.style.top				= "25";
	monthBoxObj.style.left				= "95";	
	monthBoxObj.style.overflow			= "auto";
	monthBoxObj.style.border			= "1px #808080 solid";
	monthBoxObj.style.backgroundColor	= "#FFFFFF";
	monthBoxObj.style.scrollbarFaceColor		= "#FFFFFF";
	monthBoxObj.style.scrollbarShadowColor		= "#FFFFFF"; 
	monthBoxObj.style.scrollbarHighlightColor	= "#FFFFFF"; 
	monthBoxObj.style.scrollbarTrackColor		= "#E9E9E9"; 
	monthBoxObj.style.scrollbarArrowColor		= "#A3A3A3";
	document.body.appendChild(monthBoxObj);

	parent.calendarObject.calendarBodyObj	= calendarBodyObj;
	parent.calendarObject.yearBoxObj		= yearBoxObj;
	parent.calendarObject.monthBoxObj		= monthBoxObj;

	displayCalendar(calendarObject.curYear, calendarObject.curMonth);
	visibleObject(calendarObject.calendarFrame);
	
	//document.onselectstart	= function() { return false	}
	//document.ondragstart	= function() { return false	}
	//document.oncontextmenu 	= function() { return false }
}


/**
 * 달력	객체 정의
 */
function setCalendarObject() {
	// 아이콘 정의
	this.bttnCloseOff			= calendarImgPath+"calendar_close_off.gif";
	this.bttnCloseOn			= calendarImgPath+"calendar_close_on.gif";
	this.bttnDelOff				= calendarImgPath+"calendar_del_off.gif";
	this.bttnDelOn				= calendarImgPath+"calendar_del_on.gif";
	this.bttnPrevYear			= calendarImgPath+"calendar_pyear.gif";
	this.bttnPrevMonth			= calendarImgPath+"calendar_pmon.gif";
	this.bttnNextYear			= calendarImgPath+"calendar_nyear.gif";
	this.bttnNextMonth			= calendarImgPath+"calendar_nmon.gif";
	
	this.bttnCloseOffImg		= new Image();
	this.bttnCloseOffImg.src	= this.bttnCloseOff;
	this.bttnCloseOnImg			= new Image();
	this.bttnCloseOnImg.src		= this.bttnCloseOn;
	
	this.bttnDelOffImg			= new Image();
	this.bttnDelOffImg.src		= this.bttnDelOff;
	this.bttnDelOnImg			= new Image();
	this.bttnDelOnImg.src		= this.bttnDelOn;

	this.calendarFrame			= null;
	this.calendarBodyObj		= null;
	this.yearBoxObj				= null;
	this.monthBoxObj			= null;
	
	this.formName				= null;
	this.formField				= null;
	this.curDate				= null;
	this.attribute				= null;
	this.formFieldInx           = null;
	this.yearField				= "";
	this.monthField				= "";
	this.dayField				= "";
	this.curYear				= "";
	this.curMonth				= "";
	this.dateType				= "";
	this.clear					= "";
	this.divideChar				= "/";
	this.fieldType				= 1;
	this.func					= null;
}


/**	
 * 달력	내용 표시
 */
function displayCalendar(startYear,	startMonth)	{
	startWeek		= 0;	// 월의	시작 요일
	endDay			= 0;	// 월의	날짜
	countDay		= 0;	// 날짜	카운트
	prevYear		= 0;	// 이전	년도 
	prevMonth		= 0;	// 이전	월	 
	nextYear		= 0;	// 다음	년도 
	nextMonth		= 0;	// 다음	월	 
    
	// 현재	월이 12월일	경우
	if (startMonth >= 12) {
		endDay	= 31;
		prevYear = startYear;	   
		prevMonth  = startMonth	- 1;   
		nextYear = startYear + 1;  
		nextMonth  = 1;			   
	}
	else {
		var	month_days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		
		// 윤년	체크
		if (startYear%4	== 0 ||	startYear%100 == 0)	{
			month_days[1] =	29;
		}
		else{
			month_days[1] =	28;
		}
		
		endDay	= month_days[startMonth-1];	// 마지막 날짜
		
		// 현재	월이 1월인 경우
		if (startMonth == 1) {
			prevYear	= startYear	- 1;	// 이전	년도
			prevMonth	= 12;				// 이전	월
		}
		else {
			prevYear	= startYear;		// 이전	년도
			prevMonth	= startMonth - 1;	// 이전	월
		}
		nextYear		= startYear;		// 다음	년도
		nextMonth		= startMonth + 1;	// 다음	월
	}

	// Date	객체를 생성하여	주어진 년/월을 할당
	var	nowDate	= new Date();
    nowDate.setUTCFullYear(startYear);
    nowDate.setUTCMonth(startMonth - 1);
    nowDate.setUTCDate(1);	

    //nowDate.setHours();
  ///  nowDate.setMinutes(0);
  //  nowDate.setSeconds(0);
	//nowDate.setYear(startYear); 
	//nowDate.setMonth(startMonth-1);
	//nowDate.setDate(1);
	//startWeek =	nowDate.getDay()-1;	
	startWeek =	nowDate.getUTCDay()+1;
	//alert(nowDate.toGMTString())
	if (startWeek == 0)	{
		startWeek =	7;
	}

	// 날짜	입력 필드 삭제 버튼
	var	clearButton	= "";
	if (calendarObject.clear ==	"yes") {
		clearButton	= "<td onClick=\"clearCalendarField()\"><img src="+calendarObject.bttnDelOff+" border=0	"
					+ "onMouseOver=\"changeImage(this,'"+calendarObject.bttnDelOnImg.src+"')\" "
					+ "onMouseOut=\"changeImage(this,'"+calendarObject.bttnDelOffImg.src+"')\"></td>"
	}

	var calendarHeadStyle = "style='"
		+ "border:1px "+calendarHeadBgColor+" solid;"
    	+ "padding-top:1px;"
	    + "padding-left:1px;"
    	+ "padding-right:1px;"
	    + "font-size:9pt;"
	    + "font-family:"+calendarFontFamily+";"
    	+ "font-weight:bold;'";
    		
	var calendarDateHeadStyle = "style='"
		+ "border-top:1px "+calendarBorderColor+" solid;"
    	+ "border-right:1px "+calendarBorderColor+" solid;"
    	+ "background-color:"+calendarHeadBgColor+";"
    	+ "text-align:center;"
    	+ "padding-top:3px;"
    	+ "font-size:9pt;"
    	+ "font-family:"+calendarFontFamily+";"
    	+ "height:20px;'";
    	
	var	dateStr	= ""
		+ "<table border=0 cellspacing=0 cellpadding=0 width=100% "
		+ "    style='font-size:9pt;font-family:"+calendarFontFamily+";border-bottom:1px "+calendarBorderColor+" solid;border-left:1px "+calendarBorderColor+" solid;'>"
		+ "<tr>"
		+ "	   <td colspan=7>"
		+ "		   <table border=0 cellspacing=0 cellpadding=1 width=100% "
		+ "            style='background-color:"+calendarTitleBgColor+";color:"+calendarTitleColor+";font-size:9pt;font-family:"+calendarFontFamily+";font-weight:bold;'>"
		+ "		   <tr>"
		+ "			   <td class=calendarTitle width=90% onmousedown=\"clickTitle()\">"+calendarObject.calTitle+"</td>"
		+ "			   <td align=right>"
		+ "				   <table border=0 cellspacing=0 cellpadding=2><tr>"
		+					   clearButton
		+ "					   <td onClick=\"closeCalendar()\"><img	src="+calendarObject.bttnCloseOff+"	border=0 "
		+ "						   onMouseOver=\"changeImage(this,'"+calendarObject.bttnCloseOnImg.src+"')\" "
		+ "						   onMouseOut=\"changeImage(this,'"+calendarObject.bttnCloseOffImg.src+"')\"></td>"
		+ "				   </tr></table>"
		+ "			   </td>"
		+ "		   </tr>"
		+ "		   </table>"
		+ "	   </td>"
		+ "</tr>"
		+ "<tr>"
		+ "	   <td colspan=7 style=\"border-top:1px	"+calendarBorderColor+" solid;border-right:1px "+calendarBorderColor+" solid\">"
		+ "		   <table border=0 cellspacing=0 cellpadding=0 width=100% style=\"background-color:"+calendarHeadBgColor+";height:24px;\">"
		+ "		   <tr>"
		+ "			   <td align=left>"
		+ "				   <table border=0 cellspacing=0 cellpadding=0><tr>"
		+ "					   <td><div	"+calendarHeadStyle+" "
		+ "						   onClick=\"displayCalendar("+(startYear-1)+","+startMonth+")\" "
		+ "						   onMouseOver=\"onCalendarYmLink(this)\" "
		+ "						   onMouseOut=\"offCalendarYmLink(this)\"><img src="+calendarObject.bttnPrevYear+" border=0></div></td>"
		+ "					   <td><div	"+calendarHeadStyle+" "
		+ "						   onClick=\"displayCalendar("+prevYear+","+prevMonth+")\" "
		+ "						   onMouseOver=\"onCalendarYmLink(this)\" "
		+ "						   onMouseOut=\"offCalendarYmLink(this)\"><img src="+calendarObject.bttnPrevMonth+"	border=0></div></td>"
		+ "				   </tr></table>"
		+ "			   </td>"
		+ "			   <td align=center>"
		+ "				   <table border=0 cellspacing=0 cellpadding=0><tr>"
		+ "					   <td align=center><div "+calendarHeadStyle+" "
		+ "						   onMouseOver=\"onCalendarYmLink(this)\" "
		+ "						   onMouseOut=\"offCalendarYmLink(this)\" "
		//다국어원본 : 년
		+ "						   onClick=\"changeCalendarYear("+startYear+","+startMonth+")\">"+startYear+MESSAGE["year"][jslang]+"</div></td>" //다국어phs
		+ "					   <td>&nbsp;</td>"
		+ "					   <td align=center><div "+calendarHeadStyle+" "
		+ "						   onMouseOver=\"onCalendarYmLink(this)\" "
		+ "						   onMouseOut=\"offCalendarYmLink(this)\" "
		//다국어원본 : 월
		+ "						   onClick=\"changeCalendarMonth("+startYear+")\">"+startMonth+MESSAGE["month"][jslang]+"</div></td>" //다국어phs
		+ "				   </tr></table>"
		+ "			   </td>"
		+ "			   <td align=right>"
		+ "				   <table border=0 cellspacing=0 cellpadding=0><tr>"
		+ "					   <td><div	"+calendarHeadStyle+" "
		+ "						   onClick=\"displayCalendar("+nextYear+","+nextMonth+")\" "
		+ "						   onMouseOver=\"onCalendarYmLink(this)\" "
		+ "						   onMouseOut=\"offCalendarYmLink(this)\"><img src="+calendarObject.bttnNextMonth+"	border=0></div></td>"
		+ "					   <td><div	"+calendarHeadStyle+" "
		+ "						   onClick=\"displayCalendar("+(startYear+1)+","+startMonth+")\" "
		+ "						   onMouseOver=\"onCalendarYmLink(this)\" "
		+ "						   onMouseOut=\"offCalendarYmLink(this)\"><img src="+calendarObject.bttnNextYear+" border=0></div></td>"
		+ "				   </tr></table>"
		+ "			   </td>"
		+ "		   </tr>"
		+ "		   </table>"
		+ "	   </td>"
		+ "</tr>"
		+ "<tr>"
		+ "	   <td "+calendarDateHeadStyle+" width=15%><font color=red>"+calendarSun+"</font></td>"
		+ "	   <td "+calendarDateHeadStyle+" width=14%>"+calendarMon+"</td>"
		+ "	   <td "+calendarDateHeadStyle+" width=14%>"+calendarTue+"</td>"
		+ "	   <td "+calendarDateHeadStyle+" width=14%>"+calendarWed+"</td>"
		+ "	   <td "+calendarDateHeadStyle+" width=14%>"+calendarThu+"</td>"
		+ "	   <td "+calendarDateHeadStyle+" width=14%>"+calendarFri+"</td>"
		+ "	   <td "+calendarDateHeadStyle+" width=15%><font color=blue>"+calendarSat+"</font></td>"
		+ "</tr>";
	
	var calendarDateStyle = "style='"
		+ "border-top:1px "+calendarBorderColor+" solid;"
		+ "border-right:1px "+calendarBorderColor+" solid;"
		+ "background-color:"+calendarDateBgColor+";"
		+ "text-align:center;"
		+ "padding-top:3px;"
		+ "font-size:9pt;"
		+ "font-family:"+calendarFontFamily+";"
		+ "height:22px;'";
			
	var	lineCount =	0;
	// 날짜를 계산하여 요일별로	표시
	for	(var i=1; i<=6;	i++) {
		lineCount += 1;
		dateStr	+= "<tr>";
		for	(var j=1; j<=7;	j++) {
			if (i==1 &&	j<startWeek) {
				dateStr	+= "<td	"+calendarDateStyle+">&nbsp;</td>";
			}
			else {
				countDay +=	1;
				if (countDay > endDay) {
					dateStr	+= "<td	"+calendarDateStyle+">&nbsp;</td>";
				}
				else {
					var	a_class	 = "";

					if (a_class	== "") {
						if (j==1) {
							a_class	= "red";
						}
						else if	(j==7) {
							a_class	= "blue";
						}
						else {
							a_class	= "black";
						}
					}
					
					dateStr	+= "<td	"+calendarDateStyle+" "
							+ "onMouseDown=\"inputCalendarDate("+startYear+","+startMonth+","+countDay+")\"	"
							+ "onMouseOver=\"onCalendarDateColor(this)\" "
							+ "onMouseOut=\"offCalendarDateColor(this,"+countDay+")\"><font	color="+a_class+">"+countDay+"</font></td>";
				}
			}
		}
		dateStr	+= "</tr>";
		if (countDay >=	endDay)	{
			break;
		}
	}
	dateStr	+= "</table>";
	calendarObject.calendarBodyObj.innerHTML = dateStr;
	
	resizeCalendarBox(lineCount);
	visibleObject(calendarObject.calendarFrame);
}


/**
 * 달력을 다시 표시 (달력 객체가 이미 생성되어 있을 경우)
 */
function redisplayCalendar() {
	calendarObject = parent.calendarObject;
	displayCalendar(calendarObject.curYear, calendarObject.curMonth);
}


/**
 * 달력표시창 크기 재설정
 */
function resizeCalendarBox(lineCount) {
	var	boxHeight =	180;
	if (lineCount == 6)	{
		boxHeight =	200
	}
	else if (lineCount == 4) {
		boxHeight = 160;
	}
	
	resizeHeight(calendarObject.calendarFrame, boxHeight);
}


/**
 * 입력폼에	날짜 쓰기
 */
function inputCalendarDate(year, month,	day) {
	var	doc			= parent.document;
	var	formName	= calendarObject.formName;
	var	yearField	= calendarObject.yearField;
	var	monthField	= calendarObject.monthField;
	var	dayField	= calendarObject.dayField;
	var	dateType	= calendarObject.dateType;
	var	fieldType	= calendarObject.fieldType;
	var	divideChar	= calendarObject.divideChar;
	var formFieldInx =calendarObject.formFieldInx;
	var func =calendarObject.func;		//부모창에서 실행될 함수를 정의

	if (dateType !=	"0") {
		if (month <	10)	{
			month =	"0"+month;
		}
		if (day	< 10) {
			day	= "0"+day;
		}
	}
	if(formFieldInx ==  null ) {
		// 날짜	입력창이 "년" -	"월" - "일"	로 분리된 경우
		if (fieldType == 2)	{
			doc.forms[formName].elements[yearField].value	= year;
			doc.forms[formName].elements[monthField].value	= month;
			doc.forms[formName].elements[dayField].value	= day;
		}
		// 날짜	입력창이 하나의	필드인 경우
		else {
			if (divideChar == "") {
				divideChar = "/";
			}
			var date = year	+ "" + month + "" + day;
			year = year	+ divideChar + month + divideChar +	day;
			doc.forms[formName].elements[yearField].value	= year;
			if(monthField != "")
			doc.forms[formName].elements[monthField].value	= date;
		}
	}else {
		
	// 날짜	입력창이 "년" -	"월" - "일"	로 분리된 경우
		if (fieldType == 2)	{
			
			doc.forms[formName].elements[yearField][formFieldInx].value	= year;
			doc.forms[formName].elements[monthField][formFieldInx].value	= month;
			doc.forms[formName].elements[dayField][formFieldInx].value	= day;
		}
		// 날짜	입력창이 하나의	필드인 경우
		else {
			if (divideChar == "") {
				divideChar = "/";
			}
			var date = year	+ "" + month + "" + day;
			year = year	+ divideChar + month + divideChar +	day;
			doc.forms[formName].elements[yearField][formFieldInx].value	= year;
			if(monthField != "")
				doc.forms[formName].elements[monthField][formFieldInx].value	= date;
		}	

	}
	if(func != null){
		parent.eval(func);
	}
	// 달력	닫기 호출
	closeCalendar();
}


/**
 * 날짜	입력 필드 지우기
 */
function clearCalendarField() {
	var	doc			= parent.document;
	var	formName	= calendarObject.formName;
	var	yearField	= calendarObject.yearField;
	var	monthField	= calendarObject.monthField;
	var	dayField	= calendarObject.dayField;
	var formFieldInx =calendarObject.formFieldInx;
	if(formFieldInx ==  null ) {	
		if (yearField != "") {
			doc.forms[formName].elements[yearField].value	= "";
		}
	
		if (monthField != "") {
			doc.forms[formName].elements[monthField].value	= "";
		}
		
		if (dayField !=	"")	{
			doc.forms[formName].elements[dayField].value	= "";
		}
	}else {
		if (yearField != "") {
			doc.forms[formName].elements[yearField][formFieldInx].value	= "";
		}
	
		if (monthField != "") {
			doc.forms[formName].elements[monthField][formFieldInx].value	= "";
		}
		
		if (dayField !=	"")	{
			doc.forms[formName].elements[dayField][formFieldInx].value	= "";
		}	
	}	
	closeCalendar();
}


/**
 * 달력	닫기
 */
function closeCalendar() {
	if (calendarObject.calendarFrame != null) {
		offDisplay(calendarObject.yearBoxObj);
		offDisplay(calendarObject.monthBoxObj);
		hiddenObject(calendarObject.calendarFrame);
	}
}


/**
 * 년 선택창
 */
function changeCalendarYear(year, month) {
	var	yearStr	= "<table border=0 cellspacing=0 cellpadding=0>";
	var	nvalue = -3;
	for	(var i=1; i<=8;	i++) {
		var	nyear =	year + nvalue;
		yearStr	+= "<tr>"
				+ "	 <td style='font-size:9pt;font-family:"+calendarFontFamily+";'><div "
				+ "	   onMouseDown=\"displayCalendar("+nyear+","+month+"); offDisplay(calendarObject.yearBoxObj)\" "
				+ "	   onMouseOver=\"onCalendarYmColor(this)\" "
				//다국어원본 : 년
				+ "	   onMouseOut=\"offCalendarYmColor(this)\">&nbsp;"+nyear+""+MESSAGE["year"][jslang]+"&nbsp;</div></td>" //다국어phs
				+ "</tr>";
		nvalue += 1;
	}
	yearStr	+= "</table>";
	calendarObject.yearBoxObj.innerHTML	= yearStr;

	offDisplay(calendarObject.monthBoxObj);
	onDisplay(calendarObject.yearBoxObj);
}


/**
 *	월 선택창
 */
function changeCalendarMonth(year) {
	var	monStr = "<table border=0 cellspacing=0	cellpadding=0>";
	for	(var i=1; i<=12; i++) {
		monStr += "<tr>"
				+ "	 <td style='font-size:9pt;font-family:"+calendarFontFamily+";' align=right><div ymFor='sel_ym' "
				+ "	   onMouseDown=\"displayCalendar("+year+","+i+"); offDisplay(calendarObject.monthBoxObj)\" "
				+ "	   onMouseOver=\"onCalendarYmColor(this)\" "
				//다국어원본 : 월
				+ "	   onMouseOut=\"offCalendarYmColor(this)\">&nbsp;"+i+MESSAGE["month"][jslang]+"&nbsp;</div></td>" //다국어phs
				+ "</tr>";
	}
	monStr += "</table>";
	calendarObject.monthBoxObj.innerHTML = monStr;

	offDisplay(calendarObject.yearBoxObj);
	onDisplay(calendarObject.monthBoxObj);
}


/**
 * 타이틀 클릭시 작업
 */
function clickTitle() {
	if (calendarObject.yearBoxObj != null) {
		offDisplay(calendarObject.yearBoxObj);
	}
	
	if (calendarObject.monthBoxObj != null)	{
		offDisplay(calendarObject.monthBoxObj);
	}
}


/**
 * 년/월 선택창의 마우스 Over시	배경색
 */
function onCalendarYmColor(obj)	{
	obj.style.backgroundColor	= "#003264";
	obj.style.color				= "#FFFFFF";
}


/**
 * 년/월 선택창의 마우스 Out시 배경색
 */
function offCalendarYmColor(obj) {
	obj.style.backgroundColor	= "#FFFFFF";
	obj.style.color				= "#000000";
}


/**
 * 년/월 마우스	Over
 */
function onCalendarYmLink(obj) {
	obj.style.borderTop			= "1px #FFFFFF solid";
	obj.style.borderLeft		= "1px #FFFFFF solid";
	obj.style.borderBottom		= "1px "+calendarBorderColor+" solid";
	obj.style.borderRight		= "1px "+calendarBorderColor+" solid";
	obj.style.cursor			= "pointer";
}


/**
 * 년/월 마우스	Out
 */
function offCalendarYmLink(obj)	{
	obj.style.border			= "1px "+calendarHeadBgColor+" solid";
	obj.style.cursor			= "default";
}


/**
 * 날짜의 마우스 Over시	배경색
 */
function onCalendarDateColor(obj) {
	obj.style.backgroundColor	= calendarDateBgOverColor;
}


/**
 * 날짜의 마우스 Out시 배경색
 */
function offCalendarDateColor(obj, sday) {
	obj.style.backgroundColor	= calendarDateBgColor;
}


/**
 * 마우스의	위치 체크
 */
function checkCalendarMouse(evt) {
	if (browserType == "IE") {
		calendarMoveX	= checkMouseX(evt) + getScrollX();
		calendarMoveY	= checkMouseY(evt) + getScrollY();
	}
	else {
		calendarMoveX	= checkMouseX(evt);
		calendarMoveY	= checkMouseY(evt)
	}
}


/**
 * 문자열의	구분자 추출
 */
function getDivideChar(str)	{
	str	= nullToEmpty(str);
	var	result = "";
	
	if (str	!= "") {
		if (str.indexOf("/") >=	0) {
			result = "/";
		}
		else if	(str.indexOf("-") >= 0)	{
			result = "-";
		}else if	(str.indexOf(".") >= 0)	{
			result = ".";
		}
	}
	return result;
}

function getCalendarObj(seq, property, date, isnull){
    var printdate = addDateFormatStr(date);
    var  calendarStr = "<input type=\"text\" name=\"date"+seq+"\" style=\"cursor:text;width:80px;\" value=\""+printdate+"\" " +
    					//다국어원본 : 날짜
                       "onClick=\"Calendar('"+MESSAGE["date"][jslang]+"', 'form1', 'date"+seq+","+property+"', '/','position=right,datetype=00,clear=no');\" readonly >" + //다국어phs   
                       //다국어원본 : 날짜
                       "<input type=\"text\" name=\""+property+"\" dispName='"+MESSAGE["date"][jslang]+"' "+isnull+" value=\""+date+"\" style='display:none'>"; //다국어phs
 
    return calendarStr;
}