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
        <div class="dir"><p><a href="main.php">61N 매뉴얼</a> <span> &gt; </span> <a href="app_1.php">앱 살펴보기</a> <span> &gt; </span> <strong>사진보기</strong></p></div>
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
                <li class="on"><a href="app_1.php">앱 살펴보기</a>
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
                      <li class="on"><a href="app_4.php">사진보기</a>
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
                <li><a href="">61N 메뉴 - 설정하기</a>
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
                      <li><a href="setting_4.php">카메라 설정하기</a>
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
            <h2>사진보기</h2>
            <h3>장소별로 보기</h3><!-- Sub title -->
            <p>61N으로 찍은 사진은 기본적으로 사진이 찍힌 위치를 기반으로 타임라인에 등록됩니다. 같은 장소에서 찍은 사진들은 하나의 묶음으로 타임라인에 표시됩니다.</p>
			<h3>일별로 모아보기</h3><!-- Sub title -->
            <p>장소별로 보기화면을 왼쪽으로 플리킹하면 해당일자에 찍은 사진들을 일별로 정렬합니다. 해당일자에 61N으로 찍은 모든 사진과 동영상을 일별로 분류된 묶음으로 표시합니다.</p>
            <h3>월별로 모아보기</h3><!-- Sub title -->
            <p>일별로 보기화면을 왼쪽으로 플리킹하면 해당 월에 찍은 사진들을 월별로 정렬합니다. 해당월에 61N으로 찍은 모든 사진과 동영상을 월별로 분류된 묶음으로 표시합니다.</p>
            <h3>격자로 모아보기</h3><!-- Sub title -->
            <p>타임라인에 표시된 묶음의 미리보기 화면을 터치하면 각 묶음에 포함된 사진들을 격자형 미리보기 화면으로 표시합니다. 격자형보기 화면에서는 자신이 원하는 사진을 중복 선택하여 일괄 다운로드를 할 수 있고, 자신이 원치 않는 사진을 중복 선택하여 일괄 삭제할 수 있습니다.</p>
            <h3>상세보기</h3><!-- Sub title -->
            <p>격자형보기 화면의 미리보기를 터치하면 해당사진을 전체화면으로 사진을 볼 수 있는 상세보기 화면이 나타납니다. 상세보기 화면을 좌/우로 플리킹하여 다음/이전 사진을 감상하실 수 있습니다. 상세보기화면에서는 감정태그, 해시태그, 공유, 다운로드, 사진삭제 기능을 이용하실 수 있습니다.</p>
            <h3>감정태그달기</h3><!-- Sub title -->
            <p>화면하단 기능바의 첫번째에 있는 감정태그달기 아이콘을 터치하면 해당 사진에 자신의 기분을 표시할 수 있습니다. 기분을 대표하는 표정을 터치하면 해당 아이콘이 사진에 등록됩니다. 등록된 아이콘을 다시한번 터치하면 등록이 해제됩니다. 감정아이콘은 중복해서 등록할 수 없습니다.</p>
            <h3>해시태그달기</h3><!-- Sub title -->
            <p>화면하단 기능바의 두 번째에 있는 해시태그달기 아이콘을 터치하면 해당 사진에 해시태그를 등록할 수 있습니다. 해시태그달기 아이콘을 터치하면 상세보기 화면 상단에 해시태그를 입력할 수 있는 입력바가 나타납니다. 입력바를 터치하면 자판이 등장하며, 원하는 해시태그를 입력하여 등록할 수 있습니다. 등록된 해시태그는 상세보기 화면 상단에 표시되며 중복으로 등록할 수 있습니다. 등록된 해시태그를 삭제하려면 해시태그달기 아이콘을 터치하여, 등록된 해시태그 오른쪽에 표시된 각각의 'x' 버튼을 터치하면 해당 해시태그가 삭제됩니다.</p>
            <h3>공유하기</h3><!-- Sub title -->
            <p>화면하단 기능바의 세 번째에 있는 공유하기 아이콘을 터치하면 해당 사진을 공유할 수 있습니다. 공유를 할 수 있는 경로는 3가지입니다.</p>

            <h4>1. 타임라인에 공유하기</h4>
            <p>‘WITH’를 등록한 사용자에게만 제공되는 기능입니다. 현재의 사진을 'WITH'로 등록된 상대방의 타임라인에 등록시킬 수 있습니다. ‘WITH' 상대방의 타임라인에 공유한 자신의 사진을 해제하기 위해서는 ’타임라인에 공유하기‘ 버튼을 다시 한번 터치하여 공유를 해제할 수 있습니다.</p>
            
            <h4>2. F/F Album에 공유하기</h4>
            <p>자신의 가족/친구(Family/Friend)들의 F/F Album에 해당 사진을 공유할 수 있습니다. (등록된 F/F 멤버가 없다면 자신의 F/F Album에만 표시됩니다.) F/F Album에 공유한 자신의 사진을 해제하기 위해서는 ‘F/F Album에 공유하기’ 버튼을 다시 한번 터치하여 공유를 해제할 수 있습니다.</p>
            
            <h4>3. 소셜미디어에 공유하기</h4>
            <p>자신의 스마트폰에 설치된 소셜미디어(페이스북, 트위터, 카카오톡등)에 해당 사진을 공유할 수 있습니다.</p>
            
            <h3>다운로드하기</h3><!-- Sub title -->
            <p>화면하단 기능바의 네 번째에 있는 다운로드하기 아이콘을 터치하면 해당 사진을 자신의 스마트폰에 다운로드 할 수 있습니다. 다운로드된 사진은 자신의 사진앱에 저장됩니다.</p>
            <h3>삭제하기</h3><!-- Sub title -->
            <p>화면하단 기능바의 다섯 번째에 있는 삭제하기 아이콘을 터치하면 해당 사진을 삭제 할 수 있습니다.</p>

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
