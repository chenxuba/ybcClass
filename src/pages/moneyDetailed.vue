<template>
  <div class="box">
    <div class="mingxi mm" v-for="(item,index) in UserPriceMingxi" :key="index">
      <div class="fri">
        <div>{{item.remarks}}</div>
        <p>{{item.createtime}}</p>
        <p v-if="item.m_type == 20 && item.int_out == 2">购买学员</p>
        <p v-if="item.m_type == 20 && item.int_out == 1">零钱充值</p>
        <p v-if="item.m_type == 21">零钱充值</p>
        <p v-if="item.m_type == 23">打卡学堂购买</p>
        <p v-if="item.m_type == 17">软文购买</p>
        <p v-if="item.m_type == 19">礼物</p>
        <p v-if="item.m_type == 4 && item.int_out == 2">红包花费</p>
        <p v-if="item.m_type == 4 && item.int_out == 1">红包收入</p>
        <p v-if="item.m_type == 6">线下课程支付</p>
        <p v-if="item.m_type == 11">问答提问零钱退款</p>
        <p v-if="item.m_type == 14">视频购买</p>
        <p v-if="item.m_type == 9">问答提问</p>
        <p v-if="item.m_type == 10">问答围观</p>
        <p v-if="item.m_type == 18">打赏</p>
        <p v-if="item.m_type == 2">获取奖励</p>
        <p v-if="item.m_type == 3">提现成功</p>
      </div>
      <div class="sec sec1" v-if="item.int_out == 2">-{{item.money}}</div>
      <div
        class="sec sec1"
        v-if="item.int_out == 1"
        style="color: rgb(62, 226, 135);"
      >+{{item.money}}</div>
    </div>
    <van-divider
      :style="{ color: '#5dd6c7', borderColor: '#5dd6c7', padding: '0 16px' }"
      v-if="UserPriceMingxi != ''"
    >到底了～</van-divider>
    <div v-if="UserPriceMingxi == ''" class="none">
      <img src="../../static/img/noneMingxi.png" alt width="100%" />
      <span>暂无明细</span>
    </div>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqUserPriceMingxi } from "../api";
export default {
  data() {
    return {
      UserPriceMingxi: "",
      page: 1
    };
  },
  methods: {
    async getUserPriceMingxi() {
      const result = await reqUserPriceMingxi("", this.page);
      console.log(result);
      if (result.code == 1) {
        this.UserPriceMingxi = result.data;
      }
    }
  },
  mounted() {
    this.getUserPriceMingxi();
  }
};
</script>

<style scoped>
.box {
  padding: 0 26px;
  box-sizing: border-box;
}
.mm {
  padding: 10px 0;
  overflow: hidden;
  border-bottom: 2px solid #ececec;
  font-size: 0;
}

.fri {
  width: 85%;
  display: inline-block;
  vertical-align: middle;
  color: #333;
  padding-top: 30px;
}
.fri div {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
  line-height: 45px;
  font-size: 26px;
  color: #333;
}
.fri p {
  color: #a1a1a1;
  font-size: 24px;
  padding: 20px 0px 0px 0px;
}
.sec1 {
  color: #1c1f20;
}
.sec {
  width: 15%;
  display: inline-block;
  line-height: 140px;
  height: 140px;
  font-size: 26px;
  text-align: right;
  color: #333;
}
.none {
  text-align: center;
  font-size: 30px;
  color: #333;
  line-height: 80px;
}
</style>