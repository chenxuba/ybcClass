<template>
  <div class="CourseCatalogue">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="box-warp" v-if="CourseMulu != ''">
        <van-row
          class="msg_warp"
          v-for="(item,index) in CourseMulu"
          :key="index"
          @click="goPlayer(item)"
        >
          <van-col span="9">
            <div class="img_warp">
              <img v-lazy="item.cover" alt />
              <span v-if="item.needpay == 2" class="xueyuan">学员</span>
              <span v-if="item.needpay == 3 && item.cantry == 0" class="fufei">付费</span>
              <span v-if="item.needpay == 4" class="mima">密码</span>
              <!-- <span v-if="item.needpay == 0" class="gongkai">公开</span> -->
              <span v-if="item.cantry == 1 && item.needpay == 3" class="gongkai">试看</span>
            </div>
          </van-col>
          <van-col span="15" class="right">
            <div class="top">{{item.title}}</div>
            <div class="top2">
              <span id="about_text">{{item.createtime}}</span>
            </div>
            <div class="bottom" v-if="item.res_type == 1">
              <van-row>
                <van-col class="scan_warp code_warp">
                  <span class="code" v-if="item.type == 1">文章</span>
                  <span class="code" v-if="item.type == 2">直播</span>
                  <span class="code" v-if="item.type == 3">视频</span>
                  <span class="code" v-if="item.type == 4">回放</span>
                  <span class="code" v-if="item.type == 5">课程</span>
                  <span class="code" v-if="item.type == 6">课程直播</span>
                  <span class="code" v-if="item.type == 7">课程点播</span>
                  <span class="code" v-if="item.type == 8">电台直播</span>
                  <span class="code" v-if="item.type == 9">电台回听</span>
                  <span class="code" v-if="item.type == 10">音频</span>
                </van-col>
                <van-col span="6" class="scan_warp">
                  <span class="scan">
                    <van-icon name="play-circle-o" class="icon-paly" />
                    ({{parseInt(baseValue2)+parseInt(item.people_num)}})
                  </span>
                </van-col>
                <van-col span="6" class="good_warp">
                  <span class="beautiful">
                    <van-icon name="good-job" class="icon" />
                    <span class="number">({{parseInt(num)+parseInt(item.likes)}})</span>
                  </span>
                </van-col>
              </van-row>
            </div>
            <div class="bottom" v-if="item.res_type == 2">
              <van-row>
                <van-col class="scan_warp code_warp">
                  <span class="code" v-if="item.res_type == 2">文章</span>
                </van-col>
                <van-col span="6" class="scan_warp">
                  <span class="scan">{{Number(baseValue2)+ item.read_num}}浏览</span>
                </van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="noshow" v-else>
        <img
          width="50%"
          src="https://kf.ybc365.com/train/Public/train/user/course/images/nodata.png"
        />
        <p class="crvp">还没有相关课时数据</p>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  props: ["CourseMulu"],
  data() {
    return {
      baseValue1: "500",
      baseValue2: "800",
      num: 0,
      code: "视频",
      loading: false,
      finished: false
    };
  },
  methods: {
    //随机点赞数
    getRandomInt(min, max) {
      return (this.num = Math.floor(Math.random() * (max - min + 1)) + min);
    },
    goPlayer(item) {
      // 视频，音频，直播
      if (item.res_type == 1) {
        if (this.CourseJianjie.subscribe == 0 && item.cantry == 0) {
          //无订阅无试看
          Toast("订阅课程后才能查看");
        } else if (this.CourseJianjie.subscribe == 0 && item.cantry == 1) {
          //无订阅有试看
          this.$router.push({
            path: "/classDetail/" + item.id
          });
        } else if (this.CourseJianjie.subscribe == 1) {
          //有订阅
          this.$router.push({
            path: "/classDetail/" + item.id
          });
        }
      } else if (item.res_type == 2) {
        //软文
        this.$router.push({
          path: "/wordDetail/" + item.res_id
        });
      }
    },
    //下拉加载
    onLoad(){
      this.$emit("onLoad")
    }
  },
  mounted() {
    this.getRandomInt(100, 200);
  },
  computed: {
    ...mapState(["CourseJianjie"])
  }
};
</script>

<style scoped>
.CourseCatalogue {
  width: 100%;
  min-height: 1000px;
}
/* 目录css */
.msg_warp {
  margin-bottom: 30px;
}
.msg_warp:last-child {
  margin-bottom: 0;
}
.msg_warp .img_warp {
  width: 250px;
  height: 150px;
  border-radius: 10px;
  position: relative;
}
.msg_warp .img_warp span {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
  color: #fff;
  background-color: rgba(93, 214, 199, 0.8);
  padding: 2px 8px;
  border-radius: 0 8px;
}
.msg_warp .img_warp span.gongkai {
  background-color: rgba(144, 216, 116, 0.8);
}
.msg_warp .img_warp img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.msg_warp .right .top {
  font-size: 28px;
  line-height: 45px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.msg_warp .right .top2 {
  font-size: 26px;
  line-height: 35px;
}
.msg_warp .right .top2 span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.msg_warp .right .center {
  font-size: 28px;
  color: #adadad;
  line-height: 40px;
}
.msg_warp .right .bottom {
  font-size: 24px;
  margin: 10px 0;
}
.msg_warp .right .bottom .scan_warp {
  text-align: left;
  margin-right: 15px;
}
.msg_warp .right .bottom .code_warp {
  border: 1px solid #999;
  padding: 0 4px;
  height: 32px;
  line-height: 33px;
}
.msg_warp .right .bottom .code {
  font-size: 24px;
  color: #999;
  box-sizing: border-box;
  display: inline-block;
}
.msg_warp .right .bottom .scan {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #adadad;
  display: flex;
  align-items: center;
}
.msg_warp .right .bottom .beautiful {
  width: 100%;
  color: #adadad;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;
}
.msg_warp .right .bottom .beautiful .icon {
  margin-right: 5px;
  color: orange;
  font-size: 30px;
}

.msg_warp .right .bottom .scan_warp .icon-paly {
  display: inline-block;
  font-size: 30px;
  margin-right: 10px;
}
.msg_warp .right .bottom .good_warp {
  text-align: left;
}
#about_text {
  color: #999;
  line-height: 60px;
}
.box-warp {
  padding: 20px 25px 30px 25px;
  box-sizing: border-box;
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
.xueyuan {
  background-color: #e37e79 !important;
}
.mima {
  background-color: #ebc232 !important;
}
.fufei {
  background-color: #ebc232 !important;
}
</style>