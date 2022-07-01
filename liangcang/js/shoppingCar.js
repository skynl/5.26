
//请求当前登录用户的购物车
(function(){
	
	//验证下用户登录
	if(!TOKEN){
		alert('非法登录！');
		location.href = 'login.html';
		return;
	};
	
	var oTable = document.querySelector('.carTab');
	var oCheckAllDom = document.querySelector('.check-all');
	
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
			var neirongK = document.querySelector('.neirong-kong');
			var neirong = document.querySelector('.neirong');
			neirongK.style.display = 'block';
			neirong.style.display = 'none';
			return;
		};
		
		//渲染页面
		for(var i = 0; i < res.data.length; i++){
			var tr = document.createElement('tr');
			tr.className = 'itemlist2'
			tr.innerHTML = `
				<td>
					<input type="checkbox" class="chkbox"/>
					<img class="gimgCon" src="${res.data[i].goods_thumb}"/>
				</td>
				<td class="txtl">
					<p class="t">
						<a href="xiangqing.html?goodsId=${res.data[i].goods_id}">${res.data[i].goods_name}</a>
					</p>
					<p class="b"></p>
				</td>
				<td>
					<span class="opt reduce" data-goods="${res.data[i].goods_id}">-</span>
					<span class="goods-count">${res.data[i].goods_number}</span>
					<span class="opt add" data-goods="${res.data[i].goods_id}">+</span>
				</td>
				<td>${res.data[i].price}</td>
				<td>${res.data[i].goods_number * res.data[i].price}</td>
				<td>
					<a href="#" class="blue" data-goods="${res.data[i].goods_id}">删除</a>
				</td>
			`;
			//添加到表格中
			oTable.appendChild(tr);
			
			//所有点击事件
			tableClickHandler();
		};
		
	});
	
	// var tbody = document.querySelector('tbody');
	
	// console.log(tbody);
	// var timer = null;
	
	// timer = setInterval(function(){
	// 	var TR = document.querySelector('.itemlist2');
	// 	console.log(TR);
	// 	if(TR == null){
	// 		// console.log(111);
	// 		neirongK.style.display = 'block';
	// 		neirong.style.display = 'none';
	// 		// oTable.innerHTML = '空空如也~~~';
	// 		// return;
	// 	}else{
	// 		neirongK.style.display = 'none';
	// 		neirong.style.display = 'block';
			
	// 	};
	// },300);
	//点击 事件 封装
	function tableClickHandler(){
		//数量锁
		var goodsCount = false;
		//点击整个表格！！！
		oTable.onclick = function(event){
			//用事件对象去区分点击内部的元素
			//console.log(event.target.className);
			var eleClassName = event.target.className;
			// console.log(eleClassName);
			//点击了全选
			if(eleClassName == 'check-all'){
				console.log(111);
				//进来证明一定是点的全选 ：值 true false
				//console.log(event.target.checked);
				var aCheck = document.querySelectorAll('.chkbox');
				var statusAll = event.target.checked ? true : false;
				var statusGoods = statusAll ? 'select' : '';
				
				for(var i = 0; i < aCheck.length; i++){
					aCheck[i].checked = statusAll;
					//加标志，加自定义的属性和值
					aCheck[i].setAttribute('goods', statusGoods);
				};
				
				//调用总价方法
				getPriceAll();
			};
			
			//点击了单选
			if(eleClassName == 'chkbox'){
			  event.target.setAttribute('goods', event.target.checked ? 'select' : '');			
				//全选按钮交互
				if(!event.target.checked){
					oCheckAllDom.checked = false;
				};
				
				//调用总价方法
				getPriceAll();
			};
			
			//点击了加
			if(eleClassName == 'opt add' || eleClassName == 'opt reduce'){
				//节流
				if(goodsCount){return};
				goodsCount = true;
				
				//拿到当前数量
				var countDom = eleClassName == 'opt add' ? event.target.previousElementSibling : event.target.nextElementSibling;
				var count = parseInt(countDom.innerHTML);
				eleClassName == 'opt add' ? count++ : count--;	
				
				if(count > 10){
					count = 10;
					goodsCount = false;
					return;
				};
				if(count < 1){
					count = 1;
					goodsCount = false;
					return;
				};
				
				//获取上面绑定的自定义属性
				var goodsId = event.target.getAttribute('data-goods');
				
				//更新后台数据 数量
				myAjax.post(baseURL + '/api_cart', {
					status : 'addcart',
					userId : TOKEN,
					goodsId : goodsId,
					goodsNumber : count
				}, function(res){
					console.log(res);
					if(res.code != 0){
						console.log(res);
						return;
					};
					//开锁
					goodsCount = false;
					countDom.innerHTML = count;
					var proNum = document.querySelector('.proNum');
					
					//设置小计
					var xj = event.target.parentNode.nextElementSibling.nextElementSibling;
					xj.innerHTML = count * parseFloat(event.target.parentNode.nextElementSibling.innerHTML);
					//调用总价方法
					getPriceAll();
					
				})
				
			};
			
			//点击了删除
			if(eleClassName == 'blue'){
				//拿到当前goodsId
				var delGoodsId = event.target.getAttribute('data-goods');
				//请求后删除一件商品
				myAjax.post(baseURL + '/api_cart', {
					status : 'delcart',
					userId : TOKEN,
					goodsId : delGoodsId
				}, function(res){
					console.log(res);
					if(res.code != 0){
						console.log(res);
						return;
					};
					
					//删除成功
					var delTr = event.target.parentNode.parentNode;
					delTr.parentNode.removeChild(delTr);
					//调用总价方法
					getPriceAll();
					// 刷新首页购物车
					var subNavT1 = document.querySelector('.sub-nav-t1');
					var oUl = subNavT1.querySelector('ul');
					var myShopCar = document.querySelector('.myshopCar');
					myAjax.post(baseURL + '/api_cart', {
						status : 'viewcart',
						userId : TOKEN
					}, function(res){
						console.log(res);
						if(res.code != 0){
							console.log(res);
							return;
						};
						// if(res.data.length == 0){
						// 	shopCarK.style.display = 'block';
						// 	myShopCar.innerHTML='快去抢购良仓商品吧！';
						// 	myShopCar.href = 'index.html';
						// 	return;
						// };
						//渲染页面
						oUl.innerHTML = '';
						if(res.data.length == 0){
							let li2 = document.createElement('li');
							li2.className = 'shopCar-kong';
							oUl.appendChild(li2);
							var shopCarK = document.querySelector('.shopCar-kong');
							shopCarK.innerHTML = '你的购物车暂时没有商品...';
							shopCarK.style.display = 'block';
							myShopCar.innerHTML='快去抢购良仓商品吧！';
							myShopCar.href = 'index.html';
							var neirongK = document.querySelector('.neirong-kong');
							var neirong = document.querySelector('.neirong');
							neirongK.style.display = 'block';
							neirong.style.display = 'none';
							return;
						};
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
			
		}
	};
	
	//总价：查看当前商品选中，才是小计累加； 封装一个总价的方法
	function getPriceAll(){
		//查看当前商品选中: 可以给选中的商品加一个标志（自定义的属性和值）goods="select"
		//选择中所有带标志的元素
		var checkAllDom = document.querySelectorAll('.carTab [goods="select"]');
		//console.log(checkAllDom);
		//节点查找方法
		//console.log(checkAllDom[0].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML);
		var allPrice = 0;
		for(var i = 0; i < checkAllDom.length; i++){
			allPrice += parseFloat(checkAllDom[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML);
		};
		
		//设置
		var oPriceAllDom = document.querySelector('.zongjiaNum');
		oPriceAllDom.innerHTML = '￥' + allPrice;
	};
	
	// 点击结算
	var oACcount = document.querySelector('.jiesuan');
	oACcount.onclick = function(){
		//把当前选中商品，因为我们没有订单接口，存储到本地
		var checkAllDom = document.querySelectorAll('.carTab [goods="select"]');
		var arr = [];
		for(var i = 0; i < checkAllDom.length; i++){
			arr.push(checkAllDom[i].getAttribute('data-goods'));
		};
		//console.log(arr);
		localStorage.setItem('goods', arr.join('-'));
		//跳转到address页面
		location.href = 'jiesuan.html';
	};
	
})();

