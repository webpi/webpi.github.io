<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0",user-scalable=no />
<meta name="format-detection" content="telephone=no, address=no, email=no" />
<title>61N Manual</title>
<link rel="stylesheet" href="../../css/common.css" type="text/css">
<link rel="stylesheet" href="../../css/fontstyle.css" type="text/css">
<link rel="stylesheet" href="../../css/manual.css" type="text/css">
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

<link rel="stylesheet" type="text/css" href="../../css/powerlistmenu.css" />

<!--[if lte IE 8]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<script src="../../js/powerlistmenu.js"></script>

<script type="text/javascript">

var powerinstance

jQuery(function($){ // on DOM load
	powerinstance = new Powerlistmenu({
		menuid: 'powermenu1' // id of main nav container
	})
})

</script>
<style>
@import url('http://fonts.googleapis.com/earlyaccess/nanumgothic.css');
</style>
</head>

<body>
<? include_once ("../../include/top_manual_kor.php"); ?>
<div class="wrap">
	<h1>MANUAL</h1>
    <div class="contents clearfix">
        <div class="dir"><p><a href="main.php">61N 매뉴얼</a> <span> &gt; </span> <a href="setting_1.php">61N 메뉴 - 설정하기</a> <span> &gt; </span> <strong>카메라 설정하기</strong></p></div>
        <div class="left clearfix">
            <nav id="powermenu1" class="powerlistmenu">
            <ul class="lmenu">
                <li><a href="main.php">61N 처음 사용하기</a>
                	<!--ul class="lmenu">
                      <li><a href="main.html">앱 설치하기</a></li>
                      <li><a href="main.html">계정생성</a></li>
                      <li><a href="main.html">카메라 연동하기</a></li>
                      <li><a href="main.html">사진 등록하기</a></li>
                    </ul-->
                </li>
                <li><a href="camera_1.php">카메라 사용하기</a>
                    <ul class="lmenu">
                      <li><a href="camera_1.php">전원</a>
                      	<ul class="lmenu">
                        	<li><a href="camera_1.php">카메라 켜기</a></li>
                            <li><a href="camera_1.php">카메라 끄기</a></li>
                            <li><a href="camera_1.php">카메라 다시시작</a></li>
                        </ul>
                      </li>
                      <li><a href="camera_2.php">사진찍기</a>
                      	<ul class="lmenu">
                        	<li><a href="camera_2.php">자동촬영</a></li>
                            <li><a href="camera_2.php">수동촬영</a></li>
                        </ul>
                      </li>
                      <li><a href="camera_3.php">동영상</a>
                      	<ul class="lmenu">
                        	<li><a href="camera_3.php">동영상녹화</a></li>
                        </ul>
                      </li>
                      <li><a href="camera_4.php">충전하기</a></li>
                      <li><a href="camera_5.php">백업하기</a></li>
                      <li><a href="camera_6.php">카메라 배터리</a></li>
                      <li><a href="camera_7.php">카메라 메모리</a></li>
                    </ul>
                </li>
                <li><a href="app_1.php">앱 살펴보기</a>
                    <ul class="lmenu">
                      <li><a href="app_1.php">시작하기</a>
                      	<ul class="lmenu">
                        	<li><a href="app_1.php">계정생성</a></li>
                            <li><a href="app_1.php">로그인</a></li>
                            <li><a href="app_1.php">비밀번호찾기</a></li>
                        </ul>
                      </li>
                      <li><a href="app_2.php">살펴보기</a>
                      	<ul class="lmenu">
                        	<li><a href="app_2.php">기본화면 살펴보기</a></li>
                            <li><a href="app_2.php">프로필바</a></li>
                            <li><a href="app_2.php">메뉴바</a></li>
                            <li><a href="app_2.php">타임라인</a></li>
                        </ul>
                      </li>
                      <li><a href="app_3.php">사진등록하기</a>
                        <ul class="lmenu">
                        	<li><a href="app_3.php">사진전송하기</a></li>
                            <li><a href="app_3.php">안드로이드</a></li>
                            <li><a href="app_3.php">iOS</a></li>
                        </ul>
                      </li>
                      <li><a href="app_4.php">사진보기</a>
                      	<ul class="lmenu">
                        	<li><a href="app_4.php">장소별로 보기</a></li>
                            <li><a href="app_4.php">일별로 모아보기</a></li>
                            <li><a href="app_4.php">월별로 모아보기</a></li>
                            <li><a href="app_4.php">격자로 모아보기</a></li>
                            <li><a href="app_4.php">상세보기</a></li>
                            <li><a href="app_4.php">감정태그달기</a></li>
                            <li><a href="app_4.php">해시태그달기</a></li>
                            <li><a href="app_4.php">공유하기</a></li>
                            <li><a href="app_4.php">다운로드하기</a></li>
                            <li><a href="app_4.php">삭제하기</a></li>
                        </ul>
                      </li>
                    </ul>
                </li>
                <li><a href="">61N 메뉴 - Timeline</a>
                    <ul class="lmenu">
                      <li><a href="timeline_1.php">Timeline 살펴보기</a>
                      	<ul class="lmenu">
                        	<li><a href="timeline_1.php">살펴보기</a></li>
                            <li><a href="timeline_1.php">프로필 바</a></li>
                            <li><a href="timeline_1.php">프로필 바 확장하기</a></li>
                            <li><a href="timeline_1.php">자신의 스마트폰에 있는 사진을 타임라인에 등록하기</a></li>
                            <li><a href="timeline_1.php">Live View</a></li>
                            <li><a href="timeline_1.php">통계보기</a></li>
                            <li><a href="timeline_1.php">포토스토리</a></li>
                        </ul>
                      </li>
                      <li><a href="timeline_2.php">WITH 보기</a>
                      	<ul class="lmenu">
                        	<li><a href="timeline_2.php">WITH타임라인 보기</a></li>
                            <li><a href="timeline_2.php">HELLO 보기</a></li>
                            <li><a href="timeline_2.php">GOODBYE 보기</a></li>
                            <li><a href="timeline_2.php">WITH 통계보기</a></li>
                        </ul>
                      </li>
                      <li><a href="timeline_3.php">Multi모드 사용하기</a></li>
                    </ul>
                </li>
                <li><a href="">61N 메뉴 - F/F Album</a>
                	<ul class="lmenu">
                      <li><a href="fnf_1.php">F/F Album</a>
                      	<ul class="lmenu">
                        	<li><a href="fnf_1.php">F/F Album 살펴보기</a></li>
                            <li><a href="fnf_1.php">F/F 멤버 보기</a></li>
                            <li><a href="fnf_1.php">F/F 사진 모두보기</a></li>
                            <li><a href="fnf_1.php">내가올린 사진만 보기</a></li>
                            <li><a href="fnf_1.php">F/F 멤버별로 사진보기</a></li>
                            <li><a href="fnf_1.php">F/F 멤버 등록하기</a></li>
                        </ul>
                      </li>
                      <li><a href="fnf_2.php">F/F 사진보기</a></li>
                    </ul>
                </li>
                <li><a href="">61N 메뉴 - Footprint</a>
                	<ul class="lmenu">
                      <li><a href="footprint_1.php">장소별로 사진보기</a>
                      	<ul class="lmenu">
                        	<li><a href="footprint_1.php">지도화면에서 보기</a></li>
                            <li><a href="footprint_1.php">격자로 보기</a></li>
                            <li><a href="footprint_1.php">상세보기</a></li>
                        </ul>
                      </li>
                      <li><a href="footprint_2.php">내위치 확인하기</a></li>
                    </ul>
                </li>
                <li class="on"><a href="">61N 메뉴 - 설정하기</a>
                	<ul class="lmenu">
                      <li><a href="setting_1.php">계정 설정하기</a>
                      	<ul class="lmenu">
                        	<li><a href="setting_1.php">프로필 사진 등록하기</a></li>
                            <li><a href="setting_1.php">이름 등록하기</a></li>
                            <li><a href="setting_1.php">생일 설정하기</a></li>
                            <li><a href="setting_1.php">성별 설정하기</a></li>
                            <li><a href="setting_1.php">Facebook 계정에서 61N 계정으로 전환하기</a></li>
                            <li><a href="setting_1.php">비밀번호 변경하기</a></li>
                            <li><a href="setting_1.php">회원 탈퇴하기</a></li>
                        </ul>
                      </li>
                      <li><a href="setting_2.php">WITH 설정하기</a>
                      	<ul class="lmenu">
                        	<li><a href="setting_2.php">WITH코드 보내기</a></li>
                            <li><a href="setting_2.php">WITH코드 등록하기</a></li>
                            <li><a href="setting_2.php">WITH 해지하기</a></li>
                        </ul>
                      </li>
                      <li><a href="setting_3.php">F/F 설정하기</a>
                      	<ul class="lmenu">
                        	<li><a href="setting_3.php">F/F 코드 보내기</a></li>
                            <li><a href="setting_3.php">F/F 코드 등록하기</a></li>
                            <li><a href="setting_3.php">F/F 해지하기</a></li>
                        </ul>
                      </li>
                      <li class="on"><a href="setting_4.php">카메라 설정하기</a>
                      	<ul class="lmenu">
                        	<li><a href="setting_4.php">카메라 등록하기</a></li>
                            <li><a href="setting_4.php">촬영간격 변경</a></li>
                            <li><a href="setting_4.php">녹화시간 변경</a></li>
                        	<li><a href="setting_4.php">사진 해상도 변경</a></li>
                            <li><a href="setting_4.php">위치정보 사용유무</a></li>
                            <li><a href="setting_4.php">펌웨어 업데이트</a></li>
                        	<li><a href="setting_4.php">카메라 초기화</a></li>
                            <li><a href="setting_4.php">카메라 해제하기</a></li>
                        </ul>
                      </li>
                      <li><a href="setting_5.php">테마 설정하기</a></li>
                      <li><a href="setting_6.php">클라우드 용량보기</a></li>
                      <li><a href="setting_7.php">알림 설정하기</a></li>
                      <li><a href="setting_8.php">모바일데이터 사용유무 설정하기</a></li>
                      <li><a href="setting_9.php">도움말 보기</a></li>
                      <li><a href="setting_10.php">정책 및 약관 보기</a></li>
                      <li><a href="setting_11.php">공지사항 보기</a></li>
                    </ul>
                </li>
            </ul>
            </nav>
        </div>
        <div class="cright clearfix">
        	<!-- Write contents here -->
            <h2>카메라 설정하기</h2>
            <h3>카메라 등록하기</h3><!-- Sub title -->
            <p>앱 메뉴의 설정 > 61N 카메라설정 > 61N 카메라등록으로 접근한 후, 61N 카메라의 전원 버튼을 5회 짧게 연속적으로 눌러줍니다. 이후 화면 하단의 ‘찾기’ 버튼을 터치하면 61N 카메라가 등록됩니다. 61N 카메라가 등록되면 ‘61N 카메라설정’ 화면 하단 ‘장치목록’에 자신의 61N 카메라가 표시됩니다.</p>
			<h3>촬영간격 변경</h3><!-- Sub title -->
            <p>61N 카메라설정 > 61N 촬영설정 > 자동간격설정 > 자동촬영 간격에서 1분/2분/4분/5분 중 원하는 간격을 선택할 수 있습니다. 원하는 시간간격을 선택 후 화면 하단의 ‘설정변경’ 버튼을 터치하여 변경한 내용을 61N 카메라에 적용합니다. 이때 61N 카메라는 반드시 자신의 앱에 등록되어 있는 61N 카메라여야 하며, 켜져 있어야 합니다.<br>

장소의 이동이 많지 않거나 사진 찍을 대상의 변화가 없을 경우 간격을 길게 설정하시면 됩니다.</p>
            <h3>녹화시간 변경</h3><!-- Sub title -->
            <p>61N 카메라설정 > 61N 촬영설정 > 녹화시간설정 > 녹화시간을 5초/10초/20초/30초/60초 중 원하는 길이의 촬영시간을 선택할 수 있습니다. 원하는 시간간격을 선택 후 화면 하단의 ‘설정변경’ 버튼을 터치하여 변경한 내용을 61N 카메라에 적용합니다. 이때 61N 카메라는 반드시 자신의 앱에 등록되어 있는 61N 카메라여야 하며, 켜져 있어야 합니다.</p>
            <h3>사진 해상도 변경</h3><!-- Sub title -->
            <p>61N 카메라설정 > 61N 촬영설정 > 환경설정 > 해상도 에서 1600x1200 / 3264x2448 중 원하는 해상도를 선택 후 화면 하단의 ‘설정변경’ 버튼을 터치하여 변경한 내용을 61N 카메라에 적용합니다. 이때 61N 카메라는 반드시 자신의 앱에 등록되어 있는 61N 카메라여야 하며, 켜져 있어야 합니다.</p>
            <h3>위치정보 사용유무</h3><!-- Sub title -->
            <p>61N 카메라설정 > 61N 촬영설정 > 환경설정 > 위치정보 사용에서 토글 버튼을 이용하여 GPS의 사용 유무를 선택 후 화면 하단의 ‘설정변경’ 버튼을 터치하여 변경한 내용을 61N 카메라에 적용합니다. 이때 61N 카메라는 반드시 자신의 앱에 등록되어 있는 61N 카메라여야 하며, 켜져 있어야 합니다.</p>
            <h3>펌웨어 업데이트</h3><!-- Sub title -->
            <p>61N 카메라의 최신버전 펌웨어가 있을경우 앱 메뉴중 설정버튼에 +배지가 표시됩니다. 61N 카메라설정 > 61N 펌웨어 업데이트 > 61N 카메라 목록에서 최신버전 펌웨어의 유무를 확인 후 하단의 업데이트 버튼을 터치하여 업데이트를 진행하십시요. 이때 61N 카메라는 반드시 자신의 앱에 등록되어 있는 61N 카메라여야 하며, 켜져 있고, 전원에 연결되어 있어야 합니다. </p>
            <h3>카메라 초기화</h3><!-- Sub title -->
            <p>61N 카메라를 초기화 합니다. 초기화 하기전에 반드시 카메라에 저장된 사진을 백업하십시오. 61N 카메라설정 > 61N 장치 초기화 > 카메라 목록에서 초기화를 할 카메라를 선택 후 하단 초기화 버튼을 터치하면 초기화가 진행됩니다. 이때 61N 카메라는 반드시 자신의 앱에 등록되어 있는 61N 카메라여야 하며, 켜져 있고, 전원에 연결되어 있어야 합니다. (주의 : 카메라에 문제가 없을 경우 이 기능을 사용하지 마십시오.)</p>
            <h3>카메라 해제하기</h3><!-- Sub title -->
            <p>앱 메뉴의 설정 > 61N 카메라설정 화면 하단의 ‘장치목록’에 등록되어 있는 61N 카메라 목록 탭을 왼쪽으로 플리킹(밀기)하면 삭제버튼이 나타납니다. 이후 삭제 버튼을 터치 하면 등록된 61N 카메라가 해지됩니다.</p>

            <p>&nbsp;</p>
            <!-- // Write contents here -->
        </div>
    </div>
    <div class="footer">
        <div class="other-menu">
        	<ul>
                <li>FAQ</li>
                <li>1:1 Q&amp;A</li>
            	<li class="on">Manual</li>
            	<li>Career</li>
            	<li>About Us</li>
            </ul>
        </div>
        <div class="copy">&copy; 2016 BNS Korea Co., LTD.</div>
    </div>
</div>
</body>
</html>
