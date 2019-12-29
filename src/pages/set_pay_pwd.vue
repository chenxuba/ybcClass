<template>
  <div>
    <div class="contbox">
      <div class="cont">
        <div class="cont-left">新密码</div>
        <input type="password" placeholder="请输入新支付密码" class="cont-right" v-model="pwd" />
      </div>
      <div class="cont">
        <div class="cont-left">确认新密码</div>
        <input type="password" placeholder="请再次输入新支付密码" class="cont-right" v-model="pwd2" />
      </div>
    </div>
    <button class="queding" @click="setPayPwd">确定</button>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqsetPayPwd } from "../api";
import { Notify } from "vant";
export default {
  data() {
    return {
      pwd: "",
      pwd2: ""
    };
  },
  methods: {
    async setPayPwd() {
      // if (
      //   this.pwd2 == this.pwd &&
      //   this.pwd != "" &&
      //   this.pwd2 != "" &&
      //   this.pwd.length == 6
      // ) {
      //   const result = await reqsetPayPwd("", this.pwd);
      //   if (result.code == -1) {
      //     Notify("该账户已设置过密码，无需重复设置");
      //     this.pwd = "";
      //     this.pwd2 = "";
      //   } else if (result.code == 1) {
      //     Notify({
      //       message: "设置成功，支付密码" + this.pwd + "请牢记",
      //       color: "#fff",
      //       background: "#5dd6c7"
      //     });
      //   }
      // } else if (this.pwd2 != this.pwd) {
      //   this.$toast("两次密码不一致，请重新输入");
      // } else if (this.pwd2 == "" || this.pwd == "") {
      //   this.$toast("支付密码不能为空！");
      // } else if (this.pwd.length > 6 || this.pwd < 6) {
      //   Notify("密码长度最低为6位数字");
      // }
      if (this.pwd.length == 6 && this.pwd2.length == 6) {
        if (this.pwd == this.pwd2) {
          const result = await reqsetPayPwd("", this.pwd);
          if (result.code == -1) {
            Notify("该账户已设置过密码，无需重复设置");
            this.pwd = "";
            this.pwd2 = "";
          } else if (result.code == 1) {
            Notify({
              message: "设置成功，支付密码" + this.pwd + "请牢记",
              color: "#fff",
              background: "#5dd6c7"
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        } else {
          Notify("两次密码不一致，请重新输入");
        }
      } else {
        Notify("密码须为6位数字");
      }
    }
  }
};
</script>

<style scoped>
.contbox {
  width: 100%;
  background: #fff;
}
.cont {
  width: 90%;
  height: 100px;
  line-height: 100px;
  margin: 0 auto;
  border-bottom: 2px solid #e1e1e1;
  overflow: hidden;
}
.cont-left {
  float: left;
  margin-right: 10%;
  font-size: 30px;
  color: #333;
}
input {
  -webkit-appearance: none;
  border-radius: 0;
  border: none;
}
.cont-right {
  float: right;
  font-size: 30px;
  color: #777;
  text-align: right;
}
.queding {
  width: 80%;
  height: 80px;
  color: #fff;
  border-radius: 40px;
  margin: 270px 10% 0;
  font-size: 30px;
  background: #5dd6c7;
  border: none;
}
</style>