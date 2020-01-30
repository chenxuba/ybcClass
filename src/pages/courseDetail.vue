<template>
  <div class="details" v-wechat-title="$route.meta.title = CourseJianjie.title">
    <div class="cover">
      <img
        width="100%"
        height="211"
        v-lazy="CourseJianjie.pic_cover"
        v-if="CourseJianjie.pic_cover != undefined"
      />
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
    <van-tabs
      v-model="active"
      swipeable
      animated
      color="#5dd6c7"
      :line-width="38"
      title-active-color="#999"
      :border="false"
    >
      <van-tab title="简介">
        <CourseIntroduction
          :title="CourseJianjie.title"
          :code="CourseJianjie.status"
          :num="CourseJianjie.classes"
          :value="CourseJianjie.c_score"
          :person="CourseJianjie.people_num"
          :html="CourseJianjie.brief_intro"
        ></CourseIntroduction>
      </van-tab>
      <van-tab title="目录">
        <CourseCatalogue :CourseMulu="CourseMulu" @onLoad="getCourseMulu" ref="CourseMulu"></CourseCatalogue>
      </van-tab>
      <van-tab title="评价">
        <CousreComment :CoursePingJia="CoursePingJia"></CousreComment>
      </van-tab>
    </van-tabs>
    <!-- 技术支持 -->
    <div class="point">
      医佰康提供技术支持
      <span>举报</span>
    </div>
    <!-- 占位符 -->
    <div class="point2"></div>
    <!-- 订购课程按钮 -->
    <div class="buy">
      <!-- 学员未无订阅 -->
      <van-button
        class="btn"
        v-if="CourseJianjie.money_type == 2 && CourseJianjie.subscribe == 0"
        @click="dingyue"
      >订阅线上课程(学员)</van-button>
      <!-- 学员有订阅 -->
      <van-button
        class="btn"
        v-if="CourseJianjie.subscribe == 1 && CourseJianjie.money_type == 2 "
      >已订阅</van-button>
      <!-- 有订阅 -->
      <van-button
        class="btn"
        v-if="CourseJianjie.subscribe == 1 && CourseJianjie.money_type == 3 "
      >已订阅</van-button>
      <!-- 无订阅公开 -->
      <van-button
        class="btn"
        v-if="CourseJianjie.money_type == 3 && CourseJianjie.subscribe == 0"
        @click="dingyue"
      >订阅线上课程(公开)</van-button>
      <!-- 赠送好友，付费资源 -->
      <van-row>
        <van-col span="8">
          <van-button class="zengsong" v-if="CourseJianjie.money_type == 1" @click="GiveFriend">
            <van-icon name="point-gift-o" class="icon" />赠送好友
          </van-button>
        </van-col>
        <!-- 学员权益价格 -->
        <van-col
          :span="StudentQuanYi.student_discount_status == 1 && CourseJianjie.student ==1 ? '16' : '6'"
          v-if="StudentQuanYi.student_discount_status == 1 && CourseJianjie.student ==1"
        >
          <van-button
            class="xueyuanjia"
            v-if="CourseJianjie.money_type == 1 && CourseJianjie.subscribe == 0"
            @click="GoPay()"
          >学员价¥{{money}}</van-button>
        </van-col>
        <van-col
          :span="StudentQuanYi.student_discount_status == 1 && CourseJianjie.student == 0 ? '6' : '16'"
          v-if="StudentQuanYi.student_discount_status == 1 && CourseJianjie.student == 0 && CourseJianjie.subscribe == 0"
        >
          <van-button
            class="xueyuanjia"
            v-if="CourseJianjie.money_type == 1"
            @click="dingyue"
          >学员价¥{{money }}</van-button>
        </van-col>
        <van-col
          :span="StudentQuanYi.student_discount_status == 1 && CourseJianjie.subscribe == 0 ? '10' : '16'"
        >
          <!-- 付费无订阅 -->
          <van-button
            class="btn"
            v-if="CourseJianjie.subscribe == 0 && CourseJianjie.money_type == 1 && StudentQuanYi.student_free_status != 1 && CourseJianjie.student ==0"
            @click="GoPay()"
          >订阅线上课程¥{{CourseJianjie.total_month}}元</van-button>
          <!-- 学员免费 -->
          <van-button
            class="btn"
            v-if="CourseJianjie.subscribe == 0 && CourseJianjie.money_type == 1 && StudentQuanYi.student_free_status == 1"
            @click="dingyue"
          >学员免费</van-button>
          <!-- 付费已订阅 -->
          <van-button
            class="btn"
            v-if="CourseJianjie.subscribe == 1 && CourseJianjie.money_type == 1 "
          >已订阅</van-button>
        </van-col>
      </van-row>
    </div>
    <goHome></goHome>
    <goBack :router="router"></goBack>
    <!-- 赠送好友弹出框 -->
    <giveFriendPopup ref="giveFriendPopup" :price="CourseJianjie.total_month" :type="1"></giveFriendPopup>
  </div>
</template>

<script>
import CourseIntroduction from "../components/courseDetail/CourseIntroduction";
import CourseCatalogue from "../components/courseDetail/CourseCatalogue";
import CousreComment from "../components/courseDetail/CousreComment";
import giveFriendPopup from "../components/courseDetail/GiveFriendPopup";
import { wxJS_SDk } from "../util/share";
import {
  reqCourseJianjie,
  reqCourseMulu,
  reqCoursePingJia,
  reqIsDingYue,
  reqStudentQuanYi
} from "../api";
import { mapState } from "vuex";
import { Toast } from "vant";
import { isIos, setFirstUrl } from "../util";
export default {
  data() {
    return {
      active: 1, //默认进入到目录下
      show: true, //控制我的邀约卡的显示与否
      id: this.$route.params.id, //上一级传过来的id，通过id去找详情资源,
      router: "payOver",
      StudentQuanYi: "",
      page: "0", //默认从第一页开始的
      resultInfo: [] //数据
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
    //触发请求，课程简介
    async getCourseJianjie() {
      let cookie = sessionStorage.getItem("cookie");
      const result = await reqCourseJianjie(this.id, cookie);
      this.$store.commit("setCourseJianjie", result.data);
      wxJS_SDk(
        result.data.title,
        "精彩课程，点击即享",
        window.location.href +
          `?parent_id=${sessionStorage.getItem("member_id")}`,
        result.data.pic_cover
      );
    },
    //触发请求，课程目录
    async getCourseMulu() {
      this.page++;
      const result = await reqCourseMulu(this.id, this.page);
      if (result.code == -8) {
        Toast.fail("该资源已删除");
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
      } else {
        if (result.data.length > 0) {
          result.data.forEach(item => {
            this.resultInfo.push(item);
          });
        }
        this.$store.commit("setCourseMulu", this.resultInfo);
        // 加载状态结束
        this.$refs.CourseMulu.loading = false;
        // 数据全部加载完成
        if (result.code == -19) {
          this.$refs.CourseMulu.finished = true;
        }
      }
    },
    //触发请求，课程评价
    async getCoursePingJia() {
      const result = await reqCoursePingJia(this.id);
      // console.log(result)
      this.$store.commit("setCoursePingJia", result.data);
    },
    GoPay() {
      this.$router.push({
        path: `/pay/${this.id}`,
        query: { money: this.money, type: "1" }
      });
    },
    // 点击订阅
    async dingyue() {
      const result = await reqIsDingYue("", this.id);
      // console.log(result);
      if (result.code == 1) {
        Toast.success("订阅成功");
        this.getCourseJianjie();
      } else if (result.code == -19) {
        Toast(`您还不是学员,3秒后自动跳转开通...`);
        setTimeout(() => {
          this.$router.push("/openStudent");
        }, 3000);
      }
    },
    // 生成邀约卡
    myYaoyuecart() {
      this.$router.push({
        path: "/yaoyueCart",
        query: {
          id: this.id,
          type: 1
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
    // 赠送好友
    GiveFriend() {
      this.$refs.giveFriendPopup.isShowGiveFriend = true;
    }
    // 下拉加载
    // async MuLuOnLoad() {
    //   this.page++;
    //   const result = await reqCourseMulu(this.id, this.page);
    //   console.log(result);
    //   let resultInfo = [];
    //    if (result.data.length > 0) {
    //     result.data.forEach(item => {
    //       resultInfo.push(item);
    //     });
    //   }
    //   console.log(resultInfo);

    // }
  },
  mounted() {
    this.getRandomInt(100, 200);
    window.addEventListener("scroll", this.handleScroll);
    this.getCourseJianjie();
    this.getCourseMulu();
    this.getCoursePingJia();
    setFirstUrl();
    this.getStudentQuanYi();
  },
  components: {
    CourseIntroduction,
    CourseCatalogue,
    CousreComment,
    giveFriendPopup
  },
  computed: {
    ...mapState(["CourseJianjie", "CourseMulu", "CoursePingJia"]),
    money() {
      return (this.StudentQuanYi.student_discount / 100) *
        this.CourseJianjie.total_month <
        "0.01"
        ? "0.01"
        : (
            (this.StudentQuanYi.student_discount / 100) *
            this.CourseJianjie.total_month
          ).toFixed(2);
    }
  }
  // created() {
  //   isIos();
  // }
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
.cover {
  height: 422px;
}
.buy {
  position: fixed;
  bottom: -4px;
  width: 100%;
  /* z-index: 9999; */
}
.buy .btn {
  width: 100%;
}
.van-button--default {
  background-color: #5dd6c7;
  border: 1px solid #ebedf0;
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
  background: #f0f0f0;
}
.zengsong {
  background: orange;
  width: 100%;
}
.xueyuanjia {
  background: #5dd6c7;
  width: 100%;
}
.zengsong .icon {
  margin-right: 10px;
  font-size: 36px;
  position: relative;
  top: 5px;
}
.van-button--normal {
  padding: 0;
}
</style>