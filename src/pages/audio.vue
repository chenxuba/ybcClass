<template>
  <div
    class="palyer"
    @touchmove.prevent
    v-wechat-title="$route.meta.title = ClassTimePlayer.title"
    v-height
  >
    <!-- 播放器 -->
    <div class="video">
      <div class="normal-player" style>
        <div class="background">
          <img width="100%" height="100%" :src="ClassTimePlayer.cover" />
        </div>
        <div class="top">
          <h1 class="title">{{ClassTimePlayer.title}}</h1>
          <h2 class="subtitle">{{ClassTimePlayer.user_name}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l" style="opacity: 1; transition-duration: 500ms;">
            <div class="cd-wrapper" style>
              <div class="cd play">
                <img alt="歌曲图片" class="image" :src="ClassTimePlayer.cover" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <!-- 音乐播放器 -->
          <aplayer
            autoplay
            :music="{title: 'secret base~君がくれたもの~',artist: 'Silent Siren',src: videoUrl,pic: ClassTimePlayer.cover}"
          />
        </div>
      </div>
    </div>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqClassTimePlayer, reqVideoUrl } from "../api";
import Aplayer from "vue-aplayer";
import { wxJS_SDk } from "../util/share";
import { Toast } from "vant";
export default {
  data() {
    return {
      ClassTimePlayer: {},
      videoUrl: "https://yibaikang001.oss-cn-shanghai.aliyuncs.com/rrGzQ7Ek/mp3/rbaC3zAN1557044456.mp3",
      res_id: this.$route.params.id //课时id
    };
  },
  methods: {
    //触发请求，播放页详情
    async getClassTimePlayer() {
      const result = await reqClassTimePlayer(this.res_id);
      console.log(result);
      if (result.code == 1) {
        this.ClassTimePlayer = result.data;
        // console.log(this.type);
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
      // console.log(result);
      if (result.code == 1) {
        // this.is_guanzhu = result.data.is_user_follow;
        if (result.data.videourl != 4004) {
          this.videoUrl = result.data.videourl;
        } else {
          //   this.showjieshu = true;
        }
        // this.paiHangBang = result.data.data;
        // this.msgList = result.data.data.res_log.count;
        // this.ppt = result.data.data.ppt;
        // console.log(this.ppt);
        // this.getVideoConfig();
      } else if (result.code == -6) {
        Toast("该资源需要输入密码");
        this.$router.push(`/classDetail/${this.res_id}`);
      } else if (result.code == -3) {
        Toast("未购买此资源");
      }
    }
  },
  mounted() {
    this.getClassTimePlayer();
    this.getVideoUrl();
  },
  components: {
    Aplayer
  }
};
</script>

<style scoped>
.palyer {
  width: 100%;
  background: rgb(243, 167, 167);
  overflow: hidden;
}
.normal-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: #a98175;
}
.normal-player .background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(40px);
}
.normal-player .top {
  position: relative;
  margin-bottom: 50px;
}
.normal-player .top .title {
  width: 70%;
  margin: 0 auto;
  line-height: 80px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 36px;
  color: #fff;
}
.normal-player .top .subtitle {
  line-height: 40px;
  text-align: center;
  font-size: 28px;
  color: #fff;
  margin: 0;
}
.normal-player .middle {
  position: fixed;
  width: 100%;
  top: 160px;
  bottom: 340px;
  white-space: nowrap;
  font-size: 0;
}
.normal-player .middle .middle-l {
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 80%;
}
.normal-player .middle .middle-l .cd-wrapper {
  position: absolute;
  left: 10%;
  top: 0;
  width: 80%;
  height: 100%;
}
.normal-player .middle .middle-l .cd-wrapper .cd.play {
  animation: rotate 20s linear infinite;
}
.normal-player .middle .middle-l .cd-wrapper .cd {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 20px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 50%;
}
.normal-player .middle .middle-l .cd-wrapper .cd .image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.normal-player .bottom {
  position: absolute;
  bottom: 100px;
  width: 100%;
  text-align: center;
}
.normal-player .bottom .progress-wrapper {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px 0;
}
.normal-player .bottom .progress-wrapper .time.time-l {
  text-align: left;
}
.normal-player .bottom .progress-wrapper .time {
  color: #fff;
  font-size: 24px;
  -webkit-box-flex: 0;
  flex: 0 0 60px;
  line-height: 60px;
  width: 60px;
}
.normal-player .bottom .progress-wrapper .progress-bar-wrapper {
  flex: 1;
}
.bottom >>> .aplayer-body .aplayer-info {
  padding-top: 50px;
}
</style>