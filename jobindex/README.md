# Jobindex-v3-Publish

git https://github.com/Jobindexworld/Jobindex-v3-Publish  

iconfont https://icomoon.io/  

Responsive  
mobile max width 480px  
pad max width 768px  
desktop min width 1201px  

html5, sass, gulp.js bulid, node, npm

devDependencies  
gulp 3.9.1 - npm i gulp@3.9.1  
gulp-sass - npm i gulp-sass  
gulp-sourcemaps - npm i gulp-sourcemaps  
gulp-clean-css - npm i gulp-clean-css  
browser-sync - npm i browser-sync gulp --save-dev

browser support  
desktop  
ie11 ~ edge  
crome  
firefox  
opera  
safari

mobile  
crome  
firefox  
safari  
opera

css guide  
color class  
base  
.bc1(#333) / .bc2(#666) / .bc3(#999)  
.pc1(#418ded) / .pc2(#f34522) / .pc3(#02BC77) / .pc4(#ff6600)

font  
폰트는 desktop 기본 나눔고딕 대체 맑은고딕, mobile은 각 device별 시스템 폰트 이용

.fc-bc1(#333) / .fc-bc2(#666) / .fc-bc3(#999)  
.fc-pc1(#418ded) / .fc-pc2(#f34522) / .fc-pc3(#02BC77) / .fc-pc4(#ff6600)  

sass color mixin guide  
pc1_hover(#3281ed)  
pc2_hover(#e5310c)  
pc3_hover(#018a57)

gold(gold)  
silver(silver)  
bronze(#cd7f32)

workpath  
scss - sass  
scss comm - 공통 scss  
scss page - 페이지별 scss  
utils - mixin scss  
scss root - scss import후 빌드용

assets css - css  
assets js jobindex.js - ui js  
assets js swiper.js - slide library  
assets img - image

index.html  
comm - 공통 파일  
career - 경력직정보  
jobs - 채용정보  
circle - 서클  
profile - 프로필  
recruiter - 리크루터  
component - 화면별 컨텐츠  
template - jobindex 기본 레이아웃 템플릿   
landing - venturepeople 영문 랜딩페이지  

gulpfile.js gulp task

guide.html 완료된 페이지 사이트맵

workguide  
html파일은 work 폴더내에 프로젝트별 구조로 생성  
css는 sass를 이용한다  
scss 폴더내에 comm(공통), page(페이지) 별 scss 생성후 scss루트애서 필요한 부분만 import 사용  
html component는 각 페이지별 중복요소 분리  
scss component는 분리된 html component 요소의 css  
공통은 comm내에 정리 (html, css 동일)  

scss utils mixin은 sass mixin 정의

template
기본 페이지 구조는 template 폴더의 basic 사용  
class 네임은 페이지 구조에 따라 변경후 해당 scss 생성  
scss 생성후 기본 template의 속성 복사 변경된 class로 적용 (기본 작업된 scss 참조)  
layer template 동일

iconfont  
icomoon을 이용한 웹 아이콘 폰트 이용  
icomoon 폰트 정의후 정의된 css를 받아 코드 사용 (assets/css/icomoon)  

js  
assets/js/jobindex.js  
jquery 3.3.1
ui용만 간단 적용 
슬라이드 swiper.js

gulp  
browser sync를 이용한 로컬 서버 이용  
http://localhost:3334/guide.html  

ftp 
test server http://211.241.136.74:8031/  filezilla 업로드후 desktop, mobile 확인 가능