<template>
  <div class="search">
    <goHome></goHome>
    <van-row class="search-row">
      <van-col span="24">
        <form action="/">
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @keydown="getfuzzySearch($event)"
            @cancel="onCancel"
          />
        </form>
      </van-col>
    </van-row>
    <div class="loading-area">
      <div class="hot_search">
        <van-row class="text">
          <van-col span="24">热门搜索</van-col>
        </van-row>
        <div class="link">
          <span
            v-for="(item,index) in hotSearch"
            :key="index"
            @click="clickHotSearch(item.key)"
          >{{item.key}}</span>
        </div>
      </div>
      <div class="hot_search">
        <van-row class="text">
          <van-col span="22">历史搜索</van-col>
          <van-col span="2">
            <van-icon name="delete" @click="cleanHistoryWord" />
          </van-col>
        </van-row>
        <div class="link">
          <span
            v-for="(item,index) in historyWord"
            :key="index"
            @click="clickHotSearch(item)"
          >{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { reqfuzzySearch } from "../api/index";
import { Dialog } from "vant";
export default {
  inject: ["reload"],
  data() {
    return {
      value: "",
      historyWord: [] //历史搜索数据
    };
  },
  methods: {
    //模糊搜索
    async getfuzzySearch(ev) {
      var self = this;
      //键盘回车的编码是13
      if (ev.keyCode == 13 && this.value != "") {
        let searchWord = localStorage.getItem("searchWord");
        if (searchWord == null) {
          localStorage.setItem("searchWord", self.value);
        } else {
          let arr = localStorage.getItem("searchWord");
          arr = arr.split(",");
          if (arr.indexOf(self.value) != -1) {
            arr = arr;
          } else {
            arr.unshift(self.value);
          }
          self.historyWord = arr;
          if (self.historyWord.length > 5) {
            self.historyWord.pop();
          }
          localStorage.setItem("searchWord", self.historyWord);
        }
        //触发请求
        const result = await reqfuzzySearch(this.value);
        // console.log(result);
      }
      if (ev.keyCode == 13 && this.value == "") {
        this.$message({
          showClose: true,
          message: "请输入搜索关键词",
          type: "error"
        });
      }
    },
    //取消返回上一页
    onCancel() {
      this.$router.go(-1);
    },
    //获取本地缓存中的历史搜索
    getSearchWord() {
      let arr = localStorage.getItem("searchWord");
      if (arr == null) {
        return;
      } else {
        arr = arr.split(",");
        this.historyWord = arr;
      }
    },
    //点击热门搜索触发请求
    async clickHotSearch(item) {
      // console.log(item);
      //触发请求
      const result = await reqfuzzySearch(this.value);
      // console.log(result);
    },
    //清空历史记录
    cleanHistoryWord() {
      Dialog.confirm({
        title: "提示",
        message: "确定要清空历史记录吗？"
      })
        .then(() => {
          let searchWord = localStorage.getItem("searchWord");
          if (searchWord != null) {
            localStorage.removeItem("searchWord");
            this.reload();
          } else {
            console.log("没有历史记录");
          }
        })
        .catch(() => {
          console.log("已取消清空");
        });
    },
    //获取热门搜索的数据
    ...mapActions(["getHotSearch"])
  },

  mounted() {
    this.getHotSearch(); //获取热门搜索的数据
    this.getSearchWord();
  },
  computed: {
    ...mapState(["hotSearch"])
  }
};
</script>

<style scoped>
.search {
  width: 100%;
}
.van-search {
  padding-bottom: 10px;
  padding-right: 0;
  box-sizing: border-box;
}
.van-icon-comment-o {
  position: absolute;
  top: 1400%;
  left: 20%;
}
.hot_search {
  padding: 0 25px;
}
.hot_search .text {
  font-size: 26px;
  letter-spacing: 2px;
  color: #adadad;
  line-height: 80px;
}
.hot_search .link {
  position: relative;
  top: -25px;
}
.hot_search .link span {
  font-size: 24px;
  color: #333;
  background: #edeeee;
  display: inline-block;
  padding: 10px 20px;
  margin-right: 15px;
  border-radius: 5px;
}
.loading-area {
  height: 100%;
}
</style>