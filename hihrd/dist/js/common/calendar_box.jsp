<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="wbframework.com.core.util.LocaleUtils"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Calendar</title>
	<script type="text/javascript">
	    var jslang = "<%=LocaleUtils.getCurrentLocale(request)%>";
	</script>
    <script type="text/javascript" src="/js/common/multiLangSet.js"></script>
	<script language="javascript" src="common.js"></script>
	<script language="javascript" src="calendar.js"></script>
</head>
<body style="margin:0px" onLoad="createCalendar()">
<script type="text/javascript">
document.onselectstart  	= function() {return false}
document.ondragstart    	= function() {return false}
document.oncontextmenu    	= function() {return false}
</script>

</body>
</html>