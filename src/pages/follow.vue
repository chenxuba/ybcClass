<template>
  <div class="follow">
    <!-- 搜索框 -->
    <van-row class="input">
      <van-col span="24" class="input_search">
        <van-search placeholder="请输入搜索关键词" v-model="value" show-action>
          <div slot="action" @click="$router.go(-1)">返回</div>
        </van-search>
      </van-col>
    </van-row>
    <!-- 列表 -->
    <div class="list">
      <!-- <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
        :immediate-check="false"
      >-->
      <cellView v-for="(item,index) in List" :key="index" :FollowObj="item" @event="cancelGuanzhu"></cellView>
      <!-- </van-list> -->
    </div>
  </div>
</template>

<script>
import cellView from "../components/follow/cellView";
import { reqFollow, reqTeacherGuanzhu } from "../api";
export default {
  data() {
    return {
      value: "",
      List: [],
      allList: [],
      loading: false,
      finished: false,
      user_id: localStorage.getItem("user_id")
    };
  },
  methods: {
    filterData() {
      this.List = this.allList.filter(res => {
        return res.name.indexOf(this.value) != -1;
      });
    },
    // 获取列表
    async getFollow() {
      const result = await reqFollow();
      this.List = result.data.data;
      this.allList = result.data.data;
    },
    // 上拉加载更多
    // async onLoad() {
    //   const result = await reqFollow();
    //   this.allList = result.data.data;
    //   let count = result.data.count;
    //   if (result.data.data.length > 0) {
    //     result.data.data.forEach(item => {
    //       this.List.push(item);
    //     });
    //   }
    //   // 加载状态结束
    //   this.loading = false;
    //   // 数据全部加载完成
    //   if (this.List.length >= count) {
    //     this.finished = true;
    //   }
    // },
    //取消关注
    async cancelGuanzhu(id) {
      const result = await reqTeacherGuanzhu("", id, "0");
      if (result.code == 1) {
        this.$toast(result.msg);
        this.getFollow();
      } else if (result.code == -1) {
        this.$toast(result.msg);
        this.getFollow();
      }
    }
  },
  watch: {
    value() {
      this.filterData();
    }
  },

  components: {
    cellView
  },
  mounted() {
    this.getFollow();
  }
};
</script>

<style scoped>
.follow {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
/* 列表 */
.follow .list {
  width: 100%;
  height: 100%;
}
</style>