//全局的基础路径变量
var baseURL = 'http://159.75.89.136:3000';

var oUsername = document.querySelector('.loginInput');
var oPwd = document.querySelector('.loginpsd');
var oLoginBtn = document.querySelector('.loginLC');
var wrongMsgBox = document.querySelector('.wrong-msgbox');
// 错误框文本
var wrongMsg = document.querySelector('.wrong-msg');
oLoginBtn.onclick = function(){
	console.log('111');
	//验证不为空
	if(oUsername.value == '' || oPwd.value == ''){
		wrongMsgBox.style.display = 'block';
		wrongMsg.innerHTML = '用户名或密码不能空';
		wrongMsg.style.color = 'black';
		// alert('用户名或密码不能空');
		return;
	};
	//发起登录请求
	myAjax.post(baseURL + '/api_user', {
		username : oUsername.value,
		password : oPwd.value,
		status : 'login'
	}, function(res){
		console.log(res);
		if(res.code != 0){
			wrongMsgBox.style.display = 'block';
			wrongMsg.innerHTML = '帐号或密码错误';
			wrongMsg.style.color = 'black';
			// alert('帐号或密码错误');
			return;
		};
		//登录成功
		oUsername.value = '';
		oPwd.value = '';
		//把状态：userid username 存储到本地
		localStorage.setItem('token', res.user_id);
		localStorage.setItem('username', res.username);
		//跳转到哪里
		//获取当前地址的goodsId
		var goodsId = getUrlData('goodsId');
		var catId = getUrlData('catId');
		if(goodsId){
			location.href = `xiangqing.html?goodsId=${goodsId}`;
		}else if(catId){
			location.href = `shopfenlei.html?catId=${catId}`;
		}else{
			window.location.href = 'index.html';
		};
	});
}
var close = document.querySelector('.close');

close.onclick = function(){
	wrongMsgBox.style.display = 'none';
	wrongMsg.innerHTML = '';
}
