<template>
  <div class="goHome" @click="goToHome">
    <img src="../../../static/img/home1.svg" alt />
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.goHome {
  width: 70px;
  height: 70px;
  position: fixed;
  top: 46%;
  right: 0px;
  background: #333;
  border-radius: 12px;
  text-align: center;
}
.goHome img {
  width: 70%;
  height: 70%;
  vertical-align: top;
  margin-top: 10px;
}

</style>