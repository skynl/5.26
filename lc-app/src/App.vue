<template>
  <!-- 路由渲染出口 -->
  <router-view v-slot="{Component}">
    <!-- <transition
      enter-active-class="gyj-animate__animated animate__fadeIn"
      leave-active-class="gyj-animate__animated animate__fadeOut"
    > -->
      <component :is="Component"></component>
    <!-- </transition> -->
  </router-view>

  <!-- 调用二次封装组件 -->
  <buttom-nav></buttom-nav>
</template>
<script>
  // 引入底部导航组件
  import ButtomNav from './components/index/ButtomNav.vue'
  export default {
    name:'App',
    components:{
      ButtomNav,
    },
  }
</script>

<style lang="less" scoped>

</style>
