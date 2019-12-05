<template>
  <div class="course">
    <div class="bodybox">
      <div class="WSY_weishi">
        <table border="0" cellpadding="0" cellspacing="0">
          <thead>
            <tr class="WSY_biaohead">
              <th width="2%">
                <label class="checkla">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
                </label>
              </th>
              <th width="3%">编号</th>
              <th width="6%">课程名称</th>
              <th width="6%" style="min-width: 50px">封面</th>
              <th width="6%">总期数/直播/视频</th>
              <th width="8%">浏览量</th>
              <th width="5%">状态</th>
              <th width="4%">收费方式</th>
              <th width="10%">时间</th>
              <th width="13%">操作</th>
            </tr>
          </thead>
          <tbody v-if="courseList != ''">
            <tr class="WSY_body" v-for="(item,index) in courseList" :key="index">
              <td>
                <label class="checkla">
                  <el-checkbox v-model="checked"></el-checkbox>
                </label>
              </td>
              <td>{{item.id}}</td>
              <td>{{item.title}}</td>
              <td>
                <img :src="item.pic_cover" />
              </td>
              <td>{{item.video_num}}/{{item.live_num}}/{{item.class_num}}</td>
              <td>
                独立访客：{{item.class_views}} &nbsp;
                <span style="color:#1ad572;"></span>
                <br />
                访客人次：{{item.people_num}}
                <br />
              </td>
              <td class="shutdomn" v-if="item.status == 1">连载</td>
              <td class="shutdomn" v-if="item.status == 2">完结</td>
              <td class="shutdomn" v-if="item.status == 3">待发布</td>
              <td class="redtext" v-if="item.money_type == 3">公开</td>
              <td class="redtext" v-if="item.money_type == 2">学员</td>
              <td class="redtext" v-if="item.money_type == 1">付费</td>
              <td>{{item.createtime}}</td>
              <td>
                <!-- 编辑 -->
                <div class="tubox">
                  <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                    <el-button type="primary" icon="el-icon-edit" circle @click="hanldedit(item)"></el-button>
                  </el-tooltip>
                </div>
                <!----删除---->
                <div class="tubox">
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="hanlddelete(item)"
                    ></el-button>
                  </el-tooltip>
                </div>
                <!-- 相关课时 -->
                <div class="tubox" style="display: inline-block;">
                  <el-tooltip class="item" effect="dark" content="相关课时" placement="top">
                    <el-button type="warning" icon="el-icon-warning" circle @click="addTab(item)"></el-button>
                  </el-tooltip>
                </div>
                <!-- 查看已订阅 -->
                <div class="tubox" style="display: inline-block;">
                  <el-tooltip class="item" effect="dark" content="查看已订阅" placement="top">
                    <el-button
                      type="success"
                      icon="el-icon-star-on"
                      circle
                      @click="startLive(item,'1')"
                    ></el-button>
                  </el-tooltip>
                </div>
                <!-- 相关评价 -->
                <div class="tubox" style="display: inline-block;">
                  <el-tooltip class="item" effect="dark" content="相关评价" placement="top">
                    <el-button type="danger" icon="el-icon-question" circle></el-button>
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["courseList"],
  data() {
    return {
      checked: false,
      checkAll: false,
      isIndeterminate: true
    };
  },
  methods: {
    //   删除课程
    hanlddelete(item) {
      //自定义事件 ,父组件course
      this.$emit("event0", item.id);
    },
    // 编辑课程
    hanldedit(item) {
      //自定义事件 ,父组件course
      this.$emit("event2", item.id);
    },
    // 点击相关课按钮触发的方法 自定义事件 ,父组件course
    addTab(item){
      this.$emit("event3",item.id)
    }
  }
};
</script>

<style scoped>
.bodybox {
  padding-bottom: 100px;
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
.WSY_body td img {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.WSY_body .redtext {
  color: #ff4f4b;
}
.WSY_body td:last-child {
  min-width: 340px;
}
.WSY_body td:last-child {
  border-right: none;
  vertical-align: middle;
}
.tubox {
  display: inline-block;
  overflow: hidden;
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
</style>