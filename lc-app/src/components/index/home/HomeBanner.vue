<template>
  <div class="home-banner">
    <div v-for="item in homeBannerList" :key="item">
        <img v-for="items in item" :src="items.url" :key="items.goods_id">
    </div>
  </div>
   <div class="home-banner">
    <div v-for="item in homeBannerList" :key="item">
        <img v-for="items in item" :src="items.url" :key="items.goods_id">
    </div>
  </div>
</template>

<script>
export default {
    props:{
        homeBannerList : Array
    }
}
</script>

<style scoped lang="less">
  .home-banner{
    padding:10px 10px 0px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    div{
      width:48%;
      img{
        width: 100%;
        border-radius: 8px;
        padding:4px 0px;
      }
    }
  }
</style>
