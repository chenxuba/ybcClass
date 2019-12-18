<template>
  <div class="openStudent" v-height>
    <!-- 顶部userinfo -->
    <div class="bg_box">
      <img class="img01" :src="userinfo.headimgurl" v-if="userinfo.headimgurl" />
      <img class="img01" src="https://kf.ybc365.com/train/Public/train/img/pic01.png" v-else />
      <div class="text">
        <p class="p01">{{userinfo.name || '昵称正在初始化...'}}</p>
        <p class="p02">有效期：{{userinfo.endtime || '无'}}</p>
      </div>
      <!-- <img
        src="https://kf.ybc365.com/train/Public/train/user/common/img/jt_right.png"
        class="img02"
      />-->
    </div>
    <!-- vip学员 -->
    <p class="taocan">VIP学员</p>
    <!-- 学员费列表 -->
    <div class="rows">
      <van-skeleton :row="6" :loading="loading" row-width="100%" class="skeleton">
        <div class="stuList" v-for="(item,index) in Price_list" :key="index">
          <van-row class="row">
            <van-col
              span="12"
              class="span"
            >{{item.validity_time}}{{item.validity_time_unit == 1 ? '个月' : '年'}}VIP学员费</van-col>
            <van-col span="4" class="span price">¥ {{item.price}}</van-col>
            <van-col span="8" class="span kaitong">
              <span
                :class="active == index ? 'active' : ''"
                @click="open(item,index)"
              >{{student == 0?'开通':'续费'}}</span>
            </van-col>
          </van-row>
        </div>
      </van-skeleton>
    </div>
    <!-- 高级特权 -->
    <div class="tequan">
      <van-row class="line">
        <van-col span="2">
          <img src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_h4.png" alt />
        </van-col>
        <van-col span="13">
          <span class="span1">学员服务协议</span>
        </van-col>
        <van-col span="7" class="right">
          <span class="span2" @click="goMemberXieyi">高级特权</span>
        </van-col>
        <van-col span="2">
          <van-icon name="arrow" class="img" />
        </van-col>
      </van-row>
    </div>
    <!-- 支付方式 -->
    <div class="pay_item">
      <div class="btn">
        <van-button type="primary" size="large" round color="#5dd6c7" @click="GoPay()">立即支付</van-button>
      </div>
    </div>
    <goBack></goBack>
    <goHome></goHome>
  </div>
</template>

<script>
import { reqStuOpen } from "../api/index";
export default {
  data() {
    return {
      active: 0,
      id: "",
      radio: "2",
      userinfo: "",
      Price_list: "",
      endtime: "",
      student: "",
      type: 3,
      price: "",
      loading: true
    };
  },
  methods: {
    open(item, index) {
      this.active = index;
      this.id = item.id;
      this.price = item.price;
    },
    GoPay() {
      this.$router.push({
        path: `/pay/${this.id}`,
        query: { money: this.price, type: this.type }
      });
    },
    async getStu() {
      const result = await reqStuOpen();
      // console.log(result);
      this.userinfo = result.data.user_info;
      this.Price_list = result.data.platform_info;
      this.id = result.data.platform_info[0].id;
      this.endtime = result.data.user_info.endtime;
      this.student = result.data.student;
      this.price = result.data.platform_info[0].price;
      this.loading = false
    },
    // 跳转到特权页面
    goMemberXieyi(){
      this.$router.push("/memberXieyi")
    }
  },
  mounted() {
    this.getStu();
  }
};
</script>

<style scoped>
.openStudent {
  width: 100%;
  background-color: #efeff5;
}
/* 顶部userinfo */
.openStudent .bg_box {
  width: 100%;
  height: 120px;
  padding: 40px 0;
  background-color: #5dd6c7;
}
.openStudent .bg_box > * {
  display: inline-block;
  vertical-align: middle;
}
.openStudent .bg_box .img01 {
  width: 120px;
  height: 120px;
  margin: 0 30px;
  border-radius: 50%;
}
.openStudent .bg_box .text {
  width: 63%;
}
.openStudent .bg_box .p01 {
  font-size: 30px;
  line-height: 60px;
  margin: 0;
}
.openStudent .bg_box .p02 {
  font-size: 26px;
  margin: 0;
}
.openStudent .bg_box p {
  color: #fff;
  line-height: 40px;
}
.openStudent .bg_box .img02 {
  width: 4%;
  max-width: 16px;
  float: right;
  margin: 40px 5% 0 0;
}
/* vip学员 */
.openStudent .taocan {
  font-size: 28px;
  color: #a1a1a1;
  line-height: 60px;
  padding-left: 26px;
  margin: 0;
}
/* 学员费列表 */
.openStudent .stuList {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.openStudent .stuList .row {
  padding: 0 60px 0 30px;
  box-sizing: border-box;
}
.openStudent .stuList .row .span {
  font-size: 28px;
}
.openStudent .stuList .row .span.price {
  color: rgb(254, 100, 55);
}
.openStudent .stuList .row .span.kaitong {
  text-align: right;
}
.openStudent .stuList .row .span.kaitong span {
  background-color: #b0b0b0;
  padding: 3px 25px;
  color: #fff;
  border-radius: 100px;
  font-size: 26px;
  box-sizing: border-box;
}
.openStudent .stuList .row .span.kaitong span.active {
  background-color: #5dd6c7;
}
/* 高级特权 */
.openStudent .tequan {
  width: 100%;
  /* height: 80px; */
  background-color: #fff;
  margin: 30px 0;
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 80px;
}
.openStudent .tequan .line img {
  width: 30px;
  vertical-align: middle;
}
.openStudent .tequan .line span.span1 {
  color: #b0b0b0;
  font-size: 26px;
  vertical-align: middle;
}
.openStudent .tequan .line span.span2 {
  font-size: 24px;
  margin-left: 100px;
  vertical-align: middle;
}
.openStudent .tequan .line .right {
  text-align: center;
  color: #5dd6c7;
}
.openStudent .tequan .line .img {
  font-size: 30px;
  color: #ccc;
  vertical-align: middle;
  margin-top: -2px;
}

.openStudent .pay_item .btn {
  padding: 60px 60px 0 60px;
  background-color: #efeff5;
  box-sizing: border-box;
}
.openStudent .rows {
  height: 400px;
  background-color: #fff;
}
.skeleton{
  padding-top: 50px;
}
</style>