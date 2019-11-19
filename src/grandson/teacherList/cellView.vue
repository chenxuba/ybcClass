<template>
  <div class="cellView">
    <div class="school_warp">
      <div class="left">
        <div class="img_warp">
          <img v-lazy="teacherListObj.headimgurl" alt />
        </div>
      </div>
      <div class="right">
        <div class="top">
          <van-row>
            <van-col span="15">
              <p class="name">{{teacherListObj.name}}</p>
              <span class="name_1 a">粉丝{{teacherListObj.focus_count}}</span>
              <span class="name_2 a">软文{{teacherListObj.article_count}}</span>
              <span class="name_3 a">课时{{teacherListObj.res_count}}</span>
            </van-col>
            <van-col span="9" class="gz_warp">
              <span
                class="guanzhu"
                v-if="is_follow == 0"
                @click="guanzhu(teacherListObj.id,is_user_follow)"
              >+关注</span>
              <span class="guanzhu" v-if="is_follow == 1">已关注</span>
            </van-col>
          </van-row>
        </div>
        <div class="bottom" escape="true">{{teacherListObj.brief_intro}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["teacherListObj", "is_user_follow", "is_guanzhu"],
  data() {
    return {
      is_follow: this.is_guanzhu
    };
  },
  methods: {
    guanzhu(id, is_user_follow) {
      this.$emit("event", id, is_user_follow);
    }
  }
};
</script>

<style scoped>
.cellView .school_warp {
  width: 100%;
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #e1e1e1;
}

.cellView .school_warp .left {
  width: 150px;
  height: 150px;
}
.cellView .school_warp .left .img_warp {
  width: 90px;
  height: 90px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  left: 25px;
  top: 25px;
}
.cellView .school_warp .left .img_warp img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.cellView .school_warp .right {
  flex: 1;
}
.cellView .school_warp .right .top .name {
  font-size: 28px;
  position: relative;
  top: 10px;
  margin: 0;
  color: #333;
}
.cellView .school_warp .right .top .a {
  font-size: 24px;
  position: relative;
  top: -15px;
  color: #888;
}
.cellView .school_warp .right .top {
  padding-right: 25px;
}
.cellView .school_warp .right .top .guanzhu {
  display: inline-block;
  font-size: 24px;
  border-radius: 30px;
  border: 2px solid #1ad473;
  display: inline-block;
  padding: 4px 15px 2px 15px;
  color: #1ad473;
}
.cellView .school_warp .right .top .gz_warp {
  text-align: right;
}
.cellView .school_warp .right .bottom {
  font-size: 24px !important;
  line-height: 40px;
  padding-right: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #888;
  padding-right: 40px;
  margin-bottom: 20px;
}
</style>