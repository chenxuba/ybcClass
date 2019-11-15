<template>
  <div class="eva-details">
    <img
      src="https://yibaikang001.oss-cn-shanghai.aliyuncs.com/user/member_wx_headimg/15729114899486126274_1.jpg"
      class="eva-head"
    />
    <div class="eva-inside">
      <div class="eva-info">
        <p class="eva-name">婷儿</p>
        <!---->
        <div>
          <img src="https://kf.ybc365.com/train/Public/train/user/article/img/like.png" />1
        </div>
      </div>
      <div class="eva-content">
        <pre class="word_pre">dewfwfwfwfwfwfwfwf dewfwfwfwfwfwfwfwf dewfwfwfwfwfwfwfwf dewfwfwfwfwfwfwfwf dewfwfwfwfwfwfwfwf dewfwfwfwfwfwfwfwf</pre>
      </div>
      <div class="eva-menu">
        <div style="width:40%;display:inline-block;" class="eva-time">刚刚</div>
        <div class="delete_comm">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.eva-details {
  margin: 30px 30px 0 30px;
  display: flex;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  position: relative;
}
.eva-details .eva-head {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  flex-shrink: 0;
}
.eva-inside {
  margin-left: 20px;
  width: 100%;
}
.eva-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.eva-name {
  font-size: 30px;
  color: #888;
}
.eva-info div {
  color: #999;
  font-size: 30px;
  display: flex;
  align-items: center;
}
.eva-info img {
  width: 28px;
  margin-right: 10px;
  vertical-align: middle;
}
.eva-content {
  font-size: 26px;
  color: #333;
  /* margin-top: 26px; */
  word-break: break-all;
}
.word_pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 10px 0 20px 0;
}
.eva-menu {
  overflow: hidden;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.eva-time {
  font-size: 26px;
  color: #a1a1a1;
}
.delete_comm {
  width: 20%;
  display: inline-block;
  font-size: 28px;
  text-align: right;
}
</style>