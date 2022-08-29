let http = require('http');

let app = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.end('请求了')
    // throw new Error('错误')
    console.log('我是内部程序')
    console.log(req.connection.remoteAddress);
})
console.log('我是主程序')

app.listen(3000,'localhost')