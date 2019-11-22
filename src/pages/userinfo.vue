<template>
  <div class="userinfo" v-height>
    <!-- top部分 -->
    <div class="contbox">
      <!-- 头像 -->
      <div class="title">
        <div class="title_txt">
          <span>头像</span>
        </div>
        <div class="title_img" @click="upload">
          <img v-lazy="userInfo.headimgurl" v-if="userInfo.headimgurl" />
          <img src="https://kf.ybc365.com/train/Public/train/user/common/img/user.png" alt v-else />
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- 昵称 -->
      <div class="title title2">
        <div class="title_txt">
          <span>昵称</span>
        </div>
        <div class="title_img">
          <!-- <span>{{userInfo.name || '昵称正在初始化...'}}</span> -->
          <input
            type="text"
            class="span"
            :placeholder="userInfo.name || '昵称正在初始化...'"
            @blur="revise"
            v-model="name"
          />
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- 账号 -->
      <div class="title title2">
        <div class="title_txt">
          <span>账号</span>
        </div>
        <div class="title_img">
          <span>{{userInfo.login_name}}</span>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- UID -->
      <div class="title title2">
        <div class="title_txt">
          <span>UID</span>
        </div>
        <div class="title_img">
          <span>{{userInfo.id}}</span>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- 邀请人 -->
      <div class="title title2">
        <div class="title_txt">
          <span>邀请人</span>
        </div>
        <div class="title_img">
          <span>{{userInfo.parent_name || '点击完善'}}</span>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- 性别 -->
      <div class="title title2">
        <div class="title_txt">
          <span>性别</span>
        </div>
        <div class="title_img">
          <span>{{userInfo.sex == 2 ? '男' : '女'}}</span>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- 生日 -->
      <div class="title title2">
        <div class="title_txt">
          <span>生日</span>
        </div>
        <div class="title_img">
          <span>{{userInfo.birthday || '点击完善'}}</span>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- 真实姓名 -->
      <div class="title title2">
        <div class="title_txt">
          <span>真实姓名</span>
        </div>
        <div class="title_img">
          <!-- <span>{{userInfo.real_name || '点击完善'}}</span> -->
          <input
            type="text"
            class="span"
            :placeholder="userInfo.real_name || '点击完善'"
            @blur="reviseRealName"
            v-model="real_name"
          />
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- 手机号码 -->
      <div class="title title2">
        <div class="title_txt">
          <span>手机号码</span>
        </div>
        <div class="title_img" @click="changePhone">
          <span>{{userInfo.phone}}</span>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <!-- 我的简介 -->
      <div class="title title2">
        <div class="title_txt">
          <span>我的简介</span>
        </div>
        <div class="title_img">
          <span>{{userInfo.brief_intro || '点击完善'}}</span>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
    </div>
    <!-- 刷新微信资料 -->
    <div class="setting" v-if="isWx">
      <span class="input" @click="Refresh">刷新微信资料</span>
    </div>
    <!-- 返回按钮 -->
    <goHome></goHome>
  </div>
</template>

<script>
import { reqUserInfo2, reqUserName, reqRealName } from "../api";
import { Toast } from "vant";
import { isWx } from "../util";
import { getCode } from "../api/user";
export default {
  data() {
    return {
      userInfo: {},
      name: "",
      oldName: "",
      oldRealName: "",
      real_name: "",
      isWx: false
    };
  },
  methods: {
    upload() {},
    async getUserinfo() {
      const result = await reqUserInfo2();
      // console.log(result);
      this.userInfo = result.data;
      this.name = result.data.name;
      if (this.name == "") {
        this.name = "昵称正在初始化...";
      }
      this.real_name = result.data.real_name;
    },
    async revise() {
      if (this.oldName == this.name) {
        console.log("1111");
      } else {
        const result = await reqUserName(this.name);
        // console.log(result);
        Toast.success(result.data.return_msg);
      }
    },
    async reviseRealName() {
      if (this.oldRealName == this.real_name) {
        console.log("222");
      } else {
        const result = await reqRealName(this.real_name);
        // console.log(result);
        Toast.success(result.data.return_msg);
      }
    },
    // 跳转更改手机号页面
    changePhone() {
      this.$router.push({
        path: "/changeiPhone",
        query: {
          phone: this.userInfo.phone
        }
      });
    },
    Refresh() {
      sessionStorage.clear();
      localStorage.clear();
        getCode()
    }
  },
  mounted() {
    this.getUserinfo();
    if (isWx()) {
      this.isWx = true;
    }
  },
  watch: {
    name(newVal, oldVal) {
      this.oldName = oldVal;
      if (oldVal == "") {
        this.oldName = this.name;
      }
    },
    real_name(newVal, oldVal) {
      this.oldRealName = oldVal;
      if (oldVal == "") {
        this.oldRealName = this.real_name;
      }
    }
  }
};
</script>

<style scoped>
.userinfo {
  width: 100%;
  height: 100%;
  padding: 10px 25px 0 25px;
  box-sizing: border-box;
}
/* 头像 */
.userinfo .contbox .title {
  width: 100%;
  height: 120px;
  background: #fff;
  display: flex;
  line-height: 100px;
  border-bottom: 1px solid #f1f1f1;
}
.userinfo .contbox .title2 {
  height: 100px;
}
.userinfo .contbox .title .title_txt {
  font-size: 28px;
  color: #333;
  width: 40%;
  margin-top: 10px;
}
.userinfo .contbox .title .title_img {
  width: 60%;
  text-align: right;
}
.userinfo .contbox .title .title_img img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  vertical-align: middle;
}
.userinfo .contbox .title .title_img span {
  font-size: 26px;
  color: #a1a1a1;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 60%;
  display: inline-block;
}
.userinfo .contbox .title .title_img .span {
  font-size: 26px;
  color: #a1a1a1;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50%;
  display: inline-block;
  height: 100px;
  text-align: right;
  border: none;
  outline: none;
  /* margin-top: -10px; */
}
.userinfo .contbox .title .title_img .title_icon {
  font-size: 40px;
  color: #ccc;
}
.setting {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.setting .input {
  padding: 22px 200px;
  background-color: #ffc803;
  color: #b27629;
  border-radius: 50px;
  font-size: 24px;
  box-shadow: 3px 3px 20px;
  display: inline-block;
}
</style>