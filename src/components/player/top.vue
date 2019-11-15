<template>
  <div class="top_box">
    <!-- 头部 -->
    <van-row class="top">
      <van-col span="16">
        <div class="left">
          <van-row class="row">
            <van-col span="6" class="span1 span">
              <img
                :src="ClassTimePlayer.headimgurl"
                v-if="ClassTimePlayer.headimgurl != undefined"
                alt
              />
            </van-col>
            <van-col span="9" class="span2 span">
              <h1 class="name">{{ClassTimePlayer.user_name}}</h1>
              <h1 class="zan">
                <van-icon name="like" class="icon" />
                {{ClassTimePlayer.likes}}
              </h1>
            </van-col>
            <van-col span="9" class="span3 span">
              <span class="guanzhu">关注</span>
            </van-col>
          </van-row>
        </div>
      </van-col>
      <van-col span="8">
        <div class="right">
          <van-row>
            <van-col span="16" class="paihangbang" @click="showPaihangbang">
              <img src="../../../static/img/icon_j1.png" alt /> 排行榜
            </van-col>
            <van-col span="8" class="close" @click="goBack">
              <van-icon name="cross" class="icon" />
            </van-col>
          </van-row>
        </div>
      </van-col>
    </van-row>
    <!-- 排行榜 -->
    <van-action-sheet v-model="show" title="排行榜" class="dilog">
      <van-tabs type="card">
        <van-tab title="点赞">
          <paihangbang :zan="paiHangBang.res_like_num"></paihangbang>
        </van-tab>
        <van-tab title="邀约">
          <paihangbang1 :yue="paiHangBang.share_count"></paihangbang1>
        </van-tab>
        <van-tab title="礼物">
          <paihangbang2 :gift="paiHangBang.res_money_num"></paihangbang2>
        </van-tab>
      </van-tabs>
    </van-action-sheet>
  </div>
</template>

<script>
import paihangbang from "../../grandson/top/paiHangBang";
import paihangbang1 from "../../grandson/top/paiHangBang1";
import paihangbang2 from "../../grandson/top/paiHangBang2";
import NumberGrow3 from "../numberGrow/numberGrow3";
export default {
  props: ["ClassTimePlayer", "paiHangBang","res_id"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    //弹出排行榜组件
    showPaihangbang() {
      this.show = !this.show;
    },
    goBack() {
      this.$router.push(`/classDetail/${this.res_id}`);
    }
  },
  components: {
    paihangbang,
    paihangbang1,
    paihangbang2,
    NumberGrow3
  }
};
</script>

<style scoped>
.top_box {
  width: 100%;
}
/* 排行榜样式 */
.van-tabs--card {
  padding-top: 0;
}
/* 头部样式 */
.top_box .top {
  position: fixed;
  top: 30px;
  left: 0;
  right: 0;
  /* background: #fff; */
  display: flex;
  z-index: 1990 !important;
  padding-left: 25px;
  padding-right: 15px;
  box-sizing: border-box;
  vertical-align: middle;
  height: 70px;
  margin-top: 10px;
}
.top_box .top .left {
  width: 300px;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
}
.top_box .top .left .row {
  height: 70px;
  padding-top: 2px;
}
.top_box .top .left img {
  width: 66px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}
.top_box .top .left .span {
  font-size: 24px;
  height: 70px;
}
@media (device-height: 480px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone4/4s */
  .top_box .top .left .name {
    transform: scale(0.8);
    margin-left: -10px !important;
    margin-top: 0px !important;
  }
  /* 兼容iphone4/4s */
  .top_box .top .left .zan {
    transform: scale(0.7) !important;
    margin-left: -18px !important;
    margin-top: -5px !important;
  }
  .hearts-canvas {
    right: 40px !important;
  }
}
@media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone5 */
  .top_box .top .left .name {
    transform: scale(0.8);
    margin-left: -10px !important;
    margin-top: 0px !important;
  }
  /* 兼容iphone5 */
  .top_box .top .left .zan {
    transform: scale(0.7) !important;
    margin-left: -18px !important;
    margin-top: -2px !important;
  }
  .hearts-canvas {
    right: 40px !important;
  }
}
.top_box .top .left .name {
  font-size: 24px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0 0px 0;
  color: #fff;
  transform: scale(0.8);
  margin-left: -10px;
  height: 34px;
}
.top_box .top .left .zan {
  font-size: 24px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  transform: scale(0.9);
  line-height: 25px;
  margin-left: -5px;
  color: #fff;
  margin-top: -5px;
}
.top_box .top .left .zan .icon {
  transform: scale(0.9);
  color: red;
  transform: translateY(3px);
  margin-right: 5px;
  /* margin-top: 2px; */
}
.top_box .top .left .guanzhu {
  width: 100px;
  height: 40px;
  background: rgb(211, 104, 17);
  display: inline-block;
  border-radius: 30px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  margin-top: 12px;
}
/* 右边样式 */
.top_box .top .right {
  font-size: 24px;
  height: 66px;
}
.top_box .top .right .paihangbang {
  font-size: 30px;
  color: rgb(252, 186, 5);
  line-height: 66px;
}
.top_box .top .right .paihangbang img {
  width: 40px;
  vertical-align: middle;
  margin-top: -6px;
}
.top_box .top .right .icon {
  font-size: 36px;
  color: #fff;
  line-height: 66px;
  margin-top: 2px;
}
.top_box .top .right .close {
  text-align: center;
  height: 70px;
}
</style>