/*
 * @Author: zhengwei
 * @Date:   2016-06-14 16:14:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-06-16 17:14:12
 */

'use strict';
window.onload = function() {
    // 调用搜索效果
    search();
    // 调用轮播图效果
    banner();
    //调用秒杀
    downTime();
}

// 搜索效果方法
function search() {
    /*
    1.当页面滚动时盒子的透明度不断的加深
    2.当页面滚动的高度超过 banner的高度的时候透明度不变*/
    //获取到我们需要操作的盒子
    //搜索盒子
    var searchBox = document.getElementsByClassName('header-box')[0];
    // 轮播图盒子
    var bannerBox = document.getElementById('banner');
    var bannerHeight = bannerBox.offsetHeight;
    window.onscroll = function() {
        //获取距离顶部的高度
        var top = document.body.scrollTop;
        //判断
        var opcity = 0; //默认是完全透明
        if (top < bannerHeight) {
            opcity = top / bannerHeight * 0.85; //根据比例最大透明度是0.85
        } else {
            opcity = 0.85;
        }
        //设置背景色
        searchBox.style.background = "rgba(201, 21, 35, " + opcity + ")";
    }
}
// // 轮播图
function banner() {
    /*
      1.图片自动滚起来
      2.小圆点也要跟着滚动起来
      3.滚动的时候需要动画
      4.图片盒子需要滑动
      5.当滑动不超过1/3的时候 让他吸附回去
      6.当滑动超过1/3的时候让他切换到上一张或者下一张
     */
    /*获取banner对象*/
    var banner = document.querySelector('#banner');
    //获取图片盒子
    var imageBox = banner.querySelectorAll('ul')[0];
    // 获取小圆点盒子
    var pointBox = banner.querySelectorAll('ul')[1];
    //获取所有的点
    var points = pointBox.querySelectorAll('li');
    //获取宽度
    var width = banner.offsetWidth;
    var index = 1; //默认的索引位置

    var timer = setInterval(function() {
        index++;
        //调用加过渡
        addTransition();
        //定位
        setTranslateX(-index * width);
    }, 1000);
    //transtionEnd  过渡结束的时候触发的事件
    //animationEnd 动画结束的时候触发的事件
    //过渡结束的时候判断当前的索引位置 来无缝衔接
    //由于还没有兼容这个事件所以必须加上前缀
    itcast.transitionEnd(imageBox, function() {
        if (index >= 9) {
            index = 1;
            // 瞬间定位到第一张所以要删除过渡
            removeTransition();
            setTranslateX(-index * width);
        } else if (index <= 0) {
            //当第0张图片的时候要让他跳到最后一张图片
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        // 运行到这个位置的时候过渡完成之后执行切换点
        //index的范围是1 - 8
        //调用设置点的方法
        setPoint(index);
    });
    // 记录触摸开始的时候的x坐标
    var startX = 0;
    //记录滑动的时候的X的坐标
    var moveX = 0;
    //滑动的距离
    var distanceX = 0;
    //记录一下有没有滑动过
    var isMove = false;
    //绑定事件滑动开始事件
    imageBox.addEventListener('touchstart', function(e) {
        //记录x的位置
        startX = e.touches[0].clientX;
        clearInterval(timer); //清除定时器
    });
    //绑定事件滑动的时候事件
    imageBox.addEventListener('touchmove', function(e) {
        //不停的记录滑动时候的x坐标
        moveX = e.touches[0].clientX;
        //改变的距离
        distanceX = moveX - startX;
        removeTransition();
        setTranslateX(-index * width + distanceX);
        //设置已经滑动过
        isMove = true;
    });
    //绑定事件滑动结束事件 在最终完成touchend事件完成后触发
    //因为在模拟器中会有Bug
    //真机上不存在这个问题可以使用imageBox
    window.addEventListener('touchend', function(e) {
        //如果滑动的距离超过1/3让他向上或向下滑动
        if (Math.abs(distanceX) > (width / 3) && isMove) {
            //上一张
            if (distanceX > 0) {
                index--;
            }
            //下一张
            else {
                index++;
            }
            addTransition();
            setTranslateX(-index * width);
        } else {
            //不超过1/3 吸附回去
            addTransition();
            setTranslateX(-index * width);
        }
        //重置记录的参数的值
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
        //加上定时器
        clearInterval(timer); //防止这里还有定时器再清除一下定时器
        timer = setInterval(function() {
            index++;
            //调用加过渡
            addTransition();
            //定位
            setTranslateX(-index * width);
        }, 2000);
    });
    //加过渡
    var addTransition = function() {
        imageBox.style.webkitTransition = 'all 0.2s'; //兼容
        imageBox.style.transition = 'all 0.2s';
    }

    //删除过渡
    var removeTransition = function() {
            imageBox.style.webkitTransition = 'none'; //兼容
            imageBox.style.transition = 'none';
        }
        //定位方法
        // x参数是当前定位的位置值传进来
    var setTranslateX = function(x) {
            imageBox.style.webkitTransform = 'translateX(' + x + 'px)';
            imageBox.style.transform = 'translateX(' + x + 'px)';
        }
        //设置点的当前样式
    var setPoint = function(index) {
        //遍历points里面是所有属性 其中包含了一个length
        for (var i in points) {
            //points[length]的时候没有className属性所以要判断一下
            if (points[i].className) {
                points[i].className = "";
            }
        }
        //设置当前的index索引
        //找到当前图片对应的点
        points[index - 1].className = "now";
    }
}
var downTime = function() {
    var time = 5 * 60 * 60;
    //获取倒计时盒子
    var timeBox = document.getElementsByClassName('sk-time')[0];
    //获取所有的span
    var spans = timeBox.getElementsByTagName('span');
    var timer = setInterval(function() {
        if (time <= 0) {
            clearInterval(timer);
            return false;
        }
        time--;
        //计算时分秒
        //小时
        //注意这里别写错了写成timer timer是定时器 time才是秒杀倒计时事件
        var h = Math.floor(time / 3600); //小时
        //分钟
        var m = Math.floor(time % 3600 / 60);
        //秒
        var s = Math.floor(time % 60);
        console.log(h + ":" + m + ":" + s)
            //除以10取第一位 如果是23时除以10等于 2
        spans[0].innerHTML = Math.floor(h / 10);
        //取模10第二位 如果是23是 取模10 是 3
        spans[1].innerHTML = Math.floor(h % 10);
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = Math.floor(m % 10);
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = Math.floor(s % 10);
    }, 1000);

}
