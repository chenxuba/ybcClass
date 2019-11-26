<template>
  <div class="base">基础信息</div>
</template>

<script>
import { reqUserHomepage } from "../api";
export default {
  methods: {
    async getUserHomepage() {
      const res = await reqUserHomepage();
      console.log(res);
      if(res.code == -996){
         this.$message.error(res.msg);
         this.$router.push("/fail")
         setTimeout(() => {
            this.$router.push('/login')
         }, 3000);
      }
    }
  },
  mounted () {
    this.getUserHomepage();
  }
};
</script>

<style scoped>
</style>