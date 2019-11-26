import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: "/",
      redirect: "/index"
    }, //重定向
    {
      path: "/index",
      name: "index",
      component: () =>
        import('../pages/index.vue'),
      
    },
    

  ]
})


// 添加路由守卫



export default router;
