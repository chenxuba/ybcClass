<template>
  <div class="number">
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      :info="info"
      :error-info="error_info"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      class="number_input"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = true"
    />
  </div>
</template>

<script>
import { reqWxPay, reqPayResult2 } from "../../api";
import { Toast } from "vant";
export default {
  props: ["id", "type","money","user_id"],
  data() {
    return {
      value: "",
      showKeyboard: true,
      info: "请输入支付密码",
      error_info: "",
      pay_type: "2", //2是零钱支付
      batchcode: "",
      res_id:this.$route.query.res_id
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
      if (this.value.length < 6) {
        this.error_info = "";
      }
    },
    // 零钱支付
    async checkPwd() {
      const toast1 = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中"
      });
      const result = await reqWxPay(
        "",
        this.id,
        this.type,
        "",
        this.pay_type,
        this.money,
        "",
        this.value,
        this.user_id
      );
      console.log(result);
      if (result.code == 1) {
        this.batchcode = result.data.batchcode;
        this.getPayResult();
      } else if (result.code == -1) {
        this.error_info = "支付密码不正确";
        toast1.clear();
      }
    },
    // 检查零钱支付结果
    async getPayResult() {
      let _this = this;
      const toast2 = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中"
      });
      const res = await reqPayResult2(this.batchcode, "", this.type);
      if (res.code == 1) {
        toast2.clear();
        _this.value = "";
        _this.$router.push({
          path:"/payOver",
          query:{
            type:this.type,
            id: this.id,
          }
        });
        Toast.success("支付成功");
      } else {
        Toast.fail("支付未成功");
      }
    }
  },
  watch: {
    value() {
      if (this.value.length == 6) {
        this.checkPwd();
      }
    }
  }
};
</script>

<style scoped>
.number {
  padding-top: 45px;
}
</style>