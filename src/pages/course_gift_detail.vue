<template>
  <div class="course_gift_detail">
    <div class="top-content">
      <div class="gift-box">
        <img src="https://kf.ybc365.com/train/Public/train/user/common/img/gift02.png" />
        <span class="gift01">×</span>
        <span class="gift-num">{{GiveLiwuDetail.gift_num}}</span>
      </div>
      <p class="text01">{{GiveLiwuDetail.buyer}}买单请你看视频</p>
      <p class="text02">￥{{GiveLiwuDetail.money}}</p>
    </div>
    <!-- 标题 、 时间 -->
    <div class="middle-box">
      <p class="m-topic"></p>
      <p class="m-topic02">{{GiveLiwuDetail.title}}</p>
      <p class="m-time">{{GiveLiwuDetail.createtime}}</p>
    </div>
    <div class="space"></div>
    <!-- 领取明细 -->
    <div class="btm-box">
      <div class="btm-topic">赠礼领取明细</div>
      <div class="border-box">
        <table border="0" cellspacing cellpadding width="100%">
          <tbody>
            <tr>
              <th width="20%">编号</th>
              <th width="58%">使用详情</th>
              <th width="22%">发送状态</th>
            </tr>
            <tr v-for="(item,index) in GiveLiwuDetail.gift_info" :key="index">
              <td style="color:#888;">1</td>
              <td style="color:#888;">{{item.name}}</td>
              <td>
                <span class="send" v-if="item.status == 0" @click="share('only',item.id);showPic()">发送</span>
                <span class="sendOver" v-if="item.status == 2">已领取</span>
                <span class="send" v-if="item.status == 1">已发送</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button class="share-btn" @click="share('all',g_ids);showPic()" v-if="GiveLiwuDetail.gift_num != 0">一键分享所有赠礼</button>
    <button class="share-btn disabled" v-if="GiveLiwuDetail.gift_num == 0">一键分享所有赠礼</button>
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper">
        <img src="../../static/img/click.png" class="shareImg" />
      </div>
    </van-overlay>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqGiveLiwuDetail } from "../api";
import { wxJS_SDk } from "../util/share";
export default {
  data() {
    return {
      GiveLiwuDetail: "",
      batchcode: this.$route.params.id,
      g_ids: [], //全部的赠礼id
      showOverlay: false
    };
  },
  methods: {
    async getGiveLiwuDetail() {
      const result = await reqGiveLiwuDetail("", this.batchcode);
      console.log(result);
      if (result.code == 1) {
        this.GiveLiwuDetail = result.data;
        let arrs = [];
        result.data.gift_info.map(item => {
          arrs.push(item.id);
        });
        this.g_ids = arrs.join(",");
        //   wxJS_SDk(
        //   this.GiveLiwuDetail.buyer + "送你一份好礼",
        //   "点击领取，限时免费",
        //   'https://h5.ybc365.com/giftCollectionDetails' +
        //     `?parent_id=${sessionStorage.getItem(
        //       "member_id"
        //     )}&type=all&g_id=${this.g_ids}`,
        //   this.GiveLiwuDetail.pic_cover
        // );
        this.share("all", this.g_ids);
      }
    },
    share(type, g_id) {
      wxJS_SDk(
        this.GiveLiwuDetail.buyer + "送你一份好礼",
        "点击领取，限时免费",
        "https://h5.ybc365.com/giftCollectionDetails" +
          `?parent_id=${sessionStorage.getItem(
            "member_id"
          )}&type=${type}&g_id=${g_id}`,
        this.GiveLiwuDetail.pic_cover
      );
    },
    showPic() {
      this.showOverlay = true;
    }
  },
  mounted() {
    this.getGiveLiwuDetail();
  }
};
</script>

<style scoped>
.top-content p {
  margin: 0;
}
.top-content {
  background: #1ad473;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 30px;
}
.text01 {
  font-size: 32px;
  color: #fff;
  line-height: 100px;
}
.text02 {
  font-size: 40px;
  color: #fff;
  margin-top: 28px;
}
.gift-box img {
  width: 160px;
  height: 160px;
}
.gift-box > * {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
}
.gift01 {
  font-size: 40px;
}
.gift-num {
  font-size: 46px;
}
/* 标题、时间 */
.middle-box {
  padding: 20px 20px;
}
.middle-box p {
  margin: 0;
}
.m-topic {
  font-size: 36px;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.m-topic02 {
  color: #888;
  font-size: 29px;
}
.m-time {
  color: #888;
  font-size: 29px;
  text-align: right;
}
.space {
  height: 24px;
  background: #eeeff1;
}
/* 领取明细 */
.btm-box {
  padding: 24px 30px 0 30px;
}
.btm-topic {
  padding: 24px 0;
  font-size: 32px;
  color: #333;
}
.border-box {
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
}
table {
  width: 100%;
}
table tr {
  height: 90px;
  line-height: 90px;
}
table tr th {
  font-size: 30px;
  color: #888;
}
table tr td,
table tr th {
  font-weight: lighter;
  text-align: center;
}
table tr td {
  font-size: 28px;
  color: #333;
}
.send {
  color: #1ad473;
  border: 2px solid #1ad473;
  border-radius: 5px;
  line-height: 0;
  padding: 2px 15px;
}
.share-btn {
  font-size: 28px;
  color: #fff;
  background: #1ad473;
  padding: 20px 0;
  width: 80%;
  margin-left: 10%;
  border-radius: 100px;
  margin-top: 60px;
  margin-bottom: 30px;
  border: none;
}
.sendOver {
  font-size: 30px;
  color: #333;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.shareImg {
  position: absolute;
  top: 20px;
  right: 0;
}
.disabled{
  background: #c2c2c2;

}
</style>