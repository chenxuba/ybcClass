<template>
  <div class="inquire">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
    <cellView v-for="(item,index) in question" :key="index" :QaObj="item" :b="index"></cellView>
    </van-list>
    <van-divider /><van-divider />

  </div>
</template>

<script>
import cellView from "../../grandson/inquire02/cellView";
export default {
  props: ["question"],
  data() {
    return {
      loading: false,
      finished: false
    };
  },
   components: {
    cellView
  },
  methods: {
    onLoad(){
      this.$emit("pullDown2")//触发上拉加载
    }
  }
};
</script>

<style scoped>
.fenye {
  text-align: center;
  padding-bottom: 120px;
  padding-top: 25px;
  /* background: red; */
}
</style>