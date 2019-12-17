<template>
  <div>
    <!-- 底部 -->
    <div class="bottom">
      <van-row>
        <van-col span="15">
          <div class="input_warp">
            <form action="javascript:void(0)">
              <input
                type="text"
                placeholder="说点什么..."
                class="input"
                v-model="msgValue"
                @keydown="printMsg($event)"
                @blur="fixScroll"
              />
            </form>
          </div>
        </van-col>
        <van-col span="3" class="liwu ppt" @click="showPPtBoxs">
          <span>
            <van-icon name="http://qiniu.ybc365.com/ppt.png" class="icon" />
          </span>
        </van-col>
        <van-col span="3" class="zan">
          <span class="fenxiang">
            <van-icon name="like" id="zan" class="icon animated tada infinite" />
          </span>
        </van-col>
        <van-col span="3" class="liwu" @click="showLiwu">
          <span>
            <van-icon name="http://qiniu.ybc365.com/liwu.png" class="icon" />
          </span>
        </van-col>
      </van-row>
    </div>
    <!-- 聊天消息显示区域 -->
    <div class="wrapper" ref="wrapper" v-show="showMsg">
      <ul class="ul_warp">
        <li v-for="(item,index) in msgList" :key="index">
          <!-- 发言 xxx：说了什么话 -->
          <span class="login_name" v-if="item.content_type == 1">
            {{item.name == '' ? '游客' : item.name}}:
            <span class="content">{{item.content}}</span>
          </span>
          <!-- xxx点亮了❤️ -->
          <span v-else-if="item.content_type == 2 && item.special != 'special'">
            <span class="login_name">{{item.name == '' ? randomName : item.name}}</span>&nbsp;点亮了
            <van-icon name="like" class="icon" />
          </span>
          <!-- xxx打赏了棒棒糖 X 1 -->
          <span v-else-if="item.content_type == 3 || item.content_type == 7">
            <span class="login_name">{{item.name == '' ? '游客' : item.name}}</span>
            <span class="dashang">打赏了{{item.meaning}}x{{item.multiple}}</span>
          </span>
          <!-- xxx进入了房间 -->
          <span
            v-if="item.type == 'live_login' || item.type == 'video_login' || item.type == 'audio_login' || item.type == 'radio_login'"
          >
            <span class="login_name">{{item.name == '' ? '游客' : item.name}}</span>&nbsp;进入了房间
          </span>
          <!-- xxx离开了房间 -->
          <span
            v-if="item.type == 'live_logout' || item.type == 'video_logout' || item.type == 'audio_logout' || item.type == 'radio_logout'"
          >
            <span class="login_name">{{item.name == '' ? '游客' : item.name}}</span>&nbsp;离开了房间
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: ["msgList"],
  data() {
    return {
      msgValue: "",
      scroll: "",
      showMsg: true
    };
  },
  methods: {
    //发送消息
    printMsg(ev) {
      var _this = this;
      switch (_this.$parent.type) {
        // 正在直播的视频
        case 2:
          let lives_msg = {
            type: "live_say",
            s_id: "1",
            member_uuid: _this.$parent.wsConfig.member_uuid,
            equal_user_id: _this.$parent.wsConfig.user_id,
            content: _this.msgValue
          };
          //键盘回车的编码是13
          if (ev.keyCode == 13 && _this.msgValue != "") {
            _this.$parent.websocketsend(JSON.stringify(lives_msg));
            _this.msgValue = "";
          }
          break;
        // 视频（录播）
        case 3:
          let video_msg = {
            type: "video_say",
            s_id: "1",
            member_uuid: _this.$parent.wsConfig.member_uuid,
            equal_user_id: _this.$parent.wsConfig.user_id.toString(),
            content: _this.msgValue
          };
          //键盘回车的编码是13
          if (ev.keyCode == 13 && _this.msgValue != "") {
            _this.$parent.websocketsend(JSON.stringify(video_msg));
            _this.msgValue = "";
          }
          break;
        // 回放的直播
        case 4:
          let live_msg = {
            type: "live_say",
            s_id: "1",
            member_uuid: _this.$parent.wsConfig.member_uuid,
            equal_user_id: _this.$parent.wsConfig.user_id.toString(),
            content: _this.msgValue
          };
          // console.log(live_msg);
          //键盘回车的编码是13
          if (ev.keyCode == 13 && _this.msgValue != "") {
            // 自定义一个事件，触发父组件的websocketsend方法
            _this.$emit("touchWebsocketsend", JSON.stringify(live_msg));
            // _this.$parent.websocketsend(JSON.stringify(live_msg));
            _this.msgValue = "";
          }
          break;
        // 正在直播的音频
        case 8:
          let radio_say = {
            type: "radio_say",
            s_id: "1",
            member_uuid: _this.$parent.wsConfig.member_uuid,
            equal_user_id: _this.$parent.wsConfig.user_id.toString(),
            content: _this.msgValue
          };
          //键盘回车的编码是13
          if (ev.keyCode == 13 && _this.msgValue != "") {
            _this.$parent.websocketsend(JSON.stringify(radio_say));
            _this.msgValue = "";
          }
          break;
        // 回听的音频
        case 9:
          let audios_say = {
            type: "audio_say",
            s_id: "1",
            member_uuid: _this.$parent.wsConfig.member_uuid,
            equal_user_id: _this.$parent.wsConfig.user_id.toString(),
            content: _this.msgValue
          };
          if (ev.keyCode == 13 && _this.msgValue != "") {
            _this.$parent.websocketsend(JSON.stringify(audios_say));
            _this.msgValue = "";
          }
          break;
        // 上传录播的音频
        case 10:
          let audioss_say = {
            type: "audio_say",
            s_id: "1",
            member_uuid: _this.$parent.wsConfig.member_uuid,
            equal_user_id: _this.$parent.wsConfig.user_id.toString(),
            content: _this.msgValue
          };
          if (ev.keyCode == 13 && _this.msgValue != "") {
            _this.$parent.websocketsend(JSON.stringify(audioss_say));
            _this.msgValue = "";
          }
          break;
      }
    },
    /* 使文本框出现在视野内 */
    fixScroll() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        window.scrollTo(0, 0);
      }
    },
    //滚动到底部
    scrollTobottom() {
      this.$nextTick(() => {
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 1000);
      });
    },
    showLiwu() {
      this.$parent.showLiwuBox();
    },
    showPPtBoxs() {
      this.$parent.showPPtBox();
    }
  },
  watch: {
    msgList(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.scrollTobottom();
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper);
    });
    setTimeout(() => {
      this.scrollTobottom();
    }, 2000);
    this.fixScroll();
  },
  computed: {
    randomName() {
      return "游客";
    }
  }
};
</script>

<style scoped>
.bottom {
  width: 100%;
}
/* 底部样式 */
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0);
  color: #fff;
  /* z-index: 99999; */
  /* background: black; */
}
.bottom .zan {
  display: inline-block;

  margin-top: 5px;
}
.bottom .zan .icon {
  font-size: 56px;
  color: red;
  position: relative;
  top: 5px;
  left: 3px;
}
.bottom .zan span {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  text-align: center;
  position: relative;
  line-height: 60px;
}
.bottom .liwu {
  position: relative;
  top: 5px;
}
.bottom .liwu.ppt {
  transform: scale(0.9);
}
.bottom .liwu span {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  text-align: center;
  line-height: 60px;
}
.bottom .liwu .icon {
  font-size: 55px;
  color: #fff;
  position: relative;
  top: 6px;
}
.bottom .input {
  color: #fff;
  font-size: 30px;
  border: none;
  width: 100%;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8px 0 8px 30px;
  box-sizing: border-box;
  letter-spacing: 2px;
  position: relative;
  top: -5px;
  font-size: 30px;
}
.bottom .input::-webkit-input-placeholder {
  color: #5dd6c7;
  font-size: 24px;
  line-height: normal;
}
.bottom .input::-moz-placeholder {
  color: #5dd6c7;
  font-size: 24px;
  line-height: normal;
}
.bottom .input::-ms-input-placeholde {
  color: #5dd6c7;
  font-size: 24px;
  line-height: normal;
}
.bottom .input_warp {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
/* 聊天框 */
.wrapper {
  overflow: hidden;
  height: 27%;
  width: 80%;
  /* background: red; */
  position: absolute;
  bottom: 10%;
  left: 25px;
}
.wrapper ul {
  padding-bottom: 60px;
}
.wrapper ul li {
  list-style: none;
  line-height: 50px;
  width: 100%;
  word-break: break-all;
  font-size: 30px;
  color: #fff;
  margin-bottom: 10px;
}

.wrapper ul li >>> span.login_name {
  color: #fbe700 !important;
  font-weight: bold;
  font-size: 32px;
  font-family: "Courier New", Courier, monospace;
}
.wrapper ul li >>> span.login_name .content {
  color: #fff;
}
.wrapper ul li >>> .icon {
  color: red;
  vertical-align: middle;
  margin-left: 5px;
}
.wrapper ul li >>> img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.dashang {
  color: #fc7d5e;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>