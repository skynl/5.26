
// 原生操作
// const MongoClient = require('mongodb').MongoClient;
// MongoClient.connect();

// 使用mongoose 框架操作数据库
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/food'
// 首先连接数据库(回调形式)
// let a = mongoose.connect(dbURL,function(err){
// 	if(err){
// 		console.log(err);
// 		console.log('连接数据库失败');
// 		return;
// 	}
// 	console.log('数据库连接成功');
// });

// 首先要连接数据库：使用promise
mongoose.connect(dbURL).then(()=>{
	console.log('连接数据库成功')
},(err)=>{
	console.log(err);
	console.log('连接数据库失败')
})