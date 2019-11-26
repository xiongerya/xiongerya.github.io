window.addEventListener("load", function(){
    // 点击expand展开全部信息
    let wraps = document.querySelectorAll(".wrap"),
        spans = document.querySelectorAll(".expand span"),
        len = wraps.length;

    for(let i = 0; i < len; i++){
        spans[i].index = i;
    }
    for(let i = 0; i < len; i++){
        let flag = true;
        spans[i].addEventListener("click", function(){
            wraps[this.index].style.height = flag ? "100%" : "300px";
            this.innerHTML = flag ? "收起" : "展开";
            flag = !flag;
        })
    }
})