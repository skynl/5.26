// 引入mongodb
const mongodbClient = require('mongodb').MongoClient;

// 定义好数据库路径和数据库名
const dbURL = 'mongodb://localhost:27017/gyj';

// 调用连接方法
mongodbClient.connect(dbURL,(err,client)=>{
	
	if(err){
		console.log(err)
		return;
	}
	//获取到数据库名
	const gyj = client.db('gyj')
	console.log(gyj)
	
	// 获取到当前数据库名内的集合
	let food = gyj.collection('food');
	// 添加一条数据
	food.insertOne({"name":"花雕醉鸡","price":"78"},(err,document)=>{
		console.log(err)
		console.log(document)
	})
	// console.log(client);
	client.close()
});
