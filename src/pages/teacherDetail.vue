<template>
  <div class="schoolDetail" v-height>
    <!-- 头部 -->
    <div class="top">
      <div class="pages-head">
        <!-- 头像，机构名字 -->
        <div class="head-main">
          <div class="img-box">
            <img v-lazy="user_obj.teacher_info.headimgurl" v-if="user_obj.teacher_info.headimgurl" />
            <img src="../../static/img/pic.svg" alt="" v-else>
          </div>
          <div class="txt-box">
            <div class="name-box">
              <p class="name">{{user_obj.teacher_info.name || 'xxx老师'}}</p>
            </div>
            <p class="small">所属机构：{{user_obj.teacher_info.agency_name || 'ybc云课堂'}}</p>
          </div>
        </div>
        <!-- 作品数、导师、粉丝  -->
        <div class="bottom-main">
          <div class="list width-35" style="width: 32.5%; text-align: center;">
            <p class="name">作品数</p>
            <p class="num">{{user_obj.teacher_info.count || 0}}</p>
          </div>
          <div class="list width-35" style="width: 32.5%; text-align: center;">
            <p class="name">粉丝量</p>
            <p class="num">{{user_obj.teacher_info.follows || 0}}</p>
          </div>
          <div class="list width-35" style="width: 32.5%; text-align: center;">
            <p class="name">
              <span class="guanzhu">关注</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- tab页 -->
    <van-tabs v-model="activeName" line-width="25" color="#5dd6c7" title-active-color="#5dd6c7">
      <van-tab title="简介" name="a">
        <jianjie :jianjie="user_obj.teacher_info.brief_intro" ref="child1"></jianjie>
      </van-tab>
      <van-tab title="内容" name="b">
        <contents :user_obj="user_obj"></contents>
      </van-tab>
      <van-tab title="问答" name="c">3</van-tab>
    </van-tabs>
    <goBack></goBack>
    <footer>医佰康提供技术支持</footer>
  </div>
</template>

<script>
import jianjie from "../components/teacherDetail/jianjie";
import contents from "../components/teacherDetail/content";
import { reqteacherDetail } from "../api";
export default {
  data() {
    return {
      activeName: "a",
      user_id: this.$route.params.id,
      user_info: "",
      page: 1, //从第一页开始
      loading: true,
      user_obj: {
        teacher_article: {},
        teacher_course: {},
        teacher_info: {},
        teacher_resource: {}
      }
    };
  },
  components: {
    jianjie,
    contents
  },
  methods: {
    // 获取机构主页详情
    async getTeacherDetail() {
      const result = await reqteacherDetail("", this.user_id);
      console.log(result);
      if (result.code == 1) {
        this.user_obj = result.data;
        // this.user_info = result.data.agency_info.user_info;
        // this.getSchoolteacherList();
        this.$refs.child1.Ploading = false;
        // this.loading = false;
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
    this.getTeacherDetail();
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
  object-fit: cover;
}
.pages-head .head-main .txt-box {
  width: calc(100% - 170px);
  display: inline-block;
  vertical-align: middle;
  margin-left: 30px;
  margin-top: 20px;
}

.pages-head .head-main .txt-box .name {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 36px;
  color: #fff;
  width: 100%;
  white-space: nowrap;
  margin: 0;
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
.txt-box .small {
  font-size: 24px;
  color: #f8f8f8;
  float: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
  white-space: normal;
  margin: 0;
  line-height: 50px;
}
.name .guanzhu {
  border: 2px solid #1ad473;
  color: #1ad473;
  padding: 1px 30px;
  border-radius: 30px;
}
</style>