window.addEventListener("load", function(){
    // 点击wrap展开全部信息
    let wraps = document.querySelectorAll(".wrap"),
        spans = document.querySelectorAll(".expand span"),
        len = wraps.length;

    for(let i = 0; i < len; i++){
        wraps[i].index = i;
    }
    for(let i = 0; i < len; i++){
        let flag = true;
        wraps[i].addEventListener("click", function(){
            this.style.height = flag ? "100%" : "300px";
            spans[this.index].innerHTML = flag ? "收起" : "展开";
            flag = !flag;
        })
        wraps[i].querySelector("figure").addEventListener("click", function(e){
            e.stopPropagation();
        })
    }
})