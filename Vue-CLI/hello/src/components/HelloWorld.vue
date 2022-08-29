<template>
  <h1>我是hello的组件</h1>
  <button @click="clickHandler">按钮</button>
</template>

<script>
export default {
  // 每个组件加了name属性 取个名字
  name: 'HelloWorld',
  // props: {
  //   msg: String
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
