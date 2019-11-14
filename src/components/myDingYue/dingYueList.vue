<template>
  <div>
    <van-row class="box-warp">
      <van-col span="24" class="hot_warp">
        <van-row type="flex" justify="space-between" class="warp1">
          <van-col span="6" class="title">我的订阅</van-col>
          <van-col span="6" class="more" @click="$router.go(-1)">返回</van-col>
        </van-row>
      </van-col>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="20"
      >
        <cellView v-for="(item,index) in dingYueList" :key="index" :dingYueListObj="item"></cellView>
      </van-list>
    </van-row>
  </div>
</template>

<script>
import cellView from "../../grandson/dingYueList/cellView";
export default {
  props: ["dingYueList"],
  data() {
    return {
      loading: false,
      finished: false
    };
  },
  components: {
    cellView
  },
  methods: {
    onLoad() {
      this.$emit("pullDown");
    }
  }
};
</script>

<style scoped>
.box-warp {
  padding: 20px 25px 0 25px;
}
.hot_warp {
  background: #fff;
  font-weight: normal;
  box-sizing: border-box;
  margin-bottom: 30px;
}
.warp1 .title {
  text-align: left;
  position: relative;
  padding-left: 20px;
  box-sizing: border-box;
  font-size: 28px;
  color: #333;
}
.warp1 .title::after {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0px;
  left: 5px;
  width: 6px;
  height: 90%;
  background: orange;
}
.warp1 .more {
  text-align: right;
  font-size: 26px;
  color: #aaa;
}
</style>