const path = require('path')
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname,'public')));
// 引入cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.post('/login',(req,res)=>{
	// 下发设置的cookie
	res.cookie('name','xiaoxiong',{maxAge:1000*10*10})
	res.send('登陆成功')
});

app.get('/goods',(req,res)=>{
	console.log(req.cookies)
	res.send('goods')
})

app.post('/cart',(req,res)=>{
	console.log(req.cookies)
	res.send('购物车成功')
});

app.listen(3000,()=>{
	console.log('服务开启成功')
});