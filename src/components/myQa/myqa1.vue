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
      <div v-if="MyQuery">
        <cellView
          v-for="(item,index) in MyQuery"
          :key="index"
          :queryObj="item"
          :b="index"
          :member_info="member_info"
        ></cellView>
      </div>
      <div v-else class="none">
        <img src="../../../static/img/none.jpeg" alt />
      </div>
    </van-list>
  </div>
</template>

<script>
import cellView from "../../grandson/myqa1/cellView";
export default {
  props: ["MyQuery","member_info"],
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
      this.$emit("pullDown"); //触发上拉加载
    }
  }
};
</script>

<style scoped>
.none {
  width: 100%;
  text-align: center;
}
.none img {
  width: 80%;
  margin-top: 200px;
}
</style>