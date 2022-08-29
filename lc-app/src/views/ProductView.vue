<template>
  <div id="product-view">
    <base-nav-bar title="良仓"></base-nav-bar>
    <!-- 商品轮播图 -->
    <div class="goods-banner">
      <van-swipe class="my-swipe" indicator-color="white"  autoplay="3000">
          <van-swipe-item v-for="item in goodsThumbList" :key="item">
              <van-image width="100%" :src="item"/>
          </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品信息 -->
    <div class="goods-about">
      <div class="goods-about-top">
        <p class="goods-name">{{goods.goods_name}}</p>
        <span class="like" @click="clickLikeHandler()">
          <van-icon :name="like"></van-icon>
        </span>
      </div>
      <p class="goods-desc">{{goods.goods_desc}}</p>
      <p class="goods-price">¥{{goods.price}}</p>
      
    </div>
    <!-- 弹出栏目 -->
    <van-cell @click="show = true" title="选择颜色、尺码、数量" is-link></van-cell>
    <van-action-sheet class="goods-con" v-model:show="show" title="选择颜色、尺码、数量">
      <div class="content">
        <p class="goods-name">{{goods.goods_name}}</p>
        <p class="goods-desc">{{goods.goods_desc}}</p>
        <p class="goods-price">¥{{goods.price}}</p>
        <div class="number">
          <p>数量：</p>
          <van-stepper class="number-con" v-model="goodsNumber" min="1" max="10" button-size="30px" input-width="70px" />
        </div>
        <div class="color-option">
          <p>颜色：</p>
          <span v-for="(item,index) in colorList" :key="index" :class="item.color" ref="changeColor" @click="changeColor(item,index)">{{item.name}}</span>
        </div>
      </div>
    </van-action-sheet>
    <p class="xg-number">
      已选数量:
      <span>{{this.goodsNumber}}</span>
    </p>
    
    <!-- 底部动作栏 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="clickCartHandler()"/>
      <van-action-bar-icon :icon="icon" :text="text" color="#ff5000" @click="clickStarHandler()"/>
      <van-action-bar-button type="warning" text="加入购物车" color="skyblue" @click="clickAddCart()"/>
      <van-action-bar-button type="danger" text="立即购买" color="#333"/>
    </van-action-bar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      icon : 'star-o',
      text : '收藏',
      like : 'like-o',
      goodsId:'',
      goods : {},
      goodsThumbList:[],
      show:false,
      goodsNumber:1,
      colorList: [
        {name:'无',color : 'none'},
        {name:'红色',color : 'red'},
        {name:'黄色',color : 'yellow'},
        {name:'蓝色',color : 'blue'},
        {name:'五颜六色',color : 'colorful'},
      ],
      nowColor : ''
    }
  },
  async created(){
    // 获取当前商品数据
    this.goodsId = this.$route.query.goodsId;
    let res = await this.API.getGoodsData({goodsId:this.goodsId})
    console.log(res)
    this.goods = res[0]
    console.log(this.goods)
    // 连续插入两条数据，实现轮播效果
    this.goodsThumbList.push(this.goods.goods_thumb);
    this.goodsThumbList.push(this.goods.goods_thumb);
    console.log(this.goodsThumbList)


  },
  computed:{
    
  },
  methods:{
    // 点击收藏方法
    clickStarHandler(){
      this.icon = this.icon == 'star-o' ? 'star' : 'star-o';
      this.text = this.text == '收藏' ? '已收藏' : '收藏';
    },
    // 点击喜欢
    clickLikeHandler(){
      this.like = this.like == 'like-o' ? 'like' : 'like-o';
    },
    changeColor(item,index){
      this.$refs.changeColor.map(item =>{
        return item.className = item.color;
      })
      this.$refs.changeColor[index].className = this.$refs.changeColor[index].className = 'active ' + item.color
      this.nowColor = item.color
    },
    // 点击购物车
    clickCartHandler(){
      if(window.localStorage.getItem('token') == null){
        this.$router.push({path:'login'})
      }else{
        this.$router.push({path:'cart'})
      }
    },
    // 点击添加到购物车
    async clickAddCart(){
      this.$toast.loading({
        mask:true,
        message : '正在添加...',
        duration : 0,
      })
      let res = await this.API.getCartData({
        status:'addcart',
        userId:window.localStorage.getItem('token'),
        goodsId:this.goodsId,
        goodsNumber:this.goodsNumber
      })
      if(res.code != 0){
        // console.log(res);
        this.$toast.fail({
          message : '添加失败',
        })
        return;
      }
      // console.log(res);
      this.$toast.success({
        message : '添加成功'
			});
    }
  }
}
</script>

<style scoped lang="less">
.goods-con{
  .content{
    .goods-name{
      width: 97%;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .number{
      >p{
        padding: 10px 10px 5px ;
      }
      .number-con{
        padding: 5px 10px 10px;
      }
    }
    .color-option{
      padding: 10px;
      span{
        display: inline-block;
        border: 1px solid #999;
        margin: 5px 10px 0px 0px;
        padding: 0px 20px;
      }
      .red.active{
        background-color: #ff0000;
        color: #fff;
      }
      .yellow.active{
        background-color: #ffff00;
        color : #333
      }
      .blue.active{
        background-color: #0c79cc;
        color: #fff;
      }
      .none.active{
        background-color: #999;
        // color:#fff
      }
      .colorful.active{
        background: linear-gradient(to top right, #ff0000, #ffff00, #0c79cc);
        
      }
    }
  }
}
.xg-number{
  font-size: 20px;
  background-color: #fff;
  padding: 10px 16px;
  span{
    color:#0c79cc;
  }
}

.goods-about,.content{
  padding:0px 20px;
  .goods-about-top{
    display: flex;
    justify-content: space-between;
    .goods-name{
      width: 97%;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .like{
      line-height: 40px;
      font-size: 20px;
    }
  }
  .goods-desc{
    font-size: 14px;
    color: #666;
  }
  .goods-price{
    margin-top: 20px;
    color: #0c79cc;
    font-size: 28px;
    &::after{
      content: '';
      display: block;
      height: 10px;
      width: 100%;
      border-bottom: 1px solid #999;
    }
  }
  
}

  
</style>