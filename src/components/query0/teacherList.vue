<template>
  <div class="teacherList loading-area">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="10"
    >
      <cellView v-for="(item,index) in teacherList" :key="index" :teacherListObj="item"></cellView>
    </van-list>
    <div class="zhanwei" v-show="isShow"></div>
    <div class="openSchool" @click="$router.push('/applyTeacher')">
      <span class="a1">导师</span>
      <span>入驻</span>
    </div>
  </div>
</template>

<script>
import cellView from "../../grandson/teacherList/cellView";
export default {
  props: ["teacherList"],
  data() {
    return {
      loading: false,
      finished: false,
      isShow: true
    };
  },
  components: {
    cellView
  },
  methods: {
    onLoad() {
      this.$emit("pullDown2");
    }
  },
  watch: {
    finished() {
      if (this.finished == true) {
        this.isShow = false;
      }
    }
  }
};
</script>

<style scoped>
.teacherList {
  height: 100%;
  padding: 0 10px;
}
.zhanwei {
  height: 100px;
}
.openSchool {
  position: fixed;
  top: 55%;
  right: 0;
  font-size: 24px;
  background: #333;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  font-family: "Courier New", Courier, monospace;
}
.openSchool span {
  display: block;
}
.openSchool span.a1 {
  margin-bottom: 5px;
  margin-top: 2px;
}
</style>