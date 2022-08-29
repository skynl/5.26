<template>
    <div class="goods-item" @click="clickProductHandler(goods.goods_id)" >
        <img :src="goods.goods_thumb" alt="">
        <p class="van-multi-ellipsis--l2">{{goods.goods_name}}</p>
        <p class="van-multi-ellipsis--l2">{{goods.goods_desc}}</p>
        <p>¥{{goods.price}}</p>
    </div>
</template>

<script>
export default {
    name:'baseGoods' ,
    props:{
        goods:Object
    },
    methods:{
        clickProductHandler(id){
            this.$router.push({path : '/product', query : {goodsId : id}});
        }
    } 
}


</script>

<style scoped lang="less">
    .goods-item{
        width: 49%;
        padding-bottom: 30px;
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 10px;

        img{
            width:100%;
            border-radius: 8px;
        }
        p{
            padding: 0px 2px;
            font-size: 12px;
            line-height: 20px;
        }
        p:nth-of-type(2){
            color:#999;
        }
         p:nth-of-type(3){
            color:rgb(126, 198, 226);
            font-size: 16px;
        }
    }
</style>