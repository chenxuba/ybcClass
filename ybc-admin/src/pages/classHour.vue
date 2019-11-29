<template>
  <div class="classHour">
    <div class="tabs">
      <el-tabs type="card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-view"></i> 课时
          </span>
          <childClass :classHourList="classHourList"></childClass>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-view"></i>新建课时
          </span>
          <childNewClass></childNewClass>
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
      classHourList: ""
    };
  },
  components: {
    childClass,
    childNewClass
  },
  methods: {
    async getClassHourList() {
      const res = await reqClassHourList();
      if (res.code == 1) {
        this.classHourList = res.data.res_list;
      }
    },
    
  },
  mounted() {
    this.getClassHourList();
  }
};
</script>

<style scoped>
</style>