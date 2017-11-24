/*
 * @Author: zhengwei
 * @Date:   2016-06-16 15:54:43
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-08-31 21:59:16
 */

'use strict';
window.onload = function() {
        //调用删除商品方法
        deleteProduct();
    }
    //删除方法
function deleteProduct() {
    /*
      1.让弹出框动画的显示出来
      2.打开盖子
      3.点击取消的时候隐藏弹出框
      4.同时盖上盖子
     */
    //获取弹出框
    var win = document.querySelector('#win');
    //获取弹出框里面的子盒子
    var bounceBox = win.querySelector('.win-box');
    //获取所有的删除按钮
    var deleteBtns = document.querySelectorAll('.delete-box');
    var deleteBox = {};
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].onclick = function() {
            //点击的时候需要盒子做动画 加上class bounceInDown
            //做动画之前要让win显示出来
            win.style.display = "block";
            //动画
            bounceBox.className = "win-box bounceInDown";
            deleteBox = this;
            var deleteUp = deleteBox.querySelector('span:first-child');
            //打开盖子
            deleteUp.style.webkitTransition = "all 1s";
            deleteUp.style.transition = "all 1s";
            //旋转盖子
            deleteUp.style.webkitTransform = "rotate(-45deg) translateY(3px)";
            deleteUp.style.transform = "rotate(-45deg) translateY(3px)";
            //改变旋转原点的位置 默认是在中心点我们要他在左下角的点
            deleteUp.style.webkitTransformOrigin = "0 5px";
            deleteUp.style.transformOrigin = "0 5px";
        }
    }
    //取消的点击事件
    win.querySelector('.cancel').onclick = function() {
        //隐藏弹出框
        win.style.display = "none";
        //盖上盖子
        //当点击过后
        if (deleteBox) {
            var deleteUp = deleteBox.querySelector('span:first-child');
            deleteUp.style.webkitTransform = "none";            
        }
    }
}