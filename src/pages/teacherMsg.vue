<template>
  <div class="teacherMsg">
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
      <!-- 性别 -->
      <div class="title title2">
        <div class="title_txt">
          <span>性别</span>
        </div>
        <div class="title_img">
          <span>{{userInfo.sex == 2 ? '女' : '男'}}</span>
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
    <goBack></goBack>
    <goHome></goHome>
  </div>
</template>

<script>
import { reqMyTeacherData } from "../api";
import { Toast } from "vant";
export default {
  data() {
    return {
      userInfo: {},
      name: ""
    };
  },
  methods: {
    upload() {},
    async getUserinfo() {
      const result = await reqMyTeacherData();
      // console.log(result);
      this.userInfo = result.data;
      this.name = result.data.name;
      if (this.name == "") {
        this.name = "昵称正在初始化...";
      }
    },
    revise() {}
  },
  mounted() {
    this.getUserinfo();
  }
};
</script>

<style scoped>
.teacherMsg {
  width: 100%;
  height: 100%;
  padding: 10px 25px 0 25px;
  box-sizing: border-box;
}
/* 头像 */
.teacherMsg .contbox .title {
  width: 100%;
  height: 120px;
  background: #fff;
  display: flex;
  line-height: 100px;
  border-bottom: 1px solid #f1f1f1;
}
.teacherMsg .contbox .title2 {
  height: 100px;
}
.teacherMsg .contbox .title .title_txt {
  font-size: 28px;
  color: #333;
  width: 40%;
  margin-top: 10px;
}
.teacherMsg .contbox .title .title_img {
  width: 60%;
  text-align: right;
}
.teacherMsg .contbox .title .title_img img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  vertical-align: middle;
}
.teacherMsg .contbox .title .title_img span {
  font-size: 26px;
  color: #a1a1a1;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 60%;
  display: inline-block;
}
.teacherMsg .contbox .title .title_img .span {
  font-size: 26px;
  color: #a1a1a1;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50%;
  display: inline-block;
  height: 80px;
  text-align: right;
  border: none;
  outline: none;
  /* margin-top: -10px; */
}
.teacherMsg .contbox .title .title_img .title_icon {
  font-size: 40px;
  color: #ccc;
}
</style>