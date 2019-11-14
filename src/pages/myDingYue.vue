<template>
  <div class="myDingYue">
    <DingYueList :dingYueList="dingYueList" @pullDown="pullDown2" ref="child"></DingYueList>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqUserDingyue } from "../api";
import DingYueList from "../components/myDingYue/dingYueList";
export default {
  data() {
    return {
      dingYueList: {},
      page: 1
    };
  },
  methods: {
    async getDingYueList() {
      const result = await reqUserDingyue("", this.page);
      console.log(result);
      if (result.code == 1) {
        this.dingYueList = result.data;
      }
    },
    async pullDown2() {
      this.page++;
      const result = await reqUserDingyue("", this.page);
       if (result.code == 1) {
        result.data.forEach(item => {
          this.dingYueList.push(item);
        });
        // 加载状态结束
        this.$refs.child.loading = false;
      } else if (result.code == -3) {
        this.$refs.child.finished = true;
        this.$refs.child.loading = false;
      }
    }
  },
  components: {
    DingYueList
  },
  mounted() {
    this.getDingYueList();
  }
};
</script>

<style scoped>
.myDingYue >>> .van-swipe-cell__right {
  line-height: 130px;
}
</style>