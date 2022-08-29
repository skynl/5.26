<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <h1>我是App组件</h1>
  <HelloWorld /> -->
  <!-- 路由链接 -->
  <router-link to="/">首页</router-link>
  <router-link to="/news">新闻</router-link>
  <!-- 渲染路由出口 -->

  <router-view></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  // methods : {
  //   clickHandler(){
  //     let a = 100;
  //     console.log(a);
  //   }
  // }
}
</script>

<style>
/* #app {

} */
</style>
