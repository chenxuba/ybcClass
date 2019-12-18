<template>
  <div class="myMoney">
    <!-- 顶部零钱展示 -->
    <div class="m-top">
      <div class="chongzhi">
        <van-button type="primary" to="/recharge" class="btn" size="small" round>充值</van-button>
      </div>
      <div class="money">
        <p>
          <img src="../../static/img/icon_i11.png" alt />
        </p>
        <p>¥{{dataMsg.total.money || '000.00'}}</p>
        <p>我的零钱</p>
      </div>
      <div class="tixian" v-if="dataMsg.is_withdrawals == 0">
        <!-- 不能提现 -->
        <van-button type="primary" class="btn" size="small" round @click="noCan">提现</van-button>
      </div>
      <div class="tixian" v-if="dataMsg.is_withdrawals == 1">
        <!-- 可以提现 -->
        <van-button type="primary" class="btn" size="small" round @click="CanTixian">提现</van-button>
      </div>
    </div>
    <!-- 收益、花费、明细 -->
    <!-- 列表导航 -->
    <div class="contbox">
      <div v-for="(item,index) in List" :key="index">
        <div style="border-bottom: 1px solid #f8f8f8;">
          <router-link :to="item.path">
            <div class="cont" style="border-bottom: 1px solid rgb(225, 225, 225);">
              <div class="cont-left">
                <img :src="item.img" class="tu04" />
                <span>{{item.title}}</span>
              </div>
              <img src="../../static/img/icon_b9_32.png" class="tu03" alt />
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 返回按钮 -->
    <goBack></goBack>
  </div>
</template>

<script>
import { reqUserPrice } from "../api";
import { Toast } from "vant";
export default {
  data() {
    return {
      List: [
        // {
        //   img: require("../../static/img/icon_i2.png"),
        //   title: "我的收益",
        //   path: "/myProfit"
        // },
        // {
        //   img: require("../../static/img/icon_i3.png"),
        //   title: "我的花费",
        //   path: "/mySpend"
        // },
        {
          img: require("../../static/img/icon_i2.png"),
          title: "零钱明细",
          path: "/moneyDetailed"
        }
      ],
      dataMsg: {
        total: {}
      } //用户零钱信息
    };
  },
  methods: {
    async getUserPrice() {
      const result = await reqUserPrice();
      if (result.code == 1) {
        console.log(result);
        this.dataMsg = result.data;
      }
    },
    // 不支持提现
    noCan() {
      Toast("暂时不支持提现，请联系管理员");
    },
    // 可以提现
    CanTixian(){
      this.$router.push("/tixianPage")
    }
  },
  mounted() {
    this.getUserPrice();
  }
};
</script>

<style scoped>
.myMoney {
  width: 100%;
  height: 100%;
}
.myMoney .m-top {
  width: 100%;
  background: #5dd6c7;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}
.myMoney .m-top .btn {
  background: rgba(255, 255, 255, 0.2);
  border: 0;
  width: 150px;
  font-size: 34px;
}
.myMoney .m-top .chongzhi {
  line-height: 160px;
}
.myMoney .m-top .tixian {
  line-height: 160px;
}
.myMoney .m-top .money p {
  margin: 30px 80px;
}
.myMoney .m-top .money p:nth-child(2) {
  font-size: 46px;
  color: #fff;
}
.myMoney .m-top .money p:nth-child(3) {
  font-size: 28px;
  color: #fff;
}
.myMoney .m-top .money img {
  width: 80px;
  height: 80px;
}
/* 列表 */
.myMoney .contbox {
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.myMoney .contbox a {
  color: #f6f6f6;
}
.myMoney .contbox a:last-child .cont {
  border: 0 !important;
}
.myMoney .contbox .cont {
  width: 90%;
  height: 110px;
  line-height: 110px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.myMoney .contbox .cont .cont-left {
  float: left;
  width: 50%;
}
.myMoney .contbox .cont .cont-left .tu04 {
  width: 15%;
  max-width: 40px;
  margin-right: 34px;
  vertical-align: middle;
}
.myMoney .contbox .cont .cont-left span {
  font-size: 28px;
  color: #333;
  vertical-align: middle;
}
.myMoney .contbox .cont .tu03 {
  float: right;
  width: 14px;
  margin-top: 46px;
  margin-left: 3%;
}
</style>