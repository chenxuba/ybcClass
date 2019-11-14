<template>
  <div class="hotCourse2">
    <van-row class="wrapBox" v-if="classHour.info">
      <van-col span="24" class="hot_warp">
        <van-row type="flex" justify="space-between" class="warp1">
          <van-col span="6" class="title">{{classHour.title}}</van-col>
          <van-col span="6" class="more" @click="moreContent(name)">更多</van-col>
        </van-row>
      </van-col>
      <div v-if="classHour.info != ''">
        <van-row
          v-for="(item,index) in classHour.info"
          :key="index"
          class="box"
          @click="goDetail(item.id)"
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
                <img v-lazy="item.headimgurl" alt />
                {{item.name}}
              </van-col>
              <van-col span="4" class="span span2">
                <van-icon name="good-job" class="icon" />
                ({{parseInt(baseValue1) + parseInt(item.likes)}})
              </van-col>
              <van-col
                span="7"
                class="span span3"
              >浏览{{parseInt(baseValue2)+parseInt(item.people_num)}}</van-col>
              <van-col span="8" class="span span4" v-if="item.money_type == 3">¥ {{item.money}}</van-col>
              <van-col span="8" class="span span5" v-if="item.money_type == 2">学员</van-col>
              <van-col span="8" class="span span5" v-if="item.money_type == 0">公开</van-col>
              <van-col span="8" class="span span5" v-if="item.money_type == 4">密码</van-col>
            </van-row>
          </van-row>
          <!-- 分割线 -->
          <van-divider />
        </van-row>
      </div>
      <div class="noshow" v-else>
        <img
          width="50%"
          src="https://kf.ybc365.com/train/Public/train/user/course/images/nodata.png"
        />
        <p class="crvp">还没有相关课程数据</p>
      </div>
    </van-row>
    <img src="../../../static/img/sholist.svg" v-for="item in 2" alt="" :key="item" v-else>
  </div>
</template>

<script>
import NumberGrow2 from "../numberGrow/numberGrow2";
import { mapState } from "vuex";
export default {
  props: {
    name: {
      type: String
    },
    classHour:{
      type:Object
    }
  },
  data() {
    return {
      baseValue1: "500",
      baseValue2: "800",
    };
  },
  components: {
    NumberGrow2
  },
  computed: {},
  methods: {
    goDetail(id) {
      this.$router.push({
        path: "/classDetail/" + id
      });
    },
    moreContent(name){
      this.$router.push({
        path: "/moduleDetail",
        query: {
          type: this.classHour.type,
          label_id: this.classHour.label_id
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
  color: rgb(255, 0, 0);
}
.course_msg .course_txt .span.span5 {
  text-align: right;
  color: #62d6c8;
}
.van-divider {
  margin: 10px 0;
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