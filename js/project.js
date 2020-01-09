window.addEventListener("load", function(){
    // 点击wrap展开全部信息
    let containers = document.querySelectorAll(".container"),
        // lists = document.querySelectorAll(".wrap dl.list"),
        spans = document.querySelectorAll(".expand span"),
        len = containers.length;

    for(let i = 0; i < len; i++){
        spans[i].index = i;
        containers[i].index = i;
        let flag = true;

        spans[i].addEventListener("click", function(){
            containers[this.index].style.height = flag ? "100%" : "200px";
            this.textContent = flag ? "收起" : "展开";
            flag = !flag;
        })

        containers[i].addEventListener("click", function(){
            this.style.height = flag ? "100%" : "200px";
            spans[this.index].textContent = flag ? "收起" : "展开";
            flag = !flag;
        })
        
        containers[i].querySelector("figure").addEventListener("click", function(e){
            e.stopPropagation();
        })
    }
})