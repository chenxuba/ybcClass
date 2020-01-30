<template>
  <div class="video">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!--直播列表-->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="10"
      >
        <van-row class="list_box" gutter="2">
          <cellView v-for="(item,index) in video" :key="index" :videoObj="item"></cellView>
        </van-row>
      </van-list>
    </van-pull-refresh>
    <div class="zhanwei"></div>
  </div>
</template>

<script>
import { reqLivePage } from "../api/index";
import cellView from "../components/video/cellView";
export default {
  data() {
    return {
      video: [],
      page: 0,
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  methods: {
    // //触发请求，直播区列表
    async onLoad() {
      this.page++;
      const result = await reqLivePage("", this.page);
      // console.log(result);
      if (result.code == 1) {
        result.data.forEach(item => {
          this.video.push(item);
        });
        // 加载状态结束
        this.loading = false;
      } else if (result.code == -3) {
        this.finished = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      let num = 0;
      const result = await reqLivePage("", num);
      if (result.code == 1) {
        this.video = result.data;
        this.$toast("刷新成功");
        this.isLoading = false;
        this.finished = false;
        this.page = 0;
      }
    }
  },
  mounted() {
    // this.getLive();
    this.onLoad();
  },
  components: {
    cellView
  }
};
</script>

<style scoped>
.video {
  width: 100%;
  height: calc(100% - 200px);
  padding: 5px 5px 0 5px;
  box-sizing: border-box;
}
.zhanwei {
  height: 100px;
}
</style>