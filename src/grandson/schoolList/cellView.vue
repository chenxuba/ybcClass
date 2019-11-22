<template>
  <div class="cellView">
    <div class="schoolList loading-area">
      <div class="school_warp">
        <div class="left">
          <div class="img_warp">
            <img v-lazy="schoolListObj.headimgurl" alt />
          </div>
        </div>
        <div class="right">
          <div class="top">
            <van-row>
              <van-col span="18">
                <p class="name">{{schoolListObj.agency_name}}</p>
                <div class="span2">
                  <span class="name_1 a">粉丝{{schoolListObj.focus_count}}</span>
                  <span class="name_2 a">导师{{schoolListObj.user_count}}</span>
                </div>
              </van-col>
              <van-col span="6" class="gz_warp">
                <span class="guanzhu" @click="goDetail">查看详情</span>
              </van-col>
            </van-row>
          </div>
          <div class="bottom" escape="true">{{schoolListObj.brief_intro || '暂无简介'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schoolListObj: Object
  },
  data() {
    return {};
  },
  methods: {
    // 跳转详情页
    goDetail() {
      this.$router.push("/schoolDetail/" + this.schoolListObj.id);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.schoolList {
  width: 100%;
}
.schoolList .school_warp {
  width: 100%;
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #e1e1e1;
}

.schoolList .school_warp .left {
  width: 150px;
  height: 150px;
}
.schoolList .school_warp .left .img_warp {
  width: 90px;
  height: 90px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  left: 25px;
  top: 10px;
}
.schoolList .school_warp .left .img_warp img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.schoolList .school_warp .right {
  flex: 1;
}
.schoolList .school_warp .right .top .name {
  font-size: 28px;
  position: relative;
  top: 10px;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 0;
  color: #333;
}
.schoolList .school_warp .right .top .a {
  font-size: 24px;
  position: relative;
  top: 10px;
  color: #888;
}
.schoolList .school_warp .right .top {
  padding-right: 25px;
}
.schoolList .school_warp .right .top .guanzhu {
  display: inline-block;
  font-size: 24px;
  border-radius: 30px;
  border: 2px solid #5dd6c7;
  display: inline-block;
  padding: 4px 15px 2px 15px;
  color: #5dd6c7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.schoolList .school_warp .right .top .gz_warp {
  text-align: right;
}
.schoolList .school_warp .right .bottom {
  /* height: 60px; */
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
.schoolList .zhanwei {
  width: 100%;
  height: 80px;
}
.span2 {
  display: flex;
  margin: 5px 0 20px 0;
}
.span2 .a::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 75%;
  background: #888;
  margin: 0 10px;
}
.span2 .a:last-child:after {
  display: none;
}
</style>