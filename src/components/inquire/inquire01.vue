<template>
  <div class="inquire">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="10"
      >
    <cellView v-for="(item,index) in teacherList" :key="index" :teacherObj="item"></cellView>
    </van-list>
    <van-divider /><van-divider />

  </div>
</template>

<script>
import cellView from "../../grandson/inquire01/cellView";
export default {
  props: ["teacherList"],
  data () {
    return {
      loading: false,
      finished: false
    }
  },
  components: {
    cellView
  },
  methods: {
    onLoad(){
      this.$emit("pullDown")//触发上拉加载
    }
  }
};
</script>

<style scoped>
</style>