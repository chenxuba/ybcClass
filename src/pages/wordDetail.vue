<template>
  <div class="word" v-wechat-title="$route.meta.title = word.title" v-height>
    <div class="top">
      <span>{{word.title}}</span>
    </div>
    <div class="content">
      <div class="title">
        <van-row>
          <van-col span="4" class="span">
            <img v-lazy="word.headimgurl" alt />
          </van-col>
          <van-col span="14" class="span2">
            <p class="name">{{word.name}}</p>
            <p class="time">
              <span>{{word.createtime}}</span>
            </p>
          </van-col>
          <van-col span="6" class="span3">
            <span v-if="word.is_user_follow != 0" @click="GuanZhu">已关注</span>
            <span v-else @click="GuanZhu">关注</span>
          </van-col>
        </van-row>
      </div>
      <!-- 正文部分 -->
      <div class="contents">
        <!-- 直接渲染content -->
        <div class="needpay0" v-if="word.content != '' ">
          <Needpay0 :word="word"></Needpay0>
        </div>
        <!-- 学员文章，needpay == 2 无试看 不是学员-->
        <div
          class="needpay0"
          v-if="word.needpay == 2 && word.try_content == '' && word.content == null"
        >
          <Needpay2 :article_qr="word.article_qr"></Needpay2>
        </div>
        <!-- 学员文章，needpay == 2 有试看 不是学员-->
        <div
          class="needpay0"
          v-if="word.needpay == 2 && word.try_content != '' && word.content == null"
        >
          <Needpay3 :try_content="word.try_content"></Needpay3>
        </div>
        <!-- 密码文章，needpay == 4 无试看 没有输入密码-->
        <div
          class="needpay0"
          v-if="word.needpay == 4 && word.try_content == '' && word.content == null"
        >
          <Needpay4></Needpay4>
        </div>
        <!-- 密码文章，needpay == 4 有试看 没有输入密码-->
        <div
          class="needpay0"
          v-if="word.needpay == 4 && word.try_content != '' && word.content == null"
        >
          <Needpay5 :try_content="word.try_content"></Needpay5>
        </div>
        <!-- 付费文章，needpay == 3 有试看 没有购买-->
        <div
          class="needpay0"
          v-if="word.needpay == 3 && word.try_content != '' && word.content == null"
        >
          <Needpay6 :try_content="word.try_content" :price="word.price" :id="word.id"></Needpay6>
        </div>
        <!-- 付费文章，needpay == 3 无试看 没有购买-->
        <div
          class="needpay0"
          v-if="word.needpay == 3 && word.try_content == '' && word.content == null"
        >
          <Needpay7 :price="word.price"></Needpay7>
        </div>
      </div>
      <!-- 赞赏区域 -->
      <div class="zanshang-box">
        <div class="zanshang" @click="showDaShang">
          <h1>您的打赏，是对我梦想的最大鼓励</h1>
          <img src="http://qiniu.ybc365.com/%E8%B5%9E%E8%B5%8F.png" alt />
          <p>{{word.reward.reward_num}}人赞赏</p>
        </div>
        <!-- 赞赏人的头像 -->
        <div class="zanshangMember">
          <span v-for="(item,index) in word.reward.data" :key="index">
            <img
              v-lazy="item.headimgurl || 'http://qiniu.ybc365.com/timg.jpeg'"
              :class="'img'+index"
            />
          </span>
        </div>
      </div>
      <div class="divider"></div>
    </div>
    <!-- 评论区 -->
    <div class="comment">
      <div class="title">评论({{comment.length}})</div>
      <van-divider />
      <!-- 评论详情 -->
      <div class="comment-content">
        <Comment
          :comment="comment"
          @event="deleteComment"
          :my_member_id="my_member_id"
          :article_id="article_id"
          @chang="getWordComment"
        ></Comment>
      </div>
      <div class="zhanwei"></div>
    </div>
    <!-- 打赏弹窗 -->
    <van-popup
      v-model="showDashang"
      closeOnClickOverlay
      :showConfirmButton="false"
      class="dialogDashang"
      closeable
    >
      <Dashang :word="word"></Dashang>
    </van-popup>
    <goHome></goHome>
    <goBack></goBack>
    <bottom
      @print="FabuComment"
      ref="child"
      :bottom_data="word.bottom_data"
      @dianzan="wordDianZan"
      @collection="wordCollection"
    ></bottom>
    <!-- 密码输入弹窗 -->
    <van-popup v-model="showPwdInput" position="bottom" :style="{ height: height }" round>
      <pwdNumber :article_id="article_id"></pwdNumber>
    </van-popup>
  </div>
</template>

<script>
import {
  reqWordDetail,
  reqWordComment,
  reqFabuComment,
  reqDeleteComment,
  reqTeacherGuanzhu,
  reqwordZan,
  reqwordShouCang
} from "../api/index";
import { isIos ,setFirstUrl} from "../util";
import { wxJS_SDk } from "../util/share";
import Needpay0 from "../components/wordDetail/needpay0";
import Needpay2 from "../components/wordDetail/needpay2";
import Needpay3 from "../components/wordDetail/needpay3";
import Needpay4 from "../components/wordDetail/needpay4";
import Needpay5 from "../components/wordDetail/needpay5";
import Needpay6 from "../components/wordDetail/needpay6";
import Needpay7 from "../components/wordDetail/needpay7";
import Comment from "../components/wordDetail/comment";
import bottom from "../components/wordDetail/bottom";
import Dashang from "../components/wordDetail/dashang";
import pwdNumber from "../components/wordDetail/pwdNumber";
export default {
  data() {
    return {
      article_id: this.$route.params.id, //上一级传过来的id，通过id去找详情资源
      word: {
        reward: {},
        bottom_data: {}
      },
      comment: [],
      my_member_id: "",
      showDashang: false,
      showPwdInput: false,
      height: "50%",
      
    };
  },
  methods: {
    // 获取软文详情
    async getWordDetail() {
      let password = localStorage.getItem(`wordPwd${this.article_id}`)
      const result = await reqWordDetail(this.article_id, "",password);
      console.log(result);
      this.word = result.data;
      if (result.code == -8) {
        this.$toast("该资源不存在");
        this.$router.go(-1);
      }
      wxJS_SDk(
        this.word.title,
        this.word.abstract,
        window.location.href +
          `?parent_id=${sessionStorage.getItem("member_id")}`,
        this.word.pic
      );
    },
    //获取软文评论
    async getWordComment() {
      const result = await reqWordComment("", this.article_id);
      this.comment = result.data.rs;
      // console.log(this.comment);
      this.my_member_id = result.data.member_id;
    },
    // 弹出打赏弹窗
    showDaShang() {
      this.showDashang = true;
    },
    // 发布评论
    async FabuComment(data) {
      const result = await reqFabuComment("", this.article_id, data);
      console.log(result);
      if (result.code == 1) {
        this.$toast("评论成功");
        this.getWordComment();
        this.$refs.child.msgValue = "";
      }
    },
    // 删除评论
    async deleteComment(item) {
      const result = await reqDeleteComment("", this.article_id, item.id);
      if (result.code == 1) {
        this.$toast("删除成功");
        this.getWordComment();
      } else {
        this.$toast("删除失败");
      }
    },
    // 关注导师
    async GuanZhu() {
      if (this.word.is_user_follow == 1) {
        const result = await reqTeacherGuanzhu("", this.word.user_id, 0);
        if (result.code == 1) {
          this.$toast(result.data.msg);
          this.getWordDetail();
        }
      } else if (this.word.is_user_follow == 0) {
        const result = await reqTeacherGuanzhu("", this.word.user_id, 1);
        if (result.code == 1) {
          this.$toast(result.data.msg);
          this.getWordDetail();
        }
      }
    },
    //软文点赞取消点赞
    async wordDianZan() {
      if (this.word.bottom_data.is_like == 0) {
        const result = await reqwordZan("", this.word.id, this.word.user_id, 1);
        if (result.code == 1) {
          this.$toast("点赞成功");
          this.getWordDetail();
        }
      } else if (this.word.bottom_data.is_like == 1) {
        const result = await reqwordZan("", this.word.id, this.word.user_id, 0);
        if (result.code == 1) {
          this.$toast("已取消点赞");
          this.getWordDetail();
        }
      }
    },
    async wordCollection() {
      if (this.word.bottom_data.is_collection == 0) {
        const result = await reqwordShouCang(
          "",
          this.word.id,
          this.word.user_id,
          1
        );
        if (result.code == 1) {
          this.$toast("收藏成功");
          this.getWordDetail();
        }
      } else if (this.word.bottom_data.is_collection == 1) {
        const result = await reqwordShouCang(
          "",
          this.word.id,
          this.word.user_id,
          0
        );
        if (result.code == 1) {
          this.$toast("已取消收藏");
          this.getWordDetail();
        }
      }
    },
    
  },
  mounted() {
    this.getWordDetail();
    this.getWordComment();
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      this.height = "70%";
    }
    setFirstUrl();
  },
  components: {
    Needpay0,
    Needpay2,
    Needpay3,
    Needpay4,
    Needpay5,
    Needpay6,
    Needpay7,
    Comment,
    bottom,
    Dashang,
    pwdNumber
  }
};
</script>

<style scoped>
.word {
  width: 100%;
}
.word >>> p {
  margin: 0;
  line-height: 50px;
}
.word .top {
  height: 280px;
}
.word .top {
  width: 100%;
  background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    ),
    url("https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/571/15688625492629298322_1.png");
  background-size: 100%;
  background-position: center;
  padding: 0 30px;
  box-sizing: border-box;
  padding-top: 150px;
}
.word .top span {
  font-size: 34px;
  display: inline-block;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-weight: bold;
  line-height: 55px;
}
.word .content {
  width: 100%;
  height: auto;
  border-radius: 30px 30px 0 0;
  /* box-shadow: 4px -6px 40px #d6d6d6; */
  box-sizing: border-box;
}
.word .content .title {
  width: 100%;
  height: 100px;
  /* background: #f6f6f6; */
  border-radius: 30px 30px 0 0;
  padding: 20px 0;
}
.word .content .title .span {
  padding-left: 20px;
}
.word .content .title .span img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.word .content .title .span2 p.name {
  margin: 0;
  font-size: 30px;
  color: #66c4ef;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.word .content .title .span2 p.time {
  margin: 0;
  font-size: 26px;
  color: #333;
  margin-top: -10px;
}
.word .content .title .span3 {
  font-size: 26px;
  line-height: 100px;
  text-align: right;
  padding-right: 40px;
}
.word .content .title .span3 span {
  border: 2px solid #9dd300;
  padding: 0px 20px;
  color: #9dd300;
  border-radius: 30px;
}
.word .html {
  font-size: 30px;
  padding: 0 20px;
  box-sizing: border-box;
  color: #333;
}

.word .zanshang-box {
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 80px;
  text-align: center;
}
.word .zanshang {
  font-size: 24px;
  width: 100%;
  border-top: 2px solid #ccc;
}
.word .zanshang h1 {
  font-size: 30px;
  text-align: center;
}
.word .zanshang img {
  width: 100px;
  height: 100px;
}
.word .zanshangMember {
  width: 100%;
  height: 60px;
  /* background: red; */
  /* text-indent: 30px; */
}
.word .zanshangMember img {
  width: 60px;
  height: 100%;
  vertical-align: top;
  border-radius: 50%;
}
.word .zanshangMember img.img1 {
  position: relative;
  left: -15px;
}
.word .zanshangMember img.img2 {
  position: relative;
  left: -30px;
}
.word .zanshangMember img.img3 {
  position: relative;
  left: -45px;
}
.word .zanshangMember img.img4 {
  position: relative;
  left: -60px;
}
.word .divider {
  height: 20px;
  background: #eee;
  margin-top: 50px;
}
/* 评论 */

.word .comment .title {
  font-size: 30px;
  margin: 30px 0 0 30px;
}
.zhanwei {
  height: 120px;
}
.dialogDashang {
  width: 60%;
  border-radius: 20px;
}
.dialogDashang >>> .van-popup__close-icon {
  color: #fff;
}
</style>