<template>
  <div class="myFans">
    <!-- 搜索 -->
    <div class="top">
      <van-search
        v-model="Searchvalue"
        placeholder="请输入粉丝名字"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <!-- 当前粉丝 -->
    <div class="contbox">
      <div class="title title2">
        <div class="title_txt">
          <span>当前粉丝：{{myFans.count}}</span>
        </div>
        <div class="title_img">
          <span>筛选</span>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
    </div>
    <!-- 粉丝列表 -->
    <div class="cellContent">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <cellView v-for="(item,index) in myFansInfo" :key="index" :fansObj="item"></cellView>
      </van-list>
    </div>

    <goBack></goBack>
  </div>
</template>

<script>
import { reqMyFans } from "../api";
import cellView from "../components/myFans/cellView";
export default {
  data() {
    return {
      Searchvalue: "",
      page: 0, //从第二页开始加载
      myFans: {},
      myFansInfo: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onSearch() {},
    // 上拉加载更多
    async onLoad() {
      this.page++;
      const result = await reqMyFans("", this.page);
      this.myFans = result.data;
      if (result.data.info.length > 0) {
        result.data.info.forEach(item => {
          this.myFansInfo.push(item);
        });
      }
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.myFansInfo.length >= this.myFans.count) {
        this.finished = true;
      }
    }
  },

  components: {
    cellView
  }
};
</script>

<style scoped>
.myFans {
  width: 100%;
  /* overflow: hidden; */
}
.myFans .top {
  border-bottom: 15px solid #f6f6f6;
}
.myFans .contbox {
  padding: 0 30px 0 40px;
  box-sizing: border-box;
}
.myFans .contbox .title {
  width: 100%;
  height: 120px;
  background: #fff;
  display: flex;
  line-height: 100px;
  border-bottom: 1px solid #f1f1f1;
}
.myFans .contbox .title2 {
  height: 100px;
}
.myFans .contbox .title .title_txt {
  font-size: 28px;
  color: #333;
  width: 40%;
  margin-top: 10px;
}
.myFans .contbox .title .title_img {
  width: 60%;
  text-align: right;
}
.myFans .contbox .title .title_img span {
  font-size: 26px;
  color: #a1a1a1;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 60%;
  display: inline-block;
}

.myFans .contbox .title .title_img .title_icon {
  font-size: 28px;
  color: #ccc;
  vertical-align: middle;
}
</style>