var bannerBox = document.querySelector(".banner-box");
var bannerList = document.querySelector('.banner-list');
var ali = bannerList.querySelectorAll('li');


// 设置banner高度
var windowW = document.documentElement.clientWidth;
console.log(windowW);
// bannerBox.style.height = 420/1053 * windowW + 'px';
bannerBox.style.height = '142px';
console.log(bannerBox.style.height);
// // 添加障眼元素
bannerList.appendChild(ali[0].cloneNode(true));
bannerList.insertBefore(ali[ali.length - 1].cloneNode(true),ali[0]);

// 设置bannerList宽度
console.log(ali.length);
console.log(ali);
console.log(ali[0].style.width);
bannerList.style.width = windowW * (ali.length + 2) + 'px';

// 信号量
var n = 1;
var m = 0;
bannerList.style.transform = `translateX(${-358 * n}px)`;

var timer = null;
timer = setInterval(function(){
	n ++;
	if(n > spanList.length){
		spanList[2].className = '';
		spanList[0].className = 'current';
	}else{
		spanList[n-1].className = "current";
		spanList[n-2].className = '';
	}
	
	bannerList.style.transition='0.5s';
	bannerList.style.transform = `translateX(${-358 *n}px)`;
	
},1000);

// 监听动画完成事件
bannerList.addEventListener('transitionend',function(){
	if(n > ali.length){
		n = 1;
		spanList[n-1].className = 'current';
		// 闪现之前去掉过渡
		bannerList.style.transition = 'none';
		bannerList.style.transform = `translateX(${-358 * n}px)`;
	}
	if(n <= 0){
		n = ali.length;
		spanList[n-1].className = 'current';
		//闪现之前要去掉过渡
		bannerList.style.transition = 'none';
		//闪现
		bannerList.style.transform = `translateX(${-358 * n}px)`;
	};
});

	// 用户交互
	var startX;
	var moveX
	bannerBox.addEventListener('touchstart', function(e){
		//清除定时器
		clearInterval(timer);
		//console.log(e);
		// 获取初始值
		startX = e.touches[0].clientX;
		//console.log(startX);
	});
	
	bannerBox.addEventListener('touchmove', function(e){
		// 移动的距离值
		moveX = e.touches[0].clientX - startX;
		console.log(moveX);
		
		//ul要跟随
		bannerList.style.transition = 'none';
		bannerList.style.transform = `translateX(${-358 * n + moveX}px)`;
	});
	
	bannerBox.addEventListener('touchend', function(e){
		//手指抬起时候，验证拖动的距离
		if(Math.abs(moveX) >= windowW / 3){
			
			//运动到下一张或者上一张
			moveX > 0 ? n-- : n++;
			//设置
			if(moveX > 0 == false){
				if(n > spanList.length){
					spanList[2].className = '';
					spanList[0].className = 'current';
				}else{
					spanList[n-1].className = "current";
					spanList[n-2].className = '';
				}
			}else{
				if(n <= 0){
					spanList[0].className = '';
					spanList[2].className = 'current';
				}else{
					spanList[n].className = "";
					spanList[n-1].className = 'current';
				}
			}
			
			
			
			
			bannerList.style.transition = '.5s';
			bannerList.style.transform = `translateX(${-358 * n}px)`;
			
		}else{
			
			//设置
			bannerList.style.transition = '.5s';
			bannerList.style.transform = `translateX(${-358 * n}px)`;
		};
		
	});
	
// 小圆点
var spans = document.querySelector('.spans');
var spanList = spans.querySelectorAll('span');
var current = spans.querySelector('.current');
// var middleBox = document.querySelector('.middle-box');
var myswiper = new Swiper('.middle-box', {
	//设置初始化显示项下标，默认为0
	initialSlide : 0,
	// direction : 'vertical',
	grabCursor : true,
	loop:false,
	// freeMode:true,
	// autoplay : false,
	// autoplay : {
	// 	delay : 1000
	// },
	//调用分页器
	pagination : {
		el : '.swiper-pagination'
	}
	
});

var Myswiper = new Swiper('.sec_kill_floor', {
	//设置初始化显示项下标，默认为0
	initialSlide : 0,
	// direction : 'vertical',
	grabCursor : false,
	freeMode:true,
	loop:true,
	// freeMode:true,
	// autoplay : false,
	// autoplay : {
	// 	delay : 1000
	// },
	//调用分页器
	
});

