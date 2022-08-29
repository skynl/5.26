<template>
    <base-banner></base-banner>
    <home-other-classify v-for="(item,index) in nowIdList" :nowId-list="nowIdList[index]" :key="index" :nowId="nowId"></home-other-classify>
</template>

<script>
import BaseBanner from '@/components/base/BaseBanner.vue';
import HomeOtherClassify from './HomeOtherClassify.vue'
  export default {
    props: {
        nowId: String
    },
    data(){
        return {
            classifyList:[],
            nowIdList:[],
        };
    },
    async created() {
        this.DataWatch();
    },
    // 监听nowId 后续用户切换除首页以外的分类触发
    watch: {
        nowId(){
            console.log(this.nowId);
            this.DataWatch();
        }
    },
    components: {
        HomeOtherClassify,
        BaseBanner
    },
    methods: {
        // 请求分类数据
        async DataWatch(){
            // 异步请求数据,获取用户第一次点击分类进来的数据
            this.classifyList = await this.API.getClassifyListData();
            // console.log(this.classifyList);
            this.nowIdListHandler();
        },
        // 获取小分类里数据的某一项分类的具体数据
        nowIdListHandler(){
          this.classifyList.forEach((item)=>{
            if(item.cat_id == this.nowId){
              // slice左闭右开
              this.nowIdList = item.data;
              
              return
            }
          })
        },
    },

}
</script>

<style>

</style>