<template>
  <div class="needpay0">
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: ["content"]
};
</script>

<style scoped>
.needpay0{
    font-size: 24px;
    padding: 0 30px;
    color: #333;
}
</style>