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
import { reqWordDetail } from "../../api";
import { Toast } from "vant";
export default {
  props: ["article_id"],
  data() {
    return {
      value: "",
      showKeyboard: true,
      info: "请输入密码",
      error_info: ""
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
    // 输入密码
    async checkPwd() {
      const toast1 = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中"
      });
      const result = await reqWordDetail(this.article_id, "", this.value);
      console.log(result);
      if (result.code == 1) {
        toast1.clear();
        this.$router.go(0);
      } else if (result.code == -6) {
        this.error_info = result.msg;
        toast1.clear();
      }
    }
  },
  watch: {
    value() {
      if (this.value.length == 6) {
        localStorage.setItem(`wordPwd${this.article_id}`, this.value);
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