<template>
  <div class="cellView">
    <van-row class="msg_warp" @click="goDetail(dingYueListObj.course_id)">
      <van-swipe-cell>
        <van-col span="9">
          <div class="img_warp">
            <img v-lazy="dingYueListObj.pic_cover" alt />
          </div>
        </van-col>
        <van-col span="15" class="right">
          <div class="top">{{dingYueListObj.title}}</div>
          <div class="top2"></div>
          <div class="bottom">
            <van-row>
              <van-col span="6">
                <span class="scan one">已更新{{dingYueListObj.count}}</span>
              </van-col>
              <van-col span="8" class="scan_warp">
                <span class="scan">{{dingYueListObj.people_num}}人观看</span>
              </van-col>
              <van-col span="65" class="good_warp">
                <span class="beautiful">
                  <!-- <van-icon name="good-job" class="icon" /> -->
                  <!-- <span class="number">{{dingYueListObj.id}}人点赞</span> -->
                </span>
              </van-col>
            </van-row>
          </div>
        </van-col>
        <template slot="right">
          <van-button square type="danger" text="取消" />
        </template>
      </van-swipe-cell>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    dingYueListObj: Object
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/courseDetail/${id}`);
    }
  }
};
</script>

<style scoped>
.cellView .msg_warp:last-child {
  margin-top: 60px;
}
.cellView .msg_warp .img_warp {
  width: 250px;
  height: 150px;
  border-radius: 10px;
}
.cellView .msg_warp .img_warp img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.cellView .msg_warp .right .top {
  font-size: 28px;
  line-height: 45px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.cellView .msg_warp .right .top2 {
  font-size: 24px;
  line-height: 35px;
  height: 65px;
  overflow: hidden;
}
.cellView .msg_warp .right .top2 span {
  display: inline-block;
  transform: scale(0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-left: -45px;
}
.cellView .msg_warp .right .center {
  font-size: 28px;
  color: #adadad;
  line-height: 40px;
}
.cellView .msg_warp .right .bottom {
  font-size: 24px;
  margin: 10px 0;
}
.cellView .msg_warp .right .bottom .scan {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #adadad;
  padding-top: 3px;
}
.cellView .msg_warp .right .bottom .scan.one::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 18px;
  background: #ccc;
  margin-left: 20px;
}
.cellView .msg_warp .right .bottom .beautiful {
  width: 100%;
  display: inline-block;
  color: #adadad;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cellView .msg_warp .right .bottom .beautiful .icon {
  position: relative;
  top: 2px;
  margin-right: 5px;
  color: orange;
}
.cellView .msg_warp .right .bottom .scan_warp {
  text-align: right;
}
.cellView .msg_warp .right .bottom .good_warp {
  text-align: right;
}
#about_text {
  color: #999;
}
</style>