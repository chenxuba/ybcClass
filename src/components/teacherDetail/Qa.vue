<template>
  <div class="inquire">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
    >
      <cellView
        v-for="(item,index) in question"
        :key="index"
        :QaObj="item"
        :b="index"
        :headimgUrl="headimgUrl"
        :user_id="user_id"
      ></cellView>
    </van-list>
    <div class="ask-btn" style>
      <!-- <input type="button" value="发出提问" @click="$router.push('/ask/'+user_id)" /> -->
      <span class="input" @click="$router.push('/ask/'+user_id)">发出提问</span>
    </div>
  </div>
</template>

<script>
import cellView from "../../grandson/Qa/cellView";
export default {
  props: ["question", "headimgUrl", "user_id"],
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
.inquire {
  padding: 0 30px;
  box-sizing: border-box;
}
.ask-btn {
  position: fixed;
  bottom: 50px;
  right: 30px;
  z-index: 10000;
}
.ask-btn .input {
  padding: 16px 40px;
  background-color: #ffc803;
  color: #b27629;
  border-radius: 50px;
  font-size: 24px;
  box-shadow: 2px 2px 40px;
  display: inline-block;
}
</style>