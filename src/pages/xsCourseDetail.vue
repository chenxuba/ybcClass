<template>
  <div v-height>
    线下课程详情
    {{id}}
  </div>
</template>

<script>
import { reqXxCourseDetail } from "../api";
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  methods: {
    async getXxCourseDetail() {
      const result = await reqXxCourseDetail(this.id, "");
      console.log(result);
    }
  },
  mounted() {
    this.getXxCourseDetail();
  }
};
</script>

<style scoped>
</style>