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
            <MoreCourse :course="course"></MoreCourse>
          </van-list>
        </div>
        <!-- 返回按钮 -->
        <goBack></goBack>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NumberGrow from "../components/numberGrow/numberGrow";
import MoreCourse from "../components/hotCourse/MoreCourse";
import { reqLable, reqMoreResource } from "../api/index";
export default {
  data() {
    return {
      active: 0,
      label_id: this.$route.query.label_id,
      type: this.$route.query.type,
      lable: [],
      course: [],
      page:1,
      loading: false,
      finished: false
    };
  },
  components: {
    NumberGrow,
    MoreCourse
  },
  methods: {
    async getID(id) {
      // console.log(id);
      this.page = 1;
      this.loading = false;
      this.finished = false;
      const result = await reqMoreResource("", id, this.type, this.page);
      // console.log(result);
      if (result.code == 1) {
        this.course = result.data;
      } else if (result.code == -8) {
        this.course = "";
      }
    },
    // 获得分类
    async getLable() {
      const result = await reqLable();
      // console.log(result);
      if (result.code == 1) {
        this.lable = result.data;
      }
    },
    // 进入就请求默认的分类数据
    async getCourse() {
      // console.log(this.type)
      const result = await reqMoreResource("", this.label_id, this.type, this.page);
      // console.log(result);
      if (result.code == 1) {
        this.course = result.data;
        
      } else if (result.code == -8) {
        this.course = "";
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
          this.course.push(item);
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
    this.getCourse();
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