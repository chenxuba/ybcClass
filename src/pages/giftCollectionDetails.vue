<template>
  <div class="warp" v-height>
    <div class="all-content">
      <img
        src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/member_wx_headimg/15773563629861718299_1.jpg"
        class="person-img"
      />
      <div class="content-bottom">
        <p class="rad-topic">像条狗一样活着的bigOld课时</p>
        <p class="rad-topic02">测试课时，学员微信支付</p>
        <img
          src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/s_1/user/487/15730961673946016432_1.png"
          class="color-img"
        />
        <p class="rad-name">讲师: Evil</p>
        <p class="rad-time">时间: 2019-12-26 15:40:37</p>
        <p class="rad-price">￥0.02</p>
        <p class="have-pay">已付款</p>
        <button class="sure-btn">领取赠礼</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGiftlingquDetail } from "../api";
export default {
  data() {
    return {
      type: this.$route.query.type,
      g_id: this.$route.query.g_id
    };
  },
  methods: {
    getGiftlingquDetail() {
        
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
.all-content {
  width: 80%;
  margin-left: 5%;
  background: #fff;
  text-align: center;
  box-sizing: border-box;
  margin: auto;
  height: 80%;
  border-radius: 10px;
}
.person-img {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  top: -60px;
}
.content-bottom {
  position: relative;
  top: -40px;
  box-sizing: border-box;
  padding: 0 40px;
}
.rad-topic {
  font-size: 24px;
  color: #888888;
}
.rad-topic02 {
  font-size: 30px;
  color: #333333;
  margin-top: 30px;
  font-weight: bold;
  letter-spacing: 1px;
}
.color-img {
  width: 90%;
  border-radius: 10px;
  margin-top: 28px;
  max-height: 400px;
  object-fit: cover;
}
.rad-name {
  color: #333;
  font-size: 26px;
  margin-top: 28px;
}
.rad-time {
  color: #333;
  font-size: 26px;
  margin-top: 28px;
}
.rad-price {
  color: #888888;
  font-size: 34px;
  margin-top: 30px;
  font-weight: bold;
  text-decoration: line-through;
}
.have-pay {
  margin-top: 24px;
  font-size: 26px;
  color: #888888;
}
.sure-btn {
  font-size: 28px;
  color: #ffffff;
  background: #1ad473;
  border-radius: 40px;
  margin: 60px 0;
  min-width: 60%;
  height: 70px;
  line-height: 70px;
  border: none;
  outline: none;
}
.warp {
  width: 100%;
  background: #eeeff1;
  padding-top: 130px;
  box-sizing: border-box;
  text-align: center;
}
</style>