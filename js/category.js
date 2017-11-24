window.onload = function(){
    leftslide();
}

function leftslide(){
    var startY = moveY = distanceY = currentY = 0;
    
    var cateUl = document.querySelector(".category-left ul");
    var lis = cateUl.querySelectorAll("li");
    var length = lis.length;
     
    //滑动
    cateUl.addEventListener("touchstart",function(e){
        startY = e.touches[0].clientY;
    });
    
    cateUl.addEventListener("touchmove",function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY; 
        if((currentY + distanceY) < slidemax  && (currentY + distanceY) > slidemin){
            cateUl.style.transform = 'translateY('+ (currentY+distanceY) +'px)';
            cateUl.style.transition = "all .2s";
        }
    });
    
    cateUl.addEventListener("touchend",function(){
        currentY += distanceY;
        if(currentY > positionmax){
            currentY = positionmax;
        }
        if(currentY < positionmin){
            currentY = positionmin;
        }
        cateUl.style.transform = 'translateY('+ currentY +'px)';
        cateUl.style.transition = "all .2s";
    });
    
    //獲取左侧父盒子的高度
    var height = document.querySelector(".category-left").offsetHeight;
    var ulheight = cateUl.offsetHeight;
    var positionmax = 0 ; 
    var positionmin = height - ulheight;
    var slidemax = 0 + 100;
    var slidemin = positionmin-100;
    
    cateUl.addEventListener("click",function(e){
        var target = e.target ; 
        for(var i = 0 ; i < length ; i++){
            lis[i].index = i;
            lis[i].classList.remove('active');
        }
        target.parentNode.classList.add("active");
        var slideheight = - target.parentNode.index * target.parentNode.offsetHeight;
        if(slideheight < positionmin){
            currentY = positionmin;
        }else{
            currentY = slideheight;
        }
        cateUl.style.transform = 'translateY('+ currentY +'px)';
        cateUl.style.transition = "all .2s";
    });
}


// // 封装属于自己的移动端点击事件  ，触发比click事件快
// function tap(dom,callback){
//     var ismove = false;
//     dom.addEventListener('touchstart',function(){

//     });
//     dom.addEventListener('touchmove',function(){
//         flag = true;
       
//     });
//     dom.addEventListener('touchend',function(e){
//         if(!flag){
//             callback && callback(e);
//         }
//         flag = false;
//     });
// }