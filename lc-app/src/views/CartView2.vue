<template>
	<div id="cart-view">
      <van-sticky>
         <div class="cart-top">
               <span class="top-title">购物车</span>
               <span class="address">地址</span>
               <span class="del" @click="del">删除</span>
         </div>
      </van-sticky>
      <!-- 没有商品时显示 需要引入组件 empty-->
      <van-empty 
         v-if="isKong" 
         image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" 
         description="您的购物车中还没有商品" 
      />
     <ul v-else-if="!isKong" class="cart-list">
         <!-- 单个商品 -->
         <li class="cart-item" v-for=" item in cartList" :key="item.goods_id" @click="nowGoodsId = item.goods_id">
            <!-- 多选框 选择 也有组件 我没有看到， 你可以用组件 好看一些 在这上面绑goodsid 好拿到去做事件， 也可以直接传参进去-->
            <input class="xuanzhe" :checked="item.isChecked" @click="danxuan"  type="checkbox" :goodsId="item.goods_id">
            <!-- 这底下的参数去看组件 里面有介绍 -->
            <van-card
               :num="item.goods_number"
               :price="item.price+'.00'"
               :desc="item.goods_desc"
               :title="item.goods_name"
               :thumb="item.goods_thumb"
               thumb-link="#/product"
            >
               <template #footer>
                  <van-button size="mini" :goodsid="item.goods_id" @click="addGoodsNum('cut',$event)"> - </van-button>
                  <van-button size="mini" :goodsId="item.goods_id" @click="addGoodsNum('add',$event)"> + </van-button>
               </template>
            </van-card>
         </li>
     </ul>
      <!-- 提交也有组件 -->
      <van-submit-bar class="z-bar" :price="allPrice" button-text="提交订单" @submit="onSubmit">
         <van-checkbox v-model="checked" @click="quanxuan">全选</van-checkbox>
         <template #tip v-if="true">
            您还没添加默认地址, <span @click="onClickLink">修改地址</span>
         </template>
      </van-submit-bar>
   </div>
</template>

<script>
export default {
   data() {
      return {
         // 商品列表
         cartList: [],
         // 拿到用户id
         TOKEN: '',
         // 全选状态
         checked: false,
         // 点击拿到当前goodsID
         nowGoodsId : '',
         // allPrice : 0
         addresData: [],
         // 是否有商品
         // isKong: true
      }
   },
   async created() {
      this.TOKEN = window.localStorage.getItem('token')
      // 拿到购物车列表
      let res = await this.API.getCartData({
         status: 'viewcart',
         userId : this.TOKEN
      })
      // 添加一个属性，对选中状态进行控制
      res.data.forEach(item => {
         item.isChecked = false
      })
      this.cartList = res.data
      // console.log(this.cartList);

      // 拿到默认地址
   },
   computed: {
      // 总价格
      allPrice() {
         let pri = 0
         this.cartList.forEach((item) => {
            if (item.isChecked) {
               pri += item.goods_number * item.price
            }
         })
         // 显示的时候 它会除掉100 这边就乘一下
         return pri * 100
      },
      // 判断列表是否为空 对显示空页面的状态进行控制
      isKong() {
        return this.cartList.length == 0
      }
   },
   methods: {
      // 全选
      quanxuan() {
         this.cartList.forEach(item => {
            item.isChecked = this.checked
         })
      },
      // 单选 用元素对象拿到 goodsid 你也可以传参过来 底下的都是 可以直接传参
      danxuan(e) {
         let nowId = e.target.getAttribute('goodsid');
         // console.log(e.target.getAttribute('goodsid'));
         this.cartList.forEach(item => {
            if (item.goods_id == nowId) {
               item.isChecked = !item.isChecked
            }
         })
      },
      // 加减商品
      addGoodsNum(status, event) {
         // 拿到我绑定了的goodsid 
         let nowId = event.target.getAttribute('goodsid');

         // 找到当期商品 进行增加或减少
         this.cartList.forEach(item => {
            if (item.goods_id == nowId) {
               // 如果status是add就是加事件
               if (status == 'add') {
                  item.goods_number = item.goods_number >=10 ? 10 : ++item.goods_number
               }
               // 如果status是cut就是减事件
               if (status == 'cut') {
                  item.goods_number = item.goods_number <= 1 ? 1 : --item.goods_number
               }
               // 将数据传入后台
               this.API.getCartData({
                  status: 'addcart',
                  userId: this.TOKEN,
                  goodsId: nowId,
                  goodsNumber : item.goods_number
                })
            }
         })
      },
      // 删除商品
      del() {
         // 定义一个空数组 接收勾选的goodsid
         let goodsIdArr = []
         this.cartList.forEach(item => {
            if (item.isChecked) {
               goodsIdArr.push(item.goods_id)
            }
         })
         // 用goods_id 去比对 删除勾选项  并向后台传数据
         goodsIdArr.forEach(item => {
            this.cartList.forEach((item1,index) => {
               if (item1.goods_id == item) {
                  console.log(item1.goods_id);
                  this.API.getCartData({
                     status: 'delcart',
                     userId: this.TOKEN,
                     goodsId: item1.goods_id,
                  })
                  this.cartList.splice(index,1)
               }
            })
            
         })
      },
      onClickLink() {
         this.$router.push('/address')
      },
      onSubmit() {
         
         console.log('点击提交');
      }
   }
   
}
</script>

<style lang="less" scoped>
   #cart-view{
      background: #f2f2f2;
      .cart-top{
         height: 2rem;
         padding: 0 .625rem;
         background: #f2f2f2;
         
         display: flex;
         .top-title{
            font-size: 1.25rem;
            font-weight: bold;
            flex: 3;
            line-height: 2rem;
         }
         .address{
            flex: 8;
            line-height: 2rem;
            font-size: .75rem;
         }
         .del{
            flex:1;
            line-height: 2rem;
            font-size: .9375rem;
            color: #F42D11;
         }
      }

      .cart-list{
         padding:.625rem .625rem 3rem;
         .cart-item{
            position:relative;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: .625rem;

            .xuanzhe{
               position:absolute;
               top : .75rem;
               left: .1875rem;
               z-index: 1;
            }
         }
      }
      .z-bar{
         margin-bottom: 3.125rem;
      }
   }
</style>