import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
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
    {
      path: "/login",
      name: "login",
      component: () =>
        import('../pages/login.vue'),
    },
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.isLogin ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})


export default router;
