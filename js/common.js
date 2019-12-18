window.addEventListener("load", function(){
    // 利用Ajax加载nav/header/footer部分
    function add(obj, url, type){
        let request = new XMLHttpRequest();
        request.open('get', url);
        request.responseType = type;

        request.onload = function(){
            obj.innerHTML = request.response;
        }

        request.send();
    }

    let nav = document.querySelector("nav");
    add(nav, "https://xiongerya.github.io/_includes/nav.html", "html")

    let footer = document.querySelector("footer");
    add(footer, "https://xiongerya.github.io/_includes/footer.html", "html")

     // 为所有.blank的锚点添加target="_blank"属性
     let blanks = document.querySelectorAll("a.blank");
     for(let i = 0, len = blanks.length; i < len; i++){
         blanks[i].target = "_blank";
     }
 
})