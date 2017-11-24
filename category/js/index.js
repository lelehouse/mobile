/*
 * @Author: zhengwei
 * @Date:   2017-01-18 11:19:35
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-01-18 11:19:37
 */

'use strict';

window.onload = function() {
        searchEffect();
        downTime();
        slideEffect();
    }
    // 搜索框JS
function searchEffect() {
    /*1. 需求： 实现顶部搜索框的背景色渐变 (当滚动条滚动的距离在轮播以内的时候会从透明度从0-1) 
     当超过了滚动的距离超过了轮播图的区域就固定一个透明度
  2. 实现思路 ：
    1. 添加一个滚动条的滚动事件 不断获取滚动条的距离
    2. 获取轮播图的高度 和 滚动条距离对比
    3. 如果滚动条距离小于轮播图的高度 设置头部的透明度为0-1(最大透明度* 滚动条距离/轮播图的高度) 
    4. 如果滚动条距离大于轮播图的高度 设置一个最大的透明度*/
    //1. 添加一个滚动条滚动事件
    window.addEventListener('scroll', function() {
        //2. 获取滚动条滚动的距离
        var scrollTop = document.body.scrollTop;
        //3. 获取轮播图容器的高度
        var slideHeight = document.querySelector('#slide').offsetHeight;
        if (scrollTop > slideHeight) {
            document.querySelector('#topbar').style.backgroundColor = "rgba(201,21,35,1)";
        } else {
            var opcity = scrollTop / slideHeight * 1;
            document.querySelector('#topbar').style.backgroundColor = "rgba(201,21,35," + opcity + ")";
        }
    })
}
// 倒计时JS
function downTime() {
    /*1. 需求：实现秒杀倒计时 用总时间 每秒减1秒总时间 减完之后 
      分别求出时分秒 并且分别求出十位个位设置到对应的span
  2. 实现思路： 
     1. 定义一个总时间(秒数)
     2. 设置一个定时器每秒执行一次 在定时器里面执行 总时间--
     3. 分别求出时分秒
      时:  10800 / 3600 == 3  总时间 / 3600 == 时
      分: 7300 % 3600 == 100    3800 % 3600 == 200 / 60 总时间 % 3600 / 60 == 分
      秒: 100 % 60 == 40  3640 % 60  == 40  总时间 % 60
      十位: 21 / 10 == 2 十位
      个位: 21 % 10 == 1 个位
      4. 获取所有span分别设置到时分秒对应的区域
      5. 获取当前 时间  和 获取未来时间 (今天中午12点)  用未来时间 - 当前时间*/
    //定义一个总时间
    var time = 3600;
    //添加一个定时器
    setInterval(function() {
        time--;
        var shi = Math.floor(time / 3600);
        var fen = Math.floor(time % 3600 / 60);
        var miao = Math.floor(time % 60);
        var spans = document.querySelectorAll('.seckill-downtime span');
        spans[0].innerHTML = Math.floor(shi / 10);
        spans[1].innerHTML = Math.floor(shi % 10);
        spans[3].innerHTML = Math.floor(fen / 10);
        spans[4].innerHTML = Math.floor(fen % 10);
        spans[6].innerHTML = Math.floor(miao / 10);
        spans[7].innerHTML = Math.floor(miao % 10);
    }, 1000);
}
// 轮播图JS
function slideEffect() {
    /*  1. 需求：
            1. 实现轮播图无缝自动轮播
            2. 实现轮播图的左右滑动和预览图片
            3. 实现轮播滑动结束后判断切换到上一张和下一张和回弹
            4. 实现轮播图切换后小圆点也跟着变动
        2. 实现思路
            1. 实现自动无缝轮播
                1. 定义一个轮播的索引index=1
                2. 定义一个定时器每2秒走一次 每次index++
                3. 设置轮播图容器的偏移index*slideWidth 同时添加过渡
                4. 添加一个过渡完成事件判断当轮播图从第8张到第一张走完的时候切换到第一张的真实位置
                5. 同时清除过渡 设置位移到第一张的真实位置
            2. 实现轮播图的左右滑动切换图片
                1. 给轮播图容器添加滑动开始和滑动中事件
                2. 在滑动开始的事件里面记录滑动开始手指的位置
                3. 在滑动中的时候记录滑动中手指的位置
                4. 用滑动中手指的位置-滑动开始手指的位置 求得滑动的距离
                5. 将滑动距离作为偏移加上轮播图已经到达的位置 设置到轮播图容器上 同时清除过渡
            3. 实现轮播图滑动结束后判断滑动距离切换图片还是回弹
                1. 给轮播图容器添加滑动结束事件
                2. 判断distanceX的值有没有超过一张图的1/3
                3. 如果超过1/3再判断distanceX的值是正值还是负值
                4. 如果是正值 则表示从左往右滑 切换到上一张 index-- 设置位移设置过渡
                5. 如果是负值 则表示从右往左滑 切换到下一张 index++ 设置位移设置过渡
                6. 如果distanceX的值不超过一张图的1/3则回弹 index没有变化直接设置位移设置过渡
                7. 当轮播图从第1张往左滑动到第8张滑动完的时候要切换到第8张的真实位置
                8. 在过渡完成事件里面判断index<=0的时候index=8 清除过渡设置位移
                9. 同时在滑动结束后再次重新添加定时器
    */
    //定义一个index表示当前轮播图的索引从1开始因为轮播图默认有1张图偏移
    var index = 1;
    var slide = document.querySelector('#slide');
    var slideWidth = slide.offsetWidth;
    var slideUl = slide.querySelector('ul:first-of-type');
    var timer;
    function startTimer() {
      timer = setInterval(function() {
          //index每次++切换到下一张
          index++;
          //添加过渡
          slideUl.style.transition = "all 0.2s";
          //设置位移 记得带px单位
          slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
      }, 1000);
    }
    startTimer();
    //添加一个过渡完成事件
    slideUl.addEventListener('transitionend', function() {
        if (index >= 9) {
            index = 1;
            slideUl.style.transition = "none";
            slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
        }else if(index <= 0){
            index = 8;
            slideUl.style.transition = "none";
            slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
        }
    });
    var startX, moveX, distanceX;
    //添加滑动开始事件
    slideUl.addEventListener('touchstart', function(e) {
        //获取滑动开始的位置
        startX = e.touches[0].clientX;
        //在滑动开始的时候清除定时器 不让再自动轮播
        clearInterval(timer);
    });
    //添加滑动中事件
    slideUl.addEventListener('touchmove', function(e) {
        moveX = e.touches[0].clientX;
        //计算滑动的距离
        distanceX = moveX - startX;
        //设置滑动距离+当前轮播图的位置偏移 注意用()包起来先计算不然容易拼成字符串
        slideUl.style.transform = "translateX(" + (-index * slideWidth + distanceX) + "px)";
        //滑动中的时候距离很小所以不再需要过渡 清除过渡
        slideUl.style.transition = "none";
    });
    //添加滑动结束事件
    slideUl.addEventListener('touchend', function() {
        //判断滑动的距离有没有超过一张图的1/3因为滑动的距离可能是负值 所以取绝对值判断
        if (Math.abs(distanceX) > (slideWidth * 1 / 3)) {
            //如果滑动距离大于0表示从左往右滑切换到上一张index--
            if (distanceX > 0) {                
                index--;
                slideUl.style.transition = "all 0.2s";
                slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
            } else if (distanceX < 0) {//如果滑动距离小于0表示从右往左滑切换到下一张index++
                index++;
                slideUl.style.transition = "all 0.2s";
                slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
            }
        } else {
            slideUl.style.transition = "all 0.2s";
            slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
        }
        //滑动结束后重新开始定时器
        startTimer();
    });
}
