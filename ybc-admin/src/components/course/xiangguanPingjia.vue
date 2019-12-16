<template>
  <div>
    <div class="WSY_weishi">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr class="WSY_biaohead">
            <th width="6%">ID</th>
            <th width="7%">昵称</th>
            <th width="8%">头像</th>
            <th width="4%">评星</th>
            <th width="8%">评论</th>
            <th width="8%">评价标签</th>
            <th width="8%">时间</th>
            <th width="10%">课时名</th>
            <th width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr class="WSY_body" id="tr_43">
            <td>43</td>
            <td>大爱无疆</td>
            <td>
              <img
                src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/member_wx_headimg/15738674859870176753_1.jpg"
                alt
              />
            </td>
            <td>5.00</td>
            <td>默认好评</td>
            <td>干货满满 条理清晰 非常赞 通俗易懂</td>
            <td>2019-05-02 14:10:33</td>
            <td>守株待兔～每天更新成语故事</td>
            <td>
              <!-- 相关评价 -->
              <div class="tubox" style="display: inline-block;">
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button type="danger" icon="el-icon-delete" circle></el-button>
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
export default {};
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
.WSY_body td img {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.tubox {
  display: inline-block;
  width: 36px;
  height: 36px;
  cursor: pointer;
}
</style>