<template>
  <div class="wordList">
    <!-- 搜索按钮 -->
    <el-form ref="form" label-width="50px" :inline="true" size="small">
      <el-form-item label="标题">
        <el-input v-model="searchVal" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单 -->
    <div class="WSY_weishi">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr class="WSY_biaohead">
            <th width="5%">ID</th>
            <th width="15%">标题</th>
            <th width="4%">封面</th>
            <th width="8%">分类</th>
            <th width="7%">更新时间</th>
            <th width="8%">状态</th>
            <th width="8%">收费方式</th>
            <th width="8%" style="min-width: 180px">操作</th>
          </tr>
        </thead>
        <tbody id="contact">
          <tr class="WSY_body" id="td_499">
            <td>499</td>
            <td>fef</td>
            <td>
              <img
                src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/s_1/user/487/15759586952305105352_1.png"
              />
            </td>
            <td>康复 &gt;认知</td>
            <!-- <td></td> -->
            <td>2019-12-10 14:18:15</td>
            <!-- <td></td> -->
            <td>已发表</td>
            <td>学员</td>
            <td>
              <!---->
              <div class="tubox">
                <el-tooltip class="item" effect="dark" content="修改" placement="top">
                  <el-button
                    type="success"
                    icon="el-icon-edit"
                    circle
                  ></el-button>
                </el-tooltip>
              </div>
              <div class="tubox">
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                  ></el-button>
                </el-tooltip>
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
  data() {
    return {
      searchVal: "" //搜索关键字
    };
  }
};
</script>

<style scoped>
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
.WSY_body td:last-child {
  border-right: none;
  vertical-align: middle;
}
.tubox {
  display: inline-block;
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