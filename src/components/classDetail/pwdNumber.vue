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
import { reqVideoUrl } from "../../api/index";
export default {
  data() {
    return {
      value: "",
      showKeyboard: true,
      id: this.$route.params.id,
      info: "该资源需要密码才能观看",
      error_info:""
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
      if(this.value.length < 6){
        this.error_info = ''
      }
    },
    async checkPwd() {
      const result = await reqVideoUrl(this.id, this.value);
      // console.log(result);
      if (result.code == 1) {
        // this.$router.push("/player/" + this.id);
        this.$router.push({
          path:"/pay/player/" + this.id,
          query:{
            pwd:this.value
          }
        });
      }else if(result.code == -6){
        this.error_info = "密码不正确";
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