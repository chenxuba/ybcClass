<template>
  <div class="needpay2">
    <!-- 学员资源不可试看 -->
    <div class="student_view">
      <p class="try_title">余下精彩内容，输入密码可见</p>
      <p class="try_txt">
        <span>长按识别关注公众号可体验学员：</span>
        <br />
        <span>点击下方按钮输入密码 ↓</span>
      </p>
      <div class="commit">
        <span class="btn" @click="ShowInputPwd">（密码）阅读全文</span>
      </div>
      <div class="erweima">
        <img src="http://qiniu.ybc365.com/WechatIMG65.jpeg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    // 弹出密码输入框
    ShowInputPwd(){
      this.$parent.showPwdInput = true
    }
  }
};
</script>

<style scoped>
.needpay2 .html_content {
  word-wrap: break-word;
  position: relative;
}
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
  padding: 5px 60px 5px 45px;
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
.needpay2 .html_content .try_content_box {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0) 0,
    #fff 95%
  );
}
</style>