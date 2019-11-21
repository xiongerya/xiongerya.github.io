window.addEventListener("load", function(){
    // 为所有.blank的锚点添加target="_blank"属性
    let blanks = document.querySelectorAll("a.blank");
    for(let i = 0, len = blanks.length; i < len; i++){
        blanks[i].target = "_blank";
    }
})