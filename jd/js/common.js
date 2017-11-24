/*
 * @Author: zhengwei
 * @Date:   2016-06-15 16:59:22
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-06-16 10:44:29
 */

'use strict';
// 声明了一个全局对象
window.itcast = {};
//在 itcast下声明事件绑定函数
itcast.transitionEnd = function(dom, callback) {
    if (typeof dom == "object") {
        dom.addEventListener('webkitTransitionEnd', function() {
            callback && callback();
        });
    }
}
itcast.tap = function(dom, callback) {
        if (typeof dom == "object") {
            var isMove = false;
            var time = 0;
            dom.addEventListener('touchstart', function() {
                //为什么要计时 因为如果常桉在屏幕上超过300ms的时候就没意义了
                //计时开始
                // console.time('time');
                time = Date.now();
            });
            dom.addEventListener('touchmove', function() {
                // console.log("touchmove");
                //当滑动过
                isMove = true;
            });
            window.addEventListener('touchend', function(e) {
                // console.log("touchend");
                //计时结束
                // console.timeEnd('time');
                //在tap事件要求响应时间比click快  100ms
                if (isMove == false && (Date.now() - time) < 150) {
                    //为了提高响应的速度
                    // console.log('tap');
                    callback && callback(e);
                }
                //为什么要重置 因为tap事件只调用了一次
                //当ismMove的滑动过了之后就一直是true了
                //即使我们下次再去点击我们的isMove == true 还是等于true
                //所以我们的点击事件就无法触发了
                //所以每次点击完之后要重置一下
                isMove = false;
                time = 0;
            });

        }
    }
    //这样调用
    // itcast.transitionEnd();
