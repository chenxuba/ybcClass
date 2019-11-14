<template>
  <div class="dianzan" @touchmove.prevent>
    <Scroll>
      <div v-if="gift.errcode == 1">
        <van-row class="boxs" v-for="(item,index) in gift.count" :key="index" gutter="10">
          <van-col span="4">
            <span class="paiming" v-if="index == 0">
              <img src="../../../static/img/icon_j1.png" alt />
            </span>
            <span class="paiming" v-if="index == 1">
              <img src="../../../static/img/icon_j2.png" alt />
            </span>
            <span class="paiming" v-if="index == 2">
              <img src="../../../static/img/icon_j3.png" alt />
            </span>
            <span
              class="paiming paimignum"
              v-if="index != 0 && index != 1 && index!= 2"
            >{{index + 1}}</span>
          </van-col>
          <van-col span="13">
            <div class="name">
              <span>
                <img v-lazy="item.headimgurl" alt />
              </span>
              <span>{{item.name || '昵称正在加载中昵称正在加载中...'}}</span>
            </div>
          </van-col>
          <van-col span="7" class="zan">
            <span>贡献{{(item.money).toFixed(0)}}</span>
          </van-col>
        </van-row>
      </div>
      <div v-else class="none">
        <img src="../../../static/img/none.jpeg" alt />
      </div>
    </Scroll>
  </div>
</template>

<script>
export default {
  props: ["gift"]
};
</script>

<style scoped>
/* 排行榜内点赞样式 */
.dianzan {
  background: #fff;
  overflow: hidden;
  height: 800px;
}
.dianzan .boxs {
  padding: 0 30px;
  height: 120px;
  box-sizing: border-box;
  border-bottom: 2px solid #f0f0f0;
  margin-top: 20px;
  width: 100%;
}
.dianzan .boxs .paiming {
  height: 100px;
  display: inline-block;
  line-height: 100px;
  text-align: center;
}
.dianzan .boxs .paimignum {
  color: #a1a1a1;
  font-size: 42px;
  display: block;
  /* text-indent: 15px; */
}
.dianzan .boxs img {
  width: 60%;
  vertical-align: middle;
}
.dianzan .boxs .name {
  font-size: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dianzan .boxs .name img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5dd6c7;
}
.dianzan .boxs .name span:first-child {
  margin-right: 15px;
}
.dianzan .boxs .name span:nth-child(2) {
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dianzan .boxs .zan {
  font-size: 28px;
  text-align: right;
  color: #ffb72d;
}
.dianzan .boxs .zan span {
  display: inline-block;
  height: 100px;
  line-height: 100px;
}
.dianzan .none {
  width: 100%;
  text-align: center;
}
.dianzan .none img {
  width: 80%;
  margin-top: 200px;
}
</style>