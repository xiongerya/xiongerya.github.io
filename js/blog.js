window.addEventListener("load", function(){
    // h3 点击显示/隐藏下拉菜单，并改变icon
    // tag下拉菜单
    let system = document.querySelector(".system"),
        lis = document.querySelectorAll(".system > li"),
        len = lis.length;
   
    function showOrHide(obj){
        let title = obj.querySelector(".title"),
            ul = obj.querySelector("ul");

        let flag = true;
        function change(){
             ul.style.display = flag ? "block" : "none";
            flag = !flag;
        }

        title.addEventListener("click", function(){
           change();
        })
    }

    for(let i = 0; i < len; i++){
        showOrHide(lis[i]);
        let sub_lis = lis[i].querySelectorAll(".list > li");
        console.log(sub_lis);
    }
})