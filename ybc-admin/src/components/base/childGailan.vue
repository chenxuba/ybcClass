<template>
  <div class="gailan">
    <!-- 五大基本信息 -->
    <div class="collegeCellArea">
      <div class="collegeCell" style="background-color: #ff5c11;">
        <img
          src="https://kf.ybc365.com/train/Public/train/admin/img/xueyuanPic7.png"
          class="collegeCellImg"
        />
        <div class="collegeCellTextArea">
          <p v-if="gailanMsg.seed">
            <span class="collegeCellText">视频</span>
            <span class="collegeCellText">{{gailanMsg.seed[0].count}}</span>
          </p>

          <p v-if="gailanMsg.video_num">
            <span class="collegeCellText">访问量</span>
            <span class="collegeCellText">{{gailanMsg.video_num[0].video_num || 0}}</span>
          </p>
        </div>
      </div>
      <div class="collegeCell" style="background-color: #8ed83d;">
        <img
          src="https://kf.ybc365.com/train/Public/train/admin/img/xueyuanPic8.png"
          class="collegeCellImg"
        />
        <div class="collegeCellTextArea">
          <p v-if="gailanMsg.live_num">
            <span class="collegeCellText">直播</span>
            <span class="collegeCellText">{{gailanMsg.live_num[0].live_num == null ? '0' : gailanMsg.live_num[0].live_num}}</span>
          </p>

          <p v-if="gailanMsg.view">
            <span class="collegeCellText">访问量</span>
            <span class="collegeCellText">{{gailanMsg.view[0].count}}</span>
          </p>
        </div>
      </div>

      <div class="collegeCell" style="background-color: #d4237a;">
        <img
          src="https://kf.ybc365.com/train/Public/train/admin/img/course.png"
          class="collegeCellImg"
        />
        <div class="collegeCellTextArea">
          <p>
            <span class="collegeCellText">课程</span>
            <span class="collegeCellText">{{gailanMsg.course}}</span>
          </p>

          <p v-if="gailanMsg.class_num">
            <span class="collegeCellText">访问量</span>
            <span class="collegeCellText">{{gailanMsg.class_num[0].class_num || 0}}</span>
          </p>
        </div>
      </div>

      <div class="collegeCell" style="background-color: #529ffb;">
        <img
          src="https://kf.ybc365.com/train/Public/train/admin/img/xueyuanPic9.png"
          class="collegeCellImg"
        />
        <div class="collegeCellTextArea">
          <p>
            <span class="collegeCellText">今日打赏</span>
          </p>
          <p class="collegeCellText">{{gailanMsg.reward}}</p>
        </div>
      </div>
      <div class="collegeCell" style="background-color: #ffc736;margin-right: 0;">
        <img
          src="https://kf.ybc365.com/train/Public/train/admin/img/xueyuanPic4.png"
          class="collegeCellImg"
        />
        <div class="collegeCellTextArea">
          <p class="collegeCellText">今日收益</p>
          <p class="collegeCellText">{{gailanMsg.money}}</p>
        </div>
      </div>
    </div>
    <!-- 最近15天收益折线图 -->
    <div class="echart">
      <div id="myChart" :style="{width: '800px', height: '300px'}"></div>
    </div>
    <!-- 账号登录ip信息 -->
    <div class="logo-msg" v-if="gailanMsg.login">
      <div class="customerInfoArea">
        <div class="customerInfoTitle">
          <p>账号信息</p>
        </div>
        <div class="costomerInfo">
          <div>
            <div class="costomerInfoCell">
              <span>用户名：</span>
            </div>
            <span style="color: #323232;">{{gailanMsg.name}}</span>
          </div>
          <div>
            <div class="costomerInfoCell">
              <span>上次登录：</span>
            </div>
            <span style="color: #323232;">{{gailanMsg.login[0].intime}}</span>
          </div>
          <div>
            <div class="costomerInfoCell">
              <span>IP：</span>
            </div>
            <span style="color: #323232;">{{gailanMsg.login[0].login_ip}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["time", "money","gailanMsg"],
  data() {
    return {
      myChart: {}
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.myChart.setOption({
        title: { text: "15天累计收益" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: this.time
        },
        yAxis: {
          type: "value",
          name: "收益"
        },
        series: [
          {
            data: this.money,
            type: "line",
            areaStyle: {}
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.gailan {
  margin-left: 5%;
  margin-top: 20px;
  min-width: 1300px;
}
.collegeCellArea {
  width: 85%;
  margin-left: 2.5%;
  display: inline-block;
}
.collegeCell {
  width: 17%;
  height: 130px;
  border-radius: 3px;
  color: white;
  display: inline-block;
  vertical-align: middle;
  margin-right: 3%;
}
.collegeCellImg {
  display: inline-block;
  margin: 35px 5%;
  height: 60px;
}
.collegeCellTextArea {
  display: inline-block;
  vertical-align: top;
  text-align: center;
  padding: 25px 0;
}
.collegeCellText {
  line-height: 40px;
}
/* 折线图 */
.echart {
  margin-left: 45px;
  margin-top: 5%;
  display: inline-block;
}
/* 登录信息 */
.logo-msg {
  position: relative;
  left: 60%;
  top: -220px;
}
.customerInfoArea {
  border: 1px solid #e3e3e3;
  width: 20%;
  font-size: 0.7rem;
  color: #a5a5a5;
  display: inline-block;
  margin-left: 3%;
}
.customerInfoTitle {
  border-bottom: 1px solid #e3e3e3;
  width: 88%;
  padding: 10px 6%;
  color: #323232;
}
.costomerInfo {
  padding: 10px 0;
}
.costomerInfoCell {
  width: 35%;
  display: inline-block;
  text-align: right;
  padding: 10px 0;
}
</style>