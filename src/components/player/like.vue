<template>
  <div class="like">
    <canvas id="cvs"></canvas>
  </div>
</template>

<script>
import LikeHeart from "../../../static/js/index";
export default {
  props: ["user_id"],
  data() {
    return {
      width: 175, //初始宽度
      height: 400, //初始高度
      heartList: [], //初始数组
      heartCount: 0, //累加计数初始值
      timer: null
    };
  },
  methods: {
    getRandomDis() {
      if (Math.random() > 0.5) {
        return -(Math.random() * 43);
      } else {
        return +(Math.random() * 43);
      }
    },
    createHeart() {
      this.heartCount++;
      let positionArray = [
        {
          x: 100,
          y: 400,
          endX: 100,
          endY: 200
        }
      ];
      let img = new Image();
      img.src = `../../static/img/${Math.ceil(Math.random() * 5)}.png`;
      let p1 = {
        x: 150 + this.getRandomDis(),
        y: 300 + this.getRandomDis()
      };
      let p2 = {
        x: 100 + this.getRandomDis(),
        y: 200 + this.getRandomDis()
      };
      return new LikeHeart({
        id: this.heartCount,
        x: positionArray[0].x,
        y: positionArray[0].y,
        endX: positionArray[0].endX,
        endY: positionArray[0].endY,
        onFadeOut: this.removeItem,
        noAngel: true, //决定是否从小到大
        // noScale: true,//决定是否左右摆动
        width: 30, //决定心的大小
        height: 30,
        image: img,
        bezierPoint: {
          p0: {
            x: positionArray[0].x,
            y: positionArray[0].y
          },
          p1: p1,
          p2: p2,
          p3: {
            x: positionArray[0].endX,
            y: positionArray[0].endY
          }
        }
      });
    },
    removeItem(item) {
      var array = [];
      for (var i = 0; i < this.heartList.length; i++) {
        if (this.heartList[i].id !== item.id) {
          array.push(this.heartList[i]);
        }
      }
      this.heartList = array;
    },
    // 飘心
    getLike() {
      let _this = this;
      let ctx = document.getElementById("cvs").getContext("2d");
      (ctx.canvas.width = _this.width),
        (ctx.canvas.height = _this.height),
        (function loop() {
          ctx.clearRect(0, 0, _this.width, _this.height);
          _this.heartList.forEach(item => {
            item && item.move(ctx);
          });
          requestAnimationFrame(loop);
        })();
      // 监听点击事件触发飘心
      document.getElementById("zan").addEventListener(
        "click",
        () => {
          switch (this.$parent.type) {
            // 正在直播的视频
            case 2:
              let lives_like = {
                type: "live_like",
                s_id: "1",
                like_expire_time: "90000",
                like_user_id: _this.user_id,
                member_uuid: sessionStorage.getItem("uuid")
              };
              _this.$parent.websocketsend(JSON.stringify(lives_like));
              break;
            // 视频（录播）
            case 3:
              let video_like = {
                type: "video_like",
                s_id: "1",
                like_expire_time: "90000",
                like_user_id: _this.user_id,
                member_uuid: sessionStorage.getItem("uuid")
              };
              _this.$parent.websocketsend(JSON.stringify(video_like));
              break;
            // 回放的直播
            case 4:
              let live_like = {
                type: "live_like",
                s_id: "1",
                like_expire_time: "90000",
                like_user_id: _this.user_id,
                member_uuid: sessionStorage.getItem("uuid")
              };
              _this.$parent.websocketsend(JSON.stringify(live_like));
              break;
            // 正在直播的音频
            case 8:
              let audio_login = {
                type: "radio_like",
                s_id: "1",
                like_expire_time: "90000",
                like_user_id: _this.user_id,
                member_uuid: sessionStorage.getItem("uuid")
              };
              _this.$parent.websocketsend(JSON.stringify(audio_login));
              break;
            // 回听的音频
            case 9:
              let audios_login = {
                type: "audio_like",
                s_id: "1",
                like_expire_time: "90000",
                like_user_id: _this.user_id,
                member_uuid: sessionStorage.getItem("uuid")
              };
              _this.$parent.websocketsend(JSON.stringify(audios_login));
              break;
            // 上传录播的音频
            case 10:
              let audioss_login = {
                type: "audio_like",
                s_id: "1",
                like_expire_time: "90000",
                like_user_id: _this.user_id,
                member_uuid: sessionStorage.getItem("uuid")
              };
              _this.$parent.websocketsend(JSON.stringify(audioss_login));
              break;
          }
        },
        false
      );
    },
    //自动飘心
    setIntervalZan() {
      this.timer = setInterval(() => {
        if (sessionStorage.getItem("videoUrl") == "") {
          console.log("不飘心");
        } else {
          this.$parent.delayed();
        }
      }, 1200);
    }
  },
  mounted() {
    this.getLike();
    //   定时自动飘心
    this.setIntervalZan();
  },
  beforeDestroy() {
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer); //关闭
    }
  }
};
</script>

<style scoped>
/* 飘心 */
#cvs {
  position: fixed;
  bottom: 20px;
  right: 10px;
  /* background: red; */
  pointer-events: none;
  z-index: 1100;
}
</style>