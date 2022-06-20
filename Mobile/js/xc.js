// 底部导航栏js
var tabbar = document.querySelector('.tabbar');
var alist = tabbar.querySelectorAll('a');
for(var i = 0;i <alist.length;i++){
	alist[i].addEventListener("click",function(){
		// 排他
		for(var j = 0;j <alist.length;j++){
			alist[j].className = 'tabbar-link';
		}
		this.className = 'tabbar-link active';
		
	})
}

var oSwipe = document.querySelector('.swipe');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

//调用构造函数
new Swiper('.swiper', {
	//设置初始化显示项下标，默认为0
	initialSlide : 1,
	// direction : 'vertical',
	grabCursor : true,
	loop:true,
	//autoplay : true,
	autoplay : {
		delay : 1000
	},
	//调用分页器
	pagination : {
		el : '.swiper-pagination'
	}
	
});