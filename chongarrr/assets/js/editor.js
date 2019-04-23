$(document).ready(function () {
	var editor = new MediumEditor(".editable", {
        buttonLabels: "fontawesome",
        placeholder: {
        	text: ''
    	}
    });

	$(".editable").mediumInsert({
	    editor: editor,
	    addons: {
	        images: {
	            uploadScript: null,
	            deleteScript: null,           
	            actions: null
	        }
	    }
	});
});
