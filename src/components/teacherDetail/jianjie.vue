<template>
  <div class="jianjie">
    <h1>简介</h1>
    <van-skeleton  :row="6" :loading="Ploading">
      <div class="jianjie-info" v-html="jianjie"></div>
    </van-skeleton>
  </div>
</template>

<script>
export default {
  props: ["jianjie"],
  data() {
    return {
      Ploading: true
    };
  },
};
</script>

<style scoped>
.jianjie {
  padding: 0 30px 60px 30px;
  box-sizing: border-box;
  background-color: #fff;
}
h1 {
  font-size: 30px;
  color: #333;
}
.jianjie-info {
  font-size: 26px;
  color: #333;
  line-height: 46px;
  background: #fff;
  padding-bottom: 20px;
}

</style>