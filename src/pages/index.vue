<template>
  <div class="index">
    <!-- 搜索模块 -->
    <Search></Search>
    <!-- 轮播图模块 -->
    <Swiper></Swiper>
    <!-- 通告栏 -->
    <div class="NoticeBar" v-if="NoticeBar.notice">
      <van-notice-bar :text="NoticeBar.notice" left-icon="volume-o" />
    </div>
    <img src="../../static/img/sholist.svg" v-else />
    <!-- 三大分类模块 -->
    <Menu3></Menu3>
    <!-- 四大分类模块 -->
    <Menu4></Menu4>
    <!-- 热门、精品课程模块 -->
    <HotCourse></HotCourse>
    <!-- 热门、精品课程模块2 -->
    <HotCourse2></HotCourse2>
    <!-- 软文模块 -->
    <Word></Word>
    <div class="hongbao animated tada infinite">
      <img src="../../static/img/hongbao.png" alt />
    </div>
    <van-popup v-model="showToast" >
      <img src="../../static/img/shouci.png" alt="" class="shouci">
      <h4 class="h4" @click="dianjiguanzhu">立即关注</h4>
    </van-popup>
    <van-popup v-model="erweima" >
      <img src="../../static/img/ybcerweima.png" alt="" class="erweima">
      <h4 class="h42" @click="dianjiguanzhu">长按识别关注</h4>
    </van-popup>
  </div>
</template>

<script>
import Search from "../components/index/search";
import Swiper from "../components/index/swiper";
import Menu3 from "../components/index/menu3";
import Menu4 from "../components/index/menu4";
import HotCourse from "../components/index/hotCourse";
import HotCourse2 from "../components/index/hotCourse2";
import Word from "../components/index/word";
import { reqisGuanzhuWx } from "../api";
import { isWx } from "../util";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      showToast: false,
      erweima:false
    };
  },
  components: {
    Search,
    Swiper,
    Menu3,
    Menu4,
    HotCourse,
    HotCourse2,
    Word
  },
  computed: {
    ...mapState(["NoticeBar"])
  },
  methods: {
    ...mapActions(["getHomePageData"]),
    // 判断用户是否关注了医佰康公众号
    async isGuanZhuWx() {
      const result = await reqisGuanzhuWx("");
      console.log(result);
      if (result.code == 1) {
        this.is_follow = result.data.is_follow;
        if (this.is_follow == 1) {
          console.log("该用户关注了公众号");
        } else {
          this.showToast = true;
        }
      }
    },
    dianjiguanzhu(){
      this.erweima = true
      this.showToast = false
    }
  },
  mounted() {
    this.getHomePageData();
    if (isWx()) {
      this.isGuanZhuWx();
    }
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: calc(100% - 200px);
}

.line {
  height: 100px;
}
.NoticeBar {
  margin-top: 20px;
  height: 80px;
}
.v-top {
  transform: translateZ(0);
}
.hongbao {
  position: fixed;
  bottom: 400px;
  right: -30px;
}
.hongbao img {
  width: 80px;
  height: 100px;
  transform: rotate(-40deg);
}
.hongbao {
  position: fixed;
  bottom: 400px;
  right: -30px;
}
.hongbao img {
  width: 80px;
  height: 100px;
  transform: rotate(-40deg);
}
.shouci{
  width: 100%;
  height: 100%;
}
.van-popup{
  background: transparent;
  width: 100%;
  text-align: center;
}

.h4{
  color: #fff;
  font-size: 34px;
  position: absolute;
  bottom: 40px;
  left: 43%;
  font-family: 'Courier New', Courier, monospace;
}
.h42{
  color: #fff;
  font-size: 38px;
  margin-top: 20px;
}
.erweima{
  width: 40%;
  padding-top: 30px;
}
</style>