<template>
  <div class="classHour">
    <div class="tabs">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label">
            <i class="el-icon-view"></i> 课时
          </span>
          <childClass :classHourList="classHourList" @shuxinList="shuxinLists" @changActiveName="changActiveNames"></childClass>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">
            <i class="el-icon-view"></i>新建课时
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
      activeName: "first"
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
    },
    shuxinLists(){
      console.log(111);
      
      this.getClassHourList();
    },
    changActiveNames(item){
      this.activeName = 'second'
      this.$refs.childNewClass.activeName = 'video'
      this.$refs.childNewClass.getEditMsg(item)
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