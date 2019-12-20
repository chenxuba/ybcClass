<template>
  <div class="login">
    <!-- 返回键 -->
    <div class="back">
      <van-icon name="arrow-left" class="icon" @click="$router.push('/')" />
    </div>
    <!-- title -->
    <div class="login_txt">手机号登录</div>
    <!-- 表单区域 -->
    <van-cell-group>
      <van-field
        v-model="phone"
        @focus="isfocus1()"
        :error-message="error_message"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        size="large"
        @blur="isTell()"
        maxlength="11"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        right-icon="closed-eye"
        size="large"
        @blur="isPwd()"
        @focus="isfocus2()"
        :error-message="error_pwd"
      />
    </van-cell-group>
    <van-checkbox v-model="isChecked" checked-color="#07c160" class="remember" icon-size="16px">记住密码</van-checkbox>
    <!-- 登录按钮 -->
    <div class="btn btn-login">
      <el-button type="danger" :disabled="disabled" @click="loginIn">登录</el-button>
    </div>
    <p class="huo">或</p>
    <!-- 切换登录 -->
    <div class="btn">
      <router-link to="/login2">
        <el-button type="success">手机验证码登录</el-button>
      </router-link>
    </div>
    <!-- 跳转注册 -->
    <div class="rester">
      <span>还没有账号？</span>
      <router-link to="/register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import md5 from 'js-md5';
import { reqPhonePwdLogin } from "../api/index";
export default {
  data() {
    return {
      phone: "",
      password: "",
      error_message: "",
      error_pwd: "",
      disabled: false,
      isChecked: true
    };
  },
  methods: {
    //登录方法，请求登录接口
    async loginIn() {
      if (!this.phone || !this.password) {
        Toast.fail("手机号和密码不能为空");
      } else if (this.isChecked) {
        this.setCookie(this.phone, this.password, 7); // 保存期限为7天
        const result = await reqPhonePwdLogin(this.phone, md5(this.password));
        // console.log(result);
        if (result.code == 1) {
          Toast.success("登录成功");
          sessionStorage.setItem("cookie", result.data.cookie);
          sessionStorage.setItem("uuid", result.data.uuid);
          this.$router.push("/index");
        } else if (result.code == -1) {
          Toast.fail(result.msg);
        } else if (result.code == -7) {
          Toast.fail("手机号未注册");
        }
      } else {
        this.clearCookie(); // 清空 Cookie
        const result = await reqPhonePwdLogin(this.phone, md5(this.password));
        // console.log(result);
        if (result.code == 1) {
          Toast.success("登录成功");
          sessionStorage.setItem("cookie", result.data.cookie);
          sessionStorage.setItem("uuid", result.data.uuid);
          this.$router.push("/index");
        } else if (result.code == -1) {
          Toast.fail("账号密码错误");
        } else if (result.code == -7) {
          Toast.fail("手机号未注册");
        }
      }
    },
    //校验是否符合手机号规则
    isTell() {
      let reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
      if (!reg.test(this.phone)) {
        this.error_message = "手机号格式错误";
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      if (this.phone == "") {
        this.error_message = "手机不能为空";
      }
    },
    //输入框获取焦点后触发
    isfocus1() {
      this.error_message = "";
    },
    isfocus2() {
      this.error_pwd = "";
    },
    //校验密码不能为空
    isPwd() {
      if (this.password == "") {
        this.error_pwd = "密码不能为空";
      }
    },
    // 设置Cookie
    setCookie(phone, password, exdays) {
      // 用户名, 密码, 保存天数
      let exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      // 字符串拼接cookie
      window.document.cookie =
        "phone=" + phone + ";path=/;expires=" + exdate.toGMTString();
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
          if (arr2[0] == "phone") {
            this.phone = arr2[1]; // 保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.password = arr2[1];
          }
        }
      }
    }
  },
  mounted () {
    this.getCookie();
  }
};
</script>

<style scoped>
/* 返回键 */
.login {
  width: 100%;
  height: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
.login .back {
  width: 100%;
  height: 80px;
  background: #fff;
  line-height: 80px;
  padding-top: 20px;
}
.login .back .icon {
  font-size: 50px;
  color: #999;
}
/* title */
.login .login_txt {
  width: 100%;
  height: 100px;
  background: #fff;
  line-height: 100px;
  font-size: 50px;
  letter-spacing: 1px;
  color: #333;
  margin-top: 40px;
  margin-bottom: 60px;
  padding-left: 20px;
  box-sizing: border-box;
}
/* 登录按钮 */
.login .btn {
  width: 100%;
  text-align: center;
}
.login .btn-login {
  margin-top: 60px;
}
.el-button {
  width: 80%;
}
/* 或 */
.login .huo {
  font-size: 30px;
  color: #999;
  text-align: center;
  margin: 20px 0 10px 0;
}
/* 跳转注册 */
.login .rester {
  width: 100%;
  font-size: 0.32rem;
  color: #333;
  line-height: 1.333333rem;
  margin-left: 0.4rem;
}
.login .rester span {
  color: #999;
}
.login .rester a {
  color: #333;
}
.login .remember {
  font-size: 28px;
  color: #333;
  margin: 40px 0 0 20px;
}
</style>