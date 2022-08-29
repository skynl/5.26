// 引入
const http = require('http')

const url = require('url')

let n = 0;
// console.log(http)
// 创建一个服务,接受一个回调，参数为请求 和 响应对象
let app = http.createServer((request,response)=>{
    // 默认会自动请求/favicon.ico 路径,阻止它的业务
    if(request.url == '/favicon.ico') return;

    
    // 设置响应头
    response.setHeader('Content-Type','text/html;charset=utf-8');
    
    // post请求数据，监听 两个事件
    request.on('data',chunk=>{
        console.log(chunk);
    })

    // 响应回去
    response.write('你访问了后台,这是前端要的'+ n);
    // 结束请求
    response.end();
})
// 监听
app.listen(3000,'localhost',()=>{
    console.log('服务开启成功')
})