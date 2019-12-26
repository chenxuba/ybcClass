<template>
  <div class="course_buy01">
    <div class="list">
      <div v-if="audio_res != ''">
        <!-- 图片和标题和价格 -->
        <div class="content-allbox" v-for="(item,index) in audio_res" :key="'audio_res'+index">
          <div class="class-contentbox">
            <div class="img-box">
              <img v-lazy="item.cover" />
            </div>
            <div class="content-detail">
              <div class="detail-name">
                <h4>{{item.title}}</h4>
                <div class="content-money">¥{{item.money}}</div>
              </div>
              <div class="detail-time">
                <span>音频</span>
                购买于:
                <span>{{item.paytime}}</span>
              </div>
            </div>
          </div>
          <div class="btnbox">
            <van-button plain type="primary" size="mini" color="#5dd6c7">评价</van-button>
            <van-button plain type="primary" size="mini" color="#5dd6c7" class="in">进入课时</van-button>
          </div>
        </div>
      </div>
      <div v-if="live_res != ''">
        <div class="content-allbox" v-for="(item,index) in live_res" :key="'live_res'+index">
          <div class="class-contentbox">
            <div class="img-box">
              <img v-lazy="item.cover" />
            </div>
            <div class="content-detail">
              <div class="detail-name">
                <h4>{{item.title}}</h4>
                <div class="content-money">¥{{item.money}}</div>
              </div>
              <div class="detail-time">
                <span>视频</span>
                购买于:
                <span>{{item.paytime}}</span>
              </div>
            </div>
          </div>
          <div class="btnbox">
            <van-button plain type="primary" size="mini" color="#5dd6c7">评价</van-button>
            <van-button plain type="primary" size="mini" color="#5dd6c7" class="in">进入课时</van-button>
          </div>
        </div>
      </div>
      <div v-if="video_res != ''">
        <div class="content-allbox" v-for="(item,index) in video_res" :key="'video_res'+index">
          <div class="class-contentbox">
            <div class="img-box">
              <img v-lazy="item.cover" />
            </div>
            <div class="content-detail">
              <div class="detail-name">
                <h4>{{item.title}}</h4>
                <div class="content-money">¥{{item.money}}</div>
              </div>
              <div class="detail-time">
                <span>视频</span>
                购买于:
                <span>{{item.paytime}}</span>
              </div>
            </div>
          </div>
          <div class="btnbox">
            <van-button plain type="primary" size="mini" color="#5dd6c7">评价</van-button>
            <van-button plain type="primary" size="mini" color="#5dd6c7" class="in">进入课时</van-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="audio_res == '' && live_res == '' && video_res == ''">
      <div class="noshow">
        <img src="../../../static/img/pingjia.jpeg" alt />
        <p>暂无购买记录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["audio_res", "live_res", "video_res"]
};
</script>

<style scoped>
.course_buy01 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  padding-top: 88px;
}
.course_buy01 .content-allbox {
  width: 100%;
  border-bottom: 15px solid #fafafa;
  padding: 25px 25px 20px 20px;
  box-sizing: border-box;
}
.course_buy01 .content-allbox:last-child {
  border: none;
}
.course_buy01 .content-allbox .class-contentbox {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 15px;
}
.course_buy01 .content-allbox .class-contentbox .img-box {
  width: 260px;
  height: 180px;
}
.course_buy01 .content-allbox .class-contentbox .img-box img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.course_buy01 .content-allbox .class-contentbox .content-detail {
  flex: 1;
  /* background: pink; */
  padding-left: 15px;
}
.course_buy01 .content-allbox .class-contentbox .content-detail .detail-name {
  font-size: 26px;
  display: flex;
  margin-top: 10px;
}
.course_buy01
  .content-allbox
  .class-contentbox
  .content-detail
  .detail-name
  h4 {
  width: 75%;
  line-height: 50px;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 98px;
  margin-top: -6px;
}
.course_buy01
  .content-allbox
  .class-contentbox
  .content-detail
  .detail-name
  .content-money {
  flex: 1;
  text-align: right;
  color: red;
  font-size: 28px;
  margin-top: 7px;
}
.course_buy01 .content-allbox .class-contentbox .content-detail .detail-time {
  font-size: 23px;
  color: #999;
  height: 65px;
  /* background: red; */
  line-height: 110px;
}
.course_buy01
  .content-allbox
  .class-contentbox
  .content-detail
  .detail-time
  span:first-child::after {
  display: inline-block;
  content: "";
  width: 2px;
  height: 17px;
  margin-left: 6px;
  background: #ccc;
}
.content-allbox .btnbox {
  width: 100%;
  line-height: 50px;
  text-align: right;
}
.content-allbox .btnbox .in {
  padding: 0 15px;
}
.course_buy01 .noshow {
  text-align: center;
  padding-top: 180px;
}
.course_buy01 .noshow p {
  font-size: 30px;
  color: #666;
  line-height: 80px;
  letter-spacing: 2px;
}
</style>