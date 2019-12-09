<template>
  <div class="classHour">
    <div class="tabs">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label" @click="tabClick">
            <i class="el-icon-view"></i> 课时
          </span>
          <childClass
            :classHourList="classHourList"
            @shuxinList="shuxinLists"
            @changActiveName="changActiveNames"
          ></childClass>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">
            <i class="el-icon-view"></i>
            {{tabsNmae}}
          </span>
          <childNewClass @shuaxinListss="shuaxinListsss" ref="childNewClass"></childNewClass>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reqClassHourList } from "../api";
import childClass from "../components/classHour/childClass";
import childNewClass from "../components/classHour/childNewClass";
export default {
  data() {
    return {
      classHourList: "",
      activeName: "first",
      tabsNmae: "新建课时"
    };
  },
  components: {
    childClass,
    childNewClass
  },
  methods: {
    // 获取课时列表
    async getClassHourList() {
      const res = await reqClassHourList();
      if (res.code == 1) {
        this.classHourList = res.data.res_list;
      }
    },
    // 自定义事件，接收子组件的参数“first”，切换tab页
    shuaxinListsss(item) {
      this.getClassHourList();
      this.activeName = item;
      this.tabsNmae = "新建课时";
    },
    shuxinLists() {
      console.log(111);

      this.getClassHourList();
    },
    changActiveNames(item, tabs, txt) {
      this.tabsNmae = txt;
      this.activeName = "second";
      this.$refs.childNewClass.activeName = tabs;
      this.$refs.childNewClass.tabsDisabled = true;
      this.$refs.childNewClass.getEditMsg(item);
    },
    tabClick() {
      if (this.tabsNmae == "编辑课时") {
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
            this.tabsNmae = "新建课时";
            this.$refs.childNewClass.ruleForm = {
              date: "", //直播开始时间
              title: "", //标题
              imgUrl: "", //封面图
              content: "", //直播简介
              leixing1: "", //一级标签
              leixing2: "", //二级标签
              radio_fufei: 2, //收费方式
              radio_isShikan: 0, //是否需要试看,默认不需要
              yinSiSet: "0", //隐私设置
              shangJiaSet: 1, //上架设置，是否立即发布
              price: "", //收费金额
              password: "", // 密码
              shikanTime: "", //试看时间
              videoUrl: "",
              dingShiTime: new Date(), //定时直播
              res_id: "",
              leixing: [],
              associate_sell: "0", //是否关联售卖，默认不关联
              associate_type: "", //关联资源类型，是关联课程还是打卡学堂 99-课程 100-打卡学堂 默认关联课程
              course_id: "", //关联课程ID
              clockin_id: "" //关联打卡学堂ID
            };
            this.$refs.childNewClass.handleClick();
            this.$refs.childNewClass.tabsDisabled = false;
          });
      }
      // 点击课程tabs让相关课tabs消失
      this.showXiangguanke = false;
    }
  },
  mounted() {
    this.getClassHourList();
  }
};
</script>

<style scoped>
.classHour {
  min-width: 1350px;
}
</style>