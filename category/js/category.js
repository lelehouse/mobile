window.onload = function(){
    leftslide();
}

 function leftslide(){
     var startY = moveY = distanceY = currentY = 0;
     var slideleft = document.querySelector('.category-left');
     var slideul = slideleft.querySelector('ul');
     slideul.addEventListener('touchstart',function(e){
         startY = e.touches[0].clientY;
     });
     slideul.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        if((currentY+distanceY)<slidemax && (currentY+distanceY)>slidemin){
            slideul.style.transform = 'translateY('+(distanceY+currentY)+'px)';
            slideul.style.transition= 'all .2s';
        }
     });
     slideul.addEventListener('touchend',function(){
         currentY +=distanceY;
         if(currentY > positionmax){
            currentY = 0;
         }
         if(currentY < positionmin){
            currentY = positionmin;
         }
         slideul.style.transform = 'translateY('+currentY+'px)';
         slideul.style.transition= 'all .2s';
     });
     var slideulheight = slideul.offsetHeight;
     var height = slideleft.offsetHeight;
     var positionmax = 0 ;
     var positionmin = height - slideulheight;
     console.log(positionmin);
     var slidemax = 0 + 100;
     var slidemin =positionmin -100;
 }

    
    
    // cateUl.addEventListener("click",function(e){
    //     var target = e.target ; 
    //     for(var i = 0 ; i < length ; i++){
    //         lis[i].index = i;
    //         lis[i].classList.remove('active');
    //     }
    //     target.parentNode.classList.add("active");
    //     var slideheight = - target.parentNode.index * target.parentNode.offsetHeight;
    //     if(slideheight < positionmin){
    //         currentY = positionmin;
    //     }else{
    //         currentY = slideheight;
    //     }
    //     cateUl.style.transform = 'translateY('+ currentY +'px)';
    //     cateUl.style.transition = "all .2s";
    // });
 


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