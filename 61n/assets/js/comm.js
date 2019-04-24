$(document).ready(function() {
    // userAgent check pc or web redirect
    var ua = window.navigator.userAgent.toLowerCase();
    if ( /iphone/.test(ua) || /android/.test(ua) || /opera/.test(ua) || /bada/.test(ua)) {
        document.location.replace('/m/index.html');
    }

    $('#fullpage').fullpage({
        anchors:['v1', 'v2', 'v3', 'v4', 'v5', 'v6','v7','v8','v9','v10'],
        menu: '#gnb'
    });

    $("#video").click(function() {
         this.paused ? this.play() : this.pause();
    });

    // gnb hash 안보임
	// window.location.replace("#");
	// if (typeof window.history.replaceState == 'function') {
	//   history.replaceState({}, '', window.location.href.slice(0, -1));
	// }
});