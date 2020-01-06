<template>
  <div id="app">
      <router-view v-wechat-title="$route.meta.title" class="router"></router-view>
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
    return {
      is_follow: "",
    };
  },
  methods: {},
  components: {
    tabBar
  },
  mounted() {
    if (isWx()) {
      getCode();
    }
  },
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
</style>
