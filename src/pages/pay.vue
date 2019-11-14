<template>
  <div class="course_pay" v-height>
    <div class="top">
      <span>订单总额</span>
      <span>{{money}}元</span>
    </div>
    <!-- 支付方式 -->
    <div class="pay_item">
      <p>选择支付方式:</p>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="支付宝支付" icon="alipay" icon-size="46px" clickable @click="radio = '1'">
            <van-radio slot="right-icon" name="1" checked-color="#5dd6c7" />
          </van-cell>
          <van-cell title="微信支付" icon="wechat" clickable @click="radio = '2'">
            <van-radio slot="right-icon" name="2" checked-color="#5dd6c7" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="btn">
      <van-button type="primary" size="large" color="#5dd6c7" @click="wxPay" round>立即支付</van-button>
    </div>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqWxPay } from "../api/index";
import { isWx, isIos } from "../util";
import { Toast } from "vant";
import router from "../router";
export default {
  data() {
    return {
      id: this.$route.params.id,
      money: this.$route.query.money,
      radio: "2",
      type: this.$route.query.type
    };
  },
  methods: {
    async wxPay() {
      if (this.radio == "1") {
        console.log("调用支付宝支付");
      } else {
        console.log("调用微信支付");
        if (isWx()) {
          const result = await reqWxPay("", this.id, this.type);
          // console.log(result);
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
              // console.log(res);
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                Toast.success("支付成功");
                this.$router.push({
                  path: "/payOver",
                  query: {
                    id: this.id,
                    type: this.type
                  }
                });
              } else {
                return;
              }
            }
          );
        } else {
          console.log("不是微信浏览器");
        }
      }
    }
  },

  created() {
    isIos();
  }
};
</script>

<style scoped>
.course_pay {
  width: 100%;
  background-color: #f6f6f6;
}
.course_pay .top {
  width: 100%;
  height: 100px;
  background: #fff;
  margin: 20px 0;
  line-height: 100px;
  font-size: 36px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
}
.course_pay .top span:nth-child(1) {
  color: #999;
}
.course_pay .top span:nth-child(2) {
  color: red;
}
/* 支付方式 */
.course_pay .pay_item {
  width: 100%;
  /* height: 270px; */
  background: #fff;

  border-top: 1px solid #e9eaec;
}
.course_pay .pay_item p {
  font-size: 30px;
  color: #999;
  box-sizing: border-box;
  padding: 0 20px;
  line-height: 80px;
  border-bottom: 1px solid #e9eaec;
  margin: 0;
}

.van-icon.van-icon-wechat {
  font-size: 45px;
  color: rgb(64, 219, 98);
}
.van-icon.van-icon-alipay {
  font-size: 45px;
  color: rgb(65, 187, 243);
}
.van-submit-bar__text {
  text-align: left;
  padding-left: 20px;
}
.btn {
  padding: 100px 80px;
}
</style>