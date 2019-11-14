<template>
  <div class="register">
    <!-- 返回键 -->
    <div class="back">
      <van-icon name="arrow-left" class="icon" @click="$router.push('/')" />
    </div>
    <!-- title -->
    <div class="register_txt">用户注册</div>
    <!-- 表单区域 -->
    <van-cell-group>
      <van-field
        v-model="phone"
        @focus="isfocus()"
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
        v-model="sms"
        center
        clearable
        label="动态码"
        placeholder="请输入短信动态码"
        required
        size="large"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        label="设置密码"
        placeholder="请输入密码"
        required
        right-icon="closed-eye"
        size="large"
        @blur="isPwd()"
        @focus="isfocus()"
        :error-message="error_pwd"
      />
      <van-field v-model="people" clearable label="推荐人" placeholder="请填写推荐人ID，可不填" size="large" />
    </van-cell-group>
    <!-- 注册按钮 -->
    <div class="btn btn-register">
      <el-button type="danger" @click="registerIn">立即注册</el-button>
    </div>
    <p class="huo">或</p>
    <!-- 切换登录 -->
    <div class="btn">
      <router-link to="/login">
        <el-button type="success">已有账号？点击登录</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      phone: "",
      password: "",
      error_message: "",
      error_pwd: "",
      sms: "",
      people: ""
    };
  },
  methods: {
    //注册方法，请求注册接口
    registerIn() {
      
    },
    //校验是否符合手机号规则
    isTell() {
      let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (!reg.test(this.phone)) {
        this.error_message = "手机号格式错误";
      }
      if (this.phone == "") {
        this.error_message = "手机不能为空";
      }
    },
    //输入框获取焦点后触发
    isfocus() {
      this.error_message = "";
      this.error_pwd = "";
    },
    //校验密码不能为空
    isPwd() {
      if (this.password == "") {
        this.error_pwd = "密码不能为空";
      }
    }
  }
};
</script>

<style scoped>
/* 返回键 */
.register {
  width: 100%;
  height: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
.register .back {
  width: 100%;
  height: 80px;
  background: #fff;
  line-height: 80px;
  padding-top: 20px;
}
.register .back .icon {
  font-size: 50px;
  color: #999;
}
/* title */
.register .register_txt {
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
.register .btn {
  width: 100%;
  text-align: center;
}
.register .btn-register {
  margin-top: 60px;
}
.el-button {
  width: 80%;
}
/* 或 */
.register .huo {
  font-size: 30px;
  color: #999;
  text-align: center;
  margin: 20px 0 10px 0;
}
/* 跳转注册 */
.register .rester {
  width: 100%;
  font-size: 0.32rem;
  color: #333;
  line-height: 1.333333rem;
  margin-left: 0.4rem;
}
.register .rester span {
  color: #999;
}
.register .rester a {
  color: #333;
}
</style>