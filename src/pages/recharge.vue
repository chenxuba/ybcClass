<template>
  <div class="recharge">
    <!-- top -->
    <div class="recharge-top">
      <p>零钱余额</p>
      <h1>¥259.11</h1>
    </div>
    <!-- center -->
    <div class="recharge-center">
      <span
        v-for="(item,index) in price"
        :key="index"
        @click="tagClass(index,item)"
        :class="{active:index == current}"
      >{{item}}元</span>
    </div>
    <!-- 自定义金额 -->
    <div class="constom-money">
      <p class="constom-money-btn tip">自定义金额：</p>
      <input
        type="number"
        maxlength="8"
        placeholder="请输入充值的金额"
        class="constom-money-enter"
        v-model="recharge_price"
        @blur="clear"
        @focus="clear"
      />
      <span class="tip">元</span>
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <van-button plain hairline size="large" class="btn-01" round @click="recharge">立即充值</van-button>
      <van-button plain hairline size="large" class="btn-02" round @click="$router.go(-1)">取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: ["10", "20", "50", "100", "200", "500"],
      current: 0,
      recharge_price: 10
    };
  },
  methods: {
    tagClass(index, item) {
      this.current = index;
      this.recharge_price = item;
      // console.log(this.recharge_price);
    },
    recharge() {
      // console.log(this.recharge_price);
    },
    clear() {
      this.current = 10000;
    }
  }
};
</script>

<style scoped>
.recharge {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}
.recharge .recharge-top {
  width: 100%;
  height: 250px;
  border-radius: 10px;
  text-align: center;
  background-image: url("../../static/img/person02.png");
  background-size: 100% 100%;
  background-position: center;
  box-shadow: 0 0 14px 0 #1ad473;
}
.recharge .recharge-top p {
  font-size: 30px;
  color: #fff;
  padding-top: 60px;
}
.recharge .recharge-top h1 {
  font-size: 50px;
  color: #fff;
  line-height: 120px;
  /* font-weight: bold; */
}
.recharge .recharge-center {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
  background-color: #f9f9fa;
  box-sizing: border-box;
  margin-top: 30px;
}
.recharge .recharge-center span {
  width: 170px;
  height: 74px;
  text-align: center;
  line-height: 74px;
  margin-bottom: 30px;
  border: 2px solid #e2e2e2;
  border-radius: 12px;
  font-size: 32px;
  color: #333;
}
.constom-money {
  display: flex;
  padding: 0 40px;
  border-top: 2px solid #e2e2e2;
  border-bottom: 2px solid #e2e2e2;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  margin-top: 30px;
  color: #333;
}
.tip {
  color: #242424;
  font-size: 30px;
}
.constom-money-enter {
  height: 76px;
  font-size: 32px;
  text-indent: 20px;
  border: none;
  background: #fff;
}
.recharge .btn .btn-01 {
  background-color: #5dd6c7;
  color: #fff;
  margin-top: 80px;
}
.recharge .btn .btn-02 {
  border: 1px solid #5dd6c7;
  color: #5dd6c7;
  margin-top: 50px;
}
/* 选中的样式 */
.active {
  border: 2px solid #5dd6c7 !important;
  background: rgba(72, 236, 151, 0.1);
}
</style>