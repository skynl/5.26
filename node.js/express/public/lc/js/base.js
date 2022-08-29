//创建全局基础路径变量
var baseURL = 'http://159.75.89.136:3000';

//验证用户是否登录
var TOKEN = window.localStorage.getItem('token');
var USERNAME = window.localStorage.getItem('username');
	
//登录状态
(function(){
	var oLoginBtn = document.querySelector('.login-btn');
	var oRegisterBtn = document.querySelector('.register-btn');
	var oWelcome = document.querySelector('.welcome');
	var oCartBtn = document.querySelector('.cart-btn');
	var oLoginOut = document.querySelector('.login-out');
	
	if(TOKEN){
		//有登录状态
		oLoginBtn.style.display = 'none';
		oRegisterBtn.style.display = 'none';
		oWelcome.style.display = 'block';
		oWelcome.innerHTML = `欢迎，${USERNAME}`;
		oLoginOut.style.display = 'block';
	}else{
		//无登录状态
		oLoginBtn.style.display = 'block';
		oRegisterBtn.style.display = 'block';
		oWelcome.style.display = 'none';
		oWelcome.innerHTML = ``;
		oLoginOut.style.display = 'none';
	};

	//点击购物车按钮
	oCartBtn.onclick = function(){
		if(TOKEN){
			window.location.href = 'shoppingCar.html';
		}else{
			alert('请登录！');
			window.location.href = 'login.html';
		}
	};

	//点击退出按钮
	oLoginOut.onclick = function(){
		//删除本地存储
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('username');
		oLoginBtn.style.display = 'block';
		oRegisterBtn.style.display = 'block';
		oWelcome.style.display = 'none';
		oWelcome.innerHTML = ``;
		oLoginOut.style.display = 'none';
	};
	
	//点击登录按钮
	oLoginBtn.onclick = function(){
		//获取当前地址的goodsId
		var goodsId = getUrlData('goodsId');
		var catId = getUrlData('catId');
		//console.log(goodsId, catId);
		if(goodsId){
			location.href = `login.html?goodsId=${goodsId}`;
		}else if(catId){
			location.href = `login.html?catId=${catId}`;
		}else{
			location.href = `login.html`;
		}
	}
	
	
})();
// 购物车消息栏
(function(){
	var shopCarK = document.querySelector('.shopCar-kong');
	var myShopCar = document.querySelector('.myshopCar');
	//验证下用户登录
	if(!TOKEN){
		shopCarK.style.display = 'block';
		myShopCar.innerHTML='快去抢购良仓商品吧！';
		myShopCar.href = 'index.html';
		// alert('非法登录！');
		// location.href = 'login.html';
		// return;
	};
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
		for(let i = 0; i < res.data.length; i++){
			var li = document.createElement('li');
			var s= li.innerHTML = 
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
	
})();


//获取导航分类数据,并分隔域
(function(){
	var catTemplate = document.querySelector('#cat-template').innerHTML;

	var catList = document.querySelector('.cat-list');
	
	myAjax.get(baseURL + '/api_cat', {}, function(res){
		// console.log(res);
		//验证数据
		if(res.code != 0){
			console.log(res);
			return;
		};
		//证明数据是OK
		var arr = res.data;
		var str = '';
		for(var i = 0; i < arr.length; i++){
			//str += getCompile('<li><a href="">@cat_name@</a></li>', arr[i]);
			//str += '<li><a href="">'+arr[i].cat_name+'</a></li>';
			str += getCompile(catTemplate, arr[i]);

		};
		
		catList.innerHTML = str;

	});
})();

// 搜索框js
var input = document.getElementById('input');
var sousuo = document.getElementById('sousuo');
var sum = 1;
sousuo.onclick = function(){
	sum++;
	if(sum % 2 == 0){
		input.style.visibility = 'visible';
		input.style.opacity = '1';
	}else{
		input.style.opacity = '0';
		input.addEventListener('transitionend',YC());
		input.removeEventListener('transitionend',YC());
	}
	
}
function YC(){
	input.style.visibility = 'hidden';
}
// 页面卷动事件
var zhiding = document.querySelector('.jiantou');

// //获取页面的高度
// var pageH = document.body.clientHeight || document.documentElement.clientHeight;
// //获取浏览器窗口高度
// var windowH = window.innerHeight+1;
//页面卷动出去的值
var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
// var ispeed = Math.floor(-scrollTop / 6);
document.onscroll = function(){
	
	//获取页面的高度
	var pageH = document.body.clientHeight || document.documentElement.clientHeight;
	//获取浏览器窗口高度
	var windowH = window.innerHeight+1;
	//页面卷动出去的值
	var scrollTop = parseInt(document.body.scrollTop) || parseInt(document.documentElement.scrollTop);
	// console.log(pageH);
	// console.log(windowH);
	// console.log(scrollTop);
	//验证
	if(windowH < scrollTop){
		zhiding.style.display = "block";
	}else{
		zhiding.style.display = "none";
	}
};
// var pageH = document.body.clientHeight || document.documentElement.clientHeight;
 var timer ;
 // zhiding.onclick = function(){
	// var timer = setInterval(animate(document.documentElement.scrollTop,{scrollTop:0},300),2000);
 // }
zhiding.onclick = function(e){
	e.stopPropagation();
	// document.documentElement.scrollTop = 0;
	timer = setInterval(function(){
		document.documentElement.scrollTop -= 100;
		if (document.documentElement.scrollTop === 0) {
			clearInterval(timer);
		}
	}, 10)
}


