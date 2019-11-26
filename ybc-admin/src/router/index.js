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
      children: [{
          path: '',
          component: () => import('../pages/home.vue')
        },
        { path: '/home', name: 'home', component: () => import('../pages/home.vue') }, 
        { path: '/base', name: 'base', component: () => import('../pages/base.vue') },
        { path: '/liveRoomSet', name: 'liveRoomSet', component: () => import('../pages/liveRoomSet.vue')},
        { path: '/classHour', name: 'classHour', component: () => import('../pages/classHour.vue')},
        { path: '/course', name: 'course', component: () => import('../pages/course.vue')},
        { path: '/word', name: 'word', component: () => import('../pages/word.vue')},
        { path: '/payQa', name: 'payQa', component: () => import('../pages/payQa.vue')},
        { path: '/dakaSchool', name: 'dakaSchool', component: () => import('../pages/dakaSchool.vue')},
        { path: '/test', name: 'test', component: () => import('../pages/test.vue')},
        { path: '/price', name: 'price', component: () => import('../pages/price.vue')},
        { path: '/order', name: 'order', component: () => import('../pages/order.vue')},
        { path: '/fail', name: 'fail', component: () => import('../pages/fail.vue')},
        
      ]
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
