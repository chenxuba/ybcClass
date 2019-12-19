<template>
  <div v-height class="box">
    线下课程详情
    <div v-html="XxCourseDetail.introduce"></div>
  </div>
</template>

<script>
import { reqXxCourseDetail } from "../api";
export default {
  data() {
    return {
      id: this.$route.params.id,
        XxCourseDetail:""
    };
  },
  methods: {
    async getXxCourseDetail() {
      const result = await reqXxCourseDetail(this.id, "");
      console.log(result);
      this.XxCourseDetail = result.data
    }
  },
  mounted() {
    this.getXxCourseDetail();
  }
};
</script>

<style scoped>
.box{
    padding: 0 20px;
    box-sizing: border-box;
}
.box >>> img{
    width: 100%;
}
</style>