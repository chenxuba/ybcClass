<template>
  <div class="myDingYue">
    <DingYueList :dingYueList="dingYueList" @pullDown="pullDown2" ref="child" @hanlddeleteDY="hanlddeleteDY"></DingYueList>
    <goBack></goBack>
  </div>
</template>

<script>
import { reqUserDingyue,reqDeteleDingYue } from "../api";
import { Toast } from "vant";
import DingYueList from "../components/myDingYue/dingYueList";
export default {
  data() {
    return {
      dingYueList: {},
      page: 1
    };
  },
  methods: {
    // 获取订阅列表
    async getDingYueList() {
      this.page = 1
      const result = await reqUserDingyue("", this.page);
      console.log(result);
      if (result.code == 1) {
        this.dingYueList = result.data;
      }else if(result.code == -3){
        this.dingYueList = {}
      }
    },
    // 上拉加载
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
    },
    // 取消订阅
    async hanlddeleteDY(id){
      const result = await reqDeteleDingYue(id,"");
      if(result.code == 1){
        console.log(result);
        Toast(result.data.return_msg)
        this.getDingYueList();
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