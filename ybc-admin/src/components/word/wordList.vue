<template>
  <div class="wordList">
    <!-- 搜索按钮 -->
    <el-form ref="form" label-width="50px" :inline="true" size="small">
      <el-form-item label="标题">
        <el-input v-model="searchVal" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单 -->
    <div class="WSY_weishi">
      <table border="0" cellpadding="0" cellspacing="0">
        <!-- 标头 -->
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
        <!-- 主体 -->
        <tbody id="contact" v-if="article_list != ''">
          <tr class="WSY_body" v-for="(item,index) in article_list" :key="index">
            <td>{{item.id}}</td>
            <td>{{item.title}}</td>
            <td>
              <img :src="item.pic" />
            </td>
            <td>{{item.label1}} &gt;{{item.label2}}</td>
            <!-- <td></td> -->
            <td>{{item.createtime}}</td>
            <!-- <td></td> -->
            <template v-if="item.isvalid == 1">
              <td v-if="item.status == 1">保存中</td>
              <td v-if="item.status == 2">待审核</td>
              <td v-if="item.status == 3">审核中</td>
              <td v-if="item.status == 4">未通过</td>
              <td v-if="item.status == 5">已发表</td>
              <td v-if="item.status == 6">待发表</td>
            </template>
            <template v-if="item.isvalid == 0">
              <td>
                <span
                  style="background-color: rgba(0,0,0,0.15);color: #323232;display: inline-block;padding: 3px 5px;"
                >已删除</span>
              </td>
            </template>
            <td v-if="item.needpay == 0">免费</td>
            <td v-if="item.needpay == 1">会员免费</td>
            <td v-if="item.needpay == 2">学员免费</td>
            <td v-if="item.needpay == 3">付费</td>
            <td v-if="item.needpay == 4">密码观看</td>
            <td v-if="item.isvalid == 1">
              <!---->
              <div class="tubox">
                <el-tooltip class="item" effect="dark" content="修改" placement="top">
                  <el-button type="success" icon="el-icon-edit" circle></el-button>
                </el-tooltip>
              </div>
              <div class="tubox">
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="handldelete(item.id)"
                  ></el-button>
                </el-tooltip>
              </div>
            </td>
            <td v-if="item.isvalid == 0">
              <!---->
              <div class="tubox">
                <el-tooltip class="item" effect="dark" content="查看日志" placement="top">
                  <el-button
                    type="success"
                    icon="el-icon-search"
                    circle
                    @click="SeeDeleteRiZhi(item.article_id)"
                  ></el-button>
                </el-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
        <div v-else>
          <img src="../../../static/img/zwsj.png" alt class="zwsj" />
        </div>
      </table>
    </div>
    <!-- 分页 -->
    <div class="fenye" v-if="article_list != ''">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="20"
        @current-change="handleCurrentChange"
        :total="count"
      ></el-pagination>
    </div>
    <!-- 日志记录的弹窗 -->
    <el-dialog title="删除日志" :visible.sync="dialogTableVisible" :modal-append-to-body="false" width="30%">
      <table class="gridtable">
        <tr>
          <th>删除时间</th>
          <th>操作人</th>
        </tr>
        <tr>
          <td>{{rizhiMsg.delete_time}}</td>
          <td>{{rizhiMsg.action_user}}</td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["article_list", "count", "rizhiMsg"],
  data() {
    return {
      searchVal: "", //搜索关键字
      dialogTableVisible: false
    };
  },
  methods: {
    //   点击页码触发
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    // 点击搜索按钮触发
    search() {
      this.$emit("search", this.searchVal);
    },
    // 点击删除按钮触发
    handldelete(id) {
      this.$emit("handldelete", id);
    },
    // 点击查看日志按钮触发
    SeeDeleteRiZhi(id) {
      this.dialogTableVisible = true;
      this.$emit("SeeDeleteRiZhi", id);
    }
  }
};
</script>

<style scoped>
.WSY_weishi {
  width: 100%;
  margin: 0 auto 20px;
  max-height: 600px;
  overflow: auto;
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
.zwsj {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
  margin: auto;
}
table.gridtable th {
  border-width: 1px;
  padding: 10px;
  border-style: solid;
  border-color: #666666;
  background-color: #dedede;
}
table.gridtable td {
  border-width: 1px;
  padding: 10px;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
}
</style>