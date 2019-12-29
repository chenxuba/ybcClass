<template>
  <div class="wxopen" v-height>
    <img src="../../static/img/wxopen.jpeg" alt />
    <p>请在微信客户端打开该链接</p>
    <goHome></goHome>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wxopen {
  background: #f6f5f6;
  text-align: center;
}
img {
  width: 25%;
  margin-top: 100px;
}
p {
  font-size: 36px;
  color: #333;
  line-height: 100px;
}
</style>