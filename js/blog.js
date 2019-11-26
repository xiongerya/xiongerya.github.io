window.addEventListener("load", function(){
    // click下拉菜单显示/隐藏动画封装函数
    function showOrHide(obj, flag){
        let title = obj.querySelector(".title"),
            icon = title.querySelector(".icon-more"),
            ul = obj.querySelector("ul");
        
        title.addEventListener("click", function(e){
            ul.style.display = flag ? "block" : "none";
            if(icon){
                 icon.style.transform = flag ? "rotate(90deg)" : "";
            }
            flag = !flag;
            e.stopPropagation();
        })
    }
    
    // 点击title显示/隐藏下拉菜单
    let lis = document.querySelectorAll(".system > li"); 

    for(let i = 0; i < lis.length; i++){
        let flag = true;   
        showOrHide(lis[i], flag);
    }
})