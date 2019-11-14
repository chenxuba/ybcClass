<template>
      <van-col
        span="12"
        class="left"
        @click="goDetail(videoObj)"
      >
        <img :src="videoObj.cover" />
        <!-- 即将直播 -->
        <div class="infoStart" v-if="videoObj.live_status == 0">即将直播</div>
        <div class="infoStart" v-if="videoObj.live_status == 1 || videoObj.live_status == 6">正在直播</div>
        <div class="infoStart" v-if="videoObj.live_status == 2">
          观看回放
          <van-icon name="replay" class="replay" />
        </div>
        <!-- 正在直播标志 -->
        <div class="live" v-if="videoObj.live_status == 1 || videoObj.live_status == 6">
          <span>LIVE</span>
        </div>

        <!-- 直播是否收费或者公开还是密码标志 -->
        <div class="code" v-if="videoObj.needpay == 0">公开</div>
        <div class="code" v-if="videoObj.needpay == 4">密码</div>
        <div class="code" v-if="videoObj.needpay == 2">学员</div>
        <!-- 直播标题 -->
        <div class="video_title">
          <span>
            <van-notice-bar class="marquee" color="#fff" scrollable>{{videoObj.title}}</van-notice-bar>
          </span>
        </div>
        <!-- 头像和点赞量 -->
        <div class="bottom">
          <span>
            <img :src="videoObj.headimgurl" alt />
          </span>
          <span>
            <van-icon name="like-o" class="icon" />
            {{videoObj.likes}}
          </span>
        </div>
      </van-col>
</template>

<script>
export default {
  props: {
    videoObj: Object
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        path: "/classDetail/" + item.id
      });
    }
  }
};
</script>

<style scoped>

 .left {
  height: 700px;
  background: #fff;
  position: relative;
  background: radial-gradient(rgb(110, 248, 230), transparent);
  /* filter: blur(10px); */
  /* z-index: -1; */
}
 .left img {
  width: 100%;
  height: 92%;
  vertical-align: middle;
  object-fit: contain;
}
 .left .bottom {
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
}
 .left .bottom span:first-child {
  display: inline-block;
  width: 60px;
  height: 60px;
  position: relative;
  top: -40px;
  left: 20px;
}
 .left .bottom span:first-child img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
 .left .bottom span:nth-child(2) {
  font-size: 20px;
  margin-top: 15px;
  margin-right: 20px;
  color: #666;
}
 .left .bottom span:nth-child(2) .icon {
  /* margin-right: 5px; */
  font-size: 24px;
  vertical-align: top;
  margin-top: -2px;
}
 .left .infoStart {
  position: absolute;
  font-size: 26px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  width: 220px;
  text-align: center;
  padding: 12px 0;
  border-radius: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
}
 .left .infoStart .replay {
  vertical-align: top;
  margin-left: 10px;
}
 .left .live {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  color: #fff;
  padding: 5px 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 26px;
  /* letter-spacing: 2px; */
}
 .left .live span::before {
  display: inline-block;
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: greenyellow;
  position: relative;
  top: -3px;
  left: -6px;
}
/* 直播公开标志 */
 .left .code {
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 2px;
  color: #fff;
  padding: 5px 10px 5px 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 26px 0 0 26px;
  background: #5dd6c7;
}
/* 直播标题 */
 .left .video_title {
  width: 100%;
}
 .left .video_title span {
  font-size: 26px;
  position: absolute;
  top: 10%;
  color: #fff;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 10px 20px;
}
 .left .video_title .marquee {
  border-radius: 50px;
  background: rgba(93, 214, 199, 0.4);
  height: 100%;
}
.video_img {
  width: 50%;
}
</style>