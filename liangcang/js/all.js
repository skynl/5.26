(function(){
	
	//验证下用户登录
	if(!TOKEN){
		alert('非法登录！');
		location.href = 'login.html';
		return;
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
			
			return;
		};
		
		//渲染页面
		for(var i = 0; i < res.data.length; i++){
			var li = document.createElement('li');
			li.innerHTML = 
				`<dt>
					<a href="">
						<img src="${res.data[i].goods_thumb}"/>
					</a>
				</dt>
				<dd>
					<p class="proTit">
						<a href="">${res.data[i].goods_name}</a>
					</p>
					<p class="proColorSize">
						颜色:绿色支架;
					</p>
					<div class="proNum">
						数量:${res.data[i].goods_number}件
						<p class="proPrice">¥${res.data[i].price}</p>
					</div>
				</dd>`
			;
			// `<dt>
			// 	<a href="">
			// 		<img src="${res.data[i].goods_thumb}"/>
			// 	</a>
			// </dt>
			// <dd>
			// 	<p class="proTit">
			// 		<a href="">${res.data[i].goods_name}</a>
			// 	</p>
			// 	<p class="proColorSize">
			// 		颜色:绿色支架;
			// 	</p>
			// 	<div class="proNum">
			// 		数量:${res.data[i].goods_number}件
			// 		<p class="proPrice">¥${res.data[i].price}</p>
			// 	</div>
			// </dd>`
			//添加到表格中
			oUl.appendChild(li);
		};
	});
})();