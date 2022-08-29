<template>
  <!-- 已登陆时显示 -->
  <div v-if="this.status">
    <base-nav-bar title="购物车" :right-show="false"></base-nav-bar>
    <van-checkbox-group v-model="checked">
      <van-swipe-cell v-for="(item,index) in cartList" :key="index" >
        
          <van-card
            :num="goods_number"
            :price="item.price * number"
            :desc="item.goods_desc"
            :title="item.goods_name"
            :thumb="item.goods_thumb"
          >
          <van-checkbox >
            <template #footer>
              <van-stepper v-model="number"></van-stepper>
            </template>
          </van-checkbox>
          </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="clickDeleteHandler" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
    <van-submit-bar :price="this.sumprice*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
  
</template>



<script>
  export default{
    data(){
      return {
        number:"",
        price:100,
        sumprice:'',
        cartList:[],
        show:false,
        status:false,
        checked:false,
      }
      
    },
    async created(){
      if(window.localStorage.getItem('token') == null){
        console.log('没有登录信息')
        this.show = true;
      }else{
        let res = await this.API.getCartData({
          status:'viewcart',
          userId:window.localStorage.getItem('token')
        })
        this.cartList = res.data;
        this.show = false;
        this.status = true;
      }
      this.allprice(); 
    },
    watch:{
      allprice(){
       this.allprice(); 
      }
      
    },
    methods:{
      confirmHandler(){
        this.$router.push({path:'/login'})
      },
      cancelHandler(){
        this.$router.push({path:'/'})
      },
      clickDeleteHandler(){

      },
      allprice(){
        // let res = 0;
        // for(let i = 0;i<=this.cartList.length;i++){
        //   res += this.cartList[i].price;
        //   console.log(res)
        //   this.sumprice = res;
        // }
        // console.log(this.cartList)
        // this.sumprice = res;
        // console.log(this.sumprice)
      }
    },
    components:{
      
    },
    computed:{
      
    }
  }
</script>

<style lang="less" scoped>
  .bg{
    width:100%;
    height:100vh;
    z-index: 200;
  }
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  #footer{
    van-button{
      width:50x;
    }
  }
</style>