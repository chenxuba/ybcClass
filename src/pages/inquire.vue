<template>
  <div class="inquire">
    <div class="padding">
      <!-- 顶部问答专区介绍banner图 -->
      <swipe></swipe>
      <!-- tab标签 -->
      <div class="tab">
        <div class="tab-nav">
          <div class="together1 together" :class="{'active':tab === 1}" @click="toTab(1)">答主</div>
          <div class="together2 together" :class="{'active':tab === 2}" @click="toTab(2)">问答</div>
          <span class="together3_warp">
            <div
              class="together3 together"
              @click="isMaster()"
              v-if="userIsTeacher.open_ask == 0 && userIsTeacher.status == 3"
            >点我成为答主</div>
            <div class="together3 together" @click="isMaster()" v-if="userIsTeacher == ''">点我成为答主</div>
          </span>
          <div class="together4 together">
            <van-icon name="filter-o" class="icon" />
          </div>
        </div>
        <div class="tab-content">
          <inquire01 v-if="tab === 1" :teacherList="teacherList" @pullDown="loadMore" ref="child"></inquire01>
          <inquire02 v-else :question="question" @pullDown2="loadMore2" ref="child2"></inquire02>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inquire01 from "../components/inquire/inquire01";
import inquire02 from "../components/inquire/inquire02";
import swipe from "../components/inquire/swipe";
import { reqUserIsTeacher, reqTeacherList, reqAllQuestion } from "../api/index";
import { Toast } from "vant";
import { isWx } from "../util";
export default {
  //   inject: ["reload"],
  data() {
    return {
      active: 0,
      tab: 1,
      page: 0,
      page2: -1,
      userIsTeacher: "",
      teacherList: [], //导师列表
      question: [] //题目列表
    };
  },
  methods: {
    // 进来这个页面就执行这个方法，判断用户是不是导师
    async isTeacher() {
      const result = await reqUserIsTeacher();
      // console.log(result);
      if (result.code == 1) {
        this.userIsTeacher = result.data;
        // this.getTeacherList();
        // this.getAllQuestion();
        console.log("该用户是导师");
      } else if (result.code == -7) {
        if (isWx()) {
          // console.log("微信端");
        } else {
          Toast.fail("登录过期，请重新登录");
          this.$router.push("/login");
        }
      } else {
        console.log("该用户不是导师");
        // this.getTeacherList();
        // this.getAllQuestion();
      }
    },
    toTab(index) {
      this.tab = index;
      // console.log(index)
    },
    // 跳转答主界面，跳转前先判断是该用户是不是导师，如果是导师就跳转到开通答主界面，如果不是导师就跳转到申请导师的界面
    isMaster() {
      if (this.userIsTeacher.length != 0 && this.userIsTeacher.open_ask == 0) {
        // 执行这里就说明该用户是导师但是没有开通问答，就跳转到开通答主页面
        this.$router.push("/openMaster");
      } else if (
        this.userIsTeacher.length != 0 &&
        this.userIsTeacher.open_ask == 1
      ) {
        Toast.fail("正在审核中");
      } else if (
        this.userIsTeacher.length != 0 &&
        this.userIsTeacher.open_ask == 4
      ) {
        Toast.fail("申请已被驳回，请重新申请");
        this.$router.push("/applyTeacher");
      } else if (
        this.userIsTeacher.length != 0 &&
        this.userIsTeacher.open_ask == 5
      ) {
        Toast.fail("导师账号被冻结，请联系管理员");
      } else {
        // 开通问答
        this.$router.push("/applyTeacher");
      }
    },
    //获取问答专区所有导师列表
    // async getTeacherList() {
    //   const result = await reqTeacherList(); //从1开始
    //   //   console.log(result)
    //   this.teacherList = result.data.master;
    // },
    //获取问答专区所有题目列表
    // async getAllQuestion() {
    //   const result = await reqAllQuestion(); //从0开始
    //   this.question = result.data;
    //   // console.log(this.question)
    // },
    // 导师列表上拉加载
    async loadMore() {
      this.page++;
      const result = await reqTeacherList("", this.page); //从1开始
      //   console.log(result);
      let master_count = result.data.master_count;
      if (result.data.master.length > 0) {
        result.data.master.forEach(item => {
          this.teacherList.push(item);
        });
        // 加载状态结束
        this.$refs.child.loading = false;
        // 数据全部加载完成
        if (this.teacherList.length >= master_count) {
          this.$refs.child.finished = true;
          // this.page = 0;
        }
      }else {
        this.$refs.child.loading = false;
        this.$refs.child.finished = true;
      }
    },
    // 问答列表上拉加载
    async loadMore2() {
      this.page2++;
      const result = await reqAllQuestion("", this.page2);
      console.log(result.code);
      let count = result.data.count;
      if (result.code == 1) {
        if (result.data.data.length > 0) {
          result.data.data.forEach(item => {
            this.question.push(item);
          });
          // 加载状态结束
          this.$refs.child2.loading = false;
          // 数据全部加载完成
          if (this.question.length >= count) {
            this.$refs.child2.finished = true;
          }
        }
      } else {
        this.$refs.child2.loading = false;
        this.$refs.child2.finished = true;
      }
    }
  },
  components: {
    inquire01,
    inquire02,
    swipe
  },
  mounted() {
    this.isTeacher();
    this.loadMore();
  }
};
</script>

<style scoped>
.inquire {
  width: 100%;
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
}

.tab-nav .together {
  text-align: center;
  color: #333;
  letter-spacing: 4px;
  font-size: 30px;
}
.tab-nav .together1 {
  margin-right: 80px;
}
.tab-nav .together2 {
  margin-right: 80px;
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