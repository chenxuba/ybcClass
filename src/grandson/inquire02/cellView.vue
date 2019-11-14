<template>
  <div class="cellView">
    <div class="box">
      <div class="top">
        <div class="title_img">
          <img :src="QaObj.headimgurl" alt v-if="QaObj.headimgurl" />
          <img src="../../../static/img/pic.svg" alt v-else />
        </div>
        <i class="title_box">
          <h1>
            {{QaObj.member_name || '某用户'}}
            <i>提问</i>
          </h1>
          <span>{{QaObj.question_createtime}}</span>
        </i>
        <div class="title_btn">{{QaObj.watch_num}}人围观过</div>
      </div>
      <div class="bottom">
        <p v-if="b !== i" ref="textBox">
          <span ref="spanBox">{{QaObj.question_word}}</span>
        </p>
        <b v-else>
          <span ref="spanBox">{{QaObj.question_word}}</span>
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
          <img :src="QaObj.user_headimgurl" alt />
          <h4>{{QaObj.user_name}}</h4>
        </div>
        <!-- 围观按钮 -->
        <div
          class="weiguan"
          v-if="QaObj.is_private == 2 && QaObj.reply == 1 && QaObj.looking_price != ''"
        >
          <van-button
            icon="star-o"
            size="small"
            type="primary"
            color="#5dd6c7"
            class="icon"
            @click="GoPay(QaObj)"
          >{{QaObj.looking_price}}元围观</van-button>
          <!-- <van-button  v-if="item.answer_word" size="small" type="primary" color="#1bd473" class="icon">查看</van-button> -->
        </div>
        <!-- 提问按钮 -->
        <div class="btn btn2" v-if="QaObj.answer_word || QaObj.reply == 0 || QaObj.reply == -1">
          <van-button plain tag="button" type="primary" size="small" :to="'/ask/'+QaObj.user_id">提问</van-button>
        </div>
      </div>
      <!-- 自己的问题，导师回答后的答案 -->
      <div class="pupop" v-if="QaObj.answer_word">
        <span>{{QaObj.answer_word}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    QaObj: Object,
    b:Number
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

 .box {
  color: #333;
  padding: 0 10px;
  box-sizing: border-box;
}
 .box .top {
  display: flex;
  margin-top: 20px;
}
 .box .top .title_img {
  width: 70px;
  height: 70px;
}
 .box .top .title_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
 .box .top .title_box {
  font-size: 24px;
  margin-left: 20px;
  flex: 1;
  line-height: 35px;
}
 .box .top .title_box h1 {
  font-size: 28px;
  margin: 8px 0 0 0;
  font-style: normal;
}
 .box .top .title_box h1 i {
  font-size: 22px;
  margin-left: 10px;
  color: #333;
  font-style: normal;
}
 .box .top .title_box span {
  font-size: 23px;
  color: #999;
  font-style: normal;
}
 .box .top .title_btn {
  margin-top: 10px;
  font-size: 24px;
}
 .box .bottom {
  font-size: 26px;
  line-height: 45px;
  margin-top: 30px;
  margin-left: 10px;
  padding-right: 20px;
}
 .box .bottom p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin: 0;
}
 .box .bottom b {
  font-weight: normal;
}
 .box .btn {
  font-size: 24px;
  text-align: center;
  margin-top: 0px;
}
/* 查看全部和收起按钮 */
 .box .btn button {
  color: #333;
  font-size: 20px;
  color: #55dddd;
  border: none;
  outline: none;
  background: #fff;
  margin-top: 6px;
}
 .box .btn2 {
  font-size: 28px;
  text-align: right;
  margin-top: 10px;
}
 .box .btn2 button {
  background: #5dd6c7;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-size: 26px;
  margin-right: 20px;
  width: 180px;
}
/* <!-- 导师回答后显示的模块 --> */
 .box .clock {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f6f6f6;
  margin-top: 20px;
  height: 92px;
}
 .box .clock .teacher_img {
  padding: 10px 0px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
 .box .clock .teacher_img img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: 20px;
}
 .box .clock .teacher_img h4 {
  font-size: 28px;
  margin-left: 20px;
  color: #333;
}
/* 围观 */
 .box .clock .weiguan {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
 .box .clock .weiguan .icon {
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
  padding-top: 15px;
  padding-bottom: 10px;
  color: #333;
}
</style>