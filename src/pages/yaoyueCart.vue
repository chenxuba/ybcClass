<template>
  <div v-height class="box">
    <div class="warp">
      <img width="100%" :src="imgurl" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: `https://api.ybc365.com/api/5dbfb44893afe?cookie=${sessionStorage.getItem(
        "cookie"
      )}&type=${this.$route.query.type}&res_id=${this.$route.query.id}&id=2`
    };
  },
  methods: {},
  mounted() {
    console.log(this.imgurl);
  }
};
</script>

<style scoped>
.box{
  padding-top: 80px;
  box-sizing: border-box;
}
.warp{
  width: 80%;
  margin: 0 auto;
}
</style>