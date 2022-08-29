<template>
	<div id="home">
		<!-- 吸顶 -->
		<van-sticky>
			<!-- 放搜索框 -->
			<van-search 
				placeholder="搜索商品-品牌"
				label="良品"
				shape="round"
				background="rgb(137,207,235)"
				clear-icon="cross"
				disabled
				@click='clickSearhHandler'
			></van-search>
			<!-- 在标签指定 name 属性的情况下，v-model:active 的值为当前标签的 name -->
			<van-tabs 
			v-model:active="nowId"
			@click-tab="clickTabHandler"
			>
				<!-- 遍历数据 -->
				<van-tab 
				v-for='item in cartList' 
				:key="item.cat_id"  
				:title="item.cat_name"
				:name="item.cat_id"
				color="#333"
				>
				</van-tab>
			</van-tabs>
		</van-sticky>
		<!-- 渲染不同分类的内容 -->
		<!-- <home-index></home-index>
		<home-other></home-other> -->
		<!-- 使用动态内置组件component加一个is属性 -->
		
		<!-- <keep-alive> -->
		<component :now-id="nowId" :is="nowId == '0000' ? 'homeIndex' : 'homeOther'"></component>
		<!-- </keep-alive> -->
		
		
	</div>
</template>

<script>
// 引入组件
import HomeIndex from '../components/index/home/HomeIndex.vue'
import HomeOther from '../components/index/other/HomeOther.vue'

export default {
  name: 'HomeView',
  data(){
    return {
      nowId:'0000',
      cartList : []
    }
  },
  created(){
	// 调用请求方法
	let result = this.API.getCatData()
	result.then(res =>{
		res.unshift({cat_id:"0000",cat_name:"首页"});
		this.cartList = res;
		console.log(this.cartList);
	})
	console.log(result);
	
  },
  
  methods:{
    // 点击搜索框方法
    clickSearhHandler(){
      // 跳转到搜索页面
      this.$router.push('/search');
    },
    // 点击分类导航
    clickTabHandler(val){
      console.log(val);
    },
  },
  // 组件注册
  components: {
	HomeIndex,
	HomeOther,
  },
}
</script>
<style>
  
</style>
