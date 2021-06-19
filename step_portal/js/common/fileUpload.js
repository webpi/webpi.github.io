(function ($) {
	var methods = {
		initUpload : function(option){			
			var fileoptions = $.extend(
					{},$.fn.fileUpload.fileDefaults,
					option || {}
				);
			this.each(function(){
				
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
				
				var fieldset = $('<div id=\"fileForm_'+s+'\" style=\"width:'+f.formWidth+'\">'+
				'		<input type=\"hidden\" name=\"file_param\" value=\"'+f.paramName+'\"/>'+
				'		<input type=\"hidden\" name=\"'+f.paramName+'_size\" value=\"'+f.maxFileSize+'\"/>'+
				'		<input type=\"hidden\" name=\"'+f.paramName+'_path\" value=\"'+f.filePath+'\"/>'+
				'		</div>');
				
				
				var fileView = '';
				var filetag = '';
				var fileGroup = '';
				var btnNm = '파일찾기';
				if(f.imageYn == "Y"){
					btnNm = '사진 업로드';
				}

				if(f.adminYn == "N"){
					fileView = $('<div class="fileBox fileView_'+s+'"><button type="button" class="btn_s_blue" id="fileFind_'+f.paramName+'" onclick="jsFileFind(\''+f.paramName+'\');">'+ btnNm +'</button></div>');
					filetag ='<input type="file" class="'+f.paramName+'" name="'+f.paramName+'" filerqyn="'+f.filerqyn+'" msgname="'+f.msgname+'" seq="'+s+'" value="" style="display: none"/>';
				}else{
					fileView = $('<div class="file-box file-box-add fileView_'+s+'">' +
								'</div>');
					fileGroup = $('<div class="file-upload">' +
						'				<button type="button" class="ash" id="fileFind_'+f.paramName+'" onclick="jsFileFind(\''+f.paramName+'\');">' + btnNm +
						'				</button>' +
						'				<input type="text" value="" readonly title="파일위치" class="ipath filePath_'+f.paramName+'" id="filePath_'+f.paramName+'" >' +
						'			</div>');
					filetag ='<input type="file" class="ifile '+f.paramName+'" name="'+f.paramName+'" filerqyn="'+f.filerqyn+'" msgname="'+f.msgname+'" seq="'+s+'" value="" />';
				}

				var file = $(filetag);
				file.change(function(){
					var v= $(this);

					if(v.val()== ""){
						var input_filepath_id =  $(this).next().next().attr('id');
						$("#"+input_filepath_id).val("");
						return this;
					}
					var fileExt = (v.val()).slice(v.val().lastIndexOf(".") + 1).toLowerCase(); //파일 확장자를 잘라내고, 비교를 위해 소문자로 만듭니다.
					var filenm = (v.val()).slice(v.val().lastIndexOf("\\") + 1);

					if((v.val().indexOf("\0") > -1) || (v.val().indexOf(";") > -1) || (v.val().indexOf("./") > -1) || (v.val().indexOf(".\\") > -1)){
						if(bc.search("iphone") > -1 || bc.search("ipod") > -1 || bc.search("ipad") > -1){
							location.href = "wbviewer://Toast?msg=파일명에 특수문자가 포함되어 있습니다. 제거 후 업로드해 주세요.";
						}else{
							alert("파일명에 특수문자가 포함되어 있습니다. 제거 후 업로드해 주세요.");
						}
						if(isBc){
							v.replaceWith( v.clone(true) );
						}else{
							v.val("");
						}
						v.empty();
						return this;
					}

					if(exext !=null && fileExt !=""){
						for(var i=0 ;i<exext.length;i++){	//제외확장자 체크
							if(exext[i].indexOf( fileExt) > -1){
								if(bc.search("iphone") > -1 || bc.search("ipod") > -1 || bc.search("ipad") > -1){
									location.href = "wbviewer://Toast?msg="+fileExt+"은 첨부할 수 없는 확장자 입니다.";
								}else{
									alert(fileExt+"은 첨부할 수 없는 확장자 입니다.");
								}
								if(isBc){
									v.replaceWith( v.clone(true) );
								}else{
									v.val("");
								}
								v.empty();
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
							if(bc.search("iphone") > -1 || bc.search("ipod") > -1 || bc.search("ipad") > -1){
								location.href = "wbviewer://Toast?msg="+fileExt+"은 첨부할 수 없는 확장자 입니다.";
							}else{
								alert(fileExt+"은 첨부할 수 없는 확장자 입니다.");
							}
							if(isBc){
								v.replaceWith( v.clone(true) );
							}else{
								v.val("");
							}	
							return this;
						}
					}					
					
					if(f.fileAddYn == "Y" && f.adminYn == "N" && v.val() != ''){

						var filecnt = $("#ulFileList_"+s).find("li").size();
						if( f.max != 0 && f.max <=filecnt ){
							if(isBc){
								v.replaceWith( v.clone(true) );
							}else{
								v.val("");
							}
							if(bc.search("iphone") > -1 || bc.search("ipod") > -1 || bc.search("ipad") > -1){
								location.href = "wbviewer://Toast?msg=최대 "+f.max+"개를 추가할 수 있습니다";
							}else{
								alert("최대 "+f.max+"개를 추가할 수 있습니다.");
							}
							v.empty();
							return this;
						}
						jQuery(".fileName"+f.seq).val(v.val());
						var flistTag = $('<li class="'+fileExt+'"></li>');
						var fInfoTag = $('<div class="file"><span class="txt">'+filenm+'</span></div>');

						var delset = $(' <a href="javascript:void(0)" class="file_del delbtn'+s+'" title="첨부파일 제거"><i class="icon_close"></i><span class="blind"></span></a>').bind('click',function(){
							$("."+f.paramName).eq($(".delbtn"+f.seq).index(this)).remove();
							$(this).closest('li').remove();
							$("."+f.paramName).each(function(key,obj){

								$(this).attr("name",f.paramName+"@"+key);
								// 학습자 파일 찾기 버튼
								if($("."+f.paramName).length == (key+1)){
									$("#fileFind_"+f.paramName).attr("onclick","jsFileFind('" + f.paramName+"@"+key + "');");
								}

							});	
							filecnt = $("#fFileList_"+s).find("li").size();
							if(filecnt-1 == -1)
							{
								$("#fFileList_"+s).hide();
							}
							jQuery(".fileName"+f.seq).val("");

						});
						fInfoTag.append(delset);
						flistTag.append(fInfoTag);

						var v1 = v.clone(true);
						v1.val("");
						if(f.adminYn == "N"){
							fileView.append(v1);
						}else{
							fileGroup.prepend(v1);
						}


						v.addClass(f.paramName).hide();
						$("#ulFileList_"+s).append(flistTag);
						if(filecnt >= 0)
						{
							$("#fFileList_"+s).show();
						}													
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);
							if($("."+f.paramName).length == (key+1)){
								$("#fileFind_"+f.paramName).attr("onclick","jsFileFind('" + f.paramName+"@"+key + "');");
							}
						});						
					}

					if(f.adminYn == "Y" && v.val() != ''){
						var filecnt = $("#fileList_"+s).find("span").size();
						if( f.max != 0 && f.max <=filecnt ){
							if(isBc){
								v.replaceWith( v.clone(true) );
							}else{
								v.val("");
							}
							if(bc.search("iphone") > -1 || bc.search("ipod") > -1 || bc.search("ipad") > -1){
								location.href = "wbviewer://Toast?msg=최대 "+f.max+"개를 추가할 수 있습니다";
							}else{
								alert("최대 "+f.max+"개를 추가할 수 있습니다.");
							}
							v.empty();
							return this;
						}

						var input_filepath_id =  $(this).next().next().attr('id');

						$("#"+input_filepath_id).val(v.val());

						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);
							if($("."+f.paramName).length == (key+1)){
								$("#fileFind_"+f.paramName).attr("onclick","jsFileFind('" + f.paramName+"@"+key + "');");
							}
						});

						$(".filePath_"+f.paramName).each(function(key,obj){
							$(this).attr("id","filePath_"+f.paramName+key);
						});
					}

				});
				if(f.adminYn == "Y"){
					fileGroup.prepend(file);
					fileView.append(fileGroup);
				}else{
					fileView.append(file);
				}

				if(f.fileAddYn == "Y" && f.adminYn == "Y" ){
					var addBtn = $('<button type="button" class="ash" name="add">추가</button>');
					var delBtn = $('<button type="button" class="ash" name="delete" style="display: none;">삭제</button>');

					addBtn.bind('click',function(){
						var file = $(this).prev().find("input[type=file]");
						var filecnt = $(".fileView_"+f.seq).size();

						if( f.max != 0 && f.max <=(filecnt + f.cnt)){
							alert("최대 "+f.max+"개를 추가할 수 있습니다.");
							return this;
						}
						if(file.val() == ""){
							alert("파일을 첨부 후 추가할 수 있습니다.");
								return this;
						}
						
						var fileView =  $(this).parent();
						var addbtn =  $(this);
						var delbtn =  $(this).next();
						var cfileView = fileView.clone(true);
						//cfileView.find(".addbtn").fileUpload('setAddEvent');	
						cfileView.find("input[type=file]").val("");
						cfileView.find("input[type=text]").val("");

						if($("#fileList_"+f.seq).children().length > 0){
							$("#fileList_"+f.seq).before(cfileView);
						}else{
							fileView.parent().append(cfileView);
						}

						if(f.adminYn == "N"){
							jQuery(".fileName"+f.seq).eq($("."+f.paramName).index(file)+1).val('');
						}

						addbtn.hide();
						delbtn.show();

						//파일 name변경
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);

							// 학습자 파일 찾기 버튼
							if($("."+f.paramName).length == (key+1)){
								$("#fileFind_"+f.paramName).attr("onclick","jsFileFind('" + f.paramName+"@"+key + "');");
							}
						});

						$(".filePath_"+f.paramName).each(function(key,obj){
							$(this).attr("id","filePath_"+f.paramName+key);
						});

					});
					delBtn.bind('click',function(){
						var fileView = $(this).parent();
						fileView.remove();
						//파일 name변경
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);

							// 학습자 파일 찾기 버튼
							if($("."+f.paramName).length == (key+1)){
								$("#fileFind_"+f.paramName).attr("onclick","jsFileFind('" + f.paramName+"@"+key + "');");
							}
						});
					});
					if(f.max > 1 ){
						fileView.append(addBtn);
					}
					fileView.append(delBtn);
				}
				fieldset.append(fileView);
				
				var fList = f.fileList;

				if(f.adminYn == "N" && fList == null && fList == undefined){
					fList = new Array();
				}

				if(f.listViewYn == "Y" && fList !=null && fList != undefined){	
					//파일 리스트
					var fileJ = "";
					
					if(f.adminYn == "N"){
						fileJ = $('<ul class="fileList" id=\'ulFileList_'+s+'\'></ul>');

						// fileJ = $('<div id="fileList_'+s+'" class="listAttach" ></div>');
						// fileJ.append("<ul id='fFileList_"+s+"'></ul><p class='info mobile'>일부기기에서는 첨부파일이 작동하지 않을 수 있습니다.</p>");
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
							jQuery("#fileDownForm").remove();
							var frm = jQuery('<form>').attr({'id':'fileDownForm', 'name':'fileDownForm', 'method':'post'});
							jQuery('body').append(frm);

							var dataHtml = "";
							var input1 = jQuery('<input>').attr({'type':'hidden', 'name':'p_filegrp_id'}).val(obj.FILEGRP_ID);
							var input2 = jQuery('<input>').attr({'type':'hidden', 'name':'p_file_id'}).val(obj.FILE_ID);

							frm.append(input1);
							frm.append(input2);

							jQuery(frm).attr({'action': f.cntxtPath+'/common/file/FileDown.do'});
							frm.submit();
							frm.remove();
						});
						fSpan.append(fDown);

						fDel = $('<a href="javascript:void(0)">&nbsp;<img src="'+ f.cntxtPath + 'https://webpi.github.io/step_portal/images/pc/template/common/btn_delete_s.gif" alt="삭제" /></a>').bind('click',function(){
							$("input[name='p_delfile']").val($("input[name='p_delfile']").val()+obj.FILE_ID+",");//file을 지정하는 jsp페이지에 hidden값으로 넣어준다.
							f.cnt = f.cnt-1;
							$('.fileView_'+s).show();

							$("#delfile_"+obj.FILE_ID).remove();
						});
						fSpan.append(fDel);
						fSpan.append('<br/>');

						}else{
							fSpan =$('<li id="delfile_'+obj.FILE_ID+'" class="fileExt '+obj.FILE_EXT+'"></li>');
							fDown = $('<div class="file"><span class="txt">'+obj.ORIGIN_FILENM+'</span></div>').bind('click',function(){
								if(navigator.userAgent.indexOf("APP_Running") > -1){
									location.href = "wbviewer://fileDownload?fileUrl=/common/file/FileDown.do?p_filegrp_id=" + obj.FILEGRP_ID + "&p_file_id=" + obj.FILE_ID + "&mfileName="+obj.ORIGIN_FILENM;
								}else{
									jQuery("#fileDownForm").remove();
									var frm = jQuery('<form>').attr({'id':'fileDownForm', 'name':'fileDownForm', 'method':'post'});
									jQuery('body').append(frm);

									var dataHtml = "";
									var input1 = jQuery('<input>').attr({'type':'hidden', 'name':'p_filegrp_id'}).val(obj.FILEGRP_ID);
									var input2 = jQuery('<input>').attr({'type':'hidden', 'name':'p_file_id'}).val(obj.FILE_ID);

									frm.append(input1);
									frm.append(input2);

									jQuery(frm).attr({'action': f.cntxtPath+'/common/file/FileDown.do'});
									frm.submit();
									frm.remove();
								}

							});

							fDel = $('<a href="javascript:void(0)" class="file_del delbtn'+s+'" title="첨부파일 제거"><i class="icon_close"></i><span class="blind"></span></a>').bind('click',function(){
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
							fDown.append(fDel);
							fSpan.append(fDown);
						}
						fileJ.append(fSpan);
					});
					if(f.adminYn == "Y"){
						fileView.parent().append(fileJ);
					}else{
						fileView.append(fileJ);
					}

				}else{
					f.cnt = 0;	
				}
				
				$(this).html(fieldset);
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
	jsFileFind = function(e){
		$("input[name='"+e+"']").trigger("click");
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
			maxFileSize : (100 * 1024 * 1024) ,
			exExt : null,		//제외 확장자
			inExt : ['jpg','jpeg','gif','png','bmp', 'tif','txt','xls','xlsx','pdf','xdf','ppt','pptx','docx','doc','hwp','hwpx','psd','ai','prproj','aep','c4d','mb','zip','mov', 'mp4', 'wmv', 'avi','mp3','mpeg'],	//허용확장자
			adminYn : "Y",
			filerqyn : "N",		// 파일 필수 여부
			msgname : "",		// 파일 아이템 명
			cntxtPath: sessionStorage.getItem("ctx"),
			imageYn : "N"  // Y로 할 경우 버튼명 사진 업로드로 노출
	}
	
})(jQuery);