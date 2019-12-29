<template>
  <div class="login">
    <!-- 返回键 -->
    <div class="back">
      <van-icon name="arrow-left" class="icon" @click="$router.go(-1)" />
    </div>
    <!-- title -->
    <div class="login_txt">忘记密码</div>
    <!-- 表单区域 -->
    <van-cell-group>
      <van-field
        v-model="phone"
        required
        clearable
        label="手机号"
        @blur="isTell()"
        :error-message="error_message"
        maxlength="11"
        placeholder="请输入手机号"
        size="large"
        @focus="isfocus1()"
      />
      <van-field
        v-model="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        required
        size="large"
      >
        <van-button slot="button" size="small" type="primary" v-if="sendBtn" @click="sendCode">发送验证码</van-button>
        <van-button slot="button" size="small" type="primary" v-else>倒计时{{authTime}}秒</van-button>
      </van-field>
    </van-cell-group>
     <div class="cont">
        <div class="cont-left">新密码</div>
        <input type="password" placeholder="请输入新密码" class="cont-right" />
      </div>
      <div class="cont">
        <div class="cont-left">确认新密码</div>
        <input type="password" placeholder="请再次输入新密码" class="cont-right" />
      </div>
    <!-- 切换登录 -->
    <div class="btn">
        <el-button type="success" @click="actionChange">确认</el-button>
    </div>
  </div>
</template>

<script>
import { reqSendCodeChange, reqPhoneCodeChange } from "../api/index.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      phone: "",
      code: "",
      error_message: "",
      sendBtn: true, // 控制发送验证码按钮显示
      authTime: 0 // 倒计时
    };
  },
  methods: {
    // 发送验证码
    async sendCode() {
      const result = await reqSendCodeChange(this.phone);
      if (result.code == -13) {
        // 手机号未注册
        Toast.fail(result.msg);
      } else if (result.code == 1) {
        Toast.success("发送成功");
        this.sendBtn = false; // 控制显示隐藏
        this.authTime = 60; //从60秒开始倒计时
        let timeInt = setInterval(() => {
          this.authTime--;
          if (this.authTime <= 0) {
            this.sendBtn = true;
            window.clearInterval(timeInt);
          }
        }, 1000);
      } else if (result.code == -995) {
        Toast.fail("号码不能为空");
      } else if (result.code == -1) {
        Toast.fail(result.msg);
      }
    },
    //校验是否符合手机号规则
    isTell() {
      let reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
      if (!reg.test(this.phone)) {
        this.error_message = "手机号格式错误";
      }
      if (this.phone == "") {
        this.error_message = "手机不能为空";
      }
    },
    //输入框获取焦点后触发
    isfocus1() {
      this.error_message = "";
    },
    async actionChange() {
      if (this.phone == "" || this.code == "") {
        Toast.fail("号码或验证码不能为空");
      } else {
        const result = await reqPhoneCodeChange(this.phone, this.code);
        // console.log(result);
        if (result.code == 1) {
          Toast.success("修改成功");
          this.$router.go(-2);
        } else if (result.code == -1) {
          Toast.fail('验证码不正确或已失效');
        }
      }
    }
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

.el-button {
  width: 80%;
  margin-top: 200px;
  background-color: #5dd6c7;
  border: 1px solid #5dd6c7;
}
.van-button--primary {
  background-color: #5dd6c7;
  border: 1px solid #5dd6c7;
}
.cont {
  width: 90%;
  height: 100px;
  line-height: 100px;
  margin: 0 auto;
  border-bottom: 2px solid #eee;
  overflow: hidden;
  display: flex;
}
.cont-left {
  float: left;
  margin-right: 4%;
  font-size: 30px;
  color: #333;
  width: 150px;
}

.cont-right {
  float: right;
  font-size: 28px;
  color: #777;
  text-align: left;
}
</style>