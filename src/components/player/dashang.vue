<template>
  <div class="dashang">
    <div class="img_box">
      <img :src="ClassTimePlayer.headimgurl" alt />
      <span>打赏给导师</span>
      <div class="money">
        <van-grid :gutter="5" :column-num="3">
          <van-grid-item
            v-for="(item,index) in moneyList"
            :key="index"
            :text="item.money"
            :class="{active:index == current}"
            @click="tagClass(index)"
          />
        </van-grid>
        <span v-show="current == 0">2元也是爱</span>
        <span v-show="current == 1">5元是真爱</span>
        <span v-show="current == 2">10元是土豪</span>
        <span v-show="current == 3">送个20表心意</span>
        <span v-show="current == 4">50相识大鼓励</span>
        <span v-show="current == 5">100黄金大土豪</span>
      </div>
    </div>
    <div class="btn">
      <van-button type="primary" size="mini" round color="#ff6161" class="button">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ClassTimePlayer"],
  data() {
    return {
      moneyList: [
        { id: 1, money: "2元" },
        { id: 2, money: "5元" },
        { id: 3, money: "10元" },
        { id: 4, money: "20元" },
        { id: 5, money: "50元" },
        { id: 6, money: "100元" }
      ],
      current: 0
    };
  },
  methods: {
    tagClass(index) {
      this.current = index;
    }
  }
};
</script>

<style scoped>
.dashang {
  height: 520px;
  background: url("../../../static/img/background01.png") no-repeat;
  background-size: 100%;
  background-position: top;
  padding-bottom: 40px;
}
.dashang .img_box {
  width: 100%;
  padding-top: 80px;
  text-align: center;
}
.dashang .img_box img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.dashang .img_box span {
  font-size: 24px;
  display: block;
  margin-top: -10px;
  color: #333;
}
.dashang .money {
  padding: 0 50px;
}
.dashang .money >>> .van-grid-item {
  margin: 20px 0px 20px 0;
}
.dashang .money >>> .van-grid-item__content {
  padding: 5px;
}
.dashang .money >>> .van-grid-item__content .van-grid-item__text {
  font-size: 26px;
}
.active >>> .van-grid-item__content {
  background: #ff6161;
}
.active >>> .van-grid-item__content .van-grid-item__text {
  color: #fff;
}
.dashang .btn {
  text-align: center;
}
.dashang .btn .button {
  padding: 0 60px;
  height: 55px;
}
.dashang .money span {
  margin-top: 10px;
  transform: scale(0.8);
  color: #34c2c4;
}
</style>