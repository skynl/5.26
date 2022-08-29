// 引入node模块 fs
const fs = require('fs');
// 异步读取文件
// fs.readFile('./read.txt','utf-8',(err,doc)=>{
//     console.log(err);
//     console.log(doc);
// })
// fs.readFile('./test.html','utf-8',(err,doc)=>{
//     console.log(err);
//     console.log(doc);
// })

// 写入文件
fs.writeFile('./read2.txt','哈哈',(err)=>{
    console.log(err)
})
// 异步添加内容
fs.appendFile('./read.txt','哈哈',(err)=>{
    console.log(err)
})
// 删除文件
fs.unlink('./read2.txt',(err)=>{
    console.log(err)

})