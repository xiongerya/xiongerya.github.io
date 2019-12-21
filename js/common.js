window.addEventListener("load", function(){
    let body = document.body;

    let nav = body.querySelector("#nav");
    let nav_xhr = new XMLHttpRequest();
    nav_xhr.open("get", "common_nav.html");
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
    ajax(load, "common_load.html", "html")

    // setTimeout(function(){
    //     load.style.display = "none";
    // }, 1500);

    if(document.readyState == "complete"){
        load.style.display = "none";
    }
     
    // 载入header部分，并引入文字标题
    let header = body.querySelector("#header");
    ajax(header, "common_header.html", "html")

    let XHR = new XMLHttpRequest();
    XHR.open('get', '../json/header.json');
    XHR.responseType = "json";
    XHR.send();

    XHR.onload = function(){
        let text = XHR.response,
            id = document.body.id,
            h1 = document.querySelector("#header header h1");
        h1.textContent = text[id];
    }

    // 引入footer部分
    let footer = body.querySelector("#footer");
    ajax(footer, "common_footer.html", "html")



     // 为所有.blank的锚点添加target="_blank"属性
     let blanks = document.querySelectorAll("a.blank");
     for(let i = 0, len = blanks.length; i < len; i++){
         blanks[i].target = "_blank";
     }
 
})