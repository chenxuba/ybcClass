<template>
  <div class="childNewClass">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="videoLive">
        <span slot="label">
          <i class="el-icon-video-camera-solid"></i> 视频直播
        </span>
        <videoLive></videoLive>
      </el-tab-pane>
      <el-tab-pane name="audioLive">
        <span slot="label">
          <i class="el-icon-headset"></i> 电台直播
        </span>
        <audioLive></audioLive>
      </el-tab-pane>
      <el-tab-pane name="video">
        <span slot="label">
          <i class="el-icon-orange"></i> 视频
        </span>
        <copyVideo :menuLabel="menuLabel" @shuaxinList="shuaxinLists"></copyVideo>
      </el-tab-pane>
      <el-tab-pane name="audio">
        <span slot="label">
          <i class="el-icon-service"></i> 音频
        </span>
        <copyRadio :menuLabel="menuLabel" @RadioshuaxinList="shuaxinLists"></copyRadio>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import videoLive from "../../grandson/childNewClass/videoLive";
import audioLive from "../../grandson/childNewClass/audioLive";
import copyVideo from "../../grandson/childNewClass/copyVideo";
import copyRadio from "../../grandson/childNewClass/copyRadio";
import { reqMenuLabel } from "../../api";
export default {
  data() {
    return {
      activeName: "videoLive",
      pros_type: 1,
      menuLabel: []
    };
  },
  methods: {
    async getMenuLabel() {
      const res = await reqMenuLabel(this.pros_type);
      if (res.code == 1) {
        this.menuLabel = res.data;
      }
    },
    // 触发自定义事件shuaxinListss，并把“first”当作参数传过去
    shuaxinLists(){
      this.$emit("shuaxinListss",'first')
    }
  },
  mounted() {
    this.getMenuLabel();
  },
  components: {
    videoLive,
    audioLive,
    copyVideo,
    copyRadio
  }
};
</script>

<style scoped>
</style>