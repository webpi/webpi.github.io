(function ($) {
	var methods = {
		initUpload : function(option){			
			var fileoptions = $.extend(
					{},$.fn.fileUpload.fileDefaults,
					option || {}
				);
			this.each(function(){
				var self_tmplcd = "";
				
				try {
					self_tmplcd = whole_tmplcd;
				} catch (e) {
				}
				
				var $f = $(this);
				var s = fileoptions.seq;
				var bc = navigator.userAgent.toLowerCase();  //접속한 브라우저의 코드네임 소문자로 저장
				var f=fileoptions;
				var isBc
				if ( -1 != bc.indexOf('msie') ){
					isBc =  true; 
				}else{
					isBc =  false;
				}
				
				var exext = f.exExt;	//제외할 확장자
				var inext = f.inExt;	//허용하는 확장자
				var fieldsetClass = 'style=\"width:'+f.formWidth+'\"';
				
				if(self_tmplcd == "9"){
					fieldsetClass = 'class=\"file-upload\"';
				}
				
				var fieldset = $('<div id=\"fileForm_'+s+'\" ' + fieldsetClass + '>'+
				'		<input type=\"hidden\" name=\"file_param\" value=\"'+f.paramName+'\"/>'+
				'		<input type=\"hidden\" name=\"'+f.paramName+'_size\" value=\"'+f.maxFileSize+'\"/>'+
				'		<input type=\"hidden\" name=\"'+f.paramName+'_path\" value=\"'+f.filePath+'\"/>'+
				'		</div>');
				
				var fileView = '';
				var filetag = '';
				if(f.adminYn == "N"){
					if(self_tmplcd == "9"){
						fileView = $('<span class=\"btn btn-color1 btn-large btn-file-upload fileView_'+s+'\">파일찾기</span>');
						filetag ='<input type=\"file\" class="ifile" name=\"'+f.paramName+'\" filerqyn=\"'+f.filerqyn+'\" msgname=\"'+f.msgname+'\" seq=\"'+s+'\" value=\"\" />';
					}else{
						fileView = $('<div class=\"fileAttach fileView_'+s+'\"><input type="text" class="textInput fileName'+f.seq+'" readonly="readonly" /><button type="button" class="inside btnFind">파일찾기</button></div>');
						filetag ='<input type=\"file\" name=\"dummy\" value=\"\"/>';
					}
				}else{
					fileView = $('<div class=\"fileView_'+s+'\" style=\"vertical-align:middle;\"></div>');
					filetag ='<input type=\"file\" class="'+f.paramName+'" name=\"'+f.paramName+'\" filerqyn=\"'+f.filerqyn+'\" msgname=\"'+f.msgname+'\" seq=\"'+s+'\" value=\"\" style=\"width:35%\"/>';
				}
				var file = $(filetag);
				file.change(function(){
					var v= $(this);
					var fileExt = (v.val()).slice(v.val().indexOf(".") + 1).toLowerCase(); //파일 확장자를 잘라내고, 비교를 위해 소문자로 만듭니다.
					var filenm = (v.val()).slice(v.val().lastIndexOf("\\") + 1);
					
					if((v.val().indexOf("'") > -1) || (v.val().indexOf("\0") > -1) || (v.val().indexOf(";") > -1) || (v.val().indexOf("./") > -1) || (v.val().indexOf(".\\") > -1)){
						alert("파일명에 특수문자가 포함되어 있습니다. 변경 후 다시 업로드해 주세요.");
						if(isBc){
							v.replaceWith( v.clone(true) );
						}else{
							v.val("");
						}										
						return this;
					}
					
					if(exext !=null && fileExt !=""){
						for(var i=0 ;i<exext.length;i++){	//제외확장자 체크
							if(exext[i].indexOf( fileExt) > -1){
								alert(fileExt + " 확장자는 등록 제한된 파일입니다.");
								if(isBc){
									v.replaceWith( v.clone(true) );
								}else{
									v.val("");
								}										
								return this;
							}
						}
					}
					var isInFlag = true;
					if(inext !=null && fileExt !=""){
						for(var i=0 ;i<inext.length;i++){	//허용확장자 체크
							if(inext[i].indexOf( fileExt) > -1){
								isInFlag = false;
							}
						}
						if(isInFlag){
							alert(fileExt+" 확장자는 등록 제한된 파일입니다.");
							if(isBc){
								v.replaceWith( v.clone(true) );
							}else{
								v.val("");
							}	
							return this;
						}
					}					
					
					if(f.fileAddYn == "Y" && f.adminYn == "N" && v.val() != ''){
						var filecnt = $("#fileList_"+s).find("li").size();
						if( f.max != 0 && f.max <=filecnt ){
							alert(f.max + "개의 파일만 첨부할 수 있습니다.");
							return this;
						}
						jQuery(".fileName"+f.seq).val(v.val());
						var flistTag = $('<li class="'+fileExt+'"></li>');
						
						if(self_tmplcd == "9"){
							flistTag.append($('<span class="file-upload-name">'+filenm+'</span>'));	
						}else{
							flistTag.append($('<a href="#">'+filenm+'</a>'));	
						}
						
						var delBtnHtml = null;
						
						if(self_tmplcd == "9"){
							delBtnHtml = $('<button type="button" class="btn-file-del delbtn'+s+'"><span class="ir">삭제</span></button>');	
						}else{
							delBtnHtml = $('<button type="button" class="btnDelete delbtn'+s+'">삭제</button>');	
						}
						var delset = delBtnHtml.bind('click',function(){
							$("."+f.paramName).eq($(".delbtn"+f.seq).index(this)).remove();
							$(this).parent().remove();
							$("."+f.paramName).each(function(key,obj){
								$(this).attr("name",f.paramName+"@"+key);		
							});	
							filecnt = $("#fileList_"+s).find("li").size();
							if(filecnt-1 == -1)
							{
								$("#fileList_"+s).hide();
							}
						});
						flistTag.append(delset);
						fileView.append(v.clone(true));
						v.addClass(f.paramName).hide();
						$("#fileList_"+s).append(flistTag);
						if(filecnt >= 0)
						{
							$("#fileList_"+s).show();	
						}													
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);							
						});						
					}
				});
				fileView.append(file);
				if(f.fileAddYn == "Y" && f.adminYn == "Y"){
					var addBtn = $('<input type="button" class=\"btnInner gray btn\" style=\"margin-left:10px\" value="추가"/>');
					var delBtn = $('<input type="button" class=\"btnInner gray btn\" style=\"margin-left:10px;display:none\" value="삭제"/>');
					
					addBtn.bind('click',function(){
						var file = $(this).prev();
						var filecnt = $(".fileView_"+f.seq).size();
						
						if( f.max != 0 && f.max <=(filecnt + f.cnt)){
							alert(f.max + "개의 파일만 첨부할 수 있습니다.");
							return this;
						}
						if(file.val() == ""){
							alert("파일 등록 후 추가할 수 있습니다.");
								return this;
						}
						
						var fileView =  $(this).parent();
						var addbtn =  $(this);
						var delbtn =  $(this).next();
						var cfileView = fileView.clone(true);
						//cfileView.find(".addbtn").fileUpload('setAddEvent');	
						$(cfileView).find("input[type=file]").val("");
						$(fileView).parent().append(cfileView);
						if(f.adminYn == "N"){
							jQuery(".fileName"+f.seq).eq($("."+f.paramName).index(file)+1).val('');
						}
						addbtn.hide();
						delbtn.show();
						//파일 name변경
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);
						});
						
					});
					delBtn.bind('click',function(){
						var fileView = $(this).parent();
						fileView.remove();
						//파일 name변경
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);
						});
					});
					fileView.append(addBtn);
					fileView.append(delBtn);
				}
				fieldset.append(fileView);
				
				var fList = f.fileList;
				if(f.listViewYn == "Y" && fList !=null && fList != undefined){	
					//파일 리스트
					var fileJ = "";
					
					if(f.adminYn == "N"){
						if(self_tmplcd == "9"){
							fileJ = $('<ul class="file-upload-list" id="fileList_'+s+'"></ul>');
						}else{
							fileJ = $('<div id="fileList_'+s+'" class="listAttach" ></div>');
							fileJ.append("<ul id='fFileList_"+s+"'></ul><p class='info mobile'>일부기기에서는 첨부파일이 작동하지 않을 수 있습니다.</p>");
						}
					}else{
						fileJ = $('<div id="fileList_'+s+'" class="" ></div>');
					}
					
					var fSpan = null;
					var fDown = null;
					var fDel = null;
					f.cnt = fList.length;						
					jQuery.each(fList,function(key,obj){
						if(f.adminYn == "Y"){								
							fSpan =$('<span id="delfile_'+obj.FILE_ID+'"></span>');
							fDown = $('<a href="javascript:void(0)">'+obj.ORIGIN_FILENM+'</a>').bind('click',function(){
								window.open("/common/file/FileDown.do?p_filegrp_id="+obj.FILEGRP_ID+"&p_file_id="+obj.FILE_ID);
							});
							fSpan.append(fDown);
				  			
							fDel = $('<a href="javascript:void(0)">&nbsp;<img src="/images/pc/template/common/btn_delete_s.gif" alt="삭제" /></a>').bind('click',function(){
								$("input[name='p_delfile']").val($("input[name='p_delfile']").val()+obj.FILE_ID+",");//file을 지정하는 jsp페이지에 hidden값으로 넣어준다.
								f.cnt = f.cnt-1;
								$('.fileView_'+s).show();
								
								$("#delfile_"+obj.FILE_ID).remove();		
							});
							fSpan.append(fDel);
							fSpan.append('<br/>');
						}else{
							fSpan =$('<li id="delfile_'+obj.FILE_ID+'" class="'+obj.FILE_EXT+'"></li>');
							
							if(self_tmplcd == "9"){
								fSpan =$('<li id="delfile_'+obj.FILE_ID+'"></li>');
							}
							
							var fDownHtml = $('<a href="javascript:void(0)">'+obj.ORIGIN_FILENM+'</a>');
							
							if(self_tmplcd == "9"){
								fDownHtml = $('<span class="file-upload-name">'+obj.ORIGIN_FILENM+'</span>');
							}
							
							fDown = fDownHtml.bind('click',function(){
								window.open("/common/file/FileDown.do?p_filegrp_id="+obj.FILEGRP_ID+"&p_file_id="+obj.FILE_ID);
							});
							fSpan.append(fDown);
							
							var fDelHtml = $('<button type="button" class="btnDelete">삭제</button>');
							
							if(self_tmplcd == "9"){
								fDelHtml = $('<button type="button" class="btn-file-del"><span class="ir">삭제</span></button>');
							}
							
							fDel = fDelHtml.bind('click',function(){
								$("input[name='p_delfile']").val($("input[name='p_delfile']").val()+obj.FILE_ID+",");//file을 지정하는 jsp페이지에 hidden값으로 넣어준다.
								f.cnt = f.cnt-1;
								var delcnt = $(".delbtn"+s).length;
								if(f.cnt == 0){
									if(delcnt > 0){
										$("#fileList_"+s).show();
									}else{
										$("#fileList_"+s).hide();
									}
								}
									
								$('.fileView_'+s).show();
								$("#delfile_"+obj.FILE_ID).remove();
							});
							fSpan.append(fDel);								
						}
						fileJ.append(fSpan);
					});
					
					if(self_tmplcd == "9"){
						fieldset.append(fileJ);
					}else{
						fieldset.prepend(fileJ);
					}
				}else{
					f.cnt = 0;	
				}
				
				$(this).html(fieldset);
				if(f.cnt >= f.max){
					$('.fileView_'+s).hide();
				}
				this.fileoptions = fileoptions ;
			})
			return this;
		},
		resetFile : function() {
			this.each(function(){
				$(this).fileUpload(this.fileoptions);
			});
			return this;
		},
		setFileParam : function(option) {			
			this.each(function(){
				var fileoptions = $.extend(
						{},this.fileoptions,
						option || {}
					);
				$(this).fileUpload(fileoptions);
			});
			return this;
		}
	}
	$.fn.fileUpload = function(o){
		if (methods[o]){
			return methods[o].apply(this, Array.prototype.slice.call(arguments, 1));
		}else{
			return methods.initUpload.apply(this, arguments);
		}
		
	}
	$.fn.fileUpload.fileDefaults = {
			seq : "1",
			list_target : "", //파일업로더가 들어갈 div의 id 값		
			cnt : 0,	//파일의 갯수
			max : 0,			//파일객체의 최대 갯수
			paramName : "p_addFile",	//파일객체의 파라미터 이름
			fileAddYn : "N",	//파일객체의 파라미터 이름
			listViewYn : "N",	//등록된 파일리스트 출력
			fileList : null,	//등록된 파일리스트
			filePath : '',
			formWidth : "100%",	//파일 폼의 width 값
			maxFileSize : 0,
			exExt : null,		//제외 확장자
			inExt : null,		// 허용 확장자
			adminYn : "Y",
			filerqyn : "N",		// 파일 필수 여부
			msgname : ""		// 파일 아이템 명
	}
	
})(jQuery);
