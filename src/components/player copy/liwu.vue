<template>
  <div class="liwu">
    <van-grid :column-num="4" :border="false" :clickable="true">
      <van-grid-item
        icon="https://kf.ybc365.com/train/Public/train/user/live/img/reward.png"
        text="打赏"
        @click="ShowDashang"
      />
      <van-grid-item
        v-for="(item,index) in liwuList"
        :key="index"
        :icon="item.present_img"
        :text="item.meaning"
        @click="change(item,index)"
        :class="{'click':index==clickIndex}"
        :info="'¥'+item.money"
      />
    </van-grid>
    <!-- 合计金额，赠送按钮区域 -->
    <div class="heji" v-show="show">
      <div class="left">
        <span>数量：</span>
        <van-stepper v-model="multiply" class="step" />
      </div>
      <div class="right">
        <span>总金额：</span>
        <span>¥{{price.toFixed(2)}}</span>
        <span>
          <van-button type="primary" size="small" @click="dialog">赠送</van-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLiwu } from "../../api";
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
  props: ["liwuList"],
  data() {
    return {
      res_id: this.$route.params.id,
      money: "", //礼物总金额
      show: false, //赠送按钮区域
      clickIndex: -1,
      clickIndex2: -1,
      liwuId: "",
      multiply:1//倍数
    };
  },
  methods: {
    change(item, index) {
      this.liwuId = item.id;
      this.money = item.money;
      this.show = true;
      this.clickIndex = index;
      this.clickIndex2 = -1;
    },
    
    dialog() {
      this.$emit("showPay",this.liwuId,this.multiply);
    },
    ShowDashang() {
      this.$emit("dashang");
    }
  },
  mounted() {},
  computed: {
    price() {
      this.$store.commit("setLiwuTotalPrice", this.money * this.multiply);
      return this.money * this.multiply;
    },
     ...mapState(["LiwuTotalPrice"])
  }
};
</script>

<style scoped>
.liwu {
  width: 100%;
  font-size: 28px;
}
.liwu .van-swipe {
  height: 520px;
  width: 750px;
}
.liwu >>> .van-grid {
  /* background: red; */
  width: 100%;
}
.liwu .heji {
  width: 100%;
  height: 130px;
  /* background: red; */
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 30px;
  box-sizing: border-box;
  line-height: 100px;
}
.liwu .heji .left {
  height: 100%;
  display: flex;
}
.liwu .heji .step {
  margin-left: 10px;
  margin-right: 20px;
}
.liwu .heji .step >>> input {
  background: #fff;
  line-height: 30px;
}
.liwu .heji .step >>> button {
  background: #f6f6f6;
}
.liwu .heji .right {
  flex: 1;
  text-align: right;
  /* background: greenyellow; */
}

.click {
  background-color: rgba(255, 255, 255, 0.22);
}

.liwu >>> .van-grid-item__content {
  background-color: transparent;
}
.liwu >>> .van-grid-item__text {
  color: #fff;
}
</style>


