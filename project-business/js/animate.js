window.addEventListener("load", function(){  
    // advertise部分，点击close按钮隐藏
    let ad = document.querySelector("#ad"),
        ad_close = ad.querySelector(".close");

    ad_close.addEventListener("click", function(){
        ad.style.display = "none";
    })



    // 隐藏/显示侧边栏，slide动画函数
    function slide(obj, target, callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(obj.style.left === target){
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + "px";
        }, 15)
    }

    // activity部分,点击按钮，侧边栏显示隐藏
    let ac = document.querySelector(".activity"),
        title = ac.querySelector(".title"),
        ac_close = ac.querySelector(".close"),
        aside = ac.querySelector(".aside");

    let inWidth = document.body.clientWidth,
        ac_width = ac.offsetWidth,
        aside_width = aside.offsetWidth-6,
        ac_flag = true;

    aside.addEventListener("click", function(){
        let target = 0;
        if(ac_flag){
            target = inWidth-5;
            slide(ac, target);
            slide(title, target+5);
            slide(aside, target-aside_width);
        }else{
            target = inWidth - ac_width;
            slide(ac, target);
            slide(title, target+5);
            slide(aside, target-aside_width);
        }
        ac_flag = !ac_flag;
    })
    aside.click();
    ac_close.addEventListener("click", function(){
        let target = 0;
        if(ac_flag){
            target = inWidth;
            slide(ac, target);
            slide(title, target+5);
            slide(aside, target-aside_width);
        }
        ac_flag = !ac_flag;
    })

    // 缓动动画函数
    function play(obj, target, callback){
        // 清除定时器，以防多个定时器导致速度叠加
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            // 缓动动画效果
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(obj.offsetLeft === target){
                clearInterval(obj.timer);
                if(callback) callback();
            }else{
                obj.style.left = obj.offsetLeft + step + "px";
            }
        }, 15)
    }

    // 焦点轮播图carousel封装动画
    function carousel(obj, interval){
        let width = obj.querySelector("li").offsetWidth,
            prev = obj.parentNode.querySelector(".prev"),
            next = obj.parentNode.querySelector(".next"),
            lis = obj.querySelectorAll("li.sub"),
            len = lis.length;

        let timer = null,   
            count = 0,
            flag = true;
        
        // clone第一张轮播图，添加到obj末尾
        obj.appendChild(lis[0].cloneNode(true));

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
                play(obj, -width * count, function(){
                    flag = true;
                });
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
                play(obj, -width * count, function(){
                    flag = true;
                });
            } 
        })

        // 轮播图自动播放动画效果
        function autoPlay(){
            timer = setInterval(function(){
                next.click();
            }, interval);
        }

        // 轮播图停止播放动画效果
        function stopPlay(){
            clearInterval(timer);
            timer = null;
        }

        autoPlay();
        obj.addEventListener("mouseover", function(){
            stopPlay();
        })

        obj.addEventListener("mouseout", function(){
           autoPlay();
        })
    }

    // 焦点轮播图carousel-btn封装动画
    // 带有下方点击/转换按钮
    function carouselBtn(obj, interval){
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

        // 点击相应按钮，跳转到对应的轮播图图片
        let btn = buttons.querySelectorAll("li");
        for(let i = 0; i < len; i++){
            btn[i].addEventListener("click", function(){
                play(obj, -width * this.index);
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
                play(obj, -width * count, function(){
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
                play(obj, -width * count, function(){
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
            }, interval);
        }

        // 轮播图停止播放动画效果
        function stopPlay(){
            clearInterval(timer);
            timer = null;
        }

        autoPlay();
        obj.addEventListener("mouseover", function(){
            stopPlay();
        })

        obj.addEventListener("mouseout", function(){
           autoPlay();
        })
    }

    // banner部分焦点图轮播动画
    let carousel_banner = document.querySelector("#banner > ul");
    carouselBtn(carousel_banner, 4500);

    // banner-side焦点图轮播动画
    let carousel_banner_side = document.querySelector("#banner-side > ul");
    carousel(carousel_banner_side, 6000);

    // main 秒杀 middle 焦点图轮播动画
    let carousel_miaosha_middle = document.querySelector("#main .miaosha .middle > ul");
    carousel(carousel_miaosha_middle, 8000);

    // main 秒杀 right 焦点图轮播动画
    let carousel_miaosha_right = document.querySelector("#main .miaosha .right > ul");
    carousel(carousel_miaosha_right, 3000);

    // main channel 焦点图轮播动画
    let carousel_channel = document.querySelector("#channel .carousel > ul");
    carousel(carousel_channel, 12000);



    // logIn tab栏切换效果
    // tab栏切换动画包装函数
    function tabChange(menus, tabs){
        let len = menus.length;
        
        for(let i = 0; i < len; i++){
            menus[i].index = i;
        }
        for(let i = 0; i < len; i++){
            menus[i].addEventListener("mouseenter", function(){
                for(let j = 0; j < len; j++){
                    menus[j].querySelector("a").style.color = "inherit";
                    tabs[j].style.display = "none";
                }
                this.querySelector("a").style.color = "red";
                tabs[this.index].style.display = "block";

                let sub_menus = tabs[this.index].querySelectorAll(".menu > li");
                if(sub_menus.length > 0){
                    sub_menus[0].querySelector("a").style.color = "red";
                    for(let i = 1; i < sub_menus.length; i++){
                         sub_menus[i].querySelector("a").style.color = "inherit";
                    }
                }
            })
        }
    }

    // 一级tab栏切换
    let menus = document.querySelectorAll("#logIn .icons .wrap > .menu > li"),
        tabs = document.querySelectorAll("#logIn .icons .wrap > .tab > li")
        len = menus.length;

    for(let i = 0; i < len; i++){
        menus[i].addEventListener("mouseenter", function(){
            for(let j = 0; j < len; j++){
                menus[j].querySelector("a").style.borderColor = "transparent";
            }
            this.querySelector("a").style.borderColor = "red";
        })
    }
    tabChange(menus, tabs);

    // 二级tab栏切换
    for(let i = 0; i < len; i++){
        let sub_menus = tabs[i].querySelectorAll(".menu > li"),
            sub_tabs = tabs[i].querySelectorAll(".tab > li");
        tabChange(sub_menus, sub_tabs);
    }
      
    // 点击关闭按钮，关闭wrap里面的tab栏
    let wrap = document.querySelector("#logIn .icons .wrap"),
        tab_close = wrap.querySelector(".close a");

    tab_close.addEventListener("click", function(){
        wrap.style.display = "none";
    })

    // 鼠标mouseover时，wrap tab栏显示
    let list = document.querySelectorAll("#logIn .icons .list > li");

    for(let i = 0; i < list.length; i++){
        list[i].index = i;
    }

    for(let i = 0; i < len; i++){
        list[i].addEventListener("mouseover", function(){
            setTimeout(function(){
                wrap.style.display = "block";
            }, 500); 
            tabs[this.index].style.display = "block";

            for(let j = 0; j < len; j++){
                menus[j].querySelector("a").style.borderColor = "transparent";
                tabs[j].querySelector("a").style.color = "#333";
            }
            menus[this.index].querySelector("a").style.borderColor = "red";
        })
    }
    


     // elevator侧边栏位置&回到顶部动画效果
     let elevator = document.querySelector(".elevator"),
         elevatorTop = elevator.querySelector(".top"),
         main = document.querySelector("#main"),
         miaosha = document.querySelector("#main .miaosha"),
         miaoshaTop = main.offsetTop + miaosha.offsetTop;

    // 判断document当前位置改变elevator动画
    function position(){
        if(window.pageYOffset > miaoshaTop){
            elevator.style.position = "fixed";
            elevator.style.top = "145px";
            elevatorTop.style.display = "block";
        }else{
            elevator.style.position = "absolute";
            elevator.style.top = miaosha.offsetTop + "px";
            elevatorTop.style.display = "none";
        }
    }
    // 在scroll事件预先执行一次
    // 防止刷新时elevator不显示问题
    position();
    // 根据document滚动的距离改变侧边栏的位置
    document.addEventListener("scroll", function(){
        position();
    })

    // 修改缓动动画函数为document返回顶部动画
    function scroll(obj, target){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            let step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(window.pageYOffset === target){
                clearInterval(obj.timer);
            }else{
                obj.scroll(0, window.pageYOffset + step);
            }
        }, 15)
    }
    elevatorTop.addEventListener("click", function(){
        scroll(window, 0);
    })

    

    //main miaosha left秒杀倒计时效果
    let hour = document.querySelector("#main .left .hour"),
        minute = document.querySelector("#main .left .minute"),
        second = document.querySelector("#main .left .second");

    let date = new Date('2019-11-10T14:00:00').getTime(),
        timer = null;

    // 倒计时计算显示函数
    function showTime(){
        let now = Date.now(), h, m, s;
        let time = Math.ceil((date-now)/1000);
        if(time <= 0){
            hour.innerHTML = "00";
            minute.innerHTML = "00";
            second.innerHTML = "00";
            clearInterval(timer);
        }else{
            h = Math.floor(time / 3600),
            m = Math.floor(time % 3600 / 60),
            s = time % 3600 % 60;
            hour.innerHTML = h < 10 ? "0"+h : h;
            minute.innerHTML = m < 10 ? "0"+m : m;
            second.innerHTML = s < 10 ? "0"+s : s;
        }
    }
    // 在定时器之前执行一次
    // 防止刷新/刚进入页面时显示板时间错误
    showTime();
    timer = setInterval(function(){
        showTime();
    }, 1000) 
})