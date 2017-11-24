/*
 * @Author: zhengwei
 * @Date:   2016-06-15 18:21:57
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-06-19 11:59:41
 */

'use strict';
window.onload = function() {
    //调用左侧滑动
    leftSwipe();
    //调用右侧滑动
    swipeRigth();
}

function leftSwipe() {
    /**
     * 1.要求垂直方向的滑动
     * 2.当滑动到一定距离的时候滑动不了
     * 3.当滑动的位置超过了最小和最大允许的定位范围的时候吸附回去
     * 4.点击li的时候改变当前的元素的样式
     * 5.并且需要滑动到屏幕的顶部位置
     * 6.当底部触底的时候滑动不了
     */
    //获取父盒子
    var parentBox = document.querySelector('.category-left');
    //获取子盒子
    var childBox = parentBox.querySelectorAll('ul')[0];
    //父盒子的高度
    var parentH = parentBox.offsetHeight;
    //子盒子的高度
    var childH = childBox.offsetHeight;
    //获取定位的区间
    var maxPosition = 0; //最大的定位区间
    var minPosition = parentH - childH; //最小的定位区间

    //缓冲的距离  吸附的距离
    var distance = 150;
    //获取滑动的时候的定位区间
    var minSwipe = minPosition - distance;
    var maxSwipe = maxPosition + distance;
    var startY = 0; //开始触摸的Y坐标
    var moveY = 0; //滑动的时候的Y坐标
    var distanceY = 0; //滑动改变的距离
    var isMove = false; //是否滑动过
    //贯穿全局的当前定位值
    var currentY = 0;
    //滑动开始事件
    childBox.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    //滑动中的事件
    childBox.addEventListener('touchmove', function(e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        removeTransition();
        //我们使用将要定位的位置来做判断
        //当现在要定位的位置在最大和最小滑动区间内才允许滑动
        if ((currentY + distanceY) > minSwipe && (currentY + distanceY) < maxSwipe) {
            setTranslateY(currentY + distanceY);
        }
    });
    //滑动结束事件
    window.addEventListener('touchend', function(e) {
        //最终定位
        //大于最大定位的时候
        if ((currentY + distanceY) > maxPosition) {
            currentY = maxPosition;
            addTransition();
            setTranslateY(currentY);
        }
        //小于最小定位的时候
        else if ((currentY + distanceY) < minPosition) {
            currentY = minPosition;
            addTransition();
            setTranslateY(currentY);
        } else {
            //记录当前滑动完成后的定位
            currentY = currentY + distanceY;
        }
        // //重置参数
        // startY = 0;
        // moveY = 0;
        // distanceY = 0;
        // isMove = false;
    });
    //为什么写在外面 写在外面只要查找一次提升性能
    var lis = childBox.querySelectorAll('li');
    //点击
    itcast.tap(childBox, function(e) {
        //这个时候的事件源是我们的a标签
        //我们是不是要给Li加上now的样式
        //通过事件源的父元素取得li标签
        var li = e.target.parentNode;
        //加类之前是不是要把所有的li的类名清空
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            lis[i].index = i;
        }
        li.className = "now";
        // console.log(li);
        console.log(li.index);
        //计算将要定位的位置
        var translateY = -li.index * 50;
        //当我们的定位在定位区间内才允许滑动
        if (translateY > minPosition) {
            currentY = translateY;
            //加过渡
            addTransition();
            //设置定位
            setTranslateY(currentY);
        }
        //当超过我们的定位区间保持我们的最小定位
        else {
            //设置当前位置
            currentY = minPosition;
            setTranslateY(currentY);
        }
    });
    //加过渡
    var addTransition = function() {
            childBox.style.webkitTransition = 'all 0.2s'; //兼容
            childBox.style.transition = 'all 0.2s';
        }
        //删除过渡
    var removeTransition = function() {
            childBox.style.webkitTransition = 'none'; //兼容
            childBox.style.transition = 'none';
        }
        //定位方法
        // x参数是当前定位的位置值传进来
    var setTranslateY = function(y) {
            childBox.style.webkitTransform = 'translateY(' + y + 'px)';
            childBox.style.transform = 'translateY(' + y + 'px)';
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

function swipeRigth() {
    //调用滑动方法
    itcast.iScroll({
        swipeDom: document.querySelector('.category-right'),
        swipeType: 'y',
        swipeDistance: 50
    });
}
