<template>
  <div class="teacherUserinfo">
    <!-- 头部头像和昵称信息 -->
    <div class="headbox">
      <van-row>
        <router-link to="#">
          <van-col span="7" class="left">
            <div class="picbox">
              <img v-lazy="schoolInfo.headimgurl" alt />
              <!-- <img
                src="https://kf.ybc365.com/train/Public/train/user/common/img/user.png"
                alt
                v-if="!userinfo.headimgurl"
              />-->
              <!-- <img :src="userinfo.headimgurl" alt v-else /> -->
            </div>
          </van-col>
        </router-link>
        <van-col span="13" class="center">
          <p class="name">{{schoolInfo.name}}</p>
        </van-col>
        <router-link to="#">
          <van-col span="4" class="right">
            <div class="right-icon">
              <span>
                <img
                  src="https://kf.ybc365.com/train/Public/train/user/common/img/xinzeng08.png"
                  alt
                />6
              </span>
            </div>
          </van-col>
        </router-link>
      </van-row>
    </div>
    <!-- 4个nav -->
    <div class="navbox">
      <ul class="nav">
        <router-link to="/course_buy_detail">
          <li style="width:25%;">
            <div class="tubox">0</div>
            <p class="p03">课时</p>
          </li>
        </router-link>
        <router-link to="/mycollection">
          <li style="width:25%;">
            <div class="tubox">0</div>
            <p class="p03">课程</p>
          </li>
        </router-link>
        <!-- 关注 -->
        <router-link to="/follow">
          <li style="width:25%;">
            <div class="tubox">0</div>
            <p class="p03">线下课程</p>
          </li>
        </router-link>
        <router-link to="/follow">
          <li style="width:25%;">
            <div class="tubox">0</div>
            <p class="p03">软文</p>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="contbox">
      <!-- 头像 -->
      <div class="title">
        <div class="title_txt">
          <span>机构导师</span>
        </div>
        <div class="title_img">
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <div class="title">
        <div class="title_txt">
          <span>机构资产</span>
        </div>
        <div class="title_img">
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <div class="title">
        <div class="title_txt">
          <span>排行榜</span>
        </div>
        <div class="title_img">
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <div class="title">
        <div class="title_txt">
          <span>解绑机构账号</span>
        </div>
        <div class="title_img">
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
    </div>
    <goBack :router="router"></goBack>
  </div>
</template>

<script>
import { reqMySchool } from "../api";
export default {
  data() {
    return {
      schoolInfo: {}, //个人信息
      router:"openSchool"
    };
  },
  methods: {
    async getSchoolInfo() {
      const result = await reqMySchool();
      if (result.code == 1) {
        this.schoolInfo = result.data.baseinfo;
      }else if(result.code == -8){
        this.$router.push("/openSchool")
      }
    }
  },
  mounted() {
    this.getSchoolInfo();
  }
};
</script>

<style scoped>
.teacherUserinfo {
  width: 100%;
  background: #fff;
}
.teacherUserinfo .headbox {
  width: 100%;
  height: 220px;
  /* background: red; */
  background: url("../../static/img/person02.png") center;
  background-size: 100% 100%;
}
.teacherUserinfo .headbox .left {
  height: 220px;
  position: relative;
}
/* 头像 */
.teacherUserinfo .headbox .picbox {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.teacherUserinfo .headbox .picbox img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: inline-block;
}
/* 中间区域 */
.teacherUserinfo .headbox .center {
  height: 220px;
  padding-top: 60px;
}
/* name */
.teacherUserinfo .headbox .center .name {
  font-size: 32px;
  color: #fff;
  margin: 0;
  line-height: 109px;
}
/* id */
.teacherUserinfo .headbox .center .id {
  font-size: 24px;
  color: #fff;
  margin: 0;
}
/* 邀约人 */
.teacherUserinfo .headbox .center .yaoyueren {
  font-size: 24px;
  color: #fff;
  margin: 0;
}
.teacherUserinfo .headbox .center p {
  line-height: 40px;
}

/* 右图标 */
.teacherUserinfo .headbox .right .right-icon {
  text-align: center;
  color: #fff;
  font-size: 40px;
  /* line-height: 220px; */
  display: flex;
  flex-direction: column;
}
.teacherUserinfo .headbox .right .right-icon img {
  width: 40%;
  margin-top: 70px;
}
.teacherUserinfo .headbox .right .right-icon span {
  display: block;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 220px;
  line-height: 60px;
  font-size: 30px;
}
/* 四个nav */
.teacherUserinfo .navbox {
  width: 100%;
  height: 140px;
  background: #fff;
  border-bottom: 20px solid #f6f6f6;
}
.teacherUserinfo .navbox .nav {
  position: relative;
}
.teacherUserinfo .navbox .nav a {
  color: black;
  font-size: 26px;
}
.teacherUserinfo .navbox .nav li {
  position: relative;
  float: left;
  text-align: center;
  margin-top: 5px;
}
.teacherUserinfo .navbox .nav li .tubox {
  height: 80px;
  line-height: 80px;
  color: #999;
}

.teacherUserinfo .navbox .nav li .p03 {
  color: #555;
  font-size: 26px;
  margin-bottom: 20px;
  margin-top: 0;
  
}
.teacherUserinfo .navbox .nav li .p03 .spnum {
  font-size: 26px;
  color: #a1a1a1;
  margin-left: 4%;
}
/* 头像 */
.teacherUserinfo .contbox{
    padding: 0 30px 0 40px;
    box-sizing: border-box;
}
.teacherUserinfo .contbox .title {
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  line-height: 100px;
  border-bottom: 1px solid #f1f1f1;
}
.teacherUserinfo .contbox .title .title_txt {
  font-size: 28px;
  color: #333;
  width: 40%;
}
.teacherUserinfo .contbox .title .title_img {
  width: 60%;
  text-align: right;
}
.teacherUserinfo .contbox .title .title_img .title_icon {
  font-size: 40px;
  color: #ccc;
}
</style>