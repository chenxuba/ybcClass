<template>
  <div
    class="palyer"
    @touchmove.prevent
    v-wechat-title="$route.meta.title = ClassTimePlayer.title"
    v-height
  >
    <!-- 播放器 -->
    <div class="video">
      <div id="mse" ref="videoRef"></div>
      <van-overlay :show="showzhezhao" z-index="2000">
        <div class="jieshu" v-show="showjieshu">
          <span>直播已经结束，稍后查看回放</span>
          <van-icon name="replay" class="icon" />
        </div>
        <div class="jieshu" v-show="showyugao">
          <span>
            直播倒计时
            <br />
            <!-- {{ClassTimePlayer.res_info.starttime}} -->
            <van-count-down :time="daojishitime" format="DD 天 HH 时 mm 分 ss 秒" />
          </span>
        </div>
      </van-overlay>
    </div>
    <!-- 头部 -->
    <Top
      :ClassTimePlayer="ClassTimePlayer"
      :paiHangBang="paiHangBang"
      :res_id="res_id"
      :is_guanzhu="is_guanzhu"
      @event="guanzhuTeacher"
    ></Top>
    <!-- 点赞组件 -->
    <Like ref="likes" :user_id="wsConfig.user_id"></Like>
    <!-- 底部 -->
    <Bottom ref="bottomChild" :msgList="msgList" @touchWebsocketsend="touchWebsocketsend"></Bottom>
    <!-- 点击礼物图片弹出的礼物容器 -->
    <van-action-sheet
      v-model="showLiwu"
      title="发送礼物"
      color="#fff"
      :round="false"
      class="bg"
      @close="showmsg"
    >
      <Liwu :liwuList="liwuList" @showPay="showPays" @dashang="showDaShang"></Liwu>
    </van-action-sheet>
    <!-- 请选择支付方式  -->
    <van-dialog
      v-model="showPay"
      title="请选择支付方式"
      closeOnClickOverlay
      :showConfirmButton="false"
      class="dialog"
    >
      <Pay
        @closeMain="showPays"
        :liwuID="liwuID"
        :Restype="type"
        :multiply="multiply"
        @liwuChufaWs="liwuChufaWs2"
        @showPwdInput="showPwdInput2"
        :lingQianMoney="lingQianMoney"
      ></Pay>
    </van-dialog>
    <!-- 打赏弹窗 -->
    <van-popup
      v-model="showDashang"
      closeOnClickOverlay
      :showConfirmButton="false"
      class="dialogDashang"
      closeable
    >
      <Dashang :ClassTimePlayer="ClassTimePlayer"></Dashang>
    </van-popup>
    <!-- 零钱支付密码输入框 -->
    <van-popup v-model="showPwdInput" position="bottom" :style="{ height: height }" round>
      <pwdNumber
        :liwuID="liwuID"
        :multiply="multiply"
        :Restype="type"
        @closePwdInput="closePwdInput2"
        @liwuChufaWs="liwuChufaWs2"
        @ShuaXinlingQianMsg="getlingQianMsg"
      ></pwdNumber>
    </van-popup>
    <!-- ppt容器弹出层 -->
    <van-popup v-model="showPPt" position="top" v-if="ppt != ''">
      <van-swipe style="height: 220px;" @change="onChange">
        <van-swipe-item v-for="(item,index) in ppt" :key="index">
          <img :src="item.img_url" alt width="100%" height="100%" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{ppt.length}}</div>
      </van-swipe>
    </van-popup>
  </div>
</template>

<script>
import {
  reqClassTimePlayer,
  reqVideoUrl,
  wsUrl,
  reqLiwu,
  reqlingQianMsg,
  reqTeacherGuanzhu
} from "../api";
import { wxJS_SDk } from "../util/share";
import Like from "../components/player/like";
import Top from "../components/player/top";
import Bottom from "../components/player/bottom";
import Liwu from "../components/player/liwu";
import Pay from "../components/player/pay";
import Dashang from "../components/player/dashang";
import pwdNumber from "../components/player/pwdNumber";

import { Toast } from "vant";
export default {
  data() {
    return {
      ClassTimePlayer: {
        res_info: {}
      },
      videoUrl: "",
      pwd: this.$route.query.pwd, //资源的密码
      res_id: this.$route.params.id, //课时id
      poster:
        "https://kf.ybc365.com/train/Public/train/user/live/img/default_bg.png",
      paiHangBang: {},
      wsConfig: {
        member_uuid: sessionStorage.getItem("uuid"), //uuid
        member_id: sessionStorage.getItem("member_id"), //uuid
        user_id: "", //导师id
        live_room: this.$route.params.id //直播间id
        // timestamp: Date.parse(new Date())
        //   .toString()
        //   .substr(0, 10)
      },
      msgList: [],
      liwuList: [], //礼物列表
      type: "", //根据type值判断send方法
      showLiwu: false, //礼物容器弹窗
      showDashang: false, //打赏弹窗
      timer1: null,
      timer2: null,
      timer3: null,
      timer4: null,
      timer5: null,
      timer6: null,
      timer7: null,
      showPay: false, //弹出支付
      hiddenTime: "",
      liwuID: "", //礼物id
      multiply: "", //倍数
      showPwdInput: false, //零钱支付密码输入框是否显示
      height: "50%",
      lingQianMoney: "", //用户的零钱余额
      showPPt: false, //ppt容器是否开启
      ppt: [], //ppt数据
      current: 0,
      is_guanzhu: 0, //是否关注导师
      showzhezhao: false, //是否显示结束或者预告遮罩层
      showjieshu: false, //是否直播结束
      showyugao: false, //是否是直播预告
      daojishitime: 0 //直播倒计时
    };
  },
  methods: {
    // 获取播放器配置
    getVideoConfig() {
      let player = new HlsJsPlayer({
        id: "mse",
        url: this.videoUrl,
        playsinline: true,
        whitelist: [""],
        "x5-video-player-type": "h5",
        "x5-video-player-fullscreen": "false",
        "x5-video-orientation": "portraint",
        closeVideoClick: true,
        closeVideoTouch: true,
        keyShortcut: "off",
        closeVideoDblclick: true,
        playbackRate: [0.5, 1, 1.5, 2],
        width: "100%",
        height: "100%",
        poster:
          "https://kf.ybc365.com/train/Public/train/user/live/img/default_bg.png",
        autoplay: false
      });
    },
    //触发请求，播放页详情
    async getClassTimePlayer() {
      const result = await reqClassTimePlayer(this.res_id);
      console.log(result);
      if (result.code == 1) {
        this.ClassTimePlayer = result.data;
        this.poster = result.data.cover;
        this.wsConfig.user_id = result.data.user_id;
        this.type = result.data.type;
        // console.log(this.type);
        let s1 = this.dateFormat(new Date()); //倒计时 
        let s2 = result.data.res_info.starttime;
        this.daojishitime = new Date(s2.replace(/-/g, "/")) - new Date(s1.replace(/-/g, "/"));
        wxJS_SDk(
          this.ClassTimePlayer.title,
          "精彩直播，点击进入，要你好看！",
          window.location.href + `?parent_id=${this.wsConfig.member_id}`,
          this.ClassTimePlayer.cover
        );
        this.connection();
      } else if (result.code == -8) {
        Toast.fail("该资源已删除");
        this.$router.go(-1);
      } else {
        if (result.code == -7) {
          if (isWx()) {
            console.log("过期了");
          } else {
            alert("登录过期，请重新登录");
            this.$router.push("/login");
          }
        }
      }
    },
    // 获取视频地址和聊天记录
    async getVideoUrl() {
      const result = await reqVideoUrl(this.res_id, this.pwd);
      console.log(result);
      if (result.code == 1) {
        this.is_guanzhu = result.data.is_user_follow;
        sessionStorage.setItem("videoUrl", result.data.videourl);
        if (result.data.videourl != 4004 && result.data.videourl != "") {
          this.videoUrl = result.data.videourl;
        } else if (result.data.videourl == "") {
          this.showzhezhao = true;
          if (result.data.videourl == 4004) {
            this.showjieshu = true;
          } else if (result.data.videourl == "") {
            this.showyugao = true;
          }
        }
        this.paiHangBang = result.data.data;
        this.msgList = result.data.data.res_log.count;
        this.ppt = result.data.data.ppt;
        // console.log(this.ppt);
        this.getVideoConfig();
      } else if (result.code == -6) {
        Toast("该资源需要输入密码");
        this.$router.push(`/classDetail/${this.res_id}`);
      } else if (result.code == -3) {
        Toast("未购买此资源");
      }
    },
    // 连接ws
    connection() {
      this.ws = new WebSocket(wsUrl);
      this.ws.onmessage = this.websocketonmessage;
      this.ws.onopen = this.websocketonopen;
      this.ws.onclose = this.websocketclose;
      this.ws.onerror = this.websocketerror;
    },
    // 数据接收
    websocketonmessage(e) {
      let msg_data = JSON.parse(e.data);
      var timestamp;
      if (msg_data.timestamp != undefined) {
        timestamp = msg_data.timestamp;
      } else {
        timestamp = Math.round(new Date().getTime() / 1000).toString();
      }
      switch (msg_data.type) {
        case "ping":
          const msg_pong = {
            type: "pong",
            live_room: this.wsConfig.live_room,
            timestamp: timestamp,
            user_id: this.wsConfig.user_id.toString(),
            s_id: "1"
          };
          this.websocketsend(JSON.stringify(msg_pong));
          break;
        case "live_login":
        case "video_login":
        case "audio_login":
        case "radio_login":
          this.msgList.push(msg_data);
          break;
        case "live_logout":
        case "video_logout":
        case "audio_logout":
        case "radio_logout":
          this.msgList.push(msg_data);
          break;
        case "live_say":
        case "video_say":
        case "radio_say":
        case "audio_say":
          this.msgList.push(msg_data);
          break;
        case "live_reward":
        case "video_reward":
        case "radio_reward":
        case "audio_reward":
          this.msgList.push(msg_data);
          break;
        case "live_redbag":
        case "video_redbag":
        case "radio_redbag":
        case "audio_redbag":
          this.msgList.push(msg_data);
          break;
        case "live_like":
        case "video_like":
        case "radio_like":
        case "audio_like":
          //监测到有人点赞，触发飘心方法
          this.startPiao();
          // 实时更新点赞数
          this.ClassTimePlayer.likes = msg_data.like_num;
          this.msgList.push(msg_data);
          break;
      }
    },
    //数据发送
    websocketsend(Data) {
      this.ws.send(Data);
    },
    // 关闭ws
    websocketclose(e) {
      // this.ws.close();
      console.log("连接关闭，定时重连");
      //connect();
      setTimeout(this.connection(), "5000");
      // alert("链接关闭了");
    },
    // ws发生错误
    websocketerror() {
      console.log("出现错误");
    },
    // 连接建立之后执行send方法发送数据，登录
    websocketonopen() {
      switch (this.type) {
        // 正在直播的视频
        case 2:
          let lives_login = {
            type: "live_login",
            member_uuid: this.wsConfig.member_uuid,
            live_room: this.wsConfig.live_room,
            equal_user_id: this.wsConfig.user_id.toString(),
            s_id: "1"
          };
          this.websocketsend(JSON.stringify(lives_login));
          break;
        // 视频（录播）
        case 3:
          let video_login = {
            type: "video_login",
            member_uuid: this.wsConfig.member_uuid,
            video_room: this.wsConfig.live_room,
            equal_user_id: this.wsConfig.user_id.toString(),
            s_id: "1"
          };
          this.websocketsend(JSON.stringify(video_login));
          break;
        // 回放的直播
        case 4:
          let live_login = {
            type: "live_login",
            member_uuid: this.wsConfig.member_uuid,
            live_room: this.wsConfig.live_room,
            equal_user_id: this.wsConfig.user_id.toString(),
            s_id: "1"
          };
          this.websocketsend(JSON.stringify(live_login));
          break;
        // 正在直播的音频
        case 8:
          let audio_login = {
            type: "radio_login",
            member_uuid: this.wsConfig.member_uuid,
            live_room: this.wsConfig.live_room,
            equal_user_id: this.wsConfig.user_id.toString(),
            s_id: "1"
          };
          this.websocketsend(JSON.stringify(audio_login));
          break;
        // 回听的音频
        case 9:
          let audios_login = {
            type: "audio_login",
            member_uuid: this.wsConfig.member_uuid,
            live_room: this.wsConfig.live_room,
            equal_user_id: this.wsConfig.user_id.toString(),
            s_id: "1"
          };
          this.websocketsend(JSON.stringify(audios_login));
          break;
        // 上传的音频
        case 10:
          let audioss_login = {
            type: "audio_login",
            member_uuid: this.wsConfig.member_uuid,
            live_room: this.wsConfig.live_room,
            equal_user_id: this.wsConfig.user_id.toString(),
            s_id: "1"
          };
          this.websocketsend(JSON.stringify(audioss_login));
          break;
      }
    },
    // 延迟触发自动飘心效果
    delayed() {
      this.timer1 = setTimeout(() => {
        this.$refs.likes.heartList.push(this.$refs.likes.createHeart());
      }, 400);
      this.timer2 = setTimeout(() => {
        this.$refs.likes.heartList.push(this.$refs.likes.createHeart());
      }, 600);
      this.timer3 = setTimeout(() => {
        this.$refs.likes.heartList.push(this.$refs.likes.createHeart());
      }, 800);
      this.timer4 = setTimeout(() => {
        this.$refs.likes.heartList.push(this.$refs.likes.createHeart());
      }, 1000);
      this.timer5 = setTimeout(() => {
        this.$refs.likes.heartList.push(this.$refs.likes.createHeart());
      }, 1200);
    },
    //用户手动触发飘心效果
    startPiao() {
      this.timer6 = setTimeout(() => {
        this.$refs.likes.heartList.push(this.$refs.likes.createHeart());
      }, 300);
      this.timer7 = setTimeout(() => {
        this.$refs.likes.heartList.push(this.$refs.likes.createHeart());
      }, 600);
    },
    // 点击出现礼物容器
    showLiwuBox() {
      this.showLiwu = true;
      // 隐藏聊天区域
      this.$refs.bottomChild.showMsg = false;
    },
    // 点击出现ppt容器
    showPPtBox() {
      if (this.ppt != "") {
        this.showPPt = true;
      } else {
        this.$toast("导师暂未上传PPT");
      }
    },
    // 显示聊天框
    showmsg() {
      this.$refs.bottomChild.showMsg = true;
    },
    // 获取礼物
    async getLiwu() {
      const result = await reqLiwu(this.res_id);
      console.log(result);
      if (result.code == 1) {
        this.liwuList = result.data;
      }
    },
    // 弹出支付选择框
    showPays(liwuID, multiply) {
      this.liwuID = liwuID;
      console.log(multiply);

      this.multiply = multiply;
      this.showPay = !this.showPay;
      this.showLiwu = false; //这里是控制在支付选择框弹出后隐藏礼物容器
      //this.showLiwu = !this.showLiwu  //这里是控制在支付选择框隐藏后弹出礼物容器
    },
    // 弹出打赏弹窗
    showDaShang() {
      this.showDashang = true;
      this.showLiwu = false;
    },
    // 送礼物触发ws
    liwuChufaWs2(data) {
      this.websocketsend(JSON.stringify(data));
    },
    // 弹出密码输入框
    showPwdInput2() {
      this.showPwdInput = true;
    },
    // 零钱支付完成后关闭密码输入框和支付选择框
    closePwdInput2() {
      this.showPwdInput = false;
      this.showPay = false;
    },
    // 获取用户零钱信息
    async getlingQianMsg() {
      const res = await reqlingQianMsg();
      console.log(res);
      this.lingQianMoney = res.data.total.money;
    },
    // 轮播图轮播改变索引值
    onChange(index) {
      this.current = index;
    },
    //关注导师
    async guanzhuTeacher() {
      const result = await reqTeacherGuanzhu(
        "",
        this.ClassTimePlayer.user_id,
        1
      );
      console.log(result);
      if (result.code == 1) {
        this.$toast(result.data.msg);
        this.is_guanzhu = 1; //赋值给是否关注变量，值为1，就让这个按钮消失
      }
    },
    // touchWebsocketsend 自定义事件
    touchWebsocketsend(live_msg) {
      // console.log(live_msg);
      this.websocketsend(live_msg);
    },
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    }
  },
  mounted() {
    this.getClassTimePlayer();
    this.getVideoUrl();
    this.getLiwu();
    this.getlingQianMsg();
    // console.log(this.$refs.bottomChild.msgList);
    // websoket短线重连
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "hidden") {
        this.hiddenTime = new Date().getTime(); //记录页面隐藏时间
        clearInterval(this.$refs.likes.timer);
      } else {
        let visibleTime = new Date().getTime();
        if ((visibleTime - this.hiddenTime) / 1000 > 5) {
          //页面再次可见的时间-隐藏时间>10S,重连
          // typeof this.ws.close == "function" && this.websocketclose(); //先主动关闭连接
          console.log("主动关闭连接后重连");
          setTimeout(() => {
            // this.connection(); //打开连接，使用的vuejs，这是websocket的连接方法
            this.$refs.likes.setIntervalZan();
          }, 1500); //1.5S后重连
        } else {
          console.log("还没有到断开的时间");
          this.$refs.likes.setIntervalZan();
        }
      }
    });
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      this.height = "70%";
    }
  },
  components: {
    Top,
    Like,
    Bottom,
    Liwu,
    Pay,
    Dashang,
    pwdNumber
  },
  destroyed() {
    //页面销毁时关闭长连接
    this.websocketclose();
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
    clearTimeout(this.timer3);
    clearTimeout(this.timer4);
    clearTimeout(this.timer5);
  }
};
</script>

<style scoped>
.palyer {
  width: 100%;
  background: rgb(0, 0, 0);
  overflow: hidden;
}
.palyer .video {
  height: 100%;
}
.dialog {
  width: 70%;
  border-radius: 10px;
}
.dialogDashang {
  width: 60%;
  border-radius: 20px;
}
.dialogDashang >>> .van-popup__close-icon {
  color: #fff;
}
.dialog >>> .van-dialog__header {
  padding-top: 10px;
  border-bottom: 4px solid #f3f3f3;
}
.bg {
  background: radial-gradient(
    200px 200px at 50% 0,
    rgba(110, 89, 58, 0.62),
    rgba(0, 0, 0, 0.5)
  );
  color: #fff;
  font-family: "Courier New", Courier, monospace;
}
.palyer >>> .van-overlay {
  background-color: transparent;
}
.palyer >>> .danmu {
  color: #fff;
  font-size: 30px;
  margin-top: 110px;
}
.jieshu {
  position: fixed;
  top: 300px;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-size: 30px;
  /* border: 2px solid red; */
  padding: 10px 30px;
}
.jieshu span {
  vertical-align: middle;
}
.jieshu .icon {
  vertical-align: middle;
  font-size: 30px;
}
.custom-indicator {
  position: absolute;
  bottom: 0;
  right: 10px;
  color: red;
  font-size: 28px;
  font-weight: bold;
}
.van-count-down {
  color: #fff;
}
</style>