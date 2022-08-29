<template>
  <div class="register-view">
    <div class="bg-color">
      <base-nav-bar title="注册" :right-show="false"></base-nav-bar>
       <div class="img-css">
        <img src="../assets/img/logreg-logo206-202.png" />
      </div>
      <van-form @submit="onSubmit" class="gyj-register">
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
            注 册
          </van-button>
        </div>
      </van-form>
      <!-- 跳转到注册界面 -->
      <div class="LoginBox">
        <span class="LoginBtn" @click="clickLoginHandler()">已有账号，立即登录</span>
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
          //正则校验
					{pattern : /^[0-9a-z]{3,16}$/, message: '请输入3-16位用户名，不包含汉字', trigger : 'onChange'},
					{validator : this.userVal, message : '用户名已存在'}
        ],
      }
    },
  methods:{
    async onSubmit(){
      this.$toast.loading({
        message : '注册中...',
        duration : 0,
      });
      let res = await this.API.getUserData({
        username : this.username,
        password : this.password,
        status : 'register',
      });
      if(res.code != 0){
        console.log(res);
        this.$toast.fail({
          message : '注册失败',
        })
        return;
      }
      //把状态：userid username 存储到本地
      localStorage.setItem('token', res.user_id)
      localStorage.setItem('username', res.username)
      this.username = '';
      this.password = '';
      this.$toast.success({
          message : '注册成功',
          onClose : this.tz
      });
      
    },
    async userVal(val){
				//console.log(val);
				// 返回除boolean以外的，都当做错误信息
				//return /^[0-9a-z]{3,16}$/.test(val);
				
				// 异步
				let res = await this.API.getUserData({
					status : 'check',
					username : val
				});
				if(res.code == 1005){
					return '用户名存在';
				}
				if(res.code == 0){
					return true;
				}
			},
    // 跳转到登录页面方法
    tz(){
      console.log("hahah ")
      this.$router.push({path:'login'});
    },
    clickLoginHandler(){
      this.$router.push({path:'login'})
    }
  },
}
</script>

<style scoped lang="less">
  .register-view{
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
     .LoginBox{
      text-align: right;
      .LoginBtn{
        margin-right: 40px;
        color:#fff;
        
      }
    }
  }
}
  .gyj-register{
    padding:20px 20px 10px 20px;
    box-sizing: border-box;
  }
</style>