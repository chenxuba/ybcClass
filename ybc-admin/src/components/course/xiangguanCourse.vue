<template>
  <div class="xiangguanCourse">
    <div class="article_head">
      <div class="art_head_div">
        <img class="article_img" :src="seleteCourse.pic_cover" alt />
      </div>
      <div class="article_msg">
        <h1>{{seleteCourse.title}}</h1>
        <p>总期数：{{seleteCourse.video_num}}</p>
        <p v-if="seleteCourse.status == 1">状态：连载</p>
        <p v-if="seleteCourse.status == 2">状态：完结</p>
        <p v-if="seleteCourse.money_type == 1">收费方式：付费</p>
        <p v-if="seleteCourse.money_type == 2">收费方式：学员</p>
        <p v-if="seleteCourse.money_type == 3">收费方式：公开</p>
      </div>
    </div>
    <!-- 搜索、新建 -->
    <div class="search">
      <el-form ref="form" label-width="80px" :inline="true">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题" v-model="searchVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="emitSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-popover placement="right" width="160">
            <div style="text-align: center; margin: 0">
              <el-button type="success" size="mini" @click="newClassHouse">课时</el-button>
              <el-button type="danger" size="mini" @click="newWord">软文</el-button>
            </div>
            <el-button slot="reference" type="warning" size="small">新建</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="WSY_weishi" v-if="xiangguankeList != ''">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr class="WSY_biaohead">
            <th width="3%">序号</th>
            <th width="10%" style="min-width: 300px;">标题</th>
            <th width="6%">收费方式</th>
            <th width="11%" style="min-width: 125px;">创建时间</th>
            <th width="15%">操作</th>
          </tr>
        </thead>
        <tbody id="contact">
          <tr class="WSY_body" v-for="(item,index) in xiangguankeList" :key="index">
            <td>
              <input
                type="text"
                name="personal_sort"
                class="personal_sort"
                style="width:50px;"
                :value="item.res_id"
              />
            </td>
            <td>
              <div class="details_box">
                <img :src="item.cover || item.pic" class="details_img"  />
                <div class="details_content">
                  <p class="details_title">{{item.title}}</p>
                  <p class="details_data" style="text-align: left;">
                    <span class="res_type" v-if="item.type == 3">视频</span>
                    <span class="res_type" v-if="item.type == 10">音频</span>
                    <span class="res_type" v-if="item.type == 2">视频直播</span>
                    <span class="res_type" v-if="item.type == 4">直播回放</span>
                    <span class="res_type" v-if="item.type == 8">音频直播</span>
                    <span class="res_type" v-if="item.type == 9">音频回放</span>
                    <span class="res_type" v-else>软文</span>
                  </p>
                </div>
              </div>
            </td>
            <td>
              <span v-if="item.needpay == 0 || item.article_needpay == 0">公开</span>
              <span v-if="item.needpay == 1 || item.article_needpay == 1">公开</span>
              <span v-if="item.needpay == 2 || item.article_needpay == 2">学员</span>
              <span v-if="item.needpay == 3 || item.article_needpay == 3">收费</span>
              <span v-if="item.needpay == 4 || item.article_needpay == 4">密码</span>
            </td>
            <td>{{item.createtime}}</td>
            <!-- 操作 -->
            <td>
              <!-- 编辑 -->
              <div class="tubox">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button type="primary" icon="el-icon-edit" circle @click="hanldedit(item)"></el-button>
                </el-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
     <div v-else>
        <img src="../../../static/img/zwsj.png" alt class="zwsj" />
      </div>
  </div>
</template>

<script>
export default {
  props: ["seleteCourse", "xiangguankeList"],
  data() {
    return {
      searchVal: "" //搜索关键字
    };
  },
  methods: {
    // 自定义事件，触发父组件 course 的 emitSearch
    emitSearch() {
      this.$emit("emitSearch", this.searchVal);
    },
    // 编辑课时 自定义事件，触发父组件 course 的 xiangguanKehanldedit
    hanldedit(item) {
      // 说明是录播视频
      if (item.type == 3) {
        this.$emit("xiangguanKehanldedit", item, "video");
        // 说明是录播音频
      } else if (item.type == 10) {
        this.$emit("xiangguanKehanldedit", item, "audio");
        // 说明是直播视频
      } else if (item.type == 2 || item.type == 4) {
        this.$emit("xiangguanKehanldedit", item, "videoLive");
        // 说明是直播音频
      } else if (item.type == 8 || item.type == 9) {
        this.$emit("xiangguanKehanldedit", item, "audioLive");
      }
    },
    // 新建课时，跳转到课时界面去
    newClassHouse() {
      this.$router.push({
        path:"/classHour",
        query:{
          activeName:'second'
        }
      });
    },
    // 新建软文
    newWord(){
      this.$router.push({
        path:"/word",
        query:{
          activeName:'second'
        }
      });
    }
  }
};
</script>

<style scoped>
.article_head {
  width: 83%;
  margin: 10px auto 0px auto;
  background: rgba(242, 242, 242, 1);
  font-size: 14px;
  padding: 10px 10px;
  display: -webkit-box;
  /* height: 170px; */
  border-radius: 10px;
}
.art_head_div {
  margin-right: 40px;
}
.article_img {
  width: 205px;
  height: 128px;
  border-radius: 10px;
}
.article_msg {
  width: 410px;
  height: 100%;
}
.article_msg h1 {
  font-size: 20px;
  margin-top: 13px;
}
.article_msg p {
  margin: 14px 0px;
}
.WSY_weishi {
  width: 100%;
  margin: 0 auto 100px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.WSY_biaohead {
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #efefef;
}
.WSY_biaohead th {
  color: #323232;
  font-size: 13px;
  text-align: center;
  font-weight: normal;
  vertical-align: middle;
  line-height: 1.1;
  padding: 10px 5px;
  word-break: keep-all;
}
.WSY_body {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #fff;
}
.WSY_body td {
  color: #323232;
  font-size: 12px;
  vertical-align: middle;
  border-bottom: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  line-height: 20px;
  padding: 10px 5px;
}
.WSY_body td input {
  margin-top: 10px;
  text-align: center;
}
.WSY_body td img {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.details_box {
  height: 90px;
  width: 360px;
}
.details_box .details_img {
  width: 40%;
  height: 100%;
  border-radius: 5px;
}
.details_content {
  display: inline-block;
  height: 90px;
  width: 160px;
  vertical-align: middle;
  margin-left: 5px;
  width: 180px;
  margin-left: 18px;
}
.details_title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 180px;
  margin-top: 10px;
  height: 25px;
  text-align: left;
}
.details_data {
  height: 20px;
  vertical-align: middle;
  margin: 16px 0 0 0;
}
.details_data span {
  margin-right: 5px;
}

.res_type {
  border-radius: 4px;
  background-color: #1ad572;
  padding: 4px 12px;
  color: #ffffff;
}
.WSY_body td:last-child {
  border-right: none;
  vertical-align: middle;
}
.tubox {
  display: inline-block;
  width: 36px;
  height: 36px;
  margin-right: 5px;
}
.WSY_body td .tu {
  vertical-align: middle;
  width: 15px;
  height: 15px;
  border-radius: 0;
}
.tubox span {
  display: inline-block;
  text-align: center;
  width: 70px;
}
.search {
  /* width: 600px; */
  padding-left: 30px;
  margin-top: 20px;
}
.zwsj {
  position: fixed;
  top: 40%;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>