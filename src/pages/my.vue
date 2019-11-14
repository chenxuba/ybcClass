<template>
  <div class="my">
    <!-- 头部头像和昵称信息 -->
    <div class="headbox">
      <router-link to="/userinfo">
        <van-row>
          <van-col span="7" class="left">
            <div class="picbox">
              <img
                src="https://kf.ybc365.com/train/Public/train/user/common/img/user.png"
                alt
                v-if="!userinfo.headimgurl"
              />
              <img :src="userinfo.headimgurl" alt v-else />
            </div>
          </van-col>
          <van-col span="13" class="center">
            <p class="name" v-if="!userinfo.name">名字太个性，正在初始化...</p>
            <p class="name" v-else>{{userinfo.name}}</p>
            <p class="id">
              <span>ID</span>
              <span>{{userinfo.member_id || 888888}}</span>
            </p>
            <p class="yaoyueren">
              <span>邀约人：</span>
              <span v-if="!userinfo.parent">暂无邀约人</span>
              <span v-else>{{userinfo.parent}}</span>
            </p>
          </van-col>
          <van-col span="4" class="right">
            <div class="right-icon">
              <van-icon name="arrow" />
            </div>
          </van-col>
        </van-row>
      </router-link>
    </div>
    <!-- 四个nav -->
    <div class="navbox">
      <ul class="nav">
        <router-link to="/course_buy_detail">
          <li style="width:25%;">
            <div class="tubox">
              <img src="../../static/img/icon_b1.png" alt />
            </div>
            <p class="p03">
              购买
              <span class="spnum">{{res_count.res_num || 0}}</span>
            </p>
          </li>
        </router-link>
        <router-link to="/mycollection">
          <li style="width:25%;">
            <div class="tubox">
              <img src="../../static/img/icon_b2.png" alt />
            </div>
            <p class="p03">
              收藏
              <span class="spnum">{{res_count.collection_num || 0}}</span>
            </p>
          </li>
        </router-link>
        <!-- 关注 -->
        <router-link to="/follow">
          <li style="width:25%;">
            <div class="tubox">
              <img src="../../static/img/icon_b3.png" alt />
            </div>
            <p class="p03">
              关注
              <span class="spnum">{{res_count.guanzhu_num || 0}}</span>
            </p>
          </li>
        </router-link>
        <router-link to="#">
          <li style="width:25%;" @click="zuji">
            <div class="tubox">
              <img src="../../static/img/icon_b4.png" alt />
            </div>
            <p class="p03">
              足迹
              <span class="spnum">{{res_count.footprint_num || 0}}</span>
            </p>
          </li>
        </router-link>
      </ul>
    </div>
    <!-- 列表导航 -->
    <div class="contbox" v-if="List != ''">
      <div v-for="(item,index) in List" :key="index">
        <div style="border-bottom: 1px solid rgb(225, 225, 225);">
          <router-link :to="item.url">
            <div class="cont" style="border-bottom: 1px solid rgb(225, 225, 225);">
              <div class="cont-left">
                <img :src="['../../static/img/'+item.id+'a.png']" class="tu04" />
                <span>{{item.name}}</span>
              </div>
              <span class="span youxiaoqi" v-if="item.id == 1">有效期:{{userinfo.endtime || "  点击开通"}}</span>
              <span class="span youhuiquan" v-if="item.id == 16">领取好券</span>
              <img src="../../static/img/icon_b9_32.png" class="tu03" alt />
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <img src="../../static/img/sholist.svg" alt v-for="(item,index) in 6" :key="index" v-else />
    <!-- 占位符 -->
    <van-divider />
    <van-divider />
    <van-divider />
  </div>
</template>

<script>
import { reqUserInfo } from "../api/index.js";
export default {
  name: "my",
  data() {
    return {
      List: [],
      userinfo: {}, //个人信息
      res_count: {}, //购买收藏关注足迹等计数
      cookie: sessionStorage.getItem("cookie")
    };
  },
  methods: {
    async getUserInfo() {
      const result = await reqUserInfo();
      // alert(JSON.stringify(result));
      if (result.code == 1) {
        this.List = result.data.center_set;
        this.userinfo = result.data.user_info;
        this.res_count = result.data.res_count;
        localStorage.setItem("user_id",result.data.user_info.binding_acount_master)
        localStorage.setItem("agency_id",result.data.user_info.binding_acount_agency)
      }
    },
    zuji() {
      alert("足迹模块待优化");
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style scoped>
.my {
  width: 100%;
  height: 100%;
}
.my .headbox {
  width: 100%;
  height: 220px;
  /* background: red; */
  background: url("../../static/img/person02.png") center;
  background-size: 100% 100%;
}
.my .headbox .left {
  height: 220px;
  position: relative;
}
/* 头像 */
.my .headbox .picbox {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.my .headbox .picbox img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: inline-block;
}
/* 中间区域 */
.my .headbox .center {
  height: 220px;
  padding-top: 60px;
}
/* name */
.my .headbox .center .name {
  font-size: 32px;
  color: #fff;
  margin: 0;
}
/* id */
.my .headbox .center .id {
  font-size: 24px;
  color: #fff;
  margin: 0;
}
/* 邀约人 */
.my .headbox .center .yaoyueren {
  font-size: 24px;
  color: #fff;
  margin: 0;
}
.my .headbox .center p {
  line-height: 40px;
}
/* 右边 */
.my .headbox .right {
  height: 240px;
}
/* 右图标 */
.my .headbox .right .right-icon {
  text-align: center;
  color: #fff;
  font-size: 40px;
  line-height: 220px;
}
/* 四个nav */
.my .navbox {
  width: 100%;
  height: 180px;
  background: #fff;
  border-bottom: 16px solid #f6f6f6;
}
.my .navbox .nav {
  position: relative;
}
.my .navbox .nav a {
  color: black;
  font-size: 26px;
}
.my .navbox .nav li {
  position: relative;
  float: left;
  text-align: center;
}
.my .navbox .nav li .tubox {
  height: 100px;
  line-height: 100px;
}
.my .navbox .nav li .tubox img {
  vertical-align: middle;
  width: 25%;
}
.my .navbox .nav li .p03 {
  color: #555;
  font-size: 26px;
  margin-bottom: 20px;
  margin-top: 0;
}
.my .navbox .nav li .p03 .spnum {
  font-size: 26px;
  color: #a1a1a1;
  margin-left: 4%;
}
/* 列表 */
.my .contbox {
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.my .contbox a {
  color: #f6f6f6;
}
.my .contbox a:last-child .cont {
  border: 0 !important;
}
.my .contbox .cont {
  width: 90%;
  height: 110px;
  line-height: 110px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.my .contbox .cont .cont-left {
  float: left;
  width: 50%;
}
.my .contbox .cont .cont-left .tu04 {
  width: 15%;
  max-width: 40px;
  margin-right: 34px;
  vertical-align: middle;
}
.my .contbox .cont .cont-left span {
  font-size: 28px;
  color: #333;
  vertical-align: middle;
}
.my .contbox .cont .tu03 {
  float: right;
  width: 14px;
  margin-top: 53px;
  margin-left: 3%;
}
.span {
  font-size: 24px;
  color: #333;
  vertical-align: middle;
}
.span.youxiaoqi {
  color: red;
}
.span.youhuiquan {
  width: 40%;
  text-align: right;
  display: inline-block;
  color: #ccc;
  font-size: 30px;
}
</style>