// 动态标签
// Based on the tutorial at https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API

(function() {
    var origin = document.title;

    var hidden, visibilityChange; 
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") { // Firefox up to v17
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") { // Chrome up to v32, Android up to v4.4, Blackberry up to v10
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        if (document[hidden]) {
            document.title = '呜~呜~小鱼干跑了~';
        } else {
            document.title = '喵~主人回来了喵~';
            setTimeout( function(){document.title = origin;}, 5 * 1000 );
        }
    }

    if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
        alert("This demo requires a modern browser that supports the Page Visibility API.");
    } else {   
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
})();
    