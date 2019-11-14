<template>
  <div class="inquire" v-height>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
      :immediate-check="false"
    >
      <div v-if="MyWeiGuan">
        <cellView v-for="(item,index) in MyWeiGuan" :key="index" :queryObj="item" :b="index"></cellView>
      </div>
      <div v-else class="none">
        <img src="../../../static/img/none.jpeg" alt />
      </div>
    </van-list>
  </div>
</template>

<script>
import cellView from "../../grandson/myqa2/cellView";
export default {
  props: ["MyWeiGuan"],
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
    onLoad() {
      this.$emit("pullDown2"); //触发上拉加载
    }
  }
};
</script>

<style scoped>
.inquire .none {
  width: 100%;
  text-align: center;
}
.inquire .none img {
  width: 80%;
  margin-top: 200px;
}
</style>