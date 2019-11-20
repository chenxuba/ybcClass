<template>
  <div class="payOver">
    <div class="state">
      <van-icon name="success" class="icon animated bounceIn" />
    </div>
    <p class="zfOk">支付成功</p>
    <div class="btn">
      <van-button type="primary" size="large" color="#5dd6c7" round @click="goBack">查看详情</van-button>
    </div>
    <goHome></goHome>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      type: this.$route.query.type
    };
  },
  methods: {
    goBack() {
      if (this.type == 1) {
        this.$router.push({
          path: "/courseDetail/" + this.id
        });
      } else if (this.type == 2) {
        this.$router.push({
          path: "/classDetail/" + this.id,
          type: this.type
        });
      } else if (this.type == 3) {
        this.$router.push({
          path: "/my"
        });
      } else if (this.type == 5 || this.type == 4) {
        this.$router.push({
          path: "/myQa"
        });
      }else if (this.type == 7 || this.type == 8) {
        this.$router.push({
          path: "/wordDetail/"+ this.id
        });
      }
    }
  },
  // created() {
  //   let _href = window.location.href; // 获取当前地址
  //   if (_href.indexOf("&replace=1") <= -1) {
  //     // 若没有replace参数，则添加进去
  //     window.location.replace(_href + "&replace=1");
  //   }
  // }
  
};
</script>

<style scoped>
.payOver {
  width: 100%;
  text-align: center;
  padding-top: 200px;
  box-sizing: border-box;
}
.payOver .state {
  width: 180px;
  height: 180px;
  background: #5dd6c7;
  border-radius: 50%;
  display: inline-block;
}
.payOver .state .icon {
  font-size: 120px;
  display: block;
  line-height: 180px;
  color: #fff;
  margin-left: 10px;
}
.payOver .zfOk {
  font-size: 40px;
  line-height: 160px;
  color: #333;
  letter-spacing: 2px;
}
.payOver .btn {
  padding: 0 80px;
  box-sizing: border-box;
  margin-top: 100px;
}
</style>