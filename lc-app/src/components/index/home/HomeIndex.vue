<template>
    <div>
        <!-- 调用轮播图 -->
        <base-banner></base-banner>
        <!-- 一日闪购 -->
        <home-sale></home-sale>
        <!-- 静态广告 -->
        <home-banner :home-banner-list="HomeBannerList"></home-banner>
        <!-- 调用分类组件 -->
        <home-classify v-for="(item,index) in classifyList" :classify-list="classifyList[index]" :key="index"></home-classify>
    </div>
</template>

<script>
import BaseBanner from '../../base/BaseBanner.vue'
import HomeBanner from './HomeBanner.vue'
import HomeSale from './HomeSale.vue'
import HomeClassify from './HomeClassify.vue'
export default {
    data(){
        return {
            HomeBannerList : [
                [
                    {goods_id : '1',url : require('../../../assets/img/banner01.gif')},
                    {goods_id : '2',url : require('../../../assets/img/banner02.jpg')},
                ],
                [
                    {goods_id : '3',url : require('../../../assets/img/banner03.jpg')},
                    {goods_id : '4',url : require('../../../assets/img/banner04.jpg')},
                ]
            ],
            // 分类数据
            classifyList:[],
            classifyList_name:[],
        }
    },
  
   components : {
    BaseBanner,
    HomeBanner,
    HomeSale,
    HomeClassify,
   },
   created(){   
    this.getClassifyData();
   },
   methods:{
    // 获取所有分类数据
    async getClassifyData(){
        let result = await this.API.getCatData()
        this.classifyList_name = result;
        this.classifyList_name.forEach(res =>{
            this.classifyList.push({cat_id:res.cat_id,cat_name:res.cat_name})
        })
        console.log(this.classifyList);
        
    },
   }
}
</script>

<style>

</style>