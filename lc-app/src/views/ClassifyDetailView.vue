<template>
    <div id="classify-detail-view">
        <base-nav-bar title="商品列表"></base-nav-bar>
        <!-- 标题 -->
        <h1 class="title">{{classifyList.title}}</h1>
        <!-- 导航分类 -->
        <van-config-provider :theme-vars="themeVars" v-show="status">
            <van-tabs v-model:active="id" color="rgb(137,207,235)" title-active-color="rgb(137,207,235)" title-inactive-color="#999" border>
                <van-tab v-for="item in classifyList.data" :title="item.product_content" :key="item.id" :name="item.id" />
            </van-tabs>
        </van-config-provider>
        <!-- 筛选 -->
        <div class="select-content">
            <p @click="selectStatus = '1'" :style="{color:selectStatus == '1'?'rgb(137,207,235)' : '#999'}">推荐</p>
            <p @click="clickSelect('2')" :style="{color:selectStatus == '2'?'rgb(137,207,235)' : '#999'}">价格</p>
            <p @click="selectStatus = '3'" :style="{color:selectStatus == '3'?'rgb(137,207,235)' : '#999'}">新品</p>
        </div>
        <!-- 商品列表 -->
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset="20"
        >
            <div class="goods-list">
                <transition-group
                    enter-active-class="gyj-animate__animated animate__fadeIn"
                    leave-active-class="animate__animated animate__fadeOut"
                >
                    <base-goods v-for="item in goodsList" :key="item.goods_id" :goods="item" border="1px solid #F1F1F1" width="48%"></base-goods>
                </transition-group>
            </div>
        </van-list>
    </div>
</template>

<script>



export default {
    data(){
        return {
            // 当前小分类
            classifyList:[],
            nowId:'',
            goodsList:[],
            page : 1,
            pagesize : 6,
            id : '1',
            themeVars : {
                tabLineHeight : '34px'
            },
            selectStatus : '1',
            isSort : true,
            loading:false,
            finished:false,
            status:true,
        }
    },
    async created(){
        // 获取当前分类ID
        this.nowId = this.$route.query.catId;
        // 获取当前分类下的商品列表
        this.goodsList = await this.API.getGoodsData({page : this.page,pagesize : this.pagesize,catId : this.nowId})
        console.log(this.goodsList);
        // 获取当前分类中的小分类
        this.getClassifyHandler();
        
    },
    methods:{
        // 请求小分类方法
        async getClassifyHandler(){
            let res = await this.API.getClassifyListData();
            res.forEach((item) => {
                if(item.cat_id == this.nowId){
                    this.classifyList = item;
                    return;
                }
            });
            console.log(this.classifyList);
            // 判断classifyList是否有值，没有则隐藏
            this.yc();
        },
        // 点击筛选按钮
        clickSelect(val){
            this.selectStatus = val;
            this.isSort = !this.isSort;
            this.goodsList.sort((a,b) => this.isSort ? a.price - b.price : b.price - a.price)
        },
        // 加载事件
        async onLoad(){
            console.log('onload')
            this.page++;
            let res = await this.API.getGoodsData({
                page:this.page,
                pagesize:this.pagesize,
                catId:this.nowId,
            })
            if(res.length == 0){
                this.finished = true;
                return;
            }
            this.goodsList.push(...res);
            this.loading = false;
        },
        yc(){
            if(this.classifyList.length == 0){
                this.status = false;
            }else{
                this.status == true;
            }
        }
    },
}

</script>

<style lang="less" scoped>
    .v-move{transition: .4s;}
    #classify-detail-view{
        >.title{
            text-align: center;
            font-size: 16px;
            color:#666;
            line-height: 50px;
        }
        >.select-content{
			display: flex;
			justify-content: space-around;
			height: 34px;
			border-bottom: 1px solid #F8F9FA;
			padding-top:10px;
			p{
				line-height: 34px;
				font-size: 14px;
				color: #666;
			}
		}
        .goods-list{
            padding:10px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
    }
</style>