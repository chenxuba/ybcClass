<template>
  <div class="fourLi">
    <div class="contbox">
      <!-- 头像 -->
      <div class="title">
        <div class="title_txt">
          <span>我的资产</span>
        </div>
        <div class="title_img">
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <div class="title">
        <div class="title_txt">
          <span>作品排行</span>
        </div>
        <div class="title_img">
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <div class="title" @click="$router.push('/openMaster')">
        <div class="title_txt">
          <span>问答专区</span>
        </div>
        <div class="title_img">
          <van-tag color="#f2826a" class="tag" v-if="teacherinfo.total_fans_ask != 0">{{teacherinfo.total_fans_ask || "1"}}</van-tag>
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
      <div class="title">
        <div class="title_txt">
          <span>解绑导师账号</span>
        </div>
        <div class="title_img">
          <van-icon name="arrow" class="title_icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["teacherinfo"]
};
</script>

<style scoped>
/* 头像 */
.fourLi .contbox {
  padding: 0 30px 0 40px;
  box-sizing: border-box;
}
.fourLi .contbox .title {
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  line-height: 100px;
  border-bottom: 1px solid #f1f1f1;
}
.fourLi .contbox .title .title_txt {
  font-size: 28px;
  color: #333;
  width: 40%;
}
.fourLi .contbox .title .title_img {
  width: 60%;
  text-align: right;
}
.fourLi .contbox .title .title_img .tag{
  position: relative;
  top: -18px;
  font-weight: bold;
}
.fourLi .contbox .title .title_img .title_icon {
  font-size: 40px;
  color: #ccc;
}
</style>