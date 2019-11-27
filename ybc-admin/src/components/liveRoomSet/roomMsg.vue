<template>
  <div class="liveMsg">
    <div class="bodybox">
      <ul>
        <li>
          <span class="lileft">设备编号:</span>
          <div class="liright">
            <span class="wsinput_box" v-if="liveShebeiMsg.device_list">
              <input
                type="text"
                placeholder="请填写你的设备编号"
                class="wsinput"
                id="stream_name"
                :value="liveShebeiMsg.device_list[0].stream_name"
              />
            </span>
          </div>
        </li>
        <li v-if="liveShebeiMsg.device_list">
          <span class="lileft">设备推流地址：</span>
          <div class="liright">
            <span class="wsinput_box">
              <input
                type="text"
                placeholder
                class="wsinput"
                id="stream_name"
                :value="liveShebeiMsg.device_list[0].rtmp"
              />
            </span>
          </div>

          <button
            class="copy-btn"
            type="button"
            v-clipboard:copy="liveShebeiMsg.device_list[0].rtmp"
            v-clipboard:success="copy"
            v-clipboard:error="onError"
          >复制</button>
        </li>
        <li style="margin-bottom:35px;">
          <button class="wsbuttonthree wsbuttonfour reset_btn reset_btn1" reset-type="1">重置设备状态</button>
        </li>

        <li v-if="liveShebeiMsg.device_list">
          <span class="lileft">第三方推流地址:</span>
          <div class="liright">
            <span class="wsinput_box">
              <input type="text" name class="wsinput" :value="liveShebeiMsg.device_list[1].rtmp" />
            </span>
          </div>

          <button
            class="copy-btn"
            type="button"
            v-clipboard:copy="liveShebeiMsg.device_list[1].rtmp"
            v-clipboard:success="copy"
            v-clipboard:error="onError"
          >复制</button>
        </li>

        <li>
          <span class="lileft">对接obs软件推流：</span>
          <span class="obs-tip">URL</span>
          <div class="liright">
            <span class="wsinput_box">
              <input type="text" name class="wsinput obs-tip-liright" :value="rtmpUrl" />
            </span>
          </div>
          <button
            class="copy-btn"
            type="button"
            v-clipboard:copy="rtmpUrl"
            v-clipboard:success="copy"
            v-clipboard:error="onError"
          >复制</button>
          <span class="obs-tip">流名称：</span>
          <div class="liright">
            <span class="wsinput_box">
              <input type="text" name class="wsinput obs-tip-liright" :value="rtmpTitle" />
            </span>
          </div>
          <button
            class="copy-btn"
            type="button"
            v-clipboard:copy="rtmpTitle"
            v-clipboard:success="copy"
            v-clipboard:error="onError"
          >复制</button>
        </li>
        <li>
          <button class="wsbuttonthree wsbuttonfour reset_btn reset_btn2" reset-type="2">重置第三方推流地址状态</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["liveShebeiMsg", "rtmpTitle", "rtmpUrl"],
  data() {
    return {};
  },
  methods: {
    copy(e) {
      this.$message({
        message: "复制成功",
        type: "success"
      });
    },
    onError() {}
  },
  computed: {}
};
</script>

<style scoped>
.liveMsg {
  min-width: 1300px;
}
.bodybox {
  padding-top: 50px;
  padding-left: 50px;
  font-size: 12px;
  color: #737373;
  text-align: left;
}
.bodybox {
  padding-bottom: 100px;
}
.bodybox ul li {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}
.lileft {
  display: inline-block;
  vertical-align: middle;
  width: 130px;
  line-height: 22px;
  height: 22px;
}
.liright .wsinput_box input {
  width: 250px;
}
.wsinput_box .wsinput {
  /* width: 192px; */
  height: 25px;
  border: 1px solid #e3e3e3;
}
.help {
  display: inline-block;
  position: relative;
  width: 25px;
  height: 25px;
  margin-left: 10px;
}
.copy-btn {
  background-color: #1ad572;
  height: 25px;
  color: white;
  width: 65px;
  margin-left: 10px;
}
.wsbuttonfour {
  padding: 5.5px 22px;
  margin-right: 10px;
}

.wsbuttonthree {
  font-size: 15px;
  color: #ffffff;
  background-color: #1ad572;
  padding: 12px;
  border-radius: 2px;
  display: inline-block;
  cursor: pointer;
  line-height: 15px;
}
.obs-tip {
  margin: 0 10px;
}
button {
  outline: none;
}
</style>