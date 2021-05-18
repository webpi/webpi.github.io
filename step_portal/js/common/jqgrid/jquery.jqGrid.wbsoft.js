/**
 * jqgrid이용중 error발생시 처리
 */
jQuery.extend(jQuery.jgrid.defaults, {
	loadError : function(xhr,st,err) {
		closeWorkProgress();
		alert(xhr.responseText.trim());
	}		
});

/**
 * jqgrid기본 페이징 값 처리
 */
jQuery.extend(jQuery.jgrid.defaults, {
	rowNum: 100, // 목록 수
	rowList:[10, 25, 50, 100,1000] // 목록항목
});