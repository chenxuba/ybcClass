<template>
  <div class="xiangguanCourse">
    <div class="article_head">
      <div class="art_head_div">
        <img
          class="article_img"
          src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/471/15567635709558081107.jpg"
          alt
        />
      </div>
      <div class="article_msg">
        <h1>经典成语故事</h1>
        <p>总期数：4</p>
        <p>状态：完结</p>
        <p>收费方式：学员</p>
      </div>
    </div>
    <!-- 表格 -->
    <div class="WSY_weishi">
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
          <tr class="WSY_body">
            <td>
              <input
                type="text"
                name="personal_sort"
                class="personal_sort"
                style="width:50px;"
                value="1"
                data-sort-id="171"
              />
              <!-- <img src="/train/Public/train/admin/img/tick.png" class="tick_style" /> -->
            </td>
            <td>
              <div class="details_box">
                <img
                  src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/471/15570342750233193753.jpg"
                  class="details_img"
                />
                <div class="details_content">
                  <p class="details_title">呆若木鸡～每天更新成语小故事</p>
                  <p class="details_data">
                    <span class="res_type">视频</span>
                  </p>
                </div>
              </div>
            </td>
            <td>公开</td>
            <td>2019-05-05 13:31:15</td>
            <td>
              <div class="tubox" onclick="jump_class_list(781);">
                <img class="tu" src="/train/Public/train/admin/img/tubiao20_gray.png" />
                <span>管理</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["seleteCourse"]
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
}
.art_head_div {
  margin-right: 40px;
}
.article_img {
  width: 205px;
  height: 128px;
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
    margin-top: 10px;
    height: 25px;
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
    padding: 6px 10px;
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
    line-height: 34px;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 18px;
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
</style>