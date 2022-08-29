(function(){
	
	//获取当前商品goodsId
	var goodsId = getUrlData('goodsId');
	//存储到本地
	//localStorage.setItem('goodsId', goodsId);
	//console.log(goodsId);
	
	var goodsContent = document.querySelector('.xq-bigBox');
	
	//请求数据
	myAjax.get(baseURL + '/api_goods', {goodsId : goodsId}, function(res){
		console.log(res);
		if(res.code != 0){
			console.log(res);
			return;
		};
		
		goodsContent.innerHTML = `
		<div>
			<div class="xq-box">
				<!-- 详情左边 -->
				<div class="xq-l">
					<div class="xq-big">
						<ul class="xq-lb-bg">
							<li class="xq-imgActive"><img src="${res.data[0].goods_thumb}"></li>
							<li><img src="xq-imgs/pic2.jpg"></li>
							<li><img src="xq-imgs/pic3.jpg"></li>
							<li><img src="xq-imgs/pic4.jpg"></li>
							<li><img src="xq-imgs/pic5.jpg"></li>
						</ul>
					</div>
					<ul class="xq-small">
						<span id="last"></span>
						<li class="xq-active"><img src="${res.data[0].goods_thumb}"></li>
						<li><img src="${res.data[0].goods_thumb}"></li>
						<li><img src="${res.data[0].goods_thumb}"></li>
						<li><img src="${res.data[0].goods_thumb}"></li>
						<li><img src="${res.data[0].goods_thumb}"></li>
						<span id="next"></span>
					</ul>
				</div>
				<!-- 详情中部 -->
				<div class="xq-info">
					<a class="xqFavoriteCount" href="">
						${res.data[0].star_number}
					</a>
					<div class="xq-logo">
						<a href="">${res.data[0].brand_name}</a>
					</div>
					<div class="xq-name">
						${res.data[0].goods_name}
					</div>
					<div class="xq-price">
						价格:&nbsp;&nbsp;
						<span>¥${res.data[0].price}元</span>
						<span>¥${res.data[0].price}元</span>
					</div>
					<div class="xsth">
						<span>限时特惠</span>
					</div>
					<!-- 详情活动开始 -->
					<div class="huodong">
						<img src="xq-imgs/tehui.jpg">
						<p>${res.data[0].goods_desc}</p>
						<p>
							活动截止日期：
							<span>2022-05-17 23:50:00</span>
						</p>
					</div>
					<div class="shipNote">
						<span>免运费</span>
						<span>正版授权</span>
					</div>
					<div class="xq-size">
						服装尺码：
						<div class="itemCon">
							<a href="">均码</a>
						</div>
					</div>
					<div class='infoItemColorCon'>
						<div>颜色:&nbsp;&nbsp;</div>
						<div>
							<div class="imgCon">
								<img src="xq-imgs/kouzhao.jpg">
							</div>
							<div class="imgCon-name">漫暮黑</div>
						</div>
					</div>
					<div class="xq-number">
					 	<div>数量:&nbsp;&nbsp;</div>
						<a href="javascript:;" class='num-jian'>
							<img src="xq-imgs/-.png">
						</a>
						<input type="text" class="goods-number" value="1">
						<a href="javascript:;" class='num-jia'>
							<img src="xq-imgs/+.png">
						</a>
					</div>
					<div class="xq-buy1">
						<a href="javascript:;" class="buy2" id="buyNow">立即购买</a>
					</div>
					<div class="xq-buy2">
						<a href="javascript:;">
							<span class="addcart-btn">加入购物车</span>
						</a>
						<a href="#">
							<span>分享</span>
						</a>
					</div>
				</div>
			</div>
			<div class="xq-bottom">
				<img src="${res.data[0].goods_thumb}">
				<img src="${res.data[0].goods_thumb}">
				<img src="${res.data[0].goods_thumb}">
				<img src="${res.data[0].goods_thumb}">
				<img src="${res.data[0].goods_thumb}">
			</div>
		</div>
		<!-- 详情右部 -->
		<div class="xq-cai">
			<div>猜你喜欢</div>
			<div class="xq-rbox">
				<div class="xq-r1">
					<a href="">
						<div>
							<img src="xq-imgs/xq-r1.jpg">
						</div>
						<span>加特林十指腰枕</span>
					</a>
					<div>TOTONUT</div>
					<div class="xq-rPrice">
						￥259
					</div>
				</div>
			</div>
			<div class="xq-rbox">
				<div class="xq-r1">
					<a href="">
						<div>
							<img src="xq-imgs/xq-r1.jpg">
						</div>
						<span>加特林十指腰枕</span>
					</a>
					<div>TOTONUT</div>
					<div class="xq-rPrice">
						￥259
					</div>
				</div>
			</div><div class="xq-rbox">
				<div class="xq-r1">
					<a href="">
						<div>
							<img src="xq-imgs/xq-r1.jpg">
						</div>
						<span>加特林十指腰枕</span>
					</a>
					<div>TOTONUT</div>
					<div class="xq-rPrice">
						￥259
					</div>
				</div>
			</div>
			<div class="xq-rbox">
				<div class="xq-r1">
					<a href="">
						<div>
							<img src="xq-imgs/xq-r1.jpg">
						</div>
						<span>加特林十指腰枕</span>
					</a>
					<div>TOTONUT</div>
					<div class="xq-rPrice">
						￥259
					</div>
				</div>
			</div>
		</div>
		`;
		
		//调用轮播的方法
		lunbo();
		// 数量加减方法
		Num();
		//调用加入购物车的方法
		getAddCart();
	});
	
	//封装
	function getAddCart(){
		//获取按钮
		var addCartBtn = document.querySelector('.addcart-btn');
		var oGoodsNumber = document.querySelector('.goods-number');
		
		addCartBtn.onclick = function(){
			if(!TOKEN){
				location.href = `login.html?goodsId=${goodsId}`;
				return;
			};
			
			//有登录，要真正加入购物车了
			myAjax.post(baseURL + '/api_cart', {
				status : 'addcart',
				userId : TOKEN,
				goodsId : goodsId,
				goodsNumber : parseInt(oGoodsNumber.value)
			}, function(res){
				console.log(res);
				if(res.code != 0){
					console.log(res);
					alert('加入购物车失败');
					return;
				};
				alert('加入购物车成功');
				// 刷新首页购物车
				var subNavT1 = document.querySelector('.sub-nav-t1');
				var oUl = subNavT1.querySelector('ul');
				myAjax.post(baseURL + '/api_cart', {
					status : 'viewcart',
					userId : TOKEN
				}, function(res){
					console.log(res);
					if(res.code != 0){
						console.log(res);
						return;
					};
					if(res.data.length == 0){
						shopCarK.style.display = 'block';
						myShopCar.innerHTML='快去抢购良仓商品吧！';
						myShopCar.href = 'index.html';
						return;
					};
					//渲染页面
					oUl.innerHTML = '';
					for(let i = 0; i < res.data.length; i++){
						var li = document.createElement('li');
						li.innerHTML = 
							`<dt>
								<a href="xiangqing.html?goodsId=${res.data[i].goods_id}">
									<img src="${res.data[i].goods_thumb}"/>
								</a>
							</dt>
							<dd>
								<p class="proTit">
									<a href="xiangqing.html?goodsId=${res.data[i].goods_id}">${res.data[i].goods_name}</a>
								</p>
								<div class="proNum">
									数量:${res.data[i].goods_number}件
									<p class="proPrice">¥${res.data[i].goods_number * res.data[i].price}</p>
								</div>
							</dd>`
						;
						//添加到表格中
						
						oUl.appendChild(li);
					};
				});
			})
			
		};
	};
})();

function lunbo(){
	// 两个ul
	var xqLbBg = document.querySelector('.xq-lb-bg');
	var xqSmall = document.querySelector('.xq-small');
	// 两个active
	var xqImgActive = document.querySelector('.xq-imgActive');
	var xqSimgActive = document.querySelector('.xq-active');
	// 两个li段
	var xqLbBgli = xqLbBg.querySelectorAll('li');
	var xqSmallli = xqSmall.querySelectorAll('li');
	// 左右箭头
	var last = xqSmall.querySelector('#last');
	var next = xqSmall.querySelector('#next');
	var n = 0;
	next.addEventListener('click',function(){
		console.log('1111');
		n++;
		for(var i = 0; i < xqLbBgli.length; i++){
			xqLbBgli[i].className = '';
			xqSmallli[i].className = '';
		}
		n = n >= xqLbBgli.length ? 0 : n;
		xqLbBgli[n].className = 'xq-imgActive';
		xqSmallli[n].className = 'xq-active';
	})
	last.addEventListener('click',function(){
		console.log('1111');
		n--;
		for(var i = 0; i < xqLbBgli.length; i++){
			xqLbBgli[i].className = '';
			xqSmallli[i].className = '';
		}
		n = n < 0 ? xqLbBgli.length - 1 : n;
		xqLbBgli[n].className = 'xq-imgActive';
		xqSmallli[n].className = 'xq-active';
	})
}

// 数量加减
function Num(){
	var jian = document.querySelector('.num-jian');
	var jia = document.querySelector('.num-jia');
	var goodsNum = document.querySelector('.goods-number');
	// jia.addEventListener('click',function(){
	// 	console.log(goodsNum.value);
	// })
	jia.onclick = function(){
		// console.log(111);
		
		if(goodsNum.value == 10){
			goodsNum.value = 10;
		}else{
			goodsNum.value ++;
		}
		console.log(goodsNum.value);
	}
	jian.onclick = function(){
		// console.log(111);
		
		if(goodsNum.value == 1){
			goodsNum.value = 1;
		}else{
			goodsNum.value --;
		}
		console.log(goodsNum.value);
	}
}