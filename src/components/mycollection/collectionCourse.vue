<template>
  <div class="hotCourse">
    <van-row>
      <van-col span="24" class="hot_warp">
        <div class="warp2">
          <van-row gutter="12">
            <van-col span="12" class="info" v-for="(item,index) in keTime" :key="index">
              <img v-lazy="item.cover" alt class="warp2_img" @click="goDetails(item.id)" />
              <van-row>
                <van-col span="24">
                  <p class="course_title">{{item.title}}</p>
                </van-col>
              </van-row>
              <van-row class="name_state">
                <van-col span="12">
                  <span class="course_name">{{item.user_name || '未加载'}}</span>
                  <span class="course_number">
                    <NumberGrow :value="item.readings"></NumberGrow>人观看
                  </span>
                </van-col>
                <van-col span="12">
                  <span class="course_state" v-if="item.needpay == 2">学员</span>
                  <span class="course_state" v-if="item.needpay == 0">公开</span>
                  <span class="course_state" v-if="item.needpay == 4">密码</span>
                  <span class="course_state money" v-if="item.needpay == 1">{{item.money}}</span>
                  <!-- <span class="course_geng">取消收藏</span> -->
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import NumberGrow from "../numberGrow/numberGrow";
export default {
  props: ['keTime'],
  data() {
    return {};
  },
  components: {
    NumberGrow
  },
  
  methods: {
    goDetails(id) {
      this.$router.push(`/classDetail/${id}`);
    },
   
  }
};
</script>

<style scoped>
.hotCourse {
  width: 100%;
  transform: translateZ(0);
}
.hot_warp {
  background: #fff;
  font-weight: normal;
  padding: 0px 25px 0 25px;
  box-sizing: border-box;
}
.warp1 {
  line-height: 40px;
}
.warp1 .title {
  text-align: left;
  position: relative;
  padding-left: 20px;
  box-sizing: border-box;
  font-size: 28px;
  color: #333;
}
.warp1 .title::after {
  content: "";
  position: absolute;
  z-index: 0;
  top: 6px;
  left: 5px;
  width: 6px;
  height: 60%;
  background: orange;
}
.warp1 .more {
  text-align: right;
  font-size: 26px;
  color: #aaa;
}
.warp2 {
  margin-top: 20px;
}
.warp2_img {
  width: 100%;
  height: 194px;
  border-radius: 13px;
  object-fit: cover;
}
.warp2 .course_title {
  font-size: 26px;
  margin: 10px 0 5px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  line-height: 33px;
}
.warp2 .name_state .course_name {
  text-align: left;
  display: inline-block;
  width: 100%;
  font-size: 26px;
  color: #adadad;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 3px;
}
.warp2 .name_state .course_geng {
  width: 100%;
  display: inline-block;
  font-size: 24px;
  color: #f1f1f1;
  text-align: right;
}
.warp2 .name_state .course_number {
  font-size: 24px;
  color: #adadad;
  /* display: flex; */
  line-height: 55px;
  position: relative;
  top: 3px;
}

.warp2 .name_state .course_state {
  text-align: right;
  display: inline-block;
  width: 100%;
  font-size: 24px;
  color: #5dd6c7;
  position: relative;
  top: -3px;
}
.warp2 .name_state .course_state.money {
  color: red;
  font-size: 26px;
}
.warp2 .name_state {
  line-height: 25px;
}
.warp2 .info {
  margin-bottom: 30px;
}
</style>