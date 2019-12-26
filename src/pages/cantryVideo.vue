<template>
  <div v-height class="cantry">
       <div id="mse"></div>
       <goBack></goBack>
  </div>
</template>
<script src="//cdn.jsdelivr.net/npm/xgplayer@1.1.4/browser/index.js" charset="utf-8"></script>
<script>
import { reqVideoUrl } from "../api";
export default {
  data() {
    return {
      res_id: this.$route.params.id,
      videoUrl: ""
    };
  },
  methods: {
    // 获取视频地址和聊天记录
    async getVideoUrl() {
      const result = await reqVideoUrl(this.res_id, this.pwd);
      console.log(result);
      if (result.code == 1) {
        this.videoUrl = result.data.videourl;
        this.getVideoConfig();
      }
    },
    // 获取播放器配置
    getVideoConfig() {
      let player = new HlsJsPlayer({
        id: "mse",
        url: 'https://yibaikang001.oss-cn-shanghai.aliyuncs.com/s_1/vod/m3u8_1577250614_853.m3u8',
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
          "https://kf.ybc365.com/train/Public/train/user/live/img/default_bg.png"

        // autoplay: false
      });
    },
  },
  mounted() {
    this.getVideoUrl();
    
  }
};
</script>

<style scoped>
.cantry {
  width: 100%;
  height: 100%;
  background: #333;
}
#mse{
    width: 100%;
}
</style>