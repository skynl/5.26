$(document).scroll(function(){
	if($(document).scrollTop() >= 50){
		$('.mynav').css('top',0);
	}else{
		$('.mynav').css('top',-51);
	}
});

// 调用
new WOW().init();