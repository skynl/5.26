<template>
  <van-nav-bar 
  :title="title"
  fixed
  placeholder
  left-text="返回"
  left-arrow
  @click-left="clickLeftHandler"
  >
    <template v-if="rightShow" #right>
        <!-- 登录or购物车 -->
        <van-icon @click="clickCartHandler" v-if="TOKEN" name="shopping-cart-o" class="gyj-icon" badge="0" ></van-icon>
        <span @click="clickLoginHandler" class="login" v-else>登录</span>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name:'baseNavBar',
  props:{
    title:String,
    rightShow : {
				type : Boolean,
				default : true
			}
  },
  data(){
    return {
      TOKEN:'',
      route : '',
      
    }
  },
  created(){
    this.TOKEN = window.localStorage.getItem('token');
  },  
  methods:{
    // 返回按钮
    clickLeftHandler(){
      this.$router.back();
    },
    // 登录按钮
    clickLoginHandler(){
      this.$router.push({path:'/login'});
    },
    // 购物车按钮
    clickCartHandler(){
      this.$router.push({path:'/cart'});
    },
    // 注册按钮
    clickRegisterHandler(){
      this.$router.push({path:'/register'});
    }
  }
}
</script>

<style lang="less" scoped>
  .login,.register{
    color:#fff;
  }
  .gyj-icon{
    font-size: 20px;
  }
</style>