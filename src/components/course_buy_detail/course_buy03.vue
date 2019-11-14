<template>
  <div class="course_buy01">
    <!-- <div class="list"> -->
      <!-- 图片和标题和价格 -->
      <!-- <div class="content-allbox" v-for="(item,index) in 6" :key="index">
        <div class="class-contentbox">
          <div class="img-box">
            <img
              src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/459/15671342412805106105_1.png"
            />
          </div>
          <div class="content-detail">
            <div class="detail-name">
              <h4>周永福感觉统合实操-威尔巴格</h4>
              <div class="content-money">¥19.9</div>
            </div>
            <div class="detail-time">
              <span>视频</span>
              购买于:
              <span>2019-09-04 08:02:42</span>
            </div>
          </div>
        </div>
        <div class="btnbox">
          <van-button plain type="primary" size="mini" color="#5dd6c7">评价</van-button>
          <van-button plain type="primary" size="mini" color="#5dd6c7">进入课时</van-button>
        </div>
      </div>
    </div> -->
     <div class="noshow">
      <img src="../../../static/img/pingjia.jpeg" alt="">
      <p>暂无购买记录</p>
    </div>
  </div>
</template>

<script>
export default {};
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
  border-radius: 15px;
}
.course_buy01 .content-allbox .class-contentbox .content-detail {
  flex: 1;
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
  line-height: 40px;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 98px;
  overflow: hidden;

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

.content-allbox .btnbox {
  width: 100%;
  line-height: 50px;
  text-align: right;
}
.course_buy01 .noshow{
  text-align: center;
  padding-top: 180px;
}
.course_buy01 .noshow p{
  font-size: 30px;
  color: #666;
  line-height: 80px;
  letter-spacing: 2px;
}
</style>