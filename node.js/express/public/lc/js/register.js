	//验证码
	//数组 0-9 a-z
	//背景图位置
	//随机数 下标 0-35  遍历 获取4 
	//第一次拿到值 随机一个字体大小区间  颜色  斜体  

//全局的基础路径变量
var baseURL = 'http://159.75.89.136:3000';

(function(){
// 用户名框
var oUsername = document.querySelector('.username');
// 密码框
var oPwd = document.querySelector('.newpasswd');
// 确认密码框
var oPwdSure = document.querySelector('.passwdQR');
// 注册按钮
var oBtn = document.querySelector('.register-btn');
// 错误框文本
var wrongMsg = document.querySelector('.wrong-msg');
// var userMsg = document.querySelector('.user-msg');
// 密码框状态
var pwdmessage = document.querySelector('.pwdMsg');
// 确认密码框状态
var pwdSureMessage = document.querySelector('.pwdSureMsg');
// 错误框
var wrongMsgBox = document.querySelector('.wrong-msgbox');
// 用户名可用框状态
var usermessage = document.querySelector('.userMsg');
//注册条款
var zctk = document.querySelector('#agreepsd');
// 验证码框
var oYzm = document.querySelector('.yzmNumber');
// 验证码背景
var yzmBg = document.querySelector('.yzm-bg');
// 更换验证码
var changeYzm = document.querySelector('.changeYzm');


// 验证码
// function random(max,min){
//         return Math.round(Math.random()*(max-min)+min);
//     }
// function randomStr(){  //封装，以便日后使用。
//    //创建一个空字符，用于存放随机数/字母
// 	var strData = "";
// 	//生成随机字符库 (验证码四位，随机数三种，取公倍数12,所以循环4次。也可以是120次，1200次。)
// 	for(var i=0;i<4;i++){
// 		var num = random(0,9);//生成0-9的随机数
// 		var az = String.fromCharCode(random(97,122));//生成a-z
// 		var AZ = String.fromCharCode(random(65,90));//生成A-Z

// 		strData = strData + num + az + AZ;//将生成的字符进行字符串拼接
	   
// 	}
// 	// 开始真正的随机(从随机字符库中随机取出四个)
// 	var str = "";
// 	for(var i=0;i<4;i++){
// 		str += strData[random(0,strData.length-1)]
// 	}
// 	// console.log(str)
// 	return str;
// }
// var yzm = randomStr();

// var usnameMsgBox = document.querySelector('.usname-msgbox');
console.log(changeYzm);
//定义状态
var userStatus = false;
var pwdStatus = false;
var zctkStatus = false;
var yzmStatus = false;
//用户名	因为要向后台请求用户名是否可用， 所以为了减小后台服务器压力，不使用keyup 用 blur
oUsername.onblur = function(){
	//验证用户名 失焦  键盘抬起
	//正则定义，每次都要运行一下
	var userRe = /^[0-9a-z_]{3,12}$/g;
	var username = oUsername.value;
	if(!userRe.test(username)){
		console.log('没通过');
		//提示
		wrongMsgBox.style.display = 'block';
		usermessage.style.display = 'none';
		wrongMsg.innerHTML = '用户名必须是3-12位数字字母下划线组成';
		wrongMsg.style.color = 'black';
		userStatus = false;
		return;
	};
	
	//正则通过，请求后台用户名检查
	myAjax.post(baseURL + '/api_user', {
		username : username,
		status : 'check'
	}, function(res){
		//console.log(res);
		if(res.code != 0){
			console.log(res);
			//提示
			wrongMsgBox.style.display = 'block';
			usermessage.style.display = 'none';
			wrongMsg.innerHTML = '用户名已存在';
			wrongMsg.style.color = 'black';
			userStatus = false;
			return;
		};
		
		//用户名可用
		//提示
		wrongMsgBox.style.display = 'none';
		usermessage.style.display = 'block';
		usermessage.innerHTML = '用户名可用';
		usermessage.style.color = 'green';
		//放开注册按钮
		userStatus = true;
	});
	
};
// 验证码
var yzm = randomStr();
function changeYZM(){
	yzm = randomStr();
}
changeYzm.onclick = function(){
	changeYZM();
	console.log(yzm);
	yzmBg.innerHTML = yzm;
}

yzmBg.innerHTML = yzm;
// oYzm.onblur = function(yzm){
// 验证验证码是否正确方法
function yzmm(x){
	var yzmValue = oYzm.value;
	if(yzmValue != x){
		wrongMsgBox.style.display = 'block';
		wrongMsg.innerHTML = '验证码错误';
		wrongMsg.style.color = 'black';
		changeYZM();
		yzmBg.innerHTML = yzm;
		yzmStatus = false;
		return;
	}
	wrongMsgBox.style.display = 'none';
	//放开注册按钮
	yzmStatus = true;
	console.log(yzmStatus);
}
oYzm.onblur = function(){
	yzmm(yzm);
}


//密码
oPwd.onkeyup = function(){
	var pwdRe = /^[0-9]{6,12}$/g;
	var pwd = oPwd.value;
	
	if(!pwdRe.test(pwd)){
		//提示
		wrongMsgBox.style.display = 'block';
		pwdmessage.style.display = 'none';
		wrongMsg.innerHTML = '密码必须为6-12位数字';
		wrongMsg.style.color = 'black';
		// pwdMsg.style.text-align = center;
		
		pwdStatus = false;
		return;
	};
	//密码能过
	wrongMsgBox.style.display = 'none';
	pwdmessage.style.display = 'block';
	pwdmessage.innerHTML = '√';
	pwdmessage.style.color = 'green';
	// //放开注册按钮
	// pwdStatus = true;
	// oBtn.disabled = false;
};

// 确认密码
oPwdSure.onkeyup = function(){
	var pwd = oPwd.value;
	var pwdSure = oPwdSure.value;
	if(pwdSure != pwd){
		wrongMsgBox.style.display = 'block';
		pwdSureMessage.style.display = 'none';
		wrongMsg.innerHTML = '确认密码需与密码一致';
		wrongMsg.style.color = 'black';
		pwdStatus = false;
		return;
	};
	// 密码能过
	wrongMsgBox.style.display = 'none';
	pwdSureMessage.style.display = 'block';
	pwdSureMessage.innerHTML = '√';
	pwdSureMessage.style.color = 'green';
	//放开注册按钮
	pwdStatus = true;
	oBtn.disabled = false;
}
// 验证良仓条款是否选中
zctk.onclick = function(){
	if(zctk.checked != true){
		// do something
		console.log('111');
		wrongMsgBox.style.display = 'block';
		wrongMsg.innerHTML = '请同意良仓条款';
		wrongMsg.style.color = 'black';
		zctkStatus = false;
	}else{
		wrongMsgBox.style.display = 'none';
		wrongMsg.innerHTML = '';
		zctkStatus = true;
	}
}


//点击注册按钮
oBtn.onclick = function(){
	// console.log('111');
	//验证每个表单元素
	if(!userStatus || !pwdStatus || !zctkStatus || !yzmStatus){
		return;
	};
	
	//注册用户
	myAjax.post(baseURL + '/api_user', {
		username : oUsername.value,
		password : oPwd.value,
		status : 'register'
	}, function(res){
		
		console.log(res);
		if(res.code != 0){
			console.log(res);
			return;
		};
		oUsername.value = '';
		oPwd.value = '';
		alert('注册成功，3秒之后跳转登录');
		//用JS去跳转
		location.href = 'login.html';
	});
	
};

var close = document.querySelector('.close');

close.onclick = function(){
	wrongMsgBox.style.display = 'none';
	wrongMsg.innerHTML = '';
}


})();

