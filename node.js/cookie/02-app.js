const path = require('path')
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname,'public')));
// 引入token
const jwt = require('jsonwebtoken');

// body-parser:获取前端数据的插件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

let token = null;
app.post('/login',(req,res)=>{
	// 下发设置的cookie
	token = jwt.sign({username:'小熊'},'web',{expiresIn:20});
	
	res.send({code:0,name:'登陆成功',token:token})
});

app.get('/goods',(req,res)=>{
	res.send('goods')
})

app.post('/cart',(req,res)=>{
	// console.log(req.body.webToken);
	let t = req.body.webToken;
	// let t2 = jwt.verify(t,'web')
	console.log(token == t)
	console.log(jwt.verify(t,'web'))
	res.send('购物车成功')
});

app.listen(3000,()=>{
	console.log('服务开启成功')
});