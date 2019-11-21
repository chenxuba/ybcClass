<template>
  <div class="content">
    <!-- 线下课程 -->
    <div class="ci-content" v-if="agency_obj.agency_offline.data != ''">
      <top title="线下课程"></top>
      <XxCouser :XxCouser="agency_obj.agency_offline"></XxCouser>
    </div>
    <!-- 打卡学堂 -->
    <div class="ci-content" v-if="agency_obj.agency_clockin != null">
      <top title="打卡学堂"></top>
      <dkXuetang :dkXuetang="agency_obj.agency_clockin"></dkXuetang>
    </div>
    <!-- 线上课程 -->
    <div class="ci-content" v-if="agency_obj.agency_course.data != ''">
      <top title="线上课程"></top>
      <XsCouser :XsCouser="agency_obj.agency_course"></XsCouser>
    </div>
    <!-- 线上课时 -->
    <div class="ci-content" v-if="agency_obj.agency_resource.data != ''">
      <top title="线上课时"></top>
      <XsTime :XsTime="agency_obj.agency_resource"></XsTime>
    </div>
    <!-- 线上软文 -->
    <div class="ci-content" v-if="agency_obj.agency_article.data != ''">
      <top title="线上软文"></top>
      <XsWord :XsWord="agency_obj.agency_article"></XsWord>
    </div>
  </div>
</template>

<script>
import top from "../../grandson/content/top";
import XxCouser from "../../grandson/content/XxCouser";
import dkXuetang from "../../grandson/content/dkXuetang";
import XsCouser from "../../grandson/content/XsCouser";
import XsTime from "../../grandson/content/XsTime";
import XsWord from "../../grandson/content/XsWord";
export default {
  components: {
    top,
    XxCouser,
    dkXuetang,
    XsCouser,
    XsTime,
    XsWord
  },
  props: ["agency_obj"]
};
</script>

<style scoped>
.content {
  font-size: 30px;
}
</style>