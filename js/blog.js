window.addEventListener("load", function(){
    // h3 点击显示/隐藏下拉菜单，并改变icon
    // tag下拉菜单
    let lis = document.querySelectorAll(".system > li")
        len = lis.length;

    for(let i = 0; i < len ; i++){
        let flag = true;
        function showSub(obj){
            let sub = obj.querySelector(".list"),
                icon = obj.querySelector(".title > i");
            if(flag){
                sub.style.display = "block";
                // icon.className = "jianhao";
            }else{
                sub.style.display = "none";
                // icon.className = "";
            }
            flag = !flag;
        }
        let title = lis[i].querySelector(".title");
        title.addEventListener("click", function(e){
            showSub(lis[i]);
            e.stopPropagation();
        })
    }

})