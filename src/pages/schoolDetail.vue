<template>
  <div class="schoolDetail" v-height>
    <!-- 头部 -->
    <div class="top">
      <div class="pages-head">
        <!-- 头像，机构名字 -->
        <div class="head-main">
          <van-skeleton avatar title :row="1" :loading="loading" avatar-size="55px">
            <div class="img-box">
              <img v-lazy="user_info.headimgurl" />
            </div>
            <div class="txt-box">
              <div class="name-box">
                <p class="name">{{user_info.agency_name}}</p>
              </div>
            </div>
          </van-skeleton>
        </div>
        <!-- 作品数、导师、粉丝  -->
        <div class="bottom-main">
          <div class="list width-35" style="width: 32.5%; text-align: center;">
            <p class="name">作品数</p>
            <p class="num">{{agency_obj.agency_info.res_nums || 0}}</p>
          </div>
          <div class="list width-35" style="width: 32.5%; text-align: center;">
            <p class="name">导师</p>
            <p class="num">{{agency_obj.agency_info.count_users || 0}}</p>
          </div>
          <div class="list width-35" style="width: 32.5%; text-align: center;">
            <p class="name">粉丝</p>
            <p class="num">{{agency_obj.agency_info.agency_fans || 0}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- tab页 -->
    <van-tabs v-model="activeName" line-width="25" color="#5dd6c7" title-active-color="#5dd6c7">
      <van-tab title="简介" name="a">
        <jianjie :jianjie="user_info" ref="child1"></jianjie>
      </van-tab>
      <van-tab title="内容" name="b">
        <contents :agency_obj="agency_obj"></contents>
      </van-tab>
      <van-tab title="导师" name="c">
        <teacher :teacherList="SchoolteacherList" @pullDown="pullDown1" ref="child"></teacher>
      </van-tab>
    </van-tabs>
    <goBack></goBack>
    <footer>医佰康提供技术支持</footer>
  </div>
</template>

<script>
import jianjie from "../components/schoolDetail/jianjie";
import teacher from "../components/schoolDetail/teacher";
import contents from "../components/schoolDetail/content";
import { reqschoolDetail, reqschoolteacherList } from "../api";
import {setFirstUrl} from "../util";
export default {
  data() {
    return {
      activeName: "a",
      agency_id: this.$route.params.id,
      agency_obj: {
        agency_info: {},
        agency_article:{},
        agency_clockin:{},
        agency_course:{},
        agency_resource:{},
        agency_offline:{}
      },
      user_info: "",
      page: 1, //从第一页开始
      SchoolteacherList: [], //导师列表
      loading: true
    };
  },
  components: {
    jianjie,
    teacher,
    contents
  },
  methods: {
    // 获取机构主页详情
    async getSchoolDetail() {
      const result = await reqschoolDetail("", this.agency_id);
      console.log(result);
      if (result.code == 1) {
        this.agency_obj = result.data;
        this.user_info = result.data.agency_info.user_info;
        this.getSchoolteacherList();
        this.$refs.child1.Ploading = false;
        this.loading = false;
      }
    },
    // 获取导师列表
    async getSchoolteacherList() {
      const result = await reqschoolteacherList("", this.agency_id, this.page);
      console.log(result);
      this.SchoolteacherList = result.data;
    },
    //上拉加载更多导师
    async pullDown1() {
      this.page++;
      const result = await reqschoolteacherList("", this.agency_id, this.page);
      if (result.code == 1) {
        result.data.forEach(item => {
          this.SchoolteacherList.push(item);
        });
        // 加载状态结束
        this.$refs.child.loading = false;
      } else if (result.code == -3) {
        this.$refs.child.finished = true;
        this.$refs.child.loading = false;
      }
    }
  },
  mounted() {
    this.getSchoolDetail();
    setFirstUrl();
  }
};
</script>

<style scoped>
.schoolDetail {
  background-color: #ececec;
}
.schoolDetail >>> .van-tabs {
  background: #fff;
}
/* 顶部 */
.top {
  width: 100%;
  height: 300px;
  background: url("../../static/img/head-bg.png") no-repeat center bottom;
  background-size: 100% auto;
}
.top .pages-head {
  padding: 40px;
  box-sizing: border-box;
  margin: 0 24px;
  font-size: 0;
}
.top .pages-head .head-main .img-box {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
}
.pages-head .head-main .img-box img {
  display: block;
  width: 100%;
  height: 100%;
}
.pages-head .head-main .txt-box {
  width: calc(100% - 170px);
  display: inline-block;
  vertical-align: middle;
  margin-left: 30px;
}

.pages-head .head-main .txt-box .name {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 36px;
  color: #fff;
  width: 100%;
  white-space: nowrap;
}
/* 作品数、导师、粉丝 */
.pages-head .bottom-main {
  font-size: 0;
  padding: 0 60px 35px 60px;
  margin-top: 10px;
  position: absolute;
  width: calc(100% - 120px);
  left: -1px;
}
.pages-head .bottom-main .list {
  display: inline-block;
  vertical-align: middle;
  text-indent: 20px;
}
.pages-head .bottom-main .list .name {
  font-size: 26px;
  color: #999;
  margin-bottom: 10px;
}
.pages-head .bottom-main .list .num {
  font-size: 25px;
  color: #333;
  margin: 0;
}
footer {
  padding: 28px 4%;
  text-align: center;
  font-size: 26px;
  color: #888;
  background: #ececec;
}
</style>