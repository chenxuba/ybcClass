<template>
  <div class="login">
    <div id="u1" class="ax_default">
      <p class="title-txt">导师后台管理系统</p>
      <el-form label-width="80px" :model="loginMsg" class="from">
        <el-form-item label>
          <el-input v-model="loginMsg.userName" placeholder="账号/手机号/邮箱"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="loginMsg.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label class="verifycode">
          <el-input v-model="loginMsg.verifycode" placeholder="验证码" class="verifycode_box"></el-input>
          <img :src="imgCode" width="100%" class="verifycode_img" @click="changeImgCode" />
        </el-form-item>

        <el-button type="primary" class="btn" @click="login">登录</el-button>
      </el-form>
      <img id="u1_img" class="img" src="../../static/img/u1.png" />
    </div>
  </div>
</template>

<script>
import { reqUserLogin } from "../api";
export default {
  data() {
    return {
      loginMsg: {
        userName: "", //用户名
        password: "", //密码
        verifycode: "", //验证码
        type: 7
      },
      imgCode: "" //验证码图片链接
    };
  },
  methods: {
    // 点击图片修改图片src
    changeImgCode() {
      var num = Math.ceil(Math.random() * 10); //生成一个随机数（防止缓存）
      this.imgCode = "https://api.ybc365.com/api/5dbfc3dc717a8?" + num;
    },
    // 登录
    async login() {
      if (this.loginMsg.userName == "") {
        this.$message({
          message: "请输入用户名",
          type: "warning"
        });
      } else if (this.loginMsg.password == "") {
        this.$message({
          message: "请输入密码",
          type: "warning"
        });
      } else if (this.loginMsg.verifycode == "") {
        this.$message({
          message: "请输入验证码",
          type: "warning"
        });
      } else {
        const res = await reqUserLogin(
          this.loginMsg.userName,
          this.loginMsg.password,
          this.loginMsg.verifycode,
          this.loginMsg.type
        );
        //   res.code == -1 说明验证码错误，然后刷新获取新的验证码
        if (res.code == -1) {
          this.$message.error(res.msg);
          this.changeImgCode();
          //   res.code == 1 说明登录成功，然后往sessionStorage里存储一个状态值，提示跳转成功，跳转到主页
        } else if (res.code == 1) {
          sessionStorage.setItem("isLogin", true);
          this.$message({
            message: "恭喜你，登录成功",
            type: "success"
          });
          this.$router.push("/");
        }
      }
    }
  },
  mounted() {
    this.changeImgCode();
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../../static/img/bg.jpeg");
  background-size: 100% 100%;
}
.login #u1 {
  border-width: 0px;
  position: absolute;
  left: 50%;
  top: 10%;
  width: 487px;
  margin-left: -250px;
  height: 589px;
  background: url("../../static/img/u1.png");
}
.login .ax_default {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  color: #333333;
  text-align: center;
  line-height: normal;
}
.login #u1_img {
  border-width: 0px;
  position: absolute;
  left: -20px;
  top: -20px;
  width: 527px;
  height: 629px;
  z-index: -1;
}
.login .title-txt {
  font-family: "华文隶书 Bold", 华文隶书;
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.627);
  border-width: 0px;
  margin-top: 60px;
}
.login .from {
  padding: 80px 60px 0 0px;
  z-index: 9999;
}
.login .btn {
  width: 80%;
  margin-left: 80px;
  height: 50px;
  margin-top: 20px;
}
.login .verifycode .verifycode_box {
  width: 55%;
  float: left;
}
.login .verifycode .verifycode_img {
  height: 40px;
  width: 40%;
  float: right;
  object-fit: contain;
}
</style>