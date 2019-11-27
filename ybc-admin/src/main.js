// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// axios全局配置
import axios from 'axios'
Vue.prototype.$axios = axios
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
Vue.use(ElementUI);
// 剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
