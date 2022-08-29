<template>
    <van-swipe 
    class="my-swipe" 
    indicator-color="white"
    :height="swipeHeight"
    autoplay="3000"
    >
        <van-swipe-item v-for="item in bannerList" :key="item.goods_id" @click="clickSwipeHandler(item.goods_id)">
            <van-image  radius="8"  :src="item.goods_thumb"/>
        </van-swipe-item>
    </van-swipe>
   
</template>

<script>

export default {
    data(){
        return {
            bannerList:[],
            imgWH : 475/1000,
        }
    },
    async created(){
        // 调用轮播数据
        this.bannerList = await this.API.getBannerData();
    },
    methods:{
        // 获取轮播图数据
        // getBannerData(){
        //     this.axios.get('/api_banner',{
        //         params:{bannerId:1}
        //     }).then(res => {
        //         // console.log(res);
        //         if(res.data.code !=0){
        //             console.log(res);
        //             return;
        //         }
        //         this.bannerList = res.data.data;
        //         // console.log(this.bannerList);
        //     })
        // },
        // 点击轮播图
        clickSwipeHandler(goodsId){
            console.log(goodsId);
        }
    },
    computed : {
        swipeHeight(){
            return (window.innerWidth - 20) * this.imgWH;
        }
    }
}
</script>

<style lang="less" scoped>
    .my-swipe{
        margin-top: 5px;
        .van-swipe-item{
            padding: 0px 10px;
            box-sizing: border-box;
            
           
        }
    }
</style>