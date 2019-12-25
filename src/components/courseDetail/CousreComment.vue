<template>
  <div class="CousreComment">
    <div v-if="CoursePingJia.errcode != 0">
      <div class="box-warp" v-for="(item,index) in CoursePingJia.evaluate" :key="index">
        <div class="top flex">
          <div class="left">
            <img
              src="https://kf.ybc365.com/train/Public/train/user/common/img/user.png"
              v-if="item.is_anonymous == 2"
              width="100%"
            />
            <img
              v-lazy="item.headimgurl || 'https://kf.ybc365.com/train/Public/train/user/common/img/user.png'"
              v-else
              width="100%"
            />
          </div>
          <div class="title">
            <p v-if="item.is_anonymous == 2">********</p>
            <p v-else>{{item.name}}</p>
            <p>
              <van-rate v-model="CoursePingJia.avg" readonly allow-half color="#f0ca56" size="12" />
            </p>
          </div>
          <div class="right">
            <p class="time">{{item.createtime}}</p>
          </div>
        </div>
        <div class="center flex">{{item.content}}</div>
      </div>
    </div>
    <div class="wupingjia" v-else>
      <img src="../../../static/img/pingjia.jpeg" alt />
      <p>暂无评价</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    CoursePingJia: Object
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}
.CousreComment {
  width: 100%;
  min-height: 1000px;
  padding: 12px 25px 24px 25px;
  box-sizing: border-box;
  border-top: 2px solid #f0f0f0;
  padding-bottom: 0px;
}
.CousreComment .box-warp {
  width: 100%;
  /* height: 236px; */
  padding-bottom: 25px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 25px;
  padding-top: 20px;
}
.CousreComment .box-warp .top {
  width: 100%;
  height: 86px;
  background: #fff;
}
.CousreComment .box-warp .top .left {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  margin-right: 24px;
}
.CousreComment .box-warp .top .left img {
  border-radius: 50%;
}
.CousreComment .box-warp .top .right {
  flex: 1;
}
.CousreComment .box-warp .top .title {
  width: 300px;
  height: 86px;
  line-height: 45px;
}
.CousreComment .box-warp .top .title p {
  font-size: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #999;
  margin: 0;
}
.CousreComment .box-warp .top .right .time {
  font-size: 26px;
  color: #999;
  line-height: 50px;
  text-align: right;
}
.CousreComment .box-warp .center {
  width: 100%;
  font-size: 26px;
  color: #666;
  line-height: 40px;
  padding-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* text-indent: 2em; */
  padding-left: 20px;
}

.CousreComment .box-warp .bottom {
  width: 100%;
  line-height: 70px;
  justify-content: flex-end;
  height: 80px;
}
.CousreComment .box-warp .bottom span {
  font-size: 26px;
  display: flex;
  align-items: center;
  color: #999;
}
.CousreComment .box-warp .bottom span:first-child {
  margin-right: 30px;
}
.CousreComment .box-warp .bottom span .icon {
  font-size: 30px;
  margin-right: 2px;
}
.line {
  width: 100%;
  height: 2px;
  background-color: #f0f0f0;
}
.wupingjia {
  text-align: center;
}
.wupingjia img {
  margin-top: 180px;
}
.wupingjia p {
  font-size: 30px;
  color: #999;
  line-height: 50px;
}
</style>