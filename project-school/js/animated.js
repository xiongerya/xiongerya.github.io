window.addEventListener("load", function(){
    // logo部分search表单获得焦点，placeholder消失
    let search = document.querySelector(".wrapper-search").querySelector("input");
    search.addEventListener("focus", function(){
        this.placeholder = "";
    })



    // menu点击li.sub显示sub-menu动画效果
    let subs = document.querySelectorAll("#menu > li.sub"),
        bg = document.querySelector(".bg");

    let flag = true;

    for(let i = 0; i < subs.length; i++){
       subs[i].addEventListener("click", function(){
            if(flag){
                bg.style.height = "270px";
            }else{
                bg.style.height = "0";
            } 
            flag = !flag;  
        })
    }
    // 自适应布局下点击ul.btn显示左侧隐藏菜单
    // 点击li.sub显示sub-menu动画效果
    let body = document.body,
        nav = document.querySelector("nav"),
        showBtn = document.querySelector("header > ul.btn");
    
    showBtn.flag = true;

    showBtn.addEventListener("click", function(){
        if(this.flag){
            body.style.marginLeft = "200px";
            nav.style.width = "200px";
        }else{
            body.style.marginLeft = "0";
            nav.style.width = "0";
        }
        this.flag = !this.flag;
    })


    
    // banner 焦点图轮播动画效果
    let banner = document.querySelector("#banner"),
        prev = banner.querySelector(".prev"),
        next = banner.querySelector(".next"),
        container = banner.querySelector(".container"),
        imgs = container.querySelectorAll("li");

    let len = imgs.length,
        width = imgs[0].offsetWidth,
        flag_carousel = true,
        timer = null, 
        num = 0;
    
    // 为每一张轮播图添加一个index属性值
    // 利用index属性值进行越界判断和位移计算
    // 用于轮播图下有btn进行点击跳转的时候
    for(let i = 0; i < len; i++){
        imgs[i].index = i;
    }

    // 在container最后复制/克隆第一张轮播图
    // 实现轮播图滚动时的无缝衔接效果
    container.appendChild(imgs[0].cloneNode(true));
    
    // 设置点击按钮播放焦点图动画
    // 通过改变container的margin-left值进行轮播效果
    // 设置speed增加平滑滚动的轮播图效果
    function animate(obj, target, callback){ 
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(obj.offsetLeft === target){
                clearInterval(obj.timer);
                if(callback) callback();
            }else{
                obj.style.marginLeft = obj.offsetLeft + step + "px";
            } 
        }, 15);
    }

    // 为prev next 添加轮播图点击动画
    prev.addEventListener("click", function(){
        if(flag_carousel){
            flag_carousel = false;
            if(num === 0){
                num = len;
                container.style.marginLeft = -num*width + "px";
            }
            num--;
            animate(container, -num*width, function(){
                flag_carousel = true;
            });
        }       
    });
    next.addEventListener("click", function(){
        if(flag_carousel){
            flag_carousel = false;
            if(num === len){
                num = 0;
                container.style.marginLeft = 0;
            }
            num++;
            animate(container, -num*width, function(){
                flag_carousel = true;
            });  
        }
    });

    // 设置自动播放焦点图动画
    // 手动设置click事件实现
    function autoPlay(){
        timer = setInterval(function(){
            next.click();
        }, 3000);
        
    }

    // 设置鼠标悬停停止播放焦点图动画
    function stopPlay(){
       clearInterval(timer);
    }

    autoPlay();
    container.addEventListener("mouseover", function(){
        stopPlay();
    })
    container.addEventListener("mouseout", function(){
        autoPlay();
    })



    // footer部分点击三角形TOP回到顶部动画
    let top = document.querySelector(".tri p");

    //立即回到顶部，没有平滑滚动过渡的效果
    // top.addEventListener("click", function(){
    //     window.scroll(0, 0);
    //     console.log(window.pageYOffset);
    // })

    // 经过平滑滚动回到顶部的过渡效果
    top.addEventListener("click", function(){
        window.timer = setInterval(function(){
            // 缓动动画效果
            let step = Math.floor((0 - window.pageYOffset) / 10);
            if(window.pageYOffset === 0){
                clearInterval(window.timer);
            }
            window.scrollBy(0, step);
            // console.log(window.pageYOffset);
        }, 15)
    })
   
});