<template>
  <div class="course_buy_detail">
    <!-- 头部分类 -->
    <van-tabs
      v-model="active"
      color="#5dd6c7"
      title-active-color="#5dd6c7"
      animated
      swipeable
      sticky
      lazy-render
      line-width="30px"
    >
      <van-tab title="课时">
        <course-buy01 :audio_res="audio_res" :live_res="live_res" :video_res="video_res"></course-buy01>
      </van-tab>
      <van-tab title="课程">
        <course-buy02 :classs="classs"></course-buy02>
      </van-tab>
      <van-tab title="打卡学堂">
        <course-buy03></course-buy03>
      </van-tab>
      <van-tab title="软文">
        <course-buy04 :article_res="article_res"></course-buy04>
      </van-tab>
    </van-tabs>
    <!-- 返回按钮 -->
    <goBack></goBack>
  </div>
</template>

<script>

import course_buy01 from "../components/course_buy_detail/course_buy01";
import course_buy02 from "../components/course_buy_detail/course_buy02";
import course_buy03 from "../components/course_buy_detail/course_buy03";
import course_buy04 from "../components/course_buy_detail/course_buy04";
import { reqBuyFood } from "../api";
export default {
  data() {
    return {
      active: 0,
      classs:[],
      audio_res:[],
      live_res:[],
      video_res:[],
      article_res:[]
    };
  },
  components: {
    "course-buy01": course_buy01,
    "course-buy02": course_buy02,
    "course-buy03": course_buy03,
    "course-buy04": course_buy04
  },
  methods: {
   async getBuyFood(){
     const result = await reqBuyFood();
    //  console.log(result);
     this.classs = result.data.class; //课程
      this.audio_res = result.data.audio_res
      this.live_res = result.data.live_res
      this.video_res = result.data.video_res
      this.article_res = result.data.article_res
    }
  },
  mounted () {
    this.getBuyFood();
  }
};
</script>

<style scoped>
.course_buy_detail {
  width: 100%;
  height: 100%;
}


</style>