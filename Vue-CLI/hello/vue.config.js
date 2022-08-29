const { defineConfig } = require('@vue/cli-service')
// 每次配置文件更新后，要重启服务
module.exports = defineConfig({
  transpileDependencies: true,
  // 设置服务器
  devServer : {
    host : 'localhost',
    //port : 8080,默认会去查看8080有无占用，若有，会自动使用其他端口
    open :true,
  },
  // 设置语法校验
  lintOnSave : true,
})
