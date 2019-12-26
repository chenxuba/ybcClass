<template>
  <div class="dialog">
    <ul>
      <li @click="wx_pay" v-if="showWxPay">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572773744471&di=b71d82727e8467c804ddfd52f753a998&imgtype=0&src=http%3A%2F%2Fpic93.nipic.com%2Ffile%2F20160325%2F11778999_104847144671_2.jpg"
          alt
        />
        <span class="wx_text">微信支付</span>
        <span>
          <van-icon name="arrow" class="icon" />
        </span>
      </li>
      <li v-if="lingQianMoney > 0 && lingQianMoney > LiwuTotalPrice" @click="bank_pay">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572774246562&di=fd48e01da1cfa810379e67f1dee4cca2&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F32%2F12%2F5810ded697fac_610.jpg"
          alt
        />
        <span class="wx_text">零钱支付：{{lingQianMoney}}</span>
        <span>
          <van-icon name="arrow" class="icon" />
        </span>
      </li>
      <li @click="bank_pay" v-else>
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572774246562&di=fd48e01da1cfa810379e67f1dee4cca2&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F32%2F12%2F5810ded697fac_610.jpg"
          alt
        />
        <span class="wx_text">零钱支付：零钱不足</span>
        <span>
          <van-icon name="arrow" class="icon" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "vant";
import { isWx } from "../../util";
import { reqWxPay, reqPayResult } from "../../api";
import { showLoading, hideLoading } from "../../assets/js/loading";
import { mapState } from "vuex";
export default {
  props: ["liwuID", "Restype", "multiply", "lingQianMoney"],
  data() {
    return {
      showWxPay: false,
      type: 6, //固定type值
      res_id: this.$route.params.id, //课时id
      pay_type: 1, //1是微信支付
      batchcode: ""
    };
  },
  methods: {
    // 微信支付跳转
    async wx_pay() {
      const result = await reqWxPay(
        "",
        this.liwuID,
        this.type,
        this.res_id,
        this.pay_type,
        "",
        this.multiply,
        "",
        ""
      );
      console.log(result);
      showLoading();
      this.batchcode = result.data.batchcode;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: result.data.pay_param.appId,
          timeStamp: result.data.pay_param.timeStamp.toString(),
          nonceStr: result.data.pay_param.nonceStr,
          package: result.data.pay_param.package,
          signType: "MD5",
          paySign: result.data.pay_param.paySign
        },
        res => {
          console.log(res);
          hideLoading();
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            this.getPayResult();
          } else {
            return;
          }
        }
      );
    },
    async getPayResult() {
      let _this = this;
      const res = await reqPayResult(this.batchcode, "");
      if (res.code == 1) {
        Toast.success("支付成功");
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
      }
    },
    bank_pay() {
      this.$emit("showPwdInput");
    }
  },
  mounted() {
    if (isWx()) {
      this.showWxPay = true;
    }
  },
  computed: {
    ...mapState(["LiwuTotalPrice"])
  }
};
</script>

<style scoped>
/* 弹出支付窗口样式 */
.dialog {
  width: 100%;
}
.dialog >>> .van-dialog__header {
  padding-top: 10px;
  border-bottom: 4px solid #f3f3f3;
}
.dialog ul li {
  padding: 20px 25px;
  box-sizing: border-box;
  position: relative;
  color: #333;
}
.dialog ul li:first-child {
  border-bottom: 1px solid #f6f6f6;
}
.dialog ul li img {
  width: 35px;
  height: 35px;
  vertical-align: middle;
  margin-right: 10px;
}
.dialog ul li .icon {
  vertical-align: middle;
  position: absolute;
  right: 15px;
  top: 30px;
  font-size: 26px;
  color: #999;
}
.dialog ul li .wx_text {
  font-size: 26px;
  line-height: 50px;
  vertical-align: middle;
}
</style>