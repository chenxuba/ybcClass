<template>
  <div class="mycollection">
    <!-- 头部分类 -->
    <van-tabs
      v-model="active"
      color="#5dd6c7"
      title-active-color="#5dd6c7"
      animated
      sticky
      swipeable
      lazy-render
      line-width="30px"
      @click="onClick"
    >
      <van-tab title="课时">
        <collectionCourse :keTime="keTime"></collectionCourse>
      </van-tab>
      <van-tab title="软文">
        <collectionWord :word="word"></collectionWord>
      </van-tab>
    </van-tabs>
    <!-- 返回按钮 -->
    <goBack></goBack>
  </div>
</template>

<script>
import collectionWord from "../components/mycollection/collectionWord";
import collectionCourse from "../components/mycollection/collectionCourse";
import { reqshouCang } from "../api";
export default {
  data() {
    return {
      active: 0,
      type1: 0,
      type2: 1,
      page: "1",
      keTime: [],
      word:[]
    };
  },
  components: {
    collectionWord,
    collectionCourse
  },
  methods: {
    async getShouCang() {
      const result = await reqshouCang(this.type1, "", this.page);
      // console.log(result);
      this.keTime = result.data.data;
    },
    async onClick(name) {
      const result = await reqshouCang(name, "", this.page);
      // console.log(result);
      this.word = result.data.data;
    }
  },
  mounted() {
    this.getShouCang();
  }
};
</script>

<style scoped>
.mycollection {
  width: 100%;
  padding-top: 88px;
}
</style>