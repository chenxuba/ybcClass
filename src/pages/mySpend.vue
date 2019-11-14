<template>
  <div class="mySpend">
    <!-- 顶部全部收益展示 -->
    <div class="m-top">
      <div class="chongzhi">
        <!-- <van-button type="primary" to="/recharge" class="btn" size="small" round>全部</van-button> -->
      </div>
      <div class="money">
        <p>
          <img src="../../static/img/icon_i11.png" alt />
        </p>
        <p>¥259.11</p>
        <p>累计花费</p>
      </div>
      <div class="tixian">
        <!-- <van-button type="primary" class="btn" size="small" round>收益</van-button> -->
      </div>
    </div>
    <!-- 收益明细 -->
    <div class="item_box">
      <div class="item" v-for="item in 8" :key="item">
        <div class="left">
          <p class="item_txt">打赏花费</p>
          <p class="item_time">2019-07-15 17:29:30</p>
        </div>
        <div class="right">-1.00</div>
      </div>
    </div>
    <!-- 返回按钮 -->
       <goBack></goBack>

  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.mySpend {
  width: 100%;
}
.mySpend .m-top {
  width: 100%;
  background: #5dd6c7;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}


.mySpend .m-top .money p {
  margin: 30px 80px;
}
.mySpend .m-top .money p:nth-child(2) {
  font-size: 46px;
  color: #fff;
}
.mySpend .m-top .money p:nth-child(3) {
  font-size: 28px;
  color: #fff;
}
.mySpend .m-top .money img {
  width: 80px;
  height: 80px;
}
/* 收益明细 */
.mySpend .item_box {
  width: 100%;
}
.mySpend .item_box .item {
  width: 100%;
  height: 130px;
  display: flex;
  padding: 0 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
.mySpend .item_box .item .left {
  width: 80%;
}
.mySpend .item_box .item .right {
  flex: 1;
  color: red;
  font-size: 24px;
  line-height: 130px;
  text-align: right;
}
.mySpend .item_box .item .left .item_txt {
  font-size: 30px;
  color: #333;
  margin-top: 30px;
}
.mySpend .item_box .item .left .item_time {
  font-size: 24px;
  margin-top: 20px;
  color: #999;
}


</style>