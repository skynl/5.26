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
let userSchema =  mongoose.Schema({
	age:{
		type:Number,
		default:18
	},
	username:String,
	sex:{
		type:String,
		required:true
	}
})



//创建模型:创建集合名，当前集合字段规则，集合名
// 返回一个构造函数
let userModel = mongoose.model('user',userSchema,'user');
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
let xiaobei = new userModel({
	
	username:'小北',
	
})
// 模型上有创建一条数据的方法
userModel.create(xiaobei,(err,doc) => {
	console.log(err);
	console.log(doc);
})