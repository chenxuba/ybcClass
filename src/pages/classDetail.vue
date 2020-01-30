<template>
  <div class="details" v-wechat-title="$route.meta.title =classDetail.title">
    <div class="conetnt">
      <div class="cover">
        <img v-lazy="classDetail.cover" v-if="classDetail.cover != undefined" />
      </div>
      <!-- 邀约卡 -->
      <transition name="fade">
        <div class="invite" v-show="show" @click="myYaoyuecart">
          <span class="cart-text">我的邀约卡</span>
          <span class="icon-tuiguang">
            <img
              src="https://kf.ybc365.com/train/Public/train/user/common/img_green/icon-a01-tuiguang.png"
            />
          </span>
        </div>
      </transition>
      <div class="course-head">
        <div style="position: relative; margin: 0px 20px 0px 0px;">
          <p class="title">{{classDetail.title || '标题正在加载中...'}}</p>
          <div class="info">
            <span class="info-item right-col">
              <img
                src="https://kf.ybc365.com/train/Public/train/user/course/images/icon-view.png"
                class="info-item-img"
              />
              {{parseInt(baseValue) + parseInt(classDetail.people_num) || 0}}
            </span>
            <span class="info-item">
              <img
                src="https://kf.ybc365.com/train/Public/train/user/course/images/icon-time.png"
                class="info-item-img"
              />
              {{classDetail.intime || '2010-10-10 10:10:10'}}
            </span>
          </div>
        </div>
        <div class="collect-area">
          <img
            src="https://kf.ybc365.com/train/Public/train/user/common/img_green/icon-collect.png"
            alt
            class="icon-collect"
          />
          <p class>收藏</p>
        </div>
        <div class="support">
          <div class="sbox">
            <img src="https://kf.ybc365.com/train/Public/train/user/common/img/support.png" />
            <span>支持回看</span>
            <!-- <img src="https://kf.ybc365.com/train/Public/train/user/common/img/support.png" />
            <span>可使用优惠券</span>-->
          </div>
          <!-- <div class="more">
          <img src="https://kf.ybc365.com/train/Public/train/user/common/img/more.png" />
          </div>-->
        </div>
        <div class="clear"></div>
      </div>
      <!-- 邀约导师榜 -->
      <div class="comment-area">
        <div class="grade">
          <span>邀约导师榜</span>
        </div>
        <!---->
        <div class="fister">快来成为第一个邀约的人</div>
      </div>
      <!-- 评分 -->
      <div class="comment-area">
        <div class="grade">
          <span>评分</span>
          <span>
            <van-rate v-model="value" class="pingfen" size="14" />
          </span>
        </div>
        <!---->
        <div class="fister">
          {{classDetail.c_nums || 0}}条评价
          <van-icon name="arrow" class="arrow_icon" />
        </div>
      </div>
      <!-- 课时简介 -->
      <span class="text-box">
        <p class="title">课时简介</p>
        <div class="html" v-html="classDetail.res_info.intro"></div>
        <div class="html2" v-if="classDetail.res_info.intro ==''">
          <img src="../../static/img/none.jpeg" alt />
        </div>
      </span>
      <!-- 技术支持 -->
      <div class="point">
        医佰康提供技术支持
        <span>举报</span>
      </div>
      <!-- 占位符 -->
      <div class="point2"></div>
      <!-- 密码输入框 -->
      <van-popup v-model="show2" position="bottom" :style="{ height: height }" round>
        <pwdNumber></pwdNumber>
      </van-popup>
    </div>
    <!-- 订购课程按钮 -->
    <div class="buy">
      <!-- 公开的 -->
      <van-button class="btn" v-if="classDetail.needpay == 0" @click="goPlayer(classDetail)">进入课时</van-button>
      <!-- 公开的 -->
      <van-button class="btn" v-if="classDetail.needpay == 1" @click="goPlayer(classDetail)">进入课时</van-button>
      <!-- 学员才能看 -->
      <van-button
        class="btn"
        v-if="classDetail.needpay == 2 && classDetail.student != 1"
        @click="openStudent"
      >开通学员</van-button>
      <!-- 学员才能看，但是开通了学员 -->
      <van-button
        class="btn"
        v-if="classDetail.needpay == 2 && classDetail.student == 1"
        @click="goPlayer(classDetail)"
      >进入课时</van-button>
      <!-- 密码 -->
      <van-button class="btn" v-if="classDetail.needpay == 4" @click="showNumber">进入课时</van-button>
      <!-- 付费资源 -->
      <!-- 付费资源且可以试看且开了学员打折权益且没有购买课时且不是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 1 
        && StudentQuanYi.student_discount_status == 1 
        && classDetail.is_ok == 0 
        && classDetail.student == 0"
      >
        <van-col span="6">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <van-col span="5">
          <!-- 试看按钮 -->
          <van-button class="btn" @click="freeCantry">试看</van-button>
        </van-col>
        <!-- 学员权益 -->
        <van-col span="6">
          <van-button class="btn" @click="firStudent">学员价({{StudentQuanYi.student_discount / 10}}折)</van-button>
        </van-col>
        <van-col span="7">
          <!-- 付费的视频，没付费就显示这个按钮 -->
          <van-button class="btn" @click="GoPay">立即支付{{classDetail.price.toFixed(2)}}元</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且不可以试看且开了学员打折权益且没有购买课时且不是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 0 
        && StudentQuanYi.student_discount_status == 1 
        && classDetail.is_ok == 0 
        && classDetail.student == 0"
      >
        <van-col span="7">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <!-- 学员权益 -->
        <van-col span="8">
          <van-button class="btn" @click="firStudent">学员价({{StudentQuanYi.student_discount / 10}}折)</van-button>
        </van-col>
        <van-col span="9">
          <!-- 付费的视频，没付费就显示这个按钮 -->
          <van-button class="btn" @click="GoPay">立即支付{{classDetail.price.toFixed(2)}}元</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且不可以试看且没开学员打折权益且没有购买课时且不是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 0 
        && StudentQuanYi.student_discount_status == 0 
        && StudentQuanYi.student_free_status == 0
        && classDetail.is_ok == 0 
        && classDetail.student == 0"
      >
        <van-col span="8">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <van-col span="16">
          <!-- 付费的视频，没付费就显示这个按钮 -->
          <van-button class="btn" @click="GoPay">立即支付{{classDetail.price.toFixed(2)}}元</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且可以试看且没开学员打折权益且没有购买课时且不是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 1 
        && StudentQuanYi.student_discount_status == 0 
        && StudentQuanYi.student_free_status == 0
        && classDetail.is_ok == 0 
        && classDetail.student == 0"
      >
        <van-col span="7">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <van-col span="7">
          <!-- 试看按钮 -->
          <van-button class="btn" @click="freeCantry">免费试看</van-button>
        </van-col>
        <van-col span="10">
          <!-- 付费的视频，没付费就显示这个按钮 -->
          <van-button class="btn" @click="GoPay">立即支付{{classDetail.price.toFixed(2)}}元</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且可以试看且开了学员全场免费权益且没有购买课时且不是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 1 
        && StudentQuanYi.student_free_status == 1 
        && classDetail.is_ok == 0 
        && classDetail.student == 0"
      >
        <van-col span="6">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <van-col span="4">
          <!-- 试看按钮 -->
          <van-button class="btn" @click="freeCantry">试看</van-button>
        </van-col>
        <!-- 学员权益 -->
        <van-col span="7">
          <van-button class="btn" @click="firStudent">学员免费</van-button>
        </van-col>
        <van-col span="7">
          <!-- 付费的视频，没付费就显示这个按钮 -->
          <van-button class="btn" @click="GoPay">立即支付{{classDetail.price.toFixed(2)}}元</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且不可以试看且开了学员全场免费权益且没有购买课时且不是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 0 
        && StudentQuanYi.student_free_status == 1 
        && classDetail.is_ok == 0 
        && classDetail.student == 0"
      >
        <van-col span="6">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <!-- 学员权益 -->
        <van-col span="8">
          <van-button class="btn" @click="firStudent">学员免费</van-button>
        </van-col>
        <van-col span="10">
          <!-- 付费的视频，没付费就显示这个按钮 -->
          <van-button class="btn" @click="GoPay">立即支付{{classDetail.price.toFixed(2)}}元</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且可以试看且开了学员打折权益且没有购买且是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 1 
        && StudentQuanYi.student_discount_status == 1 
        && classDetail.is_ok == 0 
        && classDetail.student == 1"
      >
        <van-col span="7">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <van-col span="7">
          <!-- 试看按钮 -->
          <van-button class="btn" @click="freeCantry">免费试看</van-button>
        </van-col>
        <!-- 学员权益 -->
        <van-col span="10">
          <van-button
            class="btn"
            @click="GoPayStudentQuanYi"
          >学员价({{StudentQuanYi.student_discount / 10}}折)</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且不可以试看且开了学员打折权益且没有购买且是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 0 
        && StudentQuanYi.student_discount_status == 1 
        && classDetail.is_ok == 0 
        && classDetail.student == 1"
      >
        <van-col span="8">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <!-- 学员权益 -->
        <van-col span="16">
          <van-button
            class="btn"
            @click="GoPayStudentQuanYi"
          >学员价({{StudentQuanYi.student_discount / 10}}折)</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且不可以试看且开了学员全场免费权益且没有购买且是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 0 
        && StudentQuanYi.student_free_status == 1 
        && classDetail.student == 1"
      >
        <van-col span="8">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <!-- 学员权益 -->
        <van-col span="16">
          <van-button class="btn" @click="goPlayer(classDetail)">学员免费，点击查看</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源且不可以试看且开了学员全场免费权益且没有购买且是学员 -->
      <van-row
        v-if="classDetail.needpay == 3 
        && classDetail.cantry == 1 
        && StudentQuanYi.student_free_status == 1 
        && classDetail.student == 1"
      >
        <van-col span="8">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <!-- 学员权益 -->
        <van-col span="16">
          <van-button class="btn" @click="goPlayer(classDetail)">学员免费，点击查看</van-button>
        </van-col>
      </van-row>
      <!-- 付费资源但是已购买 -->
      <van-row v-if="classDetail.needpay == 3 
        && classDetail.is_ok == 1">
        <van-col span="7">
          <!-- 收费的，始终有赠送好友的按钮 -->
          <van-button class="zengsong" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <van-col span="17">
          <van-button class="btn" @click="goPlayer(classDetail)">进入课时</van-button>
        </van-col>
      </van-row>
    </div>
    <goHome></goHome>
    <!-- 返回按钮 -->
    <goBack :router="router"></goBack>
    <!-- 赠送好友弹出框 -->
    <giveFriendPopup ref="giveFriendPopup" :price="classDetail.price" :type="2"></giveFriendPopup>
  </div>
</template>

<script>
import { reqClassDetail, reqStudentQuanYi } from "../api/index";
import { Toast } from "vant";
import pwdNumber from "../components/classDetail/pwdNumber";
import { isIos, setFirstUrl } from "../util";
import { wxJS_SDk } from "../util/share";
import giveFriendPopup from "../components/courseDetail/GiveFriendPopup";

export default {
  data() {
    return {
      value: 5,
      show: true, //控制我的邀约卡的显示与否
      id: this.$route.params.id, //上一级传过来的id，通过id去找详情资源
      cookie: sessionStorage.getItem("cookie"),
      classDetail: {
        res_info: {}
      },
      baseValue: "800",
      show2: false,
      height: "50%",
      router: "payOver",
      StudentQuanYi: "" //学员权益
    };
  },
  methods: {
    //随机点赞数
    getRandomInt(min, max) {
      return (this.num = Math.floor(Math.random() * (max - min + 1)) + min);
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 160) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    async getClassDetail() {
      const result = await reqClassDetail(this.id, this.cookie);
      // console.log(result);
      if (result.code == 1) {
        this.classDetail = result.data;
        this.$store.commit("setClassTimePlayer", result.data);
        wxJS_SDk(
          result.data.title,
          "精彩课时，点击即享",
          window.location.href +
            `?parent_id=${sessionStorage.getItem("member_id")}`,
          result.data.cover
        );
        if (result.data.c_score == 0) {
          this.value = 5;
        } else {
          this.value = result.data.c_score;
        }
      } else if (result.code == -8) {
        Toast.fail("资源不存在");
        if (this.fromName == "payOver") {
          this.$router.push("/");
        } else {
          this.$router.go(-1);
        }
      } else if (result.code == 5001) {
        Toast("请订阅课程后查看");
        setTimeout(() => {
          this.$router.push(result.data.redirect_url);
        }, 1000);
      }
    },
    goPlayer(classDetail) {
      if (classDetail.type == 10 || classDetail.type == 9) {
        //音频
        this.$router.push({
          path: `/pay/player/` + classDetail.id + "/audio"
        });
      } else {
        //视频
        this.$router.push({
          path: `/pay/player/` + classDetail.id
        });
      }
    },
    // 开通学员,跳转页面
    openStudent() {
      this.$router.push("/openStudent");
    },
    showNumber() {
      this.show2 = true;
    },
    // 去收银台
    GoPay() {
      this.$router.push({
        path: `/pay/${this.id}`,
        query: {
          money: this.money,
          type: "2",
          res_id: this.id
        }
      });
    },
    // 学员价
    GoPayStudentQuanYi() {
      this.$router.push({
        path: `/pay/${this.id}`,
        query: {
          money: this.money,
          type: "2",
          res_id: this.id
        }
      });
    },
    // 生成邀约卡
    myYaoyuecart() {
      this.$router.push({
        path: "/yaoyueCart",
        query: {
          id: this.id,
          type: 2
        }
      });
    },
    // 获取学员权益
    async getStudentQuanYi() {
      const result = await reqStudentQuanYi();
      if (result.code == 1) {
        // console.log(result);
        this.StudentQuanYi = result.data;
      }
    },
    // 点击学员价触发 先开通学员
    firStudent() {
      Toast("请先成为学员");
      setTimeout(() => {
        this.$router.push("/openStudent");
      }, 1000);
    },
    // 免费试看
    freeCantry() {
      this.$router.push({
        path: `/pay/player/` + this.classDetail.id
      });
    },
    // 赠送好友
    GiveFriend() {
      this.$refs.giveFriendPopup.isShowGiveFriend = true;
    }
  },
  mounted() {
    this.getRandomInt(100, 200);
    window.addEventListener("scroll", this.handleScroll);
    this.getClassDetail();
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      this.height = "70%";
    }
    setFirstUrl();
    this.getStudentQuanYi();
  },
  components: {
    pwdNumber,
    giveFriendPopup
  },
  computed: {
    money() {
      return (this.StudentQuanYi.student_discount / 100) *
        this.classDetail.price <
        0.01
        ? "0.01"
        : (
            (this.StudentQuanYi.student_discount / 100) *
            this.classDetail.price
          ).toFixed(2);
    }
  }
};
</script>

<style scoped>
/* //动画 */
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(200px);
}
.details {
  width: 100%;
  height: auto;
}
.details .cover {
  width: 100%;
  height: 440px;
}
.details .cover img {
  width: 100%;
  height: 422px;
  object-fit: cover;
}
.details .invite {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  right: -50px;
  text-align: right;
  z-index: 999;
}

.details .invite .cart-text {
  font-size: 24px;
  background-color: rgba(230, 230, 230, 0.8);
  padding: 8px 30px 8px 20px;
  border-radius: 30px;
  color: #333;
  box-sizing: border-box;
}
.details .invite .icon-tuiguang {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  position: relative;
  left: -50px;
  top: 6px;
}
.details .invite .icon-tuiguang img {
  width: 30px;
  height: 30px;
  display: inline-block;
}
.buy {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  /* z-index: 99999; */
}
.buy .btn {
  width: 100%;
}
.van-button--default {
  background-color: #5dd6c7;
  /* border: 1px solid #ebedf0; */
  color: #fff;
}
.point {
  width: 100%;
  background-color: #f0f0f0;
  font-size: 26px;
  text-align: center;
  line-height: 80px;
  color: #999;
  text-indent: -20px;
}
.point span {
  color: #57bd6a;
  font-size: 25px;
  margin-left: 10px;
}
.point2 {
  height: 85px;
  background-color: #f0f0f0;
}
.zengsong {
  background: orange;
  width: 100%;
}
.zengsong .icon {
  margin-right: 10px;
  font-size: 36px;
  position: relative;
  top: 5px;
}
/* 中部样式 */
.course-head {
  position: relative;
  padding: 10px 5%;
  color: #888;
  border-bottom: 2px solid #eeeff1;
  background-color: #fff;
  font-size: 28px;
  box-sizing: border-box;
}
.course-head .title {
  color: #333;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0 20px 0;
}
.course-head .info {
  font-size: 0;
}
.info-item:first-child {
  padding-left: 0;
  box-sizing: border-box;
}
.right-col {
  position: relative;
}
.info-item {
  padding: 0 10px 0 4%;
  font-size: 28px;
  box-sizing: border-box;
}
.info-item-img {
  width: 30px;
  vertical-align: middle;
  margin: -6px 10px 0 0;
}
.right-col:after {
  content: "";
  position: absolute;
  top: 6px;
  right: 0;
  border-right: 2px solid #c2c2c2;
  height: 70%;
}
.collect-area {
  display: inline-flex;
  position: absolute;
  top: 5px;
  right: 3%;
  width: 40px;
  height: 70px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.collect-area p {
  width: 80px;
  margin: 10px 0 0 0;
}
.icon-collect {
  width: 36px;
  height: 36px;
  margin-right: 28px;
  margin-top: 80px;
}
.support {
  height: 60px;
  margin-top: 10px;
}
.support .sbox {
  float: left;
  line-height: 60px;
  height: 60px;
  margin-right: 30px;
}
.support .sbox img {
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
}
.support .sbox span {
  display: inline-block;
  vertical-align: middle;
}
.support .sbox span {
  margin-right: 30px;
  font-size: 26px;
}
.support .more {
  height: 60px;
  line-height: 60px;
  position: absolute;
  right: 46px;
}
.support .more img {
  width: 30px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
}
/* 邀约导师榜 */
.comment-area {
  display: flex;
  position: relative;
  padding: 20px 4%;
  color: #888;
  border-bottom: 1px solid #eeeff1;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-sizing: border-box;
}
.grade {
  color: #333;
  font-size: 30px;
}
.grade span:first-child {
  vertical-align: middle;
}
.fister {
  font-size: 24px;
}
.arrow_icon {
  vertical-align: middle;
  margin-top: -7px;
  margin-left: 10px;
}
.pingfen {
  vertical-align: middle;
}
/* 课时简介 */
.text-box {
  padding: 40px 20px 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #eeeff1;
  color: #333;
  box-sizing: border-box;
  min-height: 800px;
  box-sizing: border-box;
  display: block;
}
.text-box .title {
  line-height: 50px;
  font-weight: bold;
  font-size: 32px;
}
.html {
  font-size: 26px !important;
  color: #666;
  /* min-height: 6rem; */
  line-height: 45px;
}
.html >>> img {
  width: 100%;
}
.html2 {
  font-size: 26px;
  color: #666;
  text-align: center;
  display: block;
  margin-top: 130px;
}
.html2 img {
  width: 80%;
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
.van-button--normal {
  padding: 0;
}
</style>