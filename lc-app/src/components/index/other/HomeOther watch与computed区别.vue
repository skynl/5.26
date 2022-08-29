<template>
  <h1>我是其它分类{{nowId}}--{{catId}}</h1>
  <button @click="msg1 = '哈哈哈'">按钮1{{msg1}}</button>
  <button @click="msg2 = '哈哈哈2'">按钮2{{msg2}}</button>
</template>

<script>
  export default {
    props : {
      nowId:String
    },
    data(){
      return {
        msg1:'长沙',
        msg2:'武汉',
      }
    },
    methods:{

    },
    created(){
    // console.log(this.nowId);
    },
    //  数据只要有一个发生变化，就会触发
    updated(){
      // console.log(this.nowId);
      console.log('updata执行了')
    },
    // ------
    // 计算属性必须用在模板中,必须要return，并且具有缓存功能（以来的数据不发生变化，会调用缓存）
    // 不可以使用异步程序
    // 更适合监听数据变化
    // 深监听
    computed:{
      // 方法，最后绑定一个数据属性上去
      catId(){
        console.log('我是计算属性'+this.nowId)
        return "哈哈";
      }
    },
    // -------
    // 观察者模式
    // watch可以监听单独的某一个data数据或computed数据
    // watch没有缓存，调用一次就更新一次
    // 可以使用异步程序
    // 更适合做大量的业务逻辑
    // 默认浅监听，可以调用实例方法$watch进行深监听

    watch:{
      // 要监听的数据属性为方法名，接受两个参数，新值和旧值
      msg2(newVal,oldVal){
        console.log(newVal,oldVal);
      },
      nowId(newVal,oldVal){
        console.log(newVal,oldVal);
      },
    },
  }
</script>

<style>

</style>