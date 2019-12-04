<template>
  <div class="classHour">
    <div class="tabs">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label">
            <i class="el-icon-view"></i> 课程
          </span>
          <childCourse :courseList="courseList" @event0="deleteCourse"></childCourse>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">
            <i class="el-icon-view"></i>
            {{tabsName}}
          </span>
          <childNewCourse></childNewCourse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reqCourseList, reqDeleteCourse } from "../api";
import childCourse from "../components/course/childCourse";
import childNewCourse from "../components/course/childNewCourse";
export default {
  data() {
    return {
      courseList: "",
      activeName: "first",
      tabsName: "新建课程"
    };
  },
  components: {
    childCourse,
    childNewCourse
  },
  methods: {
    // 获取课程列表
    async getCourseList() {
      const res = await reqCourseList();
      console.log(res);
      if (res.code == 1) {
        this.courseList = res.data.course_list;
      }
    },
    // 删除课程资源
    deleteCourse(id) {
      this.$confirm("是否要删除课程，确定后相关课时也会进行删除!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await reqDeleteCourse(id);
          console.log(res);
          if (res.code == 1) {
            this.$message({
              message: "删除成功了",
              type: "success"
            });
            this.getCourseList();
          } else if (res.code == -1) {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
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