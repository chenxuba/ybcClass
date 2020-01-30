<template>
  <div id="app">
    <transition :name="$store.state.transitionName">
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </transition>
    <!--底部导航开始-->
    <tabBar v-show="$route.meta.showFooter"></tabBar>
  </div>
</template>

<script>
import tabBar from "../src/components/tabBar/tabBar";
import { isWx } from "./util";
import { getCode } from "./api/user";
export default {
  name: "App",
  //无感刷新当前页面
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {};
  },
  methods: {},
  components: {
    tabBar
  },
  watch: {
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // this.transitionName = "slide-left";
      this.$store.commit("setTransitionName", "slide-left");
    }
  }
};
document.addEventListener("DOMContentLoaded", setFontSize);
window.addEventListener("resize", setFontSize);
function setFontSize() {
  const html = document.querySelector("html");
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 75 ? 75 : fontSize;
  html.style.fontSize = fontSize + "px";
}
</script>

<style>
#app {
  background-color: #fff;
}
.van-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

.xgplayer-controls {
  bottom: 80px;
}
.xgplayer-poster {
  background-repeat: no-repeat !important;
  background-size: 100% 100%;
}
/* 设置播放按钮为最高层级 */
.xgplayer-start {
  z-index: 1999;
}
/* 控制视频播放页面底部菜单是否显示，0为显示 ，可选值为1101*/
.xgplayer-poster {
  z-index: 0;
}
.aplayer-music {
  display: none;
}

.slide-right-enter-active,
.slide-left-enter-active {
  will-change: transform;
  transition: all 500ms;
}
.slide-left-leave-active,
.slide-right-leave-active {
  will-change: transform;
  transition: all 1ms;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
/* 改变loading 图标颜色 */
.el-loading-spinner i{
  /* color: #eee !important; */
}
/* 改变loading 字体颜色 */
.el-loading-text {
  /* color: #eee !important; */
}
</style>
