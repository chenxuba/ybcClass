<template>
  <div class="cellView">
    <van-row class="list_box">
      <van-col span="6" class="list_img">
        <img v-lazy="FollowObj.headimgurl" alt />
      </van-col>
      <van-col span="14" class="list_content">
        <p>{{FollowObj.name}}</p>
        <p v-html="FollowObj.brief_intro"></p>
      </van-col>
      <van-col span="4" class="list_like">
        <van-icon name="like" class="icon" v-if="FollowObj.status == 1" />
        <van-icon name="like-o" class="icon" v-else />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    FollowObj: Object
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.follow .list .list_box {
  width: 100%;
  height: 180px;
  margin: 20px 0;
  background: #fff;
}
/* 头像 */
.follow .list .list_box .list_img {
  height: 100%;
  position: relative;
}
.follow .list .list_box .list_img img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
/* 名字和介绍 */
.follow .list .list_box .list_content {
  height: 100%;
  /* background: red; */
}

.follow .list .list_box .list_content p:first-child {
  font-size: 30px;
  margin: 45px 0 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}
.follow .list .list_box .list_content p:nth-child(2) {
  font-size: 24px;
  line-height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #999;
}
/* like */
.follow .list .list_box .list_like {
  height: 100%;
  text-align: center;
  line-height: 200px;
}
.follow .list .list_box .list_like .icon {
  color: rgb(243, 36, 0);
  font-size: 50px;
}
</style>