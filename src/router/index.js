import Vue from 'vue'
import Router from 'vue-router'
import {
  isWx
} from "../util";
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
      meta: {
        showFooter: true,
        title: "医佰康云课堂"
      }
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import('../pages/login.vue'),
      meta: {
        showFooter: false,
        title: "登录"
      }
    },
    {
      path: "/login2",
      name: "login2",
      component: () =>
        import('../pages/login2.vue'),
      meta: {
        showFooter: false,
        title: "登录"
      }
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import('../pages/register.vue'),
      meta: {
        showFooter: false,
        title: "注册"
      }
    },
    {
      path: "/my",
      name: "my",
      component: () =>
        import('../pages/my.vue'),
      meta: {
        showFooter: true,
        title: "我的"
      }
    },
    {
      path: "/myFans",
      name: "myFans",
      component: () =>
        import('../pages/myFans.vue'),
      meta: {
        showFooter: false,
        title: "我的人气"
      }
    },
    {
      path: "/inquire",
      name: "inquire",
      component: () =>
        import('../pages/inquire.vue'),
      meta: {
        showFooter: true,
        title: "问答专区"
      }
    },
    {
      path: "/openMaster",
      name: "openMaster",
      component: () =>
        import('../pages/openMaster.vue'),
      meta: {
        showFooter: false,
        title: "开通答主"
      }
    },
    {
      path: "/openqa",
      name: "openqa",
      component: () =>
        import('../pages/openqa.vue'),
      meta: {
        showFooter: false,
        title: "开通答主"
      }
    },
    {
      path: "/ask/:id",
      name: "ask",
      component: () =>
        import('../pages/ask.vue'),
      meta: {
        showFooter: false,
        title: "提问"
      }
    },
    {
      path: "/pay/:id",
      name: "pay",
      component: () =>
        import('../pages/pay.vue'),
      meta: {
        showFooter: false,
        title: "收银台"
      }
    },
    {
      path: "/payOver",
      name: "payOver",
      component: () =>
        import('../pages/payOver.vue'),
      meta: {
        showFooter: false,
        title: "支付成功"
      }
    },
    {
      path: "/userinfo",
      name: "userinfo",
      component: () =>
        import('../pages/userinfo.vue'),
      meta: {
        showFooter: false,
        title: "个人中心"
      }
    },
    {
      path: "/course_buy_detail",
      name: "course_buy_detail",
      component: () =>
        import('../pages/course_buy_detail.vue'),
      meta: {
        showFooter: false,
        title: "购买记录"
      }
    },
    {
      path: "/mycollection",
      name: "mycollection",
      component: () =>
        import('../pages/mycollection.vue'),
      meta: {
        showFooter: false,
        title: "购买记录"
      }
    },
    {
      path: "/classDetail/:id",
      name: "classDetail",
      component: () =>
        import('../pages/classDetail.vue'),
      meta: {
        showFooter: false,
        title: "课时详情"
      }
    },
    {
      path: "/courseDetail/:id",
      name: "courseDetail",
      component: () =>
        import('../pages/courseDetail.vue'),
      meta: {
        showFooter: false,
        title: "课程详情"
      }
    },
    {
      path: "/query0",
      name: "query0",
      component: () =>
        import('../pages/query0.vue'),
      meta: {
        showFooter: false,
        title: "机构列表"

      }
    },
    {
      path: "/query1",
      name: "query1",
      component: () =>
        import('../pages/query1.vue'),
      meta: {
        showFooter: false,
        title: "在线测评"

      }
    },
    {
      path: "/query2",
      name: "query2",
      component: () =>
        import('../pages/query2.vue'),
      meta: {
        showFooter: false,
        title: "认证查询"

      }
    },
    {
      path: "/faxian",
      name: "faxian",
      component: () =>
        import('../pages/faxian.vue'),
      meta: {
        showFooter: false,
        title: "社区待开发"

      }
    },
    {
      path: "/follow",
      name: "follow",
      component: () =>
        import('../pages/follow.vue'),
      meta: {
        showFooter: false,
        title: "我的关注"

      }
    },
    {
      path: "/openStudent",
      name: "openStudent",
      component: () =>
        import('../pages/openStudent.vue'),
      meta: {
        showFooter: false,
        title: "我的关注"

      }
    },
    {
      path: "/teacherUserinfo",
      name: "teacherUserinfo",
      component: () =>
        import('../pages/teacherUserinfo.vue'),
      meta: {
        showFooter: false,
        title: "导师个人中心"
      }
    },
    {
      path: "/teacherMsg",
      name: "teacherMsg",
      component: () =>
        import('../pages/teacherMsg.vue'),
      meta: {
        showFooter: false,
        title: "导师个人信息"
      }
    },
    {
      path: "/myMoney",
      name: "myMoney",
      component: () =>
        import('../pages/myMoney.vue'),
      meta: {
        showFooter: false,
        title: "我的零钱"
      }
    },
    {
      path: "/myProfit",
      name: "myProfit",
      component: () =>
        import('../pages/myProfit.vue'),
      meta: {
        showFooter: false,
        title: "我的收益"
      }
    },
    {
      path: "/mySpend",
      name: "mySpend",
      component: () =>
        import('../pages/mySpend.vue'),
      meta: {
        showFooter: false,
        title: "我的花费"
      }
    },
    {
      path: "/recharge",
      name: "recharge",
      component: () =>
        import('../pages/recharge.vue'),
      meta: {
        showFooter: false,
        title: "零钱充值"
      }
    },
    {
      path: "/myQa",
      name: "myQa",
      component: () =>
        import('../pages/myQa.vue'),
      meta: {
        showFooter: false,
        title: "我的问答"
      }
    },
    {
      path: "/mySchool",
      name: "mySchool",
      component: () =>
        import('../pages/mySchool.vue'),
      meta: {
        showFooter: false,
        title: "我的机构"
      }
    },
    {
      path: "/video",
      name: "video",
      component: () =>
        import('../pages/video.vue'),
      meta: {
        showFooter: true,
        title: "直播列表"
      }
    },
    {
      path: "/pay/player/:id",
      name: "player",
      component: () =>
        import('../pages/player.vue'),
      meta: {
        showFooter: false,
        title: "医佰康云课堂"
      }
    },
    {
      path: "/applyTeacher",
      name: "applyTeacher",
      component: () =>
        import('../pages/applyTeacher.vue'),
      meta: {
        showFooter: false,
        title: "申请导师"
      }
    },
    {
      path: "/openTeacher",
      name: "openTeacher",
      component: () =>
        import('../pages/openTeacher.vue'),
      meta: {
        showFooter: false,
        title: "申请导师"
      }
    },
    {
      path: "/bdingteacher",
      name: "bdingteacher",
      component: () =>
        import('../pages/bdingteacher.vue'),
      meta: {
        showFooter: false,
        title: "绑定导师"
      }
    },
    {
      path: "/search",
      name: "search",
      component: () =>
        import('../pages/search.vue'),
      meta: {
        showFooter: false,
        title: "搜索"

      }
    },
    {
      path: "/msgList",
      name: "msgList",
      component: () =>
        import('../pages/msgList.vue'),
      meta: {
        showFooter: false,
        title: "消息列表"
      }
    },
    {
      path: "/ZbookResult",
      name: "ZbookResult",
      component: () =>
        import('../pages/ZbookResult.vue'),
      meta: {
        showFooter: false,
        title: "查询结果"
      }
    },
    {
      path: "/module/:id",
      name: "module",
      component: () =>
        import('../pages/module.vue'),
      meta: {
        showFooter: false,
        title: "模块列表"
      }
    },
    {
      path: "/moduleDetail",
      name: "moduleDetail",
      component: () =>
        import('../pages/moduleDetail.vue'),
      meta: {
        showFooter: false,
        title: "课时全部分类"
      }
    },
    {
      path: "/wordModuleDeatil",
      name: "wordModuleDeatil",
      component: () =>
        import('../pages/wordModuleDeatil.vue'),
      meta: {
        showFooter: false,
        title: "软文全部分类"
      }
    },
    {
      path: "/wordDetail/:id",
      name: "wordDetail",
      component: () =>
        import('../pages/wordDetail.vue'),
      meta: {
        showFooter: false,
        title: "软文详情"
      }
    },
    {
      path: "/bdingPhone",
      name: "bdingPhone",
      component: () =>
        import('../pages/bdingPhone.vue'),
      meta: {
        showFooter: false,
        title: "绑定手机号"
      }
    },
    {
      path: "/myDingYue",
      name: "myDingYue",
      component: () =>
        import('../pages/myDingYue.vue'),
      meta: {
        showFooter: false,
        title: "我的订阅"
      }
    },
    {
      path: "/openSchool",
      name: "openSchool",
      component: () =>
        import('../pages/openSchool.vue'),
      meta: {
        showFooter: false,
        title: "申请机构"
      }
    },
    {
      path: "/applySchool",
      name: "applySchool",
      component: () =>
        import('../pages/applySchool.vue'),
      meta: {
        showFooter: false,
        title: "申请机构"
      }
    },
    {
      path: "/download",
      name: "download",
      component: () =>
        import('../pages/download.vue'),
      meta: {
        showFooter: false,
        title: "app下载"
      }
    },
    {
      path: "/xianxiaCourse",
      name: "xianxiaCourse",
      component: () =>
        import('../pages/xianxiaCourse.vue'),
      meta: {
        showFooter: false,
        title: "线下课程"
      }
    },
    {
      path: "/setting",
      name: "setting",
      component: () =>
        import('../pages/setting.vue'),
      meta: {
        showFooter: false,
        title: "设置"
      }
    },
    {
      path: "/xianxiaCourseAdmin",
      name: "xianxiaCourseAdmin",
      component: () =>
        import('../pages/xianxiaCourseAdmin.vue'),
      meta: {
        showFooter: false,
        title: "线下课程管理员"
      }
    },
    {
      path: "/myCoupon",
      name: "myCoupon",
      component: () =>
        import('../pages/myCoupon.vue'),
      meta: {
        showFooter: false,
        title: "线下课程管理员"
      }
    },
    {
      path: "/schoolDetail/:id",
      name: "schoolDetail",
      component: () =>
        import('../pages/schoolDetail.vue'),
      meta: {
        showFooter: false,
        title: "机构详情"
      }
    },
    {
      path: "/teacherDetail/:id",
      name: "teacherDetail",
      component: () =>
        import('../pages/teacherDetail.vue'),
      meta: {
        showFooter: false,
        title: "导师详情"
      }
    },
    {
      path: "/changeiPhone",
      name: "changeiPhone",
      component: () =>
        import('../pages/changeiPhone.vue'),
      meta: {
        showFooter: false,
        title: "更改手机号"
      }
    },
    {
      path: "/changePhone",
      name: "changePhone",
      component: () =>
        import('../pages/changePhone.vue'),
      meta: {
        showFooter: false,
        title: "更改手机号"
      }
    },
    {
      path: "/yaoyueCart",
      name: "yaoyueCart",
      component: () =>
        import('../pages/yaoyueCart.vue'),
      meta: {
        showFooter: false,
        title: "生成邀约卡"
      }
    },
    {
      path: "/memberXieyi",
      name: "memberXieyi",
      component: () =>
        import('../pages/memberXieyi.vue'),
      meta: {
        showFooter: false,
        title: "用户协议"
      }
    },
    {
      path: "/tixianPage",
      name: "tixianPage",
      component: () =>
        import('../pages/tixianPage.vue'),
      meta: {
        showFooter: false,
        title: "提现"
      }
    },
    {
      path: "/moneyDetailed",
      name: "moneyDetailed",
      component: () =>
        import('../pages/moneyDetailed.vue'),
      meta: {
        showFooter: false,
        title: "零钱明细"
      }
    },
    {
      path: "/xsCourseDetail/:id",
      name: "xsCourseDetail",
      component: () =>
        import('../pages/xsCourseDetail.vue'),
      meta: {
        showFooter: false,
        title: "线下课程详情"
      }
    },
    {
      path: "/cantryVideo/:id",
      name: "cantryVideo",
      component: () =>
        import('../pages/cantryVideo.vue'),
      meta: {
        showFooter: false,
        title: "视频试看"
      }
    },
    {
      path: "/course_gift_detail/:id",
      name: "course_gift_detail",
      component: () =>
        import('../pages/course_gift_detail.vue'),
      meta: {
        showFooter: false,
        title: "赠礼详情"
      }
    },
    {
      path: "/giftCollectionDetails",
      name: "giftCollectionDetails",
      component: () =>
        import('../pages/giftCollectionDetails.vue'),
      meta: {
        showFooter: false,
        title: "赠礼领取详情"
      }
    },
    {
      path: "/giftOver",
      name: "giftOver",
      component: () =>
        import('../pages/giftOver.vue'),
      meta: {
        showFooter: false,
        title: "领取成功"
      }
    },
    {
      path: "/WxOpen",
      name: "WxOpen",
      component: () =>
        import('../pages/WxOpen.vue'),
      meta: {
        showFooter: false,
        title: "错误"
      }
    },
    {
      path: "/set_pay_pwd",
      name: "set_pay_pwd",
      component: () =>
        import('../pages/set_pay_pwd.vue'),
      meta: {
        showFooter: false,
        title: "设置支付密码"
      }
    },
    {
      path: "/revisePwd",
      name: "revisePwd",
      component: () =>
        import('../pages/revisePwd.vue'),
      meta: {
        showFooter: false,
        title: "修改密码"
      }
    },
    {
      path: "/forgetPwd",
      name: "forgetPwd",
      component: () =>
        import('../pages/forgetPwd.vue'),
      meta: {
        showFooter: false,
        title: "忘记密码"
      }
    },
    // forgetPwd

  ]
})

import {
  Toast
} from 'vant';
// 添加路由守卫
router.beforeEach((to, from, next) => {
  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  console.log(isiOS);
  if (isiOS) {
    if (to.path !== global.location.pathname) {
      location.assign(to.fullPath)
    }
  }
  if (to.name == "login" || to.name == "register") next();
  else if (to.name == "player" || to.name == 'my' || to.name == 'inquire' ||
    to.name == 'query1' || to.name == 'query2' || to.name == 'courseDetail' ||
    to.name == 'classDetail' || to.name == 'userinfo' || to.name == 'openStudent' ||
    to.name == 'ask' || to.name == 'wordDetail' || to.name == 'course_buy_detail' ||
    to.name == 'moduleDetail' || to.name == 'wordModuleDeatil' || to.name == 'teacherUserinfo' ||
    to.name == 'applyTeacher' || to.name == 'openTeacher' || to.name == 'openSchool' || 
    to.name == 'schoolDetail' || to.name == 'xsCourseDetail' || to.name == 'cantryVideo') {
    var cookie = sessionStorage.getItem("cookie");
    if (cookie) {
      next();
    } else {
      if (isWx()) {
        // getCode();
        setTimeout(() => {
          next();
        }, 1000);
      } else {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '监测到您没有登录，开始跳转登录'
        });

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `正在跳转...`;
          } else {
            clearInterval(timer);
          }
        }, 1000);
        setTimeout(() => {
          next({
            name: 'login'
          })
          Toast.clear();
        }, 2000);
      }

    }
  } else next();
})


export default router;
