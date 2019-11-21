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
        title.addEventListener("click", function(){
            showSub(lis[i]);
        })
    }


    let class_lis = document.querySelectorAll(".system .class .list > li"),
        class_len = class_lis.length;

    console.log(class_lis);
    for(let i = 0; i < class_len ; i++){
        let class_flag = true;
        function showSub(obj){
            let sub = obj.querySelector(".sub-list");
            if(class_flag){
                sub.style.display = "block";
            }else{
                sub.style.display = "none";
            }
            class_flag = !class_flag;
        }
        let title = class_lis[i].querySelector(".sub-title");
        title.addEventListener("click", function(e){
            showSub(class_lis[i]); e.stopPropagation();
        })
    }
    


})