//获取导航分类数据,并分隔域
(function(){

	var cat2Template = document.querySelector('#cat2-template').innerHTML;
	var cat2List = document.querySelector('.cat2-list');
	
	myAjax.get(baseURL + '/api_cat', {}, function(res){
		// console.log(res);
		//验证数据
		if(res.code != 0){
			console.log(res);
			return;
		};
		//证明数据是OK
		var arr = res.data;
		var str2 = '';
		for(var i = 0; i < arr.length; i++){
			//str += getCompile('<li><a href="">@cat_name@</a></li>', arr[i]);
			//str += '<li><a href="">'+arr[i].cat_name+'</a></li>';

			str2 += getCompile(cat2Template, arr[i]);
		};
		
		// console.log(str);
		cat2List.innerHTML = str2;
	});
})();

// 首先获取地地栏参数
(function(){
	var catId = getUrlData('catId');
	console.log(catId);
	
	var oHotClassifyList = document.querySelector('.hot-classify-list');
	
	var page = 1;
	var pageSize = 9;
	//默认要先调用一次
	ClassifyDom(page, pageSize);
	//调用当前总页数方法
	getMaxCount(page, pageSize);
	function ClassifyDom(page,pageSize){
		//发起请求当前分类商品
		myAjax.get(baseURL + '/api_goods', {
			page : page,
			pagesize : pageSize,
			catId : catId
		}, function(res){
			console.log(res);
			if(res.code != 0){
				console.log(res);
				return;
			};
			
			//当前分类商品没有
			if(res.data.length == 0){
				oHotClassifyList.innerHTML = '正在上新中...';
				return;
			};
			//dom渲染
			var str = '';
			for(var i = 0; i < res.data.length; i++){
				var oLi = document.createElement('li');
				str += `
						<li>				
							<img src="img/loading.gif" gyjsrc="${res.data[i].goods_thumb}">
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
						</li>
					`;	
			};
			//因为有分页，所以要做覆盖！！！
			oHotClassifyList.innerHTML = str;
			//调用图片预加载
			gyjLoading('.hot-classify-list');
		})	
	}
	
	
	//得到总页面数
	function getMaxCount(page, pageSize){
		myAjax.get(baseURL + '/api_goods', {
			page : page,
			pagesize : pageSize,
			catId : catId
		}, function(res){
			if(res.code != 0){
				console.log(res);
				return;
			};		
			//拿到总页数，调用分页器
			setPagination(res.page);
		});
	}

	//分页方法
	function setPagination(maxCount){
		$('.pagination').pagination({
			pageCount : maxCount,
			prevContent : '上一页',
			nextContent : '下一页',
			mode : 'fixed',
			count : 8,
			coping : true,
			homePage : '首页',
			endPage : '尾页',
			jump : true,
			jumpIptCls : 'jump-input',
			isHide : true,
			callback : function(obj){
				var nowPage = obj.getCurrent();
				console.log(nowPage);
				//调用数据渲染方法
				ClassifyDom(nowPage, pageSize);
			}
		});
	};
})();

