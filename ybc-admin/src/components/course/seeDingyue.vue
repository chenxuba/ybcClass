<template>
  <div>
    <div class="WSY_weishi">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr class="WSY_biaohead">
            <th width="5%">用户编号</th>
            <th width="15%">账号</th>
            <th width="6%">昵称/真实姓名</th>
            <th width="4%">手机号码</th>
            <th width="8%">用户组</th>
            <th width="7%">订阅方式</th>
            <th width="8%">订阅时间</th>
          </tr>
        </thead>
        <tbody id="contact">
          <tr class="WSY_body" id="td_259">
            <td>259</td>
            <td>
              <span style="display: inline-block;width:120px">u15487592310</span>
              <img src='https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/member_wx_headimg/15623100684994503059_1.jpg' />
            </td>
            <td>(王俊)</td>
            <td>17601241636</td>
            <td>内部员工</td>
            <td>自主订阅</td>
            <td>2019-05-02 10:24:27</td>
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
.WSY_body td:last-child {
  border-right: none;
  vertical-align: middle;
}
</style>