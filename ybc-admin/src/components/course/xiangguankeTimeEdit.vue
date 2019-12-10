<template>
  <div class="childNewClass">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="videoLive" :disabled="tabsDisabled">
        <span slot="label">
          <i class="el-icon-video-camera-solid"></i> 视频直播
        </span>
        <videoLive
          :menuLabel="menuLabel"
          @videoLiveshuaxin="shuaxinLists"
          ref="childvideoLive"
          :ruleForm="ruleForm"
          :clockin_school="clockin_school"
          :course_data="course_data"
        ></videoLive>
      </el-tab-pane>
      <el-tab-pane name="audioLive" :disabled="tabsDisabled">
        <span slot="label">
          <i class="el-icon-headset"></i> 电台直播
        </span>
        <audioLive
          :menuLabel="menuLabel"
          @audioLiveshuaxin="shuaxinLists"
          ref="childaudioLive"
          :ruleForm="ruleForm"
          :clockin_school="clockin_school"
          :course_data="course_data"
        ></audioLive>
      </el-tab-pane>
      <el-tab-pane name="video" :disabled="tabsDisabled">
        <span slot="label">
          <i class="el-icon-orange"></i> 视频
        </span>
        <copyVideo
          :menuLabel="menuLabel"
          @shuaxinList="shuaxinLists"
          :ruleForm="ruleForm"
          :clockin_school="clockin_school"
          :course_data="course_data"
          ref="childCopyVideo"
        ></copyVideo>
      </el-tab-pane>
      <el-tab-pane name="audio" :disabled="tabsDisabled">
        <span slot="label">
          <i class="el-icon-service"></i> 音频
        </span>
        <copyRadio
          :menuLabel="menuLabel"
          @RadioshuaxinList="shuaxinLists"
          :ruleForm="ruleForm"
          :clockin_school="clockin_school"
          :course_data="course_data"
          ref="childCopyRadio"
        ></copyRadio>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import videoLive from "../../grandson/childNewClass/videoLive";
import audioLive from "../../grandson/childNewClass/audioLive";
import copyVideo from "../../grandson/childNewClass/copyVideo";
import copyRadio from "../../grandson/childNewClass/copyRadio";
import { reqMenuLabel, reqResourceEdit, reqHoursCourseList } from "../../api";
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
        radio_fufei: 2, //收费方式,默认学员
        radio_isShikan: 0, //是否需要试看,默认不需要
        yinSiSet: "0", //隐私设置
        shangJiaSet: 1, //上架设置，是否立即发布
        price: "", //收费金额
        password: "", // 密码
        shikanTime: "", //试看时间
        videoUrl: "",
        dingShiTime: new Date(), //定时直播
        res_id: "",
        leixing: [],
        associate_sell: "0", //是否关联售卖，默认不关联
        associate_type: "", //关联资源类型，是关联课程还是打卡学堂 99-课程 100-打卡学堂 默认关联课程
        course_id: "", //关联课程ID
        clockin_id: "" //关联打卡学堂ID
      },
      tabsDisabled: false, //tabs是否禁用，默认不禁用
      clockin_school: [], //打卡学堂列表
      course_data: [] //课程列表
    };
  },
  methods: {
    async getMenuLabel() {
      const res = await reqMenuLabel(this.pros_type);
      if (res.code == 1) {
        this.menuLabel = res.data;
      }
    },
    // 触发自定义事件shuaxinListss，并把“edit”当作参数传过去
    shuaxinLists() {
      this.tabsDisabled = false;
      this.$emit("shuaxinListss", "first");
    },
    // 编辑课时
    async getEditMsg(item) {
      const res = await reqResourceEdit(item.res_id);
      console.log(res);
      if (res.code == 1) {
        this.ruleForm.title = res.data.title; //标题
        this.ruleForm.date = res.data.starttime; //直播开始时间
        this.ruleForm.imgUrl = res.data.cover; //封面图
        this.ruleForm.videoUrl = res.data.videourl; //录播视频地址
        this.$refs.childCopyVideo.changeContent(res.data.introduce); //简介
        this.$refs.childCopyRadio.changeContent(res.data.introduce); //简介
        this.$refs.childvideoLive.changeContent(res.data.introduce); //简介
        this.$refs.childaudioLive.changeContent(res.data.introduce); //简介
        this.ruleForm.leixing1 = res.data.label1; //类型1
        this.ruleForm.leixing2 = res.data.label2; //类型2
        this.ruleForm.radio_fufei = Number(res.data.needpay); //收费方式
        this.ruleForm.radio_isShikan = Number(res.data.cantry); //是否试看
        this.ruleForm.shikanTime = res.data.cantrytime; // 试看时间
        this.ruleForm.yinSiSet = res.data.is_privacy; //隐私设置
        this.ruleForm.shangJiaSet = Number(res.data.is_specify); //是否定时发布
        this.ruleForm.dingShiTime = res.data.release_time; //定时发布时间
        this.ruleForm.res_id = res.data.res_id; //资源ID
        this.ruleForm.leixing = [res.data.label1, res.data.label2]; //类型分类
        this.ruleForm.price = res.data.price; //收费金额
        this.ruleForm.password = res.data.res_pwd; //资源密码
        this.ruleForm.associate_sell = res.data.associate_type.toString(); //要转成字符串格式
        this.ruleForm.associate_type = 99;
        this.ruleForm.course_id = res.data.column_id; //关联的课程ID
        this.ruleForm.clockin_id = res.data.clockin_id; //关联的打卡学堂ID
        this.course_data = res.data.course_data; //需要关联的课程列表
      }
    },
    handleClick() {
      this.$refs.childvideoLive.clearContent();
      this.$refs.childaudioLive.clearContent();
      this.$refs.childCopyVideo.clearContent();
      this.$refs.childCopyRadio.clearContent();
    },
    // 获取课程列表和打卡学堂列表
    async getHousrCourseList() {
      const res = await reqHoursCourseList();
      console.log(res);
      if (res.code == 1) {
        this.clockin_school = res.data.clockin_school;
        this.course_data = res.data.course_data;
      }
    }
  },
  mounted() {
    this.getMenuLabel();
    this.getHousrCourseList();
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