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
          <childNewCourse
            :ruleForm="ruleForm"
            :menuLabel="menuLabel"
            @event1="AddCourse"
            ref="childNewCourse"
          ></childNewCourse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  reqCourseList,
  reqDeleteCourse,
  reqAddCourse,
  reqMenuLabel
} from "../api";
import childCourse from "../components/course/childCourse";
import childNewCourse from "../components/course/childNewCourse";
export default {
  data() {
    return {
      courseList: "",
      activeName: "first",
      tabsName: "新建课程",
      menuLabel: [], //分类
      pros_type: 1, //1-视频 2-软文
      ruleForm: {
        title: "",
        imgUrl: "",
        radio_fufei: 3,
        leixing: "",
        shangJiaSet: 1,
        content: "",
        leixing1: "",
        leixing2: "",
        pay: 1,
        price: "",
        res_id: "", //课程id
        dingShiTime: ""
      }
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
        this.getMenuLabel();
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
    },
    // 新增课程资源
    async AddCourse() {
      const res = await reqAddCourse(
        this.ruleForm.title, //标题
        this.ruleForm.imgUrl, //封面
        this.ruleForm.radio_fufei, //收费方式
        this.ruleForm.pay, //固定收费
        this.ruleForm.price, //收费金额
        this.ruleForm.leixing1, //一级分类id
        this.ruleForm.leixing2, //二级分类id
        this.ruleForm.content, //课程简介
        this.ruleForm.res_id, //课程id,编辑的时候需要传
        this.ruleForm.shangJiaSet, //是否定时发布
        this.ruleForm.dingShiTime //定时发布时间
      );
      console.log(res);
      if (res.code == 1) {
        this.$message({
          message: "新建课程成功～",
          type: "success"
        });
        this.activeName = "first";
        this.getCourseList();
        this.ruleForm = {
          title: "",
          imgUrl: "",
          radio_fufei: 3,
          leixing: "",
          shangJiaSet: 1,
          content: "",
          leixing1: "",
          leixing2: "",
          pay: 1,
          price: "",
          res_id: "", //课程id
          dingShiTime: ""
        };
        this.$refs.childNewCourse.clearContent();
      }
    },
    //获取分类
    async getMenuLabel() {
      const res = await reqMenuLabel(this.pros_type);
      if (res.code == 1) {
        this.menuLabel = res.data;
      }
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