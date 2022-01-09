window.addEventListener('load', function () {
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        // 鼠标存在停止定时器
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function () {
            arrowr.click();
        }, 3000);

    })
    var ul = focus.querySelector('ul');
    var focusWidth = focus.offsetWidth;
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 设置自定义属性 索引
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 小圆圈排他结构
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            // 把索引传给num
            num = index;
            circle = index;
            // 调用动画
            animate(ul, -index * focusWidth);
        })

    }
    ol.children[0].className = 'current';
    // 克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // circle控制小圆圈播放
    var circle = 0;
    var num = 0;
    var flag = true;
    // 右侧按钮
    arrowr.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 链接点击按钮和下方小圆圈
            circle++;
            if (circle == ul.children.length - 1) {
                circle = 0;
            }
            // 选定按钮样式更改
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }

    })
    // 左侧按钮
    arrowl.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 链接点击按钮和下方小圆圈
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }

    })
    // 自动播放功能
    var timer = setInterval(function () {
        // 调用点击右侧按钮函数
        arrowr.click();
    }, 3000);



    
    // 电梯导航栏模块
    $(function () {
        var toolTop = $(".recom").offset().top;
        var windowTop = $(".shortcut").offset().top;
        
        // 添加节流阀
        var flag = true
        // 页面加载后调用一次函数
        toggleToll();
        function toggleToll() {
            if ($(document).scrollTop() >= toolTop) {
                $(".fixedtool").fadeIn();
                $(".backtop").fadeIn();
            } else {
                $(".fixedtool").fadeOut();
                $(".backtop").fadeOut();
            }
        }
        $(window).scroll(function () {
            toggleToll();
            // 滚动模块时更改导航栏
            if(flag){
                $(".floor .w").each(function (i, ele) {
                    if ($(document).scrollTop() >= $(ele).offset().top-10) {
                        // console.log(i);
                        $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                    }
                })
            }
        })
        // 点击时滚动到相应模块
        $(".fixedtool li").click(function () {
            flag = false;
            // 链接索引
            var index = $(this).index();
            var current = $(".floor .w").eq(index).offset().top;
            $("body,html").stop().animate({
                scrollTop: current
            },function(){
                flag = true;
            });
            // 点击时添加current类
            $(this).addClass("current").siblings().removeClass();
        })
        $(".backtop").click(function(){
            $("body,html").stop().animate({
                scrollTop: windowTop
            });
        })
    })

})
