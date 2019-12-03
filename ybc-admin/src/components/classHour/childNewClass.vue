<template>
  <div class="childNewClass">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="videoLive">
        <span slot="label">
          <i class="el-icon-video-camera-solid"></i> 视频直播
        </span>
        <videoLive :menuLabel="menuLabel" @videoLiveshuaxin="shuaxinLists"></videoLive>
      </el-tab-pane>
      <el-tab-pane name="audioLive">
        <span slot="label">
          <i class="el-icon-headset"></i> 电台直播
        </span>
        <audioLive :menuLabel="menuLabel"></audioLive>
      </el-tab-pane>
      <el-tab-pane name="video">
        <span slot="label">
          <i class="el-icon-orange"></i> 视频
        </span>
        <copyVideo
          :menuLabel="menuLabel"
          @shuaxinList="shuaxinLists"
          :ruleForm="ruleForm"
          ref="childCopyVideo"
        ></copyVideo>
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
import { reqMenuLabel, reqResourceEdit } from "../../api";
export default {
  data() {
    return {
      activeName: "videoLive",
      pros_type: 1,
      menuLabel: [],
      ruleForm: {
        date: "", //直播开始时间
        title: "", //标题
        imgUrl: "", //封面图
        content: "", //直播简介
        leixing1: "", //一级标签
        leixing2: "", //二级标签
        radio_fufei: 1, //收费方式
        radio_isShikan: 0, //是否需要试看,默认不需要
        yinSiSet: "0", //隐私设置
        shangJiaSet: 1, //上架设置，是否立即发布
        price: "", //收费金额
        password: "", // 密码
        shikanTime: "", //试看时间
        videoUrl: "",
        dingShiTime: new Date(), //定时直播
      }
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
    shuaxinLists() {
      this.$emit("shuaxinListss", "first");
    },
    async getEditMsg(item) {
      console.log(item);
      const res = await reqResourceEdit(item.id);
      console.log(res);
      if (res.code == 1) {
        this.ruleForm.title = res.data.title;
        this.ruleForm.imgUrl = res.data.cover;
        this.ruleForm.videoUrl = res.data.videourl;
        this.$refs.childCopyVideo.changeContent(res.data.introduce);
        this.ruleForm.leixing1 = res.data.label1;
        this.ruleForm.leixing2 = res.data.label2;
        this.ruleForm.radio_fufei = res.data.needpay;
        this.ruleForm.radio_isShikan = res.data.cantry;
        this.ruleForm.shikanTime = res.data.cantrytime;
        this.ruleForm.yinSiSet = res.data.is_open_privacy
        this.ruleForm.shangJiaSet = res.data.is_specify
        this.ruleForm.dingShiTime = res.data.release_time
      }
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