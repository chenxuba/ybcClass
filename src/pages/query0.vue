
<template>
  <div class="query0">
    <van-row>
      <van-col span="24">
        <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round">
          <div slot="action" class="btn" @click="onSearch">搜索</div>
        </van-search>
      </van-col>
    </van-row>
    <van-tabs v-model="activeName" swipeable>
      <van-tab title="机构列表" name="5">
        <schoolList :schoolList="SchoolList" @pullDown1="pullDown1" ref="child1"></schoolList>
      </van-tab>
      <van-tab title="导师列表" name="7">
        <teacherList :teacherList="TeacherList" @pullDown2="pullDown2" ref="child2"></teacherList>
      </van-tab>
    </van-tabs>
    <goHome></goHome>
  </div>
</template>

<script>
import { reqTeacherAndSchoolList } from "../api/index";
import schoolList from "../components/query0/schoolList";
import teacherList from "../components/query0/teacherList";
export default {
  name: "query",
  data() {
    return {
      value: "",
      activeName: "5",
      SchoolList: [], //机构列表
      TeacherList: [], //导师列表
      page1: 1,
      page2: 1
    };
  },
  methods: {
    // 获取机构列表
    async getSchoolList() {
      this.page1 = 1;
      const result = await reqTeacherAndSchoolList("", 5, "", "", "", "");
      if (result.code == 1) {
        this.SchoolList = result.data.data;
      }
    },
    // 获取导师列表
    async getTeacherList() {
      this.page2 = 1;
      const result = await reqTeacherAndSchoolList("", 7, "", "", "", "");
      if (result.code == 1) {
        this.TeacherList = result.data.data;
      }
    },
    // 上拉加载，触底触发
    async pullDown2() {
      this.page2++;
      const result = await reqTeacherAndSchoolList(
        "",
        7,
        this.page2,
        "",
        "",
        ""
      );
      if (result.code == 1) {
        result.data.data.forEach(item => {
          this.TeacherList.push(item);
        });
        // 加载状态结束
        this.$refs.child2.loading = false;
      } else if (result.code == -3) {
        this.$refs.child2.finished = true;
        this.$refs.child2.loading = false;
      }
    },
    async pullDown1() {
      this.page1++;
      const result = await reqTeacherAndSchoolList(
        "",
        5,
        this.page1,
        "",
        "",
        ""
      );
      if (result.code == 1) {
        result.data.data.forEach(item => {
          this.SchoolList.push(item);
        });
        // 加载状态结束
        this.$refs.child1.loading = false;
      } else if (result.code == -3) {
        this.$refs.child1.finished = true;
        this.$refs.child1.loading = false;
      }
    },
    // 搜索
    async onSearch() {
      if (this.value == "" && this.activeName == "5") {
        this.getSchoolList();
        this.$refs.child1.loading = false;
        this.$refs.child1.finished = false;
      } else if (this.value == "" && this.activeName == "7") {
        this.getTeacherList();
        this.$refs.child2.loading = false;
        this.$refs.child2.finished = false;
      } else {
        const result = await reqTeacherAndSchoolList(
          this.activeName,
          "-1",
          this.value
        );
        if (this.activeName == "5") {
          this.SchoolList = result.data.data;
        } else {
          this.TeacherList = result.data.data;
        }
      }
    }
  },
  components: {
    schoolList,
    teacherList
  },
  computed: {},
  mounted() {
    this.getSchoolList();
    this.getTeacherList();
  }
};
</script>

<style scoped>
.query0 {
  width: 100%;
}
.btn {
  font-size: 30px;
  color: #1ad473;
}
</style>