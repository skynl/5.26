<template>
  <!-- 底部导航 -->
  <van-tabbar route  active-color="rgb(137,207,235)" inactive-color="#999">
    <van-tabbar-item 
        v-for='item in navBottomList'
        :key='item.id'
        :to='item.to'
        :icon='item.icon'
        :name='item.name'
       >
        <span>{{item.name}}</span>
    </van-tabbar-item>
    
  </van-tabbar>
</template>

<script>
    export default {
        data(){
            return {
                // 当前选中的
                nowName : '首页',
                navBottomList:[
                    {id:1,name:'首页',to:'/',icon:'shop-o'
                    },
                    {id:2,name:'分类',to:'/classify',icon:'apps-o'
                    },
                    {id:3,name:'购物车',to:'/cart',icon:'shopping-cart-o'
                    },
                    {id:4,name:'个人',to:'/user',icon:'user-o'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="less">

.van-hairline--top-bottom{
    position:fixed
}

</style>