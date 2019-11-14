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
  props: ["multiply", "liwuID", "Restype"],
  data() {
    return {
      value: "",
      showKeyboard: true,
      id: this.$route.params.id,
      info: "请输入支付密码",
      error_info: "",
      type: "6", //固定type值
      res_id: this.$route.params.id, //课时id
      pay_type: "2", //2是零钱支付
      batchcode: ""
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
        this.liwuID,
        this.type,
        this.res_id,
        this.pay_type,
        this.multiply,
        this.value
      );
      console.log(result);
      if (result.code == 1) {
        this.batchcode = result.data.batchcode;
        this.getPayResult();
      } else if (result.code == -1) {
        this.error_info = "密码不正确";
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
        _this.$emit("closePwdInput");
        Toast.success("打赏成功");
        // 打赏成功后,实时刷新用户零钱余额
        _this.$emit("ShuaXinlingQianMsg")
        switch (_this.Restype) {
          // 正在直播的视频
          case 2:
            let lives_like = {
              type: "live_reward",
              order_id: _this.batchcode,
              s_id: "1"
            };
            _this.$emit("liwuChufaWs", lives_like);

            break;
          // 视频（录播）
          case 3:
            let video_like = {
              type: "video_reward",
              order_id: _this.batchcode,
              s_id: "1"
            };
            _this.$emit("liwuChufaWs", video_like);
            break;
          // 回放的直播
          case 4:
            console.log("我被触发了");
            let live_like = {
              type: "live_reward",
              order_id: _this.batchcode,
              s_id: "1"
            };
            _this.$emit("liwuChufaWs", live_like);
            break;
          // 正在直播的音频
          case 8:
            let audio_login = {
              type: "radio_reward",
              order_id: _this.batchcode,
              s_id: "1"
            };
            _this.$emit("liwuChufaWs", audio_login);

            break;
          // 回听的音频
          case 9:
            let audios_login = {
              type: "audio_reward",
              order_id: _this.batchcode,
              s_id: "1"
            };
            _this.$emit("liwuChufaWs", audios_login);

            break;
          // 上传录播的音频
          case 10:
            let audioss_login = {
              type: "audio_reward",
              order_id: _this.batchcode,
              s_id: "1"
            };
            _this.$emit("liwuChufaWs", audioss_login);

            break;
        }
        this.showPay = false;
        this.$emit("closeMain");
      } else {
        Toast.fail("支付未成功");
        toast2.clear();
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