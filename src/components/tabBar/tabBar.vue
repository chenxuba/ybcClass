<template>
  <!--底部导航开始-->
  <div class="nav">
    <router-link active-class="active" to="/index">
      <i class="el-icon-menu icon"></i>
      <span>首页</span>
    </router-link>
    <router-link active-class="active" to="/faxian">
      <van-icon name="fire" class="icon" />
      <span>社区</span>
    </router-link>
    <router-link active-class="active" to="/video">
      <div class="icon icon-3"></div>
      <span class="span-3">直播</span>
    </router-link>
     <router-link active-class="active" to="/inquire"> <!--问答 -->
      <van-icon name="chat" class="icon" />
      <span>问答</span>
    </router-link>
    <router-link active-class="active" :to="path" >
      <van-icon name="manager" class="icon" @click="goPath"/>
      <span @click="goPath">我的</span>
    </router-link>
    <!--底部导航结束-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "#"
    };
  },
  methods: {
    goPath() {
      var cookie = sessionStorage.getItem("cookie");
      if (cookie) {
        this.path = "/my";
      } else {
        this.path = "/login";
      }
    }
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 92px;
  line-height: 42px;
  text-align: center;
  display: flex;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid rgb(236, 235, 235);
  z-index: 99;
  padding-top: 10px;
  box-sizing: border-box;
}
.nav a {
  flex: 1;
  text-decoration: none;
  color: #a3aaaf;
  font-size: 25px;
}
.nav a:nth-child(3) {
  background: url("../../../static/img/shipinkecheng.png") no-repeat center;
  border-radius: 50%;
  height: 150px;
  position: relative;
  top: -76px;
  transform: scale(0.6);
}
.nav a .icon {
  display: block;
  font-size: 45px;
}
.nav a .icon-3 {
  width: 70px;
  height: 70px;
  margin-top: 30px;
  font-size: 90px;
}
.nav a.active {
  color: #5dd6c7;
}
.span-3 {
  font-size: 50px;
  line-height: 3.5;
}
</style>

