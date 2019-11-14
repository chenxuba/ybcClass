<template>
  <div class="inquire">
    <div class="padding">
      <!-- tab标签 -->
      <div class="tab">
        <div class="tab-nav">
          <div class="together1 together" :class="{'active':tab === 1}" @click="toTab(1)">我问过的</div>
          <div class="together2 together" :class="{'active':tab === 2}" @click="toTab(2)">我围观的</div>
        </div>
        <div class="tab-content">
          <inquire01Myqa
            v-if="tab === 1"
            :MyQuery="MyQuery"
            :member_info="member_info"
            @pullDown="loadMore"
            ref="child"
          ></inquire01Myqa>
          <inquire02Myqa v-else :MyWeiGuan="MyWeiGuan" @pullDown2="loadMore2" ref="child2"></inquire02Myqa>
        </div>
      </div>
    </div>
    <goBack :router="router"></goBack>
  </div>
</template>

<script>
import inquire01Myqa from "../components/myQa/myqa1";
import inquire02Myqa from "../components/myQa/myqa2";
import { reqMyQuery, reqMyWeiGuan } from "../api";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      tab: 1,
      MyQuery: [],
      MyWeiGuan: [],
      member_info: {},
      page: 0,
      router:"pay"
    };
  },
  methods: {
    toTab(index) {
      this.tab = index;
    },
    async getMyQuery() {
      const result = await reqMyQuery("", this.page);
      // console.log(result);
      this.MyQuery = result.data.rs;
    },
    async getMyWeiGuan() {
      const result = await reqMyWeiGuan("", this.page);
      // console.log(result);
      this.MyWeiGuan = result.data.rs;
    },
    async loadMore() {
      this.page++;
      const result = await reqMyQuery("", this.page);
      let count = result.data.count;
      this.member_info = result.data.member_info;
      if (result.code == 1) {
        result.data.rs.forEach(item => {
          this.MyQuery.push(item);
        });
        // 加载状态结束
        this.$refs.child.loading = false;
        // 数据全部加载完成
        if (this.MyQuery.length >= count) {
          this.$refs.child.finished = true;
          this.page = 0; //没有更多数据后要把page初始化
        }
      } else {
        this.$refs.child.loading = false;
        this.$refs.child.finished = true;
      }
    },
    async loadMore2() {
      this.page++;
      const result = await reqMyWeiGuan("", this.page);
      let count = result.data.count;
      if (result.code == 1) {
        result.data.rs.forEach(item => {
          this.MyWeiGuan.push(item);
        });
        // 加载状态结束
        this.$refs.child2.loading = false;
        // 数据全部加载完成
        if (this.MyWeiGuan.length >= count) {
          this.$refs.child2.finished = true;
          this.page = 0;
        }
      } else {
        this.$refs.child2.loading = false;
        this.$refs.child2.finished = true;
      }
    }
  },
  components: {
    inquire01Myqa,
    inquire02Myqa
  },
  mounted() {
    this.getMyQuery();
    this.getMyWeiGuan();
  }
};
</script>

<style scoped>
.inquire {
  width: 100%;
  height: calc(100% - 92px);
  background: rgb(255, 255, 255);
}
.inquire .padding {
  padding: 0 20px;
}

/* tab标签 */
.tab-nav {
  height: 68px;
  line-height: 68px;
  margin: 0 24px;
  /* border: 1px solid #00a0fd; */
  border-radius: 8px;
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
}

.tab-nav .together {
  text-align: center;
  color: #333;
  letter-spacing: 4px;
  font-size: 30px;
}

.tab-nav .together3 {
  margin-right: 100px;
  background: #5dd6c7;
  color: #fff;
  border-radius: 50px;
  font-size: 26px;
  height: 50px;
  line-height: 50px;
  padding: 0 0px;
  margin-top: 8px;
  width: 80%;
}
.tab-nav .together4 .icon {
  font-size: 40px;
  margin-top: 15px;
}
.active {
  color: #5dd6c7 !important;
  border-bottom: 4px solid #5dd6c7;
}
.together3_warp {
  width: 300px;
  display: inline-block;
  /* background: red; */
}
</style>