<template>
  <div class="ask">
    <!-- top -->
    <div class="top_back" @click="$router.go(-1)">
      <img src="../../static/img/1.png" alt />
      <span>问答互动专区</span>
      <van-icon name="arrow" class="icon" />
    </div>
    <!-- 康复师介绍 -->
    <div class="author">
      <div class="headimg">
        <img
          v-lazy="config.MsgConfig.teacher.headimgurl"
          v-if="config.MsgConfig.teacher.headimgurl"
        />
        <img src="../../static/img/pic.svg" v-else />
      </div>
      <div class="con">
        <div
          class="title"
          v-if="config.MsgConfig.teacher.ask_name"
        >{{config.MsgConfig.teacher.ask_name}}</div>
        <p v-if="config.MsgConfig.teacher.ask_breif">{{config.MsgConfig.teacher.ask_breif}}</p>
        <img src="../../static/img/msg.svg" alt v-else />
      </div>
    </div>
    <!-- 多行文本 -->
    <div class="reply-area">
      <textarea :maxlength="maxlength" :placeholder="placeholder" v-model="textarea"></textarea>
    </div>
    <!-- 文件上传区域 -->
    <div class="up_pic">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="6"
        :after-read="afterRead"
        upload-text="诊断或病例"
      />
    </div>
    <!-- 文字字数监测 -->
    <div class="txt-count">
      <div class="right">
        <span class="sum">{{maxlength - textarea.length}}</span>
        <span class="all">{{maxlength}}</span>
      </div>
    </div>
    <!-- 是否允许围观 -->
    <div class="isSee">
      <span>
        <van-switch v-model="checked" size="20px" active-color="#5dd6c7" />
      </span>
      <span ref="colors">
        允许围观，回答被其他人围观一次你将获得
        <b>{{weiguan_price || 0}}</b>
        元分成
      </span>
    </div>
    <!-- 支付按钮 -->
    <div class="pay">
      <van-button
        type="primary"
        size="normal"
        round
        class="btn"
        @click="payQuery"
      >支付 ¥ {{config.MsgConfig.teacher.question_money || 0}} 提问</van-button>
    </div>
    <!-- 灰色隔离带 -->
    <div class="hui"></div>
    <!-- 多少人回答，多少人围观  -->
    <div class="per-sum">
      <span>
        <i>{{config.MsgConfig.statistics.total_answer || 0}}</i>条回答
      </span>
      <span>
        <i>{{config.MsgConfig.statistics.total_watch_num || 0}}</i>人围观
      </span>
    </div>
    <!-- 灰色隔离带 -->
    <div class="hui"></div>
    <!-- 向康复师提问的列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      :offset="10"
    >
      <div class="box" v-for="(item,index) in qaList" :key="index">
        <div class="top">
          <div class="title_img">
            <img :src="item.headimgurl" v-if="item.headimgurl" />
            <img src="../../static/img/pic.svg" v-else />
          </div>
          <i class="title_box">
            <h1>
              {{item.member_name || '某用户'}}
              <i>提问</i>
            </h1>
            <span>{{item.question_createtime}}</span>
          </i>
          <div class="title_btn">{{item.watch_num || 0}}人围观过</div>
        </div>
        <div class="bottom">
          <p v-if="index !== i" ref="textBox">
            <span ref="spanBox" v-if="item.question_word">{{item.question_word}}</span>
            <img src="../../static/img/sholist.svg" v-else />
          </p>
          <b v-else>
            <span ref="spanBox" v-if="item.question_word">{{item.question_word}}</span>
            <img src="../../static/img/sholist.svg" v-else />
          </b>
        </div>
        <!-- btn -->
        <div class="btn" v-show="isOver">
          <button v-if="index !== i" @click="showAll(index)">查看全部</button>
          <button v-else @click="CloneAll(index)">收起</button>
        </div>
        <!-- 导师回答后显示的模块 -->
        <div class="clock" v-if="item.answer_word || item.reply == 1">
          <div class="teacher_img">
            <img :src="config.MsgConfig.teacher.headimgurl" alt />
            <h4>{{config.MsgConfig.teacher.ask_name}}</h4>
          </div>
          <!-- 围观按钮 -->
          <div
            class="weiguan"
            v-if="item.is_private == 2 && item.reply == 1 && item.looking_price != ''"
          >
            <van-button
              icon="star-o"
              size="small"
              type="primary"
              color="#1bd473"
              class="icon"
              @click="GoPay(item)"
            >{{config.MsgConfig.teacher.question_money * (config.MsgConfig.watch_reward.watch_rate *0.01) || 0}}元围观</van-button>
          </div>
        </div>
        <!-- 自己的问题，导师回答后的答案 -->
        <div class="pupop" v-if="item.answer_word">
          <span>{{item.answer_word}}</span>
        </div>
        <!-- <van-divider /> -->
      </div>
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";
import { reqMsgConfig, reqCorresponding, reqSubmitQa } from "../api/index.js";
import { isWx ,isIos} from "../util/index.js";
export default {
  data() {
    return {
      qaList: [{}], // 老师对应的问答题列表
      fileList: [],
      checked: true, //围观按钮默认打开状态
      i: -1,
      isOver: true,
      is_private: 2, // 是否允许围观，默认是允许的 2是可围观 1是不可围观
      textarea: "", //文本内容
      maxlength: 300, //最大文本字符长度
      src: "", //返回的图片地址
      placeholder:
        "向xxx老师提问，等Ta回答。72小时内未被回答，费用将自动退回！",
      config: {
        //老师配置
        user_id: this.$route.params.id,
        MsgConfig: {
          teacher: {},
          statistics: {},
          watch_reward: {}
        }
      },
      loading: false,
      finished: false,
      page: 1
    };
  },
  methods: {
    showAll(index) {
      this.i = index;
    },
    CloneAll(index) {
      this.i = !index;
    },
    afterRead(file) {
      this.src = file.content;
      // console.log(this.src); //需要传给后端的值
    },
    GoPay(item) {
      console.log(item);
      this.$router.push({
        path: "/pay/" + item.id,
        query: {
          money: item.looking_price,
          type: "5"
        }
      });
    },
    // 获取老师信息配置
    async getMsgConfig() {
      const result = await reqMsgConfig(this.config.user_id);
      this.config.MsgConfig = result.data;
      // console.log(result);
      this.placeholder = `向${this.config.MsgConfig.teacher.name}提问，等Ta回答。72小时内未被回答，费用将自动退回！`;
    },
    // 获取老师对应的问答题
    async getCorresponding() {
      const result = await reqCorresponding(this.config.user_id);
      this.qaList = result.data;
      // console.log(this.qaList);
    },
    // 提交问题跳转支付页面，携带返回的id
    async payQuery() {
      const result = await reqSubmitQa(
        "",
        this.fileList, //提问的图片
        this.config.user_id, //导师id
        this.textarea, //提问的问题
        this.is_private //是否可见
      );
      // console.log(result);
      if (result.code == -995) {
        Toast.fail(result.msg);
      } else if (result.code == 1) {
        this.$router.push({
          path: "/pay/" + result.data.question_id,
          query: {
            money: this.config.MsgConfig.teacher.question_money,
            type: "4"
          }
        });
      }
    },
    async onLoad() {
      this.page++;
      const result = await reqCorresponding(this.config.user_id, "", this.page);
      if (result.data.length > 0) {
        result.data.forEach(item => {
          this.qaList.push(item);
        });
      }
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.qaList.length >= this.config.MsgConfig.statistics.total_answer) {
        this.finished = true;
      }
    }
  },
  mounted() {
    this.getMsgConfig();
    this.getCorresponding();
  },
  watch: {
    checked() {
      if (this.checked) {
        this.is_private = 2;
        this.$refs.colors.style.color = "#333";
        // console.log(this.is_private);
      } else {
        this.is_private = 1;
        this.$refs.colors.style.color = "#888";
        // console.log(this.is_private);
      }
    },
    textarea() {
      if (this.textarea.length == this.maxlength) {
        Toast.fail("已达到最大输入数");
      }
    }
  },
  computed: {
    weiguan_price() {
      let weiguan_bili = this.config.MsgConfig.watch_reward.watch_rate * 0.01;
      let shouyi_bili = this.config.MsgConfig.watch_reward.reward_rate * 0.01;
      let price =
        this.config.MsgConfig.teacher.question_money *
        weiguan_bili *
        shouyi_bili;
      return price;
    }
  },
  created () {
    isIos();
  }
};
</script>

<style scoped>
.ask {
  width: 100%;
  box-sizing: border-box;
}
/* top */
.ask .top_back {
  height: 88px;
  overflow: hidden;
  background-color: #f6f6f6;
  line-height: 88px;
  font-size: 28px;
  color: #333;
}
.ask .top_back img {
  height: 38px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 20px 0 30px;
}
.ask .top_back span {
  display: inline-block;
  vertical-align: middle;
}
.ask .top_back .icon {
  float: right;
  line-height: 88px;
  margin-right: 25px;
}
/* 康复师介绍 */
.ask .author {
  margin: 25px 30px 0 30px;
  background-color: #ffff;
  border: 2px solid #efefef;
  border-radius: 6px;
  box-shadow: 2px 2px 6px #ccc;
  min-height: 180px;
  margin-bottom: 10px;
  display: flex;
  height: 230px;
  box-sizing: border-box;
}
.ask .author .headimg {
  float: left;
  padding: 50px 40px;
  width: 140px;
  padding-right: 0px;
}
.ask .author .headimg img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
  object-fit: cover;
}
.ask .author .con {
  padding: 15px;
  float: right;
  width: calc(100% - 100px);
  overflow: hidden;
  padding-left: 20px;
  box-sizing: border-box;
}
.ask .author .con .title {
  font-size: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 45px;
  margin-top: 15px;
}
.ask .author .con p {
  color: #888;
  font-size: 24px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  line-height: 35px;
}
/* 多行文本 */
.ask .reply-area textarea {
  width: 100%;
  padding: 4%;
  outline: 0;
  min-height: 280px;
  font-size: 26px;
  box-sizing: border-box;
  /* background: pink; */
  border: none;
  overflow: auto;
  resize: none;
  line-height: 40px;
}
/* 文件上传 */
.ask .up_pic {
  box-sizing: border-box;
  /* padding: 0 10px; */
  padding-left: 20px;
  font-size: 40px;
}
/* 字数监听 */
.ask .txt-count {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid #ececec;
}
.ask .txt-count .right {
  float: right;
  margin-right: 30px;
  color: #888;
  font-size: 30px;
}
.ask .txt-count .right span {
  font-size: 24px;
  color: #888;
}
.ask .txt-count .right span.sum::after {
  display: inline-block;
  content: "";
  width: 2px;
  height: 18px;
  background: #888;
  margin-left: 10px;
}
/* 围观 */
.ask .isSee {
  font-size: 24px;
  /* background: red; */
  height: 64px;
  padding: 0 10px 0 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: #333;
  width: 100%;
}
.ask .isSee span:first-child {
  margin-top: 5px;
  margin-right: 20px;
}
.ask .isSee b {
  color: red;
}
.ask .isSee span:nth-child(2) {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 支付按钮 */
.ask .pay {
  padding: 20px 80px 50px 80px;
  box-sizing: border-box;
}
.ask .pay .btn {
  width: 100%;
  background: #5dd6c7;
  border: none;
}
/* 灰色隔离带 */
.ask .hui {
  height: 30px;
  background: #f6f6f6;
}
/* 多少人回答围观 */
.ask .per-sum {
  font-size: 30px;
  height: 80px;
  line-height: 80px;
  box-sizing: border-box;
  padding: 0 25px;
}
.ask .per-sum span:first-child::after {
  display: inline-block;
  content: "";
  width: 2px;
  height: 20px;
  background: #888;
  margin: 0px 10px;
}
.ask .per-sum i {
  font-style: normal;
  color: red;
  font-weight: bold;
  margin-right: 10px;
}
/* 提问的列表 */
.ask .box {
  color: #333;
  padding: 0 25px;
  box-sizing: border-box;
}
.ask .box .top {
  display: flex;
  margin-top: 20px;
}
.ask .box .top .title_img {
  width: 70px;
  height: 70px;
}
.ask .box .top .title_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.ask .box .top .title_box {
  font-size: 24px;
  margin-left: 20px;
  flex: 1;
  line-height: 35px;
}
.ask .box .top .title_box h1 {
  font-size: 28px;
  margin: 8px 0 12px 0;
  font-style: normal;
  font-weight: normal;
}
.ask .box .top .title_box h1 i {
  font-size: 22px;
  margin-left: 10px;
  color: #333;
  font-style: normal;
  font-weight: bold;
}
.ask .box .top .title_box span {
  font-size: 22px;
  color: #999;
  font-style: normal;
}
.ask .box .top .title_btn {
  margin-top: 10px;
  font-size: 24px;
}
.ask .box .bottom {
  font-size: 26px;
  line-height: 45px;
  margin-top: 20px;
  margin-left: 10px;
  padding-right: 20px;
  color: #333;
  margin-bottom: 10px;
}
.ask .box .bottom p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin: 0;
}
.ask .box .bottom b {
  font-weight: normal;
}
.ask .box .btn {
  font-size: 24px;
  text-align: center;
  margin-top: 0px;
}
/* 查看全部和收起按钮 */
.ask .box .btn button {
  color: #333;
  font-size: 20px;
  color: #55dddd;
  border: none;
  outline: none;
  background: #fff;
  /* margin-top: 10px; */
}
.ask .box .btn2 {
  font-size: 28px;
  text-align: right;
  margin-top: 20px;
}
/* <!-- 导师回答后显示的模块 --> */
.ask .box .clock {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f6f6f6;
  margin-top: 20px;
}
.ask .box .clock .teacher_img {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.ask .box .clock .teacher_img img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: 20px;
}
.ask .box .clock .teacher_img h4 {
  font-size: 28px;
  margin-left: 20px;
  color: #333;
  font-weight: normal;
}
/* 围观 */
.ask .box .clock .weiguan {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.ask .box .clock .weiguan button {
  background-color: #5dd6c7 !important;
}
.ask .box .clock .weiguan .icon {
  line-height: 50px;
}
.pupop span {
  display: inline-block;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  font-size: 26px;
  line-height: 40px;
  padding-left: 20px;
  box-sizing: border-box;
  /* padding-top: 15px; */
  padding-bottom: 10px;
  color: #333;
}
</style>