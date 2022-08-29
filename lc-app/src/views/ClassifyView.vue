<template>
  <div id="classify-view">
        <div class="classify-left">
            <p :class="{'active' : nowId == item.cat_id}" @click="clickCatHandler(item.cat_id)" v-for="item in catList" :key="item">{{item.cat_name}}</p>
        </div>
        <div class="classify-right">
          <div><img :src="nowIdList.title_img" alt=""/></div>
          <h1>• {{nowIdList.title}} •</h1>
          <ul>
            <li v-for="item in nowIdList.data" :key="item" @click="clickClassifyHandler(nowIdList.cat_id)">
              <img :src="item.product_img" alt="">
              <span>{{item.product_content}}</span>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
      return {
          catList:[],
          nowId:'0045',
          classifyList:[],
          nowIdList:[]
      }
    },
    async created(){
      // 请求数据
        this.catList = await this.API.getCatData();
        this.classifyList = await this.API.getClassifyListData();
        // 创建时调用方法，默认拿第一个数据
        this.nowIdListHandler();
        // this.Qs.stringify({title:'家具',data:[]})
    },
    methods:{
      // 获取小分类里数据的某一项分类的具体数据
        nowIdListHandler(){
          this.classifyList.forEach((item,index)=>{
            if(item.cat_id == this.nowId){
              // slice左闭右开
              this.nowIdList = this.classifyList.slice(index , index + 1)[0];
              console.log(this.nowIdList) 
              return
            }
          })
        },
        clickCatHandler(id){
          this.nowId = id;
          this.nowIdListHandler();
        },
        clickClassifyHandler(id){
          this.$router.push({path:'/classify_detail',query:{catId:id}});
        },
    },
}
</script>

<style lang="less" scoped>
#classify-view{
  display: flex;
  >div{overflow-y:auto;}
  .classify-left{
    flex:6.5;
    background: #DADADA;
    p{
      color:#666;
      height:55px;
      text-align: center;
      line-height:55px;
    }
    .active{color: #333;font-weight: bold;}
  }
  .classify-right{
    flex:17.5;
    background:#ededed;
    >div{
      padding:14px;
      box-sizing: border-box;
      img{
        width: 100%;
      }
     
    }
    >h1{
      font-size: 16px;
      color: #666;
      text-align: center;
      line-height: 50px;
      font-weight: normal;
    }
    ul{
      padding: 14px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      li{
        width: 33.3%;
        text-align: center;
        font-size: 14px;
        color: #333;
        margin-bottom: 20px;
        img{
          width:100%;
        }
      }
    }
  }
}
  
</style>