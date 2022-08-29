// 引入express
const express = require('express')
// 引入path
const path = require('path')
// 引入body 参数
const bodyParser = require('body-parser')

// 调用方法,生成实例
const app = express();


// 设置静态,调用static方法，参数为路径文件夹（绝对路径）
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')))

app.get('/api_goods',(req,res)=>{
    res.send('我是api_goods数据')
})

app.post('/api_user',(req,res)=>{
    res.send('我是api_user数据')
})


// 监听
app.listen(3000,()=>{
    console.log('服务开启了')
})