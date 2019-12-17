<template>
  <div class="CourseIntroduction">
    <van-row class="padding">
      <van-col span="14" class="left">
        <van-row>
          <van-col span="24" class="title">{{title}}</van-col>
        </van-row>
        <van-row class="title2">
          <span>已更新{{num}}期</span>
          <span>{{person}}人次观看</span>
        </van-row>
      </van-col>
      <van-col span="10" class="left rights">
        <van-row>
          <van-col span="24" class="title codes">
            <span v-if="code == 1">连载</span>
            <span v-if="code == 2">完结</span>
          </van-col>
        </van-row>
        <van-row class="title2 rates">
          <van-rate v-model="value" readonly color="#f0ca56" v-if="value != 0"/>
          <van-rate v-model="value2" readonly color="#f0ca56" v-else/>
        </van-row>
      </van-col>
    </van-row>
    <div class="line"></div>
    <div class="html" v-html="html"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    num: Number,
    code: Number,
    value: Number,
    person: Number,
    html: String
  },
  data() {
    return {
      value2:0
    };
  },
  watch: {
    value: {
      immediate:true, //监听props中的值的变化
      handler(val) {
        if(val == 0){
          this.value2 = 5;
        }
      },
    }
  }
};
</script>

<style scoped>
.CourseIntroduction {
  min-height: 1000px;
}
.CourseIntroduction .padding {
  padding: 0 25px;
  height: 180px;
}
.CourseIntroduction .padding .left {
  height: 180px;
}

.CourseIntroduction .padding .title {
  font-size: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  margin: 35px 0 37px 0;
  color: #333;
  height: 45px;
}
.CourseIntroduction .padding .title.codes {
  text-align: right;
}
.CourseIntroduction .padding .title.codes span {
  font-size: 24px;
  border: 2px solid #5dd6c7;
  border-radius: 25px;
  padding: 0px 23px;
  color: #999;
  box-sizing: border-box;
}
.CourseIntroduction .padding .title2 {
  font-size: 26px;
  color: #999;
  height: 45px;
  line-height: 45px;
}
.CourseIntroduction .padding .title2.rates {
  text-align: right;
}
.CourseIntroduction .padding .title2 span:first-child::after {
  display: inline-block;
  content: "";
  width: 2px;
  height: 19px;
  background: #999;
  margin-left: 12px;
}

.line {
  width: 100%;
  height: 20px;
  background: #f5f5f5;
  margin: 10px 0;
}
.html {
  font-size: 24px;
  color: #666;
  padding: 0 25px;
  line-height: 50px;
  min-height: 450px;
}
.html >>> img{
  width: 100%;
}
.html >>> p{
  font-size: 24px;
}
</style>