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
//-------------------- 富文本编辑配置区 --------------------------------------------------//

import jQuery from 'jquery'

import VueFroala from 'vue-froala-wysiwyg'

// Require Froala Editor js file.

require('froala-editor/js/froala_editor.pkgd.min')

// Require Froala Editor css files.

require('froala-editor/css/froala_editor.pkgd.min.css')

require('font-awesome/css/font-awesome.css')

require('froala-editor/js/languages/zh_cn')

require('froala-editor/css/froala_style.min.css')

window.$ = jQuery

Vue.use(VueFroala)

//------------------------------------ 富文本编辑配置区 -----------------------------------//
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
