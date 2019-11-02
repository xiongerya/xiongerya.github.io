window.addEventListener("load", function(){
    function carousel(obj, interval, time, bool){
        let width = obj.querySelector("li").offsetWidth,
            prev = obj.parentNode.querySelector(".prev"),
            next = obj.parentNode.querySelector(".next"),
            lis = obj.querySelectorAll("li.sub"),
            len = lis.length;

        let timer = null,   
            count = 0,
            circle = 0; 
            flag = true;
        
        // clone第一张轮播图，添加到obj末尾
        obj.appendChild(lis[0].cloneNode(true));

        // 为轮播焦点图动态添加点击圆圈按钮
        let buttons = document.createElement("ul");
        buttons.className = "carousel-buttons";
        for(let i = 0; i < len; i++){
            let btn = document.createElement("li");
            btn.index = i;
            buttons.appendChild(btn);
        }
        obj.parentNode.appendChild(buttons);

        // 轮播图动画基础函数
        function play(target, callback){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                // 缓动动画效果
                let step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if(obj.offsetLeft === target){
                    clearInterval(obj.timer);
                    if(callback) callback();
                }
                obj.style.left = obj.offsetLeft + step + "px";
            }, interval)
        }

        // 点击相应按钮，跳转到对应的轮播图图片
        let btn = buttons.querySelectorAll("li");
        for(let i = 0; i < len; i++){
            btn[i].addEventListener("click", function(){
                play(-width * this.index);
                for(let i = 0; i < len; i++){
                    btn[i].className = "";
                }
                btn[this.index].className = "on";
                count = this.index;
            })
        }
        // 轮播图点击按钮样式切换函数
        function btnChange(){
            for(let i = 0; i < len; i++){
                btn[i].className = "";
            }
            btn[circle].className = "on";
        }
        btnChange();

        // 为prev & next 按钮添加点击事件
        // flag节流阀，防止连续点击图片滚动过快
        prev.addEventListener("click", function(){
            if(flag){
                flag = false;
                if(count === 0){
                    obj.style.left = -width * len + "px";
                    count = len;
                }
                count--;
                play(-width * count, function(){
                    flag = true;
                });
                circle = count;
                btnChange();
            }
        })
        next.addEventListener("click", function(){
            if(flag){
                flag = false;
                if(count === len){
                    obj.style.left = 0;
                    count = 0;
                }
                count++;
                play(-width * count, function(){
                    flag = true;
                });
                circle = count === len ? 0 : count;
                btnChange();
            } 
        })

        // 轮播图自动播放动画效果
        function autoPlay(){
            timer = setInterval(function(){
                next.click();
            }, time);
        }

        // 轮播图停止播放动画效果
        function stopPlay(){
            clearInterval(timer);
            timer = null;
        }

        autoPlay();
        obj.addEventListener("mouseenter", function(){
            stopPlay();
        })

        obj.addEventListener("mouseleave", function(){
           autoPlay();
        })

        // 由传入的参数bool判断是否显示圆圈点击按钮
        bool ? buttons.style.display = "block" : buttons.style.display = "none";
    }

    // banner部分焦点图轮播动画
    let carousel_banner = document.querySelector("#banner > ul");
    carousel(carousel_banner, 8, 2500, true);

    // banner-side焦点图轮播动画
    let carousel_banner_side = document.querySelector("#banner-side > ul");
    carousel(carousel_banner_side, 10, 4500);

    // main 秒杀 middle 焦点图轮播动画
    let carousel_miaosha_middle = document.querySelector("#main .miaosha .middle > ul");
    carousel(carousel_miaosha_middle, 17, 6000);

    // main 秒杀 right 焦点图轮播动画
    let carousel_miaosha_right = document.querySelector("#main .miaosha .right > ul");
    carousel(carousel_miaosha_right, 16, 1500);



    // logIn tab栏切换效果 && icons 鼠标移动效果
    function tab(){

    }



    
    //main秒杀倒计时效果
})