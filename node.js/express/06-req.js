// 引入express
const express = require('express')
// 引入path
const path = require('path')
// 引入body 参数
const bodyParser = require('body-parser');

// 调用方法,生成实例
const app = express();


// 设置静态,调用static方法，参数为路径文件夹（绝对路径）
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')))

// 试用一下body，把前端post请求的参数转化成一个叫body的对象，最后挂载在req对象上
app.use(bodyParser.urlencoded({extended:false}))


// app.get('/api_goods',(req,res)=>{
app.get('/api_goods/:id',(req,res)=>{
    console.log(req.path)
    console.log(req.hostname)
    console.log(req.query)//拿到前端get请求传递数据

    console.log(req.params)//获取动态路由
    res.send('我是api_goods数据')
})
//获取post请求 借助第三方包
app.post('/api_user',(req,res)=>{
    console.log(req.body)
    res.send('我是api_user数据')
})


// 监听
app.listen(3000,()=>{
    console.log('服务开启了')
})