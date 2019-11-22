window.addEventListener("load", function(){
    // 点击expand展开全部信息
    let wraps = document.querySelectorAll(".wrap"),
        mores = document.querySelectorAll(".wrap .expand .more"),
        len = wraps.length;

    for(let i = 0; i < len; i++){
        mores[i].index = i;
    }

    for(let i = 0; i < len; i++){
        let flag = true;
        mores[i].addEventListener("click", function(){
            if(flag){
                wraps[this.index].style.height = "100%";
            }else{
                wraps[this.index].style.height = "400px";
            }
            flag = !flag;
        })
    }
})