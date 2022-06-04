var n = 1;
var spans = document.querySelectorAll('span');
var divs = document.getElementsByTagName('div');
// 6个界面获取
var s1 = document.querySelector('.s1');
var s2 = document.querySelector('.s2');
var s3 = document.querySelector('.s3');
var s4 = document.querySelector('.s4');
var s5 = document.querySelector('.s5');
var s6 = document.querySelector('.s6');
//s1动画素材
var display = document.querySelector('.display');
var lamp = document.querySelector('.lamp');
var cup = document.querySelector('.cup');
var brush = document.querySelector('.brush');
var download = document.querySelector('.download');
var section = document.querySelector('section');
var copyright = document.querySelector('.copyright');
var line = document.querySelector('.line');

 // 加载初始动画
 animationS1_in();
 
 // s2动画效果
 var s2text = document.querySelector('.s2 .text');
 var anim = document.querySelector('.anim');
 var text = document.querySelector('.text');
 // s3动画效果
 var anim2 = document.querySelector('.anim2');
 // s4动画效果
 var anim3 = document.querySelector('.anim3');
 // s5动画效果
 var anim4 = document.querySelector('.anim4');
 var text4 = document.querySelector('.text4');
 var plane = document.querySelector('.plane');
 // s6动画效果
 var anim5 = document.querySelector('.anim5');
 var text5 = document.querySelector('.text5');
// 监听鼠标滚轮事件
document.onmousewheel = function(event){
	// for(var i = 0; i < divs.length; i++){
	// 	// console.log(divs.length);
		
	// 	divs[i].addEventListener('animationstart',function(){
	// 		console.log(divs.length);
	// 		return;
	// 	})
	// }
	// s1.addEventListener('animationend',function(e){
	// 	if(s1.lock){return};
	// },false)
	// if(s1.lock){return};
	// if($('.s1').is(':animated')) {
	// 	//alert('动画在执行')    
	// 	return;
	// }
	// 验证
	if(event.wheelDelta){
		var direction = event.wheelDelta < 0 ? -1 : 1;
	}else{
		var direction = event.detail < 0 ? 1 : -1;
	}
	n -= direction;
	n = n > spans.length ? 1 : n;
	n = n < 1 ? spans.length : n;
	// 改变span
	for(var i = 0; i < spans.length; i++){
		spans[i].className = '';
	}
	spans[n-1].className = 'current';
	// console.log(s2text);
	if(n == 1){
		// s1.style.display='block';
		s1.style.zIndex = 1;
		animationS1_in();
	}
	/* 切出首页 */
	if(n - 1==1 || n==6){
		animationS1_out();
		s1.style.zIndex = 0;
		s1.style.opacity = 1;
	}
	if(n == 2){
		
		// s2.style.display = 'block';
		s2.style.zIndex = 1;
		s2.style.opacity = 1;
		animationS2_in();
	}
	if( n - 1 ==2 || n + 1 == 2){
		animationS2_out();
		s2.style.zIndex = 0;
	}
	if( n == 3){
		s3.style.zIndex = 1;
		s3.style.opacity = 1;
		animationS3_in();
	}
	if( n - 1 == 3 || n + 1 == 3){
		animationS3_out();
		s3.style.zIndex = 0;
	}
	if( n == 4){
		animationS4_in();
		s4.style.zIndex = 1;
		s4.style.opacity = 1;
	}
	if(n == 5 || n == 3){
		animationS4_out();
		s4.style.zIndex = 0;
		s4.style.opacity = 0;
	}
	if(n == 5){
		s5.style.zIndex = 1;
		s5.style.opacity = 1;
		animationS5_in();
	}
	if(n == 4 || n == 6){
		animationS5_out();
		s5.style.zIndex = 0;
		s5.style.opacity = 0;
	}
	if(n == 6){
		s6.style.zIndex = 1;
		s6.style.opacity = 1;
		animationS6_in();
	}
	if(n == 5 || n == 1){
		animationS6_out();
		s6.style.zIndex = 0;
		s6.style.opacity = 0;
	}
}

function animationS1_in(){
	display.style.animation = 'Opacity 1s forwards,Display 1s forwards';
	lamp.style.animation = 'Opacity 1s forwards,lamp 1s forwards';
	cup.style.animation = 'Opacity 1s forwards,cup 1s forwards';
	brush.style.animation = 'Opacity 1s forwards,brush 1s forwards';
	// download.style.marginTop = '225px';
	download.style.top = '50%';
	download.style.animation = 'Opacity 1s forwards';
	line.style.top = '50%';
	line.style.marginTop = '130px';
	copyright.style.opacity = 1;
}
function animationS1_out(){
	line.style.top = '130px';
	line.style.marginTop = '0px';
	display.style.animation = 'rOpacity 1s forwards,rDisplay 1s forwards';
	lamp.style.animation = 'rOpacity 1s forwards,rlamp 1s forwards';
	cup.style.animation = 'rOpacity 1s forwards,rcup 1s forwards';
	brush.style.animation = 'rOpacity 1s forwards,rbrush 1s forwards';
	copyright.style.opacity = 0;
	download.style.top = '65%';
}
function animationS2_in(){
	// anim.style.animation = 'Opacity 2.5s 1s forwards,anim 2.5s 1s forwards';
	// text.style.animation = 'Opacity 2.5s 1s forwards,s2text 2.5s 1s forwards';
	anim.style.animation = 'Opacity 1s 1s forwards,anim 1s 1s forwards';
	text.style.animation = 'Opacity 1s 1s forwards,s2text 1s 1s forwards';
}
function animationS2_out(){
	anim.style.animation = 'rOpacity 1s  forwards,Ranim 1s forwards';
	text.style.animation = 'rOpacity 1s forwards,Rs2text 1s forwards';
}
function animationS3_in(){
	anim2.style.animation = 'Opacity 1s forwards,anim2 1s forwards';
}
function animationS3_out(){
	anim2.style.animation = 'rOpacity 1s forwards,Ranim2 1s forwards';
}
function animationS4_in(){
	anim3.style.animation = 'anim3 1s forwards';
}
function animationS4_out(){
	anim3.style.animation = 'Ranim3 1s forwards';
}
function animationS5_in(){
	text4.style.animation = 'text4 1s forwards';
	plane.addEventListener('animationend',function(){
		plane.style.animation = 'mplane 0.4s linear infinite';
	})
	plane.style.animation = 'planeIn 1s forwards';
}
function animationS5_out(){
	text4.style.animation = 'Rtext4 1s forwards';
	// plane.addEventListener('animationend',function(){
	// 	plane.style.animation = 'mplane 0.4s linear infinite';
	// })
	plane.style.animation = 'planeOut 1s forwards';
}
function animationS6_in(){
	text5.style.animation = 'text5 1s forwards';
	text5.addEventListener('animationend',function(){
		text5.style.animation = '';
	})
}
function animationS6_out(){
	anim5.style.animation = 'anim5 1s forwards';
	anim5.addEventListener('animationend',function(){
		anim5.style.animation = '';
	})
}