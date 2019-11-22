window.addEventListener("load", function(){
    // book carousel 焦点图滚动动画
    function animated(obj, target, callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(obj.offsetLeft === target){
                clearInterval(obj.timer);
                callback && callback();
            }else{
                obj.style.left = obj.offsetLeft + step + "px";
            }
        },16)
    }

    let book_items = document.querySelector(".book .carousel .items"),
        book_lis = document.querySelectorAll(".book .carousel .items > li"),
        book_prev = document.querySelector(".book .carousel .prev"),
        book_next = document.querySelector(".book .carousel .next");

    let book_width = book_lis[0].offsetWidth;

    let len = book_lis.length,  
        num = 4,
        count = 0,
        flag = true;

    // 将前4个lis添加到items的末尾
    for(let i = 0; i < num; i++){
        let item = book_lis[i].cloneNode(true);
        book_items.appendChild(item);
    }

    book_prev.addEventListener("click", function(){
        if(flag){
            flag = false;
            if(count === 0){
                count = len;
                book_items.style.left = -book_width*count + "px";
            }
            count--;
            animated(book_items, -book_width*count, function(){
                flag = true;
            });
        }
        
    })
    book_next.addEventListener("click", function(){
        if(flag){
            flag = false;
            if(count === len){
                count = 0;
                book_items.style.left = 0;
            }
            count++;
            animated(book_items, -book_width*count, function(){
                flag = true;
            });
        }  
    })
})