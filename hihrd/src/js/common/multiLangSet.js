// 사용예시 alert(IMAGE["required"][jslang]);
var IMAGE = {
localepath  	: {"ko":"/images",
	       		   "en":"/images/locale/en",
	               "zh":"/images/locale/zh"}
};

// 사용예시 alert(MESSAGE["required"][jslang]);
var MESSAGE = {
system  			 	: {"ko":"시스템 오류.",
				        "en":"System Error!",
				        "zh":"시스템 오류(중국어)"},

required 			 	: {"ko":"반드시 입력하셔야 하는 사항입니다.",
				        "en":"This item is required to input.",
				        "zh":"반드시 입력하셔야 하는 사항입니다.(중국어)"},

selectItem 		 	: {"ko":"항목을 선택하세요.",
					    "en":"Please select an item.",
					    "zh":"请选择项目。"},

delete1			 	: {"ko":"삭제",
						"en":"Delete ",
						"zh":"删除"},

delete_stc1		 	: {"ko":"삭제 하시겠습니까?",
						"en":"Do you want to delete it?",
						"zh":"要删除吗？"},

delete_stc2		 	: {"ko":"삭제 되었습니다.",
						"en":"Deleted.",
						"zh":"已删除。"},

delete_stc3			: {"ko":"삭제에 실패하였습니다.",
						"en":"Failed to delete.",
						"zh":"无法删除。"},

sunday 			 	: {"ko":"일",
						"en":"Sun",
						"zh":"日"},

monday			 	: {"ko":"월",
						"en":"Mon",
						"zh":"一"},

tuesday 			 	: {"ko":"화",
						"en":"Tue",
						"zh":"二"},

wednesday 		 	: {"ko":"수",
						"en":"Wed",
						"zh":"三"},

thursday 			 	: {"ko":"목",
						"en":"Thu",
						"zh":"四"},

friday				 	: {"ko":"금",
						"en":"Fri",
						"zh":"五"},

saturday 			 	: {"ko":"토",
						"en":"Sat",
						"zh":"六"},

dateSelect		 	: {"ko":"날짜선택",
						"en":"Choose the date",
						"zh":"请选择日期"},

year		 		 	: {"ko":"년",
						"en":"Year",
						"zh":"年"},

month		 		 	: {"ko":"월",
						"en":"Month",
						"zh":"月"},

date		 		 	: {"ko":"날짜",
						"en":"Date",
						"zh":"日期"},

wrongJuminBunho	: {"ko":"잘못된 주민등록번호입니다.",
						"en":"This is an invalid resident registration number.",
						"zh":"身份证号码有误。"},

wrongEmail		 	: {"ko":"이메일 주소가 정확하지 않습니다.",
						"en":"Email address is not accurate.",
						"zh":"电子邮件地址是不准确的。"},

wrongEmail2		 	: {"ko":"잘못된 이메일 주소를 입력 하셨습니다.",
						"en":"You enter invalid email address.",
						"zh":"电子邮件地址输入有误。"},

wrongDomain	 	: {"ko":"도메인 이름이 잘못 기제 되었습니다.",
						"en":"Basis of the domain name is invalid.",
						"zh":"基准的域名是无效的。"},

noEmailAddress	 	: {"ko":"이메일 주소가 아닙니다.",
						"en":"E-mail address is not",
						"zh":"E-mail地址是不。"},

wrongIPAddress	 	: {"ko":"IP주소가 틀립니다.",
						"en":"IP address is incorrect.",
						"zh":"IP地址是不正确的。"},

domainInexistent 	: {"ko":"도메인이 존재 하지 않습니다.",
						"en":"Domain does not exist.",
						"zh":"域名不存在。"},

emailFormat		  	: {"ko":"이메일 형식에 맞지 않습니다.",
						"en":"Email format is not correct.",
						"zh":"电子邮件格式不正确。"},

emailHostname	  	: {"ko":"이메일의 Hostname이 틀립니다.",
						"en":"Hostname of the email message is invalid.",
						"zh":"电子邮件的Hostname有误。"},

toSelect	 		  	: {"ko":"{0}을(를) 선택하십시오.",
						"en":"{0}(s) to select.",
						"zh":"{0}进行选择。"},

toInput	 		  	: {"ko":"{0}을(를) 입력하십시오.",
						"en":"{0} (s), enter.",
						"zh":"{0}请输入："},

toInput2	 		  	: {"ko":"{0}은(는) {1}자리를 입력해야 합니다.",
						"en":"{0} is {1} digits must be entered.",
						"zh":"{0}{1}数字都必须输入。"},

wrongFormat	  	: {"ko":"{0}형식이 올바르지 않습니다.",
						"en":"{0} The format is not valid.",
						"zh":"{0}形式不正确。"},

neomeulsu	  	 	: {"ko":"{0}은(는) {1}자리를 넘을수 없습니다. 현재 글자수({2})",
						"en":"{0} is {1} is not neomeulsu place. The current number of characters: ({2})",
						"zh":"{0}{1}不neomeulsu的地方。目前的字符数：({2})"},

lengthCheck	  		: {"ko":"{0}길이가 {1}을(를) 넘습니다.",
						"en":"{1} {0} length (s) is over.",
						"zh":"{1}{0}长度（s）是结束了。"},

valueCheck  			: {"ko":"{0}값은 최소값({1}) 이상입니다.",
						"en":"The minimum value of {0} ({1}) or more.",
						"zh":"{0}（{1}）或以上的最小值。"},

valueCheck1 			: {"ko":"{0}값이 최대값({1})을 초과합니다.",
						"en":"The maximum value of {0} ({1}) is exceeded.",
						"zh":"超过最大值{0}（{1}）。"},

valueCheck2 			: {"ko":"{0}값이 최대값({1})을 초과합니다.\n초과 길이 : {2}",
						"en":"The maximum value of {0} ({1}) is exceeded. \ N excess length: {2}",
						"zh":"超过的最大值{0}（{1}）\ n多余的长度：{2}"},

valueCheck3 			: {"ko":"{0}값이 최소값({1}) 미만입니다.\n부족 길이 :{2}",
						"en":"The minimum value of {0} ({1}) is less than. \ N insufficient length: {2}",
						"zh":"的最小值{0}（{1}）小于\ n长度不足：{2}"},

valueCheck4 			: {"ko":"{0}값이 최소값({1}) 미만입니다.",
						"en":"The minimum value of {0} ({1}) is less than. \ N insufficient length: {2}",
						"zh":"{2}的最小值{0}（{1}）小于\ n长度不足："},

passwordCheck		: {"ko":"비밀번호는 숫자만으로 구성하실수는 없습니다.",
						"en":"A password cannot be composed of numbers only.",
						"zh":"密码不能只用数字。"},

passwordCheck1	: {"ko":"비밀번호는 문자만으로 구성하실수는 없습니다.",
						"en":"A password cannot be composed of characters only.",
						"zh":"密码不能只用文字。"},

passwordCheck2	: {"ko":"비밀번호가 ID와 4자 이상 중복되거나, 연속된 글자나 순차적인 숫자를 4개이상 사용해서는 안됩니다.",
						"en":"You cannot use a password with more than four characters overlapping with your ID or more than four consecutive characters or digits.",
						"zh":"密码和ID不能重复4字以上，不能使用4字以上的连续性文字或顺序性数字。"},

passwordCheck3	: {"ko":"비밀번호에 연속된 글이나 순차적인 숫자를 4개이상 사용해서는 안됩니다.",
						"en":"Four straight characters or numbers should not be used for a password.",
						"zh":"密码不能使用4个以上连续性的文字或数字。"},

passwordCheck4	: {"ko":"비밀번호에 반복된 문자/숫자를 4개이상 사용해서는 안됩니다.",
						"en":"More than four repeated characters or numbers should not be used for a password.",
						"zh":"密码上不能使用4个以上反复文字或数字。"},

onlyNumber			: {"ko":"숫자만 입력 가능합니다.",
						"en":"You can enter numbers only.",
						"zh":"只能输入数字。"},

onlyHangul			: {"ko":"한글만 입력 가능합니다.",
						"en":"You can key in Korean only.",
						"zh":"只能输入韩文。"},
						
notOnlyHangul		: {"ko":"한글은 입력이 불가능합니다.",
						"en":"",
						"zh":""},

onlyEnglish			: {"ko":"영문자만 입력이 가능합니다.",
						"en":"You can enter alphabets only.",
						"zh":"只能输入英文。"},

noAuthority			: {"ko":"{0}권한이 없습니다.",
						"en":"{0}You have no authority.",
						"zh":"{0}没有权限。"},

popupCheck			: {"ko":"현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.",
						"en":"Pop-up windows of the current site are blocked. Please unblock the pop-up windows.",
						"zh":"当前网站弹窗被阻止，请解除阻止。"},

numberInput			: {"ko":"숫자를 입력해 주세요.",
						"en":"Please enter a number.",
						"zh":"请输入一个数字。"},

pwdEight				: {"ko":"비밀번호는 8자 이상의 영문 대/소문자, 숫자를 혼합해서 사용하실 수 있습니다.",
						"en":"You can combine 8 alphanumeric characters (upper-case & lower-case) for the password.",
						"zh":"密码可以混用8字以上的英文大小文字及数字。"},
						
pwdEightLen				: {"ko":"비밀번호는 8자 이상의 영문, 숫자, 특수기호를 혼합해서 사용하실 수 있습니다.",
							"en":"비밀번호는 8자 이상의 영문, 숫자, 특수기호를 혼합해서 사용하실 수 있습니다.",
							"zh":"비밀번호는 8자 이상의 영문, 숫자, 특수기호를 혼합해서 사용하실 수 있습니다."},

pwdNumberEng		: {"ko":"비밀번호는 숫자와 영문자를 혼용하여야 합니다.",
						"en":"A combination of alphanumeric characters should be used for a password.",
						"zh":"密码应以文字和数字混合组成。"},
					
pwdNumberSpEng		: {"ko":"비밀번호는 숫자와 영문자, 특수문자를 혼용하여야 합니다.",
						"en":"비밀번호는 숫자와 영문자, 특수문자를 혼용하여야 합니다.",
						"zh":"비밀번호는 숫자와 영문자, 특수문자를 혼용하여야 합니다."},

pwdEqualFour		: {"ko":"비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.",
						"en":"A character cannot be repeated more than four times for a password.",
						"zh":"密码上不能反复使用4次以上相同文字。"},

idAddPwdNO		: {"ko":"아이디가 포함된 비밀번호는 사용하실 수 없습니다.",
						"en":"ID containing the password can not be used.",
						"zh":"不能使用含有密码的ID。"},

pwdContainSpaces	: {"ko":"비밀번호는 공백을 사용할 수 없습니다.",
						"en":"The password can not contain spaces.",
						"zh":"密码不能包含空格。"},

threeConsecutive	: {"ko":"연속된 문자열을 3자 이상 사용 할 수 없습니다.",
						"en":"You cannot use three consecutive characters.",
						"zh":"连续性的文字列不能使用3字以上。"},

parentNode			: {"ko":"생성할 노드의 부모노드를 선택하셔야 합니다.",
						"en":"You have to select a parent node for the newly generated node.",
						"zh":"请选择要生成的NODE的母NODE."},

rootNodeDelete		: {"ko":"루트 노드는 삭제할 수 없습니다.",
						"en":"You cannot delete a root node.",
						"zh":"途径NODE不能删除。"},

deleteNodeSelect	: {"ko":"삭제할 노드를 선택하셔야 합니다.",
						"en":"You have to select a node to delete.",
						"zh":"请选择要删除的NODE。"},

sameFileName		: {"ko":"같은 파일 이름이 존재하므로 등록 작업을 취소합니다.",
						"en":"As there is already a same file name, the registration is cancelled.",
						"zh":"存在同名文件，取消登记作业。"},

uploadFileCount		: {"ko":"업로드 파일 갯수는 {0}개까지 가능합니다.",
						"en":"The number of files uploaded to the {0} is available.",
						"zh":"文件上传到{0}。"},

includeExt			: {"ko":"확장자가 {0}인 파일만 등록 가능합니다.",
						"en":"{0} is the file extension, but can be registered.",
						"zh":"{0}是文件扩展名，但是也可以注册。"},

registeFileNO			: {"ko":"등록된 파일이 없습니다.",
						"en":"There is no registered file.",
						"zh":"没有登记的文件。"},

searchInput			: {"ko":"검색어를 입력 해주세요.",
						"en":"Please enter a search term.",
						"zh":"请输入一个搜索词。"},

classReviewInput	: {"ko":"수강후기를등록해주세요",
						"en":"Please register the class review.",
						"zh":"请登记授课后记。"},

classReviewInput2	: {"ko":"수강후기를 입력해주세요.",
						"en":"Please input the class review.",
						"zh":"请登记授课后记。"},

classReviewInput1	: {"ko":"후기 내용이 없습니다. 내용을 입력하고 등록해주세요",
						"en":"You have already registered the class review. A class review can be registered only once.",
						"zh":"没有后记内容。请输入内容后再登记。"},

uploadReview		: {"ko":"후기를 올리시겠습니까?",
						"en":"Would you like to upload the review?",
						"zh":"要上传后记吗？"},

classReviewRegist	: {"ko":"수강후기가 등록되었습니다.",
						"en":"The class review has been registered.",
						"zh":"授课后记已被登记。"},

alreadyRegistRev	: {"ko":"이미 수강후기를 등록하셨습니다. 수강후기는 한번만 등록 가능합니다.",
						"en":"You have already registered the class review. A class review can be registered only once.",
						"zh":"已经登记授课后记。授课后记只能登记一次。"},

noReview				: {"ko":"등록된 후기가 없습니다.",
						"en":"There is no review registered.",
						"zh":"没有登记的后记。"},

classReview			: {"ko":"수강후기",
						"en":"Class review",
						"zh":"授课后记"},

wantScrap			: {"ko":"스크랩 하시겠습니까?",
						"en":"Do you want to scrap?",
						"zh":"要剪贴吗？"},

wantScrap1			: {"ko":"\"스크랩\"하시겠습니까?",
						"en":"Would you like to execute scrapbooking?",
						"zh":"要‘剪贴’吗？"},

scrapSuccess			: {"ko":"\"스크랩\" 되었습니다.",
						"en":"It is scrapped.",
						"zh":"剪贴完成。"},

isSaved				: {"ko":"저장되었습니다.",
						"en":"It is saved.",
						"zh":"保存成功。"},

alreadyScrap			: {"ko":"이미 스크랩 하신 콘텐츠 입니다.",
						"en":"This content has been already scrap-booked.",
						"zh":"是已经剪贴的内容。"},

alreadyScrapCour	: {"ko":"이미 \"스크랩\" 하신 과정입니다.",
						"en":"Already scrapped course.",
						"zh":"已经剪贴的课程。"},

scrapFail				: {"ko":"스크랩에 실패하였습니다.",
						"en":"It failed to scrap.",
						"zh":"剪贴失败。"},

scrapFail1				: {"ko":"\"스크랩\"에 실패하였습니다.",
						"en":"It failed to scrap.",
						"zh":"剪贴失败。"},

good					: {"ko":"좋아요",
						"en":"Good",
						"zh":"好"},

wantLike				: {"ko":"좋아요를 하시겠습니까?",
						"en":"Do you want to click ‘I like it’?",
						"zh":"您要选择 GOOD吗？"},

wantLike1				: {"ko":"\"좋아요\" 하시겠습니까?",
						"en":"Would you like to mark on 'Good'?",
						"zh":"要选择‘好’吗？"},

iLike					: {"ko":"\"좋아요\" 되었습니다.",
						"en":"You clicked ‘I like it’.",
						"zh":"成为 GOOD"},

iLike1					: {"ko":"좋아요 하셨습니다.",
						"en":"You clicked ‘I like it’.",
						"zh":"您选择了 GOOD。"},

alreadyLikeContents 	: {"ko":"이미 \"좋아요\" 하신 콘텐츠 입니다.",
						"en":"You already elect ‘I like it’ for the contents.",
						"zh":"已经选择‘是’的内容。"},

alreadyLikeCourse	 : {"ko":"이미 \"좋아요\" 하신 과정 입니다.",
						"en":"You already elect ‘I like it’ for this course.",
						"zh":"已经选择‘是’的课程。"},

alreadyLike1			: {"ko":"이미 좋아요를 하셨습니다.",
						"en":"You already elect ‘I like it’.",
						"zh":"您已经选择了‘是’。"},

likeFail					: {"ko":"\"좋아요\"에 실패하였습니다.",
						"en":"It failed to mark on \"Good!\"",
						"zh":"已经选择‘是’的内容。"},

sharedContents		: {"ko":"공유글 내용이 없습니다.",
						"en":"Any shared writing cannot be found.",
						"zh":"没有共有内容。"},

peopleSquare		: {"ko":"피플스퀘어로 공유 하시겠습니까?",
						"en":"Do you want to share it at People Square?",
						"zh":"用peopleSquare共享吗？"},

peopleSquare1		: {"ko":"피플스퀘어로 공유되었습니다.",
						"en":"It has been shared with People Square.",
						"zh":"共享为学员广角。"},

peopleSquare2		: {"ko":"피플스퀘어로 공유에 실패 하였습니다.",
						"en":"It failed to share with the People Square.",
						"zh":"学员广角共享失败。"},

classSetting			: {"ko":"Class 설정이 안되었습니다.",
						"en":"No class has been set up.",
						"zh":"没有设定CLASS。"},

timeInputError		: {"ko":"시간 입력 오류입니다!",
						"en":"It is a time entry error!",
						"zh":"时间输入有误。"},

yearInputError		: {"ko":"년도(YYYY) 입력 오류입니다.",
						"en":"It is a year (YYYY) entry error.",
						"zh":"年度（YYYY）输入有误。"},

monthInputError	: {"ko":"월(MM) 입력 오류입니다.",
						"en":"It is a month (MM) entry error.",
						"zh":"月份（MM）输入有误。"},

dayInputError		: {"ko":"일(DD) 입력 오류입니다.",
						"en":"It is a day (DD) entry error.",
						"zh":"日期（DD）输入有误。"},

yearMonthError		: {"ko":"년월(YYYYMM) 입력 오류입니다.",
						"en":"It is a year/month (YYYYMM) entry error.",
						"zh":"年月（YYYYMM）输入有误。"},

dayMonthError		: {"ko":"일월(DDMM) 입력 오류입니다.",
						"en":"It is a day/month (DDMM) entry error.",
						"zh":"日月（DDMM)输入有误。"},

dayInputError1		: {"ko":"존재하지 않는 날짜(MM) 입니다.",
							"en":"Does not exist Date (MM) is",
							"zh":"不存在日期（MM）"},

dayInputError2		: {"ko":"존재하지 않는 날짜(DD) 입니다.",
						"en":"This date (DD) cannot be found.",
						"zh":"该日期（DD）不存在。"},

dateTypingError		: {"ko":"일자(DD) 입력 오류입니다.",
						"en":"It is a day (DD) entry error.",
						"zh":"日期（DD）输入有误。"},

dateTypingError1	: {"ko":"일자(YYYYMMDD) 입력 오류입니다.",
						"en":"It is a date (YYYYMMDD) entry error.",
						"zh":"日期（YYYYMMDD）输入有误。"},

correctMonth		: {"ko":"정확한 월을 입력하여 주십시오.",
						"en":"Please type in a correct month.",
						"zh":"请输入正确的月份。"},

correctDay			: {"ko":"정확한 일을 입력하여 주십시오.",
						"en":"Please type in a correct day.",
						"zh":"请输入正确的日期。"},

allDateSelect			: {"ko":"날짜를 모두 선택해주세요.",
						"en":"Please select every date.",
						"zh":"请选择所有日期。"},

startDayEndDay		: {"ko":"시작일이 종료일보다 큽니다.",
						"en":"Start date is larger than finish date.",
						"zh":"开始日期大于结束日期。"},

youLeaveBlank		: {"ko":"앞으로 띄우지 않겠습니까?",
						"en":"Will you leave a blank in front of it?",
						"zh":"要不要向前弹出？"},

inclub					: {"ko":"인클럽",
						"en":"InClub",
						"zh":"InClub"},

inclubSelect			: {"ko":"인클럽을 선택해주세요.",
						"en":"Please choose the People Club.",
						"zh":"请选择INCLUB。"},

contentNotFound	: {"ko":"글내용 없음",
						"en":"No contents",
						"zh":"没有文章内容。"},

characterLimit		: {"ko":"글자수 제한을 초과하였습니다.",
						"en":"You exceed your character limit.",
						"zh":"超出字数限制。"},

postUp				: {"ko":"글을 올리시겠습니까?",
						"en":"Would you like to post?",
						"zh":"你要留言吗？"},

onlyMemberWrite	: {"ko":"회원만 작성 가능합니다.",
						"en":"Only a member can write.",
						"zh":"会员专用"},

onlyMemberEnter	: {"ko":"회원만 입장 가능합니다.",
						"en":"Only members can enter.",
						"zh":"是会员专用项目。"},

typeComment		: {"ko":"댓글을 입력하세요.",
						"en":"Please type in the review.",
						"zh":"请输入回帖。"},

postComment		: {"ko":"댓글을 등록하시겠습니까?",
						"en":"Do you want to post a comment?",
						"zh":"要登记回帖吗？"},

contentCannot		: {"ko":"내용이 없습니다.",
						"en":"Any content cannot be found.",
						"zh":"无内容。"},

commentDelete		: {"ko":"댓글을 삭제하시겠습니까?",
						"en":"Do you want to delete the comment?",
						"zh":"要删除回帖吗？"},

postDelete			: {"ko":"글을 삭제하시겠습니까?",
						"en":"Do you want to delete the post?",
						"zh":"要删除文章吗？"},

error					: {"ko":"에러입니다.",
						"en":"Error.",
						"zh":"错误。"},

followGO				: {"ko":"팔로우 하시겠습니까?",
						"en":"Do you want to follow?",
						"zh":"要follow吗？"},

followSuccess		: {"ko":"팔로우 하였습니다.",
						"en":"It is followed.",
						"zh":"已经follow。"},

alreadyFollow		: {"ko":"이미 팔로우 상태입니다.",
						"en":"You are already followed.",
						"zh":"已经是Follow状态。"},

writeModify			: {"ko":"글쓰기 및 수정",
						"en":"Write & Modify",
						"zh":"编写及修改"},

writeArticleModify	: {"ko":"글쓰기 및 글수정",
						"en":"Writing and modifying articles",
						"zh":"写作和修改文章"},

comment				: {"ko":"댓글",
						"en":"Comment",
						"zh":"回帖"},

commentRegist		: {"ko":"댓글등록",
						"en":"Post a comment",
						"zh":"回帖登记"},

commentManage	: {"ko":"댓글 관리",
						"en":"Comment management",
						"zh":"回帖管理"},

commentMoreView	: {"ko":"댓글 더보기",
						"en":"More comments",
						"zh":"更多回帖"},

wantCourse			: {"ko":"수강신청을 하시겠습니까?",
						"en":"Do you want to enroll?",
						"zh":"要申请授课吗？"},

alreadyCourse		: {"ko":"이미 수강중인 과정입니다.",
						"en":"Already enrolled course.",
						"zh":"正在授课中的课程。"},

grade					: {"ko":"평점",
						"en":"Grade",
						"zh":"评分"},

thumbNail			: {"ko":"썸네일",
						"en":"Thumbnail",
						"zh":"小图标"},

attachedFile			: {"ko":"첨부파일",
						"en":"Attached file",
						"zh":"附件"},

selectCategory		: {"ko":"카테고리를 선택해 주세요.",
						"en":"Please choose the category.",
						"zh":"请选择分类。"},

intheTitle				: {"ko":"제목을 입력해주세요.",
						"en":"Please type in the title.",
						"zh":"请输入题目。"},

intheContents		: {"ko":"내용을 입력해주세요.",
						"en":"Please type in the contents.",
						"zh":"请输入内容。"},

intheContents1		: {"ko":"내용을 입력하세요.",
						"en":"Enter contents.",
						"zh":"输入的内容。"},

withdraw				: {"ko":"강퇴 하시겠습니까?",
						"en":"Do you want to ban?",
						"zh":"要强制退出吗？"},

withdraw1			: {"ko":"탈퇴 하시겠습니까?",
						"en":"Do you want to withdraw?",
						"zh":"要退出吗？"},

withdraw2			: {"ko":"탈퇴 되었습니다.",
						"en":"You are withdrawn.",
						"zh":"您已退出。"},

withdraw3			: {"ko":"다른 관리자가 없기 때문에 탈퇴가 불가능 합니다.",
						"en":"As there is no other administrator, you cannot withdraw.",
						"zh":"没有其他管理者，所以不能退出。"},

withdraw4			: {"ko":"탈퇴에 실패하였습니다.",
						"en":"Failed to leave.",
						"zh":"无法离开。"},

join1					: {"ko":"가입 하시겠습니까?",
						"en":"Do you want to join?",
						"zh":"要注册吗？"},

join2					: {"ko":"가입요청 되었습니다.",
						"en":"Your application is received.",
						"zh":"注册申请成功。"},

join3					: {"ko":"가입요청에 실패하였습니다.",
						"en":"Your application for admission is failed.",
						"zh":"注册申请失败。"},

join4					: {"ko":"인클럽 가입을 취소 하시겠습니까?",
						"en":"Do you want to cancel the application for InClub?",
						"zh":"取消INCLUB注册吗？"},

join5					: {"ko":"가입 취소 되었습니다.",
						"en":"Your admission is cancelled.",
						"zh":"已被加入取消。"},

join6					: {"ko":"인클럽 가입을 승인 하시겠습니까?",
						"en":"Do you approve the application for InClub?",
						"zh":"同意INCLUB注册吗？"},

join7					: {"ko":"가입 승인 되셨습니다.",
						"en":"You are approved to join.",
						"zh":"已被加入认可。"},

targetSelect			: {"ko":"대상을 선택하세요.",
						"en":"Please select a target.",
						"zh":"请选择对象。"},

emailNotFound		: {"ko":"E-mail이 존재하지 않는 회원을 선택하셨습니다.",
						"en":"You have selected the member whose e-mail cannot be found.",
						"zh":"您选择了没有E-mail的会员。"},

failed					: {"ko":"실패 하였습니다.",
						"en":"Failed.",
						"zh":"失败。"},

save					: {"ko":"저장 되었습니다.",
						"en":"Has been saved.",
						"zh":"已保存。"},

construction			: {"ko":"준비중입니다.",
						"en":"Under construction.",
						"zh":"正在准备。"},

authorityFail			: {"ko":"권한 추가에 실패하였습니다.",
						"en":"Failed to add authority.",
						"zh":"权限增加失败。"},

cannotDelete			: {"ko":"다른 관리자가 없기 때문에 삭제가 불가능 합니다.",
						"en":"As there is no other administrator, you cannot delete.",
						"zh":"没有其他管理者，所以不能删除。"},

admin					: {"ko":"관리자",
						"en":"Administrator",
						"zh":"管理者"},

adminAuthority1		: {"ko":"관리자 권한을 부여 하시겠습니까?",
						"en":"Would you like to grant an administrator authority?",
						"zh":"要赋予管理者权限吗？"},

adminAuthority2		: {"ko":"관리자 권한을 철회 하시겠습니까?",
						"en":"Would you like to revoke the administrator authority?",
						"zh":"要撤销管理者权限吗？"},

adminAuthority3		: {"ko":"관리자 권한을 삭제하시겠습니까?",
						"en":"Do you want to delete administrator privileges?",
						"zh":"要删除管理者权限吗？"},

CloseInclub			: {"ko":"인클럽을 폐쇄하시겠습니까?",
						"en":"Do you want to close InClub?",
						"zh":"要关闭INCLUB吗？"},

CloseInclub1			: {"ko":"회원이 존재할 경우 인클럽폐쇄가 불가합니다.",
						"en":"If there is any member, the People Club cannot be closed.",
						"zh":"如果有会员就不能关闭INCLUB。"},

inclubTag				: {"ko":"인클럽 태그를 입력하세요.",
						"en":"Please type in the tag of the People Club.",
						"zh":"请输入INCLUB TAG。"},

inclubTag1			: {"ko":"인클럽 태그는 200byte 를 넘을 수 없습니다.",
						"en":"The tag of the People Club cannot exceed 200byte.",
						"zh":"INCLUB TAG不能超出200byte。"},

inclubProfile			: {"ko":"인클럽 프로필을 입력하세요.",
						"en":"Please type in the profile of the People Club.",
						"zh":"请输入INCLUB简历。"},

inclubProfile1		: {"ko":"인클럽 프로필은 400byte 를 넘을 수 없습니다.",
						"en":"The profile of the People Club cannot exceed 400byte.",
						"zh":"INCLUN简历不能超出400byte。"},

inclubImage			: {"ko":"인클럽 이미지를 선택하세요.",
						"en":"Select an InClub image.",
						"zh":"请选择INCLUB图像。"},

onlyImage			: {"ko":"이미지만 선택 가능합니다.",
						"en":"Only images can be selected.",
						"zh":"只能选择图像。"},

inclubName			: {"ko":"인클럽 이름을 입력하세요.",
						"en":"Please type in the name of the People Club.",
						"zh":"请输入inclub名称。"},

inclubName1			: {"ko":"인클럽 이름은 70byte 를 넘을 수 없습니다.",
						"en":"The name of the People Club cannot exceed 70byte.",
						"zh":"INCLUB名称不能超出70byte。"},

follow1				: {"ko":"성공적으로 follow 하였습니다.",
						"en":"Have been successfully follow.",
						"zh":"已经成功地遵循。"},

follow2				: {"ko":"follow를 실패 하였습니다.",
						"en":"failed to follow.",
						"zh":"未能遵循。"},

unfollow1				: {"ko":"성공적으로 Unfollow 하였습니다.",
						"en":"Have been successfully Unfollow.",
						"zh":"已成功取消关注。"},

unfollow2				: {"ko":"Unfollow를 실패 하였습니다.",
						"en":"Unfollow a failure.",
						"zh":"取消关注失败。"},

searchNameInput	: {"ko":"검색할 이름을 입력하세요.",
						"en":"Please type in the name to be searched.",
						"zh":"请输入要搜索的姓名。"},

contentNotFound1	: {"ko":"등록된 내용이 없습니다.",
						"en":"Any content registered cannot be found.",
						"zh":"没有登记内容。"},

dateCheck			: {"ko":"년월일은 필수 입력항목입니다.",
						"en":"Year/Month/Day (YYYYMMDD) is a mandatory entry item.",
						"zh":"年月日为必填项目。"},

dateCheck1			: {"ko":"년월일이 모두 입력되거나 모두 생략되어야 합니다.",
						"en":"Date of all of the input, or both should be omitted.",
						"zh":"所有输入的日期，或两者应当被删去。"},

correctDate			: {"ko":"\n일자를 바르게 입력하세요.",
						"en":"\nEnter the correct date.",
						"zh":"\n输入正确的日期。"},

registNumber1		: {"ko":"올바른 주민등록번호를 입력해주세요.",
						"en":"Please enter a valid resident registration number.",
						"zh":"Q请输入正确的身份证号码。"},

registNumber2		: {"ko":"잘못된 주민등록번호입니다. \n\n다시 확인하시고 입력해 주세요.",
						"en":"This is an invalid resident registration number. \n\nPlease confirm it and enter again.",
						"zh":"身份证号码有误，\n\n请确认正确与否。"},

normalRegNum		: {"ko":"정상적인 등록번호가 아닙니다.",
						"en":"This is not a normal registration number.",
						"zh":"不是正常的登录号码。"},

cancel					: {"ko":"취소",
						"en":"Cancel",
						"zh":"取消"},

selection				: {"ko":"선택",
						"en":"Selection",
						"zh":"选择"},

engHangulInput		: {"ko":"영문은 ({0})자, 한글은 {1}자 까지 입력할 수 있습니다.",
						"en":"English is ({0}) characters, Hangul is {1} characters can be entered.",
						"zh":"英语是({0}){1}个字符，可以输入字符，韩文。"},

messageMax			: {"ko":"메세지는 최대 {0}byte까지 입력 가능합니다.",
						"en":"Up to a maximum of {0} byte message can be entered.",
						"zh":"{0}字节，消息可输入到最大。"},

titleContentInput	: {"ko":"제목 + 내용을 입력하세요.",
						"en":"Please type in the title + contents.",
						"zh":"请输入题目+内容。"},

wantRegister			: {"ko":"등록 하시겠습니까?",
						"en":"Do you want to register?",
						"zh":"要登录吗？"},

registSuccess			: {"ko":"등록에 성공하였습니다.",
						"en":"It has been successfully registered.",
						"zh":"登记成功。"},

registFail				: {"ko":"등록에 실패하였습니다.",
						"en":"It failed to register the data.",
						"zh":"登记失败。"},

recommenContent	: {"ko":"추천 글 내용이 없습니다.",
						"en":"There is no recommendation.",
						"zh":"没有推荐文章内容。"},

registOK				: {"ko":"등록되었습니다.",
						"en":"Registered.",
						"zh":"登记成功。"},

registration			: {"ko":"등록",
						"en":"Registration.",
						"zh":"登记"},

hits					: {"ko":"조회수",
						"en":"Number of hits",
						"zh":"查询次数"},

memberIdChk		: {"ko":"회원님의 아이디는 \"<strong class=\"color_red\">{0}</strong>\" 입니다.",
						"en":"Your ID \"<strong class=\"color_red\">{0}</strong>\" is.",
						"zh":"您的ID \“<strong class=\"color_red\">{0}</strong>\”。"},

matchMemberChk	: {"ko":"입력하신 정보와 일치하는 회원이 존재하지 않습니다.",
						"en":"There is no member matching the information you entered.",
						"zh":"没有找到与您输入的信息一致的会员。"},

memberJoinEmail	: {"ko":"회원님께서 가입하실때 입력하신 eMail (<strong class=\"color_red\">{0}</strong>) 로 임시 비밀번호가 발송되었습니다.",
						"en":"When you sign up you entered your eMail (<strong class=\"color_red\"> {0} </strong>) temporary password has been sent to.",
						"zh":"当您注册您进入您的电子邮件（<strong class=\"color_red\">{0}</strong>）临时密码已发送到。"},

memberJoinPhone	: {"ko":"회원님께서 가입하실때 입력하신 휴대폰 (<strong class=\"color_red\">{0}</strong>) 로 임시 비밀번호가 발송되었습니다.",
						"en":"When you sign up you entered your mobile phone (<strong class=\"color_red\"> {0} </strong>) temporary password has been sent to.",
						"zh":"当您注册您输入您的手机（<strong class=\"color_red\">的{0}</strong>）临时密码已发送到。"},

evaluation			: {"ko":"평가",
						"en":"Evaluation",
						"zh":"评价"},

recommendation		: {"ko":"추천",
						"en":"Recommendation",
						"zh":"推荐"},

noFeed				: {"ko":"피드가 없습니다.",
						"en":"No feed can be found.",
						"zh":"没有反馈。"},

accessPrivileges	: {"ko":"접근 권한이 없습니다.",
						"en":"You have no access privileges.",
						"zh":"您无权使用。"},

admission			: {"ko":"가입",
						"en":"Admission",
						"zh":"加入"},

admissionCancel		: {"ko":"가입취소",
						"en":"Cancellation of admission",
						"zh":"取消加入"},

waitingApproval		: {"ko":"승인대기",
						"en":"Waiting for Approval",
						"zh":"承认等待"},

enter					: {"ko":"입장",
						"en":"Enter",
						"zh":"入场"},

member				: {"ko":"회원",
						"en":"Member",
						"zh":"会员"},

memberPhoto		: {"ko":"회원 사진",
						"en":"Member photo",
						"zh":"会员照片"},

failed1					: {"ko":"{0}에 실패하였습니다.",
						"en":"{0} failed.",
						"zh":"{0}失败。"},

isOK					: {"ko":"{0}되었습니다.",
						"en":"{0} Has been completed.",
						"zh":"为{0}"},

adminNotPossible	: {"ko":"다른 관리자가 없기 때문에 {0}가 불가능 합니다.",
						"en":"{0} because there is no other administrator is not possible.",
						"zh":"{0}，因为没有其他的管理员是不可能的。"},

withdrawal			: {"ko":"탈퇴",
						"en":"Withdrawal",
						"zh":"退出"},

joinApplication		: {"ko":"가입신청되었습니다.\n그룹관리자의 승인 후 정상가입처리 됩니다.",
						"en":"application for admission was \ n normal subscription will be processed after the approval of the administrator.",
						"zh":"奇卡\ n正常订阅的管理员批准后，将被处理。"},

establisher			: {"ko":"개설자",
						"en":"Establisher ",
						"zh":"开设人员"},

openDate				: {"ko":"개설일",
						"en":"Open date",
						"zh":"开设日期"},

operations			: {"ko":"운영",
						"en":"Operations",
						"zh":"运营"},

group					: {"ko":"그룹",
						"en":"Group",
						"zh":"集团"},

moreYear				: {"ko":"{0}년 이상",
						"en":"More than {0}years",
						"zh":"{0}年以上"},

noContents			: {"ko":"검색된 내용이 없습니다.",
						"en":"There is no content to retrieve.",
						"zh":"该内容不存在。"},

modifyCancel			: {"ko":"수정취소",
						"en":"Cancel Modification",
						"zh":"修改取消"},

moreView				: {"ko":"더보기",
						"en":"View more",
						"zh":"更多"},

total					: {"ko":"전체",
						"en":"Total",
						"zh":"全部"},

dayOpen				: {"ko":"{0}-{1}-{2} 일 개설",
						"en":"{0}-{1}-{2} days open",
						"zh":"{0}-{1}-{2}天开"},

cancelled				: {"ko":"취소 되었습니다.",
						"en":"It is cancelled.",
						"zh":"已被取消。"},

adminJoinCancel	: {"ko":"다른 관리자가 없기 때문에 가입취소가 불가능 합니다.",
						"en":"As there is no other administrator, you cannot cancel the admission.",
						"zh":"没有其他管理者，所以不能取消注册。"},

joinCancelFail		: {"ko":"가입 취소에 실패하였습니다.",
						"en":"It failed to cancel the subscription.",
						"zh":"加入取消失败。"},

inquiry				: {"ko":"문의",
						"en":"Inquiry",
						"zh":"咨询"},

replyComplete		: {"ko":"답변완료",
						"en":"Complete reply",
						"zh":"答复完毕"},

replyWaiting			: {"ko":"답변대기",
						"en":"Waiting for a reply",
						"zh":"答复等待"},

businessNumber10	: {"ko":"사업자등록번호를 10자리 숫자로 입력하세요.",
						"en":"Please type in a 10-digit business registration number.",
						"zh":"请输入十位营业执照编码。"},

correctMonth1		: {"ko":"<br>월을 바르게 입력하세요.",
						"en":"<br>Please type in a correct month.",
						"zh":"<br>请正确输入月份。"},

togetherInclub		: {"ko":"함께 하는 인클럽",
						"en":"People Club with Sharing",
						"zh":"共享INCLUB"},

evaluationComp			: {"ko":"평가가 완료되었습니다.",
						"en":"Evaluation has been completed.",
						"zh":"评价已经完成。"},

evaluationComp1			: {"ko":"이미 평가하셨습니다.\n평가는 1회만 제공됩니다.",
						"en":"You have already rated. \n ratings are provided only once.",
						"zh":"您已经评价 \n 评级只提供一次。"},

evaluationComp2			: {"ko":"수강후기는 1회만 등록 가능합니다.",
						"en":"Courses in a one-time registration is possible.",
						"zh":"一次性登记的课程是可能的。"},

reviewDelete			: {"ko":"후기를 삭제 하시겠습니까?",
						"en":"Are you sure you want to delete reviews?",
						"zh":"你确定要删除评论？"},

reviewDelete1			: {"ko":"수강후기가 삭제 되었습니다.",
						"en":"Review Course has been deleted.",
						"zh":"复习课程已被删除。"},

reviewDelete2			: {"ko":"이미 수강후기를 삭제 하셨습니다.",
						"en":"Posted deleting reviews already taken.",
						"zh":"表的评论已经采取。"},

cancelReview			: {"ko":"수강후기",
						"en":"Class review",
						"zh":"授课后记"},

alreadyRecommend		: {"ko":"이미 추천하신 과정 입니다.",
						"en":"Already recommended.",
						"zh":"已经推荐了。"},

commentFail				: {"ko":"추천에 실패하였습니다.",
						"en":"Recommendation fail",
						"zh":"推荐失败"},

juminBunho13	        : {"ko":"주민등록번호는 13자리 숫자만 입력가능합니다.",
	                    "en":"주민등록번호는 13자리 숫자만 입력가능합니다.",
	                    "zh":"주민등록번호는 13자리 숫자만 입력가능합니다."},
	                           
juminBunhoReChk	        : {"ko":"주민등록번호를 다시 확인해주세요.",
	                    "en":"주민등록번호를 다시 확인해주세요.",
	                    "zh":"주민등록번호를 다시 확인해주세요."},

juminBunhoReChk2        : {"ko":"외국인등록번호를 다시 확인해주세요.",
	                    "en":"외국인등록번호를 다시 확인해주세요.",
	                    "zh":"외국인등록번호를 다시 확인해주세요."},

	                    
btyelsu	  	 		: {"ko":"{0}은(는) {1}byte를 넘을 수 없습니다. 현재 byte({2})",
						"en":"{0} is {1} is not btyelsu place. The current byte of characters: ({2})",
						"zh":"{0}{1}不btyelsu的地方。目前的字符数：({2})"}
};