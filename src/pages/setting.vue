<template>
  <div class="xianxiaCourse" v-height>
    <div class="contbox">
      <div class="cont">
        <div class="cont-left" @click="changeiPhone">
          <img
            src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b5.png"
            class="tu04"
          />
          <span>手机号码</span>
        </div>
        <img
          src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b9_32.png"
          class="tu03"
        />
      </div>
      <!-- 邮箱 -->
      <!-- <div class="cont">
        <div class="cont-left">
          <img src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b6.png" class="tu04" />
          <span>邮箱</span>
        </div>
        <img src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b9_32.png" class="tu03" />
      </div>-->
      <!-- 修改密码 -->
      <div class="cont" @click="revisePwd">
        <div class="cont-left">
          <img
            src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b13.png"
            class="tu04"
          />
          <span>修改密码</span>
        </div>
        <img
          src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b9_32.png"
          class="tu03"
        />
      </div>
      <!-- 设置支付密码 -->
      <div class="cont" @click="set_pay_pwd" v-if="userSetting.pay_pwd == null">
        <div class="cont-left">
          <img
            src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b7.png"
            class="tu04"
          />
          <span>设置支付密码</span>
        </div>
        <img
          src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b9_32.png"
          class="tu03"
        />
      </div>
      <!-- 修改支付密码 -->
      <div class="cont" @click="xiugai_pay_pwd" v-if="userSetting.pay_pwd != null">
        <div class="cont-left">
          <img
            src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b7.png"
            class="tu04"
          />
          <span>修改支付密码</span>
        </div>
        <img
          src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b9_32.png"
          class="tu03"
        />
      </div>
      <!-- 查看个人信息 -->
      <div class="cont" @click="seeUserinfo">
        <div class="cont-left">
          <img
            src="https://kf.ybc365.com/train/Public/train/user/common/img/search.png"
            class="tu04"
          />
          <span>查看个人信息</span>
        </div>
        <img
          src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b9_32.png"
          class="tu03"
        />
      </div>
      <!-- 绑定注册账号 -->
      <!-- <div class="cont">
        <div class="cont-left">
          <img src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b12.png" class="tu04" />
          <span>绑定注册账号</span>
        </div>
        <img src="https://kf.ybc365.com/train/Public/train/user/common/img/icon_b9_32.png" class="tu03" />
      </div>-->
    </div>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqsetting } from "../api";
export default {
  data() {
    return {
      userSetting: ""
    };
  },
  methods: {
    changeiPhone() {
      this.$router.push({
        path: "/changeiPhone",
        query: {
          phone: this.userSetting.phone
        }
      });
    },
    seeUserinfo() {
      this.$router.push("/userinfo");
    },
    set_pay_pwd() {
      this.$router.push("/set_pay_pwd");
    },
    revisePwd() {
      this.$router.push("/revisePwd");
    },
    xiugai_pay_pwd() {
      this.$router.push("/xiugai_pay_pwd");
    },
    // 获取用户设置信息，比如是否设置了支付密码等
    async getsetting() {
      const result = await reqsetting();
      if (result.code == 1) {
        console.log(result);
        this.userSetting = result.data.rs;
      }
    }
  },
  mounted() {
    this.getsetting();
  }
};
</script>

<style scoped>
.xianxiaCourse {
  /* background-color: aqua; */
  text-align: center;
}
img {
  width: 80%;
}
.contbox {
  width: 100%;
  background: #fff;
  margin-bottom: 20px;
}
.cont {
  width: 90%;
  height: 100px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  border-bottom: 2px solid #ececec;
}
.cont-left {
  text-align: left;
}
.tu03 {
  float: right;
  width: 10px;
  margin-top: -30px;
  display: block;
  height: 20px;
  margin-right: 1%;
}
.cont:after {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.tu04 {
  vertical-align: -8px;
  width: 36px;
  margin-right: 2%;
}
.cont-left span {
  font-size: 30px;
  color: #333;
}
</style>