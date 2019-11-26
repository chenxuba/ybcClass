<template>
  <div class="home">
    <!-- <div class="container">
            <h1 class="title">YBC云课堂导师管理后台</h1>
            <p class="lead"> YBC ©️ 版权所有</p>
    </div>-->
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    mounted () {
      this.drawLine();
    }
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