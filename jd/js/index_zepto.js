/*
 * @Author: zhengwei
 * @Date:   2016-06-16 17:27:39
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-08-31 22:36:26
 */

'use strict';
$(function() {
    //获取到banner
    var $banner = $('#banner');
    //图片盒子
    var $imageBox = $banner.find('ul:eq(0)');
    //点盒子
    var $pointBox = $banner.find('ul:eq(1)');
    //宽度
    var width = $banner.width();
    //索引
    var index = 1;
    var timer = setInterval(function() {
        index++;
        anmiteFun();

    }, 1000);

    function anmiteFun(callback) {
        //动画
        $imageBox.animate({
            'transform': 'translateX(-' + index * width + 'px)' },
             200, 'ease', function() {
            if (index >= 9) {
                index = 1;
                $imageBox.css({ 'transform': 'translateX(-' + index * width + 'px)' });
            } else if (index <= 0) {
                index = 8;
                $imageBox.css({ 'transform': 'translateX(-' + index * width + 'px)' });
            }
            $pointBox.find('li').removeClass('now').eq(index - 1).addClass('now');
            //动画结束加定时器
            callback && callback();
        });
    }
    //绑定滑动事件
    //绑定右滑事件
    $imageBox.on('swipeLeft', function() {
        clearInterval(timer);
        index++;
        anmiteFun(function() {
            timer = setInterval(function() {
                index++;
                anmiteFun();

            }, 1000);
        });

    });
    //绑定左滑事件
    $imageBox.on('swipeRight', function() {
        clearInterval(timer);
        index--;
        anmiteFun(function() {
            timer = setInterval(function() {
                index++;
                anmiteFun();

            }, 1000);
        });
    })
});
