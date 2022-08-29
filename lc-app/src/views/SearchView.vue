<template>
  <!-- 放搜索框 -->
    <van-config-provider :theme-vars="searchVars">
        <van-search 
        v-model='searchValue'
        placeholder="搜索商品-品牌"
        label="良品"
        shape="round"
        clear-icon='cross'
        show-action
        @search="clickSearchHandler"
        >
            <!-- 左边返回箭头 -->
            <template v-slot:left >
                <span  @click="clickLeftHandler" class="gyj-arrow-left">
                    <van-icon color="#666" name="arrow-left" size="20px"></van-icon>
                </span>
            </template>
            <!-- 右边搜索图标 -->
            <template v-slot:action >
                <span @click="clickSearchHandler">搜索</span>
            </template>
        </van-search>
    </van-config-provider>
    <!-- 通知栏 -->
    <van-notice-bar left-icon="volume-o" :scrollable="false" background="#ecf9ff" color="#1989fa">
        <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
        >
            <van-swipe-item>RTX3090ti，仅需998元带回家！</van-swipe-item>
            <van-swipe-item>RTX3080ti，仅需99.8元带回家！</van-swipe-item>
            <van-swipe-item>RTX3070ti，仅需9.98元带回家！</van-swipe-item>
        </van-swipe>
    </van-notice-bar>
    <!-- 大家搜 -->
    <h5 class="DJS">
        大家都在搜
    </h5>
    <div class="DJS-bt">
        <a href="#">
            <div>
                <div>显卡</div>
            </div>
        </a>
         <a href="#">
            <div>
                <div>机箱</div>
            </div>
        </a>
         <a href="#">
            <div>
                <div>电脑电源</div>
            </div>
        </a>
         <a href="#">
            <div>
                <div>散热</div>
            </div>
        </a>
         <a href="#">
            <div>
                <div>主板</div>
            </div>
        </a>
         <a href="#">
            <div>
                <div>CPU</div>
            </div>
        </a>
         <a href="#">
            <div>
                <div>运动鞋</div>
            </div>
        </a>
        <a href="#">
            <div>
                <div>水杯</div>
            </div>
        </a>
        <a href="#">
            <div>
                <div>茶具</div>
            </div>
        </a>
        <a href="#">
            <div>
                <div>置物架</div>
            </div>
        </a>
    </div>
    <h3 class="search-box">
        <base-goods v-for="item in goodsList" :key="item.goods_id" :goods="item"></base-goods>
    </h3>
</template>

<script>
import BaseGoods from '@/components/base/BaseGoods.vue'
export default {
    data(){
        return {
            searchValue:'',
            // 当前搜索框局部样式
            searchVars : {
                searchActionTextColor : "#666",
                searchLabelColor:"#666"
            },
            goodsList:[],
        }
    },
   
    methods : {
        // clickRightHandler(){
        //     console.log('clickRightHandler')
        //     // 获取关键字，发起请求
        // },
        clickLeftHandler(){
            // console.log(this.$router)
            // 返回路由上一级
            this.$router.back()
        },
        async clickSearchHandler(){
            let res = await this.API.getSearchData({keywords : this.searchValue})
            this.goodsList = res.data
        }
    },
    components:{
        BaseGoods
    }
}
</script>

<style lang="less">
    .gyj-arrow-left{
        padding-right:6px;
    }
    .DJS{
        margin-top:20px;
        margin-left: 20px;
        font-weight: normal;
        font-size:16px;
        color:#333;
    }
    .DJS-bt{
        display: flex;
        flex-wrap: wrap;
        margin-top: 4px;
        a{
            color: black;
            div{
                margin-left: 5px;
                color: #999999;
                // font-size: 24px;
                background-color: #ffffff;
                margin-top: 8px;
                div{
                    padding: 7px 12px 6px 12px;
                }
            }
        }
    }
    .CNXH{
        font-weight: normal;
        color:#333;
        margin-left: 20px;
        margin-top: 20px;
    }
    // 通知栏样式
    .notice-swipe{
        height: 40px;
        line-height: 40px;
    }
    .search-box{
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;  
        .goods-item{
            
            
            width: 48.5%;
            
        }
         
    }
</style>