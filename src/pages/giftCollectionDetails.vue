<template>
  <div class="warp" v-height>
    <div class="all-content" v-if="isWxLiuLanQi">
      <img :src="giftData.from_member.headimgurl" class="person-img" />
      <div class="content-bottom">
        <p class="rad-topic">{{giftData.from_member.name}}</p>
        <p class="rad-topic02">{{giftData.res_info.title}}</p>
        <img :src="giftData.res_info.pic_cover" class="color-img" />
        <p class="rad-name">讲师: {{giftData.res_info.name}}</p>
        <p class="rad-time">时间: {{giftData.res_info.createtime}}</p>
        <p class="rad-price">￥{{giftData.from_member.u_price}}</p>
        <p class="have-pay">已付款</p>
        <button class="sure-btn" @click="getTakeGift()">领取赠礼</button>
      </div>
    </div>
    <div class="zhezhao" v-if="showZhezhao">
      <img src="../../static/img/wxopen.jpeg" alt />
      <p>来晚一步，赠礼被领取完了</p>
    </div>
  </div>
</template>

<script>
import { reqGiftlingquDetail, reqTakeGift } from "../api";
import { Toast } from "vant";
import { isWx } from "../util";
export default {
  data() {
    return {
      type: this.$route.query.type,
      g_id: this.$route.query.g_id,
      giftData: {
        from_member: {},
        res_info: {}
      }, //赠礼详情
      showZhezhao: false, //遮罩层是否显示
      isWxLiuLanQi: false
    };
  },
  methods: {
    //   获取赠礼详情
    async getGiftlingquDetail() {
      const result = await reqGiftlingquDetail("", this.g_id, this.type);
      console.log(result);
      if (result.code == 1) {
        this.giftData = result.data;
        this.isWxLiuLanQi = true;
      } else if (result.code == -8) {
        Toast.fail("资源已被删除,不能领取！");
        setTimeout(() => {
          this.$router.push("index");
        }, 2000);
      } else if (result.code == -1) {
        this.showZhezhao = true;
      }
    },
    // 点击领取赠礼
    async getTakeGift() {
      const result = await reqTakeGift("", this.giftData.from_member.batchcode);
      if (result.code == 1) {
        this.$router.push("/giftOver");
      } else if (result.code == -1) {
        Toast.fail(result.msg);
      }
    }
  },
  mounted() {
    if (isWx()) {
      this.getGiftlingquDetail();
    } else {
      this.$router.push("/WxOpen");
    }
  }
};
</script>

<style scoped>
.all-content {
  width: 80%;
  margin-left: 5%;
  background: #fff;
  text-align: center;
  box-sizing: border-box;
  margin: auto;
  /* height: 80%; */
  border-radius: 10px;
}
.person-img {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  top: -60px;
}
.content-bottom {
  position: relative;
  top: -40px;
  box-sizing: border-box;
  padding: 0 40px;
}
.rad-topic {
  font-size: 24px;
  color: #888888;
}
.rad-topic02 {
  font-size: 30px;
  color: #333333;
  margin-top: 30px;
  font-weight: bold;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.color-img {
  width: 90%;
  border-radius: 10px;
  margin-top: 28px;
  max-height: 400px;
  object-fit: cover;
}
.rad-name {
  color: #333;
  font-size: 26px;
  margin-top: 28px;
}
.rad-time {
  color: #333;
  font-size: 26px;
  margin-top: 28px;
}
.rad-price {
  color: #888888;
  font-size: 34px;
  margin-top: 30px;
  font-weight: bold;
  text-decoration: line-through;
}
.have-pay {
  margin-top: 24px;
  font-size: 26px;
  color: #888888;
}
.sure-btn {
  font-size: 28px;
  color: #ffffff;
  background: #1ad473;
  border-radius: 40px;
  margin: 60px 0;
  min-width: 60%;
  height: 70px;
  line-height: 70px;
  border: none;
  outline: none;
}
.warp {
  width: 100%;
  background: #eeeff1;
  padding-top: 130px;
  box-sizing: border-box;
  text-align: center;
}
/* 遮罩层 */
.zhezhao {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #f8f8f8;
}
.zhezhao img {
  width: 25%;
  margin-top: 100px;
}
.zhezhao p {
  font-size: 36px;
  color: #333;
  line-height: 100px;
}
</style>