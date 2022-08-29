const path = require('path');
//引入插件HtmlWebpackPlugin 是一个函数
const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');
//引入清理删除打包dist目录 插件
//引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//导出
module.exports = {
	//配置打包模式development | production | none
	mode : 'development',
	
	//单入口文件
	entry : './src/js/main.js',
	// entry : {main : './src/js/main.js',a : './src/js/a.js'},

	
	//配置出口
	output : {
		path : path.resolve(__dirname, 'dist'),
		//对应单入口和多入口整合为一个js文件
		// filename : '[name].bundle.js',
		filename : 'bundle.js',

		// 打包之前清理dist文件夹
		clean : true,
	},
	// 模块
	module : {
		rules : [
			// 配置CSS
			{test : /\.css$/,
				use : [
					'style-loader',
					'css-loader',
					{
						loader : 'postcss-loader',
						options : {
							postcssOptions : {
								// 使用插件
								plugins : [autoprefixer]
							}	
						}
					},
				]
			},
			// 配置less 先把less文件处理为CSS文件，css解析到js中，最后注入内部样式
			{test : /\.less$/ , use :['style-loader','css-loader','less-loader']}
		]
	},
	
	//配置插件
	plugins : [
		// new CleanWebpackPlugin(),
		
		//new HtmlWebpackPlugin(),
		new HtmlWebpackPlugin({
			//指定复用的模板内容
			template : './src/index.html',
			
			//模板中调用 <title><%=htmlWebpackPlugin.options.title%></title>
      		title : '正航科技', 
      
			//指定某个html结构进行渲染
			template : './src/index.html', 
			//打包后的文件名
			filename : 'index.html', //默认生成在dist目录下
			//指定要引用的打包后js文件
			//chunks : ['base', 'index'],  //会自动引入base.bundle.js和index.bundle.js
			minify: { // 压缩HTML文件
				removeComments: true, // 移除HTML中的注释
				collapseWhitespace: true, // 删除空白符与换行符
				minifyCSS: true,// 压缩内联css
			}
		}),
	]
	
	
}