<template>
  <div class="teacherUserinfo">
    <!-- 头部头像和昵称信息 -->
    <Header :teacherinfo="teacherinfo"></Header>
    <!-- 写死的4个li -->
    <FourLi :teacherinfo="teacherinfo"></FourLi>
    <goBack :router="router"></goBack>
  </div>
</template>

<script>
import { reqMyTeacherMsg, reqMyTeacherFans } from "../api";
import Header from "../components/teacherUserinfo/header";
import FourLi from "../components/teacherUserinfo/FourLi";
export default {
  data() {
    return {
      teacherinfo: {}, //导师信息
      router:"applyTeacher"
    };
  },
  methods: {
    async getTeacherinfo() {
      const result = await reqMyTeacherMsg();
      if (result.code == 1) {
        this.teacherinfo = result.data.anchor_center;
      } else if (result.code == -1 || result.code == -8) {
        this.$router.push("/applyTeacher");
      }
    }
  },
  mounted() {
    this.getTeacherinfo();
  },
  components: {
    Header,
    FourLi
  }
};
</script>

<style scoped>
.teacherUserinfo {
  width: 100%;
  background: #fff;
}
</style>