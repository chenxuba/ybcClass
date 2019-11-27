<template>
  <div class="home">
    <!-- <div class="container">
            <h1 class="title">YBC云课堂导师管理后台</h1>
            <p class="lead"> YBC ©️ 版权所有</p>
    </div>-->
    <div id="myChart" :style="{width: '500px', height: '300px'}"></div>
  </div>
</template>
<script>
export default {
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
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
             areaStyle: {},
              smooth: true
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url("../../static/img/bg.jpeg") no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
</style>