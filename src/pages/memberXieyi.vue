<template>
  <div v-height class="box">
    <div class="txt">
      <p>1、成为VIP学员，可免费观看“学员免费”课程。</p>
      <p>2、成为VIP学员，可成为推广者，分享付费课程或文章链接，成单后赚取推广提成。</p>
    </div>
    <div class="btn">
      <van-button type="primary" size="large" color="#5dd6c7" @click="$router.go(-1)">返回</van-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {},
    onClickRight() {}
  }
};
</script>

<style scoped>

.txt {
  margin-top: 40px;
  font-size: 25px;
  padding: 0 20px;
  color: #333;
}
.txt p {
  line-height: 36px;
}
.btn{
    padding: 0 30%;
    margin-top: 40px;
}
.van-button--primary{
    height: 60px;
    line-height: 50px;
    font-size: 26px;
    border-radius: 10px;
}
</style>