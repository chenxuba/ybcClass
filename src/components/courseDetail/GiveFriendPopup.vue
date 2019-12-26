<template>
  <div>
    <van-popup v-model="isShowGiveFriend" class="GiveFriend-popup">
      <p>豪爽赠送朋友</p>
      <div class="gf-num">赠送数量:</div>
      <ul class="gf-num-box">
        <li
          class="num-item"
          v-for="(item,index) in 6"
          :key="index"
          :class="{active:index == current}"
          @click="tagClass(index)"
        >{{index + 1}}</li>
      </ul>
      <div class="gf-count">
        <span>豪爽赠送:</span>
        <van-stepper v-model="gf_count" />
      </div>
      <!-- 合计 -->
      <div class="gf-total">
        <div class="asdgf">好友可免费领取,有效期永久</div>
        <div class="asdgf">
          合计:
          <span class="text-black">￥{{(price * gf_count).toFixed(2)}}</span>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
        <van-button
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          size="normal"
          class="btn-gf"
          @click="TotalGive"
        >打包赠送{{gf_count}}份</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["price",'type'],
  data() {
    return {
      isShowGiveFriend: false, //是否显示赠送好友弹出框
      gf_count: "1", //默认赠送数量
      current: 0,
      id: this.$route.params.id, //上一级传过来的id，通过id去找详情资源
    };
  },
  methods: {
    //动态绑定class
    tagClass(index) {
      this.current = index;
      this.gf_count = index + 1;
    },
    TotalGive() {
      this.$router.push({
        path: "/pay/" + this.id,
        query: {
          money: this.gf_count * this.price,
          type: this.type,
          multiply:this.gf_count,
          m_type:2
        }
      });
    }
  },
  watch: {
    gf_count(newValue, oldValue) {
      this.current = newValue - 1;
    }
  }
};
</script>

<style scoped>
/* 弹出框css */
.GiveFriend-popup {
  width: 70%;
  font-size: 34px;
  border-radius: 10px;
  padding: 10px 20px 60px 20px;
  color: #333;
}
.GiveFriend-popup p {
  margin: 0;
  text-align: center;
  line-height: 100px;
  font-size: 36px;
}
.GiveFriend-popup .gf-num {
  font-size: 28px;
  margin-bottom: 20px;
}
.gf-num-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 2px solid #eeeff1;
}

.gf-num-box .active {
  border: 2px solid #4bb0ff;
  background: linear-gradient(to right, #4bb0ff, #6149f6) !important;
  color: #fff;
}
.gf-num-box > li {
  display: inline-block;
  margin: 0 0 30px 0;
}
.num-item {
  width: 30.5%;
  height: 70px;
  border-radius: 6px;
  border: 2px solid #969696;
  line-height: 70px;
  text-align: center;
}
.gf-count {
  display: flex;
  padding: 30px 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #eeeff1;
}
.gf-count span {
  font-size: 28px;
}
.gf-total {
  padding: 30px 0;
  border-bottom: 2px solid #eeeff1;
  font-size: 24px;
  color: #999;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-black {
  color: red;
  font-size: 32px;
}
.btn-gf {
  width: 100%;
  border-radius: 60px;
}
.btn-box {
  padding: 40px 20px 0 20px;
}
</style>