window.addEventListener("load", function(){
    function carousel(obj, time, flag){
        let width = obj.querySelector("li").offsetWidth,
            prev = obj.parentNode.querySelector(".prev"),
            next = obj.parentNode.querySelector(".next"),
            lis = obj.querySelectorAll("li.sub"),
            len = lis.length;

        let timer = null,   
            count = 0;
        
        // clone第一张轮播图，添加到obj末尾
        obj.appendChild(lis[0].cloneNode(true));

        // 轮播图动画基础函数
        function play(target, callback){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                let speed = (target - obj.offsetLeft) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if(obj.offsetLeft === target){
                    clearInterval(obj.timer);
                }
                obj.style.left = obj.offsetLeft + speed + "px";
            }, 17)
            if(callback) callback();
            return;
        }

        // 根据flag值true/false判断，是否添加轮播图按钮
        if(flag){
            var btns = document.createElement("ul");
            btns.className = "carousel-btns";
            for(let i = 0; i < len; i++){
                let btn = document.createElement("li");
                btn.index = i;
                btns.appendChild(btn);
            }
            obj.parentNode.appendChild(btns);

            // 点击相应按钮，跳转到对应的轮播图图片
            var btn = btns.querySelectorAll("li");
            btn[0].className = "on";
            for(let i = 0; i < len; i++){
                btn[i].addEventListener("click", function(){
                    play(-width * this.index);
                    count = this.index;
                    for(let i = 0; i < len; i++){
                        btn[i].className = "";
                    }
                    btn[count].className = "on";
                })
            }
        }

        // 为prev & next 按钮添加点击事件
        prev.addEventListener("click", function(){
            if(count === 0){
                obj.style.left = -width * len + "px";
                count = len;
            }
            count--;
            play(-width * count);
            for(let i = 0; i < len; i++){
                btn[i].className = "";
            }
            btn[count].className = "on";
        })
        next.addEventListener("click", function(){
            if(count === len){
                obj.style.left = 0;
                count = 0;
            }
            count++;
            play(-width * count);
            for(let i = 0; i < len; i++){
                btn[i].className = "";
            }
            btn[count].className = "on";
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
        }

        autoPlay();
        obj.parentNode.addEventListener("mouseover", function(){
            stopPlay();
        })
        obj.parentNode.addEventListener("mouseout", function(){
            autoPlay();
        })
    }

    // banner部分焦点图轮播动画
    let carousel_banner = document.querySelector("#banner > ul");
    carousel(carousel_banner, 2000, true);

    // banner-side焦点图轮播动画
    let carousel_banner_side = document.querySelector("#banner-side > ul");
    carousel(carousel_banner_side, 6000);

    // main 秒杀 middle 焦点图轮播动画
    let carousel_miaosha_middle = document.querySelector("#main .miaosha .middle > ul");
    carousel(carousel_miaosha_middle, 8000);

    // mian 秒杀 right 焦点图轮播动画
    let carousel_miaosha_right = document.querySelector("#main .miaosha .right > ul");
    carousel(carousel_miaosha_right, 4000);



    // logIn tab栏切换效果 && icons 鼠标移动效果
    //main秒杀倒计时效果
})