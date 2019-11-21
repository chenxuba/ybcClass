<template>
    <div class="top">
      <span class="fl">{{title}}</span>
      <span class="fr">
        查看更多
        <img src="https://kf.ybc365.com/train/Public/train/user/clockin/img/icon.png" />
      </span>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped>
/* top */
.ci-content .top {
  height: 80px;
  border-bottom: 2px solid #eee;
  padding: 0 20px 0 4px;
  box-sizing: border-box;
}
.ci-content .top span.fl {
  margin-left: 30px;
  line-height: 80px;
  display: inline-block;
  font-size: 28px;
  color: #333;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.ci-content .top span.fr {
  margin-right: 10px;
  line-height: 80px;
  display: inline-block;
  color: #888;
  font-size: 24px;
  height: 80px;
}
.ci-content .top img {
  height: 22px;
  width: 12px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 12px;
}
img {
  border: 0;
  max-width: 100%;
}
</style>