<template>
  <div class="sale">
    <h1>一日闪购</h1>
    <p>新品抢先购七折起</p>
    <ul class="sale-list">
        <li v-for="item in saleList" :key="item.goods_id" @click="clickHandler(item.goods_id)">
            <img :src="item.goods_thumb">
            <template v-if="item.price">
                <p class="van-ellipsis">{{item.goods_name}}</p>
                <p>
                    <span>¥{{parseInt(item.price * 0.7)}}</span>
                    <span>¥{{item.price}}</span>
                </p>
            </template>
           
        </li>
    </ul>
  </div>

</template>

<script>
export default {
    // 数据因为不与其他组件交互，直接内置于此
    data(){
        return {
            saleList : []
        }
    },
    created(){
        this.getSaleData();
    },
    methods:{
        // 获取一日特价商品
         getSaleData(){
            // let res = await this.API.getGoodData();
            // this.saleList = res;
            // console.log(res)
            // if(res.data.code!=0){
            //     console.log(res);
            //     return;
            // }
            // res.data.data.push({
            //     goods_name:'',
            //     price:'',
            //     goods_id:'more',
            //     goods_thumb:require('../../../assets/img/more.png')
            // })
            this.axios.get('/api_goods',{params:{page:56,pagesize:5}}).then((res) => {
                if(res.data.code!=0){
                    console.log(res);
                    return;
                }
                res.data.data.push({
                    goods_name:'',
                    price:'',
                    goods_id:'more',
                    goods_thumb:require('../../../assets/img/more.png')
                })
                this.saleList = res.data.data;
                // console.log(this.saleList);
            })
        },
        // 点击商品
        clickHandler(id){
            // console.log(id);
            let path = id == 'more' ? '/classify_detail' : {path:'/product',query:{goodsId:id}}
            this.$router.push(path)
        }
    }
}
</script>

<style lang="less" scoped>
    .sale{
        padding: 10px;
        box-sizing: border-box;

        &>h1{
            font-size: 22px;
            margin-bottom: 10px;
        }
        &>p{
            font-size: 14px;
            color:#999;
        }
        .sale-list::-webkit-scrollbar{
            width:0px;
            height: 0px;
        }
        .sale-list{
            width: 100%;
            overflow-x: auto;
            white-space: nowrap;
            li:last-child{
                vertical-align:top;
            }
            li{
                width:39%;
                margin-right: 6px;
                display: inline-block;
                
                img{
                    width:100%;
                    border-radius: 8px;
                }
                p:first-of-type{
                    font-size: 14px;
                    line-height: 26px;
                    box-sizing: border-box;
                    padding: 0px 8px;
                }
                p:nth-of-type(2){
                    vertical-align: bottom;
                    span:first-child{
                        color:skyblue;
                        font-size: 18px;
                        padding: 0px 8px;
                    }
                    span:last-child{
                        color:#333;
                        font-size: 14px;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
</style>