<template>
  <div class="test">
    <div class="back" @click="back">
      <van-icon name="arrow-left" /><span>返回</span>
    </div>
    <div class="top">
      <img src="../../static/img/top.png" alt width="100%" />
    </div>
    <div class="img_3">
      <div class="img01" @click="goHref1">
        <img src="../../static/img/gantong.png" alt="" width="100%">
      </div>
      <div class="img01" @click="goHref2">
        <img src="../../static/img/renzhi.png" alt="" width="100%">
      </div>
      <div class="img01" @click="goHref3">
        <img src="../../static/img/yanyu.png" alt="" width="100%">
      </div>
    </div>
    <goHome></goHome>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    goHref1(){
       window.location.href = "https://gtcp.ybc365.com"
    },
    goHref2(){
      alert("程序员小哥哥正在加急开发中～～")
    },
    goHref3(){
      window.location.href = "https://yy.ybc365.com"
    },
    back(){
      this.$router.push("/")
    }
  }
};
</script>

<style scoped>
.test {
  width: 100%;
}
.test .top {
  padding: 30px 20px 0 20px;
  box-sizing: border-box;
}
.test .img_3{
  padding: 0 20px;
  box-sizing: border-box;
}
.test .back{
  position: absolute;
  font-size: 30px;
  top: 30px;
  left: 25px;
  display: flex;
}
</style>