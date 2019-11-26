<template>
  <div class="fail">
    <img src="../../static/img/fail.png" />
    <div class="link">
      <span>身份认证失败，正在</span>
      <el-link type="danger" class="span">跳转</el-link>
      <span>登录</span>
      <span>{{count}}秒后自动跳转</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: "" //倒计时
    };
  },
  methods: {
    //  3秒后进入群发记录
    goGrdoupRecor() {
      const TIME_COUNT = 3;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            //跳转的页面写在此处
            this.$router.push("/login")
          }
        }, 1000);
      }
    }
  },
  mounted () {
      this.goGrdoupRecor();
  }
};
</script>

<style scoped>
.fail {
  width: 100%;
  height: 100%;
  background-color: #f0f5f8;
  text-align: center;
}
.fail span {
  display: inline-block;
  font-size: 24px;
  color: #333;
  vertical-align: middle;
}
.fail .span {
  font-size: 24px;
}
</style>