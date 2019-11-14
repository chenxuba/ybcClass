<template>
  <div class="applyTeacher" v-height>
    <p class="p-title">{{text}}</p>
    <!-- 申请导师的容器 -->
    <div class="apply background">
      <div class="warp" @click="isOpen">
        <span>申请机构</span>
        <span v-if="result.status == 1">审核中</span>
        <span v-if="result.status == 4">已驳回</span>
        <span v-if="result.status == 5">已冻结</span>
        <span v-if="result.status != 5 && result.status != 4 && result.status != 1">没有账号点击申请</span>
      </div>
    </div>
    <!-- 重新申请导师的容器 -->
    <div class="binding background" v-if="isChongxinShenqing">
      <div class="warp" @click="$router.push('/applySchool')">
        <span>重新申请</span>
        <span>重新申请机构</span>
      </div>
    </div>
    <!-- 绑定导师的容器 -->
    <div class="binding background">
      <div class="warp" @click="$router.push('/')">
        <span>绑定机构</span>
        <span>已有账号立即绑定</span>
      </div>
    </div>
    <!-- 返回上一步 -->
    <!-- 返回按钮 -->
    <goBack :router="router"></goBack>
  </div>
</template>

<script>
import { reqCheckResult } from "../api";
export default {
  data() {
    return {
      text: "",
      result: "",
      isChongxinShenqing: false,
      router:"openTeacher"
    };
  },
  methods: {
    // 检查导师申请结果
    async checkResult() {
      const result = await reqCheckResult("","agency");
      console.log(result);
      if (result.code == 1) {
        if (result.data.data == null) {
          this.text = "点击下方申请机构立即申请";
          
        }
      }
      if (result.code == 1) {
        this.result = result.data;
        if (result.data.status == 4) {
          this.isChongxinShenqing = true;
          this.text = "您的申请已被驳回";
        } else if (result.data.status == 3) {
          this.$router.push("/mySchool");
        } else if (result.data.status == 5) {
          this.text = "您的机构账号已被冻结";          
        }else if (result.data.status == 1) {
          this.text = "审核中,请注意查收短信";          
        }
      }
    },
    isOpen() {
      if (this.result.status == 1) {
        this.$toast("审核中,请注意查收短信通知");
      } else if (this.result.status == 4) {
        this.$toast("已驳回,请重新申请");
      } else if (this.result.status == 5) {
        this.$toast("已冻结,请联系平台管理员");
      } else {
        this.$router.push("applySchool");
      }
    }
  },
  mounted() {
    this.checkResult();
  }
};
</script>

<style scoped>
.applyTeacher {
  width: 100%;
  background: #f1f1f1;
  overflow-x: hidden;
}
.applyTeacher .background {
  width: 80%;
  height: 270px;
  margin: 0 auto;
  background: url("../../static/img/apply_agency.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 150px;
  box-shadow: 0px 4px 10px #e3e3e3;
}
.applyTeacher .binding.background {
  margin-top: 100px;
}
.applyTeacher .background .warp {
  position: relative;
  left: 40%;
  top: 30%;
  color: #333;
}
.applyTeacher .background .warp span {
  font-size: 36px;
  display: block;
  line-height: 50px;
}
.applyTeacher .background .warp span:nth-child(2) {
  font-size: 26px;
  color: #888;
}

.p-title {
  font-size: 32px;
  text-align: center;
  color: #333;
  margin-top: 100px;
}
</style>