<template>
  <div class="changeiPhone">
    <div class="content">
      <img src="../../static/img/phone.jpeg" alt />
      <p class="p">已绑定手机</p>
      <p>{{phone}}</p>
      <div class="btn">
        <van-button type="primary" round size="large" @click="$router.push('/changephone')">前往更改手机号</van-button>
      </div>
    </div>
    <goBack></goBack>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: this.$route.query.phone
    };
  }
};
</script>

<style scoped>
.changeiPhone {
  width: 100%;
}
.changeiPhone .content {
  width: 100%;
  height: 30%;
  background: #fff;
  text-align: center;
  padding-top: 150px;
}
.changeiPhone .content img {
  width: 20%;
  margin-bottom: 60px;
}
.changeiPhone .content p.p {
  font-size: 32px;
}
.changeiPhone .content p {
  font-size: 35px;
  color: #333;
  line-height: 60px;
}
.changeiPhone .content .btn{
    padding: 0 100px;
    box-sizing: border-box;
    padding-top: 180px;
}
</style>