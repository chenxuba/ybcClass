<template>
  <div class="base">
    <div class="tabs">
      <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-view"></i> 概览
          </span>
          <childGailan ref="child1" :time="time" :money="money" :gailanMsg="gailanMsg"></childGailan>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 平台信息
          </span>
          <childMsg></childMsg>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reqUserHomepage } from "../api";
import childGailan from "../components/base/childGailan";
import childMsg from "../components/base/childMsg";
export default {
  data() {
    return {
      money_input: [],
      time: [],
      money: [],
      gailanMsg: {}
    };
  },
  methods: {
    async getUserHomepage() {
      const res = await reqUserHomepage();
      if (res.code == -996) {
        this.$message.error(res.msg);
        this.$router.push("/fail");
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
      } else {
        console.log(res);
        this.gailanMsg = res.data;
        localStorage.setItem("name",res.data.name)
        this.money_input = res.data.money_input;
        let arr1 = [];
        let arr2 = [];
        this.money_input.map(item => {
          arr1.push(item.time);
          arr2.push(item.money);
        });
        this.time = arr1;
        this.money = arr2;
        this.$nextTick(() => {
          this.$refs.child1.drawLine();
        });
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: this.a1,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.a2,
            type: "bar",
            barWidth: "60%"
          }
        ]
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    this.getUserHomepage();
  },
  components: {
    childGailan,
    childMsg
  }
};
</script>

<style scoped>
</style>