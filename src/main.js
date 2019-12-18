// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false
// 引入vant
import vant from './vant/index'
Vue.use(vant)
// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'
Vue.use(element)
//返回顶部插件
import vueToTop from 'vue-totop'
Vue.use(vueToTop)
//改变页面的title插件
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
// axios全局配置
import axios from 'axios'
Vue.prototype.$axios = axios
//全局组件返回首页
import goHome from "./assets/js/goHome";
Vue.use(goHome)
//全局组件后退一步
import goBack from "./assets/js/goBack";
Vue.use(goBack)
//全局组件滚动区域
import Scroll from "./assets/js/Scroll";
Vue.use(Scroll)
// 全局
import canvasPoster from 'vue-canvas-poster-yufan'
Vue.use(canvasPoster)
// 自定义指令 可视高度
Vue.directive('height', {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function (el) { //被绑定
    el.style = `height:${document.documentElement.clientHeight}px;`
  },
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
