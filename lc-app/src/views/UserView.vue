<template>
  <base-nav-bar title="个人中心" :right-show="false"></base-nav-bar>
  <div class="user-logo">
    <img src="../assets/img/tmp_bg1.jpg" />
    <p>{{this.username}}</p>
  </div>
  <van-cell-group class="gn-list" inset>
    <van-cell center title="我的订单" icon="notes-o" is-link size="20px"/>
    <van-cell center title="地址管理" icon="location-o"  is-link/>
    <van-cell center title="心愿单" icon="like-o"  is-link/>
    <van-cell center title="我的积分" icon="points"  is-link/>
    <van-cell center title="联系客服" icon="service-o"  is-link/>
    <van-cell center title="服务政策" icon="description"  is-link/>
    <!-- <van-dialog message="已退出登录" > -->
    <van-cell center title="退出登录" icon="close"  is-link @click="clickquitHandler"/>
    <!-- </van-dialog> -->
    
  </van-cell-group>
</template>

<script>
import { Dialog } from 'vant';
// import { Ref } from 'vue';
  export default{
    data(){
      return{
        username:window.localStorage.getItem('username')
      }
      

    },
    
    methods:{
      clickquitHandler(){
        Dialog.confirm({ 
          message: '确定退出登录嘛？' 
        }) .then(() => {
          // on confirm
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          this.$router.go(0)
        })
        .catch(() => {
          // on cancel
        })
        
      }
    }

  }
</script>

<style lang="less" scoped>
  .user-logo{
    margin: 100px 0px;
    text-align: center;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
</style>