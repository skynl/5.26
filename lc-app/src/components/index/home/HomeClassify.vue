<template>
  <div class="classify">
    <h1 :cat-id="classifyList.cat_id">{{classifyList.cat_name}}</h1>
    <div class="classify-list">
        <!-- 调用单独商品组件 -->
        <slot><base-goods v-for="item in goodsList" :key="item.goods_id" :goods="item"></base-goods></slot>
    </div>
    <p @click="clickMoreHandler(classifyList.cat_id)" v-show="!show">查看更多</p>
    <p v-show="show" class="no-more">正在上新中,敬请期待哦 亲~❤</p>
  </div>
</template>

<script>
import BaseGoods from '@/components/base/BaseGoods.vue';

export default {
    data(){
        return {
            goodsList:[],
            show : ''
        }
    },
    components: { BaseGoods },
    props : {
        classifyList : Object
    },
    created(){
        this.getGoodsData(this.classifyList.cat_id);
    },
    
    methods:{
        async getGoodsData(cat_id){
            let result = await this.API.getGoodsData({catId:cat_id,page:1,pagesize:4});
            // let result = await this.API.getGoodData(cat_id);
            this.goodsList = result;
            // console.log(this.goodsList);
            // 判断是否有数据来显示不同的文本
            this.show = this.goodsList.length == 0 ? true : false;
            // this.a();
        },
        clickMoreHandler(id){
            this.$router.push({path : '/classify_detail', query : {catId : id}});
        },
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