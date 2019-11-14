<template>
  <div class="header">
    <!-- 头部头像和昵称信息 -->
    <div class="headbox">
      <van-row>
        <router-link to="/teacherMsg">
          <van-col span="7" class="left">
            <div class="picbox">
              <img v-lazy="teacherinfo.headimgurl" alt v-if="!teacherinfo.headimgurl" />
              <img :src="teacherinfo.headimgurl" alt v-else />
            </div>
          </van-col>
        </router-link>
        <van-col span="13" class="center">
          <p class="name">{{teacherinfo.name || '正在初始化...'}}</p>
          <p class="id">
            <span>ID</span>
            <span>{{teacherinfo.user_id || '888888'}}</span>
          </p>
          <p class="yaoyueren">
            <span>机构：</span>
            <span>{{teacherinfo.institute || '正在加载...'}}</span>
            <!-- <span v-if="!userinfo.parent">暂无邀约人</span> -->
            <!-- <span v-else>{{userinfo.parent}}</span> -->
          </p>
        </van-col>
        <router-link to="/teacherFans">
          <van-col span="4" class="right">
            <div class="right-icon">
              <span>
                <img
                  src="https://kf.ybc365.com/train/Public/train/user/common/img/xinzeng08.png"
                  alt
                />{{teacherinfo.fans || '88'}}
              </span>
            </div>
          </van-col>
        </router-link>
      </van-row>
    </div>
    <!-- 3个nav -->
    <div class="navbox">
      <ul class="nav">
        <router-link to="/course_buy_detail">
          <li style="width:34%;">
            <div class="tubox">{{teacherinfo.total_like || '8888'}}</div>
            <p class="p03">贡献排行</p>
          </li>
        </router-link>
        <router-link to="/mycollection">
          <li style="width:33%;">
            <div class="tubox">{{teacherinfo.res_num || '0'}}</div>
            <p class="p03">作品</p>
          </li>
        </router-link>
        <!-- 关注 -->
        <router-link to="/follow">
          <li style="width:33%;">
            <div class="tubox">{{teacherinfo.rewards_money || '0'}}</div>
            <p class="p03">赏金</p>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["teacherinfo"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.header {
  width: 100%;
}
.header .headbox {
  width: 100%;
  height: 220px;
  /* background: red; */
  background: url("../../../static/img/person02.png") center;
  background-size: 100% 100%;
}
.header .headbox .left {
  height: 220px;
  position: relative;
}
/* 头像 */
.header .headbox .picbox {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.header .headbox .picbox img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: inline-block;
}
/* 中间区域 */
.header .headbox .center {
  height: 220px;
  padding-top: 60px;
}
/* name */
.header .headbox .center .name {
  font-size: 32px;
  color: #fff;
  margin: 0;
}
/* id */
.header .headbox .center .id {
  font-size: 24px;
  color: #fff;
  margin: 0;
}
/* 邀约人 */
.header .headbox .center .yaoyueren {
  font-size: 24px;
  color: #fff;
  margin: 0;
}
.header .headbox .center p {
  line-height: 40px;
}

/* 右图标 */
.header .headbox .right .right-icon {
  text-align: center;
  color: #fff;
  font-size: 40px;
  /* line-height: 220px; */
  display: flex;
  flex-direction: column;
}
.header .headbox .right .right-icon img {
  width: 40%;
  margin-top: 70px;
}
.header .headbox .right .right-icon span {
  display: block;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 220px;
  line-height: 60px;
  font-size: 30px;
}
/* 3个nav */
.header .navbox {
  width: 100%;
  height: 140px;
  background: #fff;
  border-bottom: 20px solid #f6f6f6;
}
.header .navbox .nav {
  position: relative;
}
.header .navbox .nav a {
  color: black;
  font-size: 26px;
}
.header .navbox .nav li {
  position: relative;
  float: left;
  text-align: center;
  margin-top: 5px;
}
.header .navbox .nav li .tubox {
  height: 80px;
  line-height: 80px;
  color: #999;
}

.header .navbox .nav li .p03 {
  color: #555;
  font-size: 26px;
  margin-bottom: 20px;
  margin-top: 0;
}
.header .navbox .nav li .p03 .spnum {
  font-size: 26px;
  color: #a1a1a1;
  margin-left: 4%;
}
</style>