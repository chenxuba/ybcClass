<template>
  <div class="login">
    <!-- 返回键 -->
    <div class="back">
      <van-icon name="arrow-left" class="icon" @click="$router.push('/')" />
    </div>
    <!-- title -->
    <div class="login_txt">绑定手机号码</div>
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
        <van-button slot="button" size="small" type="primary">倒计时{{authTime}}秒</van-button>
      </van-field>
    </van-cell-group>
    <!-- 切换登录 -->
    <div class="btn">
      <el-button type="success" @click="actionBding">确定绑定</el-button>
    </div>
  </div>
</template>

<script>
import { reqBdingPhoneCode, reqBdingPhone } from "../api/index.js";
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
      const result = await reqBdingPhoneCode(this.phone);
      // console.log(result);
      if (result.code == -998) {
        Toast.fail("请求出错或此号码已被绑定");
      } else if (result.code == 1) {
        Toast.success("短信发送成功");
        this.sendBtn = false; // 控制显示隐藏
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
    async actionBding() {
      if (this.phone == "" || this.code == "") {
        Toast.fail("号码或验证码不能为空");
      } else {
        const result = await reqBdingPhone(this.phone, this.code);
        // console.log(result);
        if (result.code == 1) {
          Toast.success("绑定成功");
          this.$router.push("/index");
        } else if (result.code == -1) {
          Toast.fail(result.msg);
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
</style>