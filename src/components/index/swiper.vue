<template>
  <div class="swiper">
    <van-row class="swiper_warp" v-if="swiper.carousel">
      <van-col span="24" class="swiper_col">
        <van-swipe :autoplay="3000" indicator-color="white" style="height: 160px;">
          <van-swipe-item v-for="(item,index) in swiper.carousel" :key="index">
            <a :href="item.url">
            <img v-lazy="item.img" alt />
            </a>
          </van-swipe-item>
        </van-swipe>
      </van-col>
    </van-row>
    <img src="../../../static/img/sholist.svg" v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // baseUrl:"https://yibaikang001.oss-cn-shanghai.aliyuncs.com/"
    };
  },

  computed: {
    ...mapState(["swiper"])
  }
};
</script>

<style scoped>
.swiper {
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
}
</style>