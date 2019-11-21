window.addEventListener("load", function(){
    // study点击显示下拉菜单，并且icon切换
    let lis = document.querySelectorAll(".study .items > li"),
        len = lis.length;

    for(let i = 0; i < len ; i++){
        let flag = true;
        function showSub(obj){
            let sub = obj.querySelector(".sub"),
                span = obj.querySelector(".title > span");
            if(flag){
                sub.style.display = "block";
                span.className = "jianhao";
            }else{
                sub.style.display = "none";
                span.className = "";
            }
            flag = !flag;
        }
        let title = lis[i].querySelector(".title");
        title.addEventListener("click", function(){
            showSub(lis[i]);
        })
    }

})