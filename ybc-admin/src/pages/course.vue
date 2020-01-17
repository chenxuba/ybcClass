<template>
  <div class="classHour">
    <div class="tabs">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label" @click="tabClick">
            <i class="el-icon-view"></i> 课程
          </span>
          <childCourse
            :courseList="courseList"
            @event0="deleteCourse"
            @event2="hanldEdit"
            @event3="showXiangguankes"
            @OverCourse="OverCourse"
            @seeDingyue="seeDingyue"
            @xiangguanPingjia="xiangguanPingjia"
          ></childCourse>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label" @click="tabClick2">
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
        <el-tab-pane name="san" v-if="showXiangguanke">
          <span slot="label">
            <i class="el-icon-view"></i> 相关课
          </span>
          <xiangguanCourse
            :seleteCourse="seleteCourse"
            :xiangguankeList="xiangguankeList"
            @emitSearch="emitSearch"
            @xiangguanKehanldedit="xiangguanKehanldedit"
          ></xiangguanCourse>
        </el-tab-pane>
        <el-tab-pane name="edit" v-if="showEditXiangguankeTime">
          <span slot="label">
            <i class="el-icon-view"></i> 编辑课时
            <span
              @click="yincangEditXiangguankeTimeTabs"
              class="yincangEditXiangguankeTimeTabs"
            >
              <i class="el-icon-error"></i>
            </span>
          </span>
          <xiangguankeTimeEdit @shuaxinListss="shuaxinListsss" ref="childNewClass"></xiangguankeTimeEdit>
        </el-tab-pane>
        <!-- 已订阅tabs -->
        <el-tab-pane name="SeeDingyue" v-if="showSeeDingyue">
          <span slot="label">
            <i class="el-icon-view"></i> 查看已订阅
            <span class="seeDingyue" @click="closeSeeDingyue">
              <i class="el-icon-error"></i>
            </span>
          </span>
          <seeDingyue></seeDingyue>
        </el-tab-pane>
        <!-- 相关评价tabs -->
        <el-tab-pane name="xiangguanPingjia" v-if="showXiangguanPingjia">
          <span slot="label">
            <i class="el-icon-view"></i> 相关评价
            <span class="xiangguanPingjia" @click="closeXiangguanPingjia">
              <i class="el-icon-error"></i>
            </span>
          </span>
          <xiangguanPingjia></xiangguanPingjia>
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
  reqMenuLabel,
  reqEditCourse,
  reqRelevantCourse,
  reqOverCourse
} from "../api";
import childCourse from "../components/course/childCourse";
import childNewCourse from "../components/course/childNewCourse";
import xiangguanCourse from "../components/course/xiangguanCourse";
import xiangguankeTimeEdit from "../components/course/xiangguankeTimeEdit";
import seeDingyue from "../components/course/seeDingyue";
import xiangguanPingjia from "../components/course/xiangguanPingjia";
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
      },
      showXiangguanke: false, //相关课
      seleteCourse: "", //选中的课程信息
      xiangguankeList: [], //相关课列表
      showEditXiangguankeTime: false, //是否显示编辑相关课时
      showSeeDingyue: false, //是否显示查看已订阅
      showXiangguanPingjia: false //是否显示相关评价tabs
    };
  },
  components: {
    childCourse,
    childNewCourse,
    xiangguanCourse,
    xiangguankeTimeEdit,
    seeDingyue,
    xiangguanPingjia
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
          message: "操作成功～",
          type: "success"
        });
        this.activeName = "first";
        this.tabsName = "新建课程";
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
      } else if (res.code == -995) {
        this.$message.error(res.msg);
      } else if (res.code == -1) {
        this.$message.error(res.msg);
      }
    },
    //获取分类
    async getMenuLabel() {
      const res = await reqMenuLabel(this.pros_type);
      if (res.code == 1) {
        this.menuLabel = res.data;
      }
    },
    // 编辑课程资源
    async hanldEdit(id) {
      const res = await reqEditCourse(id);
      console.log(res);
      if (res.code == 1) {
        if (res.data.column.money_type == 1) {
          this.ruleForm = {
            title: res.data.column.title,
            imgUrl: res.data.column.pic_cover,
            radio_fufei: Number(res.data.column.money_type),
            leixing: [res.data.column.label1, res.data.column.label2],
            shangJiaSet: Number(res.data.column.is_specify),
            content: res.data.column.brief_intro,
            leixing1: res.data.column.label1,
            leixing2: res.data.column.label2,
            pay: 1,
            price: res.data.column.pay[0].money,
            res_id: res.data.column.id, //课程id
            dingShiTime: res.data.column.release_time
          };
        } else {
          this.ruleForm = {
            title: res.data.column.title,
            imgUrl: res.data.column.pic_cover,
            radio_fufei: Number(res.data.column.money_type),
            leixing: [res.data.column.label1, res.data.column.label2],
            shangJiaSet: Number(res.data.column.is_specify),
            content: res.data.column.brief_intro,
            leixing1: res.data.column.label1,
            leixing2: res.data.column.label2,
            pay: 1,
            // price: res.data.column.pay[0].money,
            res_id: res.data.column.id, //课程id
            dingShiTime: res.data.column.release_time
          };
        }
        this.$refs.childNewCourse.changeContent(res.data.column.brief_intro);
      }
      this.activeName = "second";
      this.tabsName = "编辑课程";
    },
    // tabClick ,如果tabsName == '编辑课程'时，会触发这个方法
    tabClick() {
      if (this.tabsName == "编辑课程") {
        this.$confirm(
          "是否要暂时保存内容，确定后编辑的内容会暂时保存!",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$notify({
              title: "成功",
              message: "编辑的内容已经暂时保存～",
              type: "success",
              position: "top-left"
            });
          })
          .catch(() => {
            this.tabsName = "新建课程";
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
          });
      }
      // 点击课程tabs让相关课tabs消失
      this.showXiangguanke = false;
      this.showEditXiangguankeTime = false;
    },
    // 点击新建课程tabs让相关课tabs消失
    tabClick2() {
      this.showXiangguanke = false;
      this.showEditXiangguankeTime = false;
    },
    // 显示相关课tabs
    async showXiangguankes(item) {
      this.seleteCourse = item; //把点击的课程信息传过去
      this.showXiangguanke = true;
      this.activeName = "san";
      // alert(item.id);
      // 在这里请求相关课的接口
      const res = await reqRelevantCourse(item.id);
      console.log(res);
      if (res.code == 1) {
        this.xiangguankeList = res.data.rs_list;
      }
    },
    // emitSearch 子组件 xiangguanCourse
    emitSearch(val) {
      console.log(val);
      // 在这里写搜索接口
    },
    // 编辑相关课时资源
    xiangguanKehanldedit(item, tabs) {
      console.log(item);
      // 在这里写编辑课时接口
      this.activeName = "edit";
      this.showEditXiangguankeTime = true;
      setTimeout(() => {
        this.$refs.childNewClass.activeName = tabs;
        this.$refs.childNewClass.tabsDisabled = true;
        this.$refs.childNewClass.getEditMsg(item);
      }, 10);
    },
    // 隐藏编辑相关课课时tabs，并跳到 相关课 tabs
    yincangEditXiangguankeTimeTabs() {
      this.showEditXiangguankeTime = false;
      setTimeout(() => {
        this.activeName = "san";
      }, 100);
    },
    // 自定义事件，接收子组件的参数“first”，切换tab页
    shuaxinListsss(item) {
      this.activeName = item;
      this.showEditXiangguankeTime = false;
      this.showXiangguanke = false;
      // this.tabsNmae = "新建课时";
    },
    // 终结连载
    async OverCourse(id) {
      const res = await reqOverCourse(id);
      if (res.code == 1) {
        this.$message({
          message: "已经终结连载",
          type: "warning"
        });
        this.getCourseList();
      }
    },
    // 点击查看已订阅
    seeDingyue(id) {
      this.showSeeDingyue = true;
      this.activeName = "SeeDingyue";
    },
    // 点击相关评价
    xiangguanPingjia(id) {
      this.showXiangguanPingjia = true;
      this.activeName = "xiangguanPingjia";
    },
    // 点击关闭SeeDingyuetabs
    closeSeeDingyue() {
      this.showSeeDingyue = false;
      setTimeout(() => {
        this.activeName = "first";
      }, 10);
    },
    // 点击关闭XiangguanPingjiatabs
    closeXiangguanPingjia() {
      this.showXiangguanPingjia = false;
      setTimeout(() => {
        this.activeName = "first";
      }, 10);
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
.yincangEditXiangguankeTimeTabs:hover {
  color: red;
}
.seeDingyue:hover {
  color: red;
}
.xiangguanPingjia:hover {
  color: red;
}
</style>