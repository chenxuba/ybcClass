<template>
  <div class="word" v-wechat-title="$route.meta.title = word.title">
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
            <span>已关注</span>
          </van-col>
        </van-row>
      </div>
      <div class="html" v-html="word.content"></div>
      <div class="zhezhao" :style="{height:height}"></div>
      <div class="html" v-if="word.try_content">
        <p ref="ppp" v-html="word.try_content"></p>
      </div>
      <div class="cry" v-if="word.try_see == 2">
        <span>{{word.price}}元查看全文</span>
      </div>
    </div>
    <goHome></goHome>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqWordDetail } from "../api/index";
import {  isIos } from "../util";
import { wxJS_SDk } from "../util/share";
export default {
  data() {
    return {
      article_id: this.$route.params.id, //上一级传过来的id，通过id去找详情资源
      word: {},
      height: 0
    };
  },
  methods: {
    async getWordDetail() {
      const result = await reqWordDetail(this.article_id, "");
      // console.log(result);
      this.word = result.data;
      wxJS_SDk(
        this.word.title,
        this.word.abstract,
        window.location.href + `?parent_id=${sessionStorage.getItem("member_id")}`,
        this.word.pic
      );
    },
    getHeight() {
      // this.height = this.$refs.ppp.offsetHeight + "px";
    }
  },
  mounted() {
    this.getWordDetail();
    setTimeout(() => {
      this.getHeight();
    }, 500);
  },
  created() {
    isIos();
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
  padding: 4px 20px;
  color: #9dd300;
  border-radius: 30px;
}
.word .html {
  font-size: 30px;
  padding: 0 20px;
  box-sizing: border-box;
}
.word .html >>> img {
  width: 100% !important;
}
.word .cry {
  width: 100%;
  font-size: 30px;
  color: red;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 100px;
}
.word .cry span {
  border: 2px solid red;
  padding: 1px 80px;
  border-radius: 40px;
}
.zhezhao {
  width: 100%;
  /* height:70%; */
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0) 0,
    #fff 100%
  );
  position: fixed;
  top: 26%;
}
</style>