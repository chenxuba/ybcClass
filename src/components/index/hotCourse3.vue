<template>
  <div class="hotCourse">
    <van-row v-if="classHour.class">
      <van-col span="24" class="hot_warp">
        <van-row type="flex" justify="space-between" class="warp1">
          <van-col span="6" class="title">{{classHour.title || '最新课时'}}</van-col>
          <van-col span="6" class="more" @click="moreContent">更多</van-col>
        </van-row>
      </van-col>
      <van-col span="24" class="hot_warp">
        <div class="warp2">
          <van-row gutter="12">
            <van-col span="12" class="info" v-for="(item,index) in classHour.class" :key="index">
              <img v-lazy="item.pic_cover" alt class="warp2_img" @click="goDetail(item)" />
              <van-row>
                <van-col span="24">
                  <p class="course_title">{{item.title}}</p>
                </van-col>
              </van-row>
              <van-row class="name_state">
                <van-col span="12">
                  <span class="course_name">{{item.name}}</span>
                  <span class="course_number">{{Number(baseValue2)+ item.people_num}}人观看</span>
                </van-col>
                <van-col span="12">
                  <span class="course_state" v-if="item.money_type == 2">学员</span>
                  <span class="course_state" v-if="item.money_type == 4">密码</span>
                  <span class="course_state" v-if="item.money_type == 0 && item.solo_sell == 1">公开</span>
                  <span class="course_state" v-if="item.money_type == 0 && item.solo_sell == 0"></span>
                  <!-- <span class="course_state" v-if="item.money_type == 3 && item.solo_sell == 1">公开</span> -->
                  <span class="course_state money" v-if="item.money_type == 3">¥{{item.money}}</span>
                  <span class="course_geng">
                    <van-icon
                      name="like"
                      color="red"
                      style="position: relative;
    top: 1px;margin-right:2px;"
                    />
                    {{Number(baseValue1)+Number(item.likes)}}
                  </span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
        <div class="noshow" v-if="!classHour.class">
          <img src="../../../static/img/sholist.svg" alt />
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import NumberGrow2 from "../numberGrow/numberGrow2";
import { mapState } from "vuex";
export default {
  data() {
    return {
      baseValue1: "500",
      baseValue2: "800"
    };
  },
  components: {
    NumberGrow2
  },

  methods: {
    goDetail(item) {
      this.$router.push({
        path: "/classDetail/" + item.id
      });
    },
    // 更多
    moreContent() {
      this.$router.push({
        path: "/moduleDetail",
        query: {
          type: "2",
          label_id: "-1"
        }
      });
    }
  },
  computed: {
    ...mapState(["classHour"])
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
  color: #adadad;
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
.noshow {
  width: 100%;
  text-align: center;
  padding: 100px 0;
}
img {
  max-width: 100%;
  border: none;
}
.noshow p {
  font-size: 30px;
  color: #818181;
}
</style>