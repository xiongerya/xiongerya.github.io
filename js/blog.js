window.addEventListener("load", function(){
    // h3 点击显示/隐藏下拉菜单，并改变icon
    // tag下拉菜单
    let lis = document.querySelectorAll(".system > li"); 
    
    // 下拉菜单显示/隐藏动画封装函数
    // 后期需要修改添加部分功能
    // 1.上级菜单隐藏后，所有下级菜单全部隐藏
    function showOrHide(obj, flag){
        let title = obj.querySelector(".title"),
            ul = obj.querySelector("ul");

        title.addEventListener("click", function(e){
            ul.style.display = flag ? "block" : "none";
            flag = !flag;
            e.stopPropagation();
            console.log(this.innerHTML + ": " + flag);
        })
        
    }

    for(let i = 0; i < lis.length; i++){
        let flag = true;   
        showOrHide(lis[i], flag);
        
        let sub_lis = lis[i].querySelectorAll(".menu > li");
        for(let j = 0; j < sub_lis.length; j++){
            let sub_flag = true;
            showOrHide(sub_lis[j], sub_flag);
        }
    }
})