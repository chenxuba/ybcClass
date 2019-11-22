<template>
  <div class="swiper">
    <van-swipe :autoplay="3000" indicator-color="white" style="height: 120px;">
      <van-swipe-item v-for="(item,index) in swiper" :key="index">
          <img v-lazy="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
    props: ["swiper"]
};
</script>

<style scoped>
.swiper{
    margin:20px 0;
    padding: 0 30px;
    border-radius: 20px;
}
.swiper img{
    width: 100%;
    height: 100%;
    border-radius: 20px;
}
</style>