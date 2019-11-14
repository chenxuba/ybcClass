<template>
  <div class="goHome" @click="goBack">
    <img src="../../../static/img/back.svg" alt />
  </div>
</template>

<script>
export default {
  props: ["router"],
  methods: {
    goBack() {
      if (
        this.router == "applyTeacher" ||
        this.router == "openTeacher" ||
        this.router == "openSchool"
      ) {
        this.$router.push("/my");
      } else if (this.router == "pay") {
        this.$router.push("/inquire");
      } else if (this.router == "payOver") {
        this.$router.push("/");
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.goHome {
  width: 70px;
  height: 70px;
  position: fixed;
  top: 53%;
  right: 0px;
  background: #333;
  border-radius: 12px;
  text-align: center;
}
.goHome img {
  width: 60%;
  height: 60%;
  vertical-align: top;
  margin-top: 10px;
}
</style>