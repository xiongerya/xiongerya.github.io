window.addEventListener("load", function(){
    // click下拉菜单显示/隐藏动画封装函数
    function showOrHide(obj, flag){
        let title = obj.querySelector(".title"),
            span = title.querySelector("span"),
            ul = obj.querySelector("ul");
        
        title.addEventListener("click", function(e){
            ul.style.display = flag ? "block" : "none";
            span.className = flag ? "jianhao" : "";
            flag = !flag;
            e.stopPropagation();
        })
    }


    // study点击显示下拉菜单，并且icon切换
    let lis = document.querySelectorAll(".study .items > li");
    
    for(let i = 0; i < lis.length ; i++){
        let flag = true;
        showOrHide(lis[i], flag);
    }

})