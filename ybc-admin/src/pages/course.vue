<template>
  <div class="classHour">
    <div class="tabs">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label">
            <i class="el-icon-view"></i> 课程
          </span>
          <childCourse
            :classHourList="classHourList"
          ></childCourse>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">
            <i class="el-icon-view"></i>
            {{tabsNmae}}
          </span>
          <childNewCourse></childNewCourse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reqClassHourList } from "../api";
import childCourse from "../components/course/childCourse";
import childNewCourse from "../components/course/childNewCourse";
export default {
  data() {
    return {
      classHourList: "",
      activeName: "first",
      tabsNmae: "新建课程"
    };
  },
  components: {
    childCourse,
    childNewCourse
  },
  methods: {
    // 获取课程列表
    async getCourseList() {
      const res = await reqClassHourList();
      if (res.code == 1) {
        this.classHourList = res.data.res_list;
      }
    },
  },
  mounted() {
    this.getCourseList();
  }
};
</script>

<style scoped>
.classHour {
  min-width: 1350px;
}
</style>