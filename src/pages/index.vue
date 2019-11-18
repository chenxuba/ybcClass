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
import { mapState, mapActions } from "vuex";
export default {
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
    ...mapActions(["getHomePageData"])
  },
  mounted() {
    this.getHomePageData();
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
</style>