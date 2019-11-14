<template>
  <div class="cellView">
    <div class="box">
      <div class="top">
        <div class="title_img">
          <img :src="queryObj.member_headimgurl" alt v-if="queryObj.member_headimgurl" />
          <img src="../../../static/img/pic.svg" alt v-else />
        </div>
        <i class="title_box">
          <h1>
            {{queryObj.member_name || '某用户'}}
            <i>提问</i>
          </h1>
          <span>{{queryObj.createtime}}</span>
        </i>
        <div class="title_btn">¥ {{queryObj.money}}元</div>
      </div>
      <div class="bottom">
        <p v-if="b !== i" ref="textBox">
          <span ref="spanBox">{{queryObj.question_word}}</span>
        </p>
        <b v-else>
          <span ref="spanBox">{{queryObj.question_word}}</span>
        </b>
      </div>
      <!-- btn -->
      <div class="btn" v-show="isOver">
        <button v-if="b !== i" @click="showAll(b)">查看全部</button>
        <button v-else @click="CloneAll(b)">收起</button>
      </div>
      <!-- 导师回答后显示的模块 -->
      <div class="clock">
        <div class="teacher_img">
          <img :src="queryObj.user_headimgurl" alt />
          <h4>{{queryObj.user_name}}</h4>
        </div>
        <!-- 围观数量 -->
        <div class="btn btn3">
          <span>{{queryObj.watch_num}}人围观过</span>
        </div>
      </div>
      <!-- 导师回答后的答案 -->
      <div class="pupop">
        <span>{{queryObj.answer.answer_word}}</span>
      </div>
      <van-divider />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    queryObj: Object,
    b: Number,
  },
  data() {
    return {
      i: -1,
      isOver: true,
      show: false
    };
  },
  methods: {
    showAll(b) {
      this.i = b;
    },
    CloneAll(b) {
      this.i = !b;
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
    }
  }
};
</script>

<style scoped>
.cellView {
  width: 100%;
}
.cellView .box {
  color: #333;
  padding: 0 10px;
  box-sizing: border-box;
}
.cellView .box .top {
  display: flex;
  margin-top: 20px;
}
.cellView .box .top .title_img {
  width: 70px;
  height: 70px;
}
.cellView .box .top .title_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.cellView .box .top .title_box {
  font-size: 24px;
  margin-left: 20px;
  flex: 1;
  /* line-height: 35px; */
}
.cellView .box .top .title_box h1 {
  font-size: 28px;
  margin: 8px 0 12px 0;
  font-style: normal;
}
.cellView .box .top .title_box h1 i {
  font-size: 22px;
  margin-left: 10px;
  color: #333;
  font-style: normal;
}
.cellView .box .top .title_box span {
  font-size: 23px;
  color: #999;
  font-style: normal;
}
.cellView .box .top .title_btn {
  margin-top: 10px;
  font-size: 30px;
  color: red;
  font-weight: bold;
}
.cellView .box .bottom {
  font-size: 26px;
  line-height: 45px;
  margin-top: 30px;
  margin-left: 10px;
  padding-right: 20px;
}
.cellView .box .bottom p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin: 0;
}
.cellView .box .bottom b {
  font-weight: normal;
}
.cellView .box .btn {
  font-size: 24px;
  text-align: center;
  margin-top: 0px;
}
/* 查看全部和收起按钮 */
.cellView .box .btn button {
  color: #333;
  font-size: 20px;
  color: #5dd6c7;
  border: none;
  outline: none;
  background: #fff;
  margin-top: 6px;
}
.cellView .box .btn2 {
  font-size: 28px;
  text-align: right;
  margin-top: 10px;
}
.cellView .box .btn-1 {
  background: #f6f6f6;
  line-height: 88px;
  margin-right: 20px;
  color: #5dd6c7;
}
.cellView .box .btn3 {
  font-size: 24px;
  line-height: 86px;
  margin-right: 30px;
  color: #333;
}
.cellView .box .btn2 button {
  background: #5dd6c7;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-size: 26px;
  margin-right: 20px;
  /* width: 180px; */
}
/* <!-- 导师回答后显示的模块 --> */
.cellView .box .clock {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f6f6f6;
  margin-top: 20px;
}
.cellView .box .clock .teacher_img {
  padding: 10px 0px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.cellView .box .clock .teacher_img img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: 20px;
}
.cellView .box .clock .teacher_img h4 {
  font-size: 28px;
  margin-left: 20px;
  color: #333;
  width: 180px;
  overflow: hidden;
  text-overflow:ellipsis;
white-space: nowrap;
}
/* 围观 */
.cellView .box .clock .weiguan {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.cellView .box .clock .weiguan .icon {
  line-height: 50px;
}
.pupop {
  background: #f6f6f6;
}
.pupop span {
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 26px;
  line-height: 40px;
  padding-left: 20px;
  box-sizing: border-box;
  padding-top: 15px;
  padding-bottom: 10px;
  color: #333;
}
</style>