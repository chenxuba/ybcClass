<template>
  <div class="hotCourse2">
    <van-row class="wrapBox" v-if="newcousre.course">
      <van-col span="24" class="hot_warp">
        <van-row type="flex" justify="space-between" class="warp1">
          <van-col span="6" class="title">{{newcousre.title}}</van-col>
          <van-col span="6" class="more" @click="moreContent">更多</van-col>
        </van-row>
      </van-col>
      <van-row
        v-for="(item,index) in newcousre.course"
        :key="index"
        class="box"
        @click="goDetail(item)"
      >
        <van-col span="24" class="video_warp">
          <img v-lazy="item.pic_cover" alt width="100%" />
          <span class="on-off">
            <van-icon name="play" class="play" />
          </span>
        </van-col>
        <van-row class="course_msg">
          <van-col span="24" class="course_title">{{item.title}}</van-col>
          <van-row class="course_txt">
            <van-col span="5" class="span span1">
              <img v-lazy="item.pic_cover" alt />
              {{item.name}}
            </van-col>
            <van-col span="5" class="span span2">{{item.update_status}}</van-col>
            <van-col
              span="7"
              class="span span3"
              v-if="item.update_status == '即将连载'"
            >{{item.people_num}}人浏览</van-col>
            <van-col
              span="7"
              class="span span3"
              v-if="item.update_status != '即将连载'"
            >{{parseInt(baseValue2)+parseInt(item.people_num)}}人观看</van-col>
            <van-col span="7" class="span span4" v-if="item.money_type == 3">公开</van-col>
            <van-col span="7" class="span span5" v-if="item.money_type == 2">学员</van-col>
            <van-col span="7" class="span span5" v-if="item.money_type == 1">{{item.money}}</van-col>
          </van-row>
        </van-row>
        <!-- 分割线 -->
        <van-divider />
      </van-row>
    </van-row>
    <img src="../../../static/img/sholist.svg" v-else />
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
  computed: {
    ...mapState(["newcousre"])
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        path: "/courseDetail/" + item.id
      });
    },
    // 更多
    moreContent() {
      this.$router.push({
        path: "/moduleDetail",
        query: {
          type: "1",
          label_id: "-1"
        }
      });
    }
  }
};
</script>

<style scoped>
.hot_warp {
  background: #fff;
  font-weight: normal;
  padding: 0px 25px 25px 25px;
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

.wrapBox {
  transform: translateZ(0);
}
.box {
  padding-top: 20px;
}
.video_warp {
  padding: 0 25px;
  position: relative;
}
.video_warp img {
  height: 320px;
  border-radius: 15px;
  object-fit: cover;
}
.video_warp .on-off {
  display: inline-block;
  width: 100px;
  height: 100px;
  background: rgba(27, 27, 27, 0.5);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -50px;
  left: 50%;
  margin-left: -50px;
  text-align: center;
  line-height: 120px;
}
.video_warp .on-off .play {
  color: #fff;
}
.course_msg {
  padding: 0px 25px;
}
.course_msg .course_title {
  font-size: 28px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 15px 0 0px 0;
  padding: 4px 0 0 0;
  color: #333;
}
.course_msg .course_number {
  font-size: 26px;
  padding-top: 0.01px;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 60px;
}
.course_msg .course_txt {
  line-height: 80px;
}
.course_msg .course_txt .span {
  font-size: 24px;
  color: #adadad;
}
.course_msg .course_txt .span.span1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.course_msg .course_txt .span.span3 {
  text-align: left;
}
.course_msg .course_txt .span.span2 {
  text-align: center;
}
.course_msg .course_txt .span.span2 .icon {
  position: relative;
  top: 2px;
}
.course_msg .course_txt .span.span1 img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  position: relative;
  top: 10px;
  border-radius: 20px;
}
.course_msg .course_txt .span.span4 {
  text-align: right;
  color: #5dd6c7;
}
.course_msg .course_txt .span.span5 {
  text-align: right;
  color: red;
}
.van-divider {
  margin: 10px 0;
}
</style>