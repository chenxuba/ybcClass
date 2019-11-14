<template>
  <div class="box">
    <div class="top">
      <div class="title_img">
        <img :src="teacherObj.headimgurl" alt v-if="teacherObj" />
      </div>
      <div class="title_box">
        <h1>{{teacherObj.name}}</h1>
        <span>已回答{{teacherObj.total_answer}}问题</span>
      </div>
      <div class="title_btn">
        <van-button
          plain
          type="primary"
          size="small"
          color="#5dd6c7"
          :to="'/ask/'+teacherObj.id"
        >{{teacherObj.question_money}}元提问</van-button>
      </div>
    </div>
    <div class="bottom">
      <p>
        <span class="jianjie">导师简介</span>
        {{teacherObj.ask_breif}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teacherObj: Object
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
}
.box .top .title_box h1 {
  font-size: 28px;
  margin: 8px 0 8px 0;
}
.box .top .title_box span {
  font-size: 23px;
  color: #999;
}
.box .top .title_btn {
  margin-top: -10px;
}
.box .bottom {
  font-size: 26px;
  line-height: 45px;
  margin-top: 30px;
}
.box .bottom p {
  background: #6759590a;
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 20px;
  color: #999;
  padding-right: 30px;
}
.box .bottom .jianjie {
  display: block;
  font-size: 26px;
  border-bottom: 1px solid #ece8e8;
  margin: 10px 0;
  padding-bottom: 10px;
  color: #333;
  letter-spacing: 2px;
}
</style>