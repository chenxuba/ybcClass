<template>
  <div class="yaoyueka" v-height>
    <!-- 生成的邀约卡 -->
    <div class="isok" :style="'height:'+styW">
      <img :src="imgurl" alt />
    </div>
    <footer>
      <div class="prompt">长按上图保存,或发送给朋友</div>
      <div class="footer-item">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="hanldClick(index)">
            <img :src="item.img" :class="{active:index == current}" />
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      imgurl: "",
      current: 0,
      list: [
        {
          img:
            "https://api.ybc365.com/temp/temp_bg_image/invitation-0.png"
        },
         {
          img:
            "https://api.ybc365.com/temp/temp_bg_image/invitation-1.png"
        },
         {
          img:
            "https://api.ybc365.com/temp/temp_bg_image/invitation-2.png"
        },
         {
          img:
            "https://api.ybc365.com/temp/temp_bg_image/invitation-3.png"
        },
         {
          img:
            "https://api.ybc365.com/temp/temp_bg_image/invitation-4.png"
        },
         {
          img:
            "https://api.ybc365.com/temp/temp_bg_image/invitation-5.png"
        },
         {
          img:
            "https://api.ybc365.com/temp/temp_bg_image/invitation-6.png"
        },
         {
          img:
            "https://api.ybc365.com/temp/temp_bg_image/invitation-7.png"
        },
      ]
    };
  },
  computed: {
    styW() {
      return window.innerHeight - 140 + "px";
    }
  },
  methods: {
    hanldClick(index) {
      this.current = index;
      this.getYaoyueka();
    },
    // 获取邀约卡
    getYaoyueka() {
      this.$axios
        .post("https://api.ybc365.com/api/5dbfb44893afe", {
          type: this.$route.query.type,
          res_id: this.$route.query.id,
          id: this.current
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.imgurl = res.data.data.card_url;
          } else if (res.data.code == -1) {
            Toast(res.data.msg);
          }
        });
    }
  },
  mounted() {
    this.getYaoyueka();
  }
};
</script>

<style scoped>
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 250px;
}
.isok {
  display: flex;
  align-items: center;
  justify-content: center;
}
.isok img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}
.prompt {
  text-align: center;
  font-size: 26px;
  color: #999;
  width: 100%;
}
.footer-item {
  margin-top: 50px;
}
.footer-item ul {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.footer-item ul li {
  display: inline-block;
  width: 120px;
  height: 120px;
  margin-right: 10px;
}
.footer-item ul li:first-child {
  margin-left: 10px;
}

.footer-item ul li img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
::-webkit-scrollbar  {
  display: none;
}
.active {
  border: 2px solid red;
  opacity: 0.8;
}
</style>