<template>
  <div class="content">
    <!-- 线上课程 -->
    <div class="ci-content" v-if="user_obj.teacher_course.data != ''">
      <top title="线上课程"></top>
      <XsCouser :XsCouser="user_obj.teacher_course"></XsCouser>
    </div>
    <!-- 线上课时 -->
    <div class="ci-content" v-if="user_obj.teacher_resource.data != ''">
      <top title="线上课时"></top>
      <XsTime :XsTime="user_obj.teacher_resource"></XsTime>
    </div>
    <!-- 线上软文 -->
    <div class="ci-content" v-if="user_obj.teacher_article.data != ''">
      <top title="线上软文"></top>
      <XsWord :XsWord="user_obj.teacher_article"></XsWord>
    </div>
  </div>
</template>

<script>
import top from "../../grandson/content/top";
import XsCouser from "../../grandson/content/XsCouser";
import XsTime from "../../grandson/content/XsTime";
import XsWord from "../../grandson/content/XsWord";
export default {
  components: {
    top,
    XsCouser,
    XsTime,
    XsWord
  },
  props: ["user_obj"]
};
</script>

<style scoped>
.content {
  font-size: 30px;
}
</style>