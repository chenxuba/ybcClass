<template>
  <div class="cellView">
    <div class="school_warp">
      <div class="left">
        <div class="img_warp">
          <img :src="teacherListObj.headimgurl" alt />
        </div>
      </div>
      <div class="right">
        <div class="top">
          <van-row>
            <van-col span="15">
              <p class="name">{{teacherListObj.name}}</p>
              <div class="span3">
                <span class="name_1 a">课程{{teacherListObj.res_count}}</span>
                <span class="name_2 a">软文{{teacherListObj.article_count}}</span>
                <span class="name_3 a">粉丝{{teacherListObj.focus_count}}</span>
              </div>
            </van-col>
            <van-col span="9" class="gz_warp">
              <!-- <span class="guanzhu">+关注</span> -->
            </van-col>
          </van-row>
        </div>
        <div
          class="bottom"
          escape="true"
        >{{teacherListObj.brief_intro}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["teacherListObj"],
  data() {
    return {};
  },
  methods: {}
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
}
.cellView .school_warp .right .top .a {
  font-size: 24px;
  color: #888;
}
.cellView .school_warp .right .top .a::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 50%;
  background: #888;
  margin: 0 6px;
}
.cellView .school_warp .right .top .a:last-child::after {
  display: none;
}
.cellView .school_warp .right .top .a:last-child {
  margin-right: 0;
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
  padding: 0px 15px 0px 15px;
  color: #1ad473;
  position: relative;
  top: -20px;
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
.span3 {
  width: 100%;
  display: flex;
  margin: 20px 0 15px 0;
}
</style>