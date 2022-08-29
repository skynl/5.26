<template>
  <div class="classify">
    <h1>{{nowIdList.product_content}}</h1>
    <div class="classify-list">
        <!-- 调用单独商品组件 -->
        <slot><base-goods v-for="(item) in goodsList.data" :key="item.goods_id" :goods="item"></base-goods></slot>
    </div>
    <p @click="clickMoreHandler()" v-show="!show">查看更多</p>
    <p v-show="show" class="no-more">正在上新中,敬请期待哦 亲~❤</p>
  </div>
</template>

<script>
import BaseGoods from '@/components/base/BaseGoods.vue';
export default {
    props:{
        nowIdList:Object,
        nowId:String
    },
    data(){
        return {
            page:1,
            pagesize:4,
            keywords : '',
            show:'',
            goodsList:[],
            nowIdList_name:[],
        }
        
    },
    
    created(){
        this.nowIdList_name = this.nowIdList
        console.log(this.nowIdList_name.product_content)
        this. getGoodsData(this.nowIdList_name.product_content);
        // console.log(this.nowId);
        
    },
    watch:{
        nowIdList(){
            this.nowIdList_name = this.nowIdList
            this.getGoodsData(this.nowIdList_name.product_content)
            // console.log(this.nowIdList_name)
        }

    },
    methods:{
        // 搜索方法
         async getGoodsData(){
            let result = await this.API.getSearchData({keywords:this.nowIdList_name.product_content,page:1,pagesize:4});
            // let result = await this.API.getGoodData(cat_id);
            this.goodsList = result;
            // 判断是否有数据 来显示不同的文本
            // console.log(this.goodsList)
            // console.log(this.goodsList.data)
            // console.log(this.goodsList.data[0])
            // console.log(this.goodsList.data[0].goods_thumb)
            this.show = this.goodsList.data.length == 0 ? true : false;
        },
        clickMoreHandler(){
            this.$router.push({path : '/classify_detail', query : {catId : this.nowId}});
        },
    },
    components:{
        BaseGoods
    }
}
</script>

<style scoped lang="less">
 .classify{
    padding : 10px;
    >h1{
        font-size: 18px;
        margin-bottom: 20px;
    }
    .classify-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    >p{
        position: relative;
        text-align: center;
        color: #999;
        line-height: 40px;
    }
    >p::after{
        content: '';
        width:100%;
        position:absolute;
        bottom: 0px;
        left: 0px;
        border-bottom: 1px solid #999;
        transform: scaleY(0.5);
    }
    .no-more{
        width:100%;
        height: 80px;
        line-height: 80px;
        background-color:#000 ;
        opacity: 0.2;
        color: #fff;
        border-radius: 8px;
    }
}
</style>