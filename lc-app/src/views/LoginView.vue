<template>
  <div class="login-view">
    <div class="bg-color">
      <base-nav-bar title="登录" :right-show="false"></base-nav-bar>
      <div class="img-css">
        <img src="../assets/img/logreg-logo206-202.png" />
      </div>
      <van-form @submit="onSubmit" class="gyj-login">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="usernameRules"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
      
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" style="font-size:20px">
            登 录
          </van-button>
        </div>
      </van-form>
      <!-- 跳转到注册界面 -->
      <div class="registerBox">
        <span class="registerBtn" @click="clickRegisterHandler()">立即注册</span>
      </div>
    </div>

  </div>
</template>

<script>

export default {
   data() {
    return {
      username : '',
      password : '',
      usernameRules:[
        {required:true,message:'请填写用户名'},
      ],
    }
  },
  created(){
    if(window.localStorage.getItem('token') == null){
      this.Dialog();
    }else{
      return
    }
  },
  methods:{
    async onSubmit(){
      this.$toast.loading({
        mask:true,
        message : '登录中...',
        duration : 0,
      });
      let res = await this.API.getUserData({
        username : this.username,
        password : this.password,
        status : 'login',
      });
      if(res.code != 0){
        console.log(res);
        this.$toast.fail({
					message : '登录失败',
        })
        return;
      }
      //把状态：userid username 存储到本地
      localStorage.setItem('token', res.user_id)
      localStorage.setItem('username', res.username)
      this.username = '';
      this.password = '';
      this.$toast.success({
					message : '登录成功',
          onClose : this.tz
			});
      
    },
    // 跳转到首页方法
    tz(){
      console.log("hahah ")
      this.$router.push({path:'/'});
    },
    clickRegisterHandler(){
      this.$router.push({path:'register'})
    },
    Dialog(){
      this.$dialog.confirm({
        message:'请先登录'
      })
    }
    
  },
}
</script>

<style lang="less" scoped>
.login-view{
  background: url('../assets/img/tmp_bg1.jpg') no-repeat -550px 0px;
  background-size: cover;
  height: 100vh;
  .bg-color{
    background-color: rgba(50, 50, 50, 0.7);
    height: 100vh;
    .img-css{
      width: 100%;
      text-align: center;
      margin-top: 25%;
    }
    .registerBox{
    text-align: right;
    .registerBtn{
      margin-right: 40px;
      color:#fff;
      text-decoration: underline;
      // line
    }
  }
  }
  
}
.gyj-login{
  
  padding:20px 20px 10px 20px;
  box-sizing: border-box;
}  
</style>