<template>
  <div class="moduleDetail">
    <van-tabs v-model="label_id" sticky>
      <van-tab v-for="(item,index) in lable" :key="index" :name="item.id">
        <div slot="title" @click="getID(item.id)">{{item.name}}</div>
        <div class="content">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <Moreword :word="word"></Moreword>
          </van-list>
        </div>
        <!-- 返回按钮 -->
        <goBack></goBack>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Moreword from "../components/word/Moreword";
import { reqWordLable, reqMoreResource } from "../api/index";
export default {
  data() {
    return {
      active: 0,
      label_id: this.$route.query.label_id,
      lable: [],
      type: this.$route.query.type,
      word: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  components: {
    Moreword
  },
  methods: {
    goDetails(id) {
      this.$router.push(`/courseDetail/${id}`);
    },
    async getID(id) {
      // console.log(id);
      this.page = 1;
      this.loading = false;
      this.finished = false;
      const result = await reqMoreResource("", id, this.type, this.page);
      // console.log(result);
      if (result.code == 1) {
        this.word = result.data;
      } else if (result.code == -8) {
        this.word = "";
      }
    },
    // 获得分类
    async getLable() {
      const result = await reqWordLable();
      // console.log(result);
      if (result.code == 1) {
        this.lable = result.data;
      }
    },
    // 进入就请求默认的分类数据
    async getWord() {
      const result = await reqMoreResource(
        "",
        this.label_id,
        this.type,
        this.page
      ); //从1开始
      // console.log(result);
      if (result.code == 1) {
        this.word = result.data;
      } else if (result.code == -8) {
        this.word = "";
      }
    },
    // 上拉加载
    async onLoad() {
      this.page++;
      const result = await reqMoreResource(
        "",
        this.label_id,
        this.type,
        this.page
      );
      console.log(result);
      if (result.code == 1) {
        result.data.forEach(item => {
          this.word.push(item);
        });
      }
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (result.code != 1) {
        this.finished = true;
      }
    }
  },
  mounted() {
    this.getLable();
    this.getWord();
  }
};
</script>

<style scoped>
.moduleDetail {
  width: 100%;
}
.moduleDetail .content {
  padding-top: 90px;
}
</style>