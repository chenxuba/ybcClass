<template>
  <div v-height>
    线下课程详情
    {{id}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>

<style scoped>
</style>