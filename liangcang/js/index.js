
//获取轮播图数据
(function(){
	var oBannerList = document.querySelector('.box');
	myAjax.get(baseURL + '/api_banner',{bannerId : 1},function(res){
		console.log(res);
		if(res.code != 0){
			console.log(res);
			return;
		};
		
		//组装DOM
		var str = '';
		for(var i = 0; i < res.data.length; i++){
			str += `<li><a href=""><img src="img/loading.gif" gyjsrc="${res.data[i].goods_thumb}" ></a></li>`;
		};
		console.log(str);
		oBannerList.innerHTML = str;
		//调用图片预加载
		
		console.log(document.querySelectorAll('.box li'));

		//调用轮播方法
		bannerPlay();
		gyjLoading('.box');
	});
	//封装轮播图方法
	function bannerPlay(){
		// 轮播图js
		var banner = document.getElementById('banner');
		var last = document.getElementById("last");
		var next = document.getElementById("next");
		var box = document.getElementById("box");
		var List = box.getElementsByTagName('li');
		
		box.appendChild(List[0].cloneNode(true));
		console.log(List[6]);
		// 动态获取轮播图的ul宽度
		box.style.width = List.length * List[0].clientWidth + 'px';
		var n = 0;
		var moveTime = 500;
		var moveName = "quadEaseIn";
		var Next = function(){
			if(box.lock){return};
			n++;
			animate(box,{left:-List[0].clientWidth * n},moveTime,moveName,function(){
				if(n >= 6){
					n = 0;
					box.style.left = -List[0].clientWidth * n + 'px';
				};
			});
		};
		var Last = function(){
			if(box.lock){return};
			n--;
				if(n < 0){
					n = List.length - 1;
					box.style.left = -List[0].clientWidth * n + 'px';
					n--;
				};
			animate(box,{left:-List[0].clientWidth * n},moveTime,moveName);
		};
		next.onclick = Next;	
		last.onclick = Last;
		
		var timer = setInterval(Next,2000);
		
		banner.onmouseover = function(){
			clearInterval(timer);
		};
		banner.onmouseout = function(){
			timer = setInterval(Next,2000);
		};
	}
})();



//获取热门商品
(function(){
	var oHotClassifyList = document.querySelector('.hot-classify-list');
	var oMore = document.querySelector('.more-box');
	var oHotLoading = document.querySelector('.hot-loading');
	
	var page = 1;
	var pagesize = 9;
	var lock = false;
	
	//默认刷新请求第一页数据
	getHot(page, pagesize);
	
	//点击事件
	oMore.onclick = function(){
		if(lock){return};
		//上锁
		lock = true;
		//++
		page++;
		getHot(page, pagesize);
	};
	
	//滚动到了底部加载更多
	
	
	// 页面卷动事件
	// document.onscroll = function(){
		
	// 	//获取页面的高度
	// 	var pageH = document.body.clientHeight || document.documentElement.clientHeight;
	// 	//获取浏览器窗口高度
	// 	var windowH = window.innerHeight+1;
	// 	//页面卷动出去的值
	// 	var scrollTop = parseInt(document.body.scrollTop) || parseInt(document.documentElement.scrollTop);
	// 	console.log(pageH);
	// 	console.log(windowH);
	// 	console.log(scrollTop);
	// 	//验证
	// 	if(windowH + scrollTop == pageH){
	// 	// if((windowH + scrollTop) / pageH >= 0.8){
			
	// 		if(lock){return};
	// 		//上锁
	// 		lock = true;
	// 		//++
	// 		page++;
	// 		getHot(page, pagesize);
	// 	}
		
	// };
	
	//封装热门商品数据
	function getHot(page, pagesize){
		//显示加载中。。。
		oHotLoading.style.display = 'block';
		oHotLoading.innerHTML = '正在加载中...';
		myAjax.get(baseURL + '/api_goods', {page : page, pagesize : pagesize}, function(res){
			console.log(res);
			if(res.code != 0){
				console.log(res);
				return;
			};
			
			//验证暂无更多
			if(res.data.length == 0){
				//暂无更多
				oHotLoading.style.display = 'block';
				oHotLoading.innerHTML = '暂无更多';
				return;
			};
			
			//组装DOM
			for(var i = 0; i < res.data.length; i++){
				var oLi = document.createElement('li');
				oLi.innerHTML = `
					<span>限 时 特 惠</span>
					<img src="img/loading.gif" gyjsrc="${res.data[i].goods_thumb}">
					<img src="images/tehui.jpg">
					<a href="">
						<img src="img/loading.gif" gyjsrc="${res.data[i].brand_thumb}">&nbsp;&nbsp;&nbsp;${res.data[i].brand_name}
					</a>
					<a href="">
						${res.data[i].star_number}
					</a>
					<div class="sub-shangpin1">
						<a href="xiangqing.html?goodsId=${res.data[i].goods_id}">
							<p class="money">¥${res.data[i].price}</p>
							<p>${res.data[i].goods_name}</p>
							<p>${res.data[i].goods_desc}</p>
						</a>
					</div>
				`;	
				oHotClassifyList.appendChild(oLi);
			};	
			
			//开锁
			lock = false;
			////隐藏加载中。。。
			oHotLoading.style.display = 'none';
			//调用预加载方法
			gyjLoading('.hot-classify-list');
		});
	};
	
})();
