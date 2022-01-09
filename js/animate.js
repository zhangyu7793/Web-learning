function animate(obj, target, callback) {
    // 清除之前的定时器
    clearInterval(obj.timer);
    var timer = setInterval(function () {

        // 步长
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 停止条件
        if (obj.offsetLeft == target) {
            clearInterval(timer);
            if(callback){
                callback();
            }
        }
        
        // 变速移动
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 10)
}