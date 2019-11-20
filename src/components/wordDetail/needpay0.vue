<template>
  <div class="needpay0">
    <div v-html="word.content" ></div>
    <div v-if="word.content == null && word.needpay != 2 && word.needpay != 3 && word.needpay != 4">
      <img src="../../../static/img/sholist.svg" v-for="(item,index) in 8" :key="index">
    </div>
  </div>
</template>

<script>
export default {
  props: ["word"]
};
</script>

<style scoped>
.needpay0{
    font-size: 24px;
    padding: 0 30px;
    color: #333;
}
.needpay0 >>> img {
  width: 100% !important;
}
</style>