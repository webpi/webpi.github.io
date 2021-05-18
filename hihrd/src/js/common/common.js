/**
 * ajax이용중 error발생시 처리
 */
jQuery(function(){
	if(jQuery(location).attr('pathname').toUpperCase().indexOf("CAPTCHAPOPUP") == -1 && 
	   jQuery(location).attr('pathname').toUpperCase().indexOf("PCCV3POPRESULT") == -1 && 
	   jQuery(location).attr('pathname').toUpperCase().indexOf("USERCERTICHECKPOPUP") == -1 && 
	   jQuery(location).attr('pathname').toUpperCase().indexOf("SELECTPVPENDINGLISTFORM") == -1){
		jQuery.ajaxSetup({
			beforeSend : function(xmlHttpRequest){ 
				xmlHttpRequest.setRequestHeader("AJAX", "true");  
			}, 
			error:function(xhr, e){
				closeWorkProgress();
				responseText = trim(xhr.responseText);
				resultStr = responseText.split("#MOVEURL#");
		  
				if(resultStr[1] != undefined){
					location.href = resultStr[1];
				}
			},
			statusCode : {
				901: function() {
					var url = "/common/logout.do?p_request_type=DUPLICATION";
					
					if(top.opener){
						top.opener.top.location.href = url;
						top.window.close();
					}else if(window != top){
						top.location.href = url;
					}else{
						document.location = url;
					}
		        },
				902: function() {
					alert("로그인이 필요한 서비스입니다.");
					
					var url = "/common/logout.do";
					
					if(top.opener){
						top.opener.top.location.href = url;
						top.window.close();
					}else if(window != top){
						top.location.href = url;
					}else{
						document.location = url;
					}
		        }
		    }
		});
	}else{
		//산업인력공단 연동 설정
		jQuery.ajaxSetup({ cache: false });
		jQuery.support.cors = true;
	}
});

/**
	 * 문자열을 파라메터로 받아서 UTF-8형식으로 변화하여 리턴시켜준다
	 * @since 10.01.27
	 * @param str
	 * @return 변환된 UTF-8형식 데이터
	 */
	function toUTF8(str){
	    var s0, i, s, u;
	    s0 = "";                // encoded str
	    for (i = 0; i < str.length; i++){   // scan the source
	        s = str.charAt(i);
	        u = str.charCodeAt(i);          // get unicode of the char
	        if (s == " "){s0 += "+";}       // SP should be converted to "+"
	        else {
	            if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){       // check for escape
	                s0 = s0 + s;            // don't escape
	            }
	            else {                  // escape
	                if ((u >= 0x0) && (u <= 0x7f)){     // single byte format
	                    s = "0"+u.toString(16);
	                    s0 += "%"+ s.substr(s.length-2);
	                }
	                else if (u > 0x1fffff){     // quaternary byte format (extended)
	                    s0 += "%" + (0xf0 + ((u & 0x1c0000) >> 18)).toString(16);
	                    s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
	                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
	                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
	                }
	                else if (u > 0x7ff){        // triple byte format
	                    s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
	                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
	                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
	                }
	                else {                      // double byte format
	                    s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
	                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
	                }
	            }
	        }
	    }
	    return s0;
	}

    /**
     * 문자열의 byte length를 얻는다.
     *
     * @param   str 문자열
     * @return  byte length
     * @author  marie
     */
    function jsByteLength(str) {
        if (str == "") {
            return  0;
        }

        var bytes = 0;

        for (var i = 0; i < str.length; i++) {
        	code=str.charCodeAt(i);            
			if (code < 128) {
				bytes += 1;
			}else if (code < 2048){
				bytes += 2;
			}else if (code < 65536){
				bytes += 3;
			}else{
				bytes += 4;
			}
        }

        return  bytes;
    }

    /**
     * Object에 값을 세팅한다.
     *
     * @param   obj
     * @param   value
     */
    function jsSetValue(obj, value) {
        if (obj) {
            if (obj.type == "text") {
                obj.value = value;
            } else if (obj.tagName == "SELECT") {
                for (var i = 0; i < obj.length; i++) {
                    if (obj.options[i].value == value) {
                        obj.options[i].selected = true;
                        break;
                    }
                }
            }
        }
    }

    /**
     * 주민등록번호를 체크한다.
     *
     * @param   obj 주민등록번호 필드
     * @return  true - 올바른 번호
     *          false - 틀린 번호
     */
    function jsCheckJumin1(obj) {
        var str = deleteHyphen(obj.value);  // 필드에 있는 주민번호에서 '-'제거

        if( !jsCheckJumin(str) ) {
        	//다국어원본 : 잘못된 주민등록번호입니다.
            alert(MESSAGE["wrongJuminBunho"][jslang]) //다국어phs
            obj.value="";
            //obj.focus();
            if (window.event) {
                window.event.returnValue = false;
            }
            return  false;
        }

        obj.value = str;
        return  true;
    }

    /**
     * 주민등록번호를 체크한다.
     *
     * @param   str 주민등록번호
     * @return  true - 올바른 번호
     *          false - 틀린 번호
     */
    function jsCheckJumin(str) {
        var tmp = 0;
        var sex = str.substring(6, 7);
        var birthday;

        if (str.length != 13) {
            return  false;
        }

        if (sex == 1 || sex == 2 || sex == 5 || sex == 6) {
            birthday = "19" + str.substring(0, 6);
        } else if (sex == 3  || sex == 4 || sex == 7 || sex == 8) {
            birthday = "20" + str.substring(0, 6);
        } else {
            return  false;
        }

        if (!isDate(birthday)) {
            return  false;
        }

        for (var i = 0; i < 12 ; i++) {
            tmp = tmp + ((i%8+2) * parseInt(str.substring(i,i+1)));
        }

        tmp = 11 - (tmp %11);
        tmp = tmp % 10;

        if (tmp != str.substring(12, 13)) {
            return  false;
        }

        return  true;
    }
    
    /**
     * 주민등록번호를 체크한다.
     *
     * @param   obj 주민등록번호 필드
     * @return  true - 올바른 번호
     *          	  false - 틀린 번호
     */
    function jsCheckJumin2(obj) {
    	var str = deleteHyphen(obj.value);  // 필드에 있는 주민번호에서 '-'제거
    	
    	if( !jsCheckJuminNo2(str) ) {
    		//다국어원본 : 잘못된 주민등록번호입니다.
    		alert(MESSAGE["wrongJuminBunho"][jslang]); //다국어phs
    		obj.value="";
    		//obj.focus();
    		if (window.event) {
    			window.event.returnValue = false;
    		}
    		return  false;
    	}
    	
    	obj.value = str;
    	return  true;
    }

    /**
     * 주민번호 체크(내.외국인)
     * @param ssn
     * @returns   true - 올바른 번호
     *          		false - 틀린 번호
     */
    function jsCheckJuminNo2(ssn) {
		 var sum = 0; 
		 var month = ssn.substr(2,2);
		 var day = ssn.substr(4,2);
		 
		 if(ssn.length != 13) {
		 	return false;
		 }
		 
		 //월의 경우 13월을 넘지 않아야 한다.
		 if(month < 13 && month != 0 && day != 0) {
		 	//2월의 경우
		 	if(month == 2) {
		   		//29일을 넘지 않아야 한다.
		   		if(day > 29) return false;
		   		
		  	} else if(month == 4 || month == 6 || month == 9 || month == 11){
		  		// 4,6,9,11월의 경우 30일을 넘지 않아야 한다.   
			   	if(day > 30) return false;
		  	} else {
			  	// 그외 월이 31일을 넘지 않아야 한다.
		   		if(day > 31) return false;
		  	}
		 	
		 }else {
		  	return false;
		 }
		 
		 for(var i = 0; i < 12; i++) {
		 	sum += Number(ssn.substr(i, 1)) * ((i % 8) + 2);
		 }
		 
		 if(ssn.substr(6,1) == 1 || ssn.substr(6,1) == 2 || ssn.substr(6,1) == 3 || ssn.substr(6,1) == 4 || ssn.substr(6,1) == 9 || ssn.substr(6,1) == 0) {
			 //내국인 주민번호 검증(1900(남/여) 2000(남/여))
		 	if(((11 - (sum % 11)) % 10) == Number(ssn.substr(12,1))) {
		   		return true;
		  	}
		  	return false;
		 }else if(ssn.substr(6,1) == 5 || ssn.substr(6,1) == 6 || ssn.substr(6,1) == 7 || ssn.substr(6,1) == 8) {
			//외국인 주민번호 검증(1900(남/여) 2000(남/여))
		  	if(Number(ssn.substr(8,1)) % 2 != 0) {
		   		return false;
		  	}		  
		  	if((((11 - (sum % 11)) % 10 + 2) % 10) == Number(ssn.substr(12, 1))) {
			   return true;
			}
		  	return false;
		 }  
		 
	  return true;
	} 

    /**
     * 주민번호를 체크한다.
     *
     * @param       주민번호(앞자리뒷자리 합친)
     * @param       주민번호 앞자리
     * @param       주민번호 뒷자리
     * @param       다음으로 이동할 포커스
     * @author      강병곤
     * @since       2003-12-04
     */
    function checkJuminNo(juminNo, juminNo1, juminNo2, nextFocus)
    {
        var form    = document.form1;
        var flag    = true;

        var juminNoElm  = eval(form.elements[juminNo]);
        var juminNo1Elm     = eval(form.elements[juminNo1]);
        var juminNo2Elm     = eval(form.elements[juminNo2]);
        var nextFocusElm    = eval(form.elements[nextFocus]);
        //alert("juminNo ::"+ juminNoElm.value +"/ juminNo1 ::"+ juminNo1Elm.value +"/ juminNo2 ::"+ juminNo2Elm.value +"/ nextFocus ::"+ nextFocusElm.value);

        if(juminNo2Elm.value == "" || juminNo2Elm.value.length < 7)
        {
            jsRange(7, 7);
            juminNo2Elm.focus();
            return;
        }

        if(!jsCheckJumin(juminNo1Elm.value + juminNo2Elm.value))
        {
        	//다국어원본 : 잘못된 주민등록번호입니다.
    		alert(MESSAGE["wrongJuminBunho"][jslang]); //다국어phs
            juminNo1Elm.value = "";
            juminNo2Elm.value = "";
            juminNo1Elm.focus();
        }
        else
        {
            juminNoElm.value    = juminNo1Elm.value + juminNo2Elm.value;
            nextFocusElm.focus();
        }
    }

    // 사업자등록번호 검사
    function checkBizNo(bizno)
    {
  	   bizno = deleteHyphenStr(bizno);
       var pattern = /(^[0-9]{10}$)/;
       if (!pattern.test(bizno))
       {
    	   //다국어원본 : 사업자등록번호를 10자리 숫자로 입력하세요.
       		message = MESSAGE["businessNumber10"][jslang]; //다국어phs
			return false;
       }
       else
       {
            var sum = 0;
            var at = 0;
            var att = 0;
            var saupjano= bizno;
            sum = (saupjano.charAt(0)*1)+
                  (saupjano.charAt(1)*3)+
                  (saupjano.charAt(2)*7)+
                  (saupjano.charAt(3)*1)+
                  (saupjano.charAt(4)*3)+
                  (saupjano.charAt(5)*7)+
                  (saupjano.charAt(6)*1)+
                  (saupjano.charAt(7)*3)+
                  (saupjano.charAt(8)*5);
            sum += parseInt((saupjano.charAt(8)*5)/10);
            at = sum % 10;
            if (at != 0)
                att = 10 - at;

            if (saupjano.charAt(9) != att)
            {
               return false;

            }

        }
        return true;
    }

    /**
     * 주민등록번호 유효성 검사
     * 2014-07-18 :주민번호 뒷자리 1,2,3,4 대응 가능
     * @param v_juminNumber : 검사대상 주민등록번호
     */
    function jsCheckJuminNumber(v_juminNumber,type){
    	var flag = true;    	    	
    	var checkType; //내,외국인 구분
    	var regExp = /^[0-9]{13}$/;
    	
    	if (!regExp.test(v_juminNumber)) { //길이체크
    	   alert(MESSAGE["juminBunho13"][jslang]);
    	   flag = false;
    	} else {
    		checkType = v_juminNumber.substring(6,7);
    		if(type == "02"){ //외국인 인경우
    			if(checkType == '5' || checkType == '6' || checkType == '7' || checkType == '8') {
    				var sum = 0;
        		    var odd = 0;
        		    
        		    buf = new Array(13);
        		    for (var i = 0; i < 13; i++) buf[i] = parseInt(v_juminNumber.charAt(i));

        		    odd = buf[7]*10 + buf[8];
        		    
        		    if (odd%2 != 0) {
        		    	flag =  false;
        		    }

        		    if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) {
        		    	flag =  false;
        		    }
        		        
        		    multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
        		    for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

        		    sum=11-(sum%11);
        		    
        		    if (sum>=10) sum-=10;

        		    sum += 2;

        		    if (sum>=10) sum-=10;

        		    if ( sum != buf[12]) {
        		    	flag =  false;
        		    }
    			}else{
    				flag = false;
    			}

    		} else { //내국인
    			var sum = 0;
    	    	var array = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]; // 주민등록번호 유효성 검사 값
    	    	var perNumber;
    	    	var checkNum;
    			
    			for (var i=0;i<12;i++) { //1~12 번째자리까지만 체크, 마지막 자리는 버림
    				sum += v_juminNumber.charAt(i) * array[i];
    			}
    			
    			perNumber =  sum % 11;
    			checkNum = 11 - perNumber;
    			
    			if (checkNum > 9) {
    				checkNum = checkNum -10;
    			}
    			
    			if (checkNum != v_juminNumber.charAt(12)) {
    				flag = false;
    			}
    		}
    		if(!flag){
    			if(type == "02"){
        			alert(MESSAGE["juminBunhoReChk2"][jslang]);//외국인등록번호를 다시 확인해주세요.
        		}else{
        			alert(MESSAGE["juminBunhoReChk"][jslang]);//주민등록번호를 다시 확인해주세요.
        		}
    		}
    		
    	}
    	
    	return flag;
    }
    
    /**
     * 사용자(USR ID, 사용자명) 검색 팝업창을 띄운다.
     *
     * @param   column 컬럼명
     *          USR_IDNO USR ID
     *          USR_NAME 사용자명
     * @param   keyWord 검색어
     * @param   fn 펑션명
     * @use     function setSmusr(usrId, usrName) { }
     */
    function jsSmusr(column, keyWord, fn) {
        var url = "/SystemServlet?cmd=LssmusrPopup&column=" + column + "&keyWord=" + keyWord + "&fn=" + fn;
        var name = "";
        var features = "width=600,height=550,scrollbars=yes,top=100,left=100";
        var popupWin = window.open(url, name, features);
        centerSubWindow(popupWin, 600, 550);
        popupWin.focus();
    }



    /**
     * 팝업창을 띄운다.
     *
     * @param   theURL
     *          theName
     *          features
     */
    function openWindow(theURL,theName,features) { //v2.0
      window.open(theURL,theName,features);
    }



    /**
     * 오직 숫자로만 이루어져 있는지 체크 한다.
     *
     * @param   num
     * @return  boolean
     */
    function isNumber(num) {
        var reg = RegExp(/^(\d|-)?(\d|,)*\.?\d*$/);

        if (reg.test(num)) {
            return  true;
        }

        return  false;
    }

    /**
     * 정수 체크
     *
     * 1. +, - 부호를 생략하거나 넣을 수 있다 : ^[\+-]?
     * 2. 0에서 9까지 숫자가 0번 이상 올 수 있다 : [0-9]*
     * 3. 마지막은 숫자로 끝나야 한다 : [0-9]$
     *
     * @param   num
     * @return  boolean
     */
    function isInteger(num) {
        re = /^[\+-]?[0-9]*[0-9]$/;

        if (re.test(num)) {
            return  true;
        }

        return  false;
    }

    /**
     * 유리수 체크
     *
     * 1. +, - 부호를 생략하거나 넣을 수 있다 : ^[\+-]?
     * 2. 0에서 9까지 숫자가 0번 이상 올 수 있다 : [0-9]*
     * 3. 소수점을 넣을 수 있다 : [.]?
     * 4. 소수점 이하 자리에 0에서 9까지 숫자가 올 수 있다 : [0-9]*
     * 5. 마지막은 숫자로 끝나야 한다 : [0-9]$
     *
     * @param   num
     * @return  boolean
     */
    function isFloat(num) {
        re = /^[\+-]?[0-9]*[.]?[0-9]*[0-9]$/;

        if (re.test(num)) {
            return  true;
        }

        return  false;
    }
    
    /**
     * 유리수 체크2
     *
     * 1. 0에서 9까지 숫자가 0번 이상 올 수 있다 : [0-9]*
     * 2. 소수점을 넣을 수 있다 : [.]?
     * 3. 소수점 이하 자리에 0에서 9까지 숫자가 올 수 있다 : [0-9]*
     * 4. 마지막은 숫자로 끝나야 한다 : [0-9]$
     *
     * @param   num
     * @return  boolean
     */
    function isFloat2(num) {
        re = /^[0-9]*[.]?[0-9]*[0-9]$/;

        if (re.test(num)) {
            return  true;
        }

        return  false;
    }

    /**
     * 이메일 체크
     *
     * @param   email
     * @return  boolean
     */
    function isEmail(email) {
        re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (re.test(email)) {
        	if(isEmailChceck(email)){
        		return true;
            }
        }

        return  false;
    }
    
    /**
     * 이메일 주소 체크 - 정밀하게
     */
    function isEmailChceck(emailStr) {
        var checkTLD=1;
        var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum|kr|co.kr|com|net|org|pro|so|biz|asia|cn|jp|me|in|eu|info|xxx|sx|or.kr|pe.kr|ne.kr|re.kr|cc|tv|name|mobi|tw|pw|co|ac|ru|co.in|net.in|com.cn|net.cn|co.jp|or.jp|co.id|id|)$/;
        var emailPat=/^(.+)@(.+)$/;
        var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
        var validChars="\[^\\s" + specialChars + "\]";
        var quotedUser="(\"[^\"]*\")";
        var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
        var atom=validChars + '+';
        var word="(" + atom + "|" + quotedUser + ")";
        var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
        var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
        var matchArray=emailStr.match(emailPat);
		var blank_filter = /[\s]/g;
	    
        if (matchArray==null) {
            return false;
        }

        var user=matchArray[1];
        var domain=matchArray[2];
        
        for (i=0; i<user.length; i++) {
            if (user.charCodeAt(i)>127) {
                return false;
            }
        }
        for (i=0; i<domain.length; i++) {
            if (domain.charCodeAt(i)>127) {
                return false;
            }
        }
        
        if (user.match(userPat)==null) {
            return false;
        }

        var IPArray=(domain).match(ipDomainPat);
        
        if (IPArray!=null) {
            for (var i=1;i<=4;i++) {
                if (IPArray[i]>255) {
                    return false;
                }
            }
            return true;
        }
        
        var atomPat=new RegExp("^" + atom + "$");
        var domArr=domain.split(".");
        var len=domArr.length;
        
        for (i=0;i<len;i++) {
            if (domArr[i].search(atomPat) == -1) {
                return false;
            }
        }

        if ((domArr[domArr.length-1]).toLowerCase().search(knownDomsPat) == -1) {
            return false;
        }
        
        if (len < 2) {
        	return false;
        }

        return true;
    }
    
    /**
     * 이메일 주소 체크 - 정밀하게
     */
    function emailCheck(emailStr) {
        var checkTLD=1;
        var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum|kr|co.kr|com|net|org|pro|so|biz|asia|cn|jp|me|in|eu|info|xxx|sx|or.kr|pe.kr|ne.kr|re.kr|cc|tv|name|mobi|tw|pw|co|ac|ru|co.in|net.in|com.cn|net.cn|co.jp|or.jp|co.id|id|)$/;
        var emailPat=/^(.+)@(.+)$/;
        var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
        var validChars="\[^\\s" + specialChars + "\]";
        var quotedUser="(\"[^\"]*\")";
        var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
        var atom=validChars + '+';
        var word="(" + atom + "|" + quotedUser + ")";
        var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
        var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
        var matchArray=emailStr.match(emailPat);
        
        //var sp_filter =  /[~!`\#$,?%<>{|/}^&*\()\=+_\']/gi;
		var blank_filter = /[\s]/g;

	    //var chk_sp  =  sp_filter.test(emailStr);
        
	    //if(chk_sp ){
	  	  	  //alert("이메일 주소에 특수문자를 사용하실 수 없습니다.");
			  //return false;
		//}
	    
        if (matchArray==null) {
        	//다국어원본 : 이메일 주소가 정확하지 않습니다.
            alert(MESSAGE["wrongEmail"][jslang]); // (체크 @ and .'s), 다국어phs
            return false;
        }
        var user=matchArray[1];
        var domain=matchArray[2];
        for (i=0; i<user.length; i++) {
            if (user.charCodeAt(i)>127) {
            	//다국어원본 : 잘못된 이메일 주소를 입력 하셨습니다.
                alert(MESSAGE["wrongEmail2"][jslang]);
                return false;
            }
        }
        for (i=0; i<domain.length; i++) {
            if (domain.charCodeAt(i)>127) {
            	//다국어원본 : 도메인 이름이 잘못 기제 되었습니다.
                alert(MESSAGE["wrongDomain"][jslang]);
                return false;
            }
        }
        if (user.match(userPat)==null) {
        	//다국어원본 : 이메일 주소가 아닙니다.
            alert(MESSAGE["noEmailAddress"][jslang]);
            return false;
        }
        var IPArray=domain.match(ipDomainPat);
        if (IPArray!=null) {
            for (var i=1;i<=4;i++) {
                if (IPArray[i]>255) {
                	//다국어원본 : IP주소가 틀립니다!
                    alert(MESSAGE["wrongIPAddress"][jslang]);
                    return false;
                }
            }
            return true;
        }
        var atomPat=new RegExp("^" + atom + "$");
        var domArr=domain.split(".");
        var len=domArr.length;
        for (i=0;i<len;i++) {
            if (domArr[i].search(atomPat)==-1) {
            	//다국어원본 : 도메인이 존재 하지 않습니다.
                alert(MESSAGE["domainInexistent"][jslang]);
                return false;
            }
        }
//        if (checkTLD && domArr[domArr.length-1].length!=2 &&
//            domArr[domArr.length-1].search(knownDomsPat)==-1) {
        if (domArr[domArr.length-1].search(knownDomsPat)==-1) {
        	//다국어원본 : 이메일 형식에 맞지 않습니다.
            alert(MESSAGE["emailFormat"][jslang]);
            return false;
        }
        if (len<2) {
        	//다국어원본 : 이메일의 Hostname이 틀립니다.
        alert(MESSAGE["emailHostname"][jslang]);
        return false;
        }

        return true;
    }

    /**
     * 날짜 체크
     *
     * @param   date
     * @return  boolean
     */
    function isDate(date) {
        if (date == null || date.length != 8) {
            return  false;
        }

        if (!isNumber(date)) {
            return  false;
        }

        var year = eval(date.substring(0, 4));
        var month = eval(date.substring(4, 6));
        var day = eval(date.substring(6, 8));

		if(year == "0000") {
			return false;
		}

        if (month > 12 || month == "00") {
            return  false;
        }

        var totalDays;

        switch (eval(month)){

            case 1 :
                totalDays = 31;
                break;
            case 2 :
                if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
                    totalDays = 29;
                else
                    totalDays = 28;
                break;
            case 3 :
                totalDays = 31;
                break;
            case 4 :
                totalDays = 30;
                break;
            case 5 :
                totalDays = 31;
                break;
            case 6 :
                totalDays = 30;
                break;
            case 7 :
                totalDays = 31;
                break;
            case 8 :
                totalDays = 31;
                break;
            case 9 :
                totalDays = 30;
                break;
            case 10 :
                totalDays = 31;
                break;
            case 11 :
                totalDays = 30;
                break;
            case 12 :
                totalDays = 31;
                break;
        }

        if (day > totalDays) {
            return  false;
        }

        if (day == "00") {
            return  false;
        }

        return  true;
    }

    /**
     * 두 날짜간의 일 차이를 반환한다.
     * Date형으로 반환한다.
     * @param  time1, time2 -->String 형태로 입력
     */
    function getDayInterval(time1,time2)
    {
    	var date1 = toTimeObject(time1);
    	var date2 = toTimeObject(time2);
    	var day   = 1000 * 3600 * 24; //24시간

    	return parseInt((date2 - date1) / day, 10);
    }

    /**
     * 스트링 날짜를 받아서(예, 20090301, 2009030110, 200903011230)
     * Date형으로 반환한다.
     * @param  time
     */
	function toTimeObject(time)
	{
		var year  = time.substr(0,4);
		var month = time.substr(4,2) - 1; // 1월=0,12월=11
		var day   = time.substr(6,2);
		var hour  = time.substr(8,2);
		var min   = time.substr(10,2);

		return new Date(year,month,day,hour,min);
	}

    /**
     * 데이터 유효성을 체크한다.
     *
     * @param   form
     */
    function validate(form) {
        var obj;
        
        for (i = 0; i < form.elements.length; i++) {

            obj = form.elements[i];
            if(!validateObj(form, obj)){
            	return false;
            }
        } /// end of for()

        return  true;
    }

    /**
     * 숫자에 comma를 붙인다.
     *
     * @param   obj
     */
    function addComma(obj) {
        obj.value = trim(obj.value);
        var value = obj.value;

        if (value == "") {
            return;
        }

        value = deleteCommaStr(value);

        if (!isFloat(value)) {
            dispName = obj.getAttribute("dispName");

            if (dispName == null) {
                dispName = "";
            }
            //다국어원본 : dispName + " 형식이 올바르지 않습니다.
            var manyLanguage=MESSAGE["wrongFormat"][jslang].replace("{0}", dispName);	
            alert(manyLanguage); //다국어 phs
            obj.value = "0";
            obj.focus();
            if (window.event) {
                window.event.returnValue = false;
            }
            return;
        }

        obj.value = addCommaStr(value);
    }

    /**
     * 숫자에 comma를 붙인다.
     */
    function addComma2() {
        var obj = window.event.srcElement;
        addComma(obj);
    }

    /**
     * 숫자에 comma를 붙인다.
     *
     * @param   str
     */
    function addCommaStr(str) {
        var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
        var arrNumber = str.split('.');
        arrNumber[0] += '.';
        do {
            arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
        } while (rxSplit.test(arrNumber[0]));

        if (arrNumber.length > 1) {
            replaceStr = arrNumber.join("");
        } else {
            replaceStr = arrNumber[0].split(".")[0];
        }
        return replaceStr;
    }

    /**
     * 숫자에 comma를 붙인다.(음수 양수 상관없이)
     *
     * @param   obj
     */
    function addComma3(amount) {
    	var total_amount = String(amount);  //받은 숫자를 문자로 변환
	    var amount_len = total_amount.length;
	    var b = 0;
	    var dot_amount = "";
	    var per = (amount_len % 3);

	    if (per <= 0) {
	        per = 3;
	    }

	    for (a = 0; a < amount_len; a++) {
	        dot_amount += total_amount.charAt(a);

	        if (a == (3 * b) + (per - 1)) {
	            if (total_amount.charAt(a) != "-" && a != amount_len - 1)
	                dot_amount += ",";
	            b++;
	        }
	    }

	    return dot_amount;
	}

    /**
     * 숫자에서 comma를 없앤다.
     *
     * @param   obj
     */
    function deleteComma(obj) {
        obj.value = deleteCommaStr(obj.value);
    }

    /**
     * 숫자에서 comma를 없앤다.
     */
    function deleteComma2() {
        var obj = window.event.srcElement;
        deleteComma(obj);
        obj.select();
    }

    /**
     * 숫자에서 comma를 없앤다.
     *
     * @param   str
     */
    function deleteCommaStr(str) {
        var temp = '';

        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == ',') {
                continue;
            } else {
                temp += str.charAt(i);
            }
        }

        return  temp;
    }

     /**
     * 숫자에서 하이폰(-)를 없앤다.
     *
     * @param   str
     */
    function deleteHyphenStr(str) {
        var temp = '';

        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == '-') {
                continue;
            } else {
                temp += str.charAt(i);
            }
        }

        return  temp;
    }

    /**
     * 날짜에 "/"를 붙인다.
     *
     * @param   obj
     */
    function addDateFormat(obj) {
        var value = obj.value;

        if (trim(value) == "") {
            return;
        }

        value = deleteDateFormatStr(value);

        if (!isDate(value)) {
            dispName = obj.getAttribute("dispName");

            if (dispName == null) {
                dispName = "";
            }

          //다국어원본 : dispName + " 형식이 올바르지 않습니다.
            var manyLanguage=MESSAGE["wrongFormat"][jslang].replace("{0}", dispName);	
            alert(manyLanguage); //다국어 phs
            
            obj.focus();

            return;
        }

        obj.value = addDateFormatStr(value);
    }

    /**
     * 날짜(년월)에 "/"를 붙인다.
     *
     * @param   obj
     */
    function addYmFormat(obj) {
        var value = obj.value;

        if (trim(value) == "") {
            return;
        }

        value = deleteDateFormatStr(value);

        if (!isDate(value + "01")) {
            dispName = obj.getAttribute("dispName");

            if (dispName == null) {
                dispName = "";
            }

            //다국어원본 : dispName + " 형식이 올바르지 않습니다.
            var manyLanguage=MESSAGE["wrongFormat"][jslang].replace("{0}", dispName);	
            alert(manyLanguage); //다국어 phs
            obj.focus();

            return;
        }

        obj.value = addYmFormatStr(value);
    }

    /**
     * 날짜에 "/"를 붙인다.
     */
    function addDateFormat2() {
        var obj = window.event.srcElement;
        addDateFormat(obj);
    }

    /**
     * 날짜에 "/"를 붙인다.
     */
    function addYmFormat2() {
        var obj = window.event.srcElement;
        addYmFormat(obj);
    }

    /**
     * 날짜에 "/"를 붙인다.
     *
     * @param   str
     */
    function addDateFormatStr(str) {
    	if (str == null || str == "") {
    		return "";
    	}
        return  str.substring(0, 4) + "/" + str.substring(4, 6) + "/" + str.substring(6, 8);
    }

    /**
     * 날짜에 "/"를 붙이고 시간에 ":"를 붙인다.
     *
     * @param   str
     */
    function addDateTimeFormatStr(str) {
    	if (str == null || str == "") {
    		return "";
    	}
        return  str.substring(0, 4) + "/" + str.substring(4, 6) + "/" + str.substring(6, 8)
        			+" "+ str.substring(8, 10)+ ":" + str.substring(10, 12) +":" + str.substring(12, 14) ;
    }

    /**
     * 시간에 ":"를 붙인다.
     *
     * @param   str
     */
    function addTimeFormatStr(str) {
    	if (str == null || str == "") {
    		return "";
    	}
        return  str.substring(0, 2) + ":" + str.substring(2, 4) ;
    }


    /**
     * 날짜(년월)에 "/"를 붙인다.
     *
     * @param   str
     */
    function addYmFormatStr(str) {
        return  str.substring(0, 4) + "-" + str.substring(4, 6);
    }

    /**
     * 날짜에 "."를 붙인다.
     *
     * @param   str
     */
    function addDateFormatStr2(str) {
    	if (str == null || str == "") {
    		return "";
    	}
        return  str.substring(0, 4) + "." + str.substring(4, 6) + "." + str.substring(6, 8);
    }
    
    /**
     * 날짜에서 "/"를 없앤다.
     *
     * @param   obj
     */
    function deleteDateFormat(obj) {
        obj.value = deleteDateFormatStr(obj.value);
    }

    /**
     * 날짜에서 "/"를 없앤다.
     */
    function deleteDateFormat2() {
        var obj = window.event.srcElement;
        deleteDateFormat(obj);
        obj.select();
    }

    /**
     * 날짜에서 "/"를 없앤다.
     *
     * @param   str
     */
    function deleteDateFormatStr(str) {
        var temp = '';

        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == '-') {
                continue;
            } else {
                temp += str.charAt(i);
            }
        }

        return  temp;
    }

    /**
     * trim
     *
     * @param   text
     * @return  string
     */
    function trim(text) {
        if (text == "") {
            return  text;
        }

        var len = text.length;
        var st = 0;

        while ((st < len) && (text.charAt(st) <= ' ')) {
            st++;
        }

        while ((st < len) && (text.charAt(len - 1) <= ' ')) {
            len--;
        }

        return  ((st > 0) || (len < text.length)) ? text.substring(st, len) : text;
    }

    /**
     * ltrim
     *
     * @param   text
     * @return  string
     */
    function ltrim(text) {
        if (text == "") {
            return  text;
        }

        var len = text.length;
        var st = 0;

        while ((st < len) && (text.charAt(st) <= ' ')) {
            st++;
        }

        return  (st > 0) ? text.substring(st, len) : text;
    }

    /**
     * rtrim
     *
     * @param   text
     * @return  string
     */
    function rtrim(text) {
        if (text == "") {
            return  text;
        }

        var len = text.length;
        var st = 0;

        while ((st < len) && (text.charAt(len - 1) <= ' ')) {
            len--;
        }

        return  (len < text.length) ? text.substring(st, len) : text;
    }

    /**
     * 이벤트 핸들러를 등록한다.
     */
    function setEventHandler() {
        for (i = 0; i < document.forms.length; i++) {

            var elements = document.forms(i).elements;

            for (j = 0; j < elements.length; j++) {
                // INPUT 객체의 onblur 이벤트에 핸들러를 등록한다.
                if (elements(j).tagName == "INPUT") {

                    dataType = elements(j).getAttribute("dataType");

                    if (dataType == "date") {
                        elements(j).onblur = addDateFormat2;
                        elements(j).onfocus = deleteDateFormat2;
                        addDateFormat(elements(j));
                    } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                        if (elements(j).getAttribute("comma") != null) {
                            elements(j).onblur = addComma2;
                            elements(j).onfocus = deleteComma2;
                            addComma(elements(j));
                        }
                    } else if (dataType == "yyyymm") {
                        elements(j).onblur = addYmFormat2;
                        elements(j).onfocus = deleteDateFormat2;
                        addYmFormat(elements(j));
                    }
                }
            }
        }
    }

    /**
     * 자리수의 최소값, 최대값
     *
     * 최소값만 체크 : jsRange(2, -1)
     * 최대값만 체크 : jsRange(-1, 10)
     * 최소값, 최대값 모두 체크 : jsRange(2, 10)
     * 최소값, 최대값 둘다 체크 안함 : jsRange(-1, -1)
     *
     */
    function jsRange(minValue, maxValue)
    {
        jsMinLength(minValue);
        jsMaxLength(maxValue);
    }

    /**
     * 최대값
     */
    function jsMaxLength(maxValue)
    {
        var obj         = window.event.srcElement;
        var dispName    = obj.getAttribute("dispName");
        //var maxValue    = obj.getAttribute("maxValue");
        var val         = jsByteLength(obj.value);

        if( val > (maxValue*2))
        {
        	//다국어원본 : dispName +" 값이 최대값("+ maxValue +")을 초과합니다.\n초과 길이 :"+ (val - (maxValue*2))
        	var manyLanguage = MESSAGE["valueCheck2"][jslang].replace("{0}",dispName).replace("{1}",maxValue).replace("{2}",(val - (maxValue*2)));
            alert(manyLanguage); //다국어phs
            //obj.value = "0";
            obj.focus();
            if(window.event)
            {
                window.event.returnValue = false;
            }
            return;
        }
    }

    /**
     * 최소값
     */
    function jsMinLength(minValue)
    {
        var obj         = window.event.srcElement;
        var dispName    = obj.getAttribute("dispName");
        //var minValue    = obj.getAttribute("minValue");
        var val         = jsByteLength(obj.value);
        if(minValue != -1 && val < minValue)
        {
        	//다국어원본 : dispName +" 값이 최소값(" + minValue + ") 미만입니다.\n부족 길이 :"+ (minValue - val)
        	var manyLanguage = MESSAGE["valueCheck3"][jslang].replace("{0}",dispName).replace("{1}",minValue).replace("{2}",(minValue - val));
            alert(manyLanguage); //다국어 phs
            //obj.value = "0";
            obj.focus();
            if(window.event)
            {
                window.event.returnValue = false;
            }
            return;
        }
    }

    /**
     * 숫자이면 숫자, 숫자가 아니면 0
     */
    function nvlNumber(val)
    {
        if(val == "" || isNaN(val) || val == "undefined")
            return 0;

        return Number(val);
    }

    /**
     * 숫자형식에서 comma를 없애고, 날짜형식에서 "/" 를 없앤다.
     *
     * @param   form
     */
    function makeValue(form) {
        for (i = 0; i < form.elements.length; i++) {
            obj = form.elements(i);

            if (obj.tagName == "INPUT") {
                dataType = obj.getAttribute("dataType");

                if (dataType == "date") {
                    deleteDateFormat(obj);
                } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                    if (obj.getAttribute("comma") != null) {
                        deleteComma(obj);
                    }
                } else if (dataType == "yyyymm") {
                    deleteDateFormat(obj);
                }
                /// notHyphen 이라고 선언했다면 하이픈을 모두 제거한다.
                if(obj.getAttribute("notHyphen") != null) {
                    deleteHyphenObj(obj);
                }
            }
        }
    }

    /**
      * 문자에서 Hyphen을 없앤다.
      *
      * @param  obj
      */
    function deleteHyphenObj(obj) {
        obj.value = deleteHyphen(obj.value);
    }

    /**
     * 데이터 유효성을 체크한다.
     * 하나의 오브젝트에 대한 것임.
     *
     * @param   form
     * @param   obj
     */
    function validateObj(form, obj) {
    	var hmpgTmplcd = "";
    	
    	try{
    		hmpgTmplcd = whole_tmplcd;
		}catch(e){
			
		}
    	
    	var dispName;
        var dataType;
        var minValue;
        var maxValue;
        var isValid;
        var value;
        var message;
        var messageAdd;

        dispName = obj.getAttribute("dispName");
        if(dispName == "" || dispName == null) return true;
        obj.value = trim(obj.value);
        dataType = obj.getAttribute("dataType");
        minValue = obj.getAttribute("minValue");
        maxValue = obj.getAttribute("maxValue");
        len      = obj.getAttribute("len");
        lenCheck = obj.getAttribute("lenCheck");
        byteCheck = obj.getAttribute("byteCheck");
        message  = obj.getAttribute("message"); /// notNull 일때 사용자가 정의한 메세지를 보여주기 위해서
        messageAdd  = obj.getAttribute("messageAdd"); /// notNull 일때 기본메세지 + 사용자정의메세지를 보여준다.
        value = obj.value;

        if (dispName == null) {
            dispName = obj.name;
        }

        // 필수 입력 항목 체크
        if (obj.getAttribute("isNull") == "N") {
            isValid = false;

            if (obj.type == "radio" || obj.type == "checkbox" || obj.type == "select") {
                if (form.elements[obj.name].length) {
                    for (j = 0; j < form.elements[obj.name].length; j++) {
                        if (form.elements[obj.name][j].checked) {
                            isValid = true;
                            break;
                        }
                    }
                } else {
                    if (obj.checked) {
                        isValid = true;
                    }
                }
            } else {
                if (value != "") {
                    isValid = true;
                } else {
                    if (obj.getAttribute("comma") != null) {
                        obj.value = 0;
                        isValid = true;
                    }
                }
            }

            if (!isValid) {
                if(message == "" || message == null) {
                	if (obj.type == "radio" || obj.type == "checkbox" || obj.type == "select") {
                		//다국어원본 : dispName+을(를) 선택하십시오.
                		var manyLanguage=MESSAGE["toSelect"][jslang].replace("{0}", dispName); //다국어phs
                		
                		if(hmpgTmplcd == "9"){
                			jsConfirmHelper.getAlert({
                				content : manyLanguage+ ((messageAdd == "" || messageAdd == null) ? "" : "\n"+ messageAdd)
                			});
                		}else{
                			alert(manyLanguage+ ((messageAdd == "" || messageAdd == null) ? "" : "\n"+ messageAdd));
                		}
                	 } else {
                		 //다국어원본 : dispName+을(를) 입력하십시오.
                		 var manyLanguage1=MESSAGE["toInput"][jslang].replace("{0}", dispName); //다국어phs
                		 
                		 if(hmpgTmplcd == "9"){
                			 jsConfirmHelper.getAlert({
                 				content : manyLanguage1+ ((messageAdd == "" || messageAdd == null) ? "" : "\n"+ messageAdd)
                 			});
                		 }else{
                			 alert(manyLanguage1+ ((messageAdd == "" || messageAdd == null) ? "" : "\n"+ messageAdd));
                		 }
                	 }
                }else{
                	if(hmpgTmplcd == "9"){
           			 	jsConfirmHelper.getAlert({
            				content : message
            			});
	           		}else{
	           			alert(message);
	           		}
                }

                if(obj.type != "hidden" && obj.style.visibility != "hidden" && obj.style.display != "none"){
                	var offset = jQuery(obj).offset();
                	jQuery('html, body').animate({scrollTop : offset.top - 100}, 400);
                }
                	
                if(window.event){
                    window.event.returnValue = false;
                }
                
                return false;
            }
        }

        // 데이터 길이 체크
        if (len != null) {
            if (jsByteLength(value) != eval(len)) {
            	//다국어원본  : dispName + "은(는) " + len + "자리를 입력해야 합니다."
            	var manyLanguage = MESSAGE["toInput2"][jslang].replace("{0}",dispName).replace("{1}",len);
            	
            	if(hmpgTmplcd == "9"){
       			 	jsConfirmHelper.getAlert({
        				content : manyLanguage
        			});
           		}else{
           			alert(manyLanguage);
           		}
            	
            	var offset = jQuery(obj).offset();
            	jQuery('html, body').animate({scrollTop : offset.top - 100}, 400);
                if (window.event) {
                    window.event.returnValue = false;
                }
                return  false;
            }
        }

        if(lenCheck != null)
        {
          if(jsByteLength(value) > eval(lenCheck))
            {
        	  var manyLanguage=MESSAGE["neomeulsu"][jslang].replace("{0}",dispName).replace("{1}",lenCheck).replace("{2}",jsByteLength(value));
        	  //다국어원본 : dispName + "은(는) " + lenCheck + " 자리를 넘을수 없습니다 현재 글자수("+jsByteLength(value)+")
              
        	  if(hmpgTmplcd == "9"){
        		  jsConfirmHelper.getAlert({
        			  content : manyLanguage
        		  });
        	  }else{
        		  alert(manyLanguage);
        	  }

          	  var offset = jQuery(obj).offset();
          	  jQuery('html, body').animate({scrollTop : offset.top - 100}, 400);
              if(window.event)
                {
                   window.event.returnValue = false;
                }

                return false;
            }
        }
        
        if(byteCheck != null)
        {
          if(jsByteLength(value) > eval(byteCheck))
            {
        	  var manyLanguage=MESSAGE["btyelsu"][jslang].replace("{0}",dispName).replace("{1}",byteCheck).replace("{2}",jsByteLength(value));
        	  //다국어원본 : dispName + "은(는) " + btyelsu + " btye를 넘을 수 없습니다 현재 byte("+jsByteLength(value)+")
              
        	  if(hmpgTmplcd == "9"){
        		  jsConfirmHelper.getAlert({
        			  content : manyLanguage
        		  });
        	  }else{
        		  alert(manyLanguage);
        	  }        	  
        	  
          	  var offset = jQuery(obj).offset();
        	  jQuery('html, body').animate({scrollTop : offset.top - 100}, 400);
              if(window.event)
                {
                   window.event.returnValue = false;
                }

                return false;
            }
        }

        if (obj.type == "text") {
            // 데이터 타입 체크
            if (dataType == null) { // 2002.01.30 추가
                if (obj.readOnly == false && obj.maxLength != -1 && jsByteLength(value) > (obj.maxLength*3)) {
                	//다국어원본 : dispName + " 길이가 " + obj.maxLength + " 을(를) 넘습니다."
                	var manyLanguage = MESSAGE["lengthCheck"][jslang].replace("{0}",dispName).replace("{1}",obj.maxLength); 

                	if(hmpgTmplcd == "9"){
                		jsConfirmHelper.getAlert({
                			content : manyLanguage
                		});
                	}else{
                		alert(manyLanguage);
                	}    
   
                    var offset = jQuery(obj).offset();
                	jQuery('html, body').animate({scrollTop : offset.top - 100}, 400);
                    if (window.event) {
                        window.event.returnValue = false;
                    }

                    return  false;
                }
            } else if ((value != "") && (dataType != null)) {
                isValid = true;
                checkValue = false;

                if (dataType == "date") {
                    value = deleteDateFormatStr(value);
                    isValid = isDate(value);
                    checkValue = true;
                } else if (dataType == "email") {
                    isValid = isEmail(value);
                } else if (dataType == "float") {
                    value = deleteCommaStr(value);
                    isValid = isFloat(value);
                    checkValue = true;
                } else if (dataType == "integer") {
                    value = deleteCommaStr(value);
                    isValid = isInteger(value);
                    checkValue = true;
                } else if (dataType == "number") {
                    value = deleteCommaStr(value);
                    isValid = isNumber(value);
                    checkValue = true;
                } else if (dataType == "double") {
                    value = deleteCommaStr(value);
                    isValid = isNumber(value);
                    checkValue = true;
                } else if (dataType == "bizno") {
                    isValid = checkBizNo(value);
                    checkValue = true;
                }

                if (!isValid) {
                	//다국어원본 : dispName + " 형식이 올바르지 않습니다."
                	var manyLanguage=MESSAGE["wrongFormat"][jslang].replace("{0}", dispName);
                    
                	if(hmpgTmplcd == "9"){
                		jsConfirmHelper.getAlert({
                			content : manyLanguage
                		});
                	}else{
                		alert(manyLanguage);
                	}    
                	
                    if (dataType == "float" || dataType == "integer" || dataType == "number" || dataType == "double") {
                        obj.value = "0";
                    }

                	var offset = jQuery(obj).offset();
                	jQuery('html, body').animate({scrollTop : offset.top - 100}, 400);

                    if (window.event) {
                        window.event.returnValue = false;
                    }
                    return  false;
                }

                if (checkValue) {
                    if (minValue != null) {
                        if (eval(minValue) > eval(value)) {
                        	//다국어원본 : dispName + " 값은 최소값(" + minValue + ") 이상입니다."
                        	var manyLanguage=MESSAGE["valueCheck"][jslang].replace("{0}", dispName).replace("{1}",minValue);
                        	
                        	if(hmpgTmplcd == "9"){
                        		jsConfirmHelper.getAlert({
                        			content : manyLanguage
                        		});
                        	}else{
                        		alert(manyLanguage);
                        	}   
                        	
                        	var offset = jQuery(obj).offset();
                        	jQuery('html, body').animate({scrollTop : offset.top - 100}, 400);
                            if (window.event) {
                                window.event.returnValue = false;
                            }
                            return  false;
                        }
                    }

                    if (isValid && (maxValue != null)) {
                        if (eval(maxValue) < eval(value)) {
                        	//다국어원본 : dispName + " 값이 최대값(" + maxValue + ")을 초과합니다."
                        	var manyLanguage=MESSAGE["valueCheck1"][jslang].replace("{0}", dispName).replace("{1}",maxValue);
                            
                        	if(hmpgTmplcd == "9"){
                        		jsConfirmHelper.getAlert({
                        			content : manyLanguage
                        		});
                        	}else{
                        		alert(manyLanguage);
                        	}   
                        	
                        	var offset = jQuery(obj).offset();
                        	jQuery('html, body').animate({scrollTop : offset.top - 100}, 400);
                            if (window.event) {
                                window.event.returnValue = false;
                            }
                            return  false;
                        }
                    }
                }
            }
        }

        return  true;
    }

    /**
     * 숫자형식에서 comma를 없애고, 날짜형식에서 "/" 를 없앤다.
     * 하나의 오브젝트에 대한 것임.
     *
     * @param   form
     * @param   obj
     */
    function makeValueObj(form, obj) {
        if (obj.tagName == "INPUT") {
            dataType = obj.getAttribute("dataType");

            if (dataType == "date") {
                deleteDateFormat(obj);
            } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                if (obj.getAttribute("comma") != null) {
                    deleteComma(obj);
                }
            }
        }
    }

     /**
      * 문자에서 Hyphen을 없앤다.
      *
      * @param   str
      */
    function deleteHyphen(str) {
        var temp = '';

        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == '-') {
                continue;
            } else {
                temp += str.charAt(i);
            }
        }

        return  temp;
    }

    /**
     * 주민등록번호&사업자번호에 '-'넣기
     */
     function setJuminHyphen(obj) {
        var str = deleteHyphen(obj.value);

        if(str.length == 13) {  // 주민등록번호  6-7
            str = str.substring(0, 6) + "-" + str.substring(6);
        }else if(str.length == 10) { // 사업자번호 3-2-5
            str = str.substring(0, 3) + "-"+ str.substring(3, 5) + "-"+ str.substring(5);
        }
        obj.value = str;
     }

    /**
     * 법인번호 에 '-'넣기
     */
    function setPupinHyphen(obj) {
        var str = deleteHyphen(obj.value);

        if(str.length == 13) {  // 주민등록번호  6-7
            str = str.substring(0, 6) + "-" + str.substring(6);
        }
        obj.value = str;
    }

    /**
     * 납입주기에 따른 이율을 계산한다.
     * (소수로 반환한다.)
     *
     * @param   currencyCd 통화
     * @param   yRate 년이율
     * @param   term 납입주기
     * @return  소수 이율
     */
    function jsRateCalc(currencyCd, yRate, term) {

        var yday = jsYdayCalc(currencyCd);
        var rate = eval((yRate / 100) * (term / 12) * (365 / yday));

        return  rate;
    }

    /**
     * 금액을 단수 처리한다.
     *
     * 원화(WON)
     *
     *  단수단위
     *      0 - 원미만
     *      1 - 십원미만
     *      2 - 백원미만
     *      3 - 천원미만
     *      4 - 만원미만
     *
     *  단수처리
     *      1 - 반올림
     *      2 - 절상
     *      3 - 절사
     *
     * 외화
     *
     *  단수단위
     *      0 - 소수점 0 미만
     *      1 - 소수점 1 미만
     *      2 - 소수점 2 미만
     *
     *  단수처리
     *      1 - 반올림
     *      2 - 절상
     *      3 - 절사
     * @param   currency 통화 (text)
     * @param   amt 금액 (text)
     * @param   unit 단수단위 (text)
     * @param   method 단수처리 (text)
     */
    function jsTruncAmt(currency, amt, unit, method) {

        var after = eval(amt);

        if (currency == "WON") {

            after /= Math.pow(10, eval(unit));

            if (method == "1") {
                after = Math.round(after);
            } else if (method == "2") {
                after = Math.ceil(after);
            } else if (method == "3") {
                after = Math.floor(after);
            }

            after *= Math.pow(10, eval(unit));
        } else {
            after *= Math.pow(10, eval(unit));

            if (method == "1") {
                after = Math.round(after);
            } else if (method == "2") {
                after = Math.ceil(after);
            } else if (method == "3") {
                after = Math.floor(after);
            }

            after /= Math.pow(10, eval(unit));
        }

        return  after;
    }

    /**
     * String이 null인 경우 '0'으로 바꾸어 준다.
     *
     * @param   string
     * @return  String
     */
    function jsNumnvl(str) {
        if(str == null || str == "") {
            return "0";
        }
        return  str;
    }

    function jsNvl(str, arg2) {
    	var result = "" ;
    	if(arg2 == undefined) result = "";
    	else result = arg2 ;
        if(str == null) {
            return result ;
        }
        return  str;
    }

    /**
     * 폼 안의 숫자 오브젝트에 콤마를 붙여준다.
     */
    function setComma() {

        for (i = 0; i < document.forms.length; i++) {
            var elements = document.forms(i).elements;
            for (j = 0; j < elements.length; j++) {
                if (elements(j).tagName == "INPUT") {
                    dataType = elements(j).getAttribute("dataType");
                    if (dataType == "number" || dataType == "integer" ||
                    dataType == "float" || dataType == "double") {
                        if (elements(j).getAttribute("comma") != null) {
                            addComma(elements(j));
                        }
                    }
                }
            }
        }
    }

    /**
     * 일수를 계산한다.(초일산입 말일불산입)
     *
     * @param   from 시작일
     * @param   to 종료일
     * @return  일수
     */
    function jsGetDays(from, to) {

        var fromDt = deleteDateFormatStr(from);
        var toDt = deleteDateFormatStr(to);
        var days = 0 ;

        var fromYy = eval(fromDt.substring(0,4));
        var fromMm = eval(fromDt.substring(4,6) - 1);
        var fromDd = eval(fromDt.substring(6,8));

        var toYy = eval(toDt.substring(0,4));
        var toMm = eval(toDt.substring(4,6) - 1);
        var toDd = eval(toDt.substring(6,8));

        var fromDate = new Date(fromYy, fromMm, fromDd) ;
        var toDate = new Date(toYy, toMm, toDd) ;

        days = ((toDate - fromDate) / 60 / 60 / 24 / 1000);

        return  days;
    }

    /**
     * 비밀번호 체크
     */
    function passChk(p_id, p_pass, obj) {

        var cnt = 0;
        var cnt2 = 1;
        var cnt3 = 1;
        var temp = "";

        /* 비밀번호에에 숫자만 입력되는것을 체크 - 이혁*/
        regNum = /^[0-9]+$/gi;
        bNum = regNum.test(p_pass);
        if(bNum) {
        	//다국어원본 : 비밀번호는 숫자만으로 구성하실수는 없습니다.
            alert(MESSAGE["passwordCheck"][jslang]); //다국어phs
               obj.focus();
            return false;
        }
        /* 비밀번호에에 문자만 입력되는것을 체크 - 이혁*/
        regNum = /^[a-zA-Z]+$/gi;
        bNum = regNum.test(p_pass);
        if(bNum) {
        	//다국어원본 : 비밀번호는 문자만으로 구성하실수는 없습니다.
            alert(MESSAGE["passwordCheck1"][jslang]); //다국어phs
               obj.focus();
            return false;
        }

        for(var i = 0; i < p_id.length; i++) {
            temp_id = p_id.charAt(i);

            for(var j = 0; j < p_pass.length; j++) {
                if (cnt > 0) {
                    j = tmp_pass_no + 1;
                }

                if (temp == "r") {
                    j=0;
                    temp="";
                }

                temp_pass = p_pass.charAt(j);

                if (temp_id == temp_pass){
                    cnt = cnt + 1;
                    tmp_pass_no = j;
                    break;
                } else if (cnt > 0 && j > 0){
                    temp="r";
                    cnt = 0;
                } else {
                    cnt = 0;
                }
            }

            if (cnt > 3) {
                break;
            }
        }

        if (cnt > 3){
        	//다국어원본 : 비밀번호가 ID와 4자 이상 중복되거나, \n연속된 글자나 순차적인 숫자를 4개이상 사용해서는 안됩니다.
            alert(MESSAGE["passwordCheck2"][jslang]); //다국어phs
            obj.focus();
            return  false;
        }

        for(var i = 0; i < p_pass.length; i++) {
            temp_pass1 = p_pass.charAt(i);
            next_pass = (parseInt(temp_pass1.charCodeAt(0)))+1;
            temp_p = p_pass.charAt(i+1);
            temp_pass2 = (parseInt(temp_p.charCodeAt(0)));

            if (temp_pass2 == next_pass) {
                cnt2 = cnt2 + 1;
            } else {
                cnt2 = 1;
            }

            if (temp_pass1 == temp_p) {
                cnt3 = cnt3 + 1;
            } else {
                cnt3 = 1;
            }

            if (cnt2 > 3) {
                break;
            }

            if (cnt3 > 3) {
                break;
            }
        }

        if (cnt2 > 3){
        	//다국어원본 : 비밀번호에 연속된 글이나 순차적인 숫자를 4개이상 사용해서는 안됩니다.
            alert(MESSAGE["passwordCheck3"][jslang]); //다국어phs
            obj.focus();
            return  false;
        }

        if (cnt3 > 3){
        	//다국어원본 : 비밀번호에 반복된 문자/숫자를 4개이상 사용해서는 안됩니다.
        	alert(MESSAGE["passwordCheck4"][jslang]); //다국어phs
            obj.focus();
            return  false;
        }

        return true;
    }

    /**
     * 브라우저의 버전을 체크한다.
     *
     * @param   none
     * @return  none
     */
    function objDetectBrowser() {
        var strUA, s, i;
        this.isIE = false;  // 인터넷 익스플로러인지를 나타내는 속성
        this.isNS = false;  // 넷스케이프인지를 나타내는 속성
        this.version = null; // 브라우저 버전을 나타내는 속성

        // Agent 정보를 담고 있는 문자열.
        strUA = navigator.userAgent;

        s = "MSIE";
        // Agent 문자열(strUA) "MSIE"란 문자열이 들어 있는지 체크

        if ((i = strUA.indexOf(s)) >= 0) {
            this.isIE = true;
            // 변수 i에는 strUA 문자열 중 MSIE가 시작된 위치 값이 들어있고,
            // s.length는 MSIE의 길이 즉, 4가 들어 있다.
            // strUA.substr(i + s.length)를 하면 strUA 문자열 중 MSIE 다음에
            // 나오는 문자열을 잘라온다.
            // 그 문자열을 parseFloat()로 변환하면 버전을 알아낼 수 있다.
            this.version = parseFloat(strUA.substr(i + s.length));
            return;
        }

        s = "Netscape6/";
        // Agent 문자열(strUA) "Netscape6/"이란 문자열이 들어 있는지 체크

        if ((i = strUA.indexOf(s)) >= 0) {
            this.isNS = true;
            this.version = parseFloat(strUA.substr(i + s.length));
            return;
        }

        // 다른 "Gecko" 브라우저는 NS 6.1로 취급.

        s = "Gecko";
        if ((i = strUA.indexOf(s)) >= 0) {
            this.isNS = true;
            this.version = 6.1;
            return;
        }
    }

  /**
   * 화면 크기를 1024*768로 고정 시킨다.
   */
  function fixScreen(){
    if ((screen.availWidth >= 1024) & (screen.availHeight >= 768)){
      availX = 1024;
      availY = 768;
      screenX = screen.availWidth;
      screenY = screen.availHeight;
      windowX = (screenX - availX)/2;
      windowY = (screenY - availY)/2;
    }
    else {
      //availX = 1024;
      //availY = 768;
      availX = screen.availWidth;
      availY = screen.availHeight;
      windowX = 0;
      windowY = 0;
    }
    moveTo(windowX,windowY);
    resizeTo(availX, availY);
  }

    /**
     * sub 화면을 가운데에 위치 시킨다.
     * centerSubWindow(winName, wx, wy)
     * winName : 서브윈도우의 이름
     * ww : 서브윈도우로 열 창의 너비
     * wh : 서브윈도우로 열 창의 높이
     */
    function centerSubWindow(winName, ww, wh){
        if (document.layers) {
            sw = screen.availWidth;
            sh = screen.availHeight;
        }
        if (document.all) {
            sw = screen.width;
            sh = screen.height;
        }

        w = (sw - ww)/2;
        h = (sh - wh)/2;
        winName.moveTo(w,h);
    }

    /**
     * 문자열에서 삭제를 원하는 문자를 삭제한다.
     *
     * @param   val 문자열
     * @param   str 삭제할 문자
     */
    function jsTrim(val, str) {
        var temp  = val.value;
        temp = temp.split(str);

        val.value = temp.join("");
    }

    /**
     * 폼 전체를 읽기전용으로 만든다.
     *
     * @param    form명
     */
    function setAllDisabled(tform) {
        var len = tform.elements.length;
        alert("len ::"+ len);
        for(i=0; i<len; i++) {
            if(tform.elements[i].type == "text" || tform.elements[i].type == "select-one"
               || tform.elements[i].type == "textarea" || tform.elements[i].type == "file"
               || tform.elements[i].type == "radio" || tform.elements[i].type == "checkbox") {
                 tform.elements[i].disabled = true;
            }
        }
    }

    /**
     * 폼 전체를 읽기전용을 정상으로 돌려 놓는다.
     *
     * @param    form명
     */
    function setAllEnabled(tform) {
        var len = tform.elements.length;
        for(i=0; i<len; i++) {
            if(tform.elements[i].type == "text" || tform.elements[i].type == "select-one"
               || tform.elements[i].type == "textarea" || tform.elements[i].type == "file"
               || tform.elements[i].type == "radio" || tform.elements[i].type == "checkbox") {
                 tform.elements[i].disabled = false;
            }
        }
    }

    /**
     * tokenCommaPatt
     *
     * @param    val
     * @param    patt
     * @ String val을 String patt로 구분하여배열로 리턴한다.
     * example
     *  var TestArray = tokenCommaPatt( "abcd efgh ijkl", " ")
     *  TestArray[0] = "abcd";
     *  TestArray[1] = "efgh";
     *  TestArray[2] = "ijkl";
     */
    function tokenCommaPatt(val, patt){
        var i = 0, iFst = 0;
        var sCheckValue = val;
        var arrRst = new Array();
        while( ( iFst = sCheckValue.indexOf( patt ) ) >= 0 ) {
            arrRst[i++] = sCheckValue.substring( 0 , iFst );
            sCheckValue = sCheckValue.substring( iFst + patt.length ,  sCheckValue.length );
            }
        arrRst[i] = sCheckValue;
        return arrRst;
    }

    /**
     * 숫자로만 이루어져 있는지 체크 한다.
     *
     * @param    num
     * @return   boolean
     */
    function isNumber2(num){
        var inText = num.value;
        var ret;

        for (var i = 0; i < inText.length; i++) {
            ret = inText.charCodeAt(i);
            if (!((ret > 47) && (ret < 58)))  {
            	//다국어원본 : 숫자만 입력 가능합니다.
                alert(MESSAGE["onlyNumber"][jslang]); //다국어phs
                num.value = "";
                num.focus();
                return false;
            }
        }
        return true;
    }
    
    /**
     * 숫자로만 이루어져 있는지 체크 한다.
     *
     * @param    num
     * @return   boolean
     */
    function isFloat3(num){
        var inText = num.value;
        var ret;
        if(!isFloat2(inText)){
        	//다국어원본 : 숫자만 입력 가능합니다.
            alert(MESSAGE["onlyNumber"][jslang]); //다국어phs
            num.value = "";
            num.focus();
            return false;

        }
        return true;        
    }
    
    /**
     * 숫자로만 이루어져 있는지 체크(,붙이기) 한다.
     *
     * @param    num
     * @return   boolean
     */
    function isNumberComma(num){
        var inText = (num.value).replace(/,/gi,'');
        var ret;

        for (var i = 0; i < inText.length; i++) {
            ret = inText.charCodeAt(i);
            if (!((ret > 47) && (ret < 58)))  {
            	//다국어원본 : 숫자만 입력 가능합니다.
                alert(MESSAGE["onlyNumber"][jslang]); //다국어phs
                num.value = "";
                num.focus();
                return false;
            }
        }
        addComma(num);
        return true;
    }

    /**
     * 한글로만 이루어져 있는지 체크 한다.
     *
     * @param    han
     * @return   boolean
     */
    function isHangul(han) {
        var inText = han.value;
        var ret;

        ret = inText.charCodeAt();
        if (ret > 31 && ret < 127) {
        	//다국어원본 : 한글만 입력 가능합니다.
            alert(MESSAGE["onlyHangul"][jslang]); //다국어phs
            han.value = "";
            han.focus();
            return false;
        }

        return true;
    }
    
    /**
     * 한글은 입력이 불가능
     *
     * @param    obj
     * @return   boolean
     */
    function isNotHangul(obj) {
    	var strValue = obj.value
    	var ret;
    	
    	for(i=0; i<strValue.length; i++){
    		var code = strValue.charCodeAt(i);
    		if (!(code > 31 && code < 127)) {
				//다국어원본 : 한글은 입력이 불가능합니다.
    			alert(MESSAGE["notOnlyHangul"][jslang]); //다국어phs
				obj.value = "";
				obj.focus();
				return false;
			}
    	}
    	
    	return true;
    }
    

   /**
    * 영문캐릭터인지 체크(대문자)
    *
    * param obj
    * return
    */
    function checkChar(obj)
    {
        var strValue = obj.value

        var retChar = strValue.toUpperCase();

        if (retChar <  "A" || retChar  > "Z")
        {
        	//다국어원본 : 영문자만 입력이 가능합니다.
            alert(MESSAGE["onlyEnglish"][jslang]); //다국어phs
            obj.value = "";
            obj.focus();
            return;
        }
        obj.value = retChar;
    }
    
    
    /**
     * 영문으로만 이루어져 있는지 체크 한다.
     *
     * @param    obj
     * @return   boolean
     */
    function checkChar2(obj) {
        var strValue = obj.value
        var ret;
        
		for(i=0; i<strValue.length; i++){
			var code = strValue.charCodeAt(i);
			
			if( !((code >= 65 && code <= 90) ||
				  (code >= 97 && code <= 122)) ){
				//다국어원본 : 영문자만 입력이 가능합니다.
				alert(MESSAGE["onlyEnglish"][jslang]); //다국어phs
				obj.value = "";
				obj.focus();
				return;
			}
		}
    }
    

    /**
     * 키보드 입력시 숫자만 입력 가능
     */
    function onlyNumber(){
        if ((event.keyCode >= 32 && event.keyCode < 48)
            || (event.keyCode > 57 && event.keyCode < 65)
            || (event.keyCode > 90 && event.keyCode < 97)
            || (event.keyCode >= 97 && event.keyCode <= 122)
            || (event.keyCode >= 65 && event.keyCode <= 90))
            event.returnValue = false;
    }

    /**
     * 키보드 입력시 수자 및 ','가 입력 가능
     */
    function AmtNumber(){
        if ((event.keyCode >= 32 && event.keyCode < 44)
            || (event.keyCode >= 45 && event.keyCode < 48)
            || (event.keyCode > 57 && event.keyCode < 65)
            || (event.keyCode > 90 && event.keyCode < 97)
            || (event.keyCode >= 97 && event.keyCode <= 122)
            || (event.keyCode >= 65 && event.keyCode <= 90))
            event.returnValue = false;
    }

    /**
     * 키보드 입력시 수자 및 '.'가 입력 가능
     */
    function RateNumber(){
        if ((event.keyCode >= 32 && event.keyCode < 46)
            || (event.keyCode >= 47 && event.keyCode < 48)
            || (event.keyCode > 57 && event.keyCode < 65)
            || (event.keyCode > 90 && event.keyCode < 97)
            || (event.keyCode >= 97 && event.keyCode <= 122)
            || (event.keyCode >= 65 && event.keyCode <= 90))
            event.returnValue = false;
    }

    /**
     * 키보드 입력시 수자 및 '.'가 입력 가능
     */
    function rateNumber(event){
        if ((event.keyCode >= 32 && event.keyCode < 46)
            || (event.keyCode >= 47 && event.keyCode < 48)
            || (event.keyCode > 57 && event.keyCode < 65)
            || (event.keyCode > 90 && event.keyCode < 97)
            || (event.keyCode >= 97 && event.keyCode <= 122)
            || (event.keyCode >= 65 && event.keyCode <= 90))
            event.returnValue = false;
    }

    /**
     * 숫자형식에 null이 입력되면 0으로 셋팅한다.
     *
     * @param   form
     */
    function setZero(form) {
        for (i = 0; i < form.elements.length; i++) {
            obj = form.elements(i);

            if (obj.tagName == "INPUT") {
                dataType = obj.getAttribute("dataType");

                if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                    if (obj.value == null || obj.value == "") {
                        obj.value = "0";
                    }
                }
            }
        }
    }

    /* 날짜관련 *******************************************************************************/
    var dateBase  = new Date();

    /**
     * 년
     */
    function getYear()
    {
        return dateBase.getFullYear();
    }

    /**
     * 월
     */
    function getMonth()
    {
        var month = dateBase.getMonth()+1;
        if (("" + month).length == 1)
            month = "0" + month;
        return month;
    }

    /**
     * 일
     */
    function getDay()
    {
        var day = dateBase.getDate();
        if(("" + day).length == 1)
            day   = "0" + day;
        return day;
    }

    /**
     * 현재일부터 특정일자 이전(0), 이후(1)의 날짜를 리턴한다.(YYYYMMDD)
     */
    function getIntervalDate(term, isPrevNext)
    {
        var year2, month2, day2;
        var dt = new Date(getMonth() +"-"+ getDay() +"-"+ getYear());
        var anyTime;
        var anyDate;
        if(isPrevNext == "0") /// 이전
            anyTime = dt.getTime() - (term) * 1000 * 3600 * 24;
        else /// 이후
            anyTime = dt.getTime() + (term) * 1000 * 3600 * 24;
        anyDate = new Date();
        anyDate.setTime(anyTime);
        year2 = ( (anyDate.getYear()<100) ? "19"+ anyDate.getYear() : anyDate.getYear() );
        month2 = anyDate.getMonth()+1;
        day2 = anyDate.getDate();
        if (("" + month2).length == 1)
            month2 = "0" + month2;
        if(("" + day2).length == 1)
            day2   = "0" + day2;
        //alert("["+ year2 +"/"+ month2 +"/"+ day2 +"]");

        return year2 +""+ month2 +""+ day2;
    }

    /**
     * 기준일부터 특정일자 이전(0), 이후(1)의 날짜를 리턴한다.(YYYYMMDD)
     */
    function getIntervalDate2(kijunDate, term, isPrevNext)
    {
        var year2, month2, day2;
        var dt = toTimeObject(deleteDateFormatStr(kijunDate) +"0000");
        var anyTime;
        var anyDate;
        if(isPrevNext == "0") /// 이전
            anyTime = dt.getTime() - (term) * 1000 * 3600 * 24;
        else /// 이후
            anyTime = dt.getTime() + (term) * 1000 * 3600 * 24;
        anyDate = new Date();
        anyDate.setTime(anyTime);
        year2 = ( (anyDate.getYear()<100) ? "19"+ anyDate.getYear() : anyDate.getYear() );
        month2 = anyDate.getMonth()+1;
        day2 = anyDate.getDate();
        if (("" + month2).length == 1)
            month2 = "0" + month2;
        if(("" + day2).length == 1)
            day2   = "0" + day2;
        //alert("["+ year2 +"/"+ month2 +"/"+ day2 +"]");

        return year2 +""+ month2 +""+ day2;
    }

    /**
     * 기준일부터 특정일자 이전(0), 이후(1)의 개월수 만큼 차이나는 날짜를 리턴한다.(YYYYMMDD)
     */
    function getIntervalMonth(kijunDate, term, isPrevNext)
    {
        var kijunDate   = deleteDateFormatStr(kijunDate);
        var year        = kijunDate.substring(0,4); /// 년
        var month       = kijunDate.substring(4,6); /// 월
        var date        = kijunDate.substring(6,8); /// 일
        var addMonth;
        var addYear;
        var tempYear;
        var tempMonth;
        var rtnDate;

        if(isPrevNext == "0") /// 이전
        {
            addMonth    = eval(month) - eval(term);
            addYear     = Math.floor(eval(addMonth/12)); /// 빼줄 년도 계산
            tempYear    = eval(addYear) + eval(addMonth%12);
            if(tempYear > 0)
            {
                tempMonth   = eval(tempYear%13);
            }
            else
            {
                tempMonth   = eval(12 + addMonth%12);
                if(tempYear == 0)
                    addYear     = addYear-1;
            }
        }
        else /// 이후
        {
            addMonth    = eval(month) + eval(term);
            addYear     = Math.floor(eval(addMonth/13)); /// 더해줄 년도 계산
            tempYear    = eval(addYear) + eval(addMonth%13);

            if(tempYear < 13)
            {
                tempMonth   = eval(tempYear%13);
            }
            else
            {
                tempMonth   = eval(tempYear%13 +1);
                addYear     = addYear+1;
            }
        }

        tempMonth   = tempMonth + ""; /// 길이를 알아보기위해 string으로 바꿔줌.
        if(tempMonth.length == 1)
        {
            tempMonth = "0" + tempMonth;
        }
        /// 해당월에 해당일이 존재하는지 체크하고 존재하지 않는다면 마지막 일을 가져온다.
        if( !isValidDay(eval(year) + eval(addYear), tempMonth, date))
            date = getLastDay(eval(year) + eval(addYear), tempMonth);

        rtnDate = eval(year) + eval(addYear) +""+ tempMonth +""+ date;
        //alert(">날짜 ::"+ rtnDate);

        return rtnDate;
    }

    /**
     * Time 스트링을 자바스크립트 Date 객체로 변환
     *
     * parameter time: Time 형식의 String
     */
    function toTimeObject(time)
    { //parseTime(time)
        var year  = time.substr(0,4);
        var month = time.substr(4,2) - 1; // 1월=0,12월=11
        var day   = time.substr(6,2);
        var hour  = time.substr(8,2);
        var min   = time.substr(10,2);

        return new Date(year,month,day,hour,min);
    }

    /**
     * 자바스크립트 Date 객체를 Time 스트링으로 변환
     *
     * parameter date: JavaScript Date Object
     */
    function toTimeString(date)
    { //formatTime(date)
        var year  = date.getFullYear();
        var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
        var day   = date.getDate();
        var hour  = date.getHours();
        var min   = date.getMinutes();

        if(("" + month).length == 1) { month = "0" + month; }
        if(("" + day).length   == 1) { day   = "0" + day;   }
        if(("" + hour).length  == 1) { hour  = "0" + hour;  }
        if(("" + min).length   == 1) { min   = "0" + min;   }

        return ("" + year + month + day + hour + min)
    }

    /**
     * 유효한(존재하는) 월(月)인지 체크
     */
    function isValidMonth(mm)
    {
        var m = parseInt(mm,10);
        return (m >= 1 && m <= 12);
    }

    /**
     * 유효한(존재하는) 일(日)인지 체크
     */
    function isValidDay(yyyy, mm, dd)
    {
        var m = parseInt(mm,10) - 1;
        var d = parseInt(dd,10);

        var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
            end[1] = 29;
        }

        return (d >= 1 && d <= end[m]);
    }

    /**
     * 해당 월의 마지막 일을 가져온다.
     */
    function getLastDay(yyyy, mm)
    {
        var m = parseInt(mm,10) - 1;
        var d;

        var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
            end[1] = 29;
        }
        for(var i=0; i<end.length; i++)
        {
            if(m == i)
                d = end[i];
        }
        //alert("d ::"+ d);

        return d;
    }

    /**
     * 유효한(존재하는) 시(時)인지 체크
     */
    function isValidHour(hh)
    {
        var h = parseInt(hh,10);
        return (h >= 1 && h <= 24);
    }

    /**
     * 유효한(존재하는) 분(分)인지 체크
     */
    function isValidMin(mi)
    {
        var m = parseInt(mi,10);
        return (m >= 1 && m <= 60);
    }

    /**
     * 현재날짜를 리턴한다.
     *
     */
    function getCurDate()
    {
        var date  = new Date();
        var year  = date.getFullYear();
        var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
        var day   = date.getDate();
        var hour  = date.getHours();
        var min   = date.getMinutes();

        if (("" + month).length == 1) { month = "0" + month; }
        if (("" + day).length   == 1) { day   = "0" + day;   }
        if (("" + hour).length  == 1) { hour  = "0" + hour;  }
        if (("" + min).length   == 1) { min   = "0" + min;   }

        return ("" + year + month + day)
    }
    /* 날짜관련 *******************************************************************************/

    /**
     * 날짜를 체크하여 금월을 return
     *
     * @param       날짜
     */
    function jsThisMonth(nowDate) {
        var form = document.form1;

        var nowYear = nowDate.substring(0, 4);
        var nowMonth = nowDate.substring(4, 6);
        var nowDay = nowDate.substring(6, 8);
        var newDay = "";

        for(var i=28; i<=31; i++) {
            if (isDate(nowYear + nowMonth + i)) {
                newDay = i + "";
            }
        }

        form.fromDate.value = addDateFormatStr(nowYear + nowMonth + "01");
        form.toDate.value = addDateFormatStr(nowYear + nowMonth + newDay);
    }

    /**
     * 날짜를 체크하여 금주를 return
     *
     * @param       날짜
     */
    function jsThisWeek(nowDate) {
        var form = document.form1;

        var dateWeek = getDateWeek(nowDate);
        var monday = Number(nowDate) - dateWeek + 1;
        var sunday = monday + 6 ;

        form.fromDate.value = addDateFormatStr(monday + "");
        form.toDate.value = addDateFormatStr(sunday + "");
    }

    /**
     * 날짜를 체크하여 금일를 return
     *
     * @param       날짜
     */
    function jsThisDay(nowDate) {
        var form = document.form1;

        form.fromDate.value = addDateFormatStr(nowDate);
        form.toDate.value = addDateFormatStr(nowDate);
    }

    /**
     * 지정한 날짜의 요일(1 -> 월, ~ 7 -> 일)
     *
     * @param       날짜
     */
    function getDateWeek(val){
        var day;
        var d = new Date();

        d.setUTCFullYear(Number(val.substring(0, 4)));
        d.setUTCMonth(Number(val.substring(4, 6)) - 1);
        d.setUTCDate(Number(val.substring(6, 8)));

        day = d.getDay();

        return day;
    }

    /**
     * 엔터키 누르면 자동으로 다음 필드로 이동
     */
    function enterNextField(field, event)
    {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;

        if(keyCode == 13)
        {
            var i;
            for(i = 0; i<field.form.elements.length; i++)
            {
                if(field == field.form.elements[i])
                    break;
            }

            i = (i + 1) % field.form.elements.length;
            field.form.elements[i].focus();
            return false;
        }
        else
            return true;
    }

    /**
     * 화면의 첫번째 TextField에 포커스 이동
     */
    function firstTextFocus()
    {
        var elements;
        var obj;

        for(var j=0; j<document.forms.length; j++)
        {
            elements = document.elements[j].elements;

            for(var i=0; i<elements.length; i++)
            {
                obj = elements[i];

                if(obj.tagName == "INPUT")
                {
                    if(obj.type == "text" && obj.disabled == false)
                    {
                        obj.focus();
                        endFocus(obj);
                        return;
                    }
                }
            }
        } /// end of for()
    }

    /**
     * 화면의 원하는 TextField 나 TextArea에 포커스 이동
     */
    function firstTextFocus(formName)
    {
        var elements;
        var obj;

        for(var j=0; j<document.forms.length; j++)
        {
            elements = document.forms[j].elements;

            for(var i=0; i<elements.length; i++)
            {
                obj = elements[i];

                if(obj.name == formName)
                {
                    if(obj.tagName == "INPUT" || obj.tagName.toUpperCase() == "TEXTAREA")
                    {
                        //alert("obj.name ::"+ obj.name +"/ obj.tagName ::"+ obj.tagName +"/ formName ::"+ formName +"/ obj.type ::"+ obj.type);
                        if((obj.type == "text" || obj.type == "textarea") && obj.disabled == false)
                        {
                            obj.focus();
                            endFocus(obj);
                            return;
                        }
                    }
                }
                else if(formName == "" || formName == null)
                {
                    if(obj.tagName == "INPUT")
                    {
                        if(obj.type == "text" && obj.disabled == false)
                        {
                            obj.focus();
                            endFocus(obj);
                            return;
                        }
                    }
                }
            }
        } /// end of for()
    }

    /**
     * FM## - getFM(12, 4) -> 0012로 변경한다.
     * @param       val 원본 값
     * @param       len 사이즈 (0을 채울 갯수)
     */
    function getFM(val, len)
    {
        if(val == "")
            return val;
        var str     = "";
        var zero    = "";
        var valLen  = new String(val).length;
        var forLen  = len-valLen;
        if(len <= valLen)
            return val;
        for(var i=0; i<(forLen); i++)
        {
            zero    += "0";
        }
        str = zero+val;

        return str;
    }

    /**
     * 퍼미션 체크
     * 하나의 오브젝트에 대한 것임.
     *
     * @param   form
     * @param   obj
     */
    function permission(form, obj)
    {
        /// 버튼에 다음과 같이 정의해야 한다. perm permType="C" permCheck="<%= "C" %>"
        var permType    = ""; /// 현재 버튼의 CRUD 타입
        var permCheck   = ""; /// 사용자가 가진 퍼미션
        var dispName    = ""; /// 디스플레이명
        var permCheckArr= new Array();

        alert("> obj.tagName ::"+ obj.tagName);
        for(i = 0; i < form.elements.length; i++)
        {
            if(obj.getAttribute("perm") != null)
            {
                if(obj.tagName == "INPUT" || obj.tagName == "IMG")
                {
                    permType    = obj.getAttribute("permType");
                    permCheck   = obj.getAttribute("permCheck");
                    dispName    = obj.getAttribute("dispName");
                    if(permType != null && permType != "")
                    {
                        if(permCheck != null && permCheck != "")
                        {
                            permCheckArr    = tokenCommaPatt(permCheck, "|");
                        }
                        /// CRUD 권한 체크
                        for(var j=0; j<permCheckArr.length; j++)
                        {
                            if(permType == permCheckArr[j])
                            {
                                break;
                            }
                            else
                            {
                            	//다국어원본 : dispName +" 권한이 없습니다."
                            	var manyLanguage = MESSAGE["noAuthority"][jslang].replace("{0}",dispName);
                                alert(manyLanguage); //다국어phs
                                obj.focus();
                                if(window.event)
                                {
                                    window.event.returnValue = false;
                                }
                                return  false;
                            }
                        }
                    }
                }
                break;
            }
        }
        alert("permType ::"+ permType +"/ permCheck ::"+ permCheck);
    }

    /**
     * 텍스트필드의 맨 끝(오른쪽)으로 포커스 이동하기.
     * <input type="textfield" name="addr" onFocus="endFocus(this);">
     *
     * @param   obj
     */
    function endFocus(obj)
    {
        obj.value = obj.value + '';
    }

    /**
     * 라디오버튼의 선택되어진 개체의 값을 가져온다.
     *
     * @param       frm document.form
     * @param       elem 라디오버튼 개체명
     */
    function getRadioValue(frm, elem)
    {
        var val = "";

        if(elem == null || elem == "")
            return "";

        if(frm.elements[elem].length > 0)
        {

            for(var i=0; i<frm.elements[elem].length; i++)
            {
                if(frm.elements[elem][i].checked)
                {
                    val = frm.elements[elem][i].value;
                    break;
                }
            } /// end of for()
        }
        else
            val = frm.elements[elem].value;

        return val;
    }

    /**
    * 체크박스가 하나라도 선택 되어 있는지를 체크한다.
    *
    **/
	function Checkbox_Checked(obj) {
	    isChk=false;
	    if(obj == undefined) return isChk;

	    if(obj.length == undefined) {
	        if(obj.checked==true) {
	            isChk=true;
	        }
	    } else {
	        for(i=0; i< obj.length; i++) {
	            if(obj[i].checked==true) {
	                isChk=true;
	            }
	        }
	    }
	    return isChk;
	}

	function Checkbox_Check(obj) {
	    isChk=false;
	    if(obj.length == undefined) {
	        isChk=false;
	    } else {
	        isChk=true;
	    }
	    return isChk;
	}

	function Checkbox_Checked_Count(obj) {
	    var checkCnt = 0;
	    if(obj == undefined) return checkCnt;

	    if(obj.length == undefined) {
	        if(obj.checked==true) {
	            checkCnt = 1;
	        }
	    } else {
	        for(i=0; i< obj.length; i++) {
	            if(obj[i].checked==true) {
	                checkCnt++;
	            }
	        }
	    }
	    return checkCnt;
	}

	// 창 전체화면
	function Full_Size_Popup(s_url, s_name, s_scroll) {
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes, fullscreen=yes width="+screen.width+" height="+screen.height;
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
		   alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        //var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		wd_pop.blur();

        //var aw = window.screen.availWidth;
        //var ah = window.screen.availHeight;
        //wd_pop.resizeTo(aw, ah);
		wd_pop.focus();

		return wd_pop;
	}
	
	// 창 전체화면
	function Full_Size_Popup2(s_url, s_name, s_scroll) {
		ls_pri = "toolbar=yes, location=yes, directories=yes, menubar=yes, resizable=yes, scrollbars="+s_scroll+", status=yes, fullscreen=yes width="+screen.width+" height="+screen.height;
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        //var addHeight = 0;
        //if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		wd_pop.blur();

        //var aw = window.screen.availWidth;
        //var ah = window.screen.availHeight;
        //wd_pop.resizeTo(aw, ah);
		wd_pop.focus();

		return wd_pop;
	}

	// 창의 위치를 가운데 조정하고 사이즈고정
	function Center_Fixed_Popup(s_url, s_val, s_name, s_width, s_height, s_scroll) {
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars="+s_scroll+", status=yes, width=400 ,height=400";
		wd_pop = window.open(s_url+"?"+s_val, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		wd_pop.blur();
		wd_pop.resizeTo(s_width, s_height+addHeight);
		var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
		wd_pop.moveTo(((aw - eval(s_width))/2),((ah - eval(s_height))/2));
		wd_pop.focus();

		return wd_pop;
	}

	function Center_Fixed_Popup2(s_url, s_name, s_width, s_height, s_scroll) {
		var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
		
		var xpos;
		var ypos;
		xpos=((aw - eval(s_width))/2);
		ypos=((ah - eval(s_height))/2);
		//ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes width="+s_width+" height="+s_height+",top="+((aw - eval(s_width))/2)+",left="+((ah - eval(s_height))/2);
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes ,width="+s_width+", height="+s_height+",top="+ypos+",left="+xpos;
		
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		//wd_pop.blur();
		//wd_pop.resizeTo(s_width, s_height+addHeight);
        //var aw = window.screen.availWidth;
        //var ah = window.screen.availHeight;
		//wd_pop.moveTo(((aw - eval(s_width))/2),((ah - eval(s_height))/2));
		wd_pop.focus();

		return wd_pop;
	}
	
	
	function Center_Fixed_Popup2(s_url, s_name, s_width, s_height, s_scroll,s_resize) {
		var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
		
		var xpos;
		var ypos;
		xpos=((aw - eval(s_width))/2);
		ypos=((ah - eval(s_height))/2);
		//ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes width="+s_width+" height="+s_height+",top="+((aw - eval(s_width))/2)+",left="+((ah - eval(s_height))/2);
		
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable="+s_resize+", scrollbars="+s_scroll+", status=yes ,width="+s_width+", height="+s_height+",top="+ypos+",left="+xpos;
		
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		//wd_pop.blur();
		//wd_pop.resizeTo(s_width, s_height+addHeight);
        //var aw = window.screen.availWidth;
        //var ah = window.screen.availHeight;
		//wd_pop.moveTo(((aw - eval(s_width))/2),((ah - eval(s_height))/2));
        
        try {
        	classRmPopupList[classRmPopupList.length] = wd_pop;
		} catch (e) {
			
		}
        
		wd_pop.focus();

		return wd_pop;
	}
	
	function Center_Fixed_Popup3(s_url, s_name, s_width, s_height, s_scroll) {
		var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
		//alert(aw);
        
		//alert(ah);
		
		var xpos;
		var ypos;
		xpos=((aw - eval(s_width))/2);
		ypos=((ah - eval(s_height))/2);
		//ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes width="+s_width+" height="+s_height+",top="+((aw - eval(s_width))/2)+",left="+((ah - eval(s_height))/2);
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes, width="+s_width+" ,height="+s_height+",top="+ypos+",left="+xpos;
		//ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars="+s_scroll+", status=yes width="+s_width+" height="+s_height;
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

       // var version = navigator.appVersion;
        //var addHeight = 0;
        //if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		//wd_pop.blur();
		//wd_pop.resizeTo(s_width, s_height+addHeight);
        
		//wd_pop.moveTo(((aw - eval(s_width))/2),((ah - eval(s_height))/2));
		wd_pop.focus();

		return wd_pop;
	}
	function Center_Fixed_Popup4(s_url, s_name, s_width, s_height, s_scroll) {
		var ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars="+s_scroll+", status=yes, width="+s_width+", height="+s_height;
		var wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
			return;
		}
	}
	
	function Center_Fixed_Popup_Knowledge(s_url, s_name, s_width, s_height, s_scroll, s_resize) {
		var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
		var xpos;
		var ypos;
		xpos=((aw - eval(s_width))/2);
		ypos=((ah - eval(s_height))/2);
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes, width="+s_width+" ,height="+s_height+",top="+ypos+",left="+xpos +",resizable="+s_resize;
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
		   alert("현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.");
		   return;
		}
		wd_pop.focus();

		return wd_pop;
	}

	function Center_Fixed_Popup_Preview(s_url, s_name, s_width, s_height, s_scroll) {
		
		var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
		
		var xpos;
		var ypos;
		xpos=((aw - eval(s_width))/2);
		ypos=((ah - eval(s_height))/2);
		//ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes width="+s_width+" height="+s_height+",top="+((aw - eval(s_width))/2)+",left="+((ah - eval(s_height))/2);
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes, width="+s_width+", height="+s_height+",top="+ypos+",left="+xpos;
		
//		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes width="+s_width+" height="+s_height;
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		//wd_pop.blur();
		//wd_pop.resizeTo(s_width, s_height+addHeight);
        //var aw = window.screen.availWidth;
        //var ah = window.screen.availHeight;
		//wd_pop.moveTo(((aw - eval(s_width))/2),((ah - eval(s_height))/2));
		wd_pop.focus();

		return wd_pop;
	}
	
	function Center_Fixed_Popup_Preview2(s_url, s_name, s_width, s_height, s_scroll, s_top, s_left) {
		var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
		
		var xpos;
		var ypos;
		xpos=((aw - eval(s_width))/2);
		ypos=((ah - eval(s_height))/2);
		
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes, width="+s_width+", height="+s_height+", top="+ypos+", left="+xpos;
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		//wd_pop.blur();
		//wd_pop.resizeTo(s_width, s_height+addHeight);
        //var aw = window.screen.availWidth;
        //var ah = window.screen.availHeight;
		//wd_pop.moveTo(((aw - eval(s_width))/2),((ah - eval(s_height))/2));
		wd_pop.focus();

		return wd_pop;
	}

	function Contents_Popup(s_url, s_val, s_name, s_width, s_height) {
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars=no, status=yes width=400 height=400";
		wd_pop = window.open(s_url+"?"+s_val, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

		wd_pop.blur();
		wd_pop.resizeTo(s_width, s_height);
		wd_pop.moveTo(((screen.availwidth - eval(s_width))/2),((screen.availheight - eval(s_height))/2));
		wd_pop.focus();
		return wd_pop;
	}

	function Contents_Popup2(s_url, s_name) {
		//ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars=yes, status=yes width=400 height=400";
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars=no, status=yes width=1024 height=700";
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

		return wd_pop;
	}

	function getBrowserVersion(){
	  var version = navigator.appVersion;

	}

	function LeftTopZero_Popup(s_url, s_name, s_width, s_height, s_scroll) {
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=yes, scrollbars="+s_scroll+", status=yes, top=0,left=0,width="+s_width+" ,height="+s_height;
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		//wd_pop.blur();
		//wd_pop.resizeTo(s_width, s_height+addHeight);

		//wd_pop.moveTo(0,0);
		wd_pop.focus();

		return wd_pop;
	}

	function LeftMove_Popup(s_url, s_name, s_width, s_height, s_scroll) {
		ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars="+s_scroll+", status=yes width="+s_width+" height="+s_height;
		wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		wd_pop.blur();
		wd_pop.resizeTo(s_width, s_height+addHeight);
		wd_pop.moveTo(450,0);
		wd_pop.focus();

		return wd_pop;
	}

	/**
	 * 입력된 숫자값을 지정된 소숫점 자릿수로 Round해서 값을 리턴한다.<p>
	 * ex) fncRoundPrecision(300.12345678,3) <p>
	 * Result ) 300.123
	 */
	function RoundPrecision(val, precision){
	   var p = Math.pow(10, precision);
	   return Math.round(val * p) / p;
	}

    /**
     * 셀렉트 박스의 option을 모두 삭제한다.
     */
	function selectbox_remove_all(obj) {
		for(i=obj.length; i >= 0; i--) {
				obj.remove(i);
		}
	}

    /**
     * 셀렉트 박스의 값과 일치하는 option을 삭제한다.
     */
	function selectbox_remove(obj, s_val) {
		for(i=0; i< obj.length; i++) {
			if(obj.options[i].value==s_val) {
				obj.remove(i);
			}
		}
	}

    /**
     * 셀렉트 박스의 option을 생성한다.
     */
	function selectbox_insert(obj, s_text, s_val, opt) {
		var optionIndex = obj.length;
		obj.options[optionIndex] = new Option(s_text,s_val,false,false);
		
		if(opt != null && opt != ""){
			jQuery(obj.options[optionIndex]).attr("opt", opt);
		}else{
			jQuery(obj.options[optionIndex]).attr("opt", "");
		}
	}

    function selectbox_insertlist(targetid, list){
        var targetObj = document.getElementById(targetid);
        var info;
        // target의 모든 데이터를 삭제해준다.
        selectbox_deletelist(targetid);
        // 가져온 데이터를 넣어준다.
		if(list != null && list.length > 0){
			lstIndex		=	list.length;
			for(var i = 0; i < list.length;i++){
			    info		=	list[i];
			    selectbox_insert(targetObj,info["CODENM"],info["CODE"])
			}
		}

    }
    
    function selectbox_insertlist2(targetid, list){
        var targetObj = document.getElementById(targetid);
        var info;
        // target의 모든 데이터를 삭제해준다.
        selectbox_deletelist(targetid);
        // 가져온 데이터를 넣어준다.
		if(list != null && list.length > 0){
			lstIndex		=	list.length;
			for(var i = 0; i < list.length;i++){
			    info		=	list[i];
			    selectbox_insert(targetObj,info["CODENM"]+"차",info["CODE"])
			}
		}

    }
    
    function selectbox_insertlist3(targetid, list){
        var targetObj = document.getElementById(targetid);
        var info;
        // target의 모든 데이터를 삭제해준다.
        selectbox_deletelist(targetid);
        // 가져온 데이터를 넣어준다.
		if(list != null && list.length > 0){
			lstIndex		=	list.length;
			for(var i = 0; i < list.length;i++){
			    info		=	list[i];
			    selectbox_insert(targetObj,info["CODENM"]+"기"+" ("+addDateFormatStr2(info["CODE_STRTDT"])+"~"+addDateFormatStr2(info["CODE_ENDDT"])+")",info["CODE"], info["OPT"])
			}
		}
    }
    
    function selectbox_insertlist(targetid, list, selectval){
        var targetObj = document.getElementById(targetid);
        var info;
        // target의 모든 데이터를 삭제해준다.
        selectbox_deletelist(targetid);
        // 가져온 데이터를 넣어준다.
        var selected = false;
		if(list != null && list.length > 0){
			lstIndex		=	list.length;
			for(var i = 0; i < list.length;i++){
			    info		=	list[i];
			    if(selectval == info["CODE"]) selected = true;
			    else selected = false;
			    selectbox_selectedinsert(targetObj,info["CODENM"],info["CODE"],selected,info["OPT"]);
			}
		}

    }

	function selectbox_selectedinsert(obj, s_text, s_val, selected, opt) {
		if(obj != null){
			var optionIndex = obj.length;
			obj.options[optionIndex] = new Option(s_text,s_val,selected,selected);
			
			if(opt != null && opt != ""){
				jQuery(obj.options[optionIndex]).attr("opt", opt);
			}else{
				jQuery(obj.options[optionIndex]).attr("opt", "");
			}
		}
	}

    function selectbox_selectedinsertlist(targetid, list, selectval){
        var targetObj = document.getElementById(targetid);
        var info;
        // target의 모든 데이터를 삭제해준다.
        selectbox_deletealllist(targetid);

        // 가져온 데이터를 넣어준다.
        var selected = false;
		if(list != null && list.length > 0){
			lstIndex		=	list.length;
			for(var i = 0; i < list.length;i++){
			    info		=	list[i];
			    if(selectval == info["CODE"]) selected = true;
			    else selected = false;
			    selectbox_selectedinsert(targetObj,info["CODENM"],info["CODE"],selected);
			}
		}
    }

    /**
     * 객체에 해당 값을 선택처리 해준다.
     * @param obj
     * @param s_val
     * @return
     */
	function selectbox_selected(obj, s_val) {
		for(var i=0; i< obj.length; i++) {
			if(obj.options[i].value==s_val) {
				obj.options[i].selected = true;
			}
		}
	}


   /**
   * 셀렉트 박스의 모든 option을 삭제해준다.
   **/
   function selectbox_deletelist(targetid){
        var targetObj = document.getElementById(targetid);
        
        if(targetObj != null){
    		for(i=targetObj.length; i > 0; i--) {
				targetObj.remove(i);
    		}        	
        }
   }

   function selectbox_deletealllist(targetid){
        var targetObj = document.getElementById(targetid);
		for(i=targetObj.length; i >= 0; i--) {
				targetObj.remove(i);
		}
   }

	var checkbox_flag = true;
	function checkBoxSelectAll(obj) {
	    try
	    {
	        if(Checkbox_Check(obj)) {
	            for(i=0; i< obj.length; i++) {
	                if (Checkbox_Checked(obj[i])) {
	                    obj[i].checked=false;
	                } else {
	                    obj[i].checked=true;
	                }
	            }
	        } else {
	            if (Checkbox_Checked(obj)) {
	                obj.checked=false;
	            } else {
	                obj.checked=true;
	            }
	        }
	        if(checkbox_flag==true) {
	            checkbox_flag=false;
	        } else  {
	            checkbox_flag=true;
	        }
	    }catch (e) {
	        window.status = "error";
	    }
	}

	HashMap = function()
	{
	   this.keys = new Array();
	   this.values = new Array();
	   /**
	    * Removes all mappings from this map.
	    */
	   this.clear = function()
	   {
	   	  this.keys.splice(0, this.keys.length);
	   	  this.values.splice(0, this.values.length);
	   }
	   /**
	    * Returns true if this map contains a mapping for the specified key.
	    */
	   this.containsKey = function(key)
	   {
	      return this.indexKeyOf(key);
	   }

	   this.indexKeyOf = function(obj, startIndex) {
	        if (startIndex == null) {
	            startIndex = 0;
	        }

	        if (startIndex < this.keys.length && startIndex >= 0) {
	            for (var i=startIndex; i < this.keys.length; i++) {
	                if (this.keys[i] == obj) {
	                    return i;
	                }
	            }
	            return -1;
	        } else {
	            throw new Exception("Array Index Error. vector.indexOf()");
	        }
	   }

	   /**
	    * Returns true if this map maps one or more keys to the specified value.
	    */
	   this.containsValue = function(value)
	   {
	      return this.indexValueOf(value);
	   }

	   this.indexValueOf = function(obj, startIndex) {
	        if (startIndex == null) {
	            startIndex = 0;
	        }

	        if (startIndex < this.values.length && startIndex >= 0) {
	            for (var i=startIndex; i < this.values.length; i++) {
	                if (this.values[i] == obj) {
	                    return i;
	                }
	            }
	            return -1;
	        } else {
	            throw new Exception("Array Index Error. vector.indexOf()");
	        }
	   }

	   /**
	    * Returns true if this map contains no key-value mappings.
	    */
	   this.isEmpty = function()
	   {
	   	  return (this.size() == 0);
	   }
	   /**
	    * Associates the specified value with the specified key in this map.
	    */
	   this.put = function(key, value)
	   {
	      this.keys[this.keys.length] = key;
	      this.values[this.values.length] = value;
	   }
	   /**
	    * Returns the value to which the specified key is mapped in this identity hash map, or null if the map contains no mapping for this key
	    */
	   this.get = function(key)
	   {
	      var value = null;
	      for(var i = 0; i < this.keys.length; i++)
	      {
	         if(this.keys[i] == key) value = this.values[i];
	      }
	      return value;
	   }
	   /**
	    * Returns the number of key-value mappings in this map.
	    */
	   this.size = function()
	   {
	     return this.keys.length;
	   }

	   this.toKeyString = function() {
	        return this.keys.join(",");
	   }

	   this.toValueString = function() {
	        return this.values.join(",");
	   }

	   this.remove = function(key){
	      for(var i = 0; i < this.keys.length; i++)
	      {
	         if(this.keys[i] == key) {
			        this.values[i] = null;
					this.keys[i] = null;
			 }
	      }
	   }
	}


	/**
	 * 초를 시간형식(HHHH:MM:SS)으로 변환
	 */
	function convertSecondsToTime(ts) {
		var hour	= 0;
		var min		= 0;
		var sec		= (ts % 60);

		ts -= sec;
		var tmp = (ts % 3600);
		ts -= tmp;

		if ((ts % 3600) != 0 ) {
			hour = 0;
		}
		else {
			hour = (ts / 3600);
		}

		if ( (tmp % 60) != 0 ) {
			min = 0;
		}
		else {
			min = (tmp / 60);
		}

		if ((new String(hour)).length < 2) {
			hour = "0"+hour;
		}
		if ((new String(min)).length < 2) {
			min = "0"+min;
		}
		if ((new String(sec)).length < 2) {
			sec = "0"+sec;
		}

		var rtnVal = hour+":"+min+":"+sec;

		return rtnVal;
	}
    /**
    * HTML 태그를 제거해준다.
    **/
	function stripHTMLtag(string) {
	   var objStrip = new RegExp();
	   objStrip = /[<][^>]*[>]/gi;
	   return string.replace(objStrip, "");
    }

    /**
     * 웹에디터 내용을 리턴한다
     **/
	function FCKeditor(instance){
		var oEditor = FCKeditorAPI.GetInstance(instance) ;
		var div = document.createElement("DIV");
		div.innerHTML = oEditor.GetXHTML();
		var s = div.innerText;
		return s;
	}

	function FCKeditorHTML(instance){
		var oEditor = FCKeditorAPI.GetInstance(instance) ;
		var div = document.createElement("DIV");

		return oEditor.GetXHTML();
	}

	var browserType			= checkBrowserType();	// 사용자 브라우져 타입


	/**
	 * 사용자 브라우져 체크
	 */
	function checkBrowserType() {
		var brType = "IE";
		if (document.all){
			brType = "IE";
		}
		else if (document.getElementById){
			brType = "NE";
		}
		else if (document.layers){
			brType = "NE4";
		}
		return brType;
	}


	/**
	 * 마우스 X 위치
	 */
	function checkMouseX(evt) {
		var xCoord = 0;
		if (browserType == "IE"){
			xCoord = event.clientX;
		}
		else if (browserType == "NE"){
			xCoord = evt.pageX;
		}
		return xCoord;
	}


	/**
	 * 마우스 Y 위치
	 */
	function checkMouseY(evt) {
		var yCoord = 0;
		if (browserType == "IE"){
			yCoord = event.clientY;
		}
		else if (browserType == "NE"){
			yCoord = evt.pageY;
		}
		return yCoord;
	}


	/**
	 * 마우스 버튼값 구하기
	 * @return left,center,right
	 */
	function getMouseButton(evt) {
		var button 		= "left";
		var mouseKey	= 1;
		if (browserType == "IE") {
			mouseKey = event.button
			if (mouseKey == 1) {
				button = "left";
			}
			else if (mouseKey == 2) {
				button = "right";
			}
			else if (mouseKey == 4) {
				button = "center";
			}
		}
		else {
			mouseKey = evt.which;
			if (mouseKey == 1) {
				button = "left";
			}
			else if (mouseKey == 2) {
				button = "center";
			}
			else if (mouseKey == 3) {
				button = "right";
			}
		}
		return button;
	}


	/**
	 * 객체의 넓이 구하기
	 */
	function getWidth(obj) {
		if (obj) {
			var objWidth = obj.offsetWidth;
			return objWidth;
		}
	}


	/**
	 * 객체의 높이 구하기
	 */
	function getHeight(obj) {
		if (obj) {
			var objHeight = obj.offsetHeight;
			return objHeight;
		}
	}


	/**
	 * 윈도우 넓이 구하기
	 */
	function getWindowWidth() {
		var winWidth = 0;
		if (browserType == "IE") {
			winWidth = document.documentElement.offsetWidth;
		}
		else if (browserType == "NE") {
			winWidth = window.innerWidth;
		}
		return winWidth;
	}


	/**
	 * 윈도우 높이 구하기
	 */
	function getWindowHeight() {
		var winHeight = 0;
		if (browserType == "IE") {
			winHeight = document.documentElement.offsetHeight;
		}
		else if (browserType == "NE") {
			winHeight = window.innerHeight;
		}
		return winHeight;
	}


	/**
	 * 스크롤값(X) 구하기
	 */
	function getScrollX() {
		var scrollX		= 0;

	    if (browserType == "NE") {
	        scrollX		= window.pageXOffset;
	    }
	    else {
	        scrollX		= document.documentElement.scrollLeft;
	    }

		return scrollX;
	}


	/**
	 * 스크롤값(Y) 구하기
	 */
	function getScrollY() {
		var scrollY		= 0;

		if (browserType == "NE") {
	        scrollY		= window.pageYOffset;
	    }
	    else {
	        scrollY		= document.documentElement.scrollTop;
	    }

		return scrollY;
	}


	/**
	 * 객체 가져오기
	 * @param objName(객체명)
	 */
	function getObject(objName) {
		var returnObj = null;
		if (browserType == "IE") {
			returnObj = eval("document.all."+objName);
		}
		else if (browserType == "NE") {
			returnObj = document.getElementById(objName);
		}
		return returnObj;
	}


	/**
	 * 객체 DISPLAY 변경
	 */
	function changeDisplay(obj) {
		if (obj) {
			var displayStyle = obj.style.display;
			if (displayStyle == "block") {
				offDisplay(obj);
			}
			else if (displayStyle == "none") {
				onDisplay(obj);
			}
		}
	}


	/**
	 * DISPLAY on
	 */
	function onDisplay(obj) {
		if (obj) {
			obj.style.display = "block";
		}
	}


	/**
	 * DISPLAY off
	 */
	function offDisplay(obj) {
		if (obj) {
			obj.style.display = "none";
		}
	}


	/**
	 * 객체 보이기
	 */
	function visibleObject(obj) {
		if (obj) {
			obj.style.visibility = "visible";
		}
	}


	/**
	 * 객체 숨기기
	 */
	function hiddenObject(obj) {
		if (obj) {
			obj.style.visibility = "hidden";
		}
	}


	/**
	 * 객체 선택시 색상 반전
	 */
	function onSelectColor(obj) {
		if (obj) {
			obj.style.backgroundColor	= "highlight";
			obj.style.color				= "highlighttext";
		}
	}


	/**
	 * 객체 선택 비활성 색상 복원
	 */
	function offSelectColor(obj, color, bgColor) {
		if (obj) {
			if (color == null) {
				color = "";
			}
			if (bgColor == null) {
				bgColor = "";
			}
			obj.style.color				= color;
			obj.style.backgroundColor	= bgColor;
		}
	}


	/*
	 * 객체 사이즈 설정
	 */
	function resizeObject(obj, newWidth, newHeight) {
		if (obj) {
			obj.style.width     = newWidth+"px";
			obj.style.height    = newHeight+"px";
		}
	}


	/**
	 * 객체 넓이 설정
	 */
	 function resizeWidth(obj, newWidth) {
	 	if (obj) {
			obj.style.width		= newWidth+"px";
		}
	 }


	/**
	 * 객체 높이 설정
	 */
	function resizeHeight(obj, newHeight) {
		if (obj) {
			obj.style.height	= newHeight+"px";
		}
	}


	/**
	 * 객체 이동 설정 (위치)
	 */
	function moveObject(obj, topPosition, leftPosition) {
		if (obj) {
			if (nullToEmpty(topPosition) != "") {
				obj.style.top       = topPosition+"px";
			}
			if (nullToEmpty(leftPosition) != "") {
				obj.style.left      = leftPosition+"px";
			}
		}
	}


	/**
	 * 객체의 위치 (document 내에서 절대적인 위치)
	 */
	function getPosition(obj) {
		var pos = { x:0, y:0 };

		if ( document.layers ) {
			pos.x = obj.x;
			pos.y = obj.y;
		}
		else {
			do {
				pos.x += parseInt( obj.offsetLeft );
				pos.y += parseInt( obj.offsetTop );
				obj = obj.offsetParent;
			} while (obj);
		}
		return pos;
	}


	/**
	 * 객체의 왼쪽 위치 (상대위치)
	 */
	function getLeftPosition(obj) {
		var value = 0;
		if (obj) {
			if (browserType == "IE") {
				if (obj.currentStyle.left == "auto") {
					value = 0;
				}
				else {
					value = parseInt(obj.currentStyle.left);
				}
			}
			else {
				value = parseInt(obj.style.left);
			}
		}
		return value;
	}


	/**
	 * 객체 위쪽 위치 (상대위치)
	 */
	function getTopPosition(obj) {
		var value = 0;
		if (obj) {
			if (browserType == "IE") {
				if (obj.currentStyle.top == "auto") {
					value = 0;
				}
				else {
					value = parseInt(obj.currentStyle.top);
				}
			}
			else {
				value = parseInt(obj.style.top);
			}
		}
		return value;
	}


	/**
	 * 객체의 속성값 구하기
	 */
	function getObjectAttribute(obj, attrName) {
		var attrValue	= null;

		if (obj) {
			attrValue	= obj.getAttribute(attrName);
		}
		return attrValue;
	}


	/**
	 * 객체ID 구하기
	 */
	function getObjectId(obj) {
		var objectId = getObjectAttribute(obj, "id");
		return objectId;
	}

	/**
	 * 문자열에서 구분자로 분자열 분리하기
	 * @param str		문자열
	 * @param idx		구분자를 기준으로 n번째 문자열 추출
	 * @param divideStr 구분문자
	 */
	function getDivideString(str, idx, divideChar) {
		var result = "";
		if (nullToEmpty(str) != "") {
			var strArr = str.split(divideChar);
			result = strArr[idx-1];
		}

		if (!result) {
			result = "";
		}

		return result;
	}

	/**
	 * null 값을 ""으로 변환
	 */
	function nullToEmpty(value) {
		if (value == null) {
			value = "";
		}
		return value;
	}

	/**
	 * 객체를 맨 위로 위치하기
	 */
	var makeOnTopCount = 0;
	function makeOnTop(obj) {
		if (obj) {
			var daiz;
			var max = 0;
			var da = null;
			if (browserType == "IE") {
				da = document.all;
			}
			else if (browserType == "NE") {
				da = document.getElementsByTagName("div");
			}

			makeOnTopCount += 1;
			obj.style.zIndex  = da.length + makeOnTopCount;
		}
	}

	/**
	 * Attribute의 Value 추출 (name=value 에서 value 추출
	 */
	function getAttributeValue(attr, name) {
		attr = nullToEmpty(attr).toLowerCase();
		var value = "";
		if (attr.length > 1) {
			var idx1 = attr.indexOf(name);
			if (idx1 != -1) {
				var idx2 = attr.indexOf("=",idx1);
				if (idx2 != -1) {
					var idx3 = attr.indexOf(",",idx2);
					var oValue = "";
					if (idx3 == -1) {
						oValue = attr.substring(idx2+1);
					}
					else {
						oValue = attr.substring(idx2+1,idx3);
					}
					for (var i = 0; i < oValue.length; i++) {
						if (oValue.charCodeAt(i) != 32) {
							value += oValue.charAt(i);
						}
					}

				}
			}

		}
		return value;
	}

	/**
	 * 이미지 변경
	 */
	function changeImage(imgObj, imgSrc) {
		imgObj.src = imgSrc;
	}

	//팝업창 화면중앙
	function MM_openWindowCenter(theURL,winName,width,height,features) { //v2.0
	  xpos = (screen.availWidth-width) > 0 ? (screen.availWidth-width) / 2 : 0;
	  ypos = (screen.availHeight-height) > 0 ? (screen.availHeight-height) / 2 : 0;

	  window.open(theURL,winName,"left="+xpos+",top="+ypos+",width="+width+",height="+height+","+features);
	}

	/**
	* 특수문자, 한글 제외 스크립트
	**/
	function checkNonKr(obj) {
		tvalue = obj
		onvalue = tvalue.value;
		count=0
		for (i=0;i<onvalue.length;i++){
			ls_one_char = onvalue.charAt(i);

			if(ls_one_char.search(/[0-9|a-z|A-Z]/) == -1) {
				count++;
			}
		}
		if(count!=0) {
			//alert("숫자, 영문만 사용 가능합니다")
			tvalue.value = "";
			tvalue.focus();
			return false;
		}
		else {
			//alert(onvalue + "를 입력 했습니다.");
			return true;
		}
	}


	/**
	* 특정 form의 특정name에 대한 chkbox를 모두 value로 setting
	**/
	function setChkboxAll(formname, name, value) {
		for (var i = 0; i < formname.length ; i++) {
			if (name == formname.elements[i].name)
				 formname.elements[i].checked = value;
		}
	}

	function resizeIframeHnW(curFrame) {
		curFrame.style.display = "block";
		if (curFrame.contentDocument && curFrame.contentDocument.body.offsetHeight) { //ns6 syntax
			curFrame.style.height = curFrame.contentDocument.body.offsetHeight + 16 + "px";
		}
		else if (curFrame.Document && curFrame.Document.body.scrollHeight) { //ie5+ syntax
			curFrame.style.height = curFrame.Document.body.scrollHeight + "px";
		}
		if (curFrame.contentDocument && curFrame.contentDocument.body.offsetWidth) { //ns6 syntax
			curFrame.style.width = curFrame.contentDocument.body.offsetWidth + 16 + "px";
		}
		else if (curFrame.Document && curFrame.Document.body.scrollWidth) { //ie5+ syntax
			curFrame.style.width = curFrame.Document.body.scrollWidth + "px";
		}

	}
	function resizeIframe(curFrame, defaultHeight) {

		curFrame.style.display = "block";
		if (defaultHeight == null) {
			defaultHeight = 0;
		}

		var height = 0;
		if (curFrame.contentDocument && curFrame.contentDocument.body.offsetHeight) { //ns6 syntax
			height = curFrame.contentDocument.body.offsetHeight + 16;
		}
		else if (curFrame.Document && curFrame.Document.body.scrollHeight) { //ie5+ syntax
			height = curFrame.Document.body.scrollHeight + 16;
		}
		if (height < defaultHeight) {
			height = defaultHeight;
		}
		curFrame.style.height = height+"px";
	}

	function resizeIframe(curFrame, defaultWeight, defaultHeight) {
		curFrame.style.display = "block";
		if (defaultHeight == null) {
			defaultHeight = 0;
		}

		var height = 0;
		if (curFrame.contentDocument && curFrame.contentDocument.body.offsetHeight) { //ns6 syntax
			height = curFrame.contentDocument.body.offsetHeight + 16;
		}
		else if (curFrame.Document && curFrame.Document.body.scrollHeight) { //ie5+ syntax
			height = curFrame.Document.body.scrollHeight + 16;
		}
		if (height < defaultHeight) {
			height = defaultHeight;
		}
		curFrame.style.width  = defaultWeight+"px";
		curFrame.style.height = height+"px";
	}

	function resizeWindow(curFrame) {
		if (curFrame.contentDocument && curFrame.contentDocument.body.offsetHeight) { //ns6 syntax
			curFrame.style.height = curFrame.contentDocument.body.offsetHeight + 16 + "px";
		}
		else if (curFrame.Document && curFrame.Document.body.scrollHeight) { //ie5+ syntax
			curFrame.style.height = curFrame.Document.body.scrollHeight + "px";
		}
		if (curFrame.contentDocument && curFrame.contentDocument.body.offsetWidth) { //ns6 syntax
			curFrame.style.width = curFrame.contentDocument.body.offsetWidth + 16 + "px";
		}
		else if (curFrame.Document && curFrame.Document.body.scrollWidth) { //ie5+ syntax
			curFrame.style.width = curFrame.Document.body.scrollWidth + "px";
		}

	}

	function Resize_Contents_Frame(width){
		var Frame_Body  = document.body;
		//var width = Frame_Body.clientWidth+10;//Frame_Body.scrollWidth + (Frame_Body.offsetWidth-Frame_Body.clientWidth);
		var height = Frame_Body.scrollHeight+30;//Frame_Body.scrollHeight + (Frame_Body.offsetHeight-Frame_Body.clientHeight);

		this.resizeTo(width, height)
	}

	function popupAutoResize() {
	    var thisX = parseInt(document.body.scrollWidth);
	    var thisY = parseInt(document.body.scrollHeight);
	    var maxThisX = screen.width - 50;
	    var maxThisY = screen.height - 50;
	    var marginY = 0;
	    // 브라우저별 높이 조절. (표준 창 하에서 조절해 주십시오.)
	    if (navigator.userAgent.indexOf("MSIE 8") > 0) { // IE 6.x
	    	marginY = 100;
	    } else if (navigator.userAgent.indexOf("MSIE 7") > 0) { // IE 6.x
	    	marginY = 80;
	    } else if(navigator.userAgent.indexOf("MSIE 6") > 0) { // IE 7.x
	    	 marginY = 45;
	    } else if(navigator.userAgent.indexOf("Firefox") > 0) { // FF
	    	marginY = 100;
	    } else if(navigator.userAgent.indexOf("Opera") > 0) { // Opera
	    	marginY = 30;
	    } else if(navigator.userAgent.indexOf("Netscape") > 0) {// Netscape
	    	marginY = -2;
	    } else {
	    	marginY = 100;
	    }
	    //alert( " thisX : " + thisX + ", marginY : " + marginY);
	    if (thisX > maxThisX) {
	        window.document.body.scroll = "yes";
	        thisX = maxThisX;
	    }
	    if (thisY > maxThisY - marginY) {
	        window.document.body.scroll = "yes";
	        thisX += 19;
	        thisY = maxThisY - marginY;
	    }
	    window.resizeTo(thisX+10, thisY+marginY);

	    // 센터 정렬
	    // var windowX = (screen.width - (thisX+10))/2;
	    // var windowY = (screen.height - (thisY+marginY))/2 - 20;
	    // window.moveTo(windowX,windowY);
	}

	function  getBrowserMargin(){
	    var marginY = 0;
	    //alert(navigator.userAgent);
		if (navigator.userAgent.indexOf("MSIE 7") > 0) { // IE 6.x
			marginY = 80;
		} else if(navigator.userAgent.indexOf("MSIE 6") > 0) { // IE 7.x
			 marginY = 45;
		} else if(navigator.userAgent.indexOf("Firefox") > 0) { // FF
			marginY = 100;
		} else if(navigator.userAgent.indexOf("Opera") > 0) { // Opera
			marginY = 30;
		} else if(navigator.userAgent.indexOf("Netscape") > 0) {// Netscape
			marginY = -2;
		} else {
			marginY = 100;
		}

		return marginY;
	}

	function getFileIcon(fileName) {
		var	ext			= "";
		var	iconImg		= "";
		if (fileName != "") {
			ext	= fileName.substring(fileName.length-3,fileName.length)
	        ext = ext.toLowerCase();

			if (ext == "gz" || ext == "zip" || ext == "rar" || ext == "arj"
				|| ext == "lzh" || ext == "tar" || ext == "cab" || ext == "alz") {
				iconImg			=	"zip";
			}
			else if (ext == "gif" || ext == "jpg" || ext == "bmp" || ext == "pcx"
				|| ext == "tif" || ext == "png" ) {
				iconImg			=	"image";
			}
			else if (ext == "exe" || ext == "com" || ext == "dll") {
				iconImg			=	"exe";
			}
			else if (ext == "htm" || ext == "html") {
				iconImg			=	"html";
			}
			else if (ext == "hwp") {
				iconImg			=	"hwp";
			}
			else if (ext == "mov" || ext == "avi" || ext == "mpg" || ext == "mpeg" || ext == "wmv") {
				iconImg			=	"mov";
			}
			else if (ext == "wav" || ext == "mod" || ext == "mid" || ext == "wma") {
				iconImg			=	"sound";
			}
			else if (ext == "txt" || ext == "log" || ext == "dat"
					|| ext == "ini" || ext == "sql") {
				iconImg			=	"text";
			}
			else if (ext == "xls" || ext == "csv") {
				iconImg			=	"xls";
			}
			else if (ext == "doc") {
				iconImg			=	"doc";
			}
			else if (ext == "ppt") {
				iconImg			=	"ppt";
			}
			else if (ext == "pdf") {
				iconImg			=	"pdf";
			}
			else {
				iconImg			=	"etc";
			}

			return	iconImg + ".gif";
		}
		else {
			return	"";
		}
	}
	
	function getThumIcon(fileName) {
		var	ext			= "";
		var	iconImg		= "";
		if (fileName != "") {
			ext = fileName.substr(fileName.lastIndexOf(".")+1);
	        ext = ext.toLowerCase();
	        
			if (ext == "avi" || ext == "mov" || ext == "mpg" || ext == "mpeg" || ext == "wmv" || ext == "asf" || ext == "rm" || ext == "flv" || ext == "mp4") {
				iconImg = "icon-movie.gif";
			}
			else if (ext == "mp3" || ext == "wav" || ext == "wma" || ext == "ogg") {
				iconImg = "sound.gif";
			}
			else if (ext == "pdf") {
				iconImg = "icon-pdf.gif";
			}
			else if (ext == "mind") {
				iconImg = "icon-mindmap.gif";
			}
			
			return iconImg;	
		}
		else {
			return	"";
		}
	}
	
	
	function getThumIconForPad(fileName) {
		var	ext			= "";
		var	iconImg		= "";
		if (fileName != "") {
			ext = fileName.substr(fileName.lastIndexOf(".")+1);
	        ext = ext.toLowerCase();
	        
			if (ext == "avi" || ext == "mov" || ext == "mpg" || ext == "mpeg" || ext == "wmv" || ext == "asf" || ext == "rm" || ext == "flv" || ext == "mp4") {
				iconImg = "feedMov";
			}
			else if (ext == "mp3" || ext == "wav" || ext == "wma" || ext == "ogg" ) {
				iconImg = "mic-ico";
			}
			else if (ext == "pdf") {
				iconImg = "feedPdf";
			}
			else if (ext == "mind") {
				iconImg = "feedMindmap";
			}
			
			return iconImg	
		}
		else {
			return	"";
		}
	}
	
	
	
	//공지사항 팝업 쿠키
	function setCookie( name, value, expiredays ) {
		var today = new Date();
		today.setDate( today.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
	}

	//공지사항 팝업 쿠키
	function getCookie(name) {
	  	var prefix = name + "=";
	  	var cookieStartIndex = document.cookie.indexOf(prefix);

		if(cookieStartIndex == -1) return null;

	  	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	  	if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;

	  	return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
	}

	/**
	* HTML 태그를 제거해준다.
	**/
	function stripHTMLtag(string) {
	   var objStrip = new RegExp();
	   objStrip = /[<][^>]*[>]/gi;
	   return string.replace(objStrip, "");
	}

	function setPng24(obj) {
	 obj.width=obj.height=1;
	 obj.className=obj.className.replace(/\bpng24\b/i,'');
	 obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	 obj.src='';
	 return '';
	 }

	function bluring(){
		if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
	}
	document.onfocusin=bluring;


	function replaceAll(str,orgStr,repStr)
	{
	    return str.split(orgStr).join(repStr);
	}


	/**
	 * 수직방향으로 같은 값을 가진 cell 을 merge 한다.
	 *

	 * [IE 6.0], [FireFox 2.0]

	 *
	 * <입력 파라미터>
	 * - table : Table 객체
	 * - startRowIdx : 테이블의 몇 번째 row 에서부터 merge 를 수행할 지 결정하는 row's Index
	 * - cellIdx : merge 하기 위한 테이블의 cell's Index
	 *
	 * <반환값>
	 * - 없음
	 *
	 * ex) var table = document.getElementById("tbl");
	 *     mergeVerticalCell(table, 0, 0);
	 *
	 */
	function mergeVerticalCell(table, startRowIdx, cellIdx) {
	  var rows            = table.getElementsByTagName("tr");
	  var numRows         = rows.length;
	  var numRowSpan      = 1;
	  var currentRow      = null;
	  var currentCell     = null;
	  var currentCellData = null;
	  var nextRow         = null;
	  var nextCell        = null;
	  var nextCellData    = null;

	  for (var i = startRowIdx; i < (numRows-1); i++) {   // i 는 row's index

	    // 새롭게 cell merge 를 해야하면,
	    // 현재(비교의 기준이 되는..) row, cell, data 구함
	    if (numRowSpan <= 1) {
	      currentRow      = table.getElementsByTagName('tr')[i];
	      currentCell     = currentRow.getElementsByTagName('td')[cellIdx];
	      currentCellData = currentCell.childNodes[0].data;
	    }


	    if (i < numRows-1) {  // 현재 row 가 마지막 row 가 아니면

	      // 다음 row, cell, data 구함
	      if (table.getElementsByTagName('tr')[i+1]) {
	        nextRow       = table.getElementsByTagName('tr')[i+1];
	        nextCell      = nextRow.getElementsByTagName('td')[cellIdx];
	        nextCellData  = nextCell.childNodes[0].data;

	        // 현재 cell == 다음 cell 이면, merge
	        if (currentCellData == nextCellData) {
	          numRowSpan              += 1;
	          currentCell.rowSpan     = numRowSpan;
	          nextCell.style.display  = 'none';

	        // 현재 cell != 다음 cell 이면,
	        // 새로운 현재(비교의 기준이 되는..) cell 을 구할 수 있도록 초기화
	        } else {
	          numRowSpan = 1;

	        }
	      }
	    }
	  }
	}


	/**
	 * 수직방향으로 같은 값을 가진 cell 을 merge 한다.
	 * 단, mergeVerticalCell() 함수를 통해서 먼저 특정 cell 들이 merge 된 이후,
	 * merge 된 cell 을 기준으로 merge 된 cell 의 범위 내에 포함되는 row 의 cell 에 대해서만 merge 한다.
	 *

	 * [IE 6.0], [FireFox 2.0]

	 *
	 * <입력 파라미터>
	 * - table : Table 객체
	 * - startRowIdx : 테이블의 몇 번째 row 에서부터 merge 를 수행할 지 결정하는 row's Index
	 * - basicCellIdx : 이미 merge 된 cell 중에서 기준이 되는 cell's index
	 * - cellIdx : merge 하기 위한 테이블의 cell's Index
	 *
	 * <반환값>
	 * - 없음
	 *
	 * ex) var table = document.getElementById("tbl");
	 *     mergeVerticalCell(table, 0, 0);
	 *     mergeDependentVerticalCell(table, 0, 0, 1);
	 *
	 */
	function mergeDependentVerticalCell(table, startRowIdx, basicCellIdx, cellIdx) {
	  var rows                  = table.getElementsByTagName("tr");
	  var numRows               = rows.length;
	  var numRowSpan            = 1;  // 초기화
	  var countLoopInBasicMerge = 1;  // 초기화   merge 된 cell 내에서의 반복루프 처리 횟수
	  var currentRow            = null;
	  var currentCell           = null;
	  var currentCellData       = null;
	  var nextRow               = null;
	  var nextCell              = null;
	  var nextCellData          = null;
	  var basicRowSpan          = null;


	  for (var i = startRowIdx; i < (numRows-1); i++) {   // i 는 row's index


	    // 기준 rowSpan 값 설정
	    // basicCellIdx 에 해당하는 cell 의 rowSpan 값이 기준 rowSpan 범위가 됨.
	    if (i == startRowIdx || (countLoopInBasicMerge== 1 && numRowSpan == 1)) {
	      basicRowSpan  = table.getElementsByTagName('tr')[i].getElementsByTagName("td")[basicCellIdx].rowSpan;
	    }



	    // 새롭게 cell merge 를 해야하면,
	    // 현재(비교의 기준이 되는..) row, cell, data 구함
	    if (numRowSpan <= 1) {
	      currentRow      = table.getElementsByTagName('tr')[i];
	      currentCell     = currentRow.getElementsByTagName('td')[cellIdx];
	      currentCellData = currentCell.childNodes[0].data;
	    }


	    if (i < numRows-1) {  // 현재 row 가 마지막 row 가 아니면

	      if (countLoopInBasicMerge < basicRowSpan) {  // 기준 row 의 rowSpan 값을 초과해서 merge 할 수 없음.
	        // 다음 row, cell, data 구함
	        if (table.getElementsByTagName('tr')[i+1]) {
	          nextRow       = table.getElementsByTagName('tr')[i+1];
	          nextCell      = nextRow.getElementsByTagName('td')[cellIdx];
	          nextCellData  = nextCell.childNodes[0].data;

	          // 현재 cell == 다음 cell 이면, merge
	          if (currentCellData == nextCellData) {
	            numRowSpan              += 1;
	            currentCell.rowSpan     = numRowSpan;
	            nextCell.style.display  = 'none';


	          // 현재 cell != 다음 cell 이면,
	          // 새로운 현재(비교의 기준이 되는..) cell 을 구할 수 있도록 초기화
	          } else {
	            numRowSpan = 1;

	          }
	        }



	        countLoopInBasicMerge++;



	      // 기준 rowSpan 범위 이상이면,
	      // 새로운 rowSpan 을 설정할 수 있도록 값을 초기화

	      } else {
	        countLoopInBasicMerge = 1;
	        numRowSpan = 1;

	      }
	    }
	  }
	}

	//---- flash view -----//
	function ShowFlash(url, width, height){
		document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '" VIEWASTEXT>');
		document.write('<param name="allowScriptAccess" value="always">');
		document.write('<param name="movie" value="' + url + '">');
		document.write('<param name="quality" value="high">');
		document.write('<param name="menu" value="false">');
		document.write('<PARAM NAME=wmode VALUE=transparent>');
		document.write('<embed src="' + url + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" allowScriptAccess="always" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '"></embed>');
		document.write('</object>');
	}


	function log(){
		if ('console' in self && 'log' in console) console.log(arguments);
	}
	
	function log2(arg){
		if ('console' in self && 'log' in console) console.log(arg);
	}

	function getReplace(str){
		if(str != undefined)
			return str.toString().replace(/\n/g,"<br>");
		return str;
	}

	function getHashTagReplace(str){
		if(str != undefined)
			return str.toString().replace("#","").replace("_","");
		return str;
	};

	function formRealValidation(){
		var forms = document.forms;
		var flength = forms.length;
		for(var i=0; i < flength; i++){
			var form = forms[i];
			for (i = 0; i < form.elements.length; i++) {
	            var obj = form.elements[i];
	            var type = obj.type;
	            if(type == "text"){
	            	var isEvent = false;
	            	var dataType = obj.getAttribute("dataType");
	            	if(dataType == "integer" || dataType == "number")
	            		isEvent = true;
		            if(isEvent){
		            	if(obj.attachEvent){
		            		obj.attachEvent("onkeydown", onlyNumberInput);
		            	} else {
		            		obj.addEventListener("keydown", onlyNumberInput, false);
		            	}
		            }
	            }
			}
		}
	}

	function onlyNumberInput(event, id, sel){
		onlyNumber(event);
		onlyNumberInputCheck(id, sel);

	}

	function onlyNumber(event){
		var code = event.keyCode;
	 	event.returnValue = false;
	 	if ((code > 32 && code < 48) || (code > 57 && code < 61) || (code > 61 && code < 65) || (code > 90 && code < 97) || (code > 34 && code < 41) || (code > 47 && code < 58) || (code > 95 && code < 106) || code == 8 || code == 9 || code == 13 || code == 46){
	 		event.returnValue = true;
	  		return;
	 	}
	 	if(!event.returnValue && event.returnValue != undefined){
	 		event.returnValue = false;
	 	} else {
	 		event.preventDefault();
	 	}
	}

	var pos = new Array("1","2","3","4");
	var agent = window.navigator.userAgent;
	var busy = false;
	function onlyNumberInputCheck(id, sel){
		if( !busy && pos[sel] != document.getElementById(id).value && document.getElementById(id).value !="") {
		    busy = true;

		      var str = document.getElementById(id).value;

		        if( !isNumCheck(str)) {
		          if(agent.indexOf("Macintosh") != -1)
		            {
		        	    document.getElementById(id).value="";
		        	    //다국어원본 : 숫자를 입력해 주세요.
		                alert(MESSAGE["numberInput"][jslang]); //다국어phs
		                document.getElementById(frm).value="";
		                pos[sel] = "";
		            }
		            else {
		            	//다국어원본 : 숫자를 입력해 주세요.
		            	alert(MESSAGE["numberInput"][jslang]); //다국어phs
		                document.getElementById(id).value="";
		            }
		        }  else { pos[sel] = document.getElementById(id).value; }

		    busy = false;
		    }
		  else { setTimeout("onlyNumberInputCheck('"+id+"')",10); }
	}

	function isCharsCehck(input,chars)
	{
	  for(var i=0; i< input.length; i++) {
	    if(chars.indexOf(input.charAt(i)) == -1)
	    return false;
	  }
	  return  true;
	}

	function isNumCheck(input)
	{
	  var chars = "0123456789";
	  return isCharsCehck(input,chars);
	}

	/**
	 * 비밀번호 체크
	 * @param str		문자열
	 * @param idx		구분자를 기준으로 n번째 문자열 추출
	 * @param divideStr 구분문자
	 */

	function checkPassword(p_pwd, p_cono, obj) {
		var chk_pwd = p_pwd;
		var chk_num = chk_pwd.search(/[0-9]/g);
		var chk_eng = chk_pwd.search(/[a-z]/ig);

		var sp_filter =  /[~!@\#$%<>^&*\()\-=+_\']/gi;
		var blank_filter = /[\s]/g;

	    var chk_sp  =  sp_filter.test(chk_pwd);

	    if(chk_sp &&  chk_pwd.length < 8 ){
	    	//다국어원본 : 비밀번호는 8자 이상의 영문 대/소문자, 숫자를 혼합해서 사용하실 수 있습니다.
			  alert(MESSAGE["pwdEight"][jslang]); //다국어phs
			  obj.focus();
			  return false;
		}
	    if(!chk_sp &&  chk_pwd.length < 8 ){
	    	//다국어원본 : 비밀번호는 8자 이상의 영문 대/소문자, 숫자를 혼합해서 사용하실 수 있습니다.
	    	alert(MESSAGE["pwdEight"][jslang]); //다국어phs
			  obj.focus();
			  return false;
		}

//	    if(chk_sp ){
//	    	//다국어원본 : 비밀번호는 특수문자를 사용하실 수 없습니다.
//	    	alert(MESSAGE[""][jslang]); //다국어phs
//			  obj.focus();
//			  return false;
//		}

		/*if(!/^[a-zA-Z0-9]{10,20}$/.test(chk_pwd)){
			  alert("비밀번호는 영문자, 숫자, 특수문자의 조합으로 8자리 이상 입력해 주세요.");
			  obj.focus();
			  return false;
		}*/

		 if(chk_num <0 || chk_eng <0){
			 //다국어원본 : 비밀번호는 숫자와 영문자를 혼용하여야 합니다.
			  alert(MESSAGE["pwdNumberEng"][jslang]); //다국어phs
			  obj.focus();
			  return false;
		 }


		 if(/(\w)\1\1\1/.test(chk_pwd)){
			 //다국어원본 : 비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.
			 alert(MESSAGE["pwdEqualFour"][jslang]); //다국어phs
			  obj.focus();
			  return false;
		 }

		 if(chk_pwd.search(p_cono) > -1){
			 //다국어원본 : 아이디가 포함된 비밀번호는 사용하실 수 없습니다.
			 alert(MESSAGE["idAddPwdNO"][jslang]); //다국어phs
			  obj.focus();
			  return false;
		 }

		 if(blank_filter.test(chk_pwd)){
			 //다국어원본 : 비밀번호는 공백을 사용할 수 없습니다.
			 alert(MESSAGE["pwdContainSpaces"][jslang]); //다국어phs
			  obj.focus();
			  return false;
		 }

		 var chk_conNext	= 0; //연속성(+) 카운드
		 var chk_conBefore  = 0; //연속성(-) 카운드
		 var chkchar1;
		 var chkchar2;
		 var isflag = false;

		 for(var i=0; i < chk_pwd.length; i++)
		 {
		 	chkchar1 = chk_pwd.charAt(i);
		    chkchar2 = chk_pwd.charAt(i+1);

			//연속성(+) 카운드
			if(chkchar1.charCodeAt(0) - chkchar2.charCodeAt(0) == 1  )
		    {
		    	chk_conNext = chk_conNext + 1;
			}else {
				chk_conNext = 0;
			}
			//연속성(-) 카운드
		    if(chkchar1.charCodeAt(0) - chkchar2.charCodeAt(0) == -1  )
		    {
		    	chk_conBefore = chk_conBefore + 1;
			} else{
				chk_conBefore = 0;
			}

		    if(chk_conNext > 1 || chk_conBefore > 1 )
			 {
		    	isflag = true;
			  	break;
			 }
		 }

		 if(isflag )
		 {
			 //다국어원본 : 연속된 문자열을 3자 이상 사용 할 수 없습니다.
		 	alert(MESSAGE["threeConsecutive"][jslang]); //다국어phs
		 	obj.focus();
		  	return false;
		 }

		return true;

	}

	
	/**
	 * 비밀번호 체크(특수문자포함)
	 * @param str		문자열
	 * @param idx		구분자를 기준으로 n번째 문자열 추출
	 * @param divideStr 구분문자
	 */
	
	function checkPassword2(p_pwd, /*p_cono,*/ obj) {
		var chk_pwd = p_pwd;
		var sp_filter =  /[~!@\#$%<>^&*\()\-=+_\']/gi;
		var blank_filter = /[\s]/g;
		
		var chk_num = chk_pwd.search(/[0-9]/g);
		var chk_eng = chk_pwd.search(/[a-z]/ig);
		var chk_sp =chk_pwd.search(sp_filter);
		
		
		//var chk_sp  =  sp_filter.test(chk_pwd);
		
		if(chk_pwd.length < 8 ){
			//다국어원본 : 비밀번호는 8자 이상의 영문, 숫자, 특수기호를 혼합해서 사용하실 수 있습니다.
			alert(MESSAGE["pwdEightLen"][jslang]); //다국어phs
			obj.focus();
			return false;
		}
		
		/*if(!/^[a-zA-Z0-9]{10,20}$/.test(chk_pwd)){
			  alert("비밀번호는 영문자, 숫자, 특수문자의 조합으로 8자리 이상 입력해 주세요.");
			  obj.focus();
			  return false;
		}*/
		
		if(chk_num <0 || chk_eng <0 || chk_sp < 0){
			//다국어원본 : 비밀번호는 숫자와 영문자, 특수문자를 혼용하여야 합니다.
			alert(MESSAGE["pwdNumberSpEng"][jslang]); //다국어phs
			obj.focus();
			return false;
		}
		
		
		if(/(\w)\1\1\1/.test(chk_pwd)){
			//다국어원본 : 비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.
			alert(MESSAGE["pwdEqualFour"][jslang]); //다국어phs
			obj.focus();
			return false;
		}
		/*
		if(chk_pwd.search(p_cono) > -1){
			//다국어원본 : 아이디가 포함된 비밀번호는 사용하실 수 없습니다.
			alert(MESSAGE["idAddPwdNO"][jslang]); //다국어phs
			obj.focus();
			return false;
		}
		*/
		if(blank_filter.test(chk_pwd)){
			//다국어원본 : 비밀번호는 공백을 사용할 수 없습니다.
			alert(MESSAGE["pwdContainSpaces"][jslang]); //다국어phs
			obj.focus();
			return false;
		}
		
		var chk_conNext	= 0; //연속성(+) 카운드
		var chk_conBefore  = 0; //연속성(-) 카운드
		var chkchar1;
		var chkchar2;
		var isflag = false;
		
		for(var i=0; i < chk_pwd.length; i++)
		{
			chkchar1 = chk_pwd.charAt(i);
			chkchar2 = chk_pwd.charAt(i+1);
			
			//연속성(+) 카운드
			if(chkchar1.charCodeAt(0) - chkchar2.charCodeAt(0) == 1  )
			{
				chk_conNext = chk_conNext + 1;
			}else {
				chk_conNext = 0;
			}
			//연속성(-) 카운드
			if(chkchar1.charCodeAt(0) - chkchar2.charCodeAt(0) == -1  )
			{
				chk_conBefore = chk_conBefore + 1;
			} else{
				chk_conBefore = 0;
			}
			
			if(chk_conNext > 1 || chk_conBefore > 1 )
			{
				isflag = true;
				break;
			}
		}
		
		if(isflag )
		{
			//다국어원본 : 연속된 문자열을 3자 이상 사용 할 수 없습니다.
			alert(MESSAGE["threeConsecutive"][jslang]); //다국어phs
			obj.focus();
			return false;
		}
		
		return true;
		
	}
	
	/**
	 * 비밀번호 체크(특수문자포함)
	 * @param str		문자열
	 * @param idx		구분자를 기준으로 n번째 문자열 추출
	 * @param divideStr 구분문자
	 */
	
	function checkPassword3(p_pwd, /*p_cono,*/ view) {
		var chk_pwd = p_pwd;
		var sp_filter =  /[~!@\#$%<>^&*\()\-=+_\']/gi;
		var blank_filter = /[\s]/g;
		
		var chk_num = chk_pwd.search(/[0-9]/g);
		var chk_eng = chk_pwd.search(/[a-z]/ig);
		var chk_sp =chk_pwd.search(sp_filter);
		
		
		//var chk_sp  =  sp_filter.test(chk_pwd);
		
		if(chk_pwd.length < 8 ){
			//다국어원본 : 비밀번호는 8자 이상의 영문, 숫자, 특수기호를 혼합해서 사용하실 수 있습니다.
			view.innerHTML = MESSAGE["pwdEightLen"][jslang]; //다국어phs			
			return false;
		}
		
		/*if(!/^[a-zA-Z0-9]{10,20}$/.test(chk_pwd)){
			  alert("비밀번호는 영문자, 숫자, 특수문자의 조합으로 8자리 이상 입력해 주세요.");
			  obj.focus();
			  return false;
		}*/
		
		if(chk_num <0 || chk_eng <0 || chk_sp < 0){
			//다국어원본 : 비밀번호는 숫자와 영문자, 특수문자를 혼용하여야 합니다.
			view.innerHTML = MESSAGE["pwdNumberSpEng"][jslang]; //다국어phs			
			return false;
		}
		
		
		if(/(\w)\1\1\1/.test(chk_pwd)){
			//다국어원본 : 비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.
			view.innerHTML = MESSAGE["pwdEqualFour"][jslang]; //다국어phs			
			return false;
		}
		/*
		if(chk_pwd.search(p_cono) > -1){
			//다국어원본 : 아이디가 포함된 비밀번호는 사용하실 수 없습니다.
			alert(MESSAGE["idAddPwdNO"][jslang]); //다국어phs
			obj.focus();
			return false;
		}
		*/
		if(blank_filter.test(chk_pwd)){
			//다국어원본 : 비밀번호는 공백을 사용할 수 없습니다.
			view.innerHTML = MESSAGE["pwdContainSpaces"][jslang]; //다국어phs			
			return false;
		}
		
		var chk_conNext	= 0; //연속성(+) 카운드
		var chk_conBefore  = 0; //연속성(-) 카운드
		var chkchar1;
		var chkchar2;
		var isflag = false;
		
		for(var i=0; i < chk_pwd.length; i++)
		{
			chkchar1 = chk_pwd.charAt(i);
			chkchar2 = chk_pwd.charAt(i+1);
			
			//연속성(+) 카운드
			if(chkchar1.charCodeAt(0) - chkchar2.charCodeAt(0) == 1  )
			{
				chk_conNext = chk_conNext + 1;
			}else {
				chk_conNext = 0;
			}
			//연속성(-) 카운드
			if(chkchar1.charCodeAt(0) - chkchar2.charCodeAt(0) == -1  )
			{
				chk_conBefore = chk_conBefore + 1;
			} else{
				chk_conBefore = 0;
			}
			
			if(chk_conNext > 1 || chk_conBefore > 1 )
			{
				isflag = true;
				break;
			}
		}
		
		if(isflag )
		{
			//다국어원본 : 연속된 문자열을 3자 이상 사용 할 수 없습니다.
			view.innerHTML = MESSAGE["threeConsecutive"][jslang]; //다국어phs			
			return false;
		}
		
		return true;
		
	}
	
	function isNull(obj){
		if(obj == null || obj == undefined){
			return true;
		}
		return false;
	}
	
	function isNull2(obj){
		if(obj == null || obj == undefined || obj == ""){
			return true;
		}
		return false;
	}

	//팝업창 가운데 위치 변경
	function centerPopWindow(formName, ww, wh){
		if (formName) {
		sw = screen.availWidth;
		sh = screen.availHeight;
		}
		if (document.all) {
		sw = screen.width;
		sh = screen.height;
		}
		w = (sw - ww)/2;
		h = (sh - wh)/2;
		window.moveTo(w,h);
	}

	//팝업창 풀스크린으로 띄우기
	function fullScreenPopWindow( url ){
		window.open(url,'popupname','scrollbars=yes,width='+screen.width+',height='+screen.height);
	}

	function fullScreenPopWindow1( url ){
		window.open(url,'popupname','scrollbars=yes,location=yes,menubar=yes,toolbar=yes,width='+screen.width+',height='+screen.height );
	}
	
	function Browser()
	{
	    var browser = navigator.userAgent.toLowerCase();

	    this.getName = function() {
	        var names = {
	            ie6 : browser.indexOf('msie 6') != -1,
	            ie7 : browser.indexOf('msie 7') != -1,
	            ie8 : browser.indexOf('msie 8') != -1,
	            chrome : browser.indexOf('chrome') != -1,
	            firefox : browser.indexOf('firefox') != -1
	        };

	        for (var name in names)
	        {
	            if (names[name])
	                return name;
	        }
	        return 'other';
	    }
	}
	
	//글자 자르기  
	function byteLengthCut( val, len ) {
		var count = 0;
		 
		for(var i = 0; i < val.length; i++) {
			if(escape(val.charAt(i)).length >= 4)
				count += 2;
			else
				if(escape(val.charAt(i)) != "%0D")
					count++;
	
	
			if( count >  len ) {
				if(escape(val.charAt(i)) == "%0A")
					i--;
				break;		
			}
		}
		return val.substring(0, i);
	}
	
	function searchTextBlankCheck(searchText){
		var tmp_Txt = rtrim(ltrim(searchText));
		
		if(tmp_Txt == ""){
			alert(MESSAGE["searchInput"][jslang]);
			return false;
		}else{
			return true;
		}
		
		
	}
	
	function postRemaking(orgStr, tranStr, appendlen){
		var remakingStr = jsNvl(orgStr, "");
		if(remakingStr.length < appendlen){
			appendlen = remakingStr.length; 
		}
		remakingStr= remakingStr.substring(0, remakingStr.length-appendlen);
		for(var i = 0; i < appendlen; i++){
			remakingStr += tranStr;	
		}
		return remakingStr;
	}
	
	
	function remarkString(stringVal, markLeng, type){
		var value = stringVal;
		var markValue = "";
		
		
		
		for(var i = 0; i < markLeng; i++){
			markValue += "*";
		}
		
		if(stringVal == undefined || stringVal == null || stringVal == "" || stringVal.length < markLeng){
			return markValue;
		}
		
		if(type == undefined || type == null || type == ""){
			type = "default";
		}
		
		if(type == "email"){	
			var mailId = ""; 
			var mailDomain = "";
			
			if( value.indexOf("@") < 0){
				value = value.substring(0, value.length - markLeng) + markValue;
				return value; 
			}
			
			mailId  = value.substring(0, value.indexOf("@"));
			if(mailId.length <= markLeng){
				mailId = markValue;
			}else{
				mailId = mailId.substring(0, mailId.length - markLeng) + markValue;
			}
			
			mailDomain = value.substring(value.indexOf("@") + 1);
			
			value = mailId + "@" + mailDomain;
		}else{
			value = value.substring(0, value.length - markLeng) + markValue;
		}
		
		return value; 
	}

	/**
	 * 전화번호 등  '*' remark 된 항목 수정시 기존값과 비교하여  기존값( form.data)을 변경한다.  (한글은 테스트 하지 않음)   
	 * remarkValueChange(this.value, 'p_hometel3', 'form1');
	 * @param newStr   input 태그에 입력된 값 ( 수정값 ) 
	 * @param key      기존값을 저장하는  form.data 의 키
	 * @param formname  Form  name 
	 * @return 변환된 UTF-8형식 데이터
	 */
	function remarkValueChange( newStr, key , formname){

		var form =  jQuery("form[name="+formname+"]");
		var oldStr = form.data(key)
		
		
		var oldStr_len = oldStr.length; 
		var newStr_len = newStr.length; 
		var changeStr = "" ; 
		// *: 42
		for(i = 0 ; i < newStr_len ; i++){	
			
			if( i < oldStr_len &&  ( newStr.charCodeAt(i) == "42" ||  oldStr.charAt(i) == newStr.charAt(i) )   ){
				changeStr +=  oldStr.charAt(i) ;	
			}else {
				changeStr +=  newStr.charAt(i) ;	
			}
			
		}
		
		form.data(key, changeStr );
		
		return true; 
	}
	
	/**
	 * 위치 조정 가능한 팝업
	 * @param s_url
	 * @param s_name
	 * @param s_width
	 * @param s_height
	 * @param s_scroll
	 * @param s_resize
	 * @param s_top
	 * @param s_left
	 * @returns
	 */
	function Position_Variable_Popup1(s_url, s_name, s_width, s_height, s_scroll, s_resize, s_top, s_left) {
		
		var ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable="+s_resize+", scrollbars="+s_scroll+", status=yes ,width="+s_width+", height="+s_height+",top="+s_top+",left="+s_left;
		
		var wd_pop = window.open(s_url, s_name,ls_pri);
		if(wd_pop == null) {
			//다국어원본 : 현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시요.
			alert(MESSAGE["popupCheck"][jslang]); //다국어phs
		   return;
		}

        var version = navigator.appVersion;
        var addHeight = 0;
        if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

		//wd_pop.blur();
		//wd_pop.resizeTo(s_width, s_height+addHeight);
        //var aw = window.screen.availWidth;
        //var ah = window.screen.availHeight;
		//wd_pop.moveTo(((aw - eval(s_width))/2),((ah - eval(s_height))/2));
		wd_pop.focus();

		return wd_pop;
	}	

	/** 
	 * 함수명 : selectbox droupkick reload 함수 
	 * @param obj_id : reload 객체id
	 * @param f_optionyn : 첫번째 옵션 세팅여부 (Y,N)
	 * @param f_optionyn_msg : 첫번째 옵션 메세지 (선택, 전체 등등)
	 * @param list : 옵션 데이터 목록
	**/
	/*
	function droupkickSelectboxReload(obj_id, f_optionyn, f_optionyn_msg, list){
		 jQuery("#dk_container_"+obj_id+" >  div > ul > li").remove(); //하위옵션 전부 삭제	
		 
		if("Y" == f_optionyn){
			jQuery("#dk_container_"+obj_id+" > a> span").html(f_optionyn_msg); //첫번째 select 초기값 세팅
			jQuery("#dk_container_"+obj_id+" >  div > ul ").append("<li class='dk_option_current'><a data-dk-dropdown-value=''>"+f_optionyn_msg+"</a></li>"); //첫번째 select option 추가
		}
		
		jQuery.each(list, function(i){
			if("N" == f_optionyn && i == 0){ //첫번째 옵션 세팅여부가 N인 경우 목록중 첫번째 데이터를 첫번째 옵션으로 세팅
				jQuery("#dk_container_"+obj_id+" >  div > ul ").append("<li class='dk_option_current'><a data-dk-dropdown-value='"+list[i].CODE+"'>"+list[i].CODENM+"</a></li>"); //첫번째 select option 추가
			}
			
			jQuery("#dk_container_"+obj_id+" >  div > ul ").append("<li><a data-dk-dropdown-value='"+list[i].CODE+"'>"+list[i].CODENM+"</a></li>");   
		});
	}*/
	

	/** 
	 * 함수명 : selectbox droupkick 첫번째 옵션 선택 함수 
	 * @param obj_id : 옵션선택 객체id
	 * @param f_optionyn_value : 첫번째 옵션 value 
	 * @param f_optionyn_msg : 첫번째 옵션 메세지 (선택, 전체 등등)
	**/
	/*
	function droupkickSelectboxSetFirstItem(obj_id, f_optionyn_value, f_optionyn_msg){		 
		 
		jQuery("#"+obj_id).val(f_optionyn_value); //select box 첫번째 옵션 선택  
		jQuery("#dk_container_"+obj_id+" > a> span").html(f_optionyn_msg); //design select box 첫번째 옵션 세팅
		jQuery("#dk_container_"+obj_id+" >  div > ul > li").removeClass(); //기존에 선택 class 제거
		
		jQuery.each(jQuery("#dk_container_"+obj_id+" >  div > ul > li"), function(i){
			if(i == 0){
				jQuery(this).addClass("dk_option_current"); //첫번째 항목에 선택 class 추가			
			}
		});
	}*/
	
	/** 
	 * 함수명 :글자수 카운트 해서 짤라 와서  ... 붙이기     
	 * @param  str : 글자수 자를 데이터
	 * @param  maxSize : 자를 제한 길이	
	 */
	function noticeByteCnt(str, maxSize){
		var li_byte = 0;
	 
		for(var i=0;i < str.length;i++) {
	  		if(escape(str.charAt(i)).length > 3) {
	   			li_byte += 2;
	  		} else li_byte++;
	  
	  		if(li_byte > maxSize) {
	   			str = str.substring(0,i) + " ...";
	   			break;
	  		}
	 	}
	 	return str;
	}
	
	/* 에디터 함수 */
	function Editor_PasteHTML(id, html) {
		var oEditors = eval("oEditors_" + id + ";");
		oEditors.getById[id].exec("PASTE_HTML", [html]);
	}

	function Editor_GetHTML(id) {
		var oEditors = eval("oEditors_" + id + ";");
		return oEditors.getById[id].getIR();
	}
		
	function Editor_SetValue(id) {
		var oEditors = eval("oEditors_" + id + ";");
		oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);	// 에디터의 내용이 textarea에 적용됩니다.
	}
	/**
	 * 달력을 띄울 폼에 class='dateSet' 클래스를 지정
	 * 
	 * @param date_calendar_yn
	 * @param datefmt
	 * @param clearYn
	 * @param hidden : 구분자가 제외된 값이 지정되는 폼의 규칙입력 : ex) 클릭폼의 id + _hidden
	 * @param view	선택한 날짜가 보여지는 폼의 규칙입력 : ex) 클릭폼의 id + _view
	 * ex) fn_datepicker_call('Y', 'YMD','Y','_hidden' , '_view');
	 */
	function fn_datepicker_call(date_calendar_yn, datefmt,clearYn, hidden, view,event){
		var dateFormat = "";
		if(datefmt == "YM") {
			dateFormat = "yy-mm";
		} else {
			dateFormat = "yy-mm-dd";
		}		
		jQuery(".dateSet").each(function(){
			var id= jQuery(this).attr("id");
			jQuery(this).datepicker({
				dateFormat:dateFormat,
				changeYear: true,
				changeMonth: true,
				showButtonPanel: true,	
				dayNamesMin: jslang  =="ko" ? [  "일", "월", "화", "수", "목", "금", "토" ] : [ "Su","Mo","Tu","We","Th","Fr","Sa"], 
				monthNamesShort : jslang  =="ko" ? [ '1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월' ] : [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun","Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
				beforeShow: function() {
					if(date_calendar_yn == "Y") {
						jQuery('#ui-datepicker-div').removeClass('hide-calendar');			//날짜까지 출력
					} else {
						jQuery('#ui-datepicker-div').addClass('hide-calendar');			//달력만 출력
					}
					jQuery(".ui-datepicker-current").hide();										//달력 하단 Today 버튼 미출력
					
					//Clear 버튼(초기화) 추가
					if(clearYn == "Y"){
					 	setTimeout(function() {
				            var buttonPane = jQuery("#"+id).datepicker( "widget" ).find( ".ui-datepicker-buttonpane" );
				            jQuery( "<button>", {
				                text: "Clear",
				                click: function() {
				                	jQuery("#"+id).val("");
				                	if(hidden != undefined){
				                		jQuery("#"+id+hidden).val("");
				                	}
				                	if(view != undefined){
				                		jQuery("#"+id+view).val("");
				                	}
				                }
				            }).appendTo( buttonPane ).addClass("ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all");
			        	}, 1 );
					}
	  			} ,onSelect: function (dateText, inst) {
	  				if(hidden != undefined){
	  					jQuery("#"+id+hidden).val(dateText.replace(/-/gi, ""));
	  				}
	  				if(view != undefined){
	  					jQuery("#"+id+view).val(dateText);
	  				}	  
	  				jQuery("#"+id).blur();
	            }  
			});
		})
	}
	
	/**
	 * 특정 타겟 달력을 띄울 폼 지정
	 * @param target : jquery 형식 대상오브젝트
	 * @param date_calendar_yn
	 * @param datefmt
	 * @param clearYn
	 * @param hidden : 구분자가 제외된 값이 지정되는 폼의 규칙입력 : ex) 클릭폼의 id + _hidden
	 * @param view	선택한 날짜가 보여지는 폼의 규칙입력 : ex) 클릭폼의 id + _view
	 * ex) fn_datepicker_call('Y', 'YMD','Y','_hidden' , '_view');
	 */
	function fn_target_datepicker_call(target,date_calendar_yn, datefmt,clearYn, hidden, view,event){
		var dateFormat = "";
		if(datefmt == "YM") {
			dateFormat = "yy-mm";
		} else {
			dateFormat = "yy-mm-dd";
		}		
		
		var id= target;
		jQuery("#"+target).datepicker({
			dateFormat:dateFormat,
			changeYear: true,
			changeMonth: true,
			showButtonPanel: true,	
			dayNamesMin: jslang  =="ko" ? [  "일", "월", "화", "수", "목", "금", "토" ] : [ "Su","Mo","Tu","We","Th","Fr","Sa"], 
			monthNamesShort : jslang  =="ko" ? [ '1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월' ] : [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun","Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
			beforeShow: function() {
				if(date_calendar_yn == "Y") {
					jQuery('#ui-datepicker-div').removeClass('hide-calendar');			//날짜까지 출력
				} else {
					jQuery('#ui-datepicker-div').addClass('hide-calendar');			//달력만 출력
				}
				jQuery(".ui-datepicker-current").hide();										//달력 하단 Today 버튼 미출력
				
				//Clear 버튼(초기화) 추가
				if(clearYn == "Y"){
				 	setTimeout(function() {
			            var buttonPane = jQuery("#"+target).datepicker( "widget" ).find( ".ui-datepicker-buttonpane" );
			            jQuery( "<button>", {
			                text: "Clear",
			                click: function() {
			                	jQuery("#"+target).val("");	
			                	if(hidden != undefined){
			                		jQuery("#"+id+hidden).val("");
			                	}
			                	if(view != undefined){
			                		jQuery("#"+id+view).val("");
			                	}
			                }
			            }).appendTo( buttonPane ).addClass("ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all");
		        	}, 1 );
				}
  			} ,onSelect: function (dateText, inst) {  
  				if(hidden != undefined){
  					jQuery("#"+id+hidden).val(dateText.replace(/-/gi, ""));
  				}
  				if(view != undefined){
  					jQuery("#"+id+view).val(dateText);
  				}	  
  				jQuery("#"+target).blur();
            }  
		});
		
	}
	
	/**
	 * 코드구분(cdclsf_id)에 해당하는 코드리스트를 돌려준다.
	 * 
	 * @param cdclsf_id
	 */
	function fn_getCodeList(cdclsf_id){
		var dataList = "";
		jQuery.ajax({
			url : '/common/selectCodeList.do',
			async : false,
			cache : false,
			dataType: 'json',
			data : {
				p_cdclsf_id : cdclsf_id
			},
			success : function (data){
				dataList =  data.codeList;
			},
			error : function (error){
				
			}		
		});
		return dataList;
	}
	
	/**
	 * 윈도우 창 크기에 맞게 Grid resize
	 * @param string grid_id 사이즈를 변경할 그리드의 아이디
	 * @param string div_id 그리드의 사이즈의 기준을 제시할 div 의 아이디
	 * @param string width 그리드의 초기화 width 사이즈
	 */
	function resizeJqGridWidth(grid_id, div_id, width){
	    // window에 resize 이벤트를 바인딩 한다.
	    jQuery(window).bind('resize', function() {
	        // 그리드의 width 초기화
	        jQuery('#' + grid_id).setGridWidth(width, true);
	        // 그리드의 width를 div 에 맞춰서 적용
	        jQuery('#' + grid_id).setGridWidth(parseInt(jQuery('#' + div_id).width(), 10) , true); //Resized to new width as per window
	     }).trigger('resize');
	}
	
	/**
     * 윈도우 창 크기에 맞게 Grid resize - group headers 존재하는 경우
     * @param string grid_id 사이즈를 변경할 그리드의 아이디
     * @param string div_id 그리드의 사이즈의 기준을 제시할 div 의 아이디
     * @param string width 그리드의 초기화 width 사이즈
     * @param string[]
     */
    function resizeJqGridWidthGroup(grid_id, div_id, width, groupHeader){
        // window에 resize 이벤트를 바인딩 한다.
        jQuery(window).bind('resize', function() {
            jQuery("#" + grid_id).jqGrid('destroyGroupHeader');
            // 그리드의 width 초기화
            jQuery('#' + grid_id).setGridWidth(width, true);
            // 그리드의 width를 div 에 맞춰서 적용 
            jQuery('#' + grid_id).setGridWidth(parseInt(jQuery('#' + div_id).width(), 10) , true); //Resized to new width as per window
            
            jQuery("#" + grid_id).jqGrid('setGroupHeaders', {
                useColSpanStyle: true,
                groupHeaders: groupHeader
            });
         }).trigger('resize');
    }
    
    /**
     * 윈도우 창 크기에 맞게 Grid resize - (검색 영역이 없는 경우 사용)
     * @param string grid_id 사이즈를 변경할 그리드의 아이디
     * @param string div_id 그리드의 사이즈의 기준을 제시할 div 의 아이디
     * @param string width 그리드의 초기화 width 사이즈
     */
    function resizeJqGridWidthNoSearch(grid_id, div_id, width){
        // window에 resize 이벤트를 바인딩 한다.
        jQuery(window).bind('resize', function() {
            // 그리드의 width 초기화
            jQuery('#' + grid_id).setGridWidth(width, true);
            // 그리드의 width를 div 에 맞춰서 적용
            jQuery('#' + grid_id).setGridWidth(parseInt(jQuery('#' + div_id).width(), 10), true); //Resized to new width as per window
        }).trigger('resize');
    }
    
    /**
      * 윈도우 창 크기에 맞게 Grid resize - group headers 존재하는 경우 (검색 영역이 없는 경우 사용)
     * @param string grid_id 사이즈를 변경할 그리드의 아이디
     * @param string div_id 그리드의 사이즈의 기준을 제시할 div 의 아이디
     * @param string width 그리드의 초기화 width 사이즈
     */
    function resizeJqGridWidthGroupNoSearch(grid_id, div_id, width, groupHeader){
        // window에 resize 이벤트를 바인딩 한다.
        jQuery(window).bind('resize', function() {
            jQuery("#" + grid_id).jqGrid('destroyGroupHeader');
            // 그리드의 width 초기화
            jQuery('#' + grid_id).setGridWidth(width, true);
            // 그리드의 width를 div 에 맞춰서 적용 
            jQuery('#' + grid_id).setGridWidth(parseInt(jQuery('#' + div_id).width(), 10), true); //Resized to new width as per window
            
            jQuery("#" + grid_id).jqGrid('setGroupHeaders', {
                useColSpanStyle: true,
                groupHeaders: groupHeader
            });
         }).trigger('resize');
    }
    
    /**
     * 윈도우 창 크기에 맞게 Grid resize - group headers 존재하는 경우 (검색 영역이 없는 경우 사용)
    * @param string grid_id 사이즈를 변경할 그리드의 아이디
    * @param string div_id 그리드의 사이즈의 기준을 제시할 div 의 아이디
    * @param string width 그리드의 초기화 width 사이즈
    */
   function resizeJqGridWidthGroupNoSearch2(grid_id, div_id, width, groupHeader){
       // window에 resize 이벤트를 바인딩 한다.
       jQuery(window).bind('resize', function() {
           jQuery("#" + grid_id).jqGrid('destroyGroupHeader');
           // 그리드의 width 초기화
           jQuery('#' + grid_id).setGridWidth(width, true);
           // 그리드의 width를 div 에 맞춰서 적용 
           jQuery('#' + grid_id).setGridWidth(parseInt(jQuery('#' + div_id).width(), 10), true); //Resized to new width as per window
           
           jQuery("#" + grid_id).jqGrid('setGroupHeaders', {
               useColSpanStyle: true,
               groupHeaders: groupHeader
           });
        }).trigger('resize');
   }
    
	/**
	 * 그리드 cell의 selectbox 옵션에 사용할 option 리스트를 공통코드에서 가져온다.
	 * @param code 공통코드
	 * @returns {String}
	 */
	function makeGridOptions(code) {
	    var options_list = fn_getCodeList(code);        //공통코드 리스트
	    var options_len = options_list.length;
	    var options_array = null;
	    var options = "";
	    
	    for(var i = 0; i < options_len; i++) {
	        options_array = options_list[i];
	        options += options_array.CODE + ":" + options_array.CODENM;
	        if(i < options_len - 1) {
	            options += ";";
	        }
	    }
	    return options;
	}
	
	 /**
     * Grid 실행 결과 데이터 세팅
     * @param string grdid 그리드 생성 table 아이디
     * @param string gridUrl 그리드 데이터 select 쿼리 url
     * @param Array param select 쿼리 검색 조건 데이터
     */
	function jsGridSetReload(grdid, gridUrl, param){
		
		jQuery("#"+grdid).jqGrid("setGridParam", {
			url: gridUrl,
			datatype: 'json',
			page: 1,
			postData:param		
		}).trigger("reloadGrid");
	}
	
	 /**
     * 한글 여부 확인
     */
	function isHangulChar(ch) {
	  c = ch.charCodeAt(0);
	  if( 0x1100<=c && c<=0x11FF ) return true;
	  if( 0x3130<=c && c<=0x318F ) return true;
	  if( 0xAC00<=c && c<=0xD7A3 ) return true;
	  return false;
	}
	
	//자기진단센터
	function ASDC(AID,ANAME,MENU){
		var e7 = null;
		e7 = window.open("http://contents.alpaco.co.kr/ASDC/Access2.php?s1_param="+AID+"&s2_param="+ANAME+
		"&UserType=APC-USERTYPE_STUDENT&menu="+MENU,"ASDC","top=0,left=0,width=1024,height=768,statusbar=0,scrollbars=1");
		e7.focus();
	}
	
	/**
     * 모바일여부 확인
     */
	function isMobile() {
		if((navigator.userAgent.match(/Mobile|iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
     * 브라우저 스크린 높이 
     */
	function browserScreenHeight(){
		var userAgent = navigator.userAgent.toLowerCase();
		 
		var browser = {
			msie    : (/msie/.test( userAgent ) && !/opera/.test( userAgent )) || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1),
		    safari  : /webkit/.test( userAgent ),
		    firefox : /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) && !(navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1),
		    opera   : /opera/.test( userAgent )
		};
		
		var totalHeight = 0;
		 
		if(browser.msie){
			totalHeight = window.screen.height;
		}else if(browser.safari){
			totalHeight = parseInt(window.screen.height * 0.88);
		}else if(browser.firefox){
			totalHeight = window.screen.height;
		}else if(browser.opera){
			totalHeight = window.screen.height;
		}else{ 
			totalHeight = 0;
		}
		
		return totalHeight;
	}
	
	/**
     * 브라우저 클라이언트 높이 
     */
	function browserClientHeight(){
		var userAgent = navigator.userAgent.toLowerCase();
		 
		var browser = {
			msie    : (/msie/.test( userAgent ) && !/opera/.test( userAgent )) || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1),
		    safari  : /webkit/.test( userAgent ),
		    firefox : /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) && !(navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1),
		    opera   : /opera/.test( userAgent )
		};
		
		var totalHeight = 0;
		 
		if(browser.msie){
			totalHeight = document.documentElement.clientHeight;
		}else if(browser.safari){
			totalHeight = parseInt(document.documentElement.clientHeight * 0.98);
		}else if(browser.firefox){
			totalHeight = window.screen.height;
		}else if(browser.opera){
			totalHeight = window.screen.height;
		}else{ 
			totalHeight = 0;
		}
		
		return totalHeight;
	}
	
	/**
     * 브라우저 
     */
	function browserReturn(){
		var userAgent = navigator.userAgent.toLowerCase();
		 
		var browser = {
			msie    : (/msie/.test( userAgent ) && !/opera/.test( userAgent )) || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1),
		    safari  : /webkit/.test( userAgent ),
		    firefox : /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) && !(navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1),
		    opera   : /opera/.test( userAgent )
		};
		
		return browser;
	}
	
	/**
     * IE 버전 확인 
     */
	function getVersionOfIE(){ 
		 var word; 
		 var version = "N/A"; 

		 var agent = navigator.userAgent.toLowerCase(); 
		 var name = navigator.appName; 

		 // IE old version ( IE 10 or Lower ) 
		 if ( name == "Microsoft Internet Explorer" ) word = "msie "; 

		 else { 
			 // IE 11 
			 if ( agent.search("trident") > -1 ) word = "trident/.*rv:"; 

			 // Microsoft Edge  
			 else if ( agent.search("edge/") > -1 ) word = "edge/"; 
		 } 

		 var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

		 if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2; 

		 return version; 
	} 
	
	/**
     * 모바일 OS 확인
     */
	function jsGetMobileOs() {
		var retVal = "";
		
		if(isMobile){
			var userAgent = navigator.userAgent.toLowerCase();
			
			if (userAgent.search("android") > -1){
				retVal = "AND";		 
			}else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1)){
				retVal = "IOS";
			}
		}

		return retVal;
	}
	
	/**
	 * 어플리케이션 웹뷰 커넥션 유지
	 */
	function jsWebviewKeepConnection(){
		jQuery.ajax({
			url : '/common/selectWebviewKeepConnection.do',
			async : false,
			cache : false,
			dataType: 'json',
			data : {},
			success : function (data){
				console.log("jsWebviewKeepConnection success");
			},
			error : function (error){
				
			}
		});
		
		location.href = "wbviewer://jsWebviewKeepConnection";
		console.log("jsWebviewKeepConnection Script success");

		window.setTimeout("jsWebviewKeepConnection()", 2 * 60000);
	}
	
	function jsInsertHrdPvPending(inputData){
		jQuery.ajax({
			url : "/common/insertHrdPvPending.do",
			type : 'POST',
			cache : false,
			async : false,
			dataType: 'json',
			data : inputData,
			success: function(data){
				
			}
		});
	}
	
	function jsWindowCloseCommit(commitUrl, commitData, isReload){
		jQuery.ajax({
			url : commitUrl,
			cache : false,
			dataType: 'json',
			data : commitData,
			success : function(data){
				if(isReload){
					top.goMenu('/usrs/lms/classrm/classrmPrgrsItm.do');   
				}
			}
		});
	}
	
	var jsYouTubeHelper = jQuery.jsYouTubeHelper = {
	    getEmbedUrl : function(url) {
	        var id = jQuery.jsYouTubeHelper.extractId(url);
	        if(id == null || id == ""){
	            id = url;
	        }
	        return 'https://www.youtube.com/embed/'+ id;
	    },
	    getThumbnailUrl : function(url){
	        var id = jQuery.jsYouTubeHelper.extractId(url);
	        if(id == null || id == ""){
	            id = url;
	        }
	        return 'http://img.youtube.com/vi/'+id+'/hqdefault.jpg';
	    },
	    extractId : function(url){
	        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	        var match = url.match(regExp);
	        if (match && match[7].length == 11) {
	            return match[7];
	        } else {
	            return null;
	        }
	    }
	};

	var jsVimeoHelper = jQuery.jsVimeoHelper = {
	    getEmbedUrl : function(url){
	        var id = jQuery.jsVimeoHelper.extractId(url);
	        if(id == null || id == ""){
	            id = url;
	        }
	        return 'https://player.vimeo.com/video/'+ id;
	    },
	    extractId : function(url){
	        var regExp = /(vimeo(pro)?\.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;
	        var match = url.match(regExp);
	        return match[3];
	    }
	};
		
	/**
     * 문자 NULL 검사 및 디폴트 값 반환
     */
	function jsNvl(str, defaultStr){
        if(typeof str == "undefined" || str == null || str == ""){
        	str = defaultStr;
        }
         
        return str;
    }
	
	var jcAlertOption = null;
	var jcConfirmOption = null;
	var jcAlert = null;
	var jcConfirm = null;

	var jsConfirmHelper = jQuery.jsConfirmHelper = {
		getAlert : function(option){
			if(jcAlert != null){
				try{
					jcAlert.close();
				}catch(e){
				}
			}

			jcAlertOption = option;
			
			var contentHtml = '';
			
			contentHtml += '<div class="popup-comm">';
			contentHtml += '<div class="popup-wrap">';
			contentHtml += '<div class="popup-body">';
			contentHtml += '<fieldset>';
			contentHtml += '<div class="popup-contents">';
			contentHtml += '<div class="dsc">';
			contentHtml += option.content;
			contentHtml += '</div>';
			contentHtml += '</div>';
			
			if(option.buttons != false){
				contentHtml += '<div class="popup-bot">';
				
				if(option.functionId != undefined){
					contentHtml += '<button type="button" class="btn btn-color1-flat btn-large" onclick="jcAlert.close(); ' + option.functionId + '_OK(jcAlertOption);' + '">확인</button>';
	    		}else{
	    			contentHtml += '<button type="button" class="btn btn-color1-flat btn-large" onclick="jcAlert.close(); return true;">확인</button>';
	    		}
				
				contentHtml += '</div>';
			}
			
			contentHtml += '</fieldset>';
			contentHtml += '</div>';
			contentHtml += '</div>';
			contentHtml += '</div>';
			
			jcAlert = jQuery.alert({
			    title: false,
			    content: contentHtml,
				boxMaxWidth :'480px',
		        boxWidth : '100%',
			    modal: true,
			    useBootstrap: false,
			    animation: 'opacity',
			    closeAnimation: 'opacity',
			    animateFromElement: false,
			    draggable: false,
			    closeIcon: option.closeIcon != undefined ? option.closeIcon : false,
			    closeIconClass: false,
			    buttons: false,
			    onClose: function(){
			    	jcAlert = null;
			    }
			});
	    },
	    getConfirm : function(option){
	    	if(jcConfirm != null){
	    		try{
	    			jcConfirm.close();
				}catch(e){
				}
			}
	    	
	    	jcConfirmOption = option;
	    	
	    	var contentHtml = '';
			
			contentHtml += '<div class="popup-comm">';
			contentHtml += '<div class="popup-wrap">';
			contentHtml += '<div class="popup-body">';
			contentHtml += '<fieldset>';
			contentHtml += '<div class="popup-contents">';
			contentHtml += '<div class="dsc">';
			contentHtml += option.content;
			contentHtml += '</div>';
			contentHtml += '</div>';
			
			if(option.buttons != false){
				contentHtml += '<div class="popup-bot">';
				
				if(option.functionId != undefined){
					contentHtml += '<button type="button" class="btn btn-color1-flat btn-large" onclick="jcConfirm.close(); ' + option.functionId + '_OK(jcConfirmOption);' + '">확인</button>';
					contentHtml += '<button type="button" class="btn btn-basic btn-large" onclick="jcConfirm.close(); ' + option.functionId + '_CN(jcConfirmOption);' + '">취소</button>';
				}else{
	    			contentHtml += '<button type="button" class="btn btn-color1-flat btn-large" onclick="jcConfirm.close(); return true;">확인</button>';
	    			contentHtml += '<button type="button" class="btn btn-basic btn-large" onclick="jcConfirm.close(); return false;">취소</button>';
				}
				
				contentHtml += '</div>';
			}
			
			contentHtml += '</fieldset>';
			contentHtml += '</div>';
			contentHtml += '</div>';
			contentHtml += '</div>';
	    	
			jcConfirm = jQuery.confirm({
			    title: false,
			    content: contentHtml,
				boxMaxWidth :'480px',
		        boxWidth : '100%',
			    modal: true,
			    useBootstrap: false,
			    animation: 'opacity',
			    closeAnimation: 'opacity',
			    animateFromElement: false,
			    draggable: false,
			    closeIcon: false,
			    buttons: false,
			    onClose: function(){
			    	jcConfirm = null;
			    }
			});
	    },
	    getDialog : function(option){
	    	window[option.popupId] = jQuery.dialog({
			    title: option.title ? option.title : false,
			    content: option.content,
			    boxMaxWidth: option.boxMaxWidth ? option.boxMaxWidth : '100%',
			    boxWidth: option.boxWidth ? option.boxWidth : '100%',
			    modal: true,
			    useBootstrap: false,
			    animation: 'opacity',
			    closeAnimation: 'opacity',
			    animateFromElement: false,
			    draggable: false,
			    closeIcon: option.closeIcon != undefined ? option.closeIcon : true,
	            closeIconClass: 'btn-popup-clse'
			});
	    }
	}
	
	function jsExtension(path){
	    var basename = path.split(/[\\/]/).pop();
	    var pos = basename.lastIndexOf('.');     

	    if(basename === '' || pos < 1){
	    	return "";
	    }

	    return basename.slice(pos + 1).toUpperCase();
	}
	