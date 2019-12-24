window.addEventListener("load", function(){
    let body = document.body;

    // ajax载入nav侧边栏
    // 并实现不同页面下侧边栏图标颜色改变
    let nav = body.querySelector("#nav");
    let nav_xhr = new XMLHttpRequest();
    nav_xhr.open("get", "public_nav.html");
    nav_xhr.responseType = "html";
    nav_xhr.send();

    nav_xhr.onload = function(){
        nav.innerHTML = nav_xhr.response;

        let lis = body.querySelectorAll("nav li a"),
            len = lis.length, 
            id = body.id;

        for(let i = 0; i < len; i++){
            if(lis[i].className == id){
                lis[i].style.color = "#faa916"
            }
        }

    }



    // ajax载入header部分
    // 并利用json数据填入不同页标题
    let header = body.querySelector("#header");

    let header_xhr = new XMLHttpRequest();
    header_xhr.open("get", "public_header.html");
    header_xhr.responseType = "html";
    header_xhr.send();

    header_xhr.onload = function(){
        header.innerHTML = header_xhr.response;

        let XHR = new XMLHttpRequest();
        XHR.open('get', '../json/header.json');
        XHR.responseType = "json";
        XHR.send();

        XHR.onload = function(){
            let text = XHR.response,
                id = body.id,
                h1 = document.querySelector("#header header h1");
            h1.textContent = text[id];
        }       
    }

    // 利用Ajax加载header/footer等部分
    function ajax(obj, url, type){
        let request = new XMLHttpRequest();
        request.open('get', url);
        request.responseType = type;
        request.send();

        request.onload = function(){
            obj.innerHTML = request.response;
        }
    }

    // 引入load部分，页面加载完成后隐藏
    let load = body.querySelector("#load");
    ajax(load, "public_load.html", "html")

    // setTimeout(function(){
    //     load.style.display = "none";
    // }, 1500);

    if(document.readyState == "complete"){
        load.style.display = "none";
    }
     
    

    // 引入footer部分
    let footer = body.querySelector("#footer");
    ajax(footer, "public_footer.html", "html")



     // 为所有.blank的锚点添加target="_blank"属性
     let blanks = document.querySelectorAll("a.blank");
     for(let i = 0, len = blanks.length; i < len; i++){
         blanks[i].target = "_blank";
     }
 
})