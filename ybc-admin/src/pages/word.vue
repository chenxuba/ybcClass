<template>
  <div class="word">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="软文" name="first">
        <span slot="label">
          <i class="el-icon-document"></i> 软文
        </span>
        <wordList
          :article_list="article_list"
          :count="count"
          @handleCurrentChange="handleCurrentChange"
          @search="search"
          @handldelete="handldelete"
          @SeeDeleteRiZhi="SeeDeleteRiZhi"
          :rizhiMsg="rizhiMsg"
        ></wordList>
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
import { reqWordList, reqDeleteWord, reqSeeDeleteRiZhi } from "../api";
export default {
  data() {
    return {
      activeName: "first",
      article_list: [], //软文列表
      count: 0,
      rizhiMsg:""
    };
  },
  methods: {
    // 获取软文列表
    async getWordList() {
      const res = await reqWordList();
      console.log(res);
      if (res.code == 1) {
        this.article_list = res.data.article_list;
        this.count = Number(res.data.count);
      }
    },
    async handleCurrentChange(val) {
      const res = await reqWordList("", val);
      if (res.code == 1) {
        this.article_list = res.data.article_list;
      }
    },
    // 搜索
    async search(searchVal) {
      const res = await reqWordList(searchVal, "");
      if (res.code == 1) {
        this.article_list = res.data.article_list;
        this.count = Number(res.data.count);
      }
    },
    // 删除
    async handldelete(id) {
      const res = await reqDeleteWord(id);
      console.log(res);
      if (res.code == 1) {
        this.$message({
          message: "删除成功～",
          type: "success"
        });
        this.getWordList();
      }
    },
    // 查看日志
    async SeeDeleteRiZhi(id) {
      const res = await reqSeeDeleteRiZhi(id);
      console.log(res);
      if(res.code == 1){
        this.rizhiMsg = res.data;
      }
    }
  },
  mounted() {
    this.getWordList();
  },
  components: {
    wordList
  }
};
</script>

<style scoped>
</style>