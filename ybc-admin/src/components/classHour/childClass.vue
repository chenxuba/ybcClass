<template>
  <div>
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
        <tr class="WSY_biaohead">
          <th width="3%">ID</th>
          <th width="15%" style="min-width: 300px;">课时信息</th>
          <th width="11%" style="min-width: 125px;">浏览量</th>
          <th width="10%">分类</th>
          <th width="5%">审核状态</th>
          <th width="8%" style="min-width: 130px;">更新时间</th>
          <th width="8%" style="min-width: 380px;">操作</th>
        </tr>
      </thead>
      <tbody id="contact" v-if="classHourList != ''">
        <tr class="WSY_body" v-for="(item,index) in classHourList" :key="index">
          <td>
            <input
              type="text"
              name="personal_sort"
              class="personal_sort"
              style="width:50px;"
              :value="item.id"
              data-sort-id="781"
            />
          </td>
          <td style="text-align:left;">
            <div class="details_box">
              <img :src="item.cover" class="details_img" />
              <div class="details_content">
                <p class="details_title">{{item.title}}</p>

                <p class="details_data">
                  <span class="res_needpay" v-if="item.needpay == 0">公开</span>
                  <span class="res_needpay" v-if="item.needpay == 1">学员</span>
                  <span class="res_needpay" v-if="item.needpay == 3">收费</span>
                  <span class="res_needpay" v-if="item.needpay == 4">密码</span>
                  <span class="res_type" v-if="item.type == 3">视频</span>
                  <span class="res_type" v-if="item.type == 10">音频</span>
                </p>
                <p
                  class="details_data"
                  v-if="item.course_name"
                  style="-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                >课程：{{item.course_name}}</p>
              </div>
            </div>
          </td>
          <!--<td>经典成语故事</td>-->
          <td>
            独立访客：{{item.class_views}}
            <!-- <span style="color:#1ad572;">查看</span> -->
            <br />
            访客人次：{{item.people_num}}
            <br />
            播放量：{{item.u_visitors}}
            <br />
          </td>
          <td>{{item.label1}} &gt; {{item.label2}}</td>
          <td v-if="item.status == 1">已发布</td>
          <td v-if="item.status == 5">待发布</td>
          <td>{{item.intime}}</td>
          <td>
            <div class="tubox">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </div>

            <!----新增---->
            <div class="tubox">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="hanlddelete(classHourList)"
              ></el-button>
            </div>

            <div class="tubox" style="display: inline-block;">
              <el-button type="warning" icon="el-icon-folder-opened" circle></el-button>
            </div>
          </td>
        </tr>
      </tbody>
      <div v-else>
        <img src="../../../static/img/zwsj.jpeg" alt="" class="zwsj">
      </div>
    </table>
  </div>
</template>

<script>
import { reqDeleteClassHour } from "../../api";
export default {
  props: ["classHourList"],
  methods: {
    hanlddelete(classHourList) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then( async () => {
          const res = await reqDeleteClassHour(
            classHourList[0].id,
            classHourList[0].type
          );
          console.log(res);
          
          if (res.code == 1) {
            this.$message({
              message: "删除成功了",
              type: "success"
            });
            this.$emit("shuxinList")
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });

        });
    }
  }
};
</script>

<style scoped>
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
  border-radius: 50%;
}

.tick_style {
  width: 20px !important;
  height: 20px !important;
  margin-top: 10px;
  display: none;
}
.details_box {
  height: 90px;
  min-width: 360px;
}
.details_box .details_img {
  width: 40%;
  height: 100%;
  border-radius: 0;
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
}
.details_data {
  height: 20px;
  vertical-align: middle;
  margin: 16px 0 0 0;
}
.details_data span {
  margin-right: 5px;
}
.res_needpay {
  border-radius: 4px;
  border: 1px solid #1ad572;
  padding: 2px 6px;
  color: #fff;
  background-color: #1ad572;
  text-align: center;
}

.res_type {
  border-radius: 4px;
  background-color: #307ffd;
  padding: 2px 6px;
  color: #ffffff;
}
.tubox {
  display: inline-block;
  overflow: hidden;
  border-radius: 18px;
}
.tubox {
  cursor: pointer;
}
.WSY_body td .tu {
  vertical-align: middle;
  width: 15px;
  height: 15px;
  border-radius: 0;
}
.WSY_body td img {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.tubox span {
  display: inline-block;
  text-align: center;
  width: 70px;
}
.zwsj{
position: fixed;
top: 50%;
left: 0;
right: 0;
bottom: 0;
margin: auto;
}
</style>