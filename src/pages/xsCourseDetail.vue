<template>
  <div v-height class="box">
    <div class="head-main">
      <img :src="XxCourseDetail.cover" />
    </div>
    <!-- 活动事件和地址 -->
    <div class="details-main">
      <div class="title">
        <span class="status" v-if="XxCourseDetail.status == 5">课程结束</span>
        {{XxCourseDetail.title}}
      </div>
      <ul class="details-list">
        <li class="icon-time">
          活动时间：{{XxCourseDetail.starttime}} 至 {{XxCourseDetail.endtime}}
          <br />
          报名截止时间：{{XxCourseDetail.recoverytime}}
        </li>
        <li class="icon-position">活动地址：{{XxCourseDetail.detail_address}}</li>
      </ul>
    </div>
    <!-- 老师信息 -->
    <div class="teacher_warp">
      <div class="left">
        <img :src="XxCourseDetail.anchor_img" alt />
      </div>
      <div class="right">
        <p>
          <span class="name">{{XxCourseDetail.anchor_name}}</span>
          <span class="jieshao">
            讲师介绍
            <van-icon name="arrow" class="vant-icon" />
          </span>
        </p>
        <p class="text">{{XxCourseDetail.anchor_intro}}</p>
      </div>
    </div>
    <!-- 课程介绍 -->
    <div class="xxcourseJieshao">
      <span class="title">课程简介</span>
      <div v-html="XxCourseDetail.introduce"></div>
    </div>
    <!-- 底部xxx支持 -->
    <footer>医佰康提供技术支持</footer>
    <div class="zhanwei"></div>
    <div class="bottom-main">
      <a href="javascript:;" class="service-btn">
        <img
          src="https://kf.ybc365.com/train/Public/train/user/offline/images/icon/icon-service.png"
        />客服
      </a>
      <div class="sign-up skin-bg disabled" style="width: 70%;">立即报名</div>
    </div>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqXxCourseDetail } from "../api";
export default {
  data() {
    return {
      id: this.$route.params.id,
      XxCourseDetail: ""
    };
  },
  methods: {
    async getXxCourseDetail() {
      const result = await reqXxCourseDetail(this.id, "");
      console.log(result);
      this.XxCourseDetail = result.data;
    }
  },
  mounted() {
    this.getXxCourseDetail();
  }
};
</script>

<style scoped>
.box {
  background-color: #eeeff1;
}

.head-main {
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.head-main img {
  height: 400px;
  width: 100%;
}
.details-main {
  padding: 30px 20px;
  background-color: #fff;
}
.details-main .title {
  font-size: 30px;
  border: none;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.details-main .title .status {
  display: inline-block;
  vertical-align: bottom;
  background-color: #f6f6f6;
  margin: 0 6px 0 0;
  font-size: 22px;
  color: #888;
  padding: 2px 14px;
  border: solid 2px #d1d1d1;
  border-radius: 30px;
}
.details-list {
  margin-top: 16px;
}
.details-list .icon-time {
  margin-bottom: 10px;
  background: url("https://kf.ybc365.com/train/Public/train/user/offline/images/icon/icon-time.png")
    no-repeat 4px 4px;
  background-size: 22px 22px;
}
.details-list > li {
  font-size: 26px;
  color: #888;
  padding: 0 0 0 40px;
  line-height: 1.5;
  box-sizing: border-box;
}
.details-list .icon-position {
  background: url("https://kf.ybc365.com/train/Public/train/user/offline/images/icon/icon-position.png")
    no-repeat 2px 2px;
  background-size: 22px 28px;
  position: relative;
}
/* teacher */
.teacher_warp {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  background: #fff;
  margin-top: 20px;
}
.teacher_warp .left {
  width: 90px;
  height: 90px;
}
.teacher_warp .left img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin-top: 5px;
}
.teacher_warp .right {
  flex: 1;
  margin-left: 30px;
}
.teacher_warp .right p {
  font-size: 24px;
  color: #333;
  display: flex;
  justify-content: space-between;
  margin: 0;
  line-height: 60px;
}
.teacher_warp .right span.name {
  font-size: 28px;
}
.teacher_warp .right p.text {
  color: #888;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* margin: 0; */
  line-height: 30px;
}
.vant-icon {
  vertical-align: middle;
  position: relative;
  top: -2px;
}
/* 线下课程介绍 */
.xxcourseJieshao {
  margin-top: 20px;
  background: #fff;
  padding: 0 20px;
}
.xxcourseJieshao >>> img {
  width: 100%;
}
.xxcourseJieshao .title {
  font-size: 32px;
  color: #333;
  border: none;
}
footer {
  padding: 28px 4%;
  text-align: center;
  font-size: 26px;
  color: #888;
  background: #eeeff1;
}
/* 底部按钮 */
.bottom-main {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  text-align: center;
  font-size: 30px;
  line-height: 100px;
  z-index: 99;
}
.bottom-main .service-btn {
  width: 30%;
  background-color: #535353;
  color: #fff;
  text-decoration: none;
}
.bottom-main .service-btn img {
  vertical-align: middle;
  margin: -2px 16px 0 0;
  width: 34px;
}
.bottom-main .sign-up.disabled {
  background-color: #a1a1a1 !important;
}
.bottom-main .sign-up {
  width: 70%;
  color: #fff;
}
.skin-bg {
  background: #1ad473 !important;
}
.zhanwei {
  height: 100px;
}
</style>