<template>
  <div class="download">
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" v-for="(item,index) in 20" :key="index">新版app正在开发当中,导师如果需要直播,请暂时使用老版App，谢谢！</van-notice-bar>
    <goBack></goBack>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>