<template>
  <div class="menu3">
    <van-row class="menu-3" type="flex" justify="space-around" gutter="10" v-if="menu3.menu">
      <van-col span="8" v-for="(item,index) in menu3.menu" :key="index" class="img_warp">
        <img
          class="menu_img_class"
          width="100%"
          height="auto"
          v-lazy=" item.img"
          @click="goNewPage(index)"
        />
      </van-col>
    </van-row>
    <img src="../../../static/img/sholist.svg" v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      baseUrl: "https://yibaikang001.oss-cn-shanghai.aliyuncs.com/"
    };
  },
  computed: {
    ...mapState(["menu3"])
  },
  methods: {
    goNewPage(index) {
      this.$router.push(`/query${index}`);
    }
  }
};
</script>

<style scoped>
.menu-3 {
  margin-top: 20px;
  padding: 0 25px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  background: #fff;
  height: 165px;
}
.menu-3 .img_warp {
  width: 100%;
  height: 165px;
}
.menu-3 .img_warp img {
  height: 100%;
}
</style>