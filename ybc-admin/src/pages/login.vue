<template>
  <div class="login">
    <div id="u1" class="ax_default">
      <p class="title-txt">导师后台管理系统</p>
      <el-form label-width="80px" :model="loginMsg" class="from">
        <el-form-item label>
          <el-input
            v-model="loginMsg.userName"
            placeholder="账号/手机号/邮箱"
            @keyup.enter.native="addByEnterKey"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input
            v-model="loginMsg.password"
            placeholder="密码"
            type="password"
            @keyup.enter.native="addByEnterKey"
          ></el-input>
        </el-form-item>
        <el-form-item label class="verifycode">
          <el-input
            v-model="loginMsg.verifycode"
            placeholder="验证码"
            class="verifycode_box"
            @keyup.enter.native="addByEnterKey"
          ></el-input>
          <img :src="imgCode" width="100%" class="verifycode_img" @click="changeImgCode" />
        </el-form-item>
        <div class="remember">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </div>
        <el-button type="primary" class="btn" @click="login">登录</el-button>
      </el-form>
      <img id="u1_img" class="img" src="../../static/img/u1.png" />
    </div>
    <footer id="footer">
      上海沐月信息技术发展有限公司
      <img src="https://kf.ybc365.com/train/Public/train/img/icon-police.png" alt /> 沪ICP备15044463号
    </footer>
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
      imgCode: "", //验证码图片链接
      checked: true
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
        if (this.checked == true) {
          this.setCookie(this.loginMsg.userName, this.loginMsg.password, 7); // 保存期限为7天
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
        } else {
          this.clearCookie(); // 清空 Cookie
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
    // 按下回车键触发事件
    addByEnterKey(e) {
      if (e.keyCode == 13) {
        this.login();
      }
    },
    // 设置Cookie
    setCookie(username, password, exdays) {
      // 用户名, 密码, 保存天数
      let exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      // 字符串拼接cookie
      window.document.cookie =
        "username=" + username + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password=" + password + ";path=/;expires=" + exdate.toGMTString();
    },
    // 清除Cookie
    clearCookie() {
      this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
    },
    // 读取Cookie
    getCookie() {
      // console.log(document.cookie);
      if (document.cookie.length > 0) {
        let arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split("="); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == "username") {
            this.loginMsg.userName = arr2[1]; // 保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.loginMsg.password = arr2[1];
          }
        }
      }
    }
  },
  mounted() {
    this.changeImgCode();
    this.getCookie();
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
  font-size: 18px;
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
.remember {
  margin-left: -180px;
}
#footer {
  width: 100%;
  position: fixed;
  bottom: 20px;
  color: #fff;
  left: 50%;
  margin-left: -50%;
  text-align: center;
}
</style>