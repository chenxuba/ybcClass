<template>
  <div class="bdphone" v-height>
    <h1>绑定手机</h1>
    <!-- 头像 -->
    <div class="img-box">
      <img v-lazy="userinfo.headimgurl || 'https://kf.ybc365.com/train/Public/train/user/common/img/user.png'" alt />
      <h2>{{userinfo.name || '暂无昵称'}}</h2>
      <h3>为了您的账号安全，请绑定手机号</h3>
    </div>
    <div class="from">
      <div class="inpu1-box">
        <span>+86</span>
        <input
          type="tel"
          placeholder="输入手机号"
          class="input1"
          v-model="phone"
          @blur="isTell()"
          maxlength="11"
        />
      </div>
      <div class="inpu2-box">
        <input type="tel" placeholder="输入验证码" class="input1" v-model="code" />
        <span v-if="sendBtn" @click="sendCode">获取验证码</span>
        <span  v-else >倒计时{{authTime}}秒</span>
      </div>
    </div>
    <div class="over">
      <button class="btn" @click="actionBding">完成</button>
    </div>
    <div class="wenxitishi">
      <p>点击「完成」，即表示您同意并愿意遵守</p>
      <p class="p">《医佰康云课堂用户协议》</p>
    </div>
    <goHome></goHome>
  </div>
</template>

<script>
import { reqBdUserinfo, reqBdingPhoneCode, reqBdingPhone } from "../api";
import { Toast } from "vant";
export default {
  data() {
    return {
      userinfo: "",
      phone: "",
      code: "",
      sendBtn: true, // 控制发送验证码按钮显示
      authTime: 0 // 倒计时
    };
  },
  methods: {
    async getUserinfo() {
      const result = await reqBdUserinfo();
      console.log(result);
      if (result.code == 1) {
        this.userinfo = result.data;
      }
    },
    //校验是否符合手机号规则
    isTell() {
      let reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
      if (!reg.test(this.phone)) {
        this.$toast("手机号格式错误");
      }
      if (this.phone == "") {
        this.$toast("手机不能为空");
      }
    },
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
  },
  mounted() {
    this.getUserinfo();
  }
};
</script>

<style scoped>
.bdphone {
  padding: 0 80px;
  box-sizing: border-box;
}
.bdphone h1 {
  width: 100%;
  font-size: 45px;
  text-align: center;
  color: #333;
  padding: 50px 0 40px 0;
  border-bottom: 2px solid #eee;
}
.bdphone .img-box {
  width: 100%;
  height: auto;
  text-align: center;
  margin-top: 40px;
}
.bdphone .img-box img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
}
.bdphone .img-box h2 {
  font-size: 30px;
  color: #888;
  line-height: 50px;
}
.bdphone .img-box h3 {
  font-size: 26px;
  color: #888;
  line-height: 100px;
}
.from {
  margin-top: 30px;
}
.from .input1 {
  width: 100%;
  height: 70px;
  font-size: 28px;
  color: #888;
  border: 1px solid #eee;
  text-indent: 1em;
  box-shadow: inset 1px 2px 4px #888;
  border-left: none;
}
.from .inpu1-box {
  display: flex;
  margin-bottom: 40px;
}
.from .inpu1-box span {
  color: #333;
  font-size: 28px;
  line-height: 70px;
  border: 1px solid #eee;
  border-right: none;
  width: 20%;
  text-align: center;
}
.from .inpu1-box span .icon {
  position: relative;
  top: 3px;
}

.from .input2 {
  width: 100%;
  height: 70px;
  font-size: 28px;
  color: #888;
  border: 1px solid #eee;
  text-indent: 1em;
  box-shadow: inset 0px 2px 6px #888;
}
.from .inpu2-box {
  display: flex;
  align-items: center;
}
.from .inpu2-box span {
  color: #fff;
  font-size: 28px;
  line-height: 70px;
  height: 70px;
  width: 60%;
  text-align: center;
  margin-left: 40px;
  background: #5dd6c7;
  border-radius: 4px;
}
.from .inpu2-box span .icon {
  position: relative;
  top: 3px;
}
.over {
  margin-top: 50px;
}
.over .btn {
  width: 100%;
  background: #5dd6c7;
  border: none;
  outline: none;
  color: #fff;
  font-size: 30px;
  padding: 22px 0;
  border-radius: 5px;
}
.wenxitishi {
  text-align: center;
  margin-top: 30px;
}
.wenxitishi p {
  font-size: 26px;
  color: #888;
}
.wenxitishi p.p {
  margin-top: 15px;
  color: #5dd6c7;
}
</style>