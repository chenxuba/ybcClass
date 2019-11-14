<template>
  <div class="module">
    <!-- navBar -->
    <div class="navBar">
      <van-nav-bar :title="title" left-text="返回" @click-left="$router.go(-1)" left-arrow>
        <van-icon name="manager" slot="right" @click="$router.push('/my')" />
      </van-nav-bar>
    </div>
    <!-- 热门、精品课程模块 -->
    <hotCourseModule :name="title" :course="course"></hotCourseModule>
    <!-- 课时 -->
    <hotClassModule :name="title" :classHour="classHour"></hotClassModule>
    <!-- 软文模块 -->
    <wordModule :name="title" :word="word"></wordModule>
  </div>
</template>

<script>
import hotCourseModule from "../components/hotCourse/hotCourseModule";
import wordModule from "../components/word/wordModule";
import hotClassModule from "../components/hotCourse2/hotClassModule";
import { reqChildren } from "../api/index.js";
export default {
  data() {
    return {
      title: this.$route.query.title,
      course: {},
      classHour: {},
      word: {},
      mod_id: this.$route.params.id,
    };
  },
  components: {
    hotCourseModule,
    wordModule,
    hotClassModule
  },
  methods: {
    async getCourseModule() {
      const result = await reqChildren(this.mod_id);
      this.course = result.data[0].menu[0]
      this.classHour = result.data[0].menu[1]
      this.word = result.data[0].menu[2]
      // console.log(this.course);
    }
  },
  mounted() {
    this.getCourseModule();
  }
};
</script>

<style scoped>
.module {
  width: 100%;
}
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: #5dd6c7;
}
</style>