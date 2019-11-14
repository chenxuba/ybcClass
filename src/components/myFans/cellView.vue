<template>
  <div class="cellContent">
    <div class="teacherInfLeft">
      <img v-lazy="fansObj.headimgurl" class="teacherInfLeftImg" />
    </div>
    <div class="teacherInfRight">
      <div class="teacherName">
        <span>{{fansObj.name || '暂无昵称'}}</span>
      </div>
      <div class="teacherDef">
        <div class="star1"></div>
      </div>
      <div class="invite">
        <div class="inviteLeft">
          <span>邀请人：{{fansObj.parent_name || '未加载'}}</span>
        </div>
        <div class="inviteRight">
          <div class="wx">
            <span>来源：{{fansObj.f_type == 1 ? '微信':'其他'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fansObj: Object
  }
};
</script>

<style scoped>
.cellContent {
  width: 95%;
  margin: auto;
  background-image: url("https://kf.ybc365.com/train/Public/train/user/common/img/icon_b9_32.png");
  background-repeat: no-repeat;
  background-position: 98% 50%;
  background-size: 10px 20px;
  border-bottom: 1px solid #e9e9e9;
  padding: 0 20px;
  box-sizing: border-box;
}
.teacherInfLeft {
  display: table-cell;
  vertical-align: middle;
  text-align: left;
  width: 20%;
}
.teacherInfLeftImg {
  border-radius: 50%;
  background-color: #e5e5e5;
  width: 100px;
  height: 100px;
}
.teacherInfRight {
  display: table-cell;
  width: 75%;
  padding: 30px 0;
}
.teacherName {
  font-size: 26px;
  color: #333333;
  padding: 5px;
  padding-left: 20px;
}

.teacherDef {
  padding-left: 20px;
  width: 70%;
  height: 30px;
  margin-top: 5px;
}
.star1 {
  width: 160px;
  height: 26px;
  background-image: url("https://kf.ybc365.com/train/Public/train/user/common/img/star.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  float: left;
  margin-top: 6px;
  margin-right: 8px;
  vertical-align: middle;
}

.invite {
  width: 100%;
  display: inline-block;
}
.inviteLeft {
  display: inline-block;
  font-size: 24px;
  color: #666666;
  padding-left: 20px;
  vertical-align: middle;
}
.inviteLeft span {
  width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  padding: 3px 0;
}
.inviteRight {
  display: inline-block;
  font-size: 24px;
  color: #888888;
  vertical-align: middle;
}
.inviteRight .wx {
  line-height: 90px;
}
.fensilist {
  padding: 0 10px 0 10px;
}
</style>