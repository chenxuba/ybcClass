<template>
  <div class="liveRoomSet">
    <div class="tabs">
      <el-tabs type="card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-view"></i> 设备管理
          </span>
          <roomMsg :liveShebeiMsg="liveShebeiMsg" :rtmpUrl="rtmpUrl" :rtmpTitle="rtmpTitle"></roomMsg>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 禁言名单
          </span>
          禁言名单
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import roomMsg from "../components/liveRoomSet/roomMsg";
import { reqLiveShebeiMsg } from "../api";
export default {
  data() {
    return {
      liveShebeiMsg: "",
      device_list1: "",
      rtmpUrl: "",
      rtmpTitle: ""
    };
  },
  methods: {
    async getLiveShebeiMsg() {
      const res = await reqLiveShebeiMsg();
      console.log(res);
      if (res.code == 1) {
        this.liveShebeiMsg = res.data;
        this.device_list1 = res.data.device_list[1];
        let app_name = this.device_list1.app_name;
        let rtmp = this.device_list1.rtmp;
        let arr = rtmp.split(app_name);
        console.log(arr);
        this.rtmpUrl = arr[0] + app_name + "/";
        let title = arr[1].split("/");
        this.rtmpTitle = title[1];
      }
    }
  },
  mounted() {
    this.getLiveShebeiMsg();
  },
  components: {
    roomMsg
  }
};
</script>

<style scoped>
</style>