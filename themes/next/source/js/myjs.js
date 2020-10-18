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


function sun_dark_mode(bg="black", fg="#CCCCCC"){
    // article需要通过tag处理
    var articles = document.getElementsByTagName("article");
    for (num = 0; num < articles.length; num++) {
        articles[num].style.backgroundColor = bg;
        articles[num].style.color = fg;
        // alert(articles[num]);
    }

    // 左边栏处理
    var arr = ["post-title-link", "site-author-name", "site-state-item-name", "site-state-item-count", "nav-link", "sidebar-nav-overview", "sidebar-nav-toc"];
    for (cls_num = 0; cls_num < arr.length; cls_num++){
        var cls = arr[cls_num];
        articles = document.getElementsByClassName(cls);
        for (num = 0; num < articles.length; num++) {
            articles[num].style.color =fg;
            // alert(articles[num]);
        }
    }

    // 补回边栏高亮
    // 1.目录
    var arr = ["active-current"];
    for (cls_num = 0; cls_num < arr.length; cls_num++){
        var cls = arr[cls_num];
        articles = document.getElementsByClassName(cls);
        for (num = 0; num < articles.length; num++) {
            links = articles[num].getElementsByTagName("a");
            for (link_num = 0; link_num < links.length; link_num++) {
                links[link_num].style.color = "#fc6423";
            }
        }
    }
    // 2.导航栏
    var arr = ["sidebar-nav-active"];
    for (cls_num = 0; cls_num < arr.length; cls_num++){
        var cls = arr[cls_num];
        articles = document.getElementsByClassName(cls);
        for (num = 0; num < articles.length; num++) {
            articles[num].style.color = "#fc6423";
        }
    }
    
    // 导航栏特殊处理
    var menus = document.getElementsByClassName("menu-item");
    for (num = 0; num < menus.length; num++){
        menus[num].getElementsByTagName("a")[0].style.color=fg;
    }
    var menus = document.getElementsByClassName("menu-item-active");
    for (num = 0; num < menus.length; num++){
        menus[num].getElementsByTagName("a")[0].style.color=bg;
    }

    // 一般内容处理
    var arr = ["sidebar-inner", "header-inner", "footer-inner", "post-block", "comments"];
    for (cls_num = 0; cls_num < arr.length; cls_num++){
        var cls = arr[cls_num];
        var cls_items = document.getElementsByClassName(cls);
        // alert(cls + cls_items.length);
        for (num = 0; num < cls_items.length; num++) {
            cls_items[num].style.backgroundColor = bg;
            cls_items[num].style.color = fg;
        }
    }
}

// 特别注意，这里opacity通过bg来体现！！
// 夜间模式
function dark_mode(){
    sun_dark_mode(bg="rgba(0, 0, 0, 0.9)", fg="#CCCCCC");
}

// 日间模式
function sun_mode(){
    sun_dark_mode(bg="rgba(255, 255, 255, 0.9)", fg="#555555");
}

// 纯白背景
function white_bg(){
    document.body.style.background="white";
}

// 恢复默认
function saber_bg(){
    document.body.style.background="url(/images/background.png)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "50% 50%";
}

// 猫咪背景
function cat_bg(){
    document.body.style.background="url(/images/goodcat.jpg)";
    document.body.style.backgroundSize = "224 224px";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "50% 50%";
}
    