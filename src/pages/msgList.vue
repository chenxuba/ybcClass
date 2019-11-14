<template>
  <div class="msgList">
    <van-nav-bar title="消息列表" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="new-list">
      <div class="naa">
        <router-link to="#">
          <div class="top">
            <div class="one">
              <img src="../../static/img/xitong.png" />
            </div>
            <!---->
            <div class="text">
              <p class="aa">系统消息</p>
              <p class="bb">暂无新消息</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="new-list">
      <div class="naa">
        <router-link to="#">
          <div class="top">
            <div class="one">
              <img src="../../static/img/profit.png" />
            </div>
            <!---->
            <div class="text">
              <p class="aa">收益消息</p>
              <p class="bb">暂无新消息</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="new-list">
      <div class="naa">
        <router-link to="#">
          <div class="top">
            <div class="one">
              <img src="../../static/img/exam.png" />
            </div>
            <!---->
            <div class="text">
              <p class="aa">考试消息</p>
              <p class="bb">暂无新消息</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="new-list">
      <div class="naa">
        <router-link to="#">
          <div class="top">
            <div class="one">
              <img src="../../static/img/ask.png" />
            </div>
            <!---->
            <div class="text">
              <p class="aa">问答消息</p>
              <p class="bb">暂无新消息</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="new-list">
      <div class="naa">
        <router-link to="#">
          <div class="top">
            <div class="one">
              <img src="../../static/img/clockin.png" />
            </div>
            <!---->
            <div class="text">
              <p class="aa">打卡消息</p>
              <p class="bb">暂无新消息</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="new-list">
      <div class="naa">
        <router-link to="#">
          <div class="top">
            <div class="one">
              <img src="../../static/img/share.png" />
            </div>
            <!---->
            <div class="text">
              <p class="aa">分享消息</p>
              <p class="bb">暂无新消息</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <goHome></goHome>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
p{
  margin: 0;
}
.msgList {
  width: 100%;
}
.naa {
  width: 92%;
  margin: 0 auto;
  border-bottom: 1px solid #f3f3f3;
  padding: 10px 0;
  position: relative;
}
.naa a {
  color: black;
}
.naa .top {
  position: relative;
  margin-top: 30px;
}
.naa .top .one {
  display: inline-block;
  width: 18%;
  vertical-align: middle;
}
.naa .top .one img {
  width: 80%;
  border-radius: 50%;
}
.text {
  display: inline-block;
  vertical-align: middle;
  width: 60%;
  margin-left: -10px;
}
.text p {
  line-height: 40px;
}
.aa {
  font-size: 32px;
  color: #333;
  position: relative;
  top: 10px;
}
.bb {
  font-size: 26px;
  color: #888;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
}
</style>