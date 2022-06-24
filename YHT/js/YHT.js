var myswiper = new Swiper('.swiper',{
	//设置初始化显示项下标，默认为0
	initialSlide : 0,
	// direction : 'vertical',
	grabCursor : true,
	loop:false,
	// freeMode:true,
	autoplay : true,
	autoplay : {
		delay : 1000
	},
	//调用分页器
	pagination : {
		el : '.swiper-pagination'
	}
})