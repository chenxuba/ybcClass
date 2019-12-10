<template>
  <div class="word">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="软文" name="first">
        <span slot="label">
          <i class="el-icon-document"></i> 软文
        </span>
        <wordList></wordList>
      </el-tab-pane>
      <el-tab-pane label="新建软文" name="second">
        <span slot="label">
          <i class="el-icon-edit-outline"></i> 新建软文
        </span>
        新建软文
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import wordList from "../components/word/wordList";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    wordList
  }
};
</script>

<style scoped>
</style>