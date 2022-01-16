// 打开控制菜单
control_rotate = 0;
function open_control_menu(){
    // alert("ttk");
    var gear = document.getElementById('open-control-menu').getElementsByClassName('fa')[0]
    var deg = 0;
    function rotate(){
        gear.style.transform = 'rotate('+deg+'deg)';
        deg += 10;
        if (deg > 360){
            deg -= 360;
        } 
        // alert("a");
    }

    var control_menu = document.getElementsByClassName('control-menu')[0];
    if (control_menu.style.visibility == "visible"){
        control_menu.style.visibility = "hidden";
        clearInterval(control_rotate);
    } else {
        control_menu.style.visibility = "visible";
        if (control_rotate) {
            clearInterval(control_rotate);
        }
        control_rotate=setInterval(rotate,100);
    }
}


function sun_dark_mode(dark=true){
    if (dark) {
        bg = "rgba(0, 0, 0, 0.9)";
        fg = "#CCCCCC";
    } else {
        bg = "rgba(255, 255, 255, 0.9)";
        fg = "#555555"
    }
    // 导航栏特殊处理 有bug再修
    var menus = document.getElementsByClassName("menu-item");
    for (num = 0; num < menus.length; num++){
        menus[num].getElementsByTagName("a")[0].style.color=fg;
    }
    var menus = document.getElementsByClassName("menu-item-active");
    for (num = 0; num < menus.length; num++){
        if (dark) {
            menus[num].getElementsByTagName("a")[0].style.color=bg;
        } else {
            menus[num].getElementsByTagName("a")[0].style.color=fg;
        }
    }

    // // 一般内容处理
    // var arr = [ "header-inner", "footer-inner", "post-block", "comments", "pagination"];
    // for (cls_num = 0; cls_num < arr.length; cls_num++){
    //     var cls = arr[cls_num];
    //     var cls_items = document.getElementsByClassName(cls);
    //     // alert(cls + cls_items.length);
    //     for (num = 0; num < cls_items.length; num++) {
    //         cls_items[num].style.backgroundColor = bg;
    //         cls_items[num].style.color = fg;
    //     }
    // }

    // CLASS: white-fg 的css在control.style里
    // nav是左边栏，site是左边作者一栏，post-title是首页标题
    var class_todark = ["nav-link", "sidebar-nav", "site-author-name", "site-state-item-name", "site-state-item-count", "post-title-link"]
    // links-of-author联系方式
    class_todark.push("links-of-author-item")
    class_todark.forEach(e=>{
            var aaa = Array.from(document.getElementsByClassName(e));
            aaa.forEach(Element=>{
                var aaac = Element.getAttribute("class");
                // 否则可能有null
                if (!aaac) {
                    aaac = "";
                }
                var aaaa = aaac.split(" ");
                var aaai = aaaa.indexOf("white-fg");
                if (dark && aaai == -1){
                    Element.setAttribute("class", aaac+" white-fg");
                } else if (!dark && aaai != -1){
                    aaaa.splice(aaai, 1);
                    Element.setAttribute("class", aaaa.join(" "));
                }
            })
        }
    )

    // TAG: white-fg 的css在control.style里
    var class_todark = ["body"]
    class_todark.forEach(e=>{
            var aaa = Array.from(document.getElementsByTagName(e));
            aaa.forEach(Element=>{
                var aaac = Element.getAttribute("class");
                // 否则可能有null
                if (!aaac) {
                    aaac = "";
                }
                var aaaa = aaac.split(" ");
                var aaai = aaaa.indexOf("white-fg");
                if (dark && aaai == -1){
                    Element.setAttribute("class", aaac+" white-fg");
                } else if (!dark && aaai != -1){
                    aaaa.splice(aaai, 1);
                    Element.setAttribute("class", aaaa.join(" "));
                }
            })
        }
    )

    // // CLASS: black-bg 的css在control.style里
    // var class_todark = ["body"]
    // class_todark.forEach(e=>{
    //         var aaa = Array.from(document.getElementsByTagName(e));
    //         aaa.forEach(Element=>{
    //             var aaac = Element.getAttribute("class");
    //             // 否则可能有null
    //             if (!aaac) {
    //                 aaac = "";
    //             }
    //             var aaaa = aaac.split(" ");
    //             var aaai = aaaa.indexOf("black-bg");
    //             if (dark && aaai == -1){
    //                 Element.setAttribute("class", aaac+" black-bg");
    //             } else if (!dark && aaai != -1){
    //                 aaaa.splice(aaai, 1);
    //                 Element.setAttribute("class", aaaa.join(" "));
    //             }
    //         })
    //     }
    // )
    
    // black-bg 的css在control.style里
    var class_todark = ["sidebar-inner", "header-inner", "footer-inner", "post-block", "comments", "pagination", "content-wrap"]
    class_todark.forEach(e=>{
            var aaa = Array.from(document.getElementsByClassName(e));
            aaa.forEach(Element=>{
                var aaac = Element.getAttribute("class");
                // 否则可能有null
                if (!aaac) {
                    aaac = "";
                }
                var aaaa = aaac.split(" ");
                var aaai = aaaa.indexOf("black-bg");
                if (dark && aaai == -1){
                    Element.setAttribute("class", aaac+" black-bg");
                } else if (!dark && aaai != -1){
                    aaaa.splice(aaai, 1);
                    Element.setAttribute("class", aaaa.join(" "));
                }
            })
        }
    )

    // var bgfilter = document.getElementsByClassName("background-filter")[0];
    // if (dark){
    //     bgfilter.style.background = "rgba(0, 0, 0, 0.6)";
    // } else {
    //     bgfilter.style.background = "rgba(0, 0, 0, 0)";
    // }

    var nowbgImage = $("body").css("backgroundImage");
    var reg = /\s((\d+\.)?\d+)\)/;
    if (dark){
        nowbgImage = nowbgImage.replace(reg, " 0.6)");
    } else {
        nowbgImage = nowbgImage.replace(reg, " 0)");
    }
    $("body").css("backgroundImage", nowbgImage);
}

// 模式control
current_mode = "sun";
current_bg = "saber";
// 特别注意，这里opacity通过bg来体现！！
// 夜间模式
function dark_mode(){
    sun_dark_mode(dark=true);
    if (current_mode != "dark"){
        document.getElementById("dark-mode").style.color = "indianred";
        document.getElementById(current_mode+"-mode").style.color = "black";
        current_mode = "dark";
    }
}

// 日间模式
function sun_mode(){
    sun_dark_mode(dark=false);
    if (current_mode != "sun"){
        document.getElementById("sun-mode").style.color = "indianred";
        document.getElementById(current_mode+"-mode").style.color = "black";
        current_mode = "sun";
    }
}

function control_new_bg(n){
    if (current_bg != n){
        document.getElementById(n+"-bg").style.color = "indianred";
        document.getElementById(current_bg+"-bg").style.color = "black";
        current_bg = n;
    }
}

// 纯白背景
function white_bg(){
    var nowbgImage = $("body").css("backgroundImage");
    var reg = /url\(.*?\)/;
    nowbgImage = nowbgImage.replace(reg, "url(/images/white.jpg)");
    $("body").css("backgroundImage", nowbgImage);
    control_new_bg("white");
}

// 恢复默认
function saber_bg(){
    var nowbgImage = $("body").css("backgroundImage");
    var reg = /url\(.*?\)/;
    nowbgImage = nowbgImage.replace(reg, "url(https://gitee.com/zhou-zikun/hulieu-image/raw/master/saber.jpg)");
    $("body").css("backgroundImage", nowbgImage);
    $("body").css("backgroundSize", "cover");
    $("body").css("backgroundRepeat", "no-repeat");
    control_new_bg("saber");
}

// 猫咪背景
function cat_bg(){
    var nowbgImage = $("body").css("backgroundImage");
    var reg = /url\(.*?\)/;
    nowbgImage = nowbgImage.replace(reg, "url(/images/goodcat.jpg)");
    $("body").css("backgroundImage", nowbgImage);
    // document.body.style.background="url(/images/goodcat.jpg)";
    $("body").css("backgroundSize", "224px 224px");
    $("body").css("backgroundRepeat", "repeat");
    control_new_bg("cat");
}

var very_begin = document.body.scrollTop + document.documentElement.scrollTop < $(document.body.getElementsByClassName("page-head")[0]).height() * 0.5;   
// alert("ok")
$(window).scroll(function(){
    let r = 0.4;
    // let scrollTop = $(this).scrollTop();
    let scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    let head_height = $(document.body.getElementsByClassName("page-head")[0]).height()
    // alert(very_begin+"1")
    if (document.body.scrollTop + document.documentElement.scrollTop < head_height * r){
        very_begin = true;
    }
    // alert(very_begin+"2")
    if(very_begin && scrollTop > head_height * r && scrollTop < head_height){
        // alert("More");
        document.documentElement.scrollTop = head_height;
        document.body.scrollTop = head_height;
        very_begin = false;
    }
    // alert(very_begin+"3")
});