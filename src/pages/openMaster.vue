<template>
  <div class="openMaster">
    <p class="p-title" v-if="isOpen == 0">请点击开通问答</p>
    <p class="p-title" v-if="isOpen == 1">您已开通答主</p>
    <!-- 申请导师的容器 -->
    <div class="apply background">
      <div class="warp" @click="goQaSetting">
        <span>开通问答</span>
        <span>{{isOpen == 1 ? '已开通' : '未开通'}}</span>
      </div>
    </div>
    <!-- 绑定导师的容器 -->
    <div class="binding background">
      <div class="warp">
        <span>我的问答</span>
        <span>待回答、已回答</span>
      </div>
    </div>
    <!-- 返回按钮 -->
    <div class="goHome" @click="goBack">
      <img src="../../static/img/back.svg" alt />
    </div>
  </div>
</template>

<script>
import { reqIsOpenDazhu } from "../api";
export default {
  data() {
    return {
      isOpen: "",
      goback: ""
    };
  },
  methods: {
    // 是否开通答主
    async isOpenDazhu() {
      const result = await reqIsOpenDazhu();
      console.log(result);
      this.isOpen = result.data.open_ask;
    },
    goQaSetting() {
      this.$router.push({
        path: "/openqa",
        query: {
          open_ask: this.isOpen
        }
      });
    },
    goBack() {
      if (this.goback == 1) {
        this.$router.push("/my");
      } else {
        this.$router.push("/my");
      }
    }
  },
  mounted() {
    this.isOpenDazhu();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name == "openqa") {
        vm.goback = 1;
      }
    });
  }
};
</script>

<style scoped>
.openMaster {
  width: 100%;
  background: #f1f1f1;
  padding-top: 100px;
  box-sizing: border-box;
  overflow-x: hidden;
  padding-bottom: 700px;
}
.openMaster .background {
  width: 80%;
  height: 270px;
  margin: 0 auto;
  background: url("../../static/img/openQa.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 200px;
  box-shadow: 0px 4px 10px #e3e3e3;
}
.openMaster .binding.background {
  margin-top: 100px;
  background: url("../../static/img/myQa.png") no-repeat;
  background-size: 100% 100%;
}
.openMaster .background .warp {
  position: relative;
  left: 40%;
  top: 30%;
  color: #333;
}
.openMaster .background .warp span {
  font-size: 36px;
  display: block;
  line-height: 50px;
}
.openMaster .background .warp span:nth-child(2) {
  font-size: 26px;
  color: #888;
}

.p-title {
  font-size: 32px;
  text-align: center;
  color: #333;
}
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