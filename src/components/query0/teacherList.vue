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
      <cellView
        v-for="(item,index) in teacherList"
        :key="index"
        :teacherListObj="item"
        @event="guanzhuTeacher"
        :is_user_follow="index"
        :is_guanzhu="item.is_user_follow"
        ref="child"
      ></cellView>
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
import { reqTeacherGuanzhu } from "../../api";
import { Toast } from "vant";
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
    },
    async guanzhuTeacher(id, index) {
      const result = await reqTeacherGuanzhu("", id, 1);
      console.log(result);
      //出现-995，则用户没有登录，提示去登录
      if (result.code == -995) {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: "spinner",
          message: "监测到您没有登录，开始跳转登录"
        });

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `正在跳转...`;
          } else {
            clearInterval(timer);
          }
        }, 1000);
        setTimeout(() => {
          this.$router.push("/login");
          Toast.clear();
        }, 2000);
      } else if (result.code == 1) {
        this.$toast("感谢您的关注");
        this.$refs.child[index].is_follow = 1;
      }
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