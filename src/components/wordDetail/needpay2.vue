<template>
  <div class="needpay2">
    <div class="student_view">
      <p class="try_title">余下精彩内容，仅学员可见</p>
      <p class="try_txt">
        <span>首次关注公众号获得全站学员标志试看资格：</span>
        <br />
        <span>或点击下方按钮立即成为学员 ↓</span>
      </p>
      <div class="commit">
        <span class="btn" @click="openStu">（学员）阅读全文</span>
      </div>
      <div class="erweima">
        <img :src="article_qr" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["article_qr"],
  methods: {
    openStu() {
      this.$router.push("/openStudent");
    }
  }
};
</script>

<style scoped>
.needpay2 {
  padding: 0 30px;
  font-size: 24px;
  box-sizing: border-box;
  color: #333;
}
.needpay2 .student_view {
  width: 100%;
  height: 250px;
  background: #fff;
  border-radius: 12px;
  padding: 15px 20px 20px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  position: relative;
}
.needpay2 .student_view .try_title {
  font-size: 26px;
  font-weight: bold;
  color: #000;
}
.needpay2 .student_view p {
  margin: 0;
}
.needpay2 .student_view .try_txt {
  color: #999;
}
.needpay2 .student_view .commit {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
.needpay2 .student_view .commit .btn {
  border: 2px solid #b94738;
  padding: 2px 60px 2px 45px;
  border-radius: 30px;
  color: #b94738;
}
.needpay2 .student_view .erweima {
  width: 120px;
  height: 120px;
  position: absolute;
  top: 40px;
  right: 20px;
}
.needpay2 .student_view .erweima img {
  width: 100%;
  height: 100%;
}
</style>