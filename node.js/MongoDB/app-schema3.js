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
});

// 定义规则schema
let foodSchema = mongoose.Schema({
	"name": String,
	"price": Number,
	"oldPrice": String,
	"description": String,
	"sellCount": Number,
	"rating": Number,
	"info": String
})

//创建模型:创建集合名，当前集合字段规则，集合名
// 返回一个构造函数
let foodModel = mongoose.model('food',foodSchema,'food');
// 创建一条条数据
// let xiaoming = new userModel({
// 	age:18,
// 	username:'小明',
// 	sex:'男'
// })

// 把当前xiaoming实例保存到集合中去
// 实例方法上面有保存方法
// xiaoming.save((err)=>{
// 	console.log(err)
// })

// 创建一条条数据
// let fd = new foodModel({
// 	"name": "皮蛋瘦肉粥333",
// 	"price": 10,
// 	"oldPrice": "33",
// 	"description": "咸粥",
// 	"sellCount": 229,
// 	"rating": 100,
// 	"info": "333香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足"
// })
// 模型上有创建一条数据的方法
// foodModel.create(fd,(err,doc) => {
// 	console.log(err);
// 	console.log(doc);
// })

// 删除匹配到的第一条
// foodModel.deleteMany({"name":"南瓜粥"},(err,doc)=>{
// 	console.log(err);
// 	console.log(doc);
// })

// 查找
// let pageSize = 3
// let page = 2
// foodModel.find({},(err,doc)=>{
// 	console.log(err)
// 	console.log(doc)
// }).sort({price:-1})

// 查找集合数量
// foodModel.countDocuments((err,count)=>{
// 	console.log(err)
// 	console.log(count)
// })

foodModel.updateMany({'name':'皮蛋瘦肉粥333'},{'name':'皮蛋瘦肉粥','price':100},(err,result)=>{
	console.log(err)
	console.log(result)
})
